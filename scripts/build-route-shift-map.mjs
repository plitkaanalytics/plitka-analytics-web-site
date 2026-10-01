/**
 * Карта до § 03 матеріалу «Резервне море»: розвилка на Волзі.
 *
 *   node scripts/build-route-shift-map.mjs
 *
 * Абзац, який вона ілюструє: «Всихає рух на захід, через канал в Азов і далі
 * в Чорне море. Росте рух упоперек самого Каспію — до іранських портів».
 * Обидва плеча починаються з однієї річки, і саме це карта має показати:
 * вантаж не зник, він повернув ліворуч замість праворуч.
 *
 * Чисел на карті немає — їх несуть сусідні графіки. Карта показує напрямок.
 *
 * Геометрія суходолу — Natural Earth 1:10m із world-atlas. Річки — звідти ж,
 * обрізані по рамці в scripts/data/rivers-ne10m-caspian.json. Канал проведено
 * між Волгоградом і Калачем-на-Дону: у Natural Earth його немає, а кінці
 * відомі.
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

// Від Керченської протоки на заході до туркменського берега на сході.
const REG = [34.8, 35.8, 55.6, 49.8];
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
  river: "#b9c6cc",
  ink: "#2a2a2a",
  grown: "#f24c06", // --orange
  dried: "#898270", // --taupe
  stop: "#8c2d04", // --rust
  country: "#6f6758",
};

/* ── Вузли ───────────────────────────────────────────────────────────────── */

const N = {
  volgograd: [44.52, 48.7],
  kalach: [43.53, 48.69],
  rostov: [39.72, 47.22],
  donMouth: [39.38, 47.11],
  kerch: [36.85, 45.5],
  astrakhan: [48.04, 46.35],
  anzali: [49.46, 37.47],
};

// Азовське плече: серединою моря, щоб не різати берег.
// Точки підібрано по смузі відкритої води, яку дає та сама геометрія
// суходолу: у Таганрозькій затоці судноплавний прохід вузький.
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
  [48.62, 45.6],
  [48.7, 45.1],
  [49.6, 43.0],
  [51.0, 40.6],
  [51.2, 38.2],
];

const DOTS = [
  { name: "Волгоград", at: N.volgograd, anchor: "start", dx: 8, dy: -7 },
  { name: "Ростов-на-Дону", at: N.rostov, anchor: "end", dx: -8, dy: 4 },
  { name: "Астрахань", at: N.astrakhan, anchor: "end", dx: -8, dy: 4 },
  { name: "Бандар-Ензелі", at: N.anzali, anchor: "middle", dx: 0, dy: 17 },
];

const LABELS = [
  { text: "РОСІЯ", lon: 43.0, lat: 51.0 },
  { text: "УКРАЇНА", lon: 35.6, lat: 48.6 },
  { text: "КАЗАХСТАН", lon: 53.6, lat: 48.2 },
  { text: "ІРАН", lon: 51.6, lat: 36.2 },
  { text: "АЗЕРБ.", lon: 47.3, lat: 40.3 },
  { text: "ТУРКМ.", lon: 54.4, lat: 39.0 },
];

const SEAS = [
  { text: "Азовське", lon: 37.4, lat: 46.62 },
  { text: "Чорне море", lon: 35.6, lat: 43.9 },
  { text: "Каспійське море", lon: 50.9, lat: 42.4 },
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

const TOL = 0.005;

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

/* ── Річки: зшивання сегментів і вирізання ділянки ───────────────────────── */

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
    const last = seg.length - 1;
    const from = n === 0 ? A.i : seg.findIndex((p) => KEY(p) === joint(order[n - 1], order[n]));
    const to = n === order.length - 1 ? B.i
      : seg.findIndex((p) => KEY(p) === joint(order[n], order[n + 1]));
    const head = from <= to ? seg.slice(from, to + 1) : seg.slice(to, from + 1).reverse();
    out.push(...(out.length ? head.slice(1) : head));
    void last;
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

const EAST = [
  N.volgograd,
  ...reach("Volga", N.volgograd, N.astrakhan).slice(1),
  ...CASP,
  N.anzali,
];

/* ── Перевірка: чи не лізе морська ділянка на суходіл ─────────────────────── */

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

// Річкові ділянки й канал не перевіряємо — вони на суходолі за означенням.
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
  if (bad.length)
    console.warn(
      `  ! ${label}: суходіл у ${bad.length} точках — ${bad.slice(0, 6).join("  ")}`,
    );
  else console.log(`  · ${label}: чисто`);
}

console.log("Перевірка морських ділянок:");
// Гирло не перевіряємо: у Natural Earth 10m лінія Дону закінчується трохи
// вище за берегову лінію, і ділянка в кілька кілометрів через дельту за цією
// геометрією завжди буде «на суходолі».
checkSea([...AZOV.slice(2), N.kerch], "Азов → Керченська протока");
checkSea([...CASP, N.anzali], "Каспій → Бандар-Ензелі");

/* ── Розмітка ────────────────────────────────────────────────────────────── */

const parts = [];
const add = (s) => parts.push(s);

add(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
    W +
    " " +
    H +
    '" role="img" aria-labelledby="rs-t rs-d">',
);
add('<title id="rs-t">Розвилка на Волзі: два виходи для одного вантажу</title>');
add(
  '<desc id="rs-d">Карта від Керченської протоки до східного берега Каспію. ' +
    "Від Волгограда на Волзі відходять два шляхи. Західний іде Волго-Донським " +
    "каналом у Дон, повз Ростов-на-Дону в Азовське море й через Керченську " +
    "протоку в Чорне; він показаний приглушеним кольором і перекреслений біля " +
    "протоки. Східний іде Волгою через Астрахань у Каспійське море й далі на " +
    "південь до іранського порту Бандар-Ензелі; він показаний помаранчевим.</desc>",
);

add('<rect width="' + W + '" height="' + H + '" fill="' + C.sea + '"/>');
add('<path d="' + polyPath(land) + '" fill="' + C.land + '"/>');

add(
  '<g fill="none" stroke="' +
    C.river +
    '" stroke-width="1.1" stroke-linejoin="round">',
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

add(
  '<g font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="' +
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
  '<g font-family="Georgia, serif" font-size="12.5" font-style="italic" fill="#7d8a90">',
);
for (const l of SEAS)
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

// Усохле плече — тонше й приглушене, зросле — товще й помаранчеве.
add(
  '<path fill="none" stroke="' +
    C.dried +
    '" stroke-width="2.4" stroke-dasharray="7 5" stroke-linecap="round" stroke-linejoin="round" opacity="0.75" d="' +
    path(WEST, false) +
    '"/>',
);
add(
  '<path fill="none" stroke="' +
    C.grown +
    '" stroke-width="3.4" stroke-dasharray="8 5" stroke-linecap="round" stroke-linejoin="round" d="' +
    path(EAST, false) +
    '"/>',
);

// Хрест на Керченській протоці.
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

add(
  '<text x="' +
    f(X(36.85) + 14) +
    '" y="' +
    f(Y(45.5) + 18) +
    '" text-anchor="start" font-family="system-ui, sans-serif" font-size="11.5" font-weight="600" fill="' +
    C.stop +
    '">Керченська протока</text>',
);

// Канал підписуємо окремо: у Natural Earth його немає, і без підпису
// відрізок між Волгоградом і Доном читається як вигадана лінія.
add(
  '<text x="' +
    f(X(44.03)) +
    '" y="' +
    f(Y(48.7) - 10) +
    '" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11.5" font-weight="600" fill="' +
    C.ink +
    '">Волго-Донський канал</text>',
);

add('<g font-family="system-ui, sans-serif" font-size="12.5">');
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
  add(
    '<text x="' +
      f(X(p.at[0]) + p.dx) +
      '" y="' +
      f(Y(p.at[1]) + p.dy) +
      '" text-anchor="' +
      p.anchor +
      '" font-weight="600" fill="' +
      C.ink +
      '">' +
      p.name +
      "</text>",
  );
}
add("</g>");

/* Легенда: колір продубльовано словами. */
{
  const x0 = 16,
    y0 = H - 50;
  add(
    '<rect x="' +
      (x0 - 8) +
      '" y="' +
      (y0 - 19) +
      '" width="296" height="60" rx="4" fill="#ffffff" opacity="0.84"/>',
  );
  add(
    '<g font-family="system-ui, sans-serif" font-size="12.5" fill="' +
      C.ink +
      '">',
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
  add(
    '<text x="' +
      (x0 + 38) +
      '" y="' +
      (y0 + 4) +
      '">через Каспій на Іран: потік зріс</text>',
  );
  add(
    '<path d="M' +
      x0 +
      "," +
      (y0 + 24) +
      'h28" stroke="' +
      C.dried +
      '" stroke-width="2.4" stroke-dasharray="7 5" stroke-linecap="round" opacity="0.75"/>',
  );
  add(
    '<text x="' +
      (x0 + 38) +
      '" y="' +
      (y0 + 28) +
      '">каналом в Азов: потік усох</text>',
  );
  add("</g>");
}

add("</svg>");

const svg = parts.join("");
const out = new URL(OUT, ROOT);
mkdirSync(dirname(fileURLToPath(out)), { recursive: true });
writeFileSync(fileURLToPath(out), svg);
console.log(OUT, "—", W + "×" + H, "—", (svg.length / 1024).toFixed(1), "КБ");
console.log(
  "Полотно читається через readFileSync при завантаженні модуля, і для збирача\n" +
    "воно не є залежністю. Щоб next dev показав нову версію, перезапустіть його\n" +
    "або торкніться src/components/RouteShiftMap.tsx.",
);
