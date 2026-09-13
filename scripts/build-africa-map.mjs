/**
 * Підсумкова карта до § 09 матеріалу «Африканська кампанія».
 *
 *   node scripts/build-africa-map.mjs
 *
 * Два шари на одному полотні: російські вузли, які будувалися десять років, і
 * епізоди, приписані Україні. Сенс карти саме в накладанні — другий шар лягає
 * рівно на перший, і це видно без жодного підпису.
 *
 * Карта стоїть у висновку, а не в рамці, навмисно: у § 01 вона показала б усі
 * хрестики раніше, ніж читач дізнається, що за ними стоїть.
 *
 * Статична, як і лівійська карта «Експресу»: вміст — інвентар, а не
 * послідовність, і всі чотирнадцять позначок треба бачити одночасно. Тому тут
 * не рушій, а готовий SVG, який компонент вклеює в розмітку на збірці.
 *
 * Координати, рівні певності й перелік того, що на карту свідомо не пішло, —
 * docs/dossiers/africa-campaign/notes.md, секція «Карта § 09». Руками сюди
 * числа не вписувати: спершу джерело.
 *
 * Геометрія — Natural Earth 1:50m із пакета world-atlas; арифметика проєкції й
 * спрощення ті самі, що в scripts/build-libya-map.mjs.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-50m.json", ROOT);
const OUT = "public/articles/afrykanska-kampaniia/africa-campaign.svg";

/* ── Рамка й полотно ─────────────────────────────────────────────────────── */

// Захід кадру тримає Бамако, схід — Порт-Судан, північ — Лефкаду, південь —
// Бангі. Ширшим кадр не робимо: Mersin біля Дакара в статті не згадується, а
// заради одного знака кадр розповзся б іще на сімнадцять градусів на захід.
const REG = [-12, 2, 40, 40];
const W = 1000;

const RAD = Math.PI / 180;
const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

const K = W / ((REG[2] - REG[0]) * RAD);
const H = Math.round(K * (psi(REG[3]) - psi(REG[1])));
const TX = -K * REG[0] * RAD;
const TY = K * psi(REG[3]);

const X = (lon) => TX + K * lon * RAD;
const Y = (lat) => TY - K * psi(lat);
const f = (n) => n.toFixed(1);
const P = (p) => f(X(p[0])) + "," + f(Y(p[1]));

/** Скільки одиниць полотна в кілометрі на заданій широті. */
const kmUnits = (n, lat) => (n / (111.32 * Math.cos(lat * RAD))) * RAD * K;

/* ── Палітра ─────────────────────────────────────────────────────────────── */

const C = {
  sea: "#eceff0",
  land: "#e5e0d9",
  host: "#d8d1c6", // країни з найбільшими контингентами
  coast: "#ffffff",
  border: "#c9c1b5",
  ink: "#2a2a2a",
  taupe: "#898270",
  ru: "#8c2d04", // російський вузол
  ua: "#f24c06", // епізод, приписаний Україні
  sea2: "#1f4e78",
};

/* ── Геометрія: те саме, що в build-libya-map.mjs ────────────────────────── */

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

const ringsOf = (geom) =>
  geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;

const path = (pts, close) =>
  pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (close ? "Z" : "");

// Кадр у пʼять разів ширший за лівійський, тож і допуск грубіший: 0.03° — це
// приблизно пів пікселя на цьому масштабі.
const TOL = 0.03;

/* ── Шар 1: російські вузли ──────────────────────────────────────────────── */

/**
 * `kind` задає форму позначки, `tier` — чим підперте твердження **про те, що
 * на цій точці стоїть**. Сама координата ніде не є знахідкою: це звичайна
 * географія.
 *
 *   doc    — документ або супутниковий знімок
 *   claim  — заявлене й не завершене (Порт-Судан)
 *   est    — оцінка чисельності
 */
const RU = [
  {
    i: "R1",
    n: "Тобрук",
    role: "порт",
    c: [23.9614, 32.0761],
    kind: "port",
    tier: "doc",
    dx: 13,
    dy: 16,
    a: "start",
  },
  {
    // Підпис іде праворуч, у порожню Лівію: ліворуч він упирався в назву
    // Алжиру, яка стоїть на тій самій висоті.
    i: "R2",
    n: "Шість авіабаз",
    role: "«Африканський корпус»",
    c: [16.0011, 29.1981],
    kind: "air",
    tier: "doc",
    dx: 14,
    dy: 5,
    a: "start",
  },
  {
    i: "R3",
    n: "Порт-Судан",
    role: "база · заморожено",
    c: [37.2164, 19.6158],
    kind: "port",
    tier: "claim",
    dx: -14,
    dy: 5,
    a: "end",
  },
  {
    i: "R4",
    n: "Бамако",
    role: "до 2500 осіб",
    c: [-8.0029, 12.6392],
    kind: "troops",
    tier: "est",
    dx: 13,
    dy: 5,
    a: "start",
  },
  {
    i: "R5",
    n: "Кідаль",
    role: "взято 2023 · лишено 2026",
    c: [1.4078, 18.4411],
    kind: "troops",
    tier: "doc",
    dx: -13,
    dy: 20,
    a: "end",
  },
  {
    i: "R6",
    n: "Бангі",
    role: "ЦАР · контингент",
    c: [18.5582, 4.3947],
    kind: "troops",
    tier: "est",
    dx: 13,
    dy: 5,
    a: "start",
  },
  {
    i: "R7",
    n: "Оран",
    role: "візит флоту · 85 % зброї",
    c: [-0.6417, 35.6969],
    kind: "port",
    tier: "doc",
    dx: 13,
    dy: -9,
    a: "start",
  },
];

/* ── Шар 2: епізоди, приписані Україні ───────────────────────────────────── */

/**
 * `r` — радіус невизначеності в кілометрах, і він тут головний. Морські удари
 * джерела описують словами («між Мальтою й Критом»), а не координатами, тому
 * на карті стоїть не точка, а коло: його розмір і є мірою того, що ми знаємо.
 * Нуль означає геолокацію або берегову адресу.
 */
const UA = [
  {
    i: "U1",
    n: "Омдурман",
    role: "2023 · геолокація",
    c: [32.427, 15.7084],
    r: 0,
    dx: -14,
    dy: 5,
    a: "end",
  },
  {
    i: "U2",
    n: "Тінзаватен",
    role: "липень 2024",
    c: [2.9167, 19.9167],
    r: 0,
    dx: 13,
    dy: -10,
    a: "start",
  },
  {
    // Три майданчики — Місрата, Завія при комплексі Мелліта й штаб 111-ї
    // бригади під Триполі — лягають в одну пляму завширшки двісті кілометрів.
    // На континентальному кадрі це один знак; розклад по об'єктах — у тексті.
    i: "U3",
    n: "Західна Лівія",
    role: "Місрата · Завія · Триполі",
    c: [13.9, 32.8],
    r: 0,
    dx: -13,
    dy: 20,
    a: "end",
  },
  {
    i: "U4",
    n: "Qendil",
    role: "19.12.2025",
    c: [19.0, 35.4],
    r: 150,
    dx: 0,
    dy: -48,
    a: "middle",
  },
  {
    i: "U5",
    n: "Arctic Metagaz",
    role: "03.03.2026",
    c: [16.59, 33.37],
    r: 60,
    dx: -20,
    dy: -16,
    a: "end",
  },
  {
    i: "U6",
    n: "Lady Mariia",
    role: "06.09.2026",
    c: [23.6, 33.8],
    r: 110,
    dx: 26,
    dy: -6,
    a: "start",
  },
];

/** Лефкада стоїть окремо: це дрейф, а не удар, і знак у неї інший. */
const LEFKADA = {
  n: "Лефкада",
  role: "дрейф · травень 2026",
  c: [20.55, 38.55],
  dx: 13,
  dy: 5,
  a: "start",
};

const CITIES = [
  // Триполі окремою крапкою не стоїть: його накриває позначка U3, а назва
  // лишилася в її підпису.
  {
    n: "Бенгазі",
    c: [20.0687, 32.1167],
    dx: 10,
    dy: -6,
    a: "start",
    minor: true,
  },
  { n: "Сирт", c: [16.5887, 31.205], dx: 10, dy: 12, a: "start", minor: true },
  {
    n: "Хартум",
    c: [32.5599, 15.5007],
    dx: 11,
    dy: 16,
    a: "start",
    minor: true,
  },
  { n: "Каїр", c: [31.2357, 30.0444], dx: 10, dy: 12, a: "start", minor: true },
  { n: "Алжир", c: [3.0588, 36.7538], dx: 8, dy: -7, a: "start", minor: true },
];

const GEO = [
  { n: "Алжир", c: [1.5, 26.5] },
  { n: "Лівія", c: [20.5, 25.0] },
  { n: "Єгипет", c: [29.5, 25.5] },
  { n: "Судан", c: [28.0, 13.0] },
  { n: "Малі", c: [-5.0, 15.0] },
  { n: "Нігер", c: [9.5, 17.0] },
  { n: "Чад", c: [18.5, 15.0] },
  { n: "ЦАР", c: [21.0, 6.6] },
  { n: "Мавританія", c: [-8.5, 21.5] },
  { n: "Нігерія", c: [7.5, 9.5] },
  { n: "Ефіопія", c: [37.0, 8.5] },
];

const SEAS = [
  { n: "Середземне море", c: [12.0, 37.0], a: "middle" },
  { n: "Червоне море", c: [39.6, 23.0], a: "end" },
];

/* ── Геометрія з атласу ──────────────────────────────────────────────────── */

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;

/** Країни з найбільшими контингентами «Африканського корпусу» — джерело [18]. */
const HOSTS = ["Libya", "Mali", "Central African Rep."];

const geomOf = (name) => {
  const g = countries.geometries.find(
    (x) => x.properties && x.properties.name === name,
  );
  if (!g) throw new Error("немає в атласі: " + name + " — змінилася назва?");
  return g;
};

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

const land = prep(ringsOf(topojson.merge(topo, countries.geometries)));
const hosts = prep(ringsOf(topojson.merge(topo, HOSTS.map(geomOf))));
const borders = topojson
  .mesh(topo, countries, (a, b) => a !== b)
  .coordinates.filter((l) => overlaps(boxOf(l), REG))
  .map((l) => simplify(l, TOL));

const polyPath = (polys) =>
  polys.map((rings) => rings.map((r) => path(r, true)).join("")).join("");

const dLand = polyPath(land);
const dHosts = polyPath(hosts);
const dBorders = borders.map((l) => path(l, false)).join("");

/* ── Позначки ────────────────────────────────────────────────────────────── */

const TIER = {
  doc: { fill: C.ru, stroke: "#fff", w: 1.6, dash: "" },
  claim: {
    fill: "#fff",
    stroke: C.ru,
    w: 2.2,
    dash: ' stroke-dasharray="3.4 2.6"',
  },
  est: { fill: C.ru, stroke: "#fff", w: 1.6, dash: "" },
};

function ruMarker(o) {
  const s = TIER[o.tier];
  const x = X(o.c[0]);
  const y = Y(o.c[1]);
  const paint =
    ' fill="' +
    s.fill +
    '" stroke="' +
    s.stroke +
    '" stroke-width="' +
    s.w +
    '"' +
    s.dash;
  if (o.kind === "port") {
    const r = 5.4;
    return (
      '<rect x="' +
      f(x - r) +
      '" y="' +
      f(y - r) +
      '" width="' +
      f(r * 2) +
      '" height="' +
      f(r * 2) +
      '"' +
      paint +
      "/>"
    );
  }
  if (o.kind === "troops") {
    // Трикутник: контингент — це люди, а не споруда.
    const r = 6.4;
    return (
      '<path d="M' +
      f(x) +
      "," +
      f(y - r) +
      "L" +
      f(x + r * 0.92) +
      "," +
      f(y + r * 0.72) +
      "L" +
      f(x - r * 0.92) +
      "," +
      f(y + r * 0.72) +
      'Z"' +
      paint +
      "/>"
    );
  }
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="5.8"' + paint + "/>";
}

/** Хрестик — епізод. Коло навколо нього — те, чого джерела не кажуть. */
function uaMarker(o) {
  const x = X(o.c[0]);
  const y = Y(o.c[1]);
  const a = 6.2;
  let out = "";
  if (o.r) {
    out +=
      '<circle cx="' +
      f(x) +
      '" cy="' +
      f(y) +
      '" r="' +
      f(kmUnits(o.r, o.c[1])) +
      '" fill="' +
      C.ua +
      '" fill-opacity=".07" stroke="' +
      C.ua +
      '" stroke-width="1.3" stroke-dasharray="5 4" opacity=".75"/>';
  }
  out +=
    '<path d="M' +
    f(x - a) +
    "," +
    f(y - a) +
    "L" +
    f(x + a) +
    "," +
    f(y + a) +
    "M" +
    f(x + a) +
    "," +
    f(y - a) +
    "L" +
    f(x - a) +
    "," +
    f(y + a) +
    '" stroke="' +
    C.ua +
    '" stroke-width="3.4" stroke-linecap="round" ' +
    'fill="none" paint-order="stroke" style="paint-order:stroke" ' +
    'stroke-opacity="1"/>';
  return out;
}

const txt = (cls, x, y, a, s) =>
  '<text class="' +
  cls +
  '" x="' +
  f(x) +
  '" y="' +
  f(y) +
  '" text-anchor="' +
  a +
  '">' +
  s +
  "</text>";

function label(o) {
  const x = X(o.c[0]) + o.dx;
  const y = Y(o.c[1]) + o.dy;
  return (
    txt("lbl", x, y, o.a, o.n) +
    txt("lbl-num", x, y + 14, o.a, (o.i ? o.i + " · " : "") + o.role)
  );
}

const SCALE_LAT = 20;
const SCALE_KM = 500;
const scaleUnits = kmUnits(SCALE_KM, SCALE_LAT);

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const parts = [];
const add = (s) => parts.push(s);

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    W +
    " " +
    H +
    '" class="afr-map" role="img" aria-labelledby="am-t am-d">',
);
add('<title id="am-t">Африканська кампанія: два шари</title>');
add(
  '<desc id="am-d">Карта Північної Африки, Сахелю та східного Середземного ' +
    "моря. Темнішим залито Лівію, Малі й Центральноафриканську Республіку — " +
    "країни з найбільшими контингентами «Африканського корпусу». Сім російських " +
    "вузлів: порт Тобрук і шість авіабаз у Лівії, заморожена військово-морська " +
    "база в Порт-Судані, контингенти в Бамако, Кідалі й Бангі, заход флоту в " +
    "алжирському Орані. Шість епізодів, приписаних Україні: Омдурман під " +
    "Хартумом у 2023 році, Тінзаватен на півночі Малі у 2024-му, майданчики в " +
    "західній Лівії з 2025 року й три удари по суднах у Середземному морі — " +
    "Qendil, Arctic Metagaz і Lady Mariia. Морські удари позначені колом, " +
    "розмір якого показує, наскільки приблизно джерела називають місце. Окремо " +
    "біля грецького острова Лефкада — безекіпажний катер, який туди принесло " +
    "течією.</desc>",
);

add("<defs>");
add(
  '<pattern id="am-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
    '<line x1="0" y1="0" x2="0" y2="9" stroke="' +
    C.taupe +
    '" stroke-width="1" opacity=".33"/></pattern>',
);
add("</defs>");

/**
 * Кегль підписів залежить від ширини самого полотна, а не сторінки: на 1180 px
 * розкладка перекидається в одну колонку, і карта стає ширшою, ніж була на
 * 1200. Тому container queries, а контейнером оголошено обгортку полотна.
 */
const TYPE = [
  {
    at: null,
    lbl: 12,
    num: 9,
    city: 11,
    geo: 11,
    sea: 11.5,
    sm: 10.5,
    halo: 3,
  },
  {
    at: 1200,
    lbl: 13.5,
    num: 10,
    city: 12,
    geo: 12,
    sea: 12.5,
    sm: 11.5,
    halo: 3.2,
  },
  {
    at: 950,
    lbl: 15.5,
    num: 11.5,
    city: 14,
    geo: 13.5,
    sea: 14,
    sm: 13,
    halo: 3.6,
  },
  // Полотно поменшало, підписи виросли — другі рядки й дрібні міста злипаються.
  {
    at: 750,
    lbl: 18,
    num: 13,
    geo: 15,
    sea: 15,
    sm: 15,
    halo: 4.2,
    hideMinor: true,
  },
  // На найвужчому лишаються самі назви.
  {
    at: 560,
    lbl: 26,
    geo: 17,
    sea: 17,
    halo: 6,
    hideMinor: true,
    hideSmall: true,
  },
];

const css = [
  ".afr-map text{font-family:Inter,system-ui,'Segoe UI',Arial,sans-serif;fill:" +
    C.ink +
    ";paint-order:stroke;stroke:#fff;stroke-linejoin:round}",
];
for (const t of TYPE) {
  const r = [];
  r.push(".afr-map .lbl{font-size:" + t.lbl + "px;font-weight:700}");
  r.push(".afr-map text{stroke-width:" + t.halo + "}");
  r.push(
    ".afr-map .lbl-geo{font-size:" +
      t.geo +
      "px;font-weight:600;fill:" +
      C.taupe +
      ";letter-spacing:.2em;text-transform:uppercase}",
  );
  r.push(
    ".afr-map .lbl-sea{font-size:" +
      t.sea +
      "px;font-weight:500;fill:" +
      C.sea2 +
      ";opacity:.55;letter-spacing:.24em;text-transform:uppercase}",
  );
  if (t.city) {
    r.push(".afr-map .lbl-city{font-size:" + t.city + "px;font-weight:500}");
  }
  if (t.num) {
    r.push(
      ".afr-map .lbl-num{font-size:" +
        t.num +
        "px;font-weight:700;fill:" +
        C.taupe +
        ";letter-spacing:.12em;text-transform:uppercase}",
    );
  }
  if (t.sm) {
    r.push(
      ".afr-map .lbl-sm{font-size:" +
        t.sm +
        "px;font-weight:600;fill:" +
        C.taupe +
        "}",
    );
  }
  if (t.hideMinor) r.push(".afr-map .minor{display:none}");
  if (t.hideSmall) {
    r.push(
      ".afr-map .lbl-sm,.afr-map .lbl-num,.afr-map .lbl-city," +
        ".afr-map .city,.afr-map .key{display:none}",
    );
  }
  css.push(
    t.at
      ? "@container (max-width:" + t.at + "px){" + r.join("") + "}"
      : r.join("\n"),
  );
}
add("<style>\n" + css.join("\n") + "\n</style>");

add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + dLand + '" fill="' + C.land + '" fill-rule="evenodd"/>');
add('<path d="' + dHosts + '" fill="' + C.host + '" fill-rule="evenodd"/>');
add('<path d="' + dHosts + '" fill="url(#am-hatch)" fill-rule="evenodd"/>');
add(
  '<path d="' +
    dLand +
    '" fill="none" stroke="' +
    C.coast +
    '" stroke-width="1" fill-rule="evenodd"/>',
);
add(
  '<path d="' +
    dBorders +
    '" fill="none" stroke="' +
    C.border +
    '" stroke-width="1" stroke-linejoin="round"/>',
);

for (const g of GEO) add(txt("lbl-geo", X(g.c[0]), Y(g.c[1]), "middle", g.n));
for (const s of SEAS) add(txt("lbl-sea", X(s.c[0]), Y(s.c[1]), s.a, s.n));

for (const c of CITIES) {
  // Крапка ховається разом із підписом: точка без назви на карті ні про що.
  const m = c.minor ? " minor" : "";
  add(
    '<circle class="city' +
      m +
      '" cx="' +
      f(X(c.c[0])) +
      '" cy="' +
      f(Y(c.c[1])) +
      '" r="2.4" fill="' +
      C.ink +
      '" opacity=".65"/>',
  );
  add(txt("lbl-city" + m, X(c.c[0]) + c.dx, Y(c.c[1]) + c.dy, c.a, c.n));
}

// Arctic Metagaz джерела прив'язують не до координат, а до Сирта: «приблизно за
// 130 миль на північ». Вусик каже це без слів.
add(
  '<line x1="' +
    f(X(16.5887)) +
    '" y1="' +
    f(Y(31.205)) +
    '" x2="' +
    f(X(16.59)) +
    '" y2="' +
    f(Y(33.37)) +
    '" stroke="' +
    C.taupe +
    '" stroke-width="1" stroke-dasharray="2 4" opacity=".8"/>',
);

for (const o of RU) {
  add(ruMarker(o));
  add(label(o));
}
for (const o of UA) {
  add(uaMarker(o));
  add(label(o));
}

// Лефкада: кільце без заливки — знайдений апарат, а не уражена ціль.
add(
  '<circle cx="' +
    f(X(LEFKADA.c[0])) +
    '" cy="' +
    f(Y(LEFKADA.c[1])) +
    '" r="5.6" fill="#fff" stroke="' +
    C.taupe +
    '" stroke-width="2.2" stroke-dasharray="3 2.4"/>',
);
add(label(LEFKADA));

/* ── Легенда й лінійка ───────────────────────────────────────────────────── */

/**
 * Легенда. Рядків шість, бо форм на карті стільки ж: підказка, у якій бракує
 * однієї форми, гірша за її відсутність.
 */
const KEY = [
  { sym: "port", t: "порт" },
  { sym: "air", t: "авіабази" },
  { sym: "troops", t: "контингент" },
  { sym: "claim", t: "заявлене, не завершене" },
  { sym: "cross", t: "епізод, приписаний Україні" },
  { sym: "halo", t: "коло — місце названо приблизно" },
];

const KEY_STEP = 23;
const kx = 48;
const kyTop = H - 24 - KEY_STEP * KEY.length;

add('<g class="key">');
add(
  '<rect x="' +
    (kx - 20) +
    '" y="' +
    (kyTop - 16) +
    '" width="264" height="' +
    (KEY_STEP * KEY.length + 12) +
    '" rx="3" fill="#fbfaf6" opacity=".93" stroke="' +
    C.border +
    '" stroke-width="1"/>',
);
KEY.forEach((k, i) => {
  const y = kyTop + i * KEY_STEP;
  if (k.sym === "port") {
    add(
      '<rect x="' +
        (kx - 5) +
        '" y="' +
        (y - 5) +
        '" width="10" height="10" fill="' +
        C.ru +
        '" stroke="#fff" stroke-width="1.4"/>',
    );
  } else if (k.sym === "air") {
    add(
      '<circle cx="' +
        kx +
        '" cy="' +
        y +
        '" r="5.4" fill="' +
        C.ru +
        '" stroke="#fff" stroke-width="1.4"/>',
    );
  } else if (k.sym === "troops") {
    add(
      '<path d="M' +
        kx +
        "," +
        (y - 6) +
        "L" +
        (kx + 5.6) +
        "," +
        (y + 4.4) +
        "L" +
        (kx - 5.6) +
        "," +
        (y + 4.4) +
        'Z" fill="' +
        C.ru +
        '" stroke="#fff" stroke-width="1.4"/>',
    );
  } else if (k.sym === "claim") {
    add(
      '<rect x="' +
        (kx - 5) +
        '" y="' +
        (y - 5) +
        '" width="10" height="10" fill="#fff" stroke="' +
        C.ru +
        '" stroke-width="2.2" stroke-dasharray="3.4 2.6"/>',
    );
  } else if (k.sym === "cross") {
    add(
      '<path d="M' +
        (kx - 6) +
        "," +
        (y - 6) +
        "L" +
        (kx + 6) +
        "," +
        (y + 6) +
        "M" +
        (kx + 6) +
        "," +
        (y - 6) +
        "L" +
        (kx - 6) +
        "," +
        (y + 6) +
        '" stroke="' +
        C.ua +
        '" stroke-width="3.2" stroke-linecap="round"/>',
    );
  } else {
    add(
      '<circle cx="' +
        kx +
        '" cy="' +
        y +
        '" r="8" fill="' +
        C.ua +
        '" fill-opacity=".07" stroke="' +
        C.ua +
        '" stroke-width="1.3" stroke-dasharray="5 4" opacity=".75"/>',
    );
  }
  add(txt("lbl-sm", kx + 18, y + 4, "start", k.t));
});
add("</g>");

const sx = 350;
const sy = H - 34;
add('<g class="key">');
add(
  '<line x1="' +
    sx +
    '" y1="' +
    sy +
    '" x2="' +
    f(sx + scaleUnits) +
    '" y2="' +
    sy +
    '" stroke="' +
    C.ink +
    '" stroke-width="1.6"/>',
);
add(
  '<line x1="' +
    sx +
    '" y1="' +
    (sy - 5) +
    '" x2="' +
    sx +
    '" y2="' +
    (sy + 5) +
    '" stroke="' +
    C.ink +
    '" stroke-width="1.6"/>',
);
add(
  '<line x1="' +
    f(sx + scaleUnits) +
    '" y1="' +
    (sy - 5) +
    '" x2="' +
    f(sx + scaleUnits) +
    '" y2="' +
    (sy + 5) +
    '" stroke="' +
    C.ink +
    '" stroke-width="1.6"/>',
);
add(
  txt(
    "lbl-sm",
    sx,
    sy + 18,
    "start",
    SCALE_KM + " км (на " + SCALE_LAT + "° пн. ш.)",
  ),
);
add("</g>");
add("</svg>");

const svg = parts.join("\n") + "\n";
const out = new URL(OUT, ROOT);
mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(fileURLToPath(out), svg);

console.log(
  OUT +
    " — " +
    (svg.length / 1024).toFixed(0) +
    " КБ · полотно " +
    W +
    "x" +
    H +
    "\n  вузлів: " +
    RU.length +
    " · епізодів: " +
    UA.length +
    " + Лефкада",
);
