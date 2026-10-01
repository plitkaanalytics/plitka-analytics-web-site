/**
 * Карта до § 02 матеріалу «Каспій»: російські та іранські порти й морські
 * шляхи між ними.
 *
 *   node scripts/build-caspian-routes-map.mjs
 *
 * Стрілок і дат немає навмисне. Вантаж ходить в обидва боки, а моменту, коли
 * потік розвернувся, джерела не називають: відомо лише, що 18 серпня про це
 * стало відомо з документа європейського уряду. Стрілка з датою була б
 * вигаданою точністю.
 *
 * Пари портів, між якими показано шлях, беруться з RUSI (Бандар-Ензелі й
 * Амірабад проти Астрахані, Олі та Махачкали) і JCFA (туди ж Ношехр) —
 * docs/dossiers/kaspiy-teatr/notes.md, секція «Маршрут: вузли». Руками сюди
 * портів не дописувати: спершу джерело.
 *
 * Геометрія — Natural Earth 1:10m із пакета world-atlas. Дрібніша за ту, що в
 * лівійських карт, бо тут важлива дельта Волги: без неї Астрахань виглядає
 * містом посеред суходолу, хоч вона й стоїть на річці за шістдесят кілометрів
 * від моря.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/countries-10m.json", ROOT);
const OUT = "public/articles/rezervne-more/caspian-routes.svg";

/* ── Рамка й полотно ─────────────────────────────────────────────────────── */

// Кадр охоплює все море з берегами пʼяти прибережних держав.
const REG = [45.9, 36.1, 55.2, 47.7];
const W = 760;

const RAD = Math.PI / 180;
const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

function projection(reg, width) {
  const k = width / ((reg[2] - reg[0]) * RAD);
  const h = k * (psi(reg[3]) - psi(reg[1]));
  return {
    w: width,
    h,
    X: (lon) => -k * reg[0] * RAD + k * lon * RAD,
    Y: (lat) => k * psi(reg[3]) - k * psi(lat),
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
  ink: "#2a2a2a",
  taupe: "#898270",
  route: "#f24c06",
  base: "#8c2d04",
  country: "#6f6758",
};

/* ── Порти ───────────────────────────────────────────────────────────────── */

const PORTS = [
  { name: "Астрахань", lon: 48.04, lat: 46.35, anchor: "end", dx: -9, dy: 4 },
  { name: "Оля", lon: 47.56, lat: 45.77, anchor: "end", dx: -9, dy: 4 },
  { name: "Махачкала", lon: 47.5, lat: 42.98, anchor: "end", dx: -9, dy: 0 },
  {
    name: "Каспійськ",
    lon: 47.64,
    lat: 42.88,
    anchor: "end",
    dx: -9,
    dy: 13,
    base: true,
  },
  {
    name: "Бандар-Ензелі",
    lon: 49.46,
    lat: 37.47,
    anchor: "middle",
    dx: 0,
    dy: 18,
  },
  { name: "Ношехр", lon: 51.5, lat: 36.65, anchor: "middle", dx: 0, dy: 18 },
  { name: "Амірабад", lon: 53.37, lat: 36.86, anchor: "middle", dx: 0, dy: 18 },
];

/**
 * Шляхи ведено не прямими між портами, а магістраллю по осі моря: з
 * російських портів траси сходяться в центрі, ідуть на південь і розходяться
 * вже біля іранського берега. Прямі лінії різали б Апшеронський півострів і
 * азербайджанський берег, тобто показували б те, чого бути не може.
 *
 * Вузли магістралі підібрані по глибокій воді, а не по джерелах: це умовна
 * лінія, а не зафіксований трек, тому й штрих.
 */
const WP = {
  n: [48.6, 45.4],
  m1: [49.6, 43.0],
  m2: [51.0, 40.6],
  s: [51.2, 38.2],
};

const ROUTES = [
  ["Астрахань", WP.n, WP.m1, WP.m2, WP.s, "Бандар-Ензелі"],
  ["Оля", WP.n],
  ["Махачкала", WP.m1],
  [WP.s, "Ношехр"],
  [WP.s, "Амірабад"],
];

const LABELS = [
  { text: "РОСІЯ", lon: 46.9, lat: 47.3 },
  { text: "КАЗАХСТАН", lon: 54.2, lat: 46.4 },
  { text: "ТУРКМЕНІСТАН", lon: 54.2, lat: 39.3 },
  { text: "АЗЕРБАЙДЖАН", lon: 47.1, lat: 40.2 },
  { text: "ІРАН", lon: 52.4, lat: 36.35 },
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

const ringsOf = (geom) =>
  geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
const path = (pts, close) =>
  pts.map((p, i) => (i ? "L" : "M") + P(p)).join("") + (close ? "Z" : "");

const TOL = 0.0025;

const topo = JSON.parse(readFileSync(fileURLToPath(ATLAS), "utf8"));
const countries = topo.objects.countries;

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
const borders = topojson
  .mesh(topo, countries, (a, b) => a !== b)
  .coordinates.filter((l) => overlaps(boxOf(l), REG))
  .map((l) => simplify(l, TOL));

const polyPath = (polys) =>
  polys.map((rings) => rings.map((r) => path(r, true)).join("")).join("");

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const at = (n) => PORTS.find((p) => p.name === n);
const parts = [];
const add = (s) => parts.push(s);

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    W +
    " " +
    H +
    '" role="img" aria-labelledby="cr-t cr-d">',
);
add('<title id="cr-t">Морські шляхи між портами Росії та Ірану</title>');
add(
  '<desc id="cr-d">Карта Каспійського моря з берегами пʼяти держав. На ' +
    "російському боці позначено порти Астрахань, Оля й Махачкала та " +
    "військово-морську базу в Каспійську, на іранському — Бандар-Ензелі, " +
    "Ношехр і Амірабад. Лініями показано морські шляхи, якими судна ходять " +
    "між цими портами, не виходячи за межі моря.</desc>",
);

add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + polyPath(land) + '" fill="' + C.land + '"/>');
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

add(
  '<g font-family="system-ui, sans-serif" font-size="13.5" font-weight="600" fill="' +
    C.country +
    '" letter-spacing="2">',
);
for (const l of LABELS)
  add(
    '<text x="' +
      f(X(l.lon)) +
      '" y="' +
      f(Y(l.lat)) +
      '" text-anchor="middle">' +
      l.text +
      "</text>",
  );
add("</g>");

add(
  '<g fill="none" stroke="' +
    C.route +
    '" stroke-width="2" stroke-dasharray="7 5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">',
);
for (const leg of ROUTES) {
  const pts = leg.map((n) => {
    if (typeof n !== "string") return n;
    const p = at(n);
    return [p.lon, p.lat];
  });
  add('<path d="' + path(pts, false) + '"/>');
}
add("</g>");

add('<g font-family="system-ui, sans-serif" font-size="12.5">');
for (const p of PORTS) {
  const cx = f(X(p.lon)),
    cy = f(Y(p.lat));
  add(
    '<circle cx="' +
      cx +
      '" cy="' +
      cy +
      '" r="' +
      (p.base ? 5 : 4.5) +
      '" fill="' +
      (p.base ? C.base : C.ink) +
      '" stroke="#ffffff" stroke-width="1.5"/>',
  );
  add(
    '<text x="' +
      f(X(p.lon) + p.dx) +
      '" y="' +
      f(Y(p.lat) + p.dy) +
      '" text-anchor="' +
      p.anchor +
      '" font-weight="600" fill="' +
      (p.base ? C.base : C.ink) +
      '">' +
      p.name +
      "</text>",
  );
}
add("</g>");
add("</svg>");

const svg = parts.join("");
const out = new URL(OUT, ROOT);
mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(fileURLToPath(out), svg);
console.log(OUT, "—", W + "×" + H, "—", (svg.length / 1024).toFixed(1), "КБ");
console.log(
  "Полотно читається через readFileSync при завантаженні модуля, і для збирача
" +
    "воно не є залежністю. Щоб next dev показав нову версію, перезапустіть його
" +
    "або торкніться src/components/CaspianRoutesMap.tsx.",
);
