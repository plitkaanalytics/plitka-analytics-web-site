/**
 * Готує геометрію для прокрутних карт статті syriyskyi-ekspres:
 * «Що давав Тартус» (§ 00) і «Нові маршрути експресу» (§ 04).
 *
 *   node scripts/build-map-region.mjs            — обидві
 *   node scripts/build-map-region.mjs north      — тільки задану
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

const RAD = Math.PI / 180;
const CHUNK = 96; // точок у шматку лінії
const QUANT = 1.8e-3; // градуса на одиницю квантування — половина кроку джерела

/**
 * Скільки деталей лишати. Natural Earth 50m дає точку кожні 0.0036° — це
 * приблизно 1.6 px на найглибшому зумі карти й соті частки пікселя на
 * найширшому. Тримати таку саму дрібність для Атлантики, яку читач бачить
 * тільки загальним планом, немає сенсу: вона коштує півмегабайта.
 *
 * Допуск — максимальне відхилення спрощеної лінії від вихідної, у градусах;
 * зони кожна карта задає собі сама, у своєму конфізі внизу файлу.
 */
const TOL_FAR_DEFAULT = 0.08; // поза зонами світ видно краєм ока, ~10 px на градус

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

/**
 * Регіон — усе, що взагалі може потрапити в кадр.
 *
 * Найширший кадр карти — той, де вміщено весь її вміст: усі точки й усі
 * маршрути. Кадри окремих кроків завжди тісніші, а переліт між двома
 * кроками відводить камеру рівно настільки, щоб побачити обидва — тобто теж
 * не ширше за повний вміст. Далі до цього додається пропорція вікна: вміст
 * вписують у ліву частину полотна (праворуч стоїть картка), а видно все
 * полотно, тож із правого краю лишається запас.
 *
 * Рахуємо це для реальних пропорцій вікон і додаємо чверть кадру зверху.
 */
const MARGIN = 0.25;

function canvasSizes() {
  // Реальні пропорції вікон, не декартів добуток: вікна 320x1200 не буває.
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
    [2560, 1200],
  ];
  return viewports.map(([vw, vh]) => ({
    W: vw,
    // Стелю висоти ставить сама карта (див. cfg.tall); тут — те, що дає вікно.
    H0: vw <= 900 ? Math.max(300, vh * 0.52) : Math.max(420, vh - 70),
    wide: vw > 900,
  }));
}

function region(cfg) {
  const pts = [...Object.values(cfg.legs).flat(), ...(cfg.points ?? [])];
  const box = boxOf(pts);
  const corners = [
    [box[0], box[1]],
    [box[2], box[1]],
    [box[2], box[3]],
    [box[0], box[3]],
  ];
  let lon0 = Infinity,
    lat0 = Infinity,
    lon1 = -Infinity,
    lat1 = -Infinity;
  for (const { W, H0, wide } of canvasSizes()) {
    // Те саме, що робить fitStep у компоненті.
    const H = Math.min(H0, cfg.tall ? 1200 : 900);
    const pad = cfg.pad ?? 0.14;
    const railW = Math.min(430, W * 0.44);
    const right = Math.max(W * 0.5, W - (wide ? railW + 70 : 0));
    const band = wide ? H : H * 0.45; // те саме MOBILE_BAND, що в компоненті
    const { k, t } = fitPoints(
      corners,
      W * 0.13,
      band * pad,
      right - W * 0.03,
      band * (1 - pad),
    );
    // Видно все полотно, а не тільки ту частину, куди вписали вміст.
    const lons = [0, W].map((x) => (x - t[0]) / k / RAD);
    const lats = [0, H].map((y) => unpsi((t[1] - y) / k));
    lon0 = Math.min(lon0, ...lons);
    lon1 = Math.max(lon1, ...lons);
    lat0 = Math.min(lat0, ...lats);
    lat1 = Math.max(lat1, ...lats);
  }
  const dx = (lon1 - lon0) * MARGIN,
    dy = (lat1 - lat0) * MARGIN;
  return [
    Math.max(-180, lon0 - dx),
    Math.max(-85, lat0 - dy),
    Math.min(180, lon1 + dx),
    Math.min(85, lat1 + dy),
  ];
}

/* ── Спрощення дуг ───────────────────────────────────────────────────────── */

/**
 * Дуги в topojson спільні: той самий відрізок берега належить і суходолу,
 * і кордону. Тому спрощуємо саме їх, до складання шарів — інакше біла
 * берегова лінія поїхала б відносно заливки.
 */
function simplifyArcs(cfg, topo) {
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
    const kept = douglasPeucker(pts, tolFor(cfg, boxOf(pts)));
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
function tolFor(cfg, b) {
  let tol = cfg.tolFar ?? TOL_FAR_DEFAULT;
  for (const z of cfg.zones) if (overlaps(b, z.box)) tol = Math.min(tol, z.tol);
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

/**
 * Кільця, що перетинають антимеридіан, ріжемо по ньому. Інакше відрізок із
 * +179° у -179° лишається в геометрії як стрибок через увесь світ і на карті
 * малюється горизонтальною смугою. Таких кілець у Natural Earth п'ять:
 * Євразія (через Чукотку), Врангеля, Фіджі й Антарктида.
 */
function splitAntimeridian(ring) {
  const pieces = [];
  let cur = [ring[0]];
  for (let i = 1; i < ring.length; i++) {
    const a = ring[i - 1],
      b = ring[i];
    const d = b[0] - a[0];
    if (Math.abs(d) <= 180) {
      cur.push(b);
      continue;
    }
    const east = d < 0; // a біля +180, b біля -180
    const bx = east ? b[0] + 360 : b[0] - 360;
    const edge = east ? 180 : -180;
    const t = (edge - a[0]) / (bx - a[0]);
    const lat = a[1] + t * (b[1] - a[1]);
    cur.push([edge, lat]);
    pieces.push(cur);
    cur = [[-edge, lat], b];
  }
  if (!pieces.length) return [ring];
  pieces[0] = cur.concat(pieces[0].slice(1)); // кільце замкнене
  return pieces.map(closePiece);
}

/** Замикає шматок: по меридіану, а якщо кінці на різних — через полюс. */
function closePiece(p) {
  const a = p[0],
    b = p[p.length - 1];
  const out = p.slice();
  if (Math.abs(a[0] - b[0]) > 1) {
    const pole = a[1] > 0 ? 90 : -90;
    out.push([b[0], pole], [a[0], pole]);
  }
  out.push(a.slice());
  return out;
}

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

// Кордони малюємо без кримської ділянки: анексію ми не показуємо.
const CRIMEA = [31.4, 43.9, 37.0, 46.6];

function build(cfg) {
  // Свіжа копія атласу на кожну карту: спрощення переписує дуги під зони,
  // а зони в карт різні.
  const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
  const countries = topo.objects.countries;
  const reg = region(cfg).map((v) => +v.toFixed(3));

  const { before, after } = simplifyArcs(cfg, topo);

  const merged = topojson.merge(topo, countries.geometries);
  const land = [];
  let ringsIn = 0,
    ringsOut = 0;
  for (const poly of merged.coordinates) {
    const clipped = [];
    for (const whole of poly) {
      ringsIn++;
      for (const ring of splitAntimeridian(whole)) {
        if (!overlaps(boxOf(ring), reg)) continue;
        const c = clipRing(ring, reg);
        if (c) {
          clipped.push(c);
          ringsOut++;
        }
      }
    }
    if (clipped.length) land.push(clipped);
  }

  // Берегова лінія — це край самого суходолу, тож окремим шаром її не
  // тримаємо: кільце малюється із заливкою, а обведення компонент ріже сам.
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

  const q = quantizer(reg);
  const data = {
    note: "Згенеровано scripts/build-map-region.mjs з world-atlas countries-50m (Natural Earth). Руками не правити.",
    region: reg,
    quant: QUANT,
    land: land.map((poly) => poly.map(q)),
    borders: borders.map(q),
    legs: Object.fromEntries(
      Object.entries(cfg.legs).map(([k, v]) => [k, q(smooth(v))]),
    ),
    // Рамка маршруту рахується з опорних точок, а не зі згладженої лінії:
    // саме за нею карта підбирає кадр кроку, і крива тут дала б інший масштаб.
    legBox: Object.fromEntries(
      Object.entries(cfg.legs).map(([k, v]) => [
        k,
        boxOf(v).map((n) => +n.toFixed(4)),
      ]),
    ),
  };

  const out = new URL(cfg.out, ROOT);
  mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
  writeFileSync(fileURLToPath(out), JSON.stringify(data));
  const size = readFileSync(fileURLToPath(out)).length;
  console.log(
    `${cfg.name}: регіон ${reg.join(", ")}
` +
      `  точок у дугах ${before} -> ${after} (${((1 - after / before) * 100).toFixed(0)}% прибрано)` +
      ` · кільця суходолу ${ringsOut} з ${ringsIn} · кордони ${borders.length} шматків
` +
      `  ${cfg.out} — ${(size / 1024).toFixed(0)} КБ`,
  );
}

/* ── Карти ───────────────────────────────────────────────────────────────── */

const KHMEIMIM = [35.95, 35.42];
const air = (to, n) => greatCircle(KHMEIMIM, to, n);

// § 00. Морський маршрут Новоросійськ — Тартус і повітряне плече в Африку.
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

const TARTUS = {
  name: "tartus",
  out: "public/articles/syriyskyi-ekspres/tartus-map.json",
  baseBox: [
    [-16, -2],
    [44, 48],
  ],
  zones: [
    { box: [33, 32, 40, 38], tol: 0.0009 }, // Тартус і Хмеймім: 437 px на градус
    { box: [18, 24, 48, 50], tol: 0.003 }, // Чорне море, протоки, Егейське: 100 px
    { box: [-25, -15, 55, 58], tol: 0.02 }, // Африка й Сахель: не ближче за 33 px
  ],
  // Америки й Азія потрапляють у кадр лише на дуже широких і низьких вікнах,
  // де на градус припадає кілька пікселів: там і чверть градуса непомітна.
  tolFar: 0.25,
  legs: {
    sea: seaLeg,
    escort: seaLeg.slice(9).reverse(),
    airLibya: air([15.96, 29.2], 26),
    airTobruk: air([23.96, 32.08], 20),
    airSudan: air([32.53, 15.59], 26),
    airCar: air([18.56, 4.36], 30),
    airMali: air([-8.0, 12.65], 34),
    airOuaga: air([-1.53, 12.37], 32),
    airNiamey: air([2.11, 13.51], 30),
  },
};

// § 04. Північний маршрут у Гвінейську затоку й середземноморський у Тартус.
// Точка розходження — біля португальського берега; далі один іде повз
// Гібралтар, другий у нього.
const FORK = [-9.8, 41.5];

const northLeg = [
  [33.08, 68.97],
  [32.0, 69.9],
  [27, 70.9],
  [23, 71.2],
  [17, 70.0],
  [11, 67.5],
  [6, 64.5],
  [2.5, 62],
  [0, 60.5],
  [-2, 59.5],
  [-5, 59],
  [-8, 58.3],
  [-10, 56.5],
  [-11, 54],
  [-11, 51],
  [-10.5, 48],
  [-10, 45],
  FORK,
  [-10, 39],
  [-10.5, 36.5],
  [-11, 34],
  [-13, 31],
  [-15, 28],
  [-17, 24],
  [-18, 20],
  [-18.5, 16],
  [-18, 13],
  [-17.5, 11],
  [-16, 9.5],
  [-14.5, 9.2],
  [-13.71, 9.51],
];

const balticLeg = [
  [19.9, 54.65],
  [18.5, 55.2],
  [16, 55.3],
  [14.5, 54.9],
  [12.9, 55.3],
  [11.0, 55.4],
  [10.8, 56.6],
  [11.2, 57.6],
  [10.5, 57.9],
  [8, 57.8],
  [5, 57],
  [3, 56],
  [2, 54.5],
  [1.6, 52],
  [1.4, 51.2],
  [0.5, 50.3],
  [-1.5, 50.0],
  [-4, 49.5],
  [-6, 48.8],
  [-8, 47.5],
  [-9, 45],
  FORK,
];

const medLeg = [
  FORK,
  [-9.5, 37.5],
  [-7, 36.3],
  [-5.35, 36.0],
  [-3, 36.2],
  [0, 37.2],
  [4, 38],
  [8, 38],
  [11.5, 37.3],
  [15, 36.2],
  [20, 34.6],
  [26, 34.2],
  [32, 34.4],
  [35.87, 34.89],
];

const gulfLeg = [
  [-13.71, 9.51],
  [-13, 8.5],
  [-11, 7],
  [-9, 4.8],
  [-7, 4.2],
  [-4, 4.2],
  [-1, 4.6],
  [0.5, 5.5],
  [1.29, 6.14],
];

// Версія, яку розслідування спростувало: нібито з Тартуса в Конакрі.
const assumedLeg = [
  [35.87, 34.89],
  [32, 34.4],
  [26, 34.2],
  [20, 34.6],
  [15, 36.2],
  [11.5, 37.3],
  [8, 38],
  [4, 38],
  [0, 37.2],
  [-5.35, 36.0],
  [-7, 36.3],
  [-9.5, 35],
  [-11, 33],
  [-13, 31],
  [-15, 28],
  [-17, 24],
  [-18, 20],
  [-18.5, 16],
  [-18, 13],
  [-17.5, 11],
  [-16, 9.5],
  [-14.5, 9.2],
  [-13.71, 9.51],
];

const NORTH = {
  name: "north",
  out: "public/articles/syriyskyi-ekspres/north-routes-map.json",
  baseBox: [
    [-22, 3],
    [42, 71],
  ],
  zones: [
    // Уся смуга від Баренцева моря до Гвінейської затоки: найтісніший кадр
    // тут — Кольський і протоки, це близько 125 px на градус.
    { box: [-24, 2, 44, 73], tol: 0.003 },
  ],
  tolFar: 0.25,
  // Маршрут дуже високий: від Баренцева моря до Гвінейської затоки. Щоб на
  // широкому екрані карта не відходила на пів світу, полотно тут вище, а
  // поле навколо вмісту менше.
  tall: true,
  pad: 0.06,
  legs: {
    north: northLeg,
    baltic: balticLeg,
    med: medLeg,
    gulf: gulfLeg,
    assumed: assumedLeg,
  },
};

const MAPS = [TARTUS, NORTH];
const only = process.argv[2];
for (const cfg of MAPS) {
  if (only && cfg.name !== only) continue;
  build(cfg);
}
