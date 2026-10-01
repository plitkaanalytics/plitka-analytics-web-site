'use strict';
/* Геоколаж PLITKA — малювання. Та сама функція малює і робоче полотно, і експорт,
   тож у файлі буде рівно те, що видно на екрані (крім службових рамок і маркерів). */
/* eslint-disable @typescript-eslint/no-unused-vars -- функції спільні для скриптів сторінки, їх кличе app.js */

const ORANGE = '#f24c06';
const FONT = 'Inter, "Segoe UI", Arial, sans-serif';
const ASSETS = {}; // id → { src, img, w, h, ready }
const MCTX = document.createElement('canvas').getContext('2d');

// Рибка з логотипа PLITKA (public/images/plitka-logo.svg)
const FISH = new Path2D(
  'M156.296 4.18309C158.902 2.27578 162.058 1.04903 165.313 0.58737C168.185 0.179898 170.93 0.823617 173.649 1.66674C175.192 2.14573 178.266 3.80813 179.679 2.25194C181.76 -0.041177 185.331 3.72723e-06 185.331 3.72723e-06C185.331 3.72723e-06 184.842 2.16741 182.108 3.8038C182.108 3.8038 184.982 5.13458 185.214 7.22613C185.214 7.22613 182.191 7.50356 179.743 5.32748C178.628 4.33481 178.115 4.51471 176.75 5.21261C174.362 6.43503 172.297 7.25214 169.538 7.50139C165.964 7.82433 162.065 7.44287 158.768 6.02755C155.197 4.4952 156.291 4.18526 156.296 4.18309Z'
);
const FISH_BOX = { x: 155.7, y: 0, w: 29.65, h: 7.83 };

const CAN_FILTER = (() => {
  try {
    const c = document.createElement('canvas').getContext('2d');
    c.filter = 'blur(2px)';
    return c.filter === 'blur(2px)';
  } catch {
    return false;
  }
})();

/* ---------- Системи координат ----------
   board   — пікселі полотна (експорт 1:1);
   content — для фото пікселі знімка, для карти світові координати Меркатора [0, 1),
             для панорами — довгота й широта на сфері в градусах.
   view    — фото й карта: { cx, cy, scale } (+ pitch і bearing у карти);
             панорама: { yaw, pitch, fov }.
   Розмітка живе в координатах контенту, тому тримається об’єкта, хоч як рухай кадр. */

const isTilted = p => p.type === 'map' && !!(p.view.pitch || p.view.bearing);
const isPerspective = p => p.type === 'pano' || isTilted(p);
// Висота віртуальної камери над центром карти; поле зору по вертикалі ≈ 37°, як у MapLibre.
const camDist = p => p.h * 1.5;
const normLon = a => ((((a + 180) % 360) + 360) % 360) - 180;

function mapProject(p, u, v) {
  const V = p.view, S = V.scale;
  const X = (u - V.cx) * S, Y = (v - V.cy) * S;
  const b = (V.bearing || 0) * DEG, t = (V.pitch || 0) * DEG;
  const cb = Math.cos(b), sb = Math.sin(b);
  const x1 = X * cb + Y * sb, y1 = -X * sb + Y * cb;
  if (!t) return [p.x + p.w / 2 + x1, p.y + p.h / 2 + y1];
  const d = camDist(p), w = d - y1 * Math.sin(t);
  if (w <= 1e-3) return [NaN, NaN]; // за лінією обрію
  return [p.x + p.w / 2 + (d * x1) / w, p.y + p.h / 2 + (d * y1 * Math.cos(t)) / w];
}

function mapUnproject(p, bx, by) {
  const V = p.view, S = V.scale;
  const sx = bx - (p.x + p.w / 2), sy = by - (p.y + p.h / 2);
  const b = (V.bearing || 0) * DEG, t = (V.pitch || 0) * DEG;
  let x1, y1;
  if (!t) { x1 = sx; y1 = sy; }
  else {
    const d = camDist(p), den = d * Math.cos(t) + sy * Math.sin(t);
    if (den <= 1e-6) return [NaN, NaN]; // вище обрію землі немає
    y1 = (sy * d) / den;
    x1 = (sx * (d - y1 * Math.sin(t))) / d;
  }
  const cb = Math.cos(b), sb = Math.sin(b);
  return [V.cx + (x1 * cb - y1 * sb) / S, V.cy + (x1 * sb + y1 * cb) / S];
}

/** Яку частину сфери покриває знімок: 2:1 — увесь світ, вужчий — відповідну дугу. */
function panoSpan(p) {
  const as = ASSETS[p.asset];
  const ar = as && as.ready && as.h ? as.w / as.h : 2;
  const lon = ar >= 2 ? 360 : 180 * ar;
  return [lon, lon / ar];
}
const panoFocal = p => p.w / 2 / Math.tan((p.view.fov * DEG) / 2);

function panoProject(p, lon, lat) {
  const V = p.view;
  const l = normLon(lon - V.yaw) * DEG, f = lat * DEG;
  const x = Math.cos(f) * Math.sin(l), y = Math.sin(f), z = Math.cos(f) * Math.cos(l);
  const cp = Math.cos(V.pitch * DEG), sp = Math.sin(V.pitch * DEG);
  const y2 = y * cp - z * sp, z2 = y * sp + z * cp;
  if (z2 <= 1e-4) return [NaN, NaN]; // позаду камери
  const fl = panoFocal(p);
  return [p.x + p.w / 2 + (fl * x) / z2, p.y + p.h / 2 - (fl * y2) / z2];
}

function panoUnproject(p, bx, by) {
  const V = p.view, fl = panoFocal(p);
  const X = bx - (p.x + p.w / 2), Y = -(by - (p.y + p.h / 2));
  const cp = Math.cos(V.pitch * DEG), sp = Math.sin(V.pitch * DEG);
  const y2 = Y * cp + fl * sp, z2 = -Y * sp + fl * cp;
  return [normLon(V.yaw + Math.atan2(X, z2) / DEG), Math.atan2(y2, Math.hypot(X, z2)) / DEG];
}

function c2b(p, u, v) {
  if (p.type === 'map') return mapProject(p, u, v);
  if (p.type === 'pano') return panoProject(p, u, v);
  const w = p.view;
  return [p.x + p.w / 2 + (u - w.cx) * w.scale, p.y + p.h / 2 + (v - w.cy) * w.scale];
}
function b2c(p, x, y) {
  if (p.type === 'map') return mapUnproject(p, x, y);
  if (p.type === 'pano') return panoUnproject(p, x, y);
  const w = p.view;
  return [w.cx + (x - p.x - p.w / 2) / w.scale, w.cy + (y - p.y - p.h / 2) / w.scale];
}

/** Скільки одиниць контенту в одному пікселі полотна в центрі панелі. */
function contentPerBoard(p) {
  if (p.type === 'pano') return p.view.fov / p.w;
  return 1 / p.view.scale;
}

/** Обрізає відрізок карти по лінії обрію: далі за неї земля не малюється. */
function clipMapSeg(p, A, B) {
  const t = (p.view.pitch || 0) * DEG;
  if (!t) return [A, B];
  const V = p.view, S = V.scale, b = (V.bearing || 0) * DEG;
  const cb = Math.cos(b), sb = Math.sin(b);
  const depth = q => -((q[0] - V.cx) * S) * sb + (q[1] - V.cy) * S * cb;
  const lim = (camDist(p) * 0.98) / Math.sin(t);
  const da = depth(A), db = depth(B);
  const okA = da < lim, okB = db < lim;
  if (!okA && !okB) return null;
  if (okA && okB) return [A, B];
  const k = (lim - da) / (db - da);
  const mid = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  return okA ? [A, mid] : [mid, B];
}

/**
 * Переводить послідовність точок контенту в екранні відрізки.
 * На панорамі пряма на екрані — дуга на сфері, тому ділимо її на частини;
 * на карті пряма лишається прямою, там досить відсікти зайве за обрієм.
 */
function projectPath(p, pts, closed) {
  const list = closed && pts.length > 2 ? pts.concat([pts[0]]) : pts;
  const runs = [];
  let cur = [];
  const put = q => {
    if (Number.isFinite(q[0]) && Number.isFinite(q[1])) cur.push(q);
    else if (cur.length) { runs.push(cur); cur = []; }
  };
  if (list.length === 1) put(c2b(p, list[0][0], list[0][1]));
  const pano = p.type === 'pano';
  const sub = pano ? 16 : 1;
  for (let i = 0; i + 1 < list.length; i++) {
    let a = list[i], b = list[i + 1];
    if (!pano && p.type === 'map') {
      const seg = clipMapSeg(p, a, b);
      if (!seg) { if (cur.length) { runs.push(cur); cur = []; } continue; }
      [a, b] = seg;
    }
    const dLon = pano ? normLon(b[0] - a[0]) : b[0] - a[0];
    if (!cur.length) put(c2b(p, a[0], a[1]));
    for (let s = 1; s <= sub; s++) {
      const k = s / sub;
      put(c2b(p, a[0] + dLon * k, a[1] + (b[1] - a[1]) * k));
    }
  }
  if (cur.length > 1 || (cur.length === 1 && list.length === 1)) runs.push(cur);
  return runs;
}

/** Точки кола в координатах контенту — для еліпса й сектора огляду під перспективою. */
function arcPoints(cx, cy, rx, ry, from, to, steps) {
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const a = from + ((to - from) * i) / steps;
    out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return out;
}
const unitOf = doc => Math.max(doc.board.w, doc.board.h) / 2000;

function roundRectPath(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  if (!r) { ctx.rect(x, y, w, h); return; }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- Полотно ---------- */

/** rc: { k — пікселів пристрою на піксель полотна, tileK — множник деталізації тайлів,
          editor — робочий режим (порожні панелі видно), pending — збирач незавантажених тайлів,
          skipAid — напис, який саме редагують, ui — пікселів полотна на піксель екрана } */
function drawBoard(ctx, doc, rc) {
  const B = doc.board;
  ctx.save();
  ctx.fillStyle = B.bg;
  ctx.fillRect(0, 0, B.w, B.h);
  ctx.beginPath();
  ctx.rect(0, 0, B.w, B.h);
  ctx.clip();
  for (const p of doc.panels) drawPanel(ctx, doc, p, rc);
  for (const l of doc.links) drawLink(ctx, doc, l);
  if (doc.wm.on) drawWatermark(ctx, doc);
  ctx.restore();
}

function drawPanel(ctx, doc, p, rc) {
  const r = doc.board.radius || 0;
  ctx.save();
  ctx.globalAlpha = p.opacity ?? 1;
  roundRectPath(ctx, p.x, p.y, p.w, p.h, r);
  ctx.clip();
  if (p.type === 'empty') {
    if (rc.editor) drawEmpty(ctx, p, rc);
    ctx.restore();
    return;
  }
  drawContent(ctx, p, rc);
  for (const a of p.annos) if (a.type === 'blur') drawBlur(ctx, p, a, rc);
  for (const a of p.annos) if (a.type !== 'blur' && a.id !== rc.skipAid) drawAnno(ctx, p, a);
  if (p.type === 'map') drawMapExtras(ctx, doc, p);
  if (p.caption && p.caption.text) drawCaption(ctx, doc, p);
  ctx.restore();

  const bw = p.border && p.border.w;
  if (bw) {
    ctx.save();
    ctx.globalAlpha = p.opacity ?? 1;
    roundRectPath(ctx, p.x + bw / 2, p.y + bw / 2, p.w - bw, p.h - bw, Math.max(0, r - bw / 2));
    ctx.lineWidth = bw;
    ctx.strokeStyle = p.border.color;
    ctx.stroke();
    ctx.restore();
  }
}

function drawContent(ctx, p, rc) {
  if (p.type === 'pano') {
    drawPano(ctx, p, rc);
    return;
  }
  if (p.type === 'image') {
    const as = ASSETS[p.asset];
    if (!as || !as.ready) {
      ctx.fillStyle = 'rgba(128,128,128,.25)';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      return;
    }
    const [x, y] = c2b(p, 0, 0);
    const s = p.view.scale;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(as.img, x, y, as.w * s, as.h * s);
  } else if (p.type === 'map') {
    drawMap(ctx, p, rc);
  }
}

function drawEmpty(ctx, p, rc) {
  const ui = rc.ui || 1;
  ctx.fillStyle = 'rgba(128,128,128,.13)';
  ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.setLineDash([7 * ui, 6 * ui]);
  ctx.lineWidth = 1.5 * ui;
  ctx.strokeStyle = 'rgba(128,128,128,.7)';
  ctx.strokeRect(p.x + 6 * ui, p.y + 6 * ui, p.w - 12 * ui, p.h - 12 * ui);
  ctx.setLineDash([]);
  const title = 'Фото, панорама або карта', hint = 'перетягніть файл, Ctrl+V або кнопки праворуч';
  let fs = clamp(Math.min(p.w, p.h) * 0.06, 13 * ui, 30 * ui);
  ctx.font = `400 ${fs * 0.72}px ${FONT}`;
  fs *= Math.min(1, (p.w * 0.88) / ctx.measureText(hint).width); // підказка має вміститися в ширину панелі
  const cx = p.x + p.w / 2, cy = p.y + p.h / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(128,128,128,.95)';
  ctx.font = `700 ${fs}px ${FONT}`;
  ctx.fillText(title, cx, cy - fs * 0.7);
  ctx.font = `400 ${fs * 0.72}px ${FONT}`;
  ctx.fillText(hint, cx, cy + fs * 0.7);
}

/* ---------- Карта ---------- */

const MAP_BG = '#10151b';
const MAP_BG_RGB = [0.063, 0.082, 0.106];

/** Шари карти: знімок і, за потреби, підписи — грубішим масштабом, щоб були більші. */
function mapLayers(p) {
  const src = MAP_SOURCES[p.map.source] || MAP_SOURCES.esri;
  const out = [{ layer: src, zOff: 0 }];
  if (p.map.labels && src.labels) {
    const zOff = Math.round(Math.log2(clamp(p.map.labelScale || 1, 1, 4)));
    for (const L of src.labels) out.push({ layer: L, zOff });
  }
  return out;
}

function drawMap(ctx, p, rc) {
  ctx.fillStyle = MAP_BG;
  ctx.fillRect(p.x, p.y, p.w, p.h);
  let base = null;
  if (isTilted(p) && GLR.ok()) {
    base = drawMapGL(ctx, p, rc);
    drawHorizonFade(ctx, p);
  } else {
    for (const { layer, zOff } of mapLayers(p)) {
      const st = drawTileLayer(ctx, p, layer, rc, zOff);
      base = base || st;
    }
  }
  // Порожня темна панель нічого не пояснює, тому в роботі кажемо прямо, що сервер не віддав тайли.
  if (rc.editor && base && !base.ok && base.fail) {
    const src = MAP_SOURCES[p.map.source] || MAP_SOURCES.esri;
    const fs = clamp(p.w * 0.032, 11, 30);
    haloText(ctx, 'Тайли не завантажились', p.x + p.w / 2, p.y + p.h / 2 - fs, `700 ${fs}px ${FONT}`, '#fff', 'center');
    haloText(ctx, `${src.name}: сервер не віддав знімки. Спробуйте інше джерело праворуч.`, p.x + p.w / 2, p.y + p.h / 2 + fs * 0.6, `500 ${fs * 0.72}px ${FONT}`, '#e8e2da', 'center');
  }
}

function tileZoomFor(p, layer, rc, zOff = 0) {
  const z = Math.ceil(Math.log2((p.view.scale * (rc.tileK || 1)) / 256) - 0.3) - zOff;
  return clamp(z, 0, layer.maxZ);
}

function drawTileLayer(ctx, p, layer, rc, zOff = 0) {
  const v = p.view;
  const z = tileZoomFor(p, layer, rc, zOff);
  const n = 2 ** z, ts = v.scale / n;
  const hw = p.w / 2 / v.scale, hh = p.h / 2 / v.scale;
  const x0 = Math.floor((v.cx - hw) * n), x1 = Math.floor((v.cx + hw) * n);
  const y0 = Math.max(0, Math.floor((v.cy - hh) * n)), y1 = Math.min(n - 1, Math.floor((v.cy + hh) * n));
  const stat = { ok: 0, fail: 0, pending: 0 };
  if ((x1 - x0 + 1) * (y1 - y0 + 1) > 600) return stat; // захист від абсурдних масштабів
  const ox = p.x + p.w / 2 - v.cx * v.scale, oy = p.y + p.h / 2 - v.cy * v.scale;
  const seam = 0.6 / (rc.k || 1); // перекриття, щоб між тайлами не світились шви
  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      const wx = ((tx % n) + n) % n;
      const bx = ox + tx * ts, by = oy + ty * ts;
      const t = requestTile(layer, z, wx, ty);
      if (t.state === 1) {
        stat.ok++;
        ctx.drawImage(t.img, bx, by, ts + seam, ts + seam);
      } else {
        stat[t.state === 2 ? 'fail' : 'pending']++;
        if (t.state === 0 && rc.pending) rc.pending.push(t);
        drawTileFallback(ctx, layer, z, wx, ty, bx, by, ts + seam);
      }
    }
  }
  return stat;
}

/** Поки тайл вантажиться — показуємо збільшений шматок уже завантаженого батьківського. */
function drawTileFallback(ctx, layer, z, x, y, bx, by, size) {
  for (let d = 1; d <= Math.min(z, 6); d++) {
    const t = peekTile(layer, z - d, x >> d, y >> d);
    if (!t) continue;
    const sub = (t.img.naturalWidth || 256) / (1 << d);
    const sx = (x - ((x >> d) << d)) * sub, sy = (y - ((y >> d) << d)) * sub;
    ctx.drawImage(t.img, sx, sy, sub, sub, bx, by, size, size);
    return;
  }
}

/* ---------- Нахилена карта: тайли лягають на площину землі ---------- */

/** Коефіцієнти перспективи для шейдера: gl_Position = (A·x, B·y, 0, C·y + d). */
function mapProjUniform(p) {
  const d = camDist(p), t = (p.view.pitch || 0) * DEG;
  return [(2 * d) / p.w, (-2 * d * Math.cos(t)) / p.h, -Math.sin(t), d];
}

/** Кути тайла в координатах площини карти, з невеликим напуском проти швів. */
function tileQuad(p, u0, v0, u1, v1) {
  const V = p.view, S = V.scale, b = (V.bearing || 0) * DEG;
  const cb = Math.cos(b), sb = Math.sin(b);
  const e = 0.5 / S;
  const pt = (u, v) => {
    const X = (u - V.cx) * S, Y = (v - V.cy) * S;
    return [X * cb + Y * sb, -X * sb + Y * cb];
  };
  return [...pt(u0 - e, v0 - e), ...pt(u1 + e, v0 - e), ...pt(u1 + e, v1 + e), ...pt(u0 - e, v1 + e)];
}

/** Точка землі для кута панелі, що дивиться вище обрію: обмежуємо віддаль. */
function farGround(p, bx) {
  const V = p.view, S = V.scale, t = (V.pitch || 0) * DEG, d = camDist(p);
  const y1 = (-11 * d) / Math.sin(t);
  const x1 = ((bx - (p.x + p.w / 2)) * (d - y1 * Math.sin(t))) / d;
  const b = (V.bearing || 0) * DEG, cb = Math.cos(b), sb = Math.sin(b);
  return [V.cx + (x1 * cb - y1 * sb) / S, V.cy + (x1 * sb + y1 * cb) / S];
}

/** Перетин прямокутника тайла з опуклим чотирикутником видимої землі (метод розділяючих осей). */
function rectHitsQuad(u0, v0, u1, v1, quad) {
  const rect = [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
  const axes = [[1, 0], [0, 1]];
  for (let i = 0; i < quad.length; i++) {
    const a = quad[i], b = quad[(i + 1) % quad.length];
    axes.push([-(b[1] - a[1]), b[0] - a[0]]);
  }
  for (const [ax, ay] of axes) {
    let r0 = Infinity, r1 = -Infinity, q0 = Infinity, q1 = -Infinity;
    for (const [x, y] of rect) { const d = x * ax + y * ay; r0 = Math.min(r0, d); r1 = Math.max(r1, d); }
    for (const [x, y] of quad) { const d = x * ax + y * ay; q0 = Math.min(q0, d); q1 = Math.max(q1, d); }
    if (r1 < q0 || q1 < r0) return false;
  }
  return true;
}

/**
 * Які тайли брати під нахилом: щоразу ділимо найбільший на екрані,
 * поки всі не стануть із тайл завбільшки або поки не вичерпається бюджет.
 * Тому під ногами лягають детальні знімки, а до обрію — дедалі грубіші.
 */
function coverTiles(p, layer, rc, zOff = 0) {
  const want = 300 * (rc.tileK || 1) * 2 ** zOff;
  const budget = 180;
  const quad = [[p.x, p.y], [p.x + p.w, p.y], [p.x + p.w, p.y + p.h], [p.x, p.y + p.h]].map(([bx, by]) => {
    const c = mapUnproject(p, bx, by);
    return Number.isFinite(c[0]) ? c : farGround(p, bx);
  });
  const screen = (u0, v0, u1, v1) => {
    const q = [[u0, v0], [u1, v0], [u1, v1], [u0, v1]].map(c => mapProject(p, c[0], c[1])).filter(c => Number.isFinite(c[0]));
    if (q.length < 2) return want * 4; // тайл розрізає обрій — ділимо, але без фанатизму
    let m = 0;
    for (let i = 1; i < q.length; i++) m = Math.max(m, dist(q[0][0], q[0][1], q[i][0], q[i][1]));
    return m;
  };
  const make = (z, x, y, o) => {
    const n = 2 ** z, u0 = o + x / n, v0 = y / n, u1 = u0 + 1 / n, v1 = v0 + 1 / n;
    if (v0 >= 1 || v1 <= 0 || !rectHitsQuad(u0, v0, u1, v1, quad)) return null;
    return { z, x, y, o, u0, v0, u1, v1, size: screen(u0, v0, u1, v1) };
  };
  const tiles = [];
  for (let o = -1; o <= 1; o++) {
    const t = make(0, 0, 0, o);
    if (t) tiles.push(t);
  }
  while (tiles.length < budget) {
    let best = -1, bestSize = want;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].z < layer.maxZ && tiles[i].size > bestSize) { best = i; bestSize = tiles[i].size; }
    }
    if (best < 0) break;
    const t = tiles.splice(best, 1)[0];
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
      const kid = make(t.z + 1, t.x * 2 + dx, t.y * 2 + dy, t.o);
      if (kid) tiles.push(kid);
    }
  }
  return tiles;
}

function drawMapGL(ctx, p, rc) {
  const k = clamp(rc.k || 1, 0.4, 3);
  const stat = { ok: 0, fail: 0, pending: 0 };
  if (!GLR.beginMap(p.w, p.h, k, mapProjUniform(p), MAP_BG_RGB)) return stat;
  let first = true;
  for (const { layer, zOff } of mapLayers(p)) {
    for (const t of coverTiles(p, layer, rc, zOff)) {
      const quad = tileQuad(p, t.u0, t.v0, t.u1, t.v1);
      const tile = requestTile(layer, t.z, t.x, t.y);
      if (first) stat[tile.state === 1 ? 'ok' : tile.state === 2 ? 'fail' : 'pending']++;
      if (tile.state === 1) {
        GLR.tile(`${layer.id}/${t.z}/${t.x}/${t.y}`, tile.img, quad);
        continue;
      }
      if (tile.state === 0 && rc.pending) rc.pending.push(tile);
      for (let d = 1; d <= Math.min(t.z, 6); d++) {
        const px = t.x >> d, py = t.y >> d;
        const parent = peekTile(layer, t.z - d, px, py);
        if (!parent) continue;
        const s = 1 / (1 << d);
        const uo = (t.x - (px << d)) * s, vo = (t.y - (py << d)) * s;
        GLR.tile(`${layer.id}/${t.z - d}/${px}/${py}`, parent.img, quad, [uo, vo, uo + s, vo + s]);
        break;
      }
    }
    first = false;
  }
  const res = GLR.finish();
  if (res) ctx.drawImage(res.cv, 0, 0, res.w, res.h, p.x, p.y, p.w, p.h);
  return stat;
}

/** Пом’якшує стик далеких тайлів із небом. */
function drawHorizonFade(ctx, p) {
  const t = (p.view.pitch || 0) * DEG;
  if (!t) return;
  const hy = p.y + p.h / 2 - (camDist(p) * Math.cos(t)) / Math.sin(t);
  if (hy > p.y + p.h) return;
  const band = p.h * 0.14, top = Math.max(p.y, hy);
  const g = ctx.createLinearGradient(0, top, 0, top + band);
  g.addColorStop(0, 'rgba(16,21,27,.95)');
  g.addColorStop(1, 'rgba(16,21,27,0)');
  ctx.fillStyle = g;
  ctx.fillRect(p.x, top, p.w, band);
}

/* ---------- Сферична панорама ---------- */

function drawPano(ctx, p, rc) {
  const as = ASSETS[p.asset];
  ctx.fillStyle = '#0e1319';
  ctx.fillRect(p.x, p.y, p.w, p.h);
  if (!as || !as.ready) return;
  if (!GLR.ok()) {
    haloText(ctx, 'Для панорами 360° потрібен WebGL', p.x + p.w / 2, p.y + p.h / 2, `700 ${Math.max(14, p.w * 0.03)}px ${FONT}`, '#fff', 'center');
    return;
  }
  const span = panoSpan(p);
  const res = GLR.pano(
    p.w, p.h, clamp(rc.k || 1, 0.4, 3), p.asset, as.img, as.w, as.h,
    { f: panoFocal(p), yaw: p.view.yaw * DEG, pitch: p.view.pitch * DEG },
    [span[0] * DEG, span[1] * DEG],
    [0.055, 0.075, 0.098]
  );
  if (res) ctx.drawImage(res.cv, 0, 0, res.w, res.h, p.x, p.y, p.w, p.h);
}

function drawMapExtras(ctx, doc, p) {
  const u = unitOf(doc);
  const m = p.map;
  ctx.save();
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';
  if (m.scaleBar) {
    const mpp = metersPerWorld(p.view.cy) / p.view.scale;
    const want = mpp * 190 * u;
    const pow = 10 ** Math.floor(Math.log10(want));
    const nf = want / pow;
    const nice = (nf >= 5 ? 5 : nf >= 2 ? 2 : 1) * pow;
    const len = nice / mpp;
    const x = p.x + 26 * u, y = p.y + p.h - 26 * u, tick = 11 * u;
    const bar = () => {
      ctx.beginPath();
      ctx.moveTo(x, y - tick);
      ctx.lineTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.lineTo(x + len, y - tick);
    };
    bar();
    ctx.strokeStyle = 'rgba(0,0,0,.6)';
    ctx.lineWidth = 8 * u;
    ctx.stroke();
    bar();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3.5 * u;
    ctx.stroke();
    const label = nice >= 1000 ? `${nice / 1000} км` : `${nice} м`;
    haloText(ctx, label, x + len / 2, y - tick - 13 * u, `700 ${23 * u}px ${FONT}`, '#fff', 'center');
  }
  if (m.north) {
    // Стрілка показує північ: при повороті карти вона повертається разом із нею.
    const cx = p.x + p.w - 38 * u, cy = p.y + 56 * u, ah = 38 * u, aw = 13 * u;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-(p.view.bearing || 0) * DEG);
    haloText(ctx, 'N', 0, -24 * u, `800 ${24 * u}px ${FONT}`, '#fff', 'center');
    const nose = () => {
      ctx.beginPath();
      ctx.moveTo(0, -ah / 2);
      ctx.lineTo(aw, ah / 2);
      ctx.lineTo(0, ah * 0.22);
      ctx.lineTo(-aw, ah / 2);
      ctx.closePath();
    };
    nose();
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,0,0,.6)';
    ctx.lineWidth = 5 * u;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -ah / 2);
    ctx.lineTo(aw, ah / 2);
    ctx.lineTo(0, ah * 0.22);
    ctx.closePath();
    ctx.fillStyle = '#1b1b1b';
    ctx.fill();
    ctx.restore();
  }
  if (m.attr) {
    const src = MAP_SOURCES[m.source] || MAP_SOURCES.esri;
    const fs = 15 * u;
    ctx.font = `500 ${fs}px ${FONT}`;
    const tw = ctx.measureText(src.attr).width;
    const pw = tw + fs * 0.9, ph = fs * 1.6;
    const x = p.x + p.w - pw, y = p.y + p.h - ph;
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(x, y, pw, ph);
    ctx.fillStyle = 'rgba(255,255,255,.88)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(src.attr, x + fs * 0.45, y + ph / 2 + fs * 0.05);
  }
  ctx.restore();
}

function haloText(ctx, text, x, y, font, color, align) {
  ctx.font = font;
  ctx.textAlign = align || 'left';
  ctx.textBaseline = 'middle';
  const fs = parseFloat(font.split(' ')[1]);
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(2, fs * 0.15);
  ctx.strokeStyle = 'rgba(0,0,0,.5)';
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

/* ---------- Підписи панелей ---------- */

function drawPill(ctx, text, x, y, fs, opt = {}) {
  ctx.font = `${opt.weight || 700} ${fs}px ${FONT}`;
  const tw = ctx.measureText(text).width;
  const ph = fs * 1.5, pw = tw + fs * 1.0;
  const lx = opt.align === 'left' ? x : opt.align === 'right' ? x - pw : x - pw / 2;
  roundRectPath(ctx, lx, y - ph / 2, pw, ph, ph / 2);
  ctx.fillStyle = opt.bg || 'rgba(20,20,20,.8)';
  ctx.fill();
  ctx.fillStyle = opt.fg || '#fff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, lx + fs * 0.5, y + fs * 0.04);
  return { x: lx, y: y - ph / 2, w: pw, h: ph };
}

function drawCaption(ctx, doc, p) {
  const c = p.caption;
  const fs = c.size || 30 * unitOf(doc);
  ctx.font = `700 ${fs}px ${FONT}`;
  const pw = ctx.measureText(c.text).width + fs;
  const ph = fs * 1.5, ins = fs * 0.6;
  const pos = c.pos || 'tl';
  const x = pos[1] === 'l' ? p.x + ins : p.x + p.w - ins - pw;
  const y = pos[0] === 't' ? p.y + ins + ph / 2 : p.y + p.h - ins - ph / 2;
  drawPill(ctx, c.text, x, y, fs, { align: 'left', bg: c.accent ? ORANGE : 'rgba(26,26,26,.82)' });
}

/* ---------- Розмітка ---------- */

function styledStroke(ctx, a, fillAlpha) {
  const w = a.width;
  const dash = a.dash ? [w * 2.4, w * 1.9] : [];
  if (fillAlpha) {
    ctx.fillStyle = rgba(a.color, fillAlpha);
    ctx.fill();
  }
  ctx.setLineDash(dash);
  if (a.halo) {
    ctx.strokeStyle = haloColor(a.color);
    ctx.lineWidth = w + Math.max(3, w * 0.9);
    ctx.stroke();
  }
  ctx.strokeStyle = a.color;
  ctx.lineWidth = w;
  ctx.stroke();
  ctx.setLineDash([]);
}

function styledDot(ctx, a, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  if (a.halo) {
    ctx.lineWidth = Math.max(3, a.width * 0.9);
    ctx.strokeStyle = haloColor(a.color);
    ctx.stroke();
  }
  ctx.fillStyle = a.color;
  ctx.fill();
}

const arrowLen = a => Math.max(16, a.width * 3.4);

function arrowHead(ctx, a, x1, y1, x2, y2) {
  const L = arrowLen(a), ang = Math.atan2(y2 - y1, x2 - x1), sp = 0.42;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - L * Math.cos(ang - sp), y2 - L * Math.sin(ang - sp));
  ctx.lineTo(x2 - L * Math.cos(ang + sp), y2 - L * Math.sin(ang + sp));
  ctx.closePath();
  ctx.lineJoin = 'round';
  if (a.halo) {
    ctx.lineWidth = Math.max(3, a.width * 0.9);
    ctx.strokeStyle = haloColor(a.color);
    ctx.stroke();
  }
  ctx.fillStyle = a.color;
  ctx.fill();
}

/** Підпис біля точки, зсунутий перпендикулярно до напрямку лінії. */
function sideLabel(ctx, text, x, y, dx, dy, a) {
  const d = Math.hypot(dx, dy) || 1;
  const fs = a.fs * 0.62;
  let nx = -dy / d, ny = dx / d;
  if (ny > 0) { nx = -nx; ny = -ny; } // підпис завжди вище лінії
  const off = fs * 1.2 + a.width;
  drawPill(ctx, text, x + nx * off, y + ny * off, fs);
}

function penSubpath(ctx, q) {
  ctx.moveTo(q[0][0], q[0][1]);
  if (q.length === 1) { ctx.lineTo(q[0][0] + 0.01, q[0][1]); return; }
  if (q.length === 2) { ctx.lineTo(q[1][0], q[1][1]); return; }
  for (let i = 1; i < q.length - 1; i++) {
    ctx.quadraticCurveTo(q[i][0], q[i][1], (q[i][0] + q[i + 1][0]) / 2, (q[i][1] + q[i + 1][1]) / 2);
  }
  ctx.lineTo(q[q.length - 1][0], q[q.length - 1][1]);
}

/** Малює вже спроєктовані відрізки: розриви там, де об’єкт за спиною або за обрієм. */
function strokeRuns(ctx, a, runs, { fillAlpha = 0, smooth = false } = {}) {
  if (!runs.length) return;
  ctx.beginPath();
  for (const run of runs) {
    if (smooth) penSubpath(ctx, run);
    else run.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  }
  styledStroke(ctx, a, fillAlpha);
}

const lastPoint = runs => (runs.length ? runs[runs.length - 1].slice(-1)[0] : null);
const midPoint = runs => {
  const r = runs[0];
  if (!r) return null;
  return r[Math.floor(r.length / 2)];
};

function textMetrics(a) {
  MCTX.font = `700 ${a.fs}px ${FONT}`;
  const lines = String(a.text || ' ').split('\n');
  const lh = a.fs * 1.22;
  const tw = Math.max(...lines.map(l => MCTX.measureText(l || ' ').width));
  const pad = a.bg ? a.fs * 0.4 : 0;
  return { lines, lh, tw, pad, w: tw + pad * 2, h: lines.length * lh + pad * 2 };
}

function markerLabelBox(a, x, y) {
  if (!a.label) return null;
  const R = a.fs * 0.72, fs = a.fs * 0.62;
  MCTX.font = `700 ${fs}px ${FONT}`;
  const pw = MCTX.measureText(a.label).width + fs;
  return { x: x + R * 1.35, y: y - fs * 0.75, w: pw, h: fs * 1.5 };
}

function drawAnno(ctx, p, a) {
  const P = pt => c2b(p, pt[0], pt[1]);
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const isMap = p.type === 'map';
  const persp = isPerspective(p);
  switch (a.type) {
    case 'line':
    case 'arrow': {
      const runs = projectPath(p, [a.a, a.b]);
      strokeRuns(ctx, a, runs);
      const tip = P(a.b), run = runs[runs.length - 1];
      if (a.type === 'arrow' && Number.isFinite(tip[0]) && run) {
        const prev = run.length > 1 ? run[run.length - 2] : P(a.a);
        if (Number.isFinite(prev[0])) arrowHead(ctx, a, prev[0], prev[1], tip[0], tip[1]);
      }
      if (a.showLen && isMap && runs[0]) {
        const r0 = runs[0], m = midPoint(runs), e = r0[r0.length - 1];
        sideLabel(ctx, fmtDist(worldDist(a.a[0], a.a[1], a.b[0], a.b[1])), m[0], m[1], e[0] - r0[0][0], e[1] - r0[0][1], a);
      }
      break;
    }
    case 'ray': {
      const dx = a.b[0] - a.a[0], dy = a.b[1] - a.a[1];
      const len = Math.hypot(dx, dy) || 1, far = 1e5 * contentPerBoard(p);
      const end = [a.a[0] + (dx / len) * far, a.a[1] + (dy / len) * far];
      strokeRuns(ctx, a, projectPath(p, [a.a, end]));
      const o = P(a.a), q = P(a.b);
      if (Number.isFinite(o[0])) styledDot(ctx, a, o[0], o[1], a.width * 1.3 + 3);
      if (a.showAz && Number.isFinite(o[0]) && Number.isFinite(q[0])) {
        sideLabel(ctx, fmtAz(bearing(a.a[0], a.a[1], a.b[0], a.b[1])), q[0], q[1], q[0] - o[0], q[1] - o[1], a);
      }
      break;
    }
    case 'cone': {
      const r = Math.hypot(a.b[0] - a.a[0], a.b[1] - a.a[1]);
      const ang = Math.atan2(a.b[1] - a.a[1], a.b[0] - a.a[0]), h = ((a.fov ?? 60) * DEG) / 2;
      const pts = [a.a, ...arcPoints(a.a[0], a.a[1], r, r, ang - h, ang + h, 36)];
      strokeRuns(ctx, a, projectPath(p, pts, true), { fillAlpha: 0.22 });
      const axis = projectPath(p, [a.a, a.b]);
      if (axis.length) {
        ctx.beginPath();
        axis.forEach(run => run.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))));
        ctx.setLineDash([a.width * 1.6, a.width * 1.6]);
        ctx.strokeStyle = a.color;
        ctx.lineWidth = Math.max(1, a.width * 0.45);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      const o = P(a.a), q = P(a.b);
      if (Number.isFinite(o[0])) styledDot(ctx, a, o[0], o[1], a.width * 1.3 + 3);
      if (a.showAz && Number.isFinite(o[0]) && Number.isFinite(q[0])) {
        sideLabel(ctx, fmtAz(bearing(a.a[0], a.a[1], a.b[0], a.b[1])), q[0], q[1], q[0] - o[0], q[1] - o[1], a);
      }
      break;
    }
    case 'rect': {
      if (persp) {
        const corners = [a.a, [a.b[0], a.a[1]], a.b, [a.a[0], a.b[1]]];
        strokeRuns(ctx, a, projectPath(p, corners, true), { fillAlpha: a.fill ? 0.22 : 0 });
        break;
      }
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      ctx.beginPath();
      ctx.rect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
      styledStroke(ctx, a, a.fill ? 0.22 : 0);
      break;
    }
    case 'ellipse': {
      if (persp) {
        const pts = arcPoints((a.a[0] + a.b[0]) / 2, (a.a[1] + a.b[1]) / 2, Math.abs(a.b[0] - a.a[0]) / 2, Math.abs(a.b[1] - a.a[1]) / 2, 0, TAU, 64);
        strokeRuns(ctx, a, projectPath(p, pts), { fillAlpha: a.fill ? 0.22 : 0 });
        break;
      }
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      ctx.beginPath();
      ctx.ellipse((x1 + x2) / 2, (y1 + y2) / 2, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2, 0, 0, TAU);
      styledStroke(ctx, a, a.fill ? 0.22 : 0);
      break;
    }
    case 'poly': {
      strokeRuns(ctx, a, projectPath(p, a.pts, a.closed), { fillAlpha: a.closed && a.fill ? 0.22 : 0 });
      break;
    }
    case 'pen': {
      strokeRuns(ctx, a, projectPath(p, a.pts), { smooth: true });
      break;
    }
    case 'marker': {
      const [x, y] = P(a.p);
      if (!Number.isFinite(x)) break;
      const R = a.fs * 0.72;
      ctx.beginPath();
      ctx.arc(x, y, R, 0, TAU);
      ctx.fillStyle = a.color;
      ctx.fill();
      ctx.lineWidth = Math.max(2, R * 0.13);
      ctx.strokeStyle = isDark(a.color) ? 'rgba(255,255,255,.92)' : 'rgba(0,0,0,.72)';
      ctx.stroke();
      const n = String(a.n ?? '');
      ctx.font = `800 ${R * (n.length > 1 ? 0.95 : 1.15)}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDark(a.color) ? '#fff' : '#111';
      ctx.fillText(n, x, y + R * 0.06);
      if (a.label) {
        const b = markerLabelBox(a, x, y);
        drawPill(ctx, a.label, b.x, y, a.fs * 0.62, { align: 'left' });
      }
      break;
    }
    case 'text': {
      const [x, y] = P(a.p);
      if (!Number.isFinite(x)) break;
      const m = textMetrics(a);
      ctx.font = `700 ${a.fs}px ${FONT}`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      if (a.bg) {
        roundRectPath(ctx, x, y, m.w, m.h, a.fs * 0.28);
        ctx.fillStyle = 'rgba(20,20,20,.8)';
        ctx.fill();
      }
      m.lines.forEach((l, i) => {
        const ty = y + m.pad + i * m.lh + m.lh / 2;
        if (!a.bg && a.halo) {
          ctx.lineWidth = Math.max(3, a.fs * 0.16);
          ctx.strokeStyle = haloColor(a.color);
          ctx.strokeText(l, x + m.pad, ty);
        }
        ctx.fillStyle = a.color;
        ctx.fillText(l, x + m.pad, ty);
      });
      break;
    }
  }
  ctx.restore();
}

/** Розмиття чи пікселізація ділянки: облич, номерів, чужих вотермарок. */
function drawBlur(ctx, p, a, rc) {
  const [x1, y1] = c2b(p, a.a[0], a.a[1]), [x2, y2] = c2b(p, a.b[0], a.b[1]);
  const x = Math.min(x1, x2), y = Math.min(y1, y2), w = Math.abs(x2 - x1), h = Math.abs(y2 - y1);
  if (w < 2 || h < 2) return;
  const k = rc.k || 1;
  const str = Math.max(2, a.strength || 16);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  if (a.mode === 'pixel') {
    const cell = str * 1.3;
    const cols = Math.max(1, Math.round(w / cell)), rows = Math.max(1, Math.round(h / cell));
    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const o = off.getContext('2d');
    o.setTransform(cols / w, 0, 0, rows / h, (-x * cols) / w, (-y * rows) / h);
    drawContent(o, p, { ...rc, pending: null, k: cols / w });
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, x, y, w, h);
  } else {
    // Малюємо ділянку із запасом в окремий шар і розмиваємо його цілим, щоб не було швів між тайлами.
    const pad = str * 2.5;
    const rx = x - pad, ry = y - pad, rw = w + pad * 2, rh = h + pad * 2;
    const q = CAN_FILTER ? Math.min(k, 1) : 1 / (str * 0.5);
    const ow = Math.max(1, Math.ceil(rw * q)), oh = Math.max(1, Math.ceil(rh * q));
    const off = document.createElement('canvas');
    off.width = ow;
    off.height = oh;
    const o = off.getContext('2d');
    o.setTransform(ow / rw, 0, 0, oh / rh, (-rx * ow) / rw, (-ry * oh) / rh);
    drawContent(o, p, { ...rc, pending: null, k: q });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (CAN_FILTER) ctx.filter = `blur(${str * k}px)`;
    ctx.drawImage(off, rx, ry, rw, rh);
    ctx.filter = 'none';
  }
  ctx.restore();
}

/* ---------- Зв'язки між панелями ---------- */

function linkEnds(doc, l) {
  const pa = doc.panels.find(p => p.id === l.a.pid), pb = doc.panels.find(p => p.id === l.b.pid);
  if (!pa || !pb || pa.type === 'empty' || pb.type === 'empty') return null;
  return [c2b(pa, l.a.u, l.a.v), c2b(pb, l.b.u, l.b.v)];
}

function drawLink(ctx, doc, l) {
  const e = linkEnds(doc, l);
  if (!e) return;
  const [[x1, y1], [x2, y2]] = e;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  styledStroke(ctx, l);
  const r = l.width * 1.5 + 3;
  styledDot(ctx, l, x1, y1, r);
  styledDot(ctx, l, x2, y2, r);
  ctx.restore();
}

/* ---------- Вотермарка ---------- */

function wmMetrics(doc) {
  const wm = doc.wm, h = wm.h;
  const fishH = h * 0.4, fishW = (fishH * FISH_BOX.w) / FISH_BOX.h;
  const fsB = h * 0.4, fsH = h * 0.34;
  MCTX.font = `800 ${fsB}px ${FONT}`;
  const bw = MCTX.measureText('PLITKA').width;
  MCTX.font = `500 ${fsH}px ${FONT}`;
  const tag = wm.tag || '';
  const hw = tag ? MCTX.measureText(tag).width : 0;
  const padX = h * 0.4, g1 = h * 0.24, g2 = h * 0.24;
  const w = padX + fishW + g1 + bw + (tag ? g2 * 2 + hw : 0) + padX;
  return { h, w, fishH, fishW, fsB, fsH, bw, hw, padX, g1, g2 };
}

function wmRect(doc) {
  const m = wmMetrics(doc), B = doc.board, wm = doc.wm;
  let x = wm.x, y = wm.y;
  if (wm.corner) {
    const ins = B.margin + Math.round(22 * unitOf(doc));
    x = wm.corner[1] === 'l' ? ins : B.w - ins - m.w;
    y = wm.corner[0] === 't' ? ins : B.h - ins - m.h;
  }
  return { x, y, w: m.w, h: m.h, m };
}

function drawWatermark(ctx, doc) {
  const { x, y, w, h, m } = wmRect(doc);
  const light = doc.wm.theme === 'light';
  ctx.save();
  ctx.globalAlpha = doc.wm.opacity ?? 1;
  const bw = Math.max(1.5, h * 0.03);
  roundRectPath(ctx, x + bw / 2, y + bw / 2, w - bw, h - bw, (h - bw) / 2);
  ctx.fillStyle = light ? 'rgba(255,255,255,.9)' : 'rgba(22,22,22,.72)';
  ctx.fill();
  ctx.lineWidth = bw;
  ctx.strokeStyle = ORANGE;
  ctx.stroke();

  ctx.save();
  const sc = m.fishH / FISH_BOX.h;
  ctx.translate(x + m.padX, y + h / 2 - m.fishH / 2);
  ctx.scale(sc, sc);
  ctx.translate(-FISH_BOX.x, -FISH_BOX.y);
  ctx.fillStyle = ORANGE;
  ctx.fill(FISH);
  ctx.restore();

  let cx = x + m.padX + m.fishW + m.g1;
  const cy = y + h / 2 + h * 0.02;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `800 ${m.fsB}px ${FONT}`;
  ctx.fillStyle = light ? '#2a2a2a' : '#ecebe8';
  ctx.fillText('PLITKA', cx, cy);
  if (doc.wm.tag) {
    cx += m.bw + m.g2;
    const lw = Math.max(1, h * 0.022);
    ctx.fillStyle = light ? 'rgba(0,0,0,.28)' : 'rgba(255,255,255,.38)';
    ctx.fillRect(cx - lw / 2, y + h * 0.3, lw, h * 0.4);
    cx += m.g2;
    ctx.font = `500 ${m.fsH}px ${FONT}`;
    ctx.fillStyle = ORANGE;
    ctx.fillText(doc.wm.tag, cx, cy);
  }
  ctx.restore();
}

/* ---------- Геометрія розмітки для виділення й влучання ---------- */

/** Керувальні точки, які можна тягати: [{ idx, x, y }] у координатах полотна. */
function annoPoints(p, a) {
  const P = pt => c2b(p, pt[0], pt[1]);
  switch (a.type) {
    case 'line': case 'arrow': case 'ray': case 'cone': case 'rect': case 'ellipse': case 'blur':
      return [{ idx: 'a', ...xy(P(a.a)) }, { idx: 'b', ...xy(P(a.b)) }];
    case 'poly':
      return a.pts.map((pt, i) => ({ idx: i, ...xy(P(pt)) }));
    default:
      return [];
  }
}
const xy = ([x, y]) => ({ x, y });

function annoBox(p, a) {
  const P = pt => c2b(p, pt[0], pt[1]);
  let pts;
  switch (a.type) {
    case 'marker': {
      const [x, y] = P(a.p), R = a.fs * 0.72;
      const lb = markerLabelBox(a, x, y);
      return { x: x - R, y: y - R, w: lb ? lb.x + lb.w - (x - R) : R * 2, h: R * 2 };
    }
    case 'text': {
      const [x, y] = P(a.p), m = textMetrics(a);
      return { x, y, w: m.w, h: m.h };
    }
    case 'pen': case 'poly': pts = a.pts.map(P); break;
    default: pts = [P(a.a), P(a.b)];
  }
  pts = pts.filter(q => Number.isFinite(q[0]) && Number.isFinite(q[1]));
  if (!pts.length) return { x: p.x, y: p.y, w: p.w, h: p.h };
  const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]);
  const x = Math.min(...xs), y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

/** Під перспективою фігури криві або зрізані обрієм, тому влучання шукаємо по самих відрізках. */
function hitPerspective(p, a, x, y, t) {
  let pts = [a.a, a.b], closed = false, fill = false;
  switch (a.type) {
    case 'ray': {
      const dx = a.b[0] - a.a[0], dy = a.b[1] - a.a[1], len = Math.hypot(dx, dy) || 1;
      const far = 1e5 * contentPerBoard(p);
      pts = [a.a, [a.a[0] + (dx / len) * far, a.a[1] + (dy / len) * far]];
      break;
    }
    case 'cone': {
      const r = Math.hypot(a.b[0] - a.a[0], a.b[1] - a.a[1]);
      const ang = Math.atan2(a.b[1] - a.a[1], a.b[0] - a.a[0]), h = ((a.fov ?? 60) * DEG) / 2;
      pts = [a.a, ...arcPoints(a.a[0], a.a[1], r, r, ang - h, ang + h, 24)];
      closed = fill = true;
      break;
    }
    case 'rect':
    case 'blur':
      pts = [a.a, [a.b[0], a.a[1]], a.b, [a.a[0], a.b[1]]];
      closed = true;
      fill = a.fill || a.type === 'blur';
      break;
    case 'ellipse':
      pts = arcPoints((a.a[0] + a.b[0]) / 2, (a.a[1] + a.b[1]) / 2, Math.abs(a.b[0] - a.a[0]) / 2, Math.abs(a.b[1] - a.a[1]) / 2, 0, TAU, 40);
      closed = true;
      fill = a.fill;
      break;
    case 'poly':
      pts = a.pts;
      closed = a.closed;
      fill = a.closed && a.fill;
      break;
    case 'pen':
      pts = a.pts;
      break;
  }
  const runs = projectPath(p, pts, closed);
  for (const run of runs) {
    for (let i = 1; i < run.length; i++) if (segDist(x, y, run[i - 1][0], run[i - 1][1], run[i][0], run[i][1]) < t) return true;
    if (fill && run.length > 2 && pointInPoly(x, y, run)) return true;
  }
  return false;
}

function hitAnno(p, a, x, y, tol) {
  const P = pt => c2b(p, pt[0], pt[1]);
  const t = tol + (a.width || 0) / 2;
  if (isPerspective(p) && a.type !== 'marker' && a.type !== 'text') return hitPerspective(p, a, x, y, t);
  switch (a.type) {
    case 'line': case 'arrow': {
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      return segDist(x, y, x1, y1, x2, y2) < t;
    }
    case 'ray': {
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      const d = Math.hypot(x2 - x1, y2 - y1) || 1;
      return segDist(x, y, x1, y1, x1 + ((x2 - x1) / d) * 1e5, y1 + ((y2 - y1) / d) * 1e5) < t;
    }
    case 'cone': {
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      const r = Math.hypot(x2 - x1, y2 - y1), dd = Math.hypot(x - x1, y - y1);
      if (dd < t) return true;
      if (dd > r + t) return false;
      let diff = Math.abs(Math.atan2(y - y1, x - x1) - Math.atan2(y2 - y1, x2 - x1));
      if (diff > Math.PI) diff = TAU - diff;
      return diff <= ((a.fov ?? 60) * DEG) / 2 + t / Math.max(dd, 1);
    }
    case 'rect': case 'blur': {
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      const l = Math.min(x1, x2), r = Math.max(x1, x2), tp = Math.min(y1, y2), b = Math.max(y1, y2);
      const inOuter = x > l - t && x < r + t && y > tp - t && y < b + t;
      if (!inOuter) return false;
      if (a.fill || a.type === 'blur') return true;
      return !(x > l + t && x < r - t && y > tp + t && y < b - t);
    }
    case 'ellipse': {
      const [x1, y1] = P(a.a), [x2, y2] = P(a.b);
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, rx = Math.abs(x2 - x1) / 2 || 1, ry = Math.abs(y2 - y1) / 2 || 1;
      const q = Math.hypot((x - cx) / rx, (y - cy) / ry);
      return a.fill ? q <= 1 + t / Math.min(rx, ry) : Math.abs(q - 1) * Math.min(rx, ry) < t;
    }
    case 'poly': case 'pen': {
      const q = a.pts.map(P);
      if (q.length === 1) return Math.hypot(x - q[0][0], y - q[0][1]) < t;
      for (let i = 1; i < q.length; i++) if (segDist(x, y, q[i - 1][0], q[i - 1][1], q[i][0], q[i][1]) < t) return true;
      if (a.type === 'poly' && a.closed) {
        const [l, f] = [q[q.length - 1], q[0]];
        if (segDist(x, y, l[0], l[1], f[0], f[1]) < t) return true;
        if (a.fill && pointInPoly(x, y, q)) return true;
      }
      return false;
    }
    case 'marker': {
      const [mx, my] = P(a.p);
      if (Math.hypot(x - mx, y - my) < a.fs * 0.72 + tol) return true;
      const lb = markerLabelBox(a, mx, my);
      return !!lb && x > lb.x && x < lb.x + lb.w && y > lb.y && y < lb.y + lb.h;
    }
    case 'text': {
      const b = annoBox(p, a);
      return x > b.x - tol && x < b.x + b.w + tol && y > b.y - tol && y < b.y + b.h + tol;
    }
  }
  return false;
}

function hitLink(doc, l, x, y, tol) {
  const e = linkEnds(doc, l);
  return !!e && segDist(x, y, e[0][0], e[0][1], e[1][0], e[1][1]) < tol + l.width / 2 + 2;
}
