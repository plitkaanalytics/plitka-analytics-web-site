/**
 * Карта до § 03 матеріалу «Україна проти „Африканського корпусу“»: дві
 * присутності в одній країні й те, хто яку її частину контролює.
 *
 *   node scripts/build-libya-control-map.mjs
 *
 * Чим відрізняється від лівійської карти «Експресу» (scripts/build-libya-map.mjs):
 * там головним був повітряний міст, тут — контроль. Тому стрілок логістики
 * немає зовсім, зате смуга розмежування стала ширшою, а на заході зʼявився
 * другий шар — українські майданчики.
 *
 * Смуга, а не лінія, — навмисно. Наші джерела описують контроль лише
 * напрямками: захід — уряд у Триполі, схід і південь — Хафтар. Ніхто з них не
 * каже, де саме проходить межа, тож різка лінія була б вигаданою точністю.
 * Ширина смуги і є мірою того, що ми знаємо.
 *
 * Координати, формулювання джерел і дві зафіксовані розбіжності (Завія проти
 * Мелліти; шоста авіабаза без імені) — docs/dossiers/africa-campaign/notes.md,
 * секція «Карта § 03». Руками сюди числа не вписувати: спершу джерело.
 *
 * Геометрія — Natural Earth 1:50m із пакета world-atlas.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-50m.json", ROOT);
const OUT = "public/articles/afrykanska-kampaniia/libya-control.svg";

/* ── Рамка й полотно ─────────────────────────────────────────────────────── */

// Кадр той самий, що й у лівійської карти «Експресу»: читач, який бачив
// попередню частину, впізнає обриси й одразу бачить, що змінилося.
const REG = [7.2, 18.6, 27.2, 34.6];
const W = 1000;

const RAD = Math.PI / 180;
const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

/** Меркатор у прямокутник заданої ширини; `ox`/`oy` зсувають кадр по полотну. */
function projection(reg, width, ox = 0, oy = 0) {
  const k = width / ((reg[2] - reg[0]) * RAD);
  const h = k * (psi(reg[3]) - psi(reg[1]));
  return {
    reg,
    w: width,
    h,
    ox,
    oy,
    X: (lon) => ox - k * reg[0] * RAD + k * lon * RAD,
    Y: (lat) => oy + k * psi(reg[3]) - k * psi(lat),
    km: (n, lat) => ((n / (111.32 * Math.cos(lat * RAD))) * RAD) * k,
  };
}

const main = projection(REG, W);
const H = Math.round(main.h);

/* Врізка — не «вікно» поверх карти, а окрема панель під нею: пʼять підписів у
   прямокутник, вписаний у море, не влізають за жодних зсувів. */
const INSET_REG = [11.6, 32.0, 15.65, 33.3];
const INSET_W = 560;
const insetX = Math.round((W - INSET_W) / 2);
const insetY = H + 34;
const ins = projection(INSET_REG, INSET_W, insetX, insetY);
const insetH = Math.round(ins.h);
const CANVAS_H = insetY + insetH + 14;

const f = (n) => n.toFixed(1);
let PR = main;
const X = (lon) => PR.X(lon);
const Y = (lat) => PR.Y(lat);
const P = (p) => f(X(p[0])) + "," + f(Y(p[1]));

/* ── Палітра ─────────────────────────────────────────────────────────────── */

const C = {
  sea: "#eceff0",
  land: "#e5e0d9",
  libya: "#ded8cd",
  coast: "#ffffff",
  border: "#c9c1b5",
  ink: "#2a2a2a",
  taupe: "#898270",
  ru: "#8c2d04", // російський обʼєкт
  ua: "#f24c06", // український майданчик
  lna: "#a89c86", // зона Хафтара
  gnu: "#7d9bb0", // зона уряду в Триполі
};

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

const ringsOf = (geom) =>
  geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;

const path = (pts, close) =>
  pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (close ? "Z" : "");

const TOL = 0.008;

/* ── Контроль ────────────────────────────────────────────────────────────── */

/**
 * Смуга розмежування. Наші джерела дають лише напрямки — «Триполі й західна
 * Лівія» проти «східної й південної», — тому смуга широка по всій довжині, а
 * не звужується до узбережжя, як на карті «Експресу»: там опис називав
 * конкретну точку на березі, тут не називає нічого.
 */
const BAND_N = [
  [16.1, 31.5],
  [15.6, 30.7],
  [14.8, 30.0],
  [13.2, 29.6],
  [10.8, 29.7],
  [6.9, 29.9],
];
const BAND_S = [
  [17.2, 31.0],
  [16.4, 30.0],
  [15.2, 28.9],
  [13.2, 28.2],
  [10.8, 28.0],
  [6.9, 28.1],
];

/** Усе, що на південь і схід від смуги, — зона ЛНА. Обрізається обрисом Лівії. */
const LNA_ZONE = BAND_S.slice()
  .reverse()
  .concat([
    [17.2, 35.2],
    [27.6, 35.2],
    [27.6, 18.2],
    [6.5, 18.2],
  ]);

/** Усе, що на північ і захід, — зона уряду в Триполі. */
const GNU_ZONE = BAND_N.slice().concat([
  [6.5, 29.9],
  [6.5, 35.2],
  [16.1, 35.2],
]);

const BAND = BAND_S.concat(BAND_N.slice().reverse());

/* ── Обʼєкти ─────────────────────────────────────────────────────────────── */

/**
 * `side`: ua — майданчик, про який пишуть RFI та AP; ru — обʼєкт, який
 * пов'язують з «Африканським корпусом».
 * `kind`: air — аеродром, port — порт, hq — штаб.
 */
const SITES = [
  // Захід
  { i: "01", n: "Місрата", role: "академія ВПС", c: [15.061, 32.325], side: "ua", kind: "air", dx: 12, dy: -8, a: "start", ix: -12, iy: -8, ia: "end" },
  { i: "02", n: "Завія", role: "запуск дронів", c: [12.7278, 32.7522], side: "ua", kind: "air", dx: -12, dy: -8, a: "end", ix: -12, iy: -6, ia: "end" },
  { i: "03", n: "111-та бригада", role: "штаб · координація", c: [13.16, 32.7], side: "ua", kind: "hq", dx: 12, dy: 20, a: "start", ix: 12, iy: 5, ia: "start" },
  // Схід і південь
  { i: "04", n: "Тобрук", role: "порт", c: [23.9614, 32.0761], side: "ru", kind: "port", dx: 13, dy: -8, a: "start" },
  { i: "05", n: "Ель-Кадім", role: "авіабаза", c: [21.1918, 31.9985], side: "ru", kind: "air", dx: -12, dy: 19, a: "end" },
  { i: "06", n: "Гардабія", role: "авіабаза", c: [16.6117, 31.0606], side: "ru", kind: "air", dx: -12, dy: 17, a: "end" },
  { i: "07", n: "Ель-Джуфра", role: "авіабаза · штаб", c: [16.0011, 29.1981], side: "ru", kind: "air", dx: 13, dy: 4, a: "start" },
  { i: "08", n: "Брак-еш-Шаті", role: "авіабаза", c: [14.2708, 27.6528], side: "ru", kind: "air", dx: -12, dy: 4, a: "end" },
  { i: "09", n: "Маатен ес-Сарра", role: "авіабаза", c: [21.8306, 21.6889], side: "ru", kind: "air", dx: 13, dy: 4, a: "start" },
];

/**
 * Мелліта стоїть окремою дрібною позначкою навмисно. RFI привʼязує базу в
 * Завії до «комплексу Мелліта», але це різні місця за сімдесят кілометрів;
 * показати їх однією точкою означало б підтвердити чужу географічну помилку.
 */
/** Обʼєкти, підписи яких читаються тільки у врізці. */
const INSET_IDS = new Set(["01", "02", "03"]);

const MELLITAH = { n: "Мелліта · комплекс", c: [12.03, 32.85], dx: -11, dy: 14, a: "end" };

const CITIES = [
  { n: "Триполі", c: [13.1913, 32.8872], dx: 10, dy: -7, a: "start" },
  { n: "Бенгазі", c: [20.0687, 32.1167], dx: -11, dy: -6, a: "end" },
  { n: "Сирт", c: [16.5887, 31.205], dx: 11, dy: -8, a: "start", minor: true },
  { n: "Себха", c: [14.4283, 27.0377], dx: 11, dy: 12, a: "start", minor: true },
];

const GEO = [
  { n: "Алжир", c: [8.3, 29.0] },
  { n: "Туніс", c: [9.5, 33.6] },
  { n: "Нігер", c: [11.0, 21.3] },
  { n: "Чад", c: [17.6, 19.6] },
  { n: "Судан", c: [26.0, 20.0] },
  { n: "Єгипет", c: [26.15, 27.0] },
];

/* ── Геометрія з атласу ──────────────────────────────────────────────────── */

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;
const libyaGeom = countries.geometries.find(
  (g) => g.properties && g.properties.name === "Libya",
);
if (!libyaGeom) throw new Error("Лівії немає в атласі — змінилася назва?");

const prep = (polys, reg = REG, tol = TOL) => {
  const out = [];
  for (const poly of polys) {
    const kept = [];
    for (const ring of poly) {
      if (!overlaps(boxOf(ring), reg)) continue;
      const c = clipRing(simplify(ring, tol), reg);
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

/* ── Позначки ────────────────────────────────────────────────────────────── */

function marker(o) {
  const col = o.side === "ua" ? C.ua : C.ru;
  const x = X(o.c[0]);
  const y = Y(o.c[1]);
  const paint = ' fill="' + col + '" stroke="#fff" stroke-width="1.6"';
  if (o.kind === "port") {
    const r = 5.4;
    return (
      '<rect x="' + f(x - r) + '" y="' + f(y - r) + '" width="' + f(r * 2) +
      '" height="' + f(r * 2) + '"' + paint + "/>"
    );
  }
  if (o.kind === "hq") {
    // Ромб: штаб — це люди й рішення, а не смуга й ангари.
    const r = 6.4;
    return (
      '<path d="M' + f(x) + "," + f(y - r) + "L" + f(x + r) + "," + f(y) +
      "L" + f(x) + "," + f(y + r) + "L" + f(x - r) + "," + f(y) + 'Z"' + paint + "/>"
    );
  }
  return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="5.6"' + paint + "/>";
}

const txt = (cls, x, y, a, s) =>
  '<text class="' + cls + '" x="' + f(x) + '" y="' + f(y) + '" text-anchor="' +
  a + '">' + s + "</text>";

const label = (o) =>
  txt("lbl", X(o.c[0]) + o.dx, Y(o.c[1]) + o.dy, o.a, o.n) +
  txt("lbl-num", X(o.c[0]) + o.dx, Y(o.c[1]) + o.dy + 14, o.a, o.i + " · " + o.role);

const SCALE_LAT = 27;
const SCALE_KM = 200;
const scaleUnits = main.km(SCALE_KM, SCALE_LAT);

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const parts = [];
const add = (s) => parts.push(s);

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + CANVAS_H +
  '" class="lcmap" role="img" aria-labelledby="lc-t lc-d">',
);
add("<title id=\"lc-t\">Лівія: хто що контролює й де чиї обʼєкти</title>");
add(
  '<desc id="lc-d">Карта Лівії. Країна поділена: північний захід із Триполі ' +
  "тримає визнаний ООН Уряд національної єдності, схід і південь — сили " +
  "фельдмаршала Халіфи Хафтара. Межа між ними показана широкою смугою, бо " +
  "джерела описують контроль лише напрямками. На заході, у зоні уряду в " +
  "Триполі, три майданчики, про які пишуть RFI та AP: академія ВПС у " +
  "Місраті, база в Завії й штаб 111-ї бригади під Триполі. На сході й " +
  "півдні, у зоні Хафтара, — порт Тобрук і пʼять аеродромів, повʼязаних з " +
  "«Африканським корпусом»: Ель-Кадім, Гардабія, Ель-Джуфра, Брак-еш-Шаті " +
  "та Маатен ес-Сарра при кордонах із Чадом і Суданом.</desc>",
);

add("<defs>");
add(
  '<pattern id="lc-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
  '<line x1="0" y1="0" x2="0" y2="8" stroke="' + C.lna + '" stroke-width="1.1" opacity=".5"/></pattern>',
);
add(
  '<pattern id="lc-hatch-g" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">' +
  '<line x1="0" y1="0" x2="0" y2="8" stroke="' + C.gnu + '" stroke-width="1.1" opacity=".45"/></pattern>',
);
add('<clipPath id="lc-libya"><path d="' + dLibya + '"/></clipPath>');
add("</defs>");

const TYPE = [
  { at: null, lbl: 12, num: 9, city: 11, note: 10, geo: 11, zone: 12, sm: 10.5, halo: 3 },
  { at: 1200, lbl: 14, num: 10, city: 12.5, note: 11, geo: 12, zone: 13, sm: 11.5, halo: 3.2 },
  { at: 950, lbl: 16, num: 11.5, city: 14.5, note: 12.5, geo: 13.5, zone: 15, sm: 13, halo: 3.6 },
  { at: 750, lbl: 18, num: 13, city: 16, geo: 15, zone: 16, sm: 15, halo: 4.2, hideMinor: true },
  { at: 560, lbl: 30, city: 26, geo: 17, zone: 18, halo: 6, hideMinor: true, hideSmall: true },
];

const css = [
  ".lcmap text{font-family:Inter,system-ui,'Segoe UI',Arial,sans-serif;fill:" +
    C.ink + ";paint-order:stroke;stroke:#fff;stroke-linejoin:round}",
];
for (const t of TYPE) {
  const r = [];
  r.push(".lcmap .lbl{font-size:" + t.lbl + "px;font-weight:700}");
  r.push(".lcmap text{stroke-width:" + t.halo + "}");
  r.push(".lcmap .lbl-city{font-size:" + (t.city || 11) + "px;font-weight:500}");
  r.push(
    ".lcmap .lbl-geo{font-size:" + t.geo + "px;font-weight:600;fill:" + C.taupe +
      ";letter-spacing:.2em;text-transform:uppercase}",
  );
  r.push(
    ".lcmap .lbl-zone{font-size:" + t.zone + "px;font-weight:600;fill:" + C.taupe +
      ";letter-spacing:.16em;text-transform:uppercase}",
  );
  if (t.num) {
    r.push(
      ".lcmap .lbl-num{font-size:" + t.num + "px;font-weight:700;fill:" + C.taupe +
        ";letter-spacing:.12em;text-transform:uppercase}",
    );
  }
  if (t.note) r.push(".lcmap .lbl-note{font-size:" + t.note + "px;fill:" + C.taupe + "}");
  if (t.sm) r.push(".lcmap .lbl-sm{font-size:" + t.sm + "px;font-weight:600;fill:" + C.taupe + "}");
  if (t.hideMinor) r.push(".lcmap .minor{display:none}");
  if (t.hideSmall) {
    r.push(
      ".lcmap .lbl-sm,.lcmap .lbl-num,.lcmap .lbl-city,.lcmap .city,.lcmap .key{display:none}",
    );
  }
  css.push(t.at ? "@container (max-width:" + t.at + "px){" + r.join("") + "}" : r.join("\n"));
}
add("<style>\n" + css.join("\n") + "\n</style>");

add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + dLand + '" fill="' + C.land + '" fill-rule="evenodd"/>');
add('<path d="' + dLibya + '" fill="' + C.libya + '"/>');

// Зони й смуга між ними. Різкої лінії немає навмисно.
add('<g clip-path="url(#lc-libya)">');
add('<path d="' + path(GNU_ZONE, true) + '" fill="' + C.gnu + '" opacity=".22"/>');
add('<path d="' + path(GNU_ZONE, true) + '" fill="url(#lc-hatch-g)"/>');
add('<path d="' + path(LNA_ZONE, true) + '" fill="' + C.lna + '" opacity=".3"/>');
add('<path d="' + path(LNA_ZONE, true) + '" fill="url(#lc-hatch)"/>');
add('<path d="' + path(BAND, true) + '" fill="#fff" opacity=".45"/>');
add("</g>");

add('<path d="' + dLand + '" fill="none" stroke="' + C.coast + '" stroke-width="1" fill-rule="evenodd"/>');
add('<path d="' + dBorders + '" fill="none" stroke="' + C.border + '" stroke-width="1" stroke-linejoin="round"/>');
add('<path d="' + dLibya + '" fill="none" stroke="' + C.taupe + '" stroke-width="1.4"/>');

for (const g of GEO) add(txt("lbl-geo", X(g.c[0]), Y(g.c[1]), "middle", g.n));

add(txt("lbl-zone", X(10.6), Y(32.2), "middle", "уряд у Триполі"));
add(txt("lbl-note minor", X(10.6), Y(32.2) + 16, "middle", "визнаний ООН"));
add(txt("lbl-zone", X(21.5), Y(26.5), "middle", "зона Хафтара"));
add(txt("lbl-note minor", X(21.5), Y(26.5) + 16, "middle", "схід і південь країни"));

// Феццан: за AP він у зоні Хафтара, за іншим джерелом влада там фактично в
// місцевих командирів. Розбіжність показана, а не розвʼязана.
add(txt("lbl-sm minor", X(13.0), Y(24.4), "middle", "Феццан"));
add(txt("lbl-note minor", X(13.0), Y(24.4) + 15, "middle", "за одним з описів — ні в кого:"));
add(txt("lbl-note minor", X(13.0), Y(24.4) + 29, "middle", "влада в місцевих командирів"));

for (const c of CITIES) {
  const m = c.minor ? " minor" : "";
  add(
    '<circle class="city' + m + '" cx="' + f(X(c.c[0])) + '" cy="' + f(Y(c.c[1])) +
    '" r="2.6" fill="' + C.ink + '" opacity=".7"/>',
  );
  add(txt("lbl-city" + m, X(c.c[0]) + c.dx, Y(c.c[1]) + c.dy, c.a, c.n));
}

for (const o of SITES) {
  add(marker(o));
  // Три західні майданчики стоять на трьох градусах довготи: на цілу країну
  // їхні підписи неминуче злипаються. Тому тут — самі позначки, а назви
  // читаються у врізці нижче.
  if (!INSET_IDS.has(o.i)) add(label(o));
}

/* ── Врізка: Триполітанія ────────────────────────────────────────────────── */

/**
 * Захід країни крупним планом. Сенс врізки не в красі: три майданчики, про
 * які пише RFI, лежать на трьох градусах довготи, і на кадрі всієї Лівії
 * їхні підписи сідають один на одного. Заразом видно те, що на великій карті
 * непомітно: Завія й комплекс Мелліта — різні місця за сімдесят кілометрів.
 */
add('<clipPath id="lc-inset"><rect x="' + insetX + '" y="' + insetY +
  '" width="' + INSET_W + '" height="' + insetH + '"/></clipPath>');

// Рамка-покажчик на головному кадрі: звідки збільшено.
add(
  '<rect x="' + f(main.X(INSET_REG[0])) + '" y="' + f(main.Y(INSET_REG[3])) +
  '" width="' + f(main.X(INSET_REG[2]) - main.X(INSET_REG[0])) +
  '" height="' + f(main.Y(INSET_REG[1]) - main.Y(INSET_REG[3])) +
  '" fill="none" stroke="' + C.ink + '" stroke-width="1.2" stroke-dasharray="4 3" opacity=".65"/>',
);
PR = ins;
const insLand = prep(ringsOf(topojson.merge(topo, countries.geometries)), INSET_REG, 0.002);
const insLibya = prep(ringsOf(topojson.feature(topo, libyaGeom).geometry), INSET_REG, 0.002);

add('<g clip-path="url(#lc-inset)">');
add('<rect x="' + insetX + '" y="' + insetY + '" width="' + INSET_W + '" height="' + insetH + '" fill="' + C.sea + '"/>');
add('<path d="' + polyPath(insLand) + '" fill="' + C.land + '" fill-rule="evenodd"/>');
add('<path d="' + polyPath(insLibya) + '" fill="' + C.libya + '"/>');
// Уся врізка лежить у зоні уряду в Триполі — тон той самий, що й на великій карті.
add('<path d="' + polyPath(insLibya) + '" fill="' + C.gnu + '" opacity=".22"/>');
add('<path d="' + polyPath(insLibya) + '" fill="url(#lc-hatch-g)"/>');
add('<path d="' + polyPath(insLand) + '" fill="none" stroke="' + C.coast + '" stroke-width="1" fill-rule="evenodd"/>');

add(
  '<circle cx="' + f(ins.X(13.1913)) + '" cy="' + f(ins.Y(32.8872)) +
  '" r="2.8" fill="' + C.ink + '" opacity=".7"/>',
);
add(txt("lbl-city", ins.X(13.1913) + 10, ins.Y(32.8872) - 4, "start", "Триполі"));

add(
  '<circle cx="' + f(ins.X(MELLITAH.c[0])) + '" cy="' + f(ins.Y(MELLITAH.c[1])) +
  '" r="3.4" fill="#fff" stroke="' + C.taupe + '" stroke-width="1.5"/>',
);
// Підпис іде над крапкою: під нею він сідав на другий рядок Завії.
add(txt("lbl-sm", ins.X(MELLITAH.c[0]), ins.Y(MELLITAH.c[1]) - 10, "middle", "Мелліта"));

for (const o of SITES) {
  if (!INSET_IDS.has(o.i)) continue;
  add(marker(o));
  add(
    txt("lbl", ins.X(o.c[0]) + o.ix, ins.Y(o.c[1]) + o.iy, o.ia, o.n) +
    txt("lbl-num", ins.X(o.c[0]) + o.ix, ins.Y(o.c[1]) + o.iy + 13, o.ia, o.i + " · " + o.role),
  );
}
add("</g>");
add(
  '<rect x="' + insetX + '" y="' + insetY + '" width="' + INSET_W + '" height="' + insetH +
  '" fill="none" stroke="' + C.ink + '" stroke-width="1.2" opacity=".65"/>',
);
add(txt("lbl-sm", insetX, insetY - 8, "start", "Триполітанія крупним планом"));
PR = main;

/* ── Легенда й лінійка ───────────────────────────────────────────────────── */

const kx = 62;
const ky = 54;
add('<g class="key">');
add(
  '<rect x="' + (kx - 20) + '" y="' + (ky - 24) + '" width="250" height="96" rx="3" fill="#fbfaf6" opacity=".93" stroke="' +
  C.border + '" stroke-width="1"/>',
);
add('<circle cx="' + kx + '" cy="' + ky + '" r="5.6" fill="' + C.ua + '" stroke="#fff" stroke-width="1.6"/>');
add(txt("lbl-sm", kx + 16, ky + 4, "start", "український майданчик"));
add('<circle cx="' + kx + '" cy="' + (ky + 24) + '" r="5.6" fill="' + C.ru + '" stroke="#fff" stroke-width="1.6"/>');
add(txt("lbl-sm", kx + 16, ky + 28, "start", "обʼєкт «Африканського корпусу»"));
add(
  '<rect x="' + (kx - 10) + '" y="' + (ky + 42) + '" width="20" height="10" fill="#fff" opacity=".9" stroke="' +
  C.border + '" stroke-width="1"/>',
);
add(txt("lbl-sm", kx + 16, ky + 52, "start", "смуга — межа не названа точно"));
add("</g>");

const sx = 62;
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
  "\n  майданчиків: " + SITES.filter((s) => s.side === "ua").length +
  " · обʼєктів корпусу: " + SITES.filter((s) => s.side === "ru").length,
);
