'use strict';
/* Геоколаж PLITKA — стан, взаємодія, бічна панель, експорт. */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Довідники ---------- */

const COLORS = [
  ['#ffd400', 'Жовтий'], ['#f24c06', 'Помаранчевий'], ['#ff2b2b', 'Червоний'], ['#1680e2', 'Синій'],
  ['#18d4c6', 'Бірюзовий'], ['#3ddc4a', 'Зелений'], ['#ffffff', 'Білий'], ['#141414', 'Чорний'],
];
const BG_COLORS = [['#ffffff', 'Біле'], ['#dfdad5', 'Бежеве'], ['#2a2a2a', 'Графітове'], ['#000000', 'Чорне']];
// Тег у вотермарці: залежить від того, куди піде колаж.
const WM_TAGS = { tg: '@Plitka_Analytics', x: '@TheodorRicwi' };
const BOARD_PRESETS = [
  { id: '1:1', w: 2000, h: 2000 }, { id: '4:5', w: 1600, h: 2000 }, { id: '3:2', w: 2400, h: 1600 },
  { id: '16:9', w: 2400, h: 1350 }, { id: '2:1', w: 2400, h: 1200 }, { id: '9:16', w: 1125, h: 2000 },
];
const LAYOUTS = [
  { id: '1', name: 'Один кадр', cells: [[0, 0, 1, 1]] },
  { id: '2c', name: 'Дві колонки', cells: [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]] },
  { id: '2r', name: 'Два рядки', cells: [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]] },
  { id: '1+2', name: 'Великий кадр і два праворуч', cells: [[0, 0, 0.5, 1], [0.5, 0, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]] },
  { id: '2+1', name: 'Два ліворуч і великий кадр', cells: [[0, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0, 0.5, 1]] },
  { id: 'pano+2', name: 'Панорама і два кадри під нею', cells: [[0, 0, 1, 0.4], [0, 0.4, 0.5, 0.6], [0.5, 0.4, 0.5, 0.6]] },
  { id: '2+pano', name: 'Два кадри і панорама під ними', cells: [[0, 0, 0.5, 0.6], [0.5, 0, 0.5, 0.6], [0, 0.6, 1, 0.4]] },
  { id: '2x2', name: 'Чотири кадри', cells: [[0, 0, 0.5, 0.5], [0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]] },
  { id: '3c', name: 'Три колонки', cells: [[0, 0, 1 / 3, 1], [1 / 3, 0, 1 / 3, 1], [2 / 3, 0, 1 / 3, 1]] },
  { id: 'pano+3', name: 'Широкий кадр і три під ним', cells: [[0, 0, 1, 0.55], [0, 0.55, 1 / 3, 0.45], [1 / 3, 0.55, 1 / 3, 0.45], [2 / 3, 0.55, 1 / 3, 0.45]] },
];

const TOOLS = {
  select: { name: 'Вибір', code: 'KeyV', key: 'V', hint: 'Клік — вибрати. Панель тягніть, щоб перемістити, за маркери по краях — щоб змінити розмір (Shift — пропорційно, Alt — без прилипання). Подвійний клік по панелі — кадрувати.' },
  hand: { name: 'Кадр', code: 'KeyH', key: 'H', hint: 'Тягніть усередині панелі: фото й карта зсуваються в рамці, панорама 360° крутить огляд. Ctrl і тягнути по карті — нахил і поворот. Коліщатко — масштаб, на панорамі кут огляду.' },
  line: { name: 'Лінія', code: 'KeyL', key: 'L', hint: 'Затисніть і тягніть. Shift — кроком 15°. На карті праворуч видно довжину й азимут.' },
  arrow: { name: 'Стрілка', code: 'KeyA', key: 'A', hint: 'Затисніть і тягніть до об’єкта. Shift — кроком 15°.' },
  ray: { name: 'Промінь', code: 'KeyR', key: 'R', hint: 'Від точки зйомки в бік об’єкта — промінь тягнеться до краю панелі. На карті підписує азимут, точне значення можна ввести праворуч.' },
  cone: { name: 'Сектор огляду', code: 'KeyF', key: 'F', hint: 'Поле зору камери: від точки зйомки в напрямку кадру. Кут огляду й дальність — праворуч.' },
  poly: { name: 'Ламана', code: 'KeyP', key: 'P', hint: 'Клік — вершина. Подвійний клік або Enter — завершити, клік у першу вершину — замкнути контур. Esc — скасувати.' },
  pen: { name: 'Олівець', code: 'KeyB', key: 'B', hint: 'Малюйте від руки — обвести силует, лінію даху чи горизонт.' },
  rect: { name: 'Прямокутник', code: 'KeyM', key: 'M', hint: 'Затисніть і тягніть. Shift — квадрат.' },
  ellipse: { name: 'Еліпс', code: 'KeyE', key: 'E', hint: 'Затисніть і тягніть. Shift — коло.' },
  marker: { name: 'Мітка', code: 'KeyN', key: 'N', hint: 'Клік — нумерована мітка. У кожній панелі лік свій: мітки 1, 2, 3 на фото відповідають міткам 1, 2, 3 на панорамі чи карті.' },
  text: { name: 'Напис', code: 'KeyT', key: 'T', hint: 'Клік — напис. Enter — готово, Shift+Enter — новий рядок.' },
  link: { name: 'Зв’язок', code: 'KeyC', key: 'C', hint: 'Від точки в одній панелі до того самого об’єкта в іншій — лінія через увесь колаж.' },
  blur: { name: 'Розмиття', code: 'KeyU', key: 'U', hint: 'Виділіть ділянку, яку треба сховати: обличчя, номери, чужу вотермарку.' },
};
const TOOL_GROUPS = [['select', 'hand'], ['line', 'arrow', 'ray', 'cone'], ['poly', 'pen', 'rect', 'ellipse'], ['marker', 'text', 'link'], ['blur']];

const ICONS = {
  select: '<path d="M6 3.5l12.5 8-5.6 1.4-2.9 5.6z" fill="currentColor" stroke="none"/>',
  hand: '<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',
  line: '<path d="M5 19L19 5"/>',
  arrow: '<path d="M5 19L18 6M18 6h-7.5M18 6v7.5"/>',
  ray: '<circle cx="5.5" cy="18.5" r="2.4" fill="currentColor" stroke="none"/><path d="M7.5 16.5L21 3"/>',
  cone: '<path d="M4.5 19.5L11 4.2A16 16 0 0 1 20.2 11z" fill="currentColor" fill-opacity=".22"/><circle cx="4.5" cy="19.5" r="2" fill="currentColor" stroke="none"/>',
  poly: '<path d="M4 18L8.5 7l6 7L20 5"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/><circle cx="8.5" cy="7" r="1.5" fill="currentColor"/><circle cx="14.5" cy="14" r="1.5" fill="currentColor"/><circle cx="20" cy="5" r="1.5" fill="currentColor"/>',
  pen: '<path d="M3.5 17c3-4 5-9 8-9s1.5 8 4.5 8 3.5-4 4.5-6"/>',
  rect: '<rect x="4" y="6" width="16" height="12" rx="1"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="9" ry="6.5"/>',
  marker: '<circle cx="12" cy="12" r="8.5"/><path d="M10.2 9.6l2.3-1.6v8.4"/>',
  text: '<path d="M5 7V5h14v2M12 5v14M9 19h6"/>',
  link: '<circle cx="5" cy="17.5" r="2.3" fill="currentColor"/><circle cx="19" cy="6.5" r="2.3" fill="currentColor"/><path d="M7 16l10-8" stroke-dasharray="2.4 2.6"/>',
  blur: '<path d="M12 3.5s6 6.6 6 10.6a6 6 0 0 1-12 0c0-4 6-10.6 6-10.6z"/><path d="M9.3 14.3a2.8 2.8 0 0 0 2.7 2.8"/>',
  photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
  map: '<path d="M9 4L3 6.5V20l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
};
const svgIcon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

const ANNO_NAMES = {
  line: 'Лінія', arrow: 'Стрілка', ray: 'Промінь', cone: 'Сектор огляду', poly: 'Ламана', pen: 'Олівець',
  rect: 'Прямокутник', ellipse: 'Еліпс', marker: 'Мітка', text: 'Напис', blur: 'Розмиття',
};
const CURSORS = { nw: 'nwse-resize', se: 'nwse-resize', ne: 'nesw-resize', sw: 'nesw-resize', n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize' };

/* ---------- Стан ---------- */

let doc = null;
let sel = null; // { k: 'panel', pid } | { k: 'anno', pid, aid } | { k: 'link', lid } | { k: 'wm' }
let tool = 'select';
const style = { color: '#ffd400', width: 6, dash: false, halo: true, fill: false, fs: 40, fov: 60 };
const ws = { s: 0.3, x: 0, y: 0 }; // екран = полотно × s + (x, y)
let drag = null, draft = null, hover = null, textEdit = null, flash = null;
let guides = [];
let spaceDown = false;
let searchState = { q: '', results: [], busy: false, err: '' };

const canvas = $('#stage');
const ctx = canvas.getContext('2d');
const wrap = $('#stageWrap');
const side = $('#side');
let dpr = window.devicePixelRatio || 1;

/* ---------- Документ ---------- */

function newDoc(w = 2000, h = 2000) {
  const d = {
    v: 1,
    board: { w, h, bg: '#ffffff', margin: 30, gap: 30, radius: 0 },
    panels: [],
    links: [],
    wm: { on: true, theme: 'dark', tag: WM_TAGS.tg, h: 84, corner: 'tl', x: 0, y: 0, opacity: 1 },
    layout: null,
  };
  applyLayout(d, '1+2');
  return d;
}

function emptyPanel(r) {
  return { id: uid(), type: 'empty', x: r.x, y: r.y, w: r.w, h: r.h, opacity: 1, annos: [], caption: { text: '', pos: 'tl' }, border: { w: 0, color: '#ffffff' } };
}

function migrate(d) {
  d.links ||= [];
  d.board.radius ??= 0;
  d.wm = { on: true, theme: 'dark', tag: WM_TAGS.tg, h: 84, corner: 'tl', x: 0, y: 0, opacity: 1, ...(d.wm || {}) };
  if ('handle' in d.wm) {
    // Раніше тег був просто перемикачем «показувати/ні».
    if (!d.wm.handle) d.wm.tag = '';
    delete d.wm.handle;
  }
  for (const p of d.panels) {
    p.annos ||= [];
    p.caption ||= { text: '', pos: 'tl' };
    p.border ||= { w: 0, color: '#ffffff' };
    p.opacity ??= 1;
    if (p.type === 'map') {
      p.view.pitch ??= 0;
      p.view.bearing ??= 0;
      // Гібрид — це той самий супутник із шаром підписів, тепер він окремим перемикачем.
      if (p.map.source === 'hybrid') { p.map.source = 'google'; p.map.labels = true; }
      // Тайли osm.org більше не використовуємо — їхні сервери таке не дозволяють.
      if (p.map.source === 'osm') p.map.source = 'street';
      p.map.labelScale ??= 2;
    }
    if (p.type === 'pano') p.pano ||= { north: 0 };
  }
  return d;
}

const getPanel = id => doc.panels.find(p => p.id === id);
const curPanel = () => (sel && sel.k === 'panel' ? getPanel(sel.pid) : null);
function selAnno() {
  if (!sel || sel.k !== 'anno') return null;
  const p = getPanel(sel.pid);
  return (p && p.annos.find(a => a.id === sel.aid)) || null;
}
const selLink = () => (sel && sel.k === 'link' ? doc.links.find(l => l.id === sel.lid) || null : null);

function setSel(s) {
  sel = s;
  updateSidebar();
  requestRender();
}
function validateSel() {
  if (!sel) return;
  if ((sel.k === 'panel' && !getPanel(sel.pid)) || (sel.k === 'anno' && !selAnno()) || (sel.k === 'link' && !selLink())) sel = null;
}

/** Порядок читання за верхніми лівими кутами: у макеті «великий + два праворуч» великий кадр іде першим. */
function readingOrder(a, b) {
  if (Math.abs(a.y - b.y) > Math.min(a.h, b.h) / 4) return a.y - b.y;
  return a.x - b.x;
}
const firstEmpty = () => doc.panels.filter(p => p.type === 'empty').sort(readingOrder)[0] || null;

function panelAt(bx, by) {
  for (let i = doc.panels.length - 1; i >= 0; i--) {
    const p = doc.panels[i];
    if (bx >= p.x && bx <= p.x + p.w && by >= p.y && by <= p.y + p.h) return p;
  }
  return null;
}

/* ---------- Макети ---------- */

function layoutRects(board, id) {
  const L = LAYOUTS.find(l => l.id === id);
  if (!L) return [];
  const m = board.margin, g = board.gap, W = board.w - 2 * m, H = board.h - 2 * m, E = 1e-6;
  return L.cells.map(([fx, fy, fw, fh]) => {
    const x1 = m + fx * W + (fx > E ? g / 2 : 0);
    const x2 = m + (fx + fw) * W - (fx + fw < 1 - E ? g / 2 : 0);
    const y1 = m + fy * H + (fy > E ? g / 2 : 0);
    const y2 = m + (fy + fh) * H - (fy + fh < 1 - E ? g / 2 : 0);
    return { x: Math.round(x1), y: Math.round(y1), w: Math.round(x2 - x1), h: Math.round(y2 - y1) };
  });
}

/** Розкладає панелі по комірках: кожна йде в найближчу вільну, панелі з вмістом — першими. */
function applyLayout(d, id) {
  const rects = layoutRects(d.board, id);
  const center = r => [r.x + r.w / 2, r.y + r.h / 2];
  const assign = new Map();
  const place = panels => {
    const pairs = [];
    for (const p of panels) {
      for (let i = 0; i < rects.length; i++) if (!assign.has(i)) pairs.push([dist(...center(p), ...center(rects[i])), p, i]);
    }
    pairs.sort((a, b) => a[0] - b[0]);
    const used = new Set();
    for (const [, p, i] of pairs) {
      if (used.has(p) || assign.has(i)) continue;
      assign.set(i, p);
      used.add(p);
    }
  };
  place(d.panels.filter(p => p.type !== 'empty'));
  place(d.panels.filter(p => p.type === 'empty'));
  const kept = new Set(assign.values());
  d.panels = d.panels.filter(p => p.type !== 'empty' || kept.has(p));
  rects.forEach((r, i) => {
    const p = assign.get(i);
    if (!p) { d.panels.push(emptyPanel(r)); return; }
    setPanelRect(p, r);
    if (p.type === 'image') ensureCover(p);
  });
  d.layout = id;
}

/** Нова рамка панелі, вміст лишається на місці — як кадрування. */
function setPanelRect(p, r) {
  const ocx = p.x + p.w / 2, ocy = p.y + p.h / 2;
  Object.assign(p, { x: Math.round(r.x), y: Math.round(r.y), w: Math.max(20, Math.round(r.w)), h: Math.max(20, Math.round(r.h)) });
  if (p.view && p.view.scale) {
    p.view.cx += (p.x + p.w / 2 - ocx) / p.view.scale;
    p.view.cy += (p.y + p.h / 2 - ocy) / p.view.scale;
  }
}

function fitView(p, mode) {
  const as = ASSETS[p.asset];
  if (!as || !as.ready || p.type === 'pano') return;
  const s = mode === 'contain' ? Math.min(p.w / as.w, p.h / as.h) : Math.max(p.w / as.w, p.h / as.h);
  p.view = { cx: as.w / 2, cy: as.h / 2, scale: s };
}

function ensureCover(p) {
  const as = ASSETS[p.asset];
  if (!as || !as.ready || p.type !== 'image') return;
  if (!p.view) return fitView(p, 'cover');
  const v = p.view;
  v.scale = Math.max(v.scale, Math.max(p.w / as.w, p.h / as.h));
  const hw = p.w / 2 / v.scale, hh = p.h / 2 / v.scale;
  v.cx = clamp(v.cx, hw, as.w - hw);
  v.cy = clamp(v.cy, hh, as.h - hh);
}

function setBoardSize(w, h) {
  const B = doc.board;
  w = clamp(Math.round(w) || B.w, 200, 8000);
  h = clamp(Math.round(h) || B.h, 200, 8000);
  if (w === B.w && h === B.h) return;
  const kx = w / B.w, ky = h / B.h, k = Math.sqrt(kx * ky);
  const sc = v => Math.max(1, Math.round(v * k));
  for (const p of doc.panels) {
    Object.assign(p, { x: Math.round(p.x * kx), y: Math.round(p.y * ky), w: Math.round(p.w * kx), h: Math.round(p.h * ky) });
    if (p.view && p.view.scale) p.view.scale *= Math.max(kx, ky);
    for (const a of p.annos) {
      if (a.width) a.width = sc(a.width);
      if (a.fs) a.fs = sc(a.fs);
    }
    if (p.border.w) p.border.w = sc(p.border.w);
    if (p.caption.size) p.caption.size = sc(p.caption.size);
  }
  for (const l of doc.links) l.width = sc(l.width);
  doc.wm.h = sc(doc.wm.h);
  doc.wm.x = Math.round(doc.wm.x * kx);
  doc.wm.y = Math.round(doc.wm.y * ky);
  B.margin = Math.round(B.margin * k);
  B.gap = Math.round(B.gap * k);
  B.radius = Math.round(B.radius * k);
  style.width = sc(style.width);
  style.fs = sc(style.fs);
  B.w = w;
  B.h = h;
  if (doc.layout) applyLayout(doc, doc.layout);
  for (const p of doc.panels) if (p.type === 'image') ensureCover(p);
}

/* ---------- Зображення й карти в панелях ---------- */

function addAsset(src, id = uid()) {
  return new Promise(res => {
    if (ASSETS[id]) return res(id);
    const img = new Image();
    const as = (ASSETS[id] = { src, img, w: 0, h: 0, ready: false });
    img.onload = () => {
      as.w = img.naturalWidth;
      as.h = img.naturalHeight;
      as.ready = true;
      requestRender();
      res(id);
    };
    img.onerror = () => {
      delete ASSETS[id];
      res(null);
    };
    img.src = src;
  });
}

const fileToDataURL = f =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(f);
  });

/** Рівнокутний знімок (2:1) — майже напевно сферична панорама. */
const looksPano = as => as && as.ready && as.w >= 1000 && as.w / as.h >= 1.85 && as.w / as.h <= 2.15;

/** Перемикає панель між звичайним фото й сферою. Координати розмітки різні, тому вона скидається. */
function setPanoMode(p, on) {
  if (on === (p.type === 'pano')) return;
  if (p.annos.length) toast('Розмітку цієї панелі знято: у режимі 360° інші координати.', 4000);
  p.annos = [];
  doc.links = doc.links.filter(l => l.a.pid !== p.id && l.b.pid !== p.id);
  if (on) {
    p.type = 'pano';
    p.pano = { north: 0 };
    p.view = { yaw: 0, pitch: 0, fov: 75 };
  } else {
    p.type = 'image';
    delete p.pano;
    p.view = { cx: 0, cy: 0, scale: 1 };
    fitView(p, 'cover');
  }
}

/** Азимут точки панорами з поправкою на північ. */
const panoAz = (p, lon) => ((((p.pano.north || 0) + lon) % 360) + 360) % 360;

function fillPanelWithImage(p, id) {
  if (p.type === 'pano') {
    // Та сама панорама в іншій якості: вигляд і розмітку лишаємо як були.
    if (p.asset) GLR.forget(p.asset);
    p.asset = id;
    return;
  }
  const wasImage = p.type === 'image' && ASSETS[p.asset] && ASSETS[p.asset].ready;
  if (wasImage) {
    // Та сама сцена в іншій роздільності: розмітку масштабуємо разом із кадром.
    const o = ASSETS[p.asset], n = ASSETS[id];
    const kx = n.w / o.w, ky = n.h / o.h;
    const sp = pt => [pt[0] * kx, pt[1] * ky];
    for (const a of p.annos) {
      if (a.a) a.a = sp(a.a);
      if (a.b) a.b = sp(a.b);
      if (a.p) a.p = sp(a.p);
      if (a.pts) a.pts = a.pts.map(sp);
    }
    for (const l of doc.links) for (const e of [l.a, l.b]) if (e.pid === p.id) [e.u, e.v] = sp([e.u, e.v]);
    p.asset = id;
    p.view = { cx: p.view.cx * kx, cy: p.view.cy * ky, scale: p.view.scale / kx };
    return;
  }
  p.type = 'image';
  p.asset = id;
  delete p.map;
  fitView(p, 'cover');
  if (looksPano(ASSETS[id])) setPanoMode(p, true);
}

function createImagePanel(id, at, i, pano) {
  const as = ASSETS[id], B = doc.board;
  let w, h, x, y;
  if (pano) {
    w = B.w - 2 * B.margin;
    h = clamp((w * as.h) / as.w, w / 6, B.h * 0.5);
    x = B.margin;
    y = B.margin + i * 40;
  } else {
    w = B.w * 0.46;
    h = (w * as.h) / as.w;
    if (h > B.h * 0.7) { h = B.h * 0.7; w = (h * as.w) / as.h; }
    const c = at || [B.w / 2, B.h / 2];
    x = c[0] - w / 2 + i * 40;
    y = c[1] - h / 2 + i * 40;
  }
  const p = { ...emptyPanel({ x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) }), type: 'image', asset: id };
  fitView(p, 'cover');
  if (looksPano(as)) setPanoMode(p, true);
  doc.panels.push(p);
  doc.layout = null;
  return p;
}

async function addImageFiles(files, opt = {}) {
  let target = opt.target || null, n = 0, last = null;
  for (const f of files) {
    if (!f || !/^image\//.test(f.type)) continue;
    let id = null;
    try { id = await addAsset(await fileToDataURL(f)); } catch { id = null; }
    if (!id) {
      toast(`Не вдалося відкрити «${f.name || 'зображення'}». Браузер не читає цей формат — збережіть кадр як JPG або PNG.`, 5000);
      continue;
    }
    if (target) {
      fillPanelWithImage(target, id);
      last = target;
      target = opt.chain ? firstEmpty() : null;
    } else {
      last = createImagePanel(id, opt.at, n, opt.pano);
    }
    n++;
  }
  if (last) {
    sel = { k: 'panel', pid: last.id };
    if (last.type === 'pano') toast('Схоже на сферичну панораму — увімкнув режим 360°. Крутити огляд: інструмент «Кадр» (H).', 5500);
    commit();
    updateSidebar();
    requestRender();
  }
}

function lastMapView() {
  try {
    const v = JSON.parse(localStorage.getItem('geokolazh.map'));
    if (v && Number.isFinite(v.cx) && Number.isFinite(v.cy) && Number.isFinite(v.scale)) return v;
  } catch { /* немає збереженого вигляду */ }
  return { cx: merc.x(35), cy: merc.y(45.5), scale: 256 * 2 ** 6, source: 'esri' };
}
function rememberMapView(p) {
  if (!p || p.type !== 'map') return;
  try { localStorage.setItem('geokolazh.map', JSON.stringify({ ...p.view, source: p.map.source })); } catch { /* приватне вікно */ }
}

function makeMap(p) {
  const v = lastMapView();
  p.type = 'map';
  delete p.asset;
  delete p.pano;
  p.annos = [];
  doc.links = doc.links.filter(l => l.a.pid !== p.id && l.b.pid !== p.id);
  const src = v.source === 'hybrid' ? 'google' : v.source === 'osm' ? 'street' : v.source;
  p.map = { source: MAP_SOURCES[src] ? src : 'esri', labels: false, labelScale: 2, scaleBar: true, north: true, attr: true };
  p.view = { cx: v.cx, cy: v.cy, scale: v.scale, pitch: 0, bearing: 0 };
}

function addMap() {
  const cp = curPanel();
  let p = cp && cp.type === 'empty' ? cp : firstEmpty();
  if (!p) {
    const B = doc.board, w = Math.round(B.w * 0.46), h = Math.round(w * 0.75);
    p = emptyPanel({ x: Math.round(B.w / 2 - w / 2), y: Math.round(B.h / 2 - h / 2), w, h });
    doc.panels.push(p);
    doc.layout = null;
  }
  makeMap(p);
  sel = { k: 'panel', pid: p.id };
  commit();
  updateSidebar();
  requestRender();
  setTimeout(() => { const q = $('#mQ'); if (q) q.focus(); }, 0);
}

function clearPanel(p) {
  p.type = 'empty';
  delete p.asset;
  delete p.map;
  delete p.pano;
  delete p.view;
  p.annos = [];
  doc.links = doc.links.filter(l => l.a.pid !== p.id && l.b.pid !== p.id);
}

const zoomOf = p => Math.log2(p.view.scale / 256);

function centerMap(p, lat, lon, z) {
  p.view.cx = merc.x(lon);
  p.view.cy = merc.y(lat);
  if (z != null) p.view.scale = 256 * 2 ** z;
  flash = { pid: p.id, until: performance.now() + 1800 };
  rememberMapView(p);
  requestRender();
}

function normView(p) {
  if (p.type === 'map') p.view.cy = clamp(p.view.cy, 0, 1);
}

/** Зсуває вміст так, щоб схоплена точка лишалася під курсором. Під перспективою — кількома кроками. */
function panContentTo(p, grab, bx, by) {
  if (!grab || !Number.isFinite(grab[0])) return;
  for (let i = 0; i < 4; i++) {
    const cur = b2c(p, bx, by);
    if (!Number.isFinite(cur[0])) return;
    p.view.cx += grab[0] - cur[0];
    p.view.cy += grab[1] - cur[1];
  }
  normView(p);
}

function zoomContent(p, bx, by, f) {
  if (p.type === 'pano') {
    p.view.fov = clamp(p.view.fov / f, 12, 120);
    return;
  }
  const grab = b2c(p, bx, by);
  const v = p.view;
  v.scale = p.type === 'map' ? clamp(v.scale * f, 256 * 2, 256 * 2 ** 22) : clamp(v.scale * f, 0.005, 60);
  panContentTo(p, grab, bx, by);
  normView(p);
}

/* ---------- Розмітка ---------- */

function newAnno(type, c, p) {
  const a = { id: uid(), type, color: style.color, width: style.width, dash: style.dash, halo: style.halo, fs: style.fs };
  if (['line', 'arrow', 'ray', 'cone', 'rect', 'ellipse', 'blur'].includes(type)) { a.a = c; a.b = [...c]; }
  if (type === 'poly' || type === 'pen') a.pts = [c];
  if (type === 'poly') a.closed = false;
  if (['rect', 'ellipse', 'poly'].includes(type)) a.fill = style.fill;
  if (type === 'ray' || type === 'cone') a.showAz = p.type === 'map';
  if (type === 'cone') a.fov = style.fov;
  if (type === 'line' || type === 'arrow') a.showLen = false;
  if (type === 'blur') { a.mode = 'blur'; a.strength = 18; }
  if (type === 'marker') { a.p = c; a.n = nextMarkerLabel(p); a.label = ''; }
  if (type === 'text') { a.p = c; a.text = ''; a.bg = true; }
  return a;
}

function nextMarkerLabel(p) {
  const labels = p.annos.filter(a => a.type === 'marker').map(a => String(a.n));
  const nums = labels.filter(s => /^\d+$/.test(s)).map(Number);
  if (nums.length) return String(Math.max(...nums) + 1);
  const letters = labels.filter(s => /^\p{L}$/u.test(s)).sort();
  if (letters.length) return String.fromCharCode(letters[letters.length - 1].charCodeAt(0) + 1);
  return '1';
}

function moveAnno(a, o, du, dv) {
  const mv = pt => [pt[0] + du, pt[1] + dv];
  if (o.a) a.a = mv(o.a);
  if (o.b) a.b = mv(o.b);
  if (o.p) a.p = mv(o.p);
  if (o.pts) a.pts = o.pts.map(mv);
}

function setAnnoPoint(a, idx, c) {
  if (idx === 'a' || idx === 'b') a[idx] = c;
  else a.pts[idx] = c;
}

/** На сфері довготу тримаємо в межах ±180°, широту — між полюсами. */
function normAnno(p, a) {
  if (p.type !== 'pano') return;
  const f = pt => [normLon(pt[0]), clamp(pt[1], -89.9, 89.9)];
  if (a.a) a.a = f(a.a);
  if (a.b) a.b = f(a.b);
  if (a.p) a.p = f(a.p);
  if (a.pts) a.pts = a.pts.map(f);
}

/** Shift: лінії кроком 15°, прямокутники й еліпси — рівносторонні. */
function constrain(type, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  if (type === 'rect' || type === 'ellipse' || type === 'blur') {
    const m = Math.max(Math.abs(dx), Math.abs(dy));
    return [ax + Math.sign(dx || 1) * m, ay + Math.sign(dy || 1) * m];
  }
  const L = Math.hypot(dx, dy), step = 15 * DEG;
  const ang = Math.round(Math.atan2(dy, dx) / step) * step;
  return [ax + L * Math.cos(ang), ay + L * Math.sin(ang)];
}

function setAz(a, deg) {
  const L = Math.hypot(a.b[0] - a.a[0], a.b[1] - a.a[1]) || 1e-9;
  a.b = [a.a[0] + L * Math.sin(deg * DEG), a.a[1] - L * Math.cos(deg * DEG)];
}

function annoIsTiny(p, a) {
  if (a.type === 'pen') return a.pts.length < 2;
  const [x1, y1] = c2b(p, ...a.a), [x2, y2] = c2b(p, ...a.b);
  const d = dist(x1, y1, x2, y2);
  return !Number.isFinite(d) || d < 4 / ws.s;
}

/* ---------- Історія й автозбереження ---------- */

const hist = { stack: [], i: -1 };
let commitTimer = null;

function commit() {
  clearTimeout(commitTimer);
  const j = JSON.stringify(doc);
  if (hist.stack[hist.i] === j) return;
  hist.stack.length = hist.i + 1;
  hist.stack.push(j);
  if (hist.stack.length > 150) hist.stack.shift();
  hist.i = hist.stack.length - 1;
  updateHistButtons();
  scheduleSave();
}
function commitSoon(ms = 400) {
  clearTimeout(commitTimer);
  commitTimer = setTimeout(commit, ms);
}
function resetHistory() {
  hist.stack = [JSON.stringify(doc)];
  hist.i = 0;
  updateHistButtons();
}
function undo() {
  commit();
  if (hist.i <= 0) return;
  hist.i--;
  restoreHist();
}
function redo() {
  if (hist.i >= hist.stack.length - 1) return;
  hist.i++;
  restoreHist();
}
function restoreHist() {
  doc = JSON.parse(hist.stack[hist.i]);
  draft = null;
  validateSel();
  updateSidebar();
  updateHistButtons();
  requestRender();
  scheduleSave();
}
function updateHistButtons() {
  $('#undo').disabled = hist.i <= 0;
  $('#redo').disabled = hist.i >= hist.stack.length - 1;
}

const savedAssets = new Set();
let saveTimer = null;
const usedAssets = d => [...new Set(d.panels.filter(p => p.type === 'image').map(p => p.asset))];

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 700);
}
async function saveNow() {
  try {
    for (const id of usedAssets(doc)) {
      if (savedAssets.has(id) || !ASSETS[id]) continue;
      await idb.set('a:' + id, ASSETS[id].src);
      savedAssets.add(id);
    }
    await idb.set('doc', JSON.stringify(doc));
    $('#stSave').textContent = 'Збережено в браузері';
  } catch {
    $('#stSave').textContent = 'Автозбереження недоступне — зберігайте проєкт у файл';
  }
}
async function loadSaved() {
  try {
    const j = await idb.get('doc');
    if (!j) return false;
    const d = JSON.parse(j);
    await Promise.all(
      usedAssets(d).map(async id => {
        const src = await idb.get('a:' + id);
        if (src && (await addAsset(src, id))) savedAssets.add(id);
      })
    );
    doc = migrate(d);
    return true;
  } catch {
    return false;
  }
}

/* ---------- Малювання робочого полотна ---------- */

let needRender = false;
function requestRender() {
  if (needRender) return;
  needRender = true;
  requestAnimationFrame(frame);
}
onTileSettled = requestRender;

const screenRC = () => ({ k: dpr * ws.s, tileK: 1, editor: true, pending: null, skipAid: textEdit && textEdit.aid, ui: 1 / ws.s });

function frame() {
  needRender = false;
  if (!doc) return;
  dpr = window.devicePixelRatio || 1;
  const r = wrap.getBoundingClientRect();
  const W = Math.max(1, Math.round(r.width * dpr)), H = Math.max(1, Math.round(r.height * dpr));
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#141414';
  ctx.fillRect(0, 0, W, H);
  ctx.setTransform(dpr * ws.s, 0, 0, dpr * ws.s, dpr * ws.x, dpr * ws.y);
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.6)';
  ctx.shadowBlur = 40 * dpr;
  ctx.shadowOffsetY = 8 * dpr;
  ctx.fillStyle = doc.board.bg;
  ctx.fillRect(0, 0, doc.board.w, doc.board.h);
  ctx.restore();
  drawBoard(ctx, doc, screenRC());
  drawDraft();
  drawOverlay();
}

function drawDraft() {
  if (!draft) return;
  const ui = 1 / ws.s;
  if (draft.k === 'anno') {
    const p = getPanel(draft.pid);
    if (!p) return;
    const a = draft.anno;
    ctx.save();
    roundRectPath(ctx, p.x, p.y, p.w, p.h, doc.board.radius);
    ctx.clip();
    if (a.type === 'blur') drawBlur(ctx, p, a, screenRC());
    else drawAnno(ctx, p, a);
    if (a.type === 'poly' && draft.hover) {
      const [lx, ly] = c2b(p, ...a.pts[a.pts.length - 1]);
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(draft.hover[0], draft.hover[1]);
      ctx.setLineDash([6 * ui, 5 * ui]);
      ctx.strokeStyle = a.color;
      ctx.lineWidth = Math.max(1.5 * ui, a.width * 0.6);
      ctx.stroke();
      ctx.setLineDash([]);
      a.pts.forEach(pt => handleDot(...c2b(p, ...pt), ui * 0.8));
    }
    ctx.restore();
  } else if (draft.k === 'link') {
    const p = getPanel(draft.a.pid);
    if (!p) return;
    const [x1, y1] = c2b(p, draft.a.u, draft.a.v);
    const l = { color: style.color, width: style.width, dash: style.dash, halo: style.halo };
    ctx.save();
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(draft.bx, draft.by);
    styledStroke(ctx, l);
    styledDot(ctx, l, x1, y1, l.width * 1.5 + 3);
    ctx.restore();
  }
}

function handleSquare(x, y, ui) {
  const s = 9 * ui;
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 1.6 * ui;
  ctx.fillRect(x - s / 2, y - s / 2, s, s);
  ctx.strokeRect(x - s / 2, y - s / 2, s, s);
}
function handleDot(x, y, ui) {
  ctx.beginPath();
  ctx.arc(x, y, 5.5 * ui, 0, TAU);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 2 * ui;
  ctx.stroke();
}
function dashedBox(b, ui, color, pad = 0) {
  ctx.setLineDash([5 * ui, 4 * ui]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.3 * ui;
  ctx.strokeRect(b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2);
  ctx.setLineDash([]);
}

function panelHandles(p) {
  const { x, y, w, h } = p, mx = x + w / 2, my = y + h / 2;
  return [
    { dir: 'nw', x, y }, { dir: 'n', x: mx, y }, { dir: 'ne', x: x + w, y }, { dir: 'e', x: x + w, y: my },
    { dir: 'se', x: x + w, y: y + h }, { dir: 's', x: mx, y: y + h }, { dir: 'sw', x, y: y + h }, { dir: 'w', x, y: my },
  ];
}

function drawOverlay() {
  const ui = 1 / ws.s;
  ctx.save();
  // Ділянки розмиття в експорті не мають рамки, але в роботі їх треба бачити.
  for (const p of doc.panels) {
    for (const a of p.annos) if (a.type === 'blur') dashedBox(annoBox(p, a), ui, 'rgba(255,255,255,.75)');
  }
  if (draft && draft.k === 'anno' && draft.anno.type === 'blur') {
    const p = getPanel(draft.pid);
    if (p) dashedBox(annoBox(p, draft.anno), ui, ORANGE);
  }
  if (hover && !(sel && sel.k === 'panel' && sel.pid === hover.pid)) {
    const p = getPanel(hover.pid);
    if (p) {
      ctx.strokeStyle = 'rgba(242,76,6,.6)';
      ctx.lineWidth = 1.5 * ui;
      ctx.strokeRect(p.x, p.y, p.w, p.h);
    }
  }
  if (sel) {
    if (sel.k === 'panel') {
      const p = getPanel(sel.pid);
      if (p) {
        ctx.strokeStyle = ORANGE;
        ctx.lineWidth = 2 * ui;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        for (const h of panelHandles(p)) handleSquare(h.x, h.y, ui);
      }
    } else if (sel.k === 'anno') {
      const p = getPanel(sel.pid), a = selAnno();
      if (p && a) {
        ctx.save();
        ctx.strokeStyle = 'rgba(242,76,6,.5)';
        ctx.lineWidth = 1 * ui;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        ctx.restore();
        const pts = annoPoints(p, a);
        if (!pts.length || a.type === 'poly') dashedBox(annoBox(p, a), ui, ORANGE, 6 * ui);
        for (const pt of pts) handleDot(pt.x, pt.y, ui);
      }
    } else if (sel.k === 'link') {
      const l = selLink(), e = l && linkEnds(doc, l);
      if (e) for (const [x, y] of e) handleDot(x, y, ui);
    } else if (sel.k === 'wm' && doc.wm.on) {
      dashedBox(wmRect(doc), ui, ORANGE, 5 * ui);
    }
  }
  if (guides.length) {
    ctx.strokeStyle = '#1ee3ff';
    ctx.lineWidth = 1 * ui;
    for (const g of guides) {
      ctx.beginPath();
      if (g.x != null) { ctx.moveTo(g.x, 0); ctx.lineTo(g.x, doc.board.h); }
      else { ctx.moveTo(0, g.y); ctx.lineTo(doc.board.w, g.y); }
      ctx.stroke();
    }
  }
  if (flash) {
    const p = getPanel(flash.pid), left = flash.until - performance.now();
    if (p && left > 0) {
      const cx = p.x + p.w / 2, cy = p.y + p.h / 2, r = 22 * ui + (left / 1800) * 30 * ui;
      ctx.globalAlpha = Math.min(1, left / 600);
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 2.5 * ui;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, TAU);
      ctx.moveTo(cx - r - 12 * ui, cy); ctx.lineTo(cx - 6 * ui, cy);
      ctx.moveTo(cx + 6 * ui, cy); ctx.lineTo(cx + r + 12 * ui, cy);
      ctx.moveTo(cx, cy - r - 12 * ui); ctx.lineTo(cx, cy - 6 * ui);
      ctx.moveTo(cx, cy + 6 * ui); ctx.lineTo(cx, cy + r + 12 * ui);
      ctx.stroke();
      requestRender();
    } else flash = null;
  }
  ctx.restore();
}

/* ---------- Влучання ---------- */

function hitHandles(bx, by, tol) {
  if (!sel) return null;
  if (sel.k === 'panel') {
    const p = getPanel(sel.pid);
    if (p) for (const h of panelHandles(p)) if (Math.abs(bx - h.x) < tol && Math.abs(by - h.y) < tol) return { k: 'resize', pid: p.id, dir: h.dir };
  } else if (sel.k === 'anno') {
    const p = getPanel(sel.pid), a = selAnno();
    if (p && a) for (const pt of annoPoints(p, a)) if (dist(bx, by, pt.x, pt.y) < tol * 1.3) return { k: 'apoint', pid: p.id, aid: a.id, idx: pt.idx };
  } else if (sel.k === 'link') {
    const l = selLink(), e = l && linkEnds(doc, l);
    if (e) {
      if (dist(bx, by, e[0][0], e[0][1]) < tol * 1.5) return { k: 'lpoint', lid: l.id, end: 'a' };
      if (dist(bx, by, e[1][0], e[1][1]) < tol * 1.5) return { k: 'lpoint', lid: l.id, end: 'b' };
    }
  }
  return null;
}

function hitTest(bx, by) {
  const tol = 7 / ws.s;
  const h = hitHandles(bx, by, tol);
  if (h) return h;
  if (doc.wm.on) {
    const r = wmRect(doc);
    if (bx >= r.x && bx <= r.x + r.w && by >= r.y && by <= r.y + r.h) return { k: 'wm' };
  }
  for (let i = doc.links.length - 1; i >= 0; i--) if (hitLink(doc, doc.links[i], bx, by, tol)) return { k: 'link', lid: doc.links[i].id };
  const p = panelAt(bx, by);
  if (!p) return null;
  for (let j = p.annos.length - 1; j >= 0; j--) if (hitAnno(p, p.annos[j], bx, by, tol)) return { k: 'anno', pid: p.id, aid: p.annos[j].id };
  return { k: 'panel', pid: p.id };
}

function drawablePanelAt(bx, by) {
  const p = panelAt(bx, by);
  if (!p) { toast('Малюйте всередині панелі з фото чи картою'); return null; }
  if (p.type === 'empty') { toast('Спершу додайте в панель фото чи карту'); return null; }
  return p;
}

/* ---------- Прилипання ---------- */

function snapLines(excludeId) {
  const B = doc.board, m = B.margin, g = B.gap;
  const xs = [0, m, B.w / 2, B.w - m, B.w], ys = [0, m, B.h / 2, B.h - m, B.h];
  for (const q of doc.panels) {
    if (q.id === excludeId) continue;
    xs.push(q.x, q.x + q.w, q.x - g, q.x + q.w + g, q.x + q.w / 2);
    ys.push(q.y, q.y + q.h, q.y - g, q.y + q.h + g, q.y + q.h / 2);
  }
  return { xs, ys };
}
function bestSnap(cands, targets, thr) {
  let best = null;
  for (const c of cands) {
    for (const t of targets) {
      const d = t - c;
      if (Math.abs(d) < thr && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, t };
    }
  }
  return best;
}
function snapMove(p, nx, ny) {
  const thr = 7 / ws.s, T = snapLines(p.id);
  guides = [];
  const sx = bestSnap([nx, nx + p.w / 2, nx + p.w], T.xs, thr);
  const sy = bestSnap([ny, ny + p.h / 2, ny + p.h], T.ys, thr);
  if (sx) { nx += sx.d; guides.push({ x: sx.t }); }
  if (sy) { ny += sy.d; guides.push({ y: sy.t }); }
  return [nx, ny];
}

function resizePanel(p, d, bx, by, keepAspect, noSnap) {
  const s = d.start, dx = bx - d.bx, dy = by - d.by;
  let x1 = s.x, y1 = s.y, x2 = s.x + s.w, y2 = s.y + s.h;
  const thr = 7 / ws.s, T = noSnap ? null : snapLines(p.id);
  guides = [];
  const snapV = (v, arr, axis) => {
    if (!T) return v;
    const b = bestSnap([v], arr, thr);
    if (!b) return v;
    guides.push({ [axis]: b.t });
    return v + b.d;
  };
  if (d.dir.includes('w')) x1 = snapV(s.x + dx, T && T.xs, 'x');
  if (d.dir.includes('e')) x2 = snapV(s.x + s.w + dx, T && T.xs, 'x');
  if (d.dir.includes('n')) y1 = snapV(s.y + dy, T && T.ys, 'y');
  if (d.dir.includes('s')) y2 = snapV(s.y + s.h + dy, T && T.ys, 'y');
  const MIN = 40;
  if (x2 - x1 < MIN) { if (d.dir.includes('w')) x1 = x2 - MIN; else x2 = x1 + MIN; }
  if (y2 - y1 < MIN) { if (d.dir.includes('n')) y1 = y2 - MIN; else y2 = y1 + MIN; }
  if (keepAspect && d.dir.length === 2) {
    const ar = s.w / s.h;
    let w = x2 - x1, h = y2 - y1;
    if (w / h > ar) h = w / ar; else w = h * ar;
    if (d.dir.includes('w')) x1 = x2 - w; else x2 = x1 + w;
    if (d.dir.includes('n')) y1 = y2 - h; else y2 = y1 + h;
    guides = [];
  }
  Object.assign(p, { x: Math.round(x1), y: Math.round(y1), w: Math.round(x2 - x1), h: Math.round(y2 - y1) });
  if (d.view && d.view.cx != null) {
    p.view.cx = d.view.cx + (p.x + p.w / 2 - (s.x + s.w / 2)) / p.view.scale;
    p.view.cy = d.view.cy + (p.y + p.h / 2 - (s.y + s.h / 2)) / p.view.scale;
  }
}

/* ---------- Миша ---------- */

function evPos(e) {
  const r = canvas.getBoundingClientRect();
  const sx = e.clientX - r.left, sy = e.clientY - r.top;
  return { sx, sy, bx: (sx - ws.x) / ws.s, by: (sy - ws.y) / ws.s };
}

canvas.addEventListener('contextmenu', e => e.preventDefault());

canvas.addEventListener('pointerdown', e => {
  if (textEdit) finishTextEdit(false);
  const { sx, sy, bx, by } = evPos(e);
  try { canvas.setPointerCapture(e.pointerId); } catch { /* немає захоплення — не страшно */ }
  const wsDrag = () => { drag = { k: 'ws', sx, sy, ox: ws.x, oy: ws.y }; canvas.style.cursor = 'grabbing'; };
  if (e.button === 1 || e.button === 2 || spaceDown) { e.preventDefault(); wsDrag(); return; }
  if (e.button !== 0) return;

  if (e.altKey) {
    const p = panelAt(bx, by);
    if (p && p.type === 'map') {
      const [u, v] = b2c(p, bx, by);
      copyText(fmtCoord(merc.lat(v), merc.lon(u)));
      return;
    }
  }

  if (tool !== 'hand') {
    const h = hitHandles(bx, by, 7 / ws.s);
    if (h && (tool === 'select' || h.k !== 'resize')) {
      if (h.k === 'resize') {
        const p = getPanel(h.pid);
        drag = { k: 'resize', pid: p.id, dir: h.dir, bx, by, start: { x: p.x, y: p.y, w: p.w, h: p.h }, view: p.view ? { ...p.view } : null };
      } else if (h.k === 'apoint') drag = { k: 'apoint', pid: h.pid, aid: h.aid, idx: h.idx };
      else drag = { k: 'lpoint', lid: h.lid, end: h.end };
      return;
    }
  }

  if (tool === 'select') {
    const h = hitTest(bx, by);
    if (!h) { setSel(null); wsDrag(); return; }
    if (h.k === 'wm') {
      setSel({ k: 'wm' });
      const r = wmRect(doc);
      drag = { k: 'wm', bx, by, ox: r.x, oy: r.y };
    } else if (h.k === 'link') {
      setSel(h);
    } else if (h.k === 'anno') {
      setSel(h);
      drag = { k: 'manno', pid: h.pid, aid: h.aid, bx, by, orig: clone(selAnno()) };
    } else if (h.k === 'panel') {
      if (!(sel && sel.k === 'panel' && sel.pid === h.pid)) setSel(h);
      const p = getPanel(h.pid);
      drag = { k: 'mpanel', pid: p.id, bx, by, ox: p.x, oy: p.y };
    }
    return;
  }

  if (tool === 'hand') {
    const p = panelAt(bx, by);
    if (p && p.type !== 'empty') {
      if (e.ctrlKey && p.type === 'map') drag = { k: 'tilt', pid: p.id, sx, sy, pitch: p.view.pitch || 0, bearing: p.view.bearing || 0 };
      else if (p.type === 'pano') drag = { k: 'pan', pid: p.id, bx, by, yaw: p.view.yaw, pitch: p.view.pitch };
      else drag = { k: 'pan', pid: p.id, bx, by, grab: b2c(p, bx, by) };
      canvas.style.cursor = 'grabbing';
    } else wsDrag();
    return;
  }

  if (tool === 'poly') { downPoly(bx, by); return; }

  if (tool === 'link') {
    const p = drawablePanelAt(bx, by);
    if (!p) return;
    const [u, v] = b2c(p, bx, by);
    draft = { k: 'link', a: { pid: p.id, u, v }, bx, by };
    drag = { k: 'draft-link' };
    return;
  }

  const p = drawablePanelAt(bx, by);
  if (!p) return;
  if (p.type === 'pano' && (tool === 'ray' || tool === 'cone')) {
    toast('Промінь і сектор огляду — інструменти карти. На панорамі азимут об’єкта показує сама мітка.', 5000);
    return;
  }
  const a = newAnno(tool, b2c(p, bx, by), p);
  if (tool === 'marker' || tool === 'text') {
    p.annos.push(a);
    sel = { k: 'anno', pid: p.id, aid: a.id };
    updateSidebar();
    // Редактор відкриваємо після того, як браузер обробить клік, інакше він одразу втратить фокус.
    if (tool === 'text') setTimeout(() => startTextEdit(p, a, true), 0);
    else commit();
    requestRender();
    return;
  }
  draft = { k: 'anno', pid: p.id, anno: a };
  drag = { k: 'draw', bx, by };
});

function downPoly(bx, by) {
  if (draft && draft.k === 'anno' && draft.anno.type === 'poly') {
    const p = getPanel(draft.pid), pts = draft.anno.pts;
    const [fx, fy] = c2b(p, ...pts[0]);
    if (pts.length >= 3 && dist(bx, by, fx, fy) < 10 / ws.s) {
      draft.anno.closed = true;
      finishPoly();
      return;
    }
    const [lx, ly] = c2b(p, ...pts[pts.length - 1]);
    if (dist(bx, by, lx, ly) > 3 / ws.s) pts.push(b2c(p, bx, by));
    requestRender();
    return;
  }
  const p = drawablePanelAt(bx, by);
  if (!p) return;
  draft = { k: 'anno', pid: p.id, anno: newAnno('poly', b2c(p, bx, by), p), hover: null };
  requestRender();
}

function finishPoly() {
  const d = draft;
  draft = null;
  if (!d || d.anno.pts.length < 2) { requestRender(); return; }
  const p = getPanel(d.pid);
  p.annos.push(d.anno);
  sel = { k: 'anno', pid: p.id, aid: d.anno.id };
  commit();
  updateSidebar();
  requestRender();
}

canvas.addEventListener('pointermove', e => {
  const { sx, sy, bx, by } = evPos(e);
  updateStatus(bx, by);
  if (!drag) {
    updateHover(bx, by);
    if (draft && draft.k === 'anno' && draft.anno.type === 'poly') {
      draft.hover = [bx, by];
      requestRender();
    }
    return;
  }
  if ((drag.k === 'draw' || drag.k === 'draft-link') && !draft) { drag = null; return; } // Esc посеред малювання
  drag.moved = true;
  switch (drag.k) {
    case 'ws':
      ws.x = drag.ox + sx - drag.sx;
      ws.y = drag.oy + sy - drag.sy;
      break;
    case 'mpanel': {
      const p = getPanel(drag.pid);
      let nx = drag.ox + bx - drag.bx, ny = drag.oy + by - drag.by;
      if (e.altKey) guides = [];
      else [nx, ny] = snapMove(p, nx, ny);
      p.x = Math.round(nx);
      p.y = Math.round(ny);
      doc.layout = null;
      break;
    }
    case 'resize':
      resizePanel(getPanel(drag.pid), drag, bx, by, e.shiftKey, e.altKey);
      doc.layout = null;
      break;
    case 'pan': {
      const p = getPanel(drag.pid);
      if (p.type === 'pano') {
        const dpp = p.view.fov / p.w; // градусів на піксель полотна
        p.view.yaw = normLon(drag.yaw - (bx - drag.bx) * dpp);
        p.view.pitch = clamp(drag.pitch + (by - drag.by) * dpp, -85, 85);
      } else panContentTo(p, drag.grab, bx, by);
      break;
    }
    case 'tilt': {
      const p = getPanel(drag.pid);
      p.view.pitch = clamp(drag.pitch - (sy - drag.sy) * 0.25, 0, 65);
      p.view.bearing = (((drag.bearing + (sx - drag.sx) * 0.3) % 360) + 360) % 360;
      break;
    }
    case 'manno': {
      const p = getPanel(drag.pid), a = p && p.annos.find(x => x.id === drag.aid);
      if (!a) break;
      const from = b2c(p, drag.bx, drag.by), to = b2c(p, bx, by);
      if (!Number.isFinite(from[0]) || !Number.isFinite(to[0])) break;
      moveAnno(a, drag.orig, p.type === 'pano' ? normLon(to[0] - from[0]) : to[0] - from[0], to[1] - from[1]);
      normAnno(p, a);
      break;
    }
    case 'apoint': {
      const p = getPanel(drag.pid), a = p && p.annos.find(x => x.id === drag.aid);
      if (!a) break;
      let [x, y] = [bx, by];
      if (e.shiftKey && (drag.idx === 'a' || drag.idx === 'b')) {
        const [ox, oy] = c2b(p, ...a[drag.idx === 'a' ? 'b' : 'a']);
        [x, y] = constrain(a.type, ox, oy, bx, by);
      }
      setAnnoPoint(a, drag.idx, b2c(p, x, y));
      normAnno(p, a);
      break;
    }
    case 'lpoint': {
      const l = doc.links.find(x => x.id === drag.lid), p = panelAt(bx, by);
      if (l && p && p.type !== 'empty') {
        const [u, v] = b2c(p, bx, by);
        l[drag.end] = { pid: p.id, u, v };
      }
      break;
    }
    case 'wm':
      doc.wm.corner = null;
      doc.wm.x = Math.round(drag.ox + bx - drag.bx);
      doc.wm.y = Math.round(drag.oy + by - drag.by);
      break;
    case 'draw': {
      const p = getPanel(draft.pid), a = draft.anno;
      if (a.type === 'pen') {
        const [lx, ly] = c2b(p, ...a.pts[a.pts.length - 1]);
        if (dist(bx, by, lx, ly) >= 2 / ws.s) a.pts.push(b2c(p, bx, by));
      } else {
        let [x, y] = [bx, by];
        if (e.shiftKey) {
          const [ax, ay] = c2b(p, ...a.a);
          [x, y] = constrain(a.type, ax, ay, bx, by);
        }
        a.b = b2c(p, x, y);
      }
      break;
    }
    case 'draft-link':
      draft.bx = bx;
      draft.by = by;
      break;
  }
  if (drag.k === 'ws') updateZoomLabel();
  requestRender();
});

function onPointerUp(e) {
  if (!drag) return;
  const d = drag;
  drag = null;
  guides = [];
  try { canvas.releasePointerCapture(e.pointerId); } catch { /* уже відпущено */ }
  if ((d.k === 'draw' || d.k === 'draft-link') && !draft) { requestRender(); return; }
  if (d.k === 'draw') {
    const p = getPanel(draft.pid), a = draft.anno;
    draft = null;
    if (!annoIsTiny(p, a)) {
      if (a.type === 'pen') a.pts = simplify(a.pts, (0.7 * contentPerBoard(p)) / ws.s);
      p.annos.push(a);
      sel = { k: 'anno', pid: p.id, aid: a.id };
      commit();
      updateSidebar();
    }
  } else if (d.k === 'draft-link') {
    const { bx, by } = evPos(e);
    const p = panelAt(bx, by), A = draft.a;
    draft = null;
    const pa = getPanel(A.pid);
    if (p && pa && p.type !== 'empty') {
      const [ax, ay] = c2b(pa, A.u, A.v);
      if (dist(ax, ay, bx, by) > 8 / ws.s) {
        const [u, v] = b2c(p, bx, by);
        const l = { id: uid(), a: A, b: { pid: p.id, u, v }, color: style.color, width: style.width, dash: style.dash, halo: style.halo };
        doc.links.push(l);
        sel = { k: 'link', lid: l.id };
        commit();
        updateSidebar();
      }
    } else toast('Відпустіть зв’язок на тому самому об’єкті в іншій панелі');
  } else if (d.moved && d.k !== 'ws') {
    commit();
    if (d.k === 'pan') rememberMapView(getPanel(d.pid));
    updateSidebar();
  }
  const { bx, by } = evPos(e);
  updateHover(bx, by);
  requestRender();
}
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);

canvas.addEventListener('dblclick', e => {
  const { bx, by } = evPos(e);
  if (draft && draft.k === 'anno' && draft.anno.type === 'poly') { finishPoly(); return; }
  if (tool !== 'select') return;
  const h = hitTest(bx, by);
  if (!h) return;
  if (h.k === 'anno') {
    const p = getPanel(h.pid), a = p.annos.find(x => x.id === h.aid);
    if (a.type === 'text') startTextEdit(p, a, false);
    else if (a.type === 'marker') { const i = $('#anN'); if (i) { i.focus(); i.select(); } }
  } else if (h.k === 'panel') {
    const p = getPanel(h.pid);
    if (p.type === 'empty') pickImages({ pid: p.id });
    else setTool('hand');
  }
});

let wheelTimer = null;
canvas.addEventListener(
  'wheel',
  e => {
    e.preventDefault();
    const { sx, sy, bx, by } = evPos(e);
    const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
    const p = !e.ctrlKey && !e.metaKey && panelAt(bx, by);
    if (p && p.type !== 'empty') {
      zoomContent(p, bx, by, Math.exp(-clamp(dy * 0.0022, -0.5, 0.5)));
      updateStatus(bx, by);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        commit();
        rememberMapView(p);
        if (sel && sel.pid === p.id) updateSidebar();
      }, 350);
    } else {
      zoomWorkspace(Math.exp(-clamp(dy * (e.ctrlKey ? 0.01 : 0.0015), -0.5, 0.5)), sx, sy);
    }
    requestRender();
  },
  { passive: false }
);

function zoomWorkspace(f, sx, sy) {
  const ns = clamp(ws.s * f, 0.03, 6);
  ws.x = sx - ((sx - ws.x) * ns) / ws.s;
  ws.y = sy - ((sy - ws.y) * ns) / ws.s;
  ws.s = ns;
  updateZoomLabel();
  requestRender();
}

function fitBoard() {
  const r = wrap.getBoundingClientRect(), B = doc.board, pad = 40;
  ws.s = clamp(Math.min((r.width - pad * 2) / B.w, (r.height - pad * 2) / B.h), 0.03, 6);
  ws.x = (r.width - B.w * ws.s) / 2;
  ws.y = (r.height - B.h * ws.s) / 2;
  updateZoomLabel();
  requestRender();
}
const updateZoomLabel = () => { $('#zFit').textContent = `${Math.round(ws.s * 100)}%`; };

function updateHover(bx, by) {
  let cur = 'default', hv = null;
  if (spaceDown) cur = 'grab';
  else if (tool === 'select') {
    const h = hitTest(bx, by);
    if (h) {
      cur = h.k === 'resize' ? CURSORS[h.dir] : 'move';
      if (h.k === 'panel' || h.k === 'anno') hv = { pid: h.pid };
    }
  } else if (tool === 'hand') {
    const p = panelAt(bx, by);
    cur = p && p.type !== 'empty' ? 'grab' : 'default';
  } else {
    const h = hitHandles(bx, by, 7 / ws.s);
    if (h && h.k !== 'resize') cur = 'move';
    else {
      const p = panelAt(bx, by);
      cur = p && p.type !== 'empty' ? 'crosshair' : 'not-allowed';
    }
  }
  canvas.style.cursor = cur;
  if ((hv && hv.pid) !== (hover && hover.pid)) {
    hover = hv;
    requestRender();
  }
}

function updateStatus(bx, by) {
  const p = panelAt(bx, by);
  let s = '';
  if (p && p.type === 'map') {
    const [u, v] = b2c(p, bx, by);
    s = Number.isFinite(u)
      ? `${fmtCoord(merc.lat(v), merc.lon(u))} · масштаб ${zoomOf(p).toFixed(1)} · Alt+клік — копіювати`
      : 'вище лінії обрію';
  } else if (p && p.type === 'pano') {
    const [lon, lat] = b2c(p, bx, by);
    s = `азимут ${fmtAz(panoAz(p, lon))} · нахил ${lat >= 0 ? '+' : '−'}${Math.abs(lat).toFixed(1)}°`;
  } else if (p && p.type === 'image') {
    const [u, v] = b2c(p, bx, by);
    s = `кадр: x ${Math.round(u)}, y ${Math.round(v)} px`;
  } else if (bx >= 0 && by >= 0 && bx <= doc.board.w && by <= doc.board.h) {
    s = `полотно: ${Math.round(bx)}, ${Math.round(by)} px`;
  }
  $('#stCoords').textContent = s;
}

/* ---------- Написи ---------- */

const ta = $('#textEdit');

function startTextEdit(p, a, isNew) {
  textEdit = { pid: p.id, aid: a.id, isNew, orig: a.text };
  ta.value = a.text;
  placeTextEditor();
  ta.style.display = 'block';
  ta.focus();
  ta.select();
  requestRender();
}
function placeTextEditor() {
  if (!textEdit) return;
  const p = getPanel(textEdit.pid), a = p && p.annos.find(x => x.id === textEdit.aid);
  if (!a) return;
  const m = textMetrics({ ...a, text: ta.value || ' ' });
  const [bx, by] = c2b(p, ...a.p);
  Object.assign(ta.style, {
    left: `${bx * ws.s + ws.x}px`,
    top: `${by * ws.s + ws.y}px`,
    fontSize: `${a.fs * ws.s}px`,
    color: a.color,
    padding: `${m.pad * ws.s}px`,
    width: `${(m.w + a.fs) * ws.s}px`,
    height: `${m.h * ws.s + 2}px`,
    borderRadius: `${a.fs * 0.28 * ws.s}px`,
  });
}
function finishTextEdit(cancel) {
  if (!textEdit) return;
  const t = textEdit;
  textEdit = null;
  ta.blur(); // інакше прихований редактор тримає фокус і гарячі клавіші не працюють
  ta.style.display = 'none';
  const p = getPanel(t.pid), a = p && p.annos.find(x => x.id === t.aid);
  if (a) {
    if (cancel) a.text = t.orig;
    if (!String(a.text).trim()) {
      p.annos = p.annos.filter(x => x !== a);
      if (sel && sel.aid === a.id) sel = null;
    }
  }
  commit();
  updateSidebar();
  requestRender();
}
ta.addEventListener('input', () => {
  const p = textEdit && getPanel(textEdit.pid), a = p && p.annos.find(x => x.id === textEdit.aid);
  if (!a) return;
  a.text = ta.value;
  placeTextEditor();
});
ta.addEventListener('keydown', e => {
  e.stopPropagation();
  if (e.key === 'Escape') { e.preventDefault(); finishTextEdit(true); }
  else if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); finishTextEdit(false); }
});
ta.addEventListener('blur', () => finishTextEdit(false));

/* ---------- Команди ---------- */

function setTool(t) {
  if (draft) {
    if (draft.k === 'anno' && draft.anno.type === 'poly') finishPoly();
    draft = null;
  }
  tool = t;
  $$('.tool').forEach(b => b.classList.toggle('on', b.dataset.tool === t));
  $('#stHint').textContent = TOOLS[t].hint;
  canvas.style.cursor = t === 'select' ? 'default' : t === 'hand' ? 'grab' : 'crosshair';
  requestRender();
}

function deleteSel() {
  if (!sel) return;
  if (sel.k === 'panel') {
    const id = sel.pid;
    doc.panels = doc.panels.filter(p => p.id !== id);
    doc.links = doc.links.filter(l => l.a.pid !== id && l.b.pid !== id);
    doc.layout = null;
  } else if (sel.k === 'anno') {
    const p = getPanel(sel.pid);
    if (p) p.annos = p.annos.filter(a => a.id !== sel.aid);
  } else if (sel.k === 'link') {
    doc.links = doc.links.filter(l => l.id !== sel.lid);
  } else if (sel.k === 'wm') {
    doc.wm.on = false;
  }
  sel = null;
  commit();
  updateSidebar();
  requestRender();
}

function duplicateSel() {
  if (sel && sel.k === 'panel') {
    const q = clone(getPanel(sel.pid));
    q.id = uid();
    q.annos.forEach(a => (a.id = uid()));
    q.x += 40;
    q.y += 40;
    doc.panels.push(q);
    doc.layout = null;
    setSel({ k: 'panel', pid: q.id });
    commit();
  } else if (sel && sel.k === 'anno') {
    const p = getPanel(sel.pid), a = clone(selAnno());
    a.id = uid();
    const d = 30 * contentPerBoard(p);
    moveAnno(a, clone(a), d, d);
    if (a.type === 'marker') a.n = nextMarkerLabel(p);
    p.annos.push(a);
    setSel({ k: 'anno', pid: p.id, aid: a.id });
    commit();
  }
}

function reorder(dir) {
  const p = curPanel();
  if (!p) return;
  const arr = doc.panels, i = arr.indexOf(p);
  arr.splice(i, 1);
  const j = dir === 'top' ? arr.length : dir === 'bottom' ? 0 : dir === 'up' ? Math.min(arr.length, i + 1) : Math.max(0, i - 1);
  arr.splice(j, 0, p);
  commit();
  requestRender();
}

function nudge(dx, dy) {
  if (!sel) return;
  if (sel.k === 'panel') {
    const p = getPanel(sel.pid);
    p.x += dx;
    p.y += dy;
    doc.layout = null;
  } else if (sel.k === 'anno') {
    const p = getPanel(sel.pid), a = selAnno();
    const k = contentPerBoard(p);
    moveAnno(a, clone(a), dx * k, dy * k);
    normAnno(p, a);
  } else if (sel.k === 'wm') {
    const r = wmRect(doc);
    Object.assign(doc.wm, { corner: null, x: r.x + dx, y: r.y + dy });
  } else return;
  commitSoon();
  requestRender();
}

let pickCtx = null;
function pickImages(c) {
  pickCtx = c || {};
  const inp = $('#fileImg');
  inp.value = '';
  inp.click();
}
$('#fileImg').addEventListener('change', async e => {
  const files = [...e.target.files], c = pickCtx || {};
  pickCtx = null;
  if (!files.length) return;
  const target = c.pid ? getPanel(c.pid) : null;
  await addImageFiles(files, { target, pano: c.pano, chain: !c.pano && !c.replace });
});

async function copyText(s) {
  try {
    await navigator.clipboard.writeText(s);
  } catch {
    const t = document.createElement('textarea');
    t.value = s;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  toast(`Скопійовано: ${s}`);
}

/* ---------- Пошук на карті ---------- */

async function runSearch(p, q) {
  searchState = { q, results: [], busy: false, err: '' };
  const c = parseCoords(q);
  if (c) {
    centerMap(p, c.lat, c.lon, Math.max(16, zoomOf(p)));
    commit();
    updateSidebar();
    return;
  }
  if (!q.trim()) return;
  searchState.busy = true;
  updateSidebar();
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=uk,en&q=${encodeURIComponent(q)}`);
    const js = await r.json();
    searchState.results = Array.isArray(js) ? js : [];
    searchState.err = searchState.results.length ? '' : 'Нічого не знайдено. Спробуйте координати або іншу назву.';
  } catch {
    searchState.err = 'Пошук за назвою зараз недоступний — вставте координати.';
  }
  searchState.busy = false;
  if (curPanel() === p) updateSidebar();
}

function pickResult(p, r) {
  const [s, n, w, e] = r.boundingbox.map(Number);
  const x1 = merc.x(w), x2 = merc.x(e), y1 = merc.y(n), y2 = merc.y(s);
  const sc = Math.min(p.w / Math.max(x2 - x1, 1e-12), p.h / Math.max(y2 - y1, 1e-12)) * 0.85;
  p.view = { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, scale: clamp(sc, 256 * 4, 256 * 2 ** 18) };
  flash = { pid: p.id, until: performance.now() + 1800 };
  searchState.results = [];
  rememberMapView(p);
  commit();
  updateSidebar();
  requestRender();
}

/* ---------- Бічна панель ---------- */

const fmtNum = v => (Number.isInteger(v) ? String(v) : v.toFixed(1));
const tg = (id, label, on) => `<button type="button" class="tg${on ? ' on' : ''}" id="${id}" aria-pressed="${!!on}">${label}</button>`;
const seg = (name, opts, cur) =>
  opts.map(([v, label, title]) => `<button type="button" class="sg${String(v) === String(cur) ? ' on' : ''}" data-seg="${name}" data-v="${v}"${title ? ` title="${title}"` : ''}>${label}</button>`).join('');
const rangeRow = (id, label, min, max, step, val, suffix = '') =>
  `<label class="row"><span>${label}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output id="${id}-o">${fmtNum(+val)}${suffix}</output></label>`;
const numRow = (id, label, val, min, max, step) =>
  `<label class="row"><span>${label}</span><input class="num" type="number" id="${id}" value="${val}" min="${min}" max="${max}" step="${step}"></label>`;
const textRow = (id, label, val, maxlen, ph = '') =>
  `<label class="col"><span>${label}</span><input type="text" id="${id}" value="${esc(val)}" maxlength="${maxlen}" placeholder="${esc(ph)}"></label>`;
const CORNERS = [['tl', '↖', 'Угорі ліворуч'], ['tr', '↗', 'Угорі праворуч'], ['bl', '↙', 'Унизу ліворуч'], ['br', '↘', 'Унизу праворуч']];

function el(id) { return document.getElementById(id); }
function bindRange(id, set, doCommit = true, suffix = '') {
  const e = el(id);
  if (!e) return;
  const o = el(id + '-o');
  e.oninput = () => { set(+e.value); if (o) o.textContent = fmtNum(+e.value) + suffix; requestRender(); };
  e.onchange = () => { if (doCommit) commit(); };
}
function bindToggle(id, get, set, { doCommit = true, rebuild = false } = {}) {
  const e = el(id);
  if (!e) return;
  e.onclick = () => {
    set(!get());
    e.classList.toggle('on', !!get());
    e.setAttribute('aria-pressed', String(!!get()));
    requestRender();
    if (doCommit) commit();
    if (rebuild) updateSidebar();
  };
}
function bindSeg(name, fn) {
  $$(`[data-seg="${name}"]`, side).forEach(b => {
    b.onclick = () => {
      $$(`[data-seg="${name}"]`, side).forEach(x => x.classList.toggle('on', x === b));
      fn(b.dataset.v);
      requestRender();
    };
  });
}
function bindBtn(id, fn) {
  const e = el(id);
  if (e) e.onclick = fn;
}
function bindText(id, set) {
  const e = el(id);
  if (!e) return;
  e.oninput = () => { set(e.value); requestRender(); };
  e.onchange = () => commit();
}

let sidebarKey = '';
function updateSidebar() {
  if (!doc) return;
  // Прокрутку зберігаємо, лише коли оновлюється той самий об’єкт.
  const key = JSON.stringify(sel);
  const scroll = key === sidebarKey ? side.scrollTop : 0;
  sidebarKey = key;
  const a = selAnno(), l = selLink(), p = curPanel();
  let html = secStyle(a || l);
  if (a) html += secAnno(getPanel(sel.pid), a);
  else if (l) html += secLink();
  else if (p) html += secPanel(p);
  else html += secBoard();
  side.innerHTML = html;
  bindStyle(a || l);
  if (a) bindAnno(getPanel(sel.pid), a);
  else if (l) bindBtn('lnDel', deleteSel);
  else if (p) bindPanel(p);
  else bindBoard();
  $$('[data-copy]', side).forEach(b => (b.onclick = () => copyText(b.dataset.copy)));
  side.scrollTop = scroll;
}

function secStyle(t) {
  if (t && t.type === 'blur') return '';
  const s = t || style;
  const type = t && t.type;
  const hasWidth = !t || !['marker', 'text'].includes(type);
  const hasFs = !t || ['marker', 'text', 'ray', 'cone', 'line', 'arrow'].includes(type);
  const hasFill = !t || ['rect', 'ellipse', 'poly'].includes(type);
  const hasHalo = type !== 'marker';
  const fsLabel = type === 'marker' ? 'Розмір мітки' : type === 'text' ? 'Розмір тексту' : t ? 'Розмір підпису' : 'Мітки й текст';
  return `<section class="sec">
    <h3>${t ? 'Стиль виділеного' : 'Стиль розмітки'}</h3>
    <div class="swatches">${COLORS.map(([c, n]) => `<button type="button" class="sw${s.color.toLowerCase() === c ? ' on' : ''}" data-color="${c}" style="--c:${c}" title="${n}"></button>`).join('')}<label class="sw sw-custom" title="Свій колір"><input type="color" id="stColor" value="${s.color}"></label></div>
    ${hasWidth ? rangeRow('stWidth', 'Товщина', 1, 40, 1, s.width) : ''}
    ${hasFs ? rangeRow('stFs', fsLabel, 14, 160, 1, s.fs) : ''}
    <div class="tgs">${hasWidth ? tg('stDash', 'Пунктир', s.dash) : ''}${hasHalo ? tg('stHalo', 'Обвідка', s.halo) : ''}${hasFill ? tg('stFill', 'Заливка', s.fill) : ''}</div>
  </section>`;
}

function bindStyle(t) {
  const tgt = t || style;
  const apply = (k, v) => {
    tgt[k] = v;
    if (t) style[k] = v;
    if (textEdit) placeTextEditor();
    requestRender();
  };
  $$('.sw[data-color]', side).forEach(b => {
    b.onclick = () => {
      apply('color', b.dataset.color);
      $$('.sw[data-color]', side).forEach(x => x.classList.toggle('on', x === b));
      if (t) commit();
    };
  });
  const cc = el('stColor');
  if (cc) {
    cc.oninput = () => apply('color', cc.value);
    cc.onchange = () => { if (t) commit(); updateSidebar(); };
  }
  bindRange('stWidth', v => apply('width', v), !!t);
  bindRange('stFs', v => apply('fs', v), !!t);
  bindToggle('stDash', () => tgt.dash, v => apply('dash', v), { doCommit: !!t });
  bindToggle('stHalo', () => tgt.halo, v => apply('halo', v), { doCommit: !!t });
  bindToggle('stFill', () => tgt.fill, v => apply('fill', v), { doCommit: !!t });
}

function coordsKV(label, pt) {
  const c = fmtCoord(merc.lat(pt[1]), merc.lon(pt[0]));
  return `<div class="kv"><span>${label}</span><button type="button" class="copy" data-copy="${c}" title="Скопіювати">${c}</button></div>`;
}

function secAnno(p, a) {
  const isMap = p.type === 'map';
  let body = '';
  if (a.type === 'ray' || a.type === 'cone') {
    body += numRow('anAz', isMap ? 'Азимут, °' : 'Кут, °', bearing(...a.a, ...a.b).toFixed(1), 0, 360, 0.1);
    body += `<div class="tgs">${tg('anShowAz', isMap ? 'Підпис азимута' : 'Підпис кута', a.showAz)}</div>`;
  }
  if (a.type === 'cone') {
    body += rangeRow('anFov', 'Кут огляду', 5, 170, 1, a.fov, '°');
    if (isMap) body += numRow('anRange', 'Дальність, м', Math.round(worldDist(...a.a, ...a.b)), 1, 1e7, 1);
  }
  if (a.type === 'line' || a.type === 'arrow') {
    if (isMap) {
      body += `<div class="kv"><span>Довжина</span><b>${fmtDist(worldDist(...a.a, ...a.b))}</b></div>`;
      body += `<div class="kv"><span>Азимут</span><b>${fmtAz(bearing(...a.a, ...a.b))}</b></div>`;
    }
    body += `<div class="tgs">${tg('anArrow', 'Стрілка на кінці', a.type === 'arrow')}${isMap ? tg('anShowLen', 'Підпис довжини', a.showLen) : ''}</div>`;
  }
  if (a.type === 'poly') body += `<div class="tgs">${tg('anClosed', 'Замкнений контур', a.closed)}</div>`;
  if (a.type === 'marker') {
    body += textRow('anN', 'Номер або літера', a.n, 3);
    body += textRow('anLabel', 'Підпис біля мітки', a.label, 80, 'необов’язково');
    if (isMap) body += `<div class="btns"><button type="button" class="btn sm" id="anCoords">Підписати координатами</button></div>`;
  }
  if (a.type === 'text') {
    body += `<label class="col"><span>Текст</span><textarea id="anText" rows="3">${esc(a.text)}</textarea></label>`;
    body += `<div class="tgs">${tg('anBg', 'Темна плашка', a.bg)}</div>`;
  }
  if (a.type === 'blur') {
    body += `<div class="row"><span>Вигляд</span><div class="seg">${seg('anMode', [['blur', 'Розмиття'], ['pixel', 'Пікселі']], a.mode)}</div></div>`;
    body += rangeRow('anStr', 'Сила', 4, 60, 1, a.strength);
    body += `<p class="note">Пунктирна рамка видна лише тут, у файл вона не потрапляє.</p>`;
  }
  if (isMap && a.type === 'marker') body += coordsKV('Координати', a.p);
  if (isMap && (a.type === 'ray' || a.type === 'cone')) body += coordsKV('Точка зйомки', a.a);
  if (p.type === 'pano' && a.type === 'marker') {
    const az = fmtAz(panoAz(p, a.p[0]));
    body += `<div class="kv"><span>Азимут</span><button type="button" class="copy" data-copy="${az.replace('°', '')}" title="Скопіювати — можна вставити в азимут променя на карті">${az}</button></div>`;
    body += `<div class="kv"><span>Нахил</span><b>${a.p[1] >= 0 ? '+' : '−'}${Math.abs(a.p[1]).toFixed(1)}°</b></div>`;
    body += `<div class="btns"><button type="button" class="btn sm" id="anAzLabel">Підписати азимутом</button></div>`;
  }
  return `<section class="sec"><h3>${ANNO_NAMES[a.type]}</h3>${body}
    <div class="btns"><button type="button" class="btn sm" id="anDup" title="Ctrl+D">Дублювати</button><button type="button" class="btn sm danger" id="anDel" title="Delete">Видалити</button></div></section>`;
}

function bindAnno(p, a) {
  const az = el('anAz');
  if (az) {
    az.onchange = () => {
      setAz(a, ((+az.value % 360) + 360) % 360);
      commit();
      updateSidebar();
      requestRender();
    };
  }
  bindToggle('anShowAz', () => a.showAz, v => (a.showAz = v));
  bindRange('anFov', v => (a.fov = v), true, '°');
  const rg = el('anRange');
  if (rg) {
    rg.onchange = () => {
      const m = Math.max(1, +rg.value || 1), az0 = bearing(...a.a, ...a.b);
      const L = m / metersPerWorld(a.a[1]);
      a.b = [a.a[0] + L * Math.sin(az0 * DEG), a.a[1] - L * Math.cos(az0 * DEG)];
      commit();
      requestRender();
    };
  }
  bindToggle('anArrow', () => a.type === 'arrow', v => (a.type = v ? 'arrow' : 'line'), { rebuild: true });
  bindToggle('anShowLen', () => a.showLen, v => (a.showLen = v));
  bindToggle('anClosed', () => a.closed, v => (a.closed = v));
  bindText('anN', v => (a.n = v.trim()));
  bindText('anLabel', v => (a.label = v));
  bindBtn('anCoords', () => {
    a.label = fmtCoord(merc.lat(a.p[1]), merc.lon(a.p[0]));
    commit();
    updateSidebar();
    requestRender();
  });
  bindBtn('anAzLabel', () => {
    a.label = fmtAz(panoAz(p, a.p[0]));
    commit();
    updateSidebar();
    requestRender();
  });
  bindText('anText', v => (a.text = v));
  bindToggle('anBg', () => a.bg, v => (a.bg = v));
  bindSeg('anMode', v => { a.mode = v; commit(); });
  bindRange('anStr', v => (a.strength = v));
  bindBtn('anDup', duplicateSel);
  bindBtn('anDel', deleteSel);
}

function secLink() {
  return `<section class="sec"><h3>Зв’язок між панелями</h3>
    <p class="note">Кінці можна перетягнути на інші точки, зокрема в іншу панель. Кінець прив’язаний до вмісту: якщо зсунути кадр, зв’язок піде за об’єктом.</p>
    <div class="btns"><button type="button" class="btn sm danger" id="lnDel">Видалити</button></div></section>`;
}

function secPanel(p) {
  if (p.type === 'empty') {
    return `<section class="sec"><h3>Порожня панель</h3>
      <div class="big-btns">
        <button type="button" class="btn big" id="pnFillPhoto">${svgIcon('photo')}Фото, скриншот або панорама</button>
        <button type="button" class="btn big" id="pnFillMap">${svgIcon('map')}Супутникова карта</button>
      </div>
      <p class="note">Або перетягніть файл на панель, або вставте скриншот через Ctrl+V.</p>
    </section><section class="sec"><h3>Панель</h3>${panelCommon(p)}</section>`;
  }
  let html = '';
  if (p.type === 'image') {
    const as = ASSETS[p.asset];
    let info = '', pano = '';
    if (as && as.ready) {
      const up = p.view.scale;
      info = `<div class="kv"><span>Оригінал</span><b>${as.w} × ${as.h} px</b></div>`;
      if (up > 1.05) info += `<p class="note warn">Кадр збільшено в ${up.toFixed(1).replace('.', ',')} раза понад оригінал — у файлі він може вийти розмитим.</p>`;
      if (as.w / as.h >= 1.6) pano = `<div class="tgs">${tg('pnPano', 'Це сферична панорама', false)}</div>`;
    }
    html += `<section class="sec"><h3>Фото</h3>${info}
      <div class="btns"><button type="button" class="btn sm" id="pnCover">Заповнити рамку</button><button type="button" class="btn sm" id="pnContain">Вмістити цілим</button><button type="button" class="btn sm" id="pnReplace">Замінити…</button></div>
      ${pano}
      <p class="note">Кадрувати: інструмент «Кадр» (H) або подвійний клік по панелі. Коліщатко над панеллю — масштаб.</p></section>`;
  }
  if (p.type === 'pano') html += secPano(p);
  if (p.type === 'map') html += secMap(p);
  html += `<section class="sec"><h3>Панель</h3>${panelCommon(p)}</section>`;
  return html;
}

function secPano(p) {
  const as = ASSETS[p.asset];
  const az = panoAz(p, p.view.yaw);
  const span = as && as.ready ? panoSpan(p) : [360, 180];
  return `<section class="sec"><h3>Панорама 360°</h3>
    <div class="kv"><span>Напрямок кадру</span><b>${fmtAz(az)}${p.pano.north ? '' : ' від краю знімка'}</b></div>
    ${numRow('paNorth', 'Азимут центру кадру, °', az.toFixed(1), 0, 360, 0.1)}
    <p class="note">Наведіть кадр на орієнтир із відомим азимутом і впишіть цей азимут — далі мітки показуватимуть справжні напрямки, які можна перенести в промінь на карті.</p>
    ${rangeRow('paFov', 'Кут огляду', 12, 120, 1, Math.round(p.view.fov), '°')}
    <div class="btns"><button type="button" class="btn sm" id="paLevel">Вирівняти горизонт</button><button type="button" class="btn sm" id="pnReplace">Замінити…</button><button type="button" class="btn sm" id="paOff">Звичайне фото</button></div>
    <div class="kv"><span>Охоплення знімка</span><b>${Math.round(span[0])}° × ${Math.round(span[1])}°</b></div>
    <p class="note">Огляд крутять інструментом «Кадр» (H) або подвійним кліком по панелі, коліщатко — наближення.</p>
  </section>`;
}

function secMap(p) {
  const m = p.map, v = p.view, lat = merc.lat(v.cy), lon = merc.lon(v.cx), z = zoomOf(p);
  const src = MAP_SOURCES[m.source] || MAP_SOURCES.esri;
  const over = z > src.maxZ + 0.5 ? `<p class="note warn">Детальніших знімків у цього джерела немає — тайли розтягнуто. Спробуйте Google.</p>` : '';
  const alt = Math.round((metersPerWorld(v.cy) / v.scale) * p.h * 1.1);
  return `<section class="sec"><h3>Карта</h3>
    <form id="mSearch" class="search"><input id="mQ" type="search" placeholder="Координати або назва місця" value="${esc(searchState.q)}" autocomplete="off" spellcheck="false"><button type="submit" class="btn sm">Знайти</button></form>
    ${searchState.busy ? '<p class="note">Шукаю…</p>' : ''}${searchState.err ? `<p class="note err">${esc(searchState.err)}</p>` : ''}
    ${searchState.results.length ? `<ul class="results">${searchState.results.map((r, i) => `<li><button type="button" data-res="${i}">${esc(r.display_name)}</button></li>`).join('')}</ul>` : ''}
    <label class="row"><span>Підкладка</span><select id="mSrc">${Object.values(MAP_SOURCES).map(s => `<option value="${s.id}"${s.id === m.source ? ' selected' : ''}>${s.name}</option>`).join('')}</select></label>
    <div class="zoom-row"><button type="button" class="btn sm icon" id="mZo" title="Віддалити">−</button><span>масштаб ${z.toFixed(1)}</span><button type="button" class="btn sm icon" id="mZi" title="Наблизити">+</button></div>
    ${over}
    ${GLR.ok()
      ? `${rangeRow('mPitch', 'Нахил', 0, 65, 1, Math.round(p.view.pitch || 0), '°')}
         ${rangeRow('mBearing', 'Поворот', 0, 359, 1, Math.round(p.view.bearing || 0), '°')}
         ${p.view.pitch || p.view.bearing ? '<div class="btns"><button type="button" class="btn sm" id="mFlat">Північ угору, без нахилу</button></div>' : ''}
         <p class="note">Нахил ставить знімок у ракурс, близький до кадру з землі: розмітка лягає на саму землю, а промені сходяться до обрію.${p.view.pitch ? ' Лінійка масштабу дійсна для центру кадру.' : ''} Те саме мишею: Ctrl і тягнути в інструменті «Кадр».</p>`
      : '<p class="note warn">Нахил недоступний: браузер не дав WebGL.</p>'}
    ${src.baked
      ? '<p class="note">У цій підкладці назви намальовані просто на тайлах, тож окремо збільшити їх не можна — для великих підписів беріть супутник Esri або Google.</p>'
      : `<div class="row"><span>Підписи</span><div class="seg">${seg('mLabels', [['0', 'Нема'], ['1', '1×'], ['2', '2×'], ['4', '4×']], m.labels ? String(m.labelScale || 1) : '0')}</div></div>
         <p class="note">Назви й дороги — окремий шар поверх знімка. Розмір підпису зашитий у тайл і розрахований на екран, тож на полотні ${doc.board.w} px він дрібний: «2×» бере шар грубішим масштабом і робить написи вдвічі більшими, знімок при цьому лишається різким.</p>`}
    <div class="tgs">${tg('mScale', 'Лінійка масштабу', m.scaleBar)}${tg('mNorth', 'Північ', m.north)}${tg('mAttr', 'Джерело знімка', m.attr)}</div>
    <div class="kv"><span>Центр</span><button type="button" class="copy" data-copy="${fmtCoord(lat, lon)}" title="Скопіювати">${fmtCoord(lat, lon)}</button></div>
    <div class="links">
      <a class="ext" href="https://www.google.com/maps/@${lat.toFixed(6)},${lon.toFixed(6)},${Math.round(z)}z/data=!3m1!1e3" target="_blank" rel="noopener">Google Maps ↗</a>
      <a class="ext" href="https://earth.google.com/web/@${lat.toFixed(6)},${lon.toFixed(6)},0a,${alt}d,35y,0h,0t,0r" target="_blank" rel="noopener">Google Earth ↗</a>
      <a class="ext" href="https://yandex.com/maps/?ll=${lon.toFixed(6)},${lat.toFixed(6)}&amp;z=${Math.round(z)}&amp;l=sat" target="_blank" rel="noopener">Яндекс ↗</a>
    </div>
    <div class="links">
      <a class="ext" href="https://www.google.com/maps/@?api=1&amp;map_action=pano&amp;viewpoint=${lat.toFixed(6)},${lon.toFixed(6)}" target="_blank" rel="noopener">Street View тут ↗</a>
      <a class="ext" href="https://yandex.com/maps/?panorama%5Bpoint%5D=${lon.toFixed(6)},${lat.toFixed(6)}&amp;panorama%5Bdirection%5D=0,0" target="_blank" rel="noopener">Яндекс-панорами ↗</a>
    </div>
    <p class="note">Панораму з цих сервісів у файл не витягнути — наведіть потрібний ракурс там і зробіть знімок екрана: <kbd>Ctrl</kbd>+<kbd>V</kbd> вставить його сюди звичайним кадром. Власну сферичну панораму (2:1) додавайте файлом — вона сама стане панеллю 360°.</p>
  </section>`;
}

function panelCommon(p) {
  const c = p.caption;
  const content = p.type !== 'empty';
  return `
    ${content ? `<label class="col"><span>Підпис на панелі</span><input type="text" id="pnCap" value="${esc(c.text)}" placeholder="напр. «Кадр відео» чи «Супутник, 11.09.2026»"></label>
    <div class="row2"><div class="seg corners">${seg('pnCapPos', CORNERS, c.pos)}</div>${tg('pnCapAcc', 'Помаранчевий', c.accent)}</div>
    ${rangeRow('pnOp', 'Непрозорість', 5, 100, 1, Math.round((p.opacity ?? 1) * 100), '%')}` : ''}
    <div class="row"><span>Рамка</span><div class="seg">${seg('pnBorder', [['0', 'Нема'], ['#ffffff', 'Біла'], ['#2a2a2a', 'Темна'], ['#f24c06', 'Помар.']], p.border.w ? p.border.color : '0')}</div></div>
    ${p.border.w ? rangeRow('pnBw', 'Товщина рамки', 1, 40, 1, p.border.w) : ''}
    <div class="geom">${['x', 'y', 'w', 'h'].map(k => `<label><span>${{ x: 'X', y: 'Y', w: 'Ш', h: 'В' }[k]}</span><input type="number" id="pn_${k}" value="${Math.round(p[k])}"></label>`).join('')}</div>
    <div class="btns"><button type="button" class="btn sm" id="pnTop" title="Ctrl+Shift+]">Наверх</button><button type="button" class="btn sm" id="pnBottom" title="Ctrl+Shift+[">Донизу</button><button type="button" class="btn sm" id="pnDup" title="Ctrl+D">Дублювати</button></div>
    <div class="btns">${content ? '<button type="button" class="btn sm" id="pnClear">Очистити</button>' : ''}<button type="button" class="btn sm danger" id="pnDel" title="Delete">Видалити панель</button></div>`;
}

function bindPanel(p) {
  bindBtn('pnFillPhoto', () => pickImages({ pid: p.id }));
  bindBtn('pnFillMap', addMap);
  bindBtn('pnCover', () => { fitView(p, 'cover'); commit(); updateSidebar(); requestRender(); });
  bindBtn('pnContain', () => { fitView(p, 'contain'); commit(); updateSidebar(); requestRender(); });
  bindBtn('pnReplace', () => pickImages({ pid: p.id, replace: true }));
  bindBtn('pnPano', () => { setPanoMode(p, true); commit(); updateSidebar(); requestRender(); });

  if (p.type === 'pano') {
    const north = el('paNorth');
    north.onchange = () => {
      p.pano.north = (((+north.value - p.view.yaw) % 360) + 360) % 360;
      commit();
      updateSidebar();
      requestRender();
    };
    bindRange('paFov', v => (p.view.fov = v), true, '°');
    bindBtn('paLevel', () => { p.view.pitch = 0; commit(); requestRender(); });
    bindBtn('paOff', () => { setPanoMode(p, false); commit(); updateSidebar(); requestRender(); });
  }

  if (p.type === 'map') {
    const f = el('mSearch');
    f.onsubmit = e => { e.preventDefault(); runSearch(p, el('mQ').value); };
    el('mQ').oninput = e => (searchState.q = e.target.value);
    $$('[data-res]', side).forEach(b => (b.onclick = () => pickResult(p, searchState.results[+b.dataset.res])));
    el('mSrc').onchange = e => { p.map.source = e.target.value; rememberMapView(p); commit(); updateSidebar(); requestRender(); };
    const zoomBy = d => {
      zoomContent(p, p.x + p.w / 2, p.y + p.h / 2, 2 ** d);
      commit();
      rememberMapView(p);
      updateSidebar();
      requestRender();
    };
    bindBtn('mZo', () => zoomBy(-1));
    bindBtn('mZi', () => zoomBy(1));
    bindRange('mPitch', v => (p.view.pitch = v), true, '°');
    bindRange('mBearing', v => (p.view.bearing = v), true, '°');
    bindBtn('mFlat', () => {
      p.view.pitch = 0;
      p.view.bearing = 0;
      commit();
      updateSidebar();
      requestRender();
    });
    bindSeg('mLabels', v => {
      const n = +v;
      p.map.labels = n > 0;
      if (n > 0) p.map.labelScale = n;
      commit();
      updateSidebar();
    });
    bindToggle('mScale', () => p.map.scaleBar, v => (p.map.scaleBar = v));
    bindToggle('mNorth', () => p.map.north, v => (p.map.north = v));
    bindToggle('mAttr', () => p.map.attr, v => (p.map.attr = v));
  }

  bindText('pnCap', v => (p.caption.text = v));
  bindSeg('pnCapPos', v => { p.caption.pos = v; commit(); });
  bindToggle('pnCapAcc', () => p.caption.accent, v => (p.caption.accent = v));
  bindRange('pnOp', v => (p.opacity = v / 100), true, '%');
  bindSeg('pnBorder', v => {
    if (v === '0') p.border.w = 0;
    else {
      p.border.color = v;
      if (!p.border.w) p.border.w = Math.max(2, Math.round(8 * unitOf(doc)));
    }
    commit();
    updateSidebar();
  });
  bindRange('pnBw', v => (p.border.w = v));
  for (const k of ['x', 'y', 'w', 'h']) {
    const e = el('pn_' + k);
    if (!e) continue;
    e.onchange = () => {
      const r = { x: p.x, y: p.y, w: p.w, h: p.h, [k]: +e.value || 0 };
      setPanelRect(p, r);
      doc.layout = null;
      commit();
      updateSidebar();
      requestRender();
    };
  }
  bindBtn('pnTop', () => reorder('top'));
  bindBtn('pnBottom', () => reorder('bottom'));
  bindBtn('pnDup', duplicateSel);
  bindBtn('pnClear', () => { clearPanel(p); commit(); updateSidebar(); requestRender(); });
  bindBtn('pnDel', deleteSel);
}

function layoutIcon(L) {
  const S = 36, g = 3;
  return `<svg viewBox="0 0 ${S} ${S}" aria-hidden="true">${L.cells
    .map(([x, y, w, h]) => `<rect x="${x * S + g / 2}" y="${y * S + g / 2}" width="${w * S - g}" height="${h * S - g}" rx="1.5"/>`)
    .join('')}</svg>`;
}

// Який пресет тега показувати вибраним; «Свій» лишається вибраним, поки з нього не пішли.
let wmCustomTag = false;
function wmTagKind(wm) {
  if (wmCustomTag) return 'custom';
  if (!wm.tag) return '';
  const preset = Object.entries(WM_TAGS).find(([, t]) => t === wm.tag);
  return preset ? preset[0] : 'custom';
}

function secBoard() {
  const B = doc.board, wm = doc.wm;
  return `<section class="sec"><h3>Макет</h3>
      <div class="layouts">${LAYOUTS.map(L => `<button type="button" class="lay${doc.layout === L.id ? ' on' : ''}" data-lay="${L.id}" title="${L.name}">${layoutIcon(L)}</button>`).join('')}</div>
      <p class="note">Макет розкладає наявні панелі по комірках і додає порожні, якщо їх бракує.</p>
      ${rangeRow('bdMargin', 'Поля', 0, 200, 1, B.margin)}
      ${rangeRow('bdGap', 'Проміжки', 0, 200, 1, B.gap)}
      ${rangeRow('bdRadius', 'Заокруглення', 0, 80, 1, B.radius)}
    </section>
    <section class="sec"><h3>Полотно</h3>
      <div class="presets seg wrap">${BOARD_PRESETS.map(pr => `<button type="button" class="sg${pr.w === B.w && pr.h === B.h ? ' on' : ''}" data-preset="${pr.id}" title="${pr.w} × ${pr.h}">${pr.id}</button>`).join('')}</div>
      <div class="geom two"><label><span>Ширина, px</span><input type="number" id="bdW" value="${B.w}" min="200" max="8000"></label><label><span>Висота, px</span><input type="number" id="bdH" value="${B.h}" min="200" max="8000"></label></div>
      <div class="row"><span>Тло</span><div class="swatches">${BG_COLORS.map(([c, n]) => `<button type="button" class="sw${B.bg === c ? ' on' : ''}" data-bg="${c}" style="--c:${c}" title="${n}"></button>`).join('')}</div></div>
    </section>
    <section class="sec"><h3>Вотермарка</h3>
      <div class="tgs">${tg('wmOn', 'Показувати', wm.on)}</div>
      <div class="row"><span>Тег</span><div class="seg">${seg('wmTag', [['tg', 'Telegram'], ['x', 'X'], ['custom', 'Свій'], ['', 'Нема']], wmTagKind(wm))}</div></div>
      ${wmTagKind(wm) === 'custom' ? textRow('wmTagText', 'Свій тег', wm.tag, 40, '@…') : `<p class="note">${wm.tag ? `У плашці: <b>${esc(wm.tag)}</b>` : 'Плашка буде тільки з назвою PLITKA.'}</p>`}
      <div class="row"><span>Тема</span><div class="seg">${seg('wmTheme', [['dark', 'Темна'], ['light', 'Світла']], wm.theme)}</div></div>
      <div class="row"><span>Кут</span><div class="seg corners">${seg('wmCorner', CORNERS, wm.corner || '')}</div></div>
      ${rangeRow('wmH', 'Розмір', 30, 240, 1, wm.h)}
      ${rangeRow('wmOp', 'Непрозорість', 20, 100, 1, Math.round((wm.opacity ?? 1) * 100), '%')}
      <p class="note">Плашку можна перетягнути мишею куди завгодно.</p>
    </section>`;
}

function bindBoard() {
  const B = doc.board, wm = doc.wm;
  $$('[data-lay]', side).forEach(b => {
    b.onclick = () => {
      applyLayout(doc, b.dataset.lay);
      commit();
      updateSidebar();
      requestRender();
    };
  });
  const relayout = () => { if (doc.layout) applyLayout(doc, doc.layout); };
  bindRange('bdMargin', v => { B.margin = v; relayout(); });
  bindRange('bdGap', v => { B.gap = v; relayout(); });
  bindRange('bdRadius', v => (B.radius = v));
  $$('[data-preset]', side).forEach(b => {
    b.onclick = () => {
      const pr = BOARD_PRESETS.find(x => x.id === b.dataset.preset);
      setBoardSize(pr.w, pr.h);
      commit();
      fitBoard();
      updateSidebar();
    };
  });
  for (const id of ['bdW', 'bdH']) {
    el(id).onchange = () => {
      setBoardSize(+el('bdW').value, +el('bdH').value);
      commit();
      fitBoard();
      updateSidebar();
    };
  }
  $$('[data-bg]', side).forEach(b => {
    b.onclick = () => {
      B.bg = b.dataset.bg;
      $$('[data-bg]', side).forEach(x => x.classList.toggle('on', x === b));
      commit();
      requestRender();
    };
  });
  bindToggle('wmOn', () => wm.on, v => (wm.on = v));
  bindSeg('wmTag', v => {
    wmCustomTag = v === 'custom';
    if (v !== 'custom') wm.tag = WM_TAGS[v] || '';
    commit();
    updateSidebar();
  });
  bindText('wmTagText', v => (wm.tag = v.trim()));
  bindSeg('wmTheme', v => { wm.theme = v; commit(); });
  bindSeg('wmCorner', v => { wm.corner = v; commit(); });
  bindRange('wmH', v => (wm.h = v));
  bindRange('wmOp', v => (wm.opacity = v / 100), true, '%');
}

/* ---------- Експорт і проєкти ---------- */

async function renderExport(scale) {
  try { await document.fonts.ready; } catch { /* шрифти вже є або недоступні */ }
  const B = doc.board;
  const c = document.createElement('canvas');
  c.width = Math.round(B.w * scale);
  c.height = Math.round(B.h * scale);
  const x = c.getContext('2d');
  const t0 = performance.now();
  for (let i = 0; i < 40; i++) {
    const pending = [];
    x.setTransform(scale, 0, 0, scale, 0, 0);
    drawBoard(x, doc, { k: scale, tileK: scale, editor: false, pending, ui: 1 });
    if (!pending.length) break;
    if (performance.now() - t0 > 25000) {
      toast('Частина тайлів карти так і не завантажилась — у файлі там буде менш чітка підкладка.', 5000);
      break;
    }
    await Promise.race([Promise.all(pending.map(t => t.done)), new Promise(r => setTimeout(r, 5000))]);
  }
  return c;
}

const toBlob = (c, type, q) => new Promise((res, rej) => c.toBlob(b => (b ? res(b) : rej(new Error('браузер не віддав зображення'))), type, q));

function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function setBusy(on, text) {
  $('#busy').hidden = !on;
  if (text) $('#busyText').textContent = text;
}

function emptyWarning() {
  const n = doc.panels.filter(p => p.type === 'empty').length;
  return n ? ` Порожні панелі (${n}) у файл не потрапили.` : '';
}

async function exportImage() {
  commit();
  const fmt = $('#exFmt').value, scale = +$('#exScale').value;
  setBusy(true, 'Готую зображення…');
  try {
    const c = await renderExport(scale);
    const blob = await toBlob(c, fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.92);
    download(blob, `${slugify($('#exName').value)}.${fmt}`);
    toast(`Збережено ${c.width} × ${c.height} px.${emptyWarning()}`, 4500);
  } catch (err) {
    console.error(err);
    toast(`Не вдалося зберегти зображення: ${err.message || err}`, 6000);
  } finally {
    setBusy(false);
  }
}

async function copyImage() {
  commit();
  setBusy(true, 'Копіюю…');
  try {
    const blob = renderExport(+$('#exScale').value).then(c => toBlob(c, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    toast(`Скопійовано в буфер обміну — можна вставляти в Telegram чи X.${emptyWarning()}`, 4500);
  } catch (err) {
    console.error(err);
    toast('Браузер не дав записати зображення в буфер. Скористайтеся кнопкою «Зберегти».', 5000);
  } finally {
    setBusy(false);
  }
}

function saveProject() {
  commit();
  const assets = {};
  for (const id of usedAssets(doc)) if (ASSETS[id]) assets[id] = ASSETS[id].src;
  const data = JSON.stringify({ app: 'plitka-geokolazh', v: 1, doc, assets });
  download(new Blob([data], { type: 'application/json' }), `${slugify($('#exName').value)}.geokolazh.json`);
  toast('Проєкт збережено у файл — його можна відкрити тут пізніше або передати колезі.', 4000);
}

async function openProjectFile(f) {
  setBusy(true, 'Відкриваю проєкт…');
  try {
    const data = JSON.parse(await f.text());
    if (data.app !== 'plitka-geokolazh' || !data.doc) throw new Error('це не файл геоколажу');
    await Promise.all(Object.entries(data.assets || {}).map(([id, src]) => addAsset(src, id)));
    doc = migrate(data.doc);
    sel = null;
    draft = null;
    resetHistory();
    scheduleSave();
    fitBoard();
    updateSidebar();
    const base = f.name.replace(/\.geokolazh\.json$|\.json$/i, '');
    if (base) $('#exName').value = slugify(base);
    toast('Проєкт відкрито');
  } catch (err) {
    toast(`Не вдалося відкрити проєкт: ${err.message || err}`, 5000);
  } finally {
    setBusy(false);
  }
}

async function newProject() {
  if (!confirm('Почати новий колаж? Поточний зникне з автозбереження. Якщо він ще потрібен — спершу «Зберегти проєкт».')) return;
  doc = newDoc();
  sel = null;
  draft = null;
  try {
    await idb.clear();
    savedAssets.clear();
  } catch { /* автозбереження недоступне */ }
  resetHistory();
  scheduleSave();
  fitBoard();
  updateSidebar();
}

/* ---------- Клавіатура, буфер, перетягування ---------- */

function isTyping(t) {
  if (!t) return false;
  if (t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable) return true;
  return t.tagName === 'INPUT' && !['range', 'checkbox', 'button', 'radio', 'color'].includes(t.type);
}

window.addEventListener('keydown', e => {
  if (!doc || isTyping(e.target)) return;
  if (!$('#help').hidden) {
    if (e.key === 'Escape' || e.key === '?') $('#help').hidden = true;
    return;
  }
  if (e.target.type === 'range' && e.key.startsWith('Arrow')) return;
  const mod = e.ctrlKey || e.metaKey;
  if (e.code === 'Space') {
    e.preventDefault();
    if (!spaceDown) { spaceDown = true; if (!drag) canvas.style.cursor = 'grab'; }
    return;
  }
  if (mod) {
    const act = {
      KeyZ: () => (e.shiftKey ? redo() : undo()),
      KeyY: redo,
      KeyD: duplicateSel,
      KeyS: saveProject,
      KeyE: exportImage,
      Digit0: fitBoard,
      BracketRight: () => reorder(e.shiftKey ? 'top' : 'up'),
      BracketLeft: () => reorder(e.shiftKey ? 'bottom' : 'down'),
    }[e.code];
    if (act) { e.preventDefault(); act(); }
    return;
  }
  if (e.key === 'Escape') {
    if (draft) draft = null;
    else if (tool !== 'select') setTool('select');
    else setSel(null);
    requestRender();
    return;
  }
  if (e.key === 'Enter' && draft && draft.k === 'anno' && draft.anno.type === 'poly') { finishPoly(); return; }
  if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteSel(); return; }
  if (e.key.startsWith('Arrow')) {
    e.preventDefault();
    const s = e.shiftKey ? 10 : 1;
    nudge(e.key === 'ArrowLeft' ? -s : e.key === 'ArrowRight' ? s : 0, e.key === 'ArrowUp' ? -s : e.key === 'ArrowDown' ? s : 0);
    return;
  }
  if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) { $('#help').hidden = false; return; }
  if (e.key === '+' || e.key === '=' || e.code === 'NumpadAdd') { const r = wrap.getBoundingClientRect(); zoomWorkspace(1.25, r.width / 2, r.height / 2); return; }
  if (e.key === '-' || e.code === 'NumpadSubtract') { const r = wrap.getBoundingClientRect(); zoomWorkspace(0.8, r.width / 2, r.height / 2); return; }
  if (e.altKey) return;
  const t = Object.keys(TOOLS).find(k => TOOLS[k].code === e.code);
  if (t) setTool(t);
});
window.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    spaceDown = false;
    if (!drag) canvas.style.cursor = '';
  }
});
window.addEventListener('blur', () => (spaceDown = false));
// Enter у полі праворуч застосовує значення й повертає гарячі клавіші полотну; пошук на карті лишає фокус.
side.addEventListener('keydown', e => {
  const t = e.target;
  if (t.tagName !== 'INPUT' || t.type === 'search') return;
  if (e.key === 'Enter' || e.key === 'Escape') t.blur();
});
// Кнопки не тримають фокус, щоб пробіл і стрілки працювали з полотном.
document.addEventListener('pointerup', () => {
  const a = document.activeElement;
  if (a && a.tagName === 'BUTTON') a.blur();
});

document.addEventListener('paste', async e => {
  if (!doc || e.target === ta) return;
  const items = [...((e.clipboardData && e.clipboardData.items) || [])];
  const files = items.filter(i => i.kind === 'file' && /^image\//.test(i.type)).map(i => i.getAsFile()).filter(Boolean);
  // Скриншот вставляємо, навіть якщо фокус у текстовому полі — туди картинка однаково не піде.
  if (!files.length && isTyping(e.target)) return;
  if (files.length) {
    e.preventDefault();
    const cp = curPanel();
    await addImageFiles(files, { target: cp && cp.type === 'empty' ? cp : firstEmpty(), chain: true });
    return;
  }
  const text = e.clipboardData && e.clipboardData.getData('text/plain');
  const c = parseCoords(text);
  const p = curPanel();
  if (c && p && p.type === 'map') {
    e.preventDefault();
    searchState.q = text.trim();
    centerMap(p, c.lat, c.lon, Math.max(16, zoomOf(p)));
    commit();
    updateSidebar();
  } else if (c) {
    toast('Щоб перейти до координат, спершу виберіть панель із картою');
  }
});

wrap.addEventListener('dragover', e => {
  e.preventDefault();
  wrap.classList.add('drop');
});
wrap.addEventListener('dragleave', e => {
  if (!wrap.contains(e.relatedTarget)) wrap.classList.remove('drop');
});
wrap.addEventListener('drop', async e => {
  e.preventDefault();
  wrap.classList.remove('drop');
  const files = [...e.dataTransfer.files];
  const proj = files.find(f => /\.json$/i.test(f.name));
  if (proj) { openProjectFile(proj); return; }
  const imgs = files.filter(f => /^image\//.test(f.type));
  if (!imgs.length) { toast('Сюди можна перетягнути фото, скриншот або файл проєкту'); return; }
  const { bx, by } = evPos(e);
  const p = panelAt(bx, by);
  await addImageFiles(imgs, { target: p && p.type === 'empty' ? p : null, at: [bx, by], chain: !!(p && p.type === 'empty') });
});

/* ---------- Верхня панель ---------- */

function buildToolbar() {
  const nav = $('#tools');
  nav.innerHTML = TOOL_GROUPS.map(g =>
    g.map(t => `<button type="button" class="tool" data-tool="${t}" aria-label="${TOOLS[t].name}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[t]}</svg><span class="tip">${TOOLS[t].name}<kbd>${TOOLS[t].key}</kbd></span></button>`).join('')
  ).join('<hr>');
  nav.onclick = e => {
    const b = e.target.closest('.tool');
    if (b) setTool(b.dataset.tool);
  };
}

function bindTopbar() {
  $('#addPhoto').onclick = () => {
    const cp = curPanel();
    const target = cp && cp.type === 'empty' ? cp : firstEmpty();
    pickImages({ pid: target && target.id });
  };
  $('#addPano').onclick = () => {
    const cp = curPanel();
    pickImages(cp && cp.type === 'empty' ? { pid: cp.id } : { pano: true });
  };
  $('#addMap').onclick = addMap;
  $('#undo').onclick = undo;
  $('#redo').onclick = redo;
  $('#zFit').onclick = fitBoard;
  $('#zIn').onclick = () => { const r = wrap.getBoundingClientRect(); zoomWorkspace(1.25, r.width / 2, r.height / 2); };
  $('#zOut').onclick = () => { const r = wrap.getBoundingClientRect(); zoomWorkspace(0.8, r.width / 2, r.height / 2); };
  const menuList = $('#projMenu .menu-list'), menuBtn = $('#pMenuBtn');
  const setMenu = open => {
    menuList.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.onclick = () => setMenu(menuList.hidden);
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#projMenu')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  menuList.addEventListener('click', () => setMenu(false));
  $('#pNew').onclick = newProject;
  $('#pOpen').onclick = () => { const i = $('#fileProj'); i.value = ''; i.click(); };
  $('#fileProj').onchange = e => { const f = e.target.files[0]; if (f) openProjectFile(f); };
  $('#pSave').onclick = saveProject;
  $('#exSave').onclick = exportImage;
  $('#exCopy').onclick = copyImage;
  $('#exFmt').onchange = e => ($('#exSave').textContent = `Зберегти ${e.target.value.toUpperCase()}`);
  $('#exName').onchange = e => (e.target.value = slugify(e.target.value));
  $('#helpBtn').onclick = () => ($('#help').hidden = false);
  $('#help').onclick = e => { if (e.target.id === 'help' || e.target.closest('[data-close]')) $('#help').hidden = true; };
}

let toastTimer = null;
function toast(msg, ms = 3200) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* ---------- Старт ---------- */

async function init() {
  buildToolbar();
  bindTopbar();
  const restored = await loadSaved();
  if (!restored) doc = newDoc();
  resetHistory();
  $('#exName').value = `geolocation-${new Date().toISOString().slice(0, 10)}`;
  setTool('select');
  updateSidebar();
  fitBoard();
  new ResizeObserver(() => { requestRender(); if (textEdit) placeTextEditor(); }).observe(wrap);
  Promise.all(['400', '500', '700', '800'].map(w => document.fonts.load(`${w} 40px Inter`))).then(requestRender, () => {});
  if (restored) toast('Відновлено колаж із попередньої сесії');
  $('#stSave').textContent = restored ? 'Збережено в браузері' : '';
}

init();
