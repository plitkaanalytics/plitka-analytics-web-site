/**
 * Карта до § 03 матеріалу «Резервне море Каспій»: розвилка на Волзі.
 *
 *   node scripts/build-route-shift-map.mjs
 *
 * Абзац, який вона ілюструє: «Всихає рух на захід, через канал в Азов і далі
 * в Чорне море. Росте рух упоперек самого Каспію — до іранських портів».
 * Обидва плеча починаються з однієї річки, і саме це карта має показати:
 * вантаж не зник, він повернув ліворуч замість праворуч.
 *
 * Кадр обрізано по півночі Каспію: далі на південь карта вже нічого не
 * додає, іранські порти показує окрема карта до § 02. Натомість угорі є
 * місце для того, звідки вантаж іде — волзьких НПЗ.
 *
 * Чисел на карті немає — їх несуть сусідні графіки. Карта показує напрямок.
 *
 * Геометрія суходолу — Natural Earth 1:10m із world-atlas. Річки — звідти ж,
 * обрізані по рамці в scripts/data/rivers-ne10m-caspian.json. Канал проведено
 * між Волгоградом і Калачем-на-Дону: у Natural Earth його немає, а кінці
 * відомі.
 *
 * Дві перевірки друкуються перед записом і мають бути чисті:
 *   1. морські ділянки маршруту не влучають у суходіл;
 *   2. прямі підписи не накладаються один на одного.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-10m.json", ROOT);
const RIVERS = new URL("scripts/data/rivers-ne10m-caspian.json", ROOT);
const OUT = "public/articles/rezervne-more/route-shift.svg";

/* ── Рамка й полотно ─────────────────────────────────────────────────────── */

// Від Керченської протоки до казахського берега; на півночі — Саратов.
const REG = [34.8, 41.6, 54.6, 52.3];
const W = 760;

const RAD = Math.PI / 180;
const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

function projection(reg, width) {
  const k = width / ((reg[2] - reg[0]) * RAD);
  return {
    h: k * (psi(reg[3]) - psi(reg[1])),
    X: (lon) => k * (lon - reg[0]) * RAD,
    Y: (lat) => k * (psi(reg[3]) - psi(lat)),
  };
}

const PR = projection(REG, W);
const H = Math.round(PR.h);
const f = (n) => n.toFixed(1);
const X = (lon) => PR.X(lon);
const Y = (lat) => PR.Y(lat);
const P = (p) => f(X(p[0])) + "," + f(Y(p[1]));

/* ── Палітра: ті самі значення, що в globals.css ─────────────────────────── */

const C = {
  sea: "#dfe6e9",
  land: "#e5e0d9",
  coast: "#ffffff",
  border: "#c9c1b5",
  river: "#b3c3ca",
  riverInk: "#7e949d",
  ink: "#2a2a2a",
  grown: "#f24c06", // --orange
  dried: "#898270", // --taupe
  stop: "#8c2d04", // --rust
  country: "#6f6758",
  seaInk: "#7d8a90",
};

/* ── Вузли ───────────────────────────────────────────────────────────────── */

const N = {
  volgaTop: [48.3, 52.7], // за верхнім краєм кадру: лінія заходить ззовні
  saratov: [46.03, 51.53],
  volgograd: [44.52, 48.7],
  kalach: [43.53, 48.69],
  rostov: [39.72, 47.22],
  donMouth: [39.38, 47.11],
  kerch: [36.85, 45.5],
  astrakhan: [48.04, 46.35],
  deltaMouth: [48.63, 46.09],
  makhachkala: [47.5, 42.98],
};

// Азовське плече: точки підібрано по смузі відкритої води, яку дає та сама
// геометрія суходолу. У Таганрозькій затоці судноплавний прохід вузький, а
// між 37,8° і 38,0° сходяться коси, тож фарватер іде північніше.
const AZOV = [
  [39.35, 47.12],
  [39.3, 47.09],
  [39.25, 47.08],
  [39.1, 47.12],
  [38.7, 47.0],
  [38.3, 46.9],
  [37.9, 46.8],
  [37.75, 46.75],
  [37.6, 46.45],
  [37.4, 46.1],
  [37.0, 45.7],
];

// Каспійське плече: магістраллю по осі моря, як на карті до § 02.
const CASP = [
  [48.9, 45.8],
  [49.2, 45.0],
  [49.4, 44.0],
  [49.6, 43.0],
  [49.8, 42.0],
];

const DOTS = [
  { name: "Саратов", at: N.saratov, anchor: "end", dx: -9, dy: 4 },
  { name: "Волгоград", at: N.volgograd, anchor: "start", dx: 9, dy: -8 },
  { name: "Ростов-на-Дону", at: N.rostov, anchor: "end", dx: -9, dy: 13 },
  { name: "Астрахань", at: N.astrakhan, anchor: "end", dx: -9, dy: 4 },
  { name: "Махачкала", at: N.makhachkala, anchor: "end", dx: -9, dy: 4 },
];

const LABELS = [
  { text: "РОСІЯ", lon: 42.2, lat: 51.4 },
  { text: "УКРАЇНА", lon: 35.9, lat: 49.4 },
  { text: "КАЗАХСТАН", lon: 52.9, lat: 48.4 },
  { text: "АЗЕРБАЙДЖАН", lon: 46.6, lat: 41.9 },
];

const SEAS = [
  { text: "Азовське", lon: 37.25, lat: 46.42 },
  { text: "Чорне море", lon: 35.9, lat: 43.3 },
  { text: "Каспійське море", lon: 51.7, lat: 43.6 },
];

/* ── Геометрія ───────────────────────────────────────────────────────────── */

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

/** Дуглас-Пекер: викидає точки, які нікуди не відхиляють лінію. */
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
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
  let out = ring.slice(0, -1);
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

const ringsOf = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);
const path = (pts, close) =>
  pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (close ? "Z" : "");

const TOL = 0.004;

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;
const landGeom = topojson.merge(topo, countries.geometries);

const prep = (polys) => {
  const out = [];
  for (const poly of polys) {
    const kept = [];
    for (const ring of poly) {
      if (!overlaps(boxOf(ring), REG)) continue;
      const c = clipRing(simplify(ring, TOL), REG);
      if (c) kept.push(c);
    }
    if (kept.length) out.push(kept);
  }
  return out;
};

const land = prep(ringsOf(landGeom));
const borders = topojson
  .mesh(topo, countries, (a, b) => a !== b)
  .coordinates.filter((l) => overlaps(boxOf(l), REG))
  .map((l) => simplify(l, TOL));

const polyPath = (polys) =>
  polys.map((rings) => rings.map((r) => path(r, true)).join("")).join("");

/* ── Річки: ділянка між двома точками ────────────────────────────────────── */

const riversRaw = JSON.parse(readFileSync(fileURLToPath(RIVERS), "utf8"));

const KEY = (p) => p[0].toFixed(3) + "|" + p[1].toFixed(3);
const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

/**
 * Natural Earth дає річку шматками, а в дельті вони ще й розгалужуються, тож
 * зшити все в одну лінію не можна. Ділянку між двома точками шукаємо обходом
 * графа: вершини — кінці сегментів, ребра — самі сегменти.
 */
function reach(name, a, b) {
  const segs = riversRaw[name];

  const nearest = (pt) => {
    let best = { d: Infinity };
    segs.forEach((seg, si) =>
      seg.forEach((p, i) => {
        const d = d2(p, pt);
        if (d < best.d) best = { d, si, i };
      }),
    );
    return best;
  };

  const A = nearest(a);
  const B = nearest(b);
  if (A.si === B.si) {
    const [i, j] = [A.i, B.i].sort((x, y) => x - y);
    const part = segs[A.si].slice(i, j + 1);
    return A.i <= B.i ? part : part.slice().reverse();
  }

  const byNode = new Map();
  segs.forEach((seg, si) => {
    for (const end of [0, seg.length - 1]) {
      const k = KEY(seg[end]);
      if (!byNode.has(k)) byNode.set(k, []);
      byNode.get(k).push(si);
    }
  });

  const prev = new Map([[A.si, null]]);
  const queue = [A.si];
  while (queue.length) {
    const si = queue.shift();
    if (si === B.si) break;
    const seg = segs[si];
    for (const end of [0, seg.length - 1])
      for (const nb of byNode.get(KEY(seg[end])) || [])
        if (!prev.has(nb)) {
          prev.set(nb, si);
          queue.push(nb);
        }
  }
  if (!prev.has(B.si)) throw new Error(`${name}: сегменти не зв'язані`);

  const order = [];
  for (let si = B.si; si !== null; si = prev.get(si)) order.unshift(si);

  /** Спільний кінець двох сегментів. */
  const joint = (p, q) => {
    for (const ep of [segs[p][0], segs[p][segs[p].length - 1]])
      for (const eq of [segs[q][0], segs[q][segs[q].length - 1]])
        if (KEY(ep) === KEY(eq)) return KEY(ep);
    throw new Error(`${name}: сегменти ${p} і ${q} не стикуються`);
  };

  const out = [];
  for (let n = 0; n < order.length; n++) {
    const seg = segs[order[n]];
    const from =
      n === 0
        ? A.i
        : seg.findIndex((p) => KEY(p) === joint(order[n - 1], order[n]));
    const to =
      n === order.length - 1
        ? B.i
        : seg.findIndex((p) => KEY(p) === joint(order[n], order[n + 1]));
    const head =
      from <= to ? seg.slice(from, to + 1) : seg.slice(to, from + 1).reverse();
    out.push(...(out.length ? head.slice(1) : head));
  }
  return out;
}

/* ── Два плеча ───────────────────────────────────────────────────────────── */

const WEST = [
  N.volgograd,
  N.kalach, // канал
  ...reach("Don", N.kalach, N.donMouth).slice(1),
  ...AZOV,
  N.kerch,
];

const EAST = [...reach("Volga", N.volgaTop, N.deltaMouth), ...CASP];

const BRANCH = [[49.6, 43.0], N.makhachkala];

/* ── Перевірка 1: чи не лізе морська ділянка на суходіл ──────────────────── */

const RINGS = ringsOf(landGeom).flat();
function onLand(p) {
  let inside = false;
  for (const ring of RINGS) {
    const b = boxOf(ring);
    if (p[0] < b[0] || p[0] > b[2] || p[1] < b[1] || p[1] > b[3]) continue;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i],
        [xj, yj] = ring[j];
      if (
        yi > p[1] !== yj > p[1] &&
        p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi
      )
        inside = !inside;
    }
  }
  return inside;
}

let clean = true;

function checkSea(pts, label) {
  const bad = [];
  for (let s = 0; s < pts.length - 1; s++) {
    for (let t = 0; t <= 20; t++) {
      if ((s === 0 && t === 0) || (s === pts.length - 2 && t === 20)) continue;
      const u = t / 20;
      const p = [
        pts[s][0] + (pts[s + 1][0] - pts[s][0]) * u,
        pts[s][1] + (pts[s + 1][1] - pts[s][1]) * u,
      ];
      if (onLand(p)) bad.push(p.map((n) => n.toFixed(2)).join(","));
    }
  }
  if (bad.length) {
    clean = false;
    console.warn(
      `  ! ${label}: суходіл у ${bad.length} точках — ${bad.slice(0, 6).join("  ")}`,
    );
  } else console.log(`  · ${label}: чисто`);
}

console.log("Морські ділянки:");
// Гирла не перевіряємо: у Natural Earth 10m лінії Дону й Волги закінчуються
// трохи вище за берегову, і ділянка в кілька кілометрів через дельту за цією
// геометрією завжди буде «на суходолі».
checkSea([...AZOV.slice(2), N.kerch], "Азов → Керченська протока");
checkSea(CASP, "Каспій на південь");
checkSea(BRANCH, "відгалуження на Махачкалу");

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const parts = [];
const add = (s) => parts.push(s);

/** Кожен прямий підпис реєструємо, щоб потім перевірити накладання. */
const BOXES = [];
function text(
  x,
  y,
  s,
  {
    anchor = "start",
    size = 12.5,
    weight,
    fill,
    family,
    style,
    spacing,
    skipCheck,
    box,
  } = {},
) {
  const w = s.length * size * 0.56 + (spacing ? s.length * spacing : 0);
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  if (!skipCheck)
    BOXES.push(
      box || { s, x0, y0: y - size * 0.78, x1: x0 + w, y1: y + size * 0.24 },
    );
  add(
    "<text" +
      ' x="' +
      f(x) +
      '" y="' +
      f(y) +
      '" text-anchor="' +
      anchor +
      '" font-family="' +
      (family || "system-ui, sans-serif") +
      '" font-size="' +
      size +
      '"' +
      (weight ? ' font-weight="' + weight + '"' : "") +
      (style ? ' font-style="' + style + '"' : "") +
      (spacing ? ' letter-spacing="' + spacing + '"' : "") +
      ' paint-order="stroke" stroke="#ffffff" stroke-width="3.2"' +
      ' stroke-linejoin="round" fill="' +
      fill +
      '">' +
      s +
      "</text>",
  );
}

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    W +
    " " +
    H +
    '" role="img" aria-labelledby="rs-t rs-d">',
);
add(
  '<title id="rs-t">Розвилка на Волзі: два виходи для одного вантажу</title>',
);
add(
  '<desc id="rs-d">Карта від Керченської протоки до казахського берега ' +
    "Каспію. Згори в кадр входить Волга, якою пальне спускається з волзьких " +
    "нафтопереробних заводів. Під Волгоградом шлях роздвоюється. Західне " +
    "плече йде Волго-Донським каналом у Дон, повз Ростов-на-Дону в Азовське " +
    "море й упирається в перекреслену Керченську протоку; воно показане " +
    "приглушеним кольором. Південне плече йде Волгою через Астрахань у " +
    "Каспійське море, має відгалуження на Махачкалу й виходить за нижній " +
    "край кадру на іранські порти; воно показане помаранчевим.</desc>",
);

add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + polyPath(land) + '" fill="' + C.land + '"/>');

add(
  '<g fill="none" stroke="' +
    C.river +
    '" stroke-width="1.2" stroke-linejoin="round">',
);
for (const lines of Object.values(riversRaw))
  for (const l of lines)
    add('<path d="' + path(simplify(l, 0.008), false) + '"/>');
add("</g>");

add(
  '<path d="' +
    polyPath(land) +
    '" fill="none" stroke="' +
    C.coast +
    '" stroke-width="1.2"/>',
);
add(
  '<g fill="none" stroke="' +
    C.border +
    '" stroke-width="1" stroke-dasharray="4 3">',
);
for (const l of borders) add('<path d="' + path(l, false) + '"/>');
add("</g>");

/* Назви держав: розріджений капітель, оливковий. */
for (const l of LABELS)
  text(X(l.lon), Y(l.lat), l.text, {
    anchor: "middle",
    size: 12.5,
    weight: 600,
    spacing: 2,
    fill: C.country,
  });

/* Гідроніми: серифний курсив. Моря — вільним текстом, річки — уздовж русла. */
for (const l of SEAS)
  text(X(l.lon), Y(l.lat), l.text, {
    anchor: "middle",
    size: 12.5,
    style: "italic",
    family: "Georgia, serif",
    fill: C.seaInk,
  });

/**
 * Підпис уздовж русла. Беремо дотичну в найближчій до `near` точці річки,
 * повертаємо текст на її кут і зсуваємо по нормалі, щоб літери не лежали на
 * самій лінії. Якщо кут вивернув би підпис догори дриґом, додаємо 180°.
 *
 * textPath тут не годиться: на крутій ділянці, що йде праворуч наліво, він
 * дає дзеркальний текст, а розвернути доріжку не завжди можна — вона та сама
 * для обох напрямків.
 */
function riverLabel(river, near, label, side) {
  let best = { d: Infinity };
  for (const seg of riversRaw[river])
    seg.forEach((p, i) => {
      const d = d2(p, near);
      if (d < best.d) best = { d, seg, i };
    });
  const { seg, i } = best;
  const a = seg[Math.max(0, i - 3)];
  const b = seg[Math.min(seg.length - 1, i + 3)];
  let ang = (Math.atan2(Y(b[1]) - Y(a[1]), X(b[0]) - X(a[0])) * 180) / Math.PI;
  if (ang > 90 || ang < -90) ang += 180;
  const rad = (ang * Math.PI) / 180;
  const cx = X(seg[i][0]) - Math.sin(rad) * side;
  const cy = Y(seg[i][1]) + Math.cos(rad) * side;
  const size = 12;
  // Повернутий підпис займає приблизно квадрат — так перевірка накладань не
  // проґавить сусіда з будь-якого боку.
  const r = (label.length * size * 0.56) / 2;
  add('<g transform="rotate(' + f(ang) + " " + f(cx) + " " + f(cy) + ')">');
  text(cx, cy, label, {
    anchor: "middle",
    size,
    style: "italic",
    family: "Georgia, serif",
    fill: C.riverInk,
    box: { s: label, x0: cx - r, y0: cy - r, x1: cx + r, y1: cy + r },
  });
  add("</g>");
}

/* Плеча маршруту. */
add(
  '<path fill="none" stroke="' +
    C.dried +
    '" stroke-width="2.4" stroke-dasharray="7 5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" d="' +
    path(WEST, false) +
    '"/>',
);
add(
  '<g fill="none" stroke="' +
    C.grown +
    '" stroke-width="3.4" stroke-dasharray="8 5" stroke-linecap="round" stroke-linejoin="round">',
);
add('<path d="' + path(EAST, false) + '"/>');
add('<path d="' + path(BRANCH, false) + '"/>');
add("</g>");

/** Трикутник на кінці лінії, за напрямком останнього відрізка. */
function arrow(from, to, fill, size = 8) {
  const x1 = X(to[0]),
    y1 = Y(to[1]);
  const a = Math.atan2(y1 - Y(from[1]), x1 - X(from[0]));
  const p = (ang, r) =>
    f(x1 + r * Math.cos(a + ang)) + "," + f(y1 + r * Math.sin(a + ang));
  add(
    '<path d="M' +
      f(x1) +
      "," +
      f(y1) +
      "L" +
      p(2.5, size * 1.6) +
      "L" +
      p(-2.5, size * 1.6) +
      'Z" fill="' +
      fill +
      '"/>',
  );
}

// Лише внизу, на виході з кадру. Угорі стрілка лізла на власний підпис, а
// напис «з волзьких НПЗ» і без неї каже, звідки вантаж приходить.
arrow(EAST[EAST.length - 2], EAST[EAST.length - 1], C.grown);

/* Гідроніми-річки: уздовж русел, поверх маршруту. */
riverLabel("Volga", [45.9, 50.6], "Волга", 9);
riverLabel("Don", [40.6, 50.6], "Дон", -9);

/* Хрест на вході в Керченську протоку. */
{
  const cx = X(N.kerch[0]),
    cy = Y(N.kerch[1]),
    r = 7.5;
  add('<g stroke="' + C.stop + '" stroke-width="2.6" stroke-linecap="round">');
  add(
    '<path d="M' +
      f(cx - r) +
      "," +
      f(cy - r) +
      "L" +
      f(cx + r) +
      "," +
      f(cy + r) +
      '"/>',
  );
  add(
    '<path d="M' +
      f(cx + r) +
      "," +
      f(cy - r) +
      "L" +
      f(cx - r) +
      "," +
      f(cy + r) +
      '"/>',
  );
  add("</g>");
}
text(X(N.kerch[0]) - 10, Y(N.kerch[1]) + 22, "Керченська протока", {
  anchor: "middle",
  size: 11.5,
  weight: 600,
  fill: C.stop,
});

/* Підписи до стрілок. Верхній прив'язуємо не до початку плеча — той уже за
   кадром, — а до першої точки, що впевнено в кадр потрапила. */
const topIn = EAST.find((q) => q[1] <= REG[3] - 0.18) || EAST[0];
text(X(topIn[0]) + 14, Y(topIn[1]) + 4, "з волзьких НПЗ", {
  size: 11.5,
  weight: 600,
  fill: C.grown,
});
text(
  X(CASP[CASP.length - 1][0]) + 14,
  Y(CASP[CASP.length - 1][1]) + 4,
  "на іранські порти",
  { size: 11.5, weight: 600, fill: C.grown },
);

/* Канал: окремий колір, бо це єдина лінія, якої в геометрії немає. Сам
   підпис утричі довший за відрізок, тому стоїть у вільному степу між Доном
   і Волгою, а до лінії веде виноска. */
{
  const lx = X(44.25),
    ly = Y(47.95);
  add(
    '<path d="M' + f(X(44.05)) + "," + f(Y(48.66)) + "L" + f(lx) + "," +
      f(ly - 26) + '" fill="none" stroke="' + C.dried +
      '" stroke-width="1"/>',
  );
  for (const [k, line] of [
    [0, "Волго-Донський"],
    [1, "канал"],
  ])
    text(lx, ly - 13 + k * 14, line, {
      anchor: "middle",
      size: 11.5,
      weight: 700,
      fill: C.dried,
    });
}

/* Міста: найтемніше й найжирніше на карті. */
for (const p of DOTS) {
  add(
    '<circle cx="' +
      f(X(p.at[0])) +
      '" cy="' +
      f(Y(p.at[1])) +
      '" r="4.5" fill="' +
      C.ink +
      '" stroke="#ffffff" stroke-width="1.5"/>',
  );
  text(X(p.at[0]) + p.dx, Y(p.at[1]) + p.dy, p.name, {
    anchor: p.anchor,
    size: 12.5,
    weight: 700,
    fill: C.ink,
  });
}

/* Легенда: колір продубльовано словами. Стоїть у власному полі, тож у
   перевірці накладань не бере участі. */
{
  const x0 = 16,
    y0 = H - 48;
  add(
    '<rect x="' +
      (x0 - 8) +
      '" y="' +
      (y0 - 19) +
      '" width="296" height="60" rx="4" fill="#ffffff" opacity="0.86"/>',
  );
  add(
    '<path d="M' +
      x0 +
      "," +
      y0 +
      'h28" stroke="' +
      C.grown +
      '" stroke-width="3.4" stroke-dasharray="8 5" stroke-linecap="round"/>',
  );
  text(x0 + 38, y0 + 4, "через Каспій на Іран: потік зріс", {
    fill: C.ink,
    skipCheck: true,
  });
  add(
    '<path d="M' +
      x0 +
      "," +
      (y0 + 24) +
      'h28" stroke="' +
      C.dried +
      '" stroke-width="2.4" stroke-dasharray="7 5" stroke-linecap="round" opacity="0.8"/>',
  );
  text(x0 + 38, y0 + 28, "каналом в Азов: потік усох", {
    fill: C.ink,
    skipCheck: true,
  });
}

add("</svg>");

/* ── Перевірка 2: накладання підписів ────────────────────────────────────── */

console.log("Підписи:");
{
  const hits = [];
  for (let i = 0; i < BOXES.length; i++)
    for (let j = i + 1; j < BOXES.length; j++) {
      const a = BOXES[i],
        b = BOXES[j];
      if (a.x1 > b.x0 && b.x1 > a.x0 && a.y1 > b.y0 && b.y1 > a.y0)
        hits.push(`«${a.s}» × «${b.s}»`);
    }
  if (hits.length) {
    clean = false;
    console.warn(`  ! накладаються: ${hits.join("; ")}`);
  } else console.log(`  · ${BOXES.length} підписів, накладань немає`);
}

const svg = parts.join("");
const out = new URL(OUT, ROOT);
mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(fileURLToPath(out), svg);
console.log(OUT, "—", W + "×" + H, "—", (svg.length / 1024).toFixed(1), "КБ");
if (!clean)
  console.log("Є попередження вище — полотно записано, але його треба правити.");
console.log(
  "Полотно читається через readFileSync при завантаженні модуля, і для збирача\n" +
    "воно не є залежністю. Щоб next dev показав нову версію, перезапустіть його\n" +
    "або торкніться src/components/RouteShiftMap.tsx.",
);
