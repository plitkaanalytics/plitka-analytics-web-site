/**
 * Карта російських об'єктів у Лівії до § 03 матеріалу «Сирійський експрес
 * змінює курс».
 *
 *   node scripts/build-libya-map.mjs
 *
 * На відміну від § 00 і § 04, ця карта статична: вміст її — інвентар, а не
 * послідовність, і шість об'єктів треба бачити одночасно. Тому тут не рушій,
 * а готовий SVG, який компонент вклеює в розмітку на збірці. Сторінка не тягне
 * ні даних, ні клієнтського коду.
 *
 * Координати об'єктів, рівні доказовості й опис лінії розмежування —
 * docs/dossiers/med-africa/notes.md, секція «Лівія: об'єкти, координати й
 * контроль (для карти § 03)». Руками сюди числа не вписувати: спершу джерело.
 *
 * Геометрія — Natural Earth 1:50m із пакета world-atlas. Спрощення й обрізання
 * рамкою повторюють scripts/build-map-region.mjs у мінімальному обсязі:
 * статичній карті не потрібні ні квантування, ні розбиття ліній на шматки, ні
 * підбір кадру під різні вікна.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-50m.json", ROOT);
const OUT = "public/articles/syriyskyi-ekspres/libya-objects.svg";

/* ── Рамка й полотно ─────────────────────────────────────────────────────── */

// Уся Лівія плюс смуга сусідів: сенс південно-східної бази в тому, що вона
// стоїть у куті при трьох кордонах, і без назв сусідів цей кут порожній.
// Захід кадру відсунуто так, щоб Алжирові лишилася смуга, ширша за його
// назву: інакше підпис неминуче стає на кордон.
const REG = [7.2, 18.6, 27.2, 34.6];
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

/* ── Палітра ─────────────────────────────────────────────────────────────── */

const C = {
  sea: "#eceff0",
  land: "#e5e0d9",
  libya: "#d8d1c6",
  coast: "#ffffff",
  border: "#c9c1b5",
  ink: "#2a2a2a",
  taupe: "#898270",
  orange: "#f24c06",
  rust: "#8c2d04",
  zone: "#a89c86",
  sea2: "#1f4e78",
};

/* ── Геометрія: те саме, що в build-map-region.mjs ───────────────────────── */

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

const ringsOf = (geom) => {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  return polys;
};

const path = (pts, close) =>
  pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (close ? "Z" : "");

/* Допуск 0.008° — це пів пікселя на нашому масштабі. Дрібніше не має сенсу,
   грубіше дало б розбіжність між обведенням Лівії (з нього робиться маска
   зони контролю) і берегом суходолу. */
const TOL = 0.008;

/* ── Дані ────────────────────────────────────────────────────────────────── */

/**
 * Рівень доказовості, а не важливості, і порядок номерів — за ним же.
 * Список `[25]` подає шість об'єктів рівно, але джерела під ними різні:
 *
 *   doc   — задокументований трафік: трекінг, знімок, геолокація
 *   image — на знімках видно збудоване, присутність описана обережніше
 *   list  — назване лише в переліку одного джерела
 */
const OBJECTS = [
  { i: "01", n: "Тобрук", role: "порт", c: [23.9614, 32.0761], tier: "doc", kind: "port", dx: 15, dy: -10, a: "start" },
  { i: "02", n: "Ель-Кадім", role: "авіабаза", c: [21.1918, 31.9985], tier: "doc", kind: "air", dx: -13, dy: 20, a: "end" },
  { i: "03", n: "Ель-Джуфра", role: "авіабаза · штаб", c: [16.0011, 29.1981], tier: "doc", kind: "air", dx: 13, dy: 4, a: "start" },
  {
    i: "04",
    n: "Маатен ес-Сарра",
    role: "авіабаза",
    c: [21.8306, 21.6889],
    tier: "image",
    kind: "air",
    dx: 14,
    dy: 4,
    a: "start",
    nw: { dx: -14, dy: 4, a: "end" },
  },
  { i: "05", n: "Гардабія", role: "авіабаза", c: [16.6117, 31.0606], tier: "list", kind: "air", dx: -13, dy: 17, a: "end" },
  { i: "06", n: "Брак-еш-Шаті", role: "авіабаза", c: [14.2708, 27.6528], tier: "list", kind: "air", dx: -13, dy: 4, a: "end" },
];

// Аеродром за 16 км південніше Тобрука. Тримаємо окремою дрібною позначкою:
// саме його, а не Ель-Кадім, має на увазі `[15]`, коли пише про «аеродром
// поруч із портом» — див. notes.md, розбіжність розв'язано.
const ELADEM = { n: "Ель-Адем · 16 км", c: [23.9068, 31.8614], dx: 12, dy: 15 };

const CITIES = [
  { n: "Триполі", c: [13.1913, 32.8872], dx: 11, dy: 4, a: "start" },
  { n: "Бенгазі", c: [20.0687, 32.1167], dx: -12, dy: -6, a: "end" },
  { n: "Сирт", c: [16.5887, 31.205], dx: 12, dy: -7, a: "start", minor: true },
  { n: "Себха", c: [14.4283, 27.0377], dx: 11, dy: 12, a: "start", minor: true },
  // Точка, яку джерело називає головною в розмежуванні. Єдине місце, де межа
  // на цій карті прив'язана до конкретної координати.
  { n: "Бувейрат-ель-Хусун", c: [15.7331, 31.3997], dx: -11, dy: -7, a: "end" },
];

const GEO = [
  { n: "Алжир", c: [8.3, 29.0] },
  { n: "Туніс", c: [9.5, 33.6] },
  { n: "Нігер", c: [11.0, 21.3] },
  { n: "Чад", c: [17.6, 19.6] },
  { n: "Судан", c: [26.0, 20.0] },
  { n: "Єгипет", c: [26.15, 27.0] },
];

/**
 * Межа контролю. Малюється смугою, і ширина смуги — це і є міра певності.
 *
 * Джерело `[48]`, 5 червня 2025: лінія фронту проходить трохи західніше
 * Сирта, головна точка розмежування — **Бувейрат-ель-Хусун** на узбережжі;
 * схід і весь південь до кордонів із Суданом, Чадом, Нігером і Алжиром
 * тримає Хафтар; уряд у Триполі — Триполітанію з околицями Місрати.
 *
 * Отже про узбережжя джерело каже точно, а про пустелю — ні. Тому біля моря
 * смуга вужча за 25 км, а вглиб суходолу розходиться до півтори сотні:
 * різка лінія там була б вигаданою точністю. По адміністративних межах вона
 * теж не йде — Бувейрат стоїть усередині узбережної смуги, на краю переписки
 * Місрати, а не на межі округу.
 */
const BAND_N = [
  [15.62, 31.44],
  [15.3, 30.8],
  [14.7, 30.2],
  [13.4, 29.85],
  [11.2, 29.95],
  [6.5, 30.15],
];
const BAND_S = [
  [15.86, 31.34],
  [15.62, 30.55],
  [15.0, 29.55],
  [13.4, 28.95],
  [11.2, 28.75],
  [6.5, 28.85],
];

/** Усе, що на південь і схід від смуги. Обрізається обрисом Лівії. */
const LNA_ZONE = BAND_S.slice()
  .reverse()
  .concat([
    [15.86, 35.2],
    [27.6, 35.2],
    [27.6, 18.2],
    [6.5, 18.2],
  ]);

/** Сама смуга: південний край плюс північний у зворотному порядку. */
const BAND = BAND_S.concat(BAND_N.slice().reverse());

/** Точки поза кадром, до яких рахуємо відстань по великому колу. */
const FAR = {
  khmeimim: [35.95, 35.42],
  bamako: [-8.0, 12.65],
  ouaga: [-1.53, 12.37],
};

/** Відстань по великому колу, км. Наша власна арифметика з координат. */
function greatCircleKm(a, b) {
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
  return 6371 * d;
}
const km = (n) => Math.round(n / 10) * 10 + " км";

const KHADIM = OBJECTS[1].c;
const D = {
  khmeimim: km(greatCircleKm(FAR.khmeimim, KHADIM)),
  bamako: km(greatCircleKm(KHADIM, FAR.bamako)),
  ouaga: km(greatCircleKm(KHADIM, FAR.ouaga)),
};

/** Стрілки: [початок, керівна точка, кінець]. */
const ARROWS = {
  airIn: [
    [27.2, 33.2],
    [24.8, 32.9],
    [21.45, 32.15],
  ],
  airOut: [
    [20.8, 31.6],
    [16.0, 26.8],
    [6.9, 22.9],
  ],
  seaIn: [
    [23.1, 33.7],
    [23.4, 33.1],
    [23.85, 32.35],
  ],
  sahel: [
    [21.83, 21.15],
    [21.6, 20.2],
    [21.4, 18.95],
  ],
};

const curve = (a) => "M" + P(a[0]) + "Q" + P(a[1]) + " " + P(a[2]);

/* ── Геометрія з атласу й меж округів ────────────────────────────────────── */

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;
const libyaGeom = countries.geometries.find(
  (g) => g.properties && g.properties.name === "Libya",
);
if (!libyaGeom) throw new Error("Лівії немає в атласі — змінилася назва?");

const prep = (polys, tol) => {
  const out = [];
  for (const poly of polys) {
    const kept = [];
    for (const ring of poly) {
      if (!overlaps(boxOf(ring), REG)) continue;
      const c = clipRing(simplify(ring, tol == null ? TOL : tol), REG);
      if (c) kept.push(c);
    }
    if (kept.length) out.push(kept);
  }
  return out;
};

const land = prep(ringsOf(topojson.merge(topo, countries.geometries)));
const libya = prep(ringsOf(topojson.feature(topo, libyaGeom).geometry));
const borders = topojson
  .mesh(topo, countries, (a, b) => a !== b)
  .coordinates.filter((l) => overlaps(boxOf(l), REG))
  .map((l) => simplify(l, TOL));

const polyPath = (polys) =>
  polys.map((rings) => rings.map((r) => path(r, true)).join("")).join("");

const dLand = polyPath(land);
const dLibya = polyPath(libya);
const dBorders = borders.map((l) => path(l, false)).join("");
const dLna = path(LNA_ZONE, true);
const dBand = path(BAND, true);

/* ── Позначки ────────────────────────────────────────────────────────────── */

const SYM = {
  doc: { fill: C.orange, stroke: "#fff", w: 1.7, r: 6, dash: "" },
  image: { fill: "#fff", stroke: C.orange, w: 2.4, r: 6, dash: "" },
  list: { fill: "#fff", stroke: C.taupe, w: 1.6, r: 5, dash: ' stroke-dasharray="3 2.5"' },
};

function marker(o) {
  const s = SYM[o.tier];
  const x = X(o.c[0]);
  const y = Y(o.c[1]);
  const paint =
    ' fill="' + s.fill + '" stroke="' + s.stroke + '" stroke-width="' + s.w + '"' + s.dash;
  if (o.kind === "port") {
    const r = s.r * 0.92;
    return (
      '<rect x="' + f(x - r) + '" y="' + f(y - r) +
      '" width="' + f(r * 2) + '" height="' + f(r * 2) + '"' + paint + "/>"
    );
  }
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + s.r + '"' + paint + "/>";
}

const txt = (cls, x, y, a, s) =>
  '<text class="' + cls + '" x="' + f(x) + '" y="' + f(y) + '" text-anchor="' + a + '">' + s + "</text>";

function label(o) {
  const x = X(o.c[0]) + o.dx;
  const y = Y(o.c[1]) + o.dy;
  const w = o.nw ? " wide" : "";
  let out =
    txt("lbl" + w, x, y, o.a, o.n) +
    txt("lbl-num", x, y + 14, o.a, o.i + " · " + o.role);
  if (o.nw) {
    out += txt(
      "lbl narrow",
      X(o.c[0]) + o.nw.dx,
      Y(o.c[1]) + o.nw.dy,
      o.nw.a,
      o.n,
    );
  }
  return out;
}

// Масштабна лінійка чесна рівно на одній паралелі: у Меркатора масштаб росте
// з широтою. Беремо середину кадру й підписуємо, для якої вона широти.
const SCALE_LAT = 27;
const SCALE_KM = 200;
const scaleUnits = ((SCALE_KM / (111.32 * Math.cos(SCALE_LAT * RAD))) * RAD) * K;

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const parts = [];
const add = (s) => parts.push(s);

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H +
  '" class="libya-map" role="img" aria-labelledby="lm-t lm-d">',
);
add("<title id=\"lm-t\">Російські об'єкти в Лівії</title>");
add(
  '<desc id="lm-d">Карта Лівії. Шість об’єктів, якими користується Росія: ' +
  "порт Тобрук на сході й аеродроми Ель-Кадім, Ель-Джуфра, Гардабія, " +
  "Брак-еш-Шаті та Маатен ес-Сарра на крайньому південному сході, при " +
  "кордонах із Чадом і Суданом. Усі шість лежать у східній і південній " +
  "частині країни, яку контролює " +
  "Халіфа Хафтар; уряд, визнаний ООН, тримає північний захід із Триполі. " +
  "Пунктиром — повітряний міст із сирійського Хмейміма до Ель-Кадіма й далі " +
  "на Бамако та Уагадугу, суцільною лінією — морська доставка в Тобрук.</desc>",
);

add("<defs>");
add(
  '<pattern id="lm-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
  '<line x1="0" y1="0" x2="0" y2="8" stroke="' + C.zone + '" stroke-width="1.1" opacity=".5"/></pattern>',
);
add('<clipPath id="lm-libya"><path d="' + dLibya + '"/></clipPath>');
const arrowhead = (id, fill) =>
  '<marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" ' +
  'markerHeight="5.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="' + fill + '"/></marker>';
add(arrowhead("lm-ah", C.rust));
add(arrowhead("lm-ah-sea", C.sea2));
add(arrowhead("lm-ah-t", C.taupe));
add("</defs>");

/**
 * Кегль підписів залежить від ширини самого полотна, а не сторінки.
 *
 * Це важливо, бо одне з одним не пов'язане: на 1180 px розкладка перекидається
 * в одну колонку, і карта раптом стає ширшою, ніж була на 1200. Медіазапит по
 * вікну дав би на цій межі стрибок в обидві сторони — тому тут container
 * queries, а контейнером оголошено саму обгортку полотна.
 *
 * Кроки підібрані так, щоб на будь-якій ширині підпис виходив десь 13–18 px:
 * SVG масштабується цілком, тож у міру звуження полотна одиниці полотна
 * доводиться збільшувати.
 */
const TYPE = [
  { at: null, lbl: 12, num: 9, city: 11, note: 10, geo: 11, zone: 12, sm: 10.5, halo: 3 },
  { at: 1200, lbl: 14, num: 10, city: 12.5, note: 11, geo: 12, zone: 13, sm: 11.5, halo: 3.2 },
  { at: 950, lbl: 16, num: 11.5, city: 14.5, note: 12.5, geo: 13.5, zone: 15, sm: 13, halo: 3.6 },
  // Полотно поменшало вдвічі, а підписи виросли — усе, що не несе назви, тут
  // уже злипається: другі рядки виносок і дрібні міста йдуть геть.
  { at: 750, lbl: 18, num: 13, city: 16, geo: 15, zone: 16, sm: 15, halo: 4.2, hideMinor: true },
  // На найвужчому лишаються самі назви об'єктів і зон.
  { at: 560, lbl: 30, city: 26, geo: 17, zone: 18, halo: 6, hideMinor: true, hideSmall: true },
];

const css = [
  ".libya-map text{font-family:Inter,system-ui,'Segoe UI',Arial,sans-serif;fill:" +
    C.ink +
    ";paint-order:stroke;stroke:#fff;stroke-linejoin:round}",
  ".libya-map .narrow{display:none}",
];
for (const t of TYPE) {
  const r = [];
  r.push(".libya-map .lbl{font-size:" + t.lbl + "px;font-weight:700}");
  r.push(".libya-map .lbl-city{font-size:" + t.city + "px;font-weight:500}");
  r.push(
    ".libya-map .lbl-geo{font-size:" + t.geo + "px;font-weight:600;fill:" +
      C.taupe + ";letter-spacing:.2em;text-transform:uppercase}",
  );
  r.push(
    ".libya-map .lbl-zone{font-size:" + t.zone + "px;font-weight:600;fill:" +
      C.taupe + ";letter-spacing:.16em;text-transform:uppercase}",
  );
  r.push(".libya-map text{stroke-width:" + t.halo + "}");
  if (t.num) {
    r.push(
      ".libya-map .lbl-num{font-size:" + t.num + "px;font-weight:700;fill:" +
        C.taupe + ";letter-spacing:.12em;text-transform:uppercase}",
    );
  }
  if (t.note) {
    r.push(".libya-map .lbl-note{font-size:" + t.note + "px;fill:" + C.taupe + "}");
  }
  if (t.sm) {
    r.push(
      ".libya-map .lbl-sm{font-size:" + t.sm + "px;font-weight:600;fill:" + C.taupe + "}",
    );
  }
  if (t.hideMinor) r.push(".libya-map .minor{display:none}");
  if (t.hideSmall) {
    r.push(
      ".libya-map .lbl-sm,.libya-map .lbl-num,.libya-map .lbl-city," +
        ".libya-map .city,.libya-map .key{display:none}",
    );
    r.push(".libya-map .narrow{display:inline}.libya-map .wide{display:none}");
  }
  css.push(
    t.at ? "@container (max-width:" + t.at + "px){" + r.join("") + "}" : r.join("\n"),
  );
}

add("<style>\n" + css.join("\n") + "\n</style>");


add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + dLand + '" fill="' + C.land + '" fill-rule="evenodd"/>');
add('<path d="' + dLibya + '" fill="' + C.libya + '"/>');

// Зона ЛНА — заливка зі штриховкою; смуга невизначеності — сама штриховка,
// без заливки. Різкої лінії між ними немає навмисно.
add('<g clip-path="url(#lm-libya)">');
add('<path d="' + dLna + '" fill="' + C.zone + '" opacity=".3"/>');
add('<path d="' + dLna + '" fill="url(#lm-hatch)"/>');
add('<path d="' + dBand + '" fill="url(#lm-hatch)" opacity=".32"/>');
add("</g>");

add('<path d="' + dLand + '" fill="none" stroke="' + C.coast + '" stroke-width="1" fill-rule="evenodd"/>');
add('<path d="' + dBorders + '" fill="none" stroke="' + C.border + '" stroke-width="1" stroke-linejoin="round"/>');
add('<path d="' + dLibya + '" fill="none" stroke="' + C.taupe + '" stroke-width="1.4"/>');

const leg = (d, stroke, w, dash, mk) =>
  '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + w + '"' +
  (dash ? ' stroke-dasharray="' + dash + '"' : "") + ' opacity=".88" marker-end="url(#' + mk + ')"/>';
add(leg(curve(ARROWS.airIn), C.rust, 2.2, "8 5", "lm-ah"));
add(leg(curve(ARROWS.airOut), C.rust, 2.2, "8 5", "lm-ah"));
add(leg(curve(ARROWS.seaIn), C.sea2, 2.2, "", "lm-ah-sea"));
add(leg(curve(ARROWS.sahel), C.taupe, 1.8, "2 6", "lm-ah-t"));

for (const g of GEO) add(txt("lbl-geo", X(g.c[0]), Y(g.c[1]), "middle", g.n));
add(txt("lbl-zone wide", X(21.0), Y(24.6), "middle", "зона Хафтара · ЛНА"));
add(txt("lbl-zone narrow", X(20.5), Y(24.6), "middle", "зона Хафтара · ЛНА"));
add(txt("lbl-note minor", X(21.0), Y(24.6) + 17, "middle", "схід і південь країни"));
add(txt("lbl-zone wide", X(12.3), Y(30.9), "middle", "уряд Триполі"));
add(txt("lbl-zone wide", X(12.3), Y(30.9) + 19, "middle", "визнаний ООН"));
add(txt("lbl-zone narrow", X(12.6), Y(31.1), "middle", "уряд Триполі"));
add(txt("lbl-zone narrow", X(12.6), Y(31.1) + 22, "middle", "визнаний ООН"));

// Ель-Адем ховається цілим блоком: риска й крапка без підпису ні про що.
add('<g class="minor">');
add(
  '<line x1="' + f(X(ELADEM.c[0])) + '" y1="' + f(Y(ELADEM.c[1])) + '" x2="' +
  f(X(23.9614)) + '" y2="' + f(Y(32.0761)) + '" stroke="' + C.taupe + '" stroke-width="1"/>',
);
add(
  '<circle cx="' + f(X(ELADEM.c[0])) + '" cy="' + f(Y(ELADEM.c[1])) +
  '" r="3.4" fill="#fff" stroke="' + C.taupe + '" stroke-width="1.5"/>',
);
add(txt("lbl-sm minor", X(ELADEM.c[0]) + ELADEM.dx, Y(ELADEM.c[1]) + ELADEM.dy, "start", ELADEM.n));
add("</g>");

for (const c of CITIES) {
  // Крапка ховається разом із підписом: точка без назви на карті ні про що.
  add(
    '<circle class="city' + (c.minor ? " minor" : "") + '" cx="' + f(X(c.c[0])) +
    '" cy="' + f(Y(c.c[1])) + '" r="2.6" fill="' + C.ink + '"/>',
  );
  add(
    txt(
      "lbl-city" + (c.minor ? " minor" : ""),
      X(c.c[0]) + c.dx,
      Y(c.c[1]) + c.dy,
      c.a,
      c.n,
    ),
  );
}
for (const o of OBJECTS) {
  add(marker(o));
  add(label(o));
}
// Гардабія стоїть за 15 км від Сирта: підпис іде вбік, до позначки веде вусик.
add(
  '<line x1="' + f(X(16.6117) - 11) + '" y1="' + f(Y(31.0606) + 12) + '" x2="' +
  f(X(16.6117) - 4) + '" y2="' + f(Y(31.0606) + 4) + '" stroke="' + C.taupe + '" stroke-width="1"/>',
);

// Відстані рахуємо самі, по великому колу між координатами. Це арифметика, а
// не твердження джерела, і в підписі під картою так і сказано.
add(txt("lbl-sm", X(26.0), Y(33.7), "end", "Хмеймім · " + D.khmeimim));
add(txt("lbl-note minor", X(26.0), Y(33.7) + 15, "end", "Ан-124, Іл-76"));
add(txt("lbl-sm", X(10.2), Y(25.6), "start", "Бамако · " + D.bamako));
add(txt("lbl-sm minor", X(10.2), Y(25.6) + 15, "start", "далі Уагадугу · " + D.ouaga));
add(txt("lbl-note minor", X(10.2), Y(25.6) + 30, "start", "20–26 травня 2025"));
add(txt("lbl-sm", X(22.6), Y(33.1), "end", "морем: 6000 т техніки"));
add(txt("lbl-note minor", X(22.6), Y(33.1) + 15, "end", "квітень 2024"));
add(txt("lbl-sm minor", X(21.3), Y(19.9), "end", "до кордону з Чадом ≈ 97 км"));

const kx = X(16.0);
const ky = Y(33.9);
add('<g class="key">');
add('<rect x="' + f(kx - 18) + '" y="' + f(ky - 21) + '" width="132" height="56" rx="3" fill="#fbfaf6" opacity=".92" stroke="' +
  C.border + '" stroke-width="1"/>');
add('<rect x="' + f(kx - 4) + '" y="' + f(ky - 8) + '" width="8" height="8" fill="' +
  C.orange + '" stroke="#fff" stroke-width="1.4"/>');
add(txt("lbl-sm", kx + 12, ky, "start", "порт"));
add('<circle cx="' + f(kx) + '" cy="' + f(ky + 16) + '" r="4.6" fill="' + C.orange +
  '" stroke="#fff" stroke-width="1.4"/>');
add(txt("lbl-sm", kx + 12, ky + 20, "start", "аеродром"));
add("</g>");

const sx = 60;
const sy = H - 42;
add('<g class="key">');
add('<line x1="' + sx + '" y1="' + sy + '" x2="' + f(sx + scaleUnits) + '" y2="' + sy + '" stroke="' + C.ink + '" stroke-width="1.6"/>');
add('<line x1="' + sx + '" y1="' + (sy - 5) + '" x2="' + sx + '" y2="' + (sy + 5) + '" stroke="' + C.ink + '" stroke-width="1.6"/>');
add('<line x1="' + f(sx + scaleUnits) + '" y1="' + (sy - 5) + '" x2="' + f(sx + scaleUnits) + '" y2="' + (sy + 5) + '" stroke="' + C.ink + '" stroke-width="1.6"/>');
add(txt("lbl-sm", sx, sy + 18, "start", SCALE_KM + " км (на " + SCALE_LAT + "° пн. ш.)"));
add("</g>");
add("</svg>");

const svg = parts.join("\n") + "\n";
const out = new URL(OUT, ROOT);
mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(fileURLToPath(out), svg);
console.log(
  OUT + " — " + (svg.length / 1024).toFixed(0) + " КБ · полотно " + W + "x" + H +
  "\n  відстані: Хмеймім " + D.khmeimim + " · Бамако " + D.bamako +
  " · Уагадугу " + D.ouaga,
);
