/**
 * Готує геометрію для карти «Що давав Тартус» (§ 00 статті syriyskyi-ekspres).
 *
 *   node scripts/build-map-tartus.mjs
 *
 * Бере Natural Earth 1:50m із пакета world-atlas, лишає тільки той шматок
 * світу, який карта здатна показати, і пише його в public/ у стисненому
 * вигляді. Сторінка натомість не тягне ні d3, ні topojson, ні атлас цілком:
 * 756 КБ атласу перетворюються на ~150 КБ регіону.
 *
 * Що робить кожен крок, і чому саме так:
 *
 *  1. Суходіл, берегова лінія й кордони — три окремі шари. У вихідному
 *     атласі це одні й ті самі дуги, але малюються вони по-різному: заливка
 *     без обведення, білий берег, сірий кордон. Тримати їх нарізно означає
 *     не перемальовувати заливку заради лінії.
 *  2. Регіон рахується з тієї самої математики, якою карта підбирає масштаб,
 *     а не «на око»: беремо найширший кадр, який може виникнути під час
 *     перельотів між кроками, з запасом.
 *  3. Довгі лінії ріжемо на шматки по 96 точок. У кожного шматка своя рамка,
 *     тож браузер пропускає ті, що поза кадром.
 *  4. Маршрути згладжуємо тут-таки, у Меркаторових координатах. Згладжування
 *     інваріантне до масштабу, тож крива вийде та сама, що й у браузері,
 *     але рахувати її щокадру вже не треба.
 *  5. Координати квантуємо в цілі числа з кроком 2.5e-4° (0.08 px на
 *     найглибшому зумі) і пишемо різницями між сусідніми точками.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-50m.json", ROOT);
const OUT = new URL("public/articles/syriyskyi-ekspres/tartus-map.json", ROOT);

const RAD = Math.PI / 180;
const CHUNK = 96; // точок у шматку лінії
const QUANT = 1.8e-3; // градуса на одиницю квантування — половина кроку джерела

/**
 * Скільки деталей лишати. Natural Earth 50m дає точку кожні 0.0036° — це
 * приблизно 1.6 px на найглибшому зумі карти й соті частки пікселя на
 * найширшому. Тримати таку саму дрібність для Атлантики, яку читач бачить
 * тільки загальним планом, немає сенсу: вона коштує півмегабайта.
 *
 * Допуск — максимальне відхилення спрощеної лінії від вихідної, у градусах.
 */
const ZONES = [
  { box: [33, 32, 40, 38], tol: 0.0009 }, // Тартус і Хмеймім: 437 px на градус
  { box: [18, 24, 48, 50], tol: 0.003 }, // Чорне море, протоки, Егейське: 100 px
  { box: [-25, -15, 55, 58], tol: 0.02 }, // Африка й Сахель: не ближче за 33 px
];
const TOL_FAR = 0.08; // решта світу видно лише краєм ока, ~10 px на градус

/* ── Меркатор і підбір масштабу: те саме, що робить компонент ────────────── */

const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));
const unpsi = (y) => (2 * Math.atan(Math.exp(y)) - Math.PI / 2) / RAD;

/** Масштаб і зсув, за яких точки вміщаються у прямокутник [x0,y0]-[x1,y1]. */
function fitPoints(pts, x0, y0, x1, y1) {
  let lo = Infinity,
    hi = -Infinity,
    plo = Infinity,
    phi = -Infinity;
  for (const [lon, lat] of pts) {
    const l = lon * RAD,
      p = psi(lat);
    if (l < lo) lo = l;
    if (l > hi) hi = l;
    if (p < plo) plo = p;
    if (p > phi) phi = p;
  }
  const bx0 = 150 * lo,
    bx1 = 150 * hi,
    by0 = -150 * phi,
    by1 = -150 * plo;
  const w = x1 - x0,
    h = y1 - y0;
  const k = Math.min(w / (bx1 - bx0), h / (by1 - by0));
  return {
    k: 150 * k,
    t: [x0 + (w - k * (bx1 + bx0)) / 2, y0 + (h - k * (by1 + by0)) / 2],
  };
}

/** Базовий кадр карти — той самий прямокутник, що й у компоненті. */
const BASE_BOX = [
  [-16, -2],
  [44, 48],
];
function baseFit(W, H) {
  const [[x0, y0], [x1, y1]] = BASE_BOX;
  const pts = [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
    [(x0 + x1) / 2, y0],
    [(x0 + x1) / 2, y1],
    [x0, (y0 + y1) / 2],
    [x1, (y0 + y1) / 2],
  ];
  return fitPoints(pts, W * 0.03, H * 0.03, W * 0.97, H * 0.97);
}

/**
 * Розміри полотна карти беремо не зі стелі, а з верстки: широка врізка
 * min(1400px, 100vw − 80px), висота min(100svh, 900px), а під 900px
 * ширини — 52svh, але не менше 300px.
 */
function canvasSizes() {
  // Реальні пропорції вікон, не декартів добуток: вікна 320x1200 не буває,
  // а саме такі викрутаси й роздували регіон до цілого світу.
  const viewports = [
    [320, 640],
    [360, 740],
    [360, 1000],
    [390, 844],
    [430, 932],
    [600, 800],
    [768, 1024],
    [900, 900],
    [900, 1200],
    [1024, 700],
    [1280, 800],
    [1280, 1200],
    [1440, 500],
    [1440, 900],
    [1600, 1000],
    [1920, 1080],
  ];
  return viewports.map(([vw, vh]) => ({
    W: Math.min(1400, vw - 80),
    H: vw <= 900 ? Math.max(300, vh * 0.52) : Math.max(420, Math.min(vh, 900)),
    rail: vw > 900, // ширші вікна тримають колонку з підписами праворуч
  }));
}

/**
 * Регіон: усе, що взагалі може потрапити в кадр. Межі заміряні на робочій
 * версії за шістнадцяти пропорцій вікна — прогін усіх перельотів між
 * кроками, з фіксацією найдальшого кадру в частках полотна:
 *
 *   без колонки підписів   x -0.23..1.19   y -0.06..1.36
 *   з колонкою праворуч    x -0.09..1.57   y -0.11..1.54
 *
 * Колонка зсуває карту ліворуч, тож праворуч лишається видимий запас —
 * звідси різні межі. Нижче до кожної додано ще чверть полотна.
 */
const ENVELOPE = {
  bare: [-0.35, -0.3, 1.35, 1.55],
  rail: [-0.35, -0.35, 1.8, 1.75],
};

function region() {
  let lon0 = Infinity,
    lat0 = Infinity,
    lon1 = -Infinity,
    lat1 = -Infinity;
  for (const { W, H, rail } of canvasSizes()) {
    const { k, t } = baseFit(W, H);
    const [ex0, ey0, ex1, ey1] = rail ? ENVELOPE.rail : ENVELOPE.bare;
    const lons = [ex0 * W, ex1 * W].map((x) => (x - t[0]) / k / RAD);
    const lats = [ey0 * H, ey1 * H].map((y) => unpsi((t[1] - y) / k));
    lon0 = Math.min(lon0, ...lons);
    lon1 = Math.max(lon1, ...lons);
    lat0 = Math.min(lat0, ...lats);
    lat1 = Math.max(lat1, ...lats);
  }
  return [
    Math.max(-180, lon0 - 1),
    Math.max(-85, lat0 - 1),
    Math.min(180, lon1 + 1),
    Math.min(85, lat1 + 1),
  ];
}

/* ── Спрощення дуг ───────────────────────────────────────────────────────── */

/**
 * Дуги в topojson спільні: той самий відрізок берега належить і суходолу,
 * і кордону. Тому спрощуємо саме їх, до складання шарів — інакше біла
 * берегова лінія поїхала б відносно заливки.
 */
function simplifyArcs(topo) {
  const [sx, sy] = topo.transform.scale;
  const [tx, ty] = topo.transform.translate;
  let before = 0,
    after = 0;
  topo.arcs = topo.arcs.map((arc) => {
    let x = 0,
      y = 0;
    const pts = arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx + tx, y * sy + ty];
    });
    before += pts.length;
    const kept = douglasPeucker(pts, tolFor(boxOf(pts)));
    after += kept.length;
    let px = 0,
      py = 0;
    return kept.map((p) => {
      const qx = Math.round((p[0] - tx) / sx),
        qy = Math.round((p[1] - ty) / sy);
      const d = [qx - px, qy - py];
      px = qx;
      py = qy;
      return d;
    });
  });
  return { before, after };
}

/** Найдрібніший допуск із зон, яких торкається рамка. */
function tolFor(b) {
  let tol = TOL_FAR;
  for (const z of ZONES) if (overlaps(b, z.box)) tol = Math.min(tol, z.tol);
  return tol;
}

/** Дуглас-Пекер: викидає точки, які нікуди не відхиляють лінію. */
function douglasPeucker(pts, tol) {
  if (pts.length < 3 || tol <= 0) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [i0, i1] = stack.pop();
    if (i1 - i0 < 2) continue;
    const [x0, y0] = pts[i0];
    const [x1, y1] = pts[i1];
    const dx = x1 - x0,
      dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    let far = -1,
      best = tol;
    for (let i = i0 + 1; i < i1; i++) {
      const [x, y] = pts[i];
      const d = len
        ? Math.abs(dy * x - dx * y + x1 * y0 - y1 * x0) / len
        : Math.hypot(x - x0, y - y0);
      if (d > best) {
        best = d;
        far = i;
      }
    }
    if (far > 0) {
      keep[far] = 1;
      stack.push([i0, far], [far, i1]);
    }
  }
  const out = [];
  for (let i = 0; i < pts.length; i++) if (keep[i]) out.push(pts[i]);
  return out;
}

/* ── Обрізання по регіону ────────────────────────────────────────────────── */

/** Сазерленд–Ходжман: кільце проти прямокутника. */
function clipRing(ring, [x0, y0, x1, y1]) {
  const edges = [
    (p) => p[0] >= x0,
    (p) => p[0] <= x1,
    (p) => p[1] >= y0,
    (p) => p[1] <= y1,
  ];
  const cross = [
    (a, b) => [x0, a[1] + ((b[1] - a[1]) * (x0 - a[0])) / (b[0] - a[0])],
    (a, b) => [x1, a[1] + ((b[1] - a[1]) * (x1 - a[0])) / (b[0] - a[0])],
    (a, b) => [a[0] + ((b[0] - a[0]) * (y0 - a[1])) / (b[1] - a[1]), y0],
    (a, b) => [a[0] + ((b[0] - a[0]) * (y1 - a[1])) / (b[1] - a[1]), y1],
  ];
  let out = ring.slice(0, -1); // кільце замкнене — останню точку дублювати не треба
  for (let e = 0; e < 4 && out.length; e++) {
    const inside = edges[e],
      hit = cross[e],
      src = out;
    out = [];
    for (let i = 0; i < src.length; i++) {
      const cur = src[i],
        prev = src[(i + src.length - 1) % src.length];
      const curIn = inside(cur),
        prevIn = inside(prev);
      if (curIn) {
        if (!prevIn) out.push(hit(prev, cur));
        out.push(cur);
      } else if (prevIn) {
        out.push(hit(prev, cur));
      }
    }
  }
  if (out.length < 3) return null;
  out.push(out[0].slice());
  return out;
}

const boxOf = (pts) => {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;
  for (const p of pts) {
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }
  return [x0, y0, x1, y1];
};
const overlaps = (b, r) =>
  !(b[2] < r[0] || b[0] > r[2] || b[3] < r[1] || b[1] > r[3]);

/** Довгі лінії — на шматки; шматки поза регіоном не потрібні зовсім. */
function chop(lines, reg) {
  const out = [];
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i += CHUNK - 1) {
      const part = line.slice(i, Math.min(line.length, i + CHUNK));
      if (part.length > 1 && overlaps(boxOf(part), reg)) out.push(part);
    }
  }
  return out;
}

/* ── Маршрути ────────────────────────────────────────────────────────────── */

/** Точка на великому колі між a і b — для повітряних плечей. */
function greatCircle(a, b, n) {
  const [l0, p0] = [a[0] * RAD, a[1] * RAD];
  const [l1, p1] = [b[0] * RAD, b[1] * RAD];
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((p1 - p0) / 2) ** 2 +
          Math.cos(p0) * Math.cos(p1) * Math.sin((l1 - l0) / 2) ** 2,
      ),
    );
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    if (!d) {
      out.push([a[0], a[1]]);
      continue;
    }
    const A = Math.sin((1 - t) * d) / Math.sin(d),
      B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(p0) * Math.cos(l0) + B * Math.cos(p1) * Math.cos(l1);
    const y = A * Math.cos(p0) * Math.sin(l0) + B * Math.cos(p1) * Math.sin(l1);
    const z = A * Math.sin(p0) + B * Math.sin(p1);
    out.push([
      Math.atan2(y, x) / RAD,
      Math.atan2(z, Math.sqrt(x * x + y * y)) / RAD,
    ]);
  }
  return out;
}

/**
 * Центрипетальний Catmull-Rom (alpha = 0.4) — те саме згладжування, що дає
 * d3.curveCatmullRom. Рахуємо в координатах Меркатора: криву будують за
 * відстанями між точками, а вони при масштабуванні змінюються однаково,
 * тож результат не залежить від того, на якому зумі її потім покажуть.
 */
function smooth(points, alpha = 0.4, samples = 14) {
  const p = points.map(([lon, lat]) => [lon * RAD, psi(lat)]);
  if (p.length < 3) return points.slice();
  const ext = [p[0], ...p, p[p.length - 1]];
  const out = [];
  for (let i = 1; i < ext.length - 2; i++) {
    const [p0, p1, p2, p3] = [ext[i - 1], ext[i], ext[i + 1], ext[i + 2]];
    const t = [0];
    for (let j = 1; j < 4; j++) {
      const a = [p0, p1, p2, p3][j - 1],
        b = [p0, p1, p2, p3][j];
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      t.push(t[j - 1] + Math.pow(d || 1e-9, alpha));
    }
    for (let s = 0; s < samples; s++) {
      const tt = t[1] + ((t[2] - t[1]) * s) / samples;
      const lerp = (a, b, ta, tb) => {
        const w = (tt - ta) / (tb - ta || 1e-9);
        return [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w];
      };
      const a1 = lerp(p0, p1, t[0], t[1]);
      const a2 = lerp(p1, p2, t[1], t[2]);
      const a3 = lerp(p2, p3, t[2], t[3]);
      const b1 = lerp(a1, a2, t[0], t[2]);
      const b2 = lerp(a2, a3, t[1], t[3]);
      const c = lerp(b1, b2, t[1], t[2]);
      out.push(c);
    }
  }
  out.push(p[p.length - 1]);
  return out.map(([l, y]) => [l / RAD, unpsi(y)]);
}

/* ── Квантування ─────────────────────────────────────────────────────────── */

function quantizer(reg) {
  const [x0, y0] = reg;
  return (pts) => {
    const out = [];
    let px = 0,
      py = 0;
    for (const p of pts) {
      const x = Math.round((p[0] - x0) / QUANT),
        y = Math.round((p[1] - y0) / QUANT);
      out.push(x - px, y - py);
      px = x;
      py = y;
    }
    return out;
  };
}

/* ── Збірка ──────────────────────────────────────────────────────────────── */

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;
const reg = region().map((v) => +v.toFixed(3));
console.log("регіон, градуси:", reg.join(", "));

const { before, after } = simplifyArcs(topo);
console.log(
  `точок у дугах: ${before} -> ${after} (${((1 - after / before) * 100).toFixed(0)}% прибрано)`,
);

const merged = topojson.merge(topo, countries.geometries);
const land = [];
let ringsIn = 0,
  ringsOut = 0;
for (const poly of merged.coordinates) {
  const clipped = [];
  for (const ring of poly) {
    ringsIn++;
    if (!overlaps(boxOf(ring), reg)) continue;
    const c = clipRing(ring, reg);
    if (c) {
      clipped.push(c);
      ringsOut++;
    }
  }
  if (clipped.length) land.push(clipped);
}

// Берегова лінія — це край самого суходолу, тож окремим шаром її не тримаємо:
// кільце малюється із заливкою й білим обведенням, як в оригіналі.
// Кордони — спільні дуги, без кримської ділянки: анексію ми не малюємо.
const CRIMEA = [31.4, 43.9, 37.0, 46.6];
const borders = chop(
  topojson
    .mesh(topo, countries, (a, b) => a !== b)
    .coordinates.filter(
      (seg) =>
        !seg.every(
          (p) =>
            p[0] >= CRIMEA[0] &&
            p[0] <= CRIMEA[2] &&
            p[1] >= CRIMEA[1] &&
            p[1] <= CRIMEA[3],
        ),
    ),
  reg,
);

const PORT = {
  novoros: [37.77, 44.72],
  bosph: [29.05, 41.15],
  dard: [26.25, 40.15],
  tartus: [35.87, 34.89],
  khmeimim: [35.95, 35.42],
  tobruk: [23.96, 32.08],
  jufra: [15.96, 29.2],
  khartoum: [32.53, 15.59],
  bangui: [18.56, 4.36],
  bamako: [-8.0, 12.65],
  ouaga: [-1.53, 12.37],
  niamey: [2.11, 13.51],
};
const seaLeg = [
  [37.77, 44.72],
  [36.2, 44.3],
  [33, 43],
  [30.5, 42],
  [29.2, 41.4],
  [29.05, 41.15],
  [28.8, 40.95],
  [27.5, 40.5],
  [26.7, 40.35],
  [26.25, 40.15],
  [25.9, 39.4],
  [25.4, 37.6],
  [27.5, 35.9],
  [30.5, 34.9],
  [32.6, 34.1],
  [34.6, 34.2],
  [35.87, 34.89],
];
const air = (to, n) => greatCircle(PORT.khmeimim, to, n);
const legs = {
  sea: seaLeg,
  escort: seaLeg.slice(9).reverse(),
  airLibya: air(PORT.jufra, 26),
  airTobruk: air(PORT.tobruk, 20),
  airSudan: air(PORT.khartoum, 26),
  airCar: air(PORT.bangui, 30),
  airMali: air(PORT.bamako, 34),
  airOuaga: air(PORT.ouaga, 32),
  airNiamey: air(PORT.niamey, 30),
};

const q = quantizer(reg);
const data = {
  note: "Згенеровано scripts/build-map-tartus.mjs з world-atlas countries-50m (Natural Earth). Руками не правити.",
  region: reg,
  quant: QUANT,
  land: land.map((poly) => poly.map(q)),
  borders: borders.map(q),
  legs: Object.fromEntries(
    Object.entries(legs).map(([k, v]) => [k, q(smooth(v))]),
  ),
  // Рамка маршруту рахується з опорних точок, а не зі згладженої лінії:
  // саме за нею карта підбирає кадр кроку, і крива тут дала б інший масштаб.
  legBox: Object.fromEntries(
    Object.entries(legs).map(([k, v]) => [
      k,
      boxOf(v).map((n) => +n.toFixed(4)),
    ]),
  ),
};

mkdirSync(dirname(fileURLToPath(OUT)), { recursive: true });
writeFileSync(fileURLToPath(OUT), JSON.stringify(data));
const size = readFileSync(fileURLToPath(OUT)).length;
console.log(
  `кільця суходолу: ${ringsOut} з ${ringsIn} · кордони: ${borders.length} шматків`,
);
console.log(`${fileURLToPath(OUT)} — ${(size / 1024).toFixed(0)} КБ`);
