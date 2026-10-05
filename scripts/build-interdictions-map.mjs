/**
 * Готує суходіл для карти затримань у статті peremykach-ais: Кариби, Європа
 * і два спливні вікна (Ісландія, Аравійське море), кожне у своїй проєкції
 * Меркатора.
 *
 *   node scripts/build-interdictions-map.mjs
 *
 * Пише public/maps/peremykach-ais/insets.json. Шляхи вже спроєктовані в
 * пікселі вікна, тож сторінка не рахує нічого, крім позицій точок, і не тягне
 * ні d3, ні атлас.
 *
 * Великі материки виходять далеко за вікно. Щоб не везти весь берег Євразії
 * заради шматка Балтики, кожне кільце обрізаємо по рамці вікна з полем
 * (Сазерленд — Ходжман). Просто притискати вершини до рамки не можна: ребро,
 * що перетинає видиму зону, тоді зсувається, і на суходолі з'являються шви.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { readFileSync } from "node:fs";
import * as topojson from "topojson-client";

const ROOT = new URL("..", import.meta.url);
const ATLAS = new URL("node_modules/world-atlas/land-50m.json", ROOT);
const OUT = new URL("public/maps/peremykach-ais/insets.json", ROOT);

const RAD = Math.PI / 180;
const psi = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

/** Вікна: [захід, південь, схід, північ] і ширина в пікселях. Висота
 *  випливає з проєкції, щоб суходіл не розтягувало. */
const WINDOWS = {
  car: { box: [-76, 8, -58, 20], w: 480 },
  eu: { box: [-17, 34, 33, 62.5], w: 560 },
  // Спливні вікна: там лише кілька випадків, і постійне місце їм не потрібне
  isl: { box: [-31, 58.5, -9, 66.8], w: 240 },
  ind: { box: [54, 1, 79, 24], w: 220 },
};

const atlas = JSON.parse(readFileSync(ATLAS, "utf8"));
const land = topojson.feature(atlas, atlas.objects.land);

const out = {};
for (const [key, { box, w }] of Object.entries(WINDOWS)) {
  const [west, south, east, north] = box;
  const h = Math.round((w * (psi(north) - psi(south))) / ((east - west) * RAD));
  const px = (lon) => ((lon - west) / (east - west)) * w;
  const py = (lat) => ((psi(north) - psi(lat)) / (psi(north) - psi(south))) * h;
  // Поле за рамкою. Вікно на сторінці буває ширшим чи вищим за саму карту,
  // і SVG вписується з полями; суходіл має заходити й на них, а не
  // обриватися рівно по рамці.
  const M = Math.round(w * 0.45);
  const X0 = -M,
    Y0 = -M,
    X1 = w + M,
    Y1 = h + M;

  /** Сазерленд — Ходжман: обрізає многокутник по одній стороні рамки. */
  function clipEdge(pts, inside, cross) {
    const res = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      const ia = inside(a),
        ib = inside(b);
      if (ia) res.push(a);
      if (ia !== ib) res.push(cross(a, b));
    }
    return res;
  }
  const lerpX = (a, b, x) => [
    x,
    a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0]),
  ];
  const lerpY = (a, b, y) => [
    a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]),
    y,
  ];
  function clip(pts) {
    let r = pts;
    r = clipEdge(
      r,
      (p) => p[0] >= X0,
      (a, b) => lerpX(a, b, X0),
    );
    if (r.length)
      r = clipEdge(
        r,
        (p) => p[0] <= X1,
        (a, b) => lerpX(a, b, X1),
      );
    if (r.length)
      r = clipEdge(
        r,
        (p) => p[1] >= Y0,
        (a, b) => lerpY(a, b, Y0),
      );
    if (r.length)
      r = clipEdge(
        r,
        (p) => p[1] <= Y1,
        (a, b) => lerpY(a, b, Y1),
      );
    return r;
  }

  let d = "";
  const feats = land.type === "FeatureCollection" ? land.features : [land];
  const polys = feats.flatMap((f) =>
    f.geometry.type === "MultiPolygon"
      ? f.geometry.coordinates
      : [f.geometry.coordinates],
  );
  for (const poly of polys) {
    for (const ring of poly) {
      // Афро-Євразія в атласі одне кільце через антимеридіан: стрибок
      // 180 → −180 після проєкції дав би хибне ребро через усю карту.
      // Розгортаємо довготи, щоб кільце йшло безперервно.
      let prev = null;
      let shift = 0;
      const unwrapped = ring.map(([lon, lat]) => {
        if (prev !== null) {
          if (lon + shift - prev > 180) shift -= 360;
          else if (lon + shift - prev < -180) shift += 360;
        }
        prev = lon + shift;
        return [lon + shift, lat];
      });
      // Розгорнуте кільце могло з'їхати на 360°, якщо почалося на Чукотці.
      // Повертаємо його туди, де воно перетинає вікно.
      let lo = Infinity,
        hi = -Infinity;
      for (const [lon] of unwrapped) {
        if (lon < lo) lo = lon;
        if (lon > hi) hi = lon;
      }
      let k = 0;
      while (hi + k < west) k += 360;
      while (lo + k > east) k -= 360;
      const projected = unwrapped.map(([lon, lat]) => [px(lon + k), py(lat)]);
      const clipped = clip(projected);
      const pts = [];
      for (const [x0, y0] of clipped) {
        const x = Math.round(x0 * 2) / 2;
        const y = Math.round(y0 * 2) / 2;
        const last = pts[pts.length - 1];
        if (last && last[0] === x && last[1] === y) continue;
        pts.push([x, y]);
      }
      if (pts.length < 3) continue;
      d += "M" + pts.map(([x, y]) => `${x} ${y}`).join("L") + "Z";
    }
  }
  out[key] = { box, w, h, d };
  console.log(key, `${w}×${h}`, `${(d.length / 1024).toFixed(1)} КБ`);
}

mkdirSync(new URL(".", OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(out));
console.log("→", OUT.pathname);
