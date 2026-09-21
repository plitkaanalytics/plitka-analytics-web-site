'use strict';
/* Геоколаж PLITKA — утиліти: геодезія, координати, тайли карт, сховище. */
/* eslint-disable @typescript-eslint/no-unused-vars -- функції спільні для скриптів сторінки, їх кличе app.js */

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const EARTH_C = 40075016.686;
const EARTH_R = 6371008.8;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uid = () => Math.random().toString(36).slice(2, 10);
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const clone = o => JSON.parse(JSON.stringify(o));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Web Mercator: світові координати в [0, 1) ---------- */

const merc = {
  x: lon => (lon + 180) / 360,
  y: lat => {
    const s = Math.sin(clamp(lat, -85.05112878, 85.05112878) * DEG);
    return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
  },
  lon: x => x * 360 - 180,
  lat: y => Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) / DEG,
};

function haversine(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * DEG, dLon = (lon2 - lon1) * DEG;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * DEG) * Math.cos(lat2 * DEG) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Відстань у метрах між двома світовими точками. */
function worldDist(u1, v1, u2, v2) {
  return haversine(merc.lat(v1), merc.lon(u1), merc.lat(v2), merc.lon(u2));
}

/** Скільки метрів в одній світовій одиниці на світовій широті v. */
function metersPerWorld(v) {
  return EARTH_C * Math.cos(merc.lat(v) * DEG);
}

/** Азимут відрізка: 0° — північ (вгору), за годинниковою стрілкою. */
function bearing(x1, y1, x2, y2) {
  return (Math.atan2(x2 - x1, -(y2 - y1)) / DEG + 360) % 360;
}

function fmtDist(m) {
  if (m < 1000) return `${Math.round(m)} м`;
  const km = m / 1000;
  return `${km.toFixed(km < 10 ? 2 : km < 100 ? 1 : 0).replace('.', ',')} км`;
}
const fmtCoord = (lat, lon, d = 5) => `${lat.toFixed(d)}, ${lon.toFixed(d)}`;
const fmtAz = a => `${Math.round(a) % 360}°`;

/**
 * Розбирає координати в будь-якому звичному вигляді:
 * «44.7072, 37.7798», «44,7072 37,7798», «44°42'26"N 37°46'47"E»,
 * посилання Google Maps з @lat,lon або ?q=lat,lon.
 */
function parseCoords(input) {
  const s = String(input || '').trim();
  if (!s) return null;
  const ok = (lat, lon) =>
    Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? { lat, lon } : null;

  let m = s.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
  if (m) return ok(+m[1], +m[2]);
  m = s.match(/[?&](?:q|ll|query|center|destination)=(-?\d+(?:\.\d+)?)(?:,|%2C)\s*(-?\d+(?:\.\d+)?)/i);
  if (m) return ok(+m[1], +m[2]);

  if (/[°º]/.test(s)) {
    const re = /(-?\d+(?:[.,]\d+)?)\s*[°º]\s*(?:(\d+(?:[.,]\d+)?)\s*['′’]\s*)?(?:(\d+(?:[.,]\d+)?)\s*(?:["″”]|''))?\s*([NSEWnsew])?/g;
    const parts = [...s.matchAll(re)];
    if (parts.length >= 2) {
      const f = x => (x ? parseFloat(x.replace(',', '.')) : 0);
      const val = p => {
        let v = Math.abs(f(p[1])) + f(p[2]) / 60 + f(p[3]) / 3600;
        const hs = (p[4] || '').toUpperCase();
        if (p[1].startsWith('-') || hs === 'S' || hs === 'W') v = -v;
        return { v, hs };
      };
      let a = val(parts[0]), b = val(parts[1]);
      if (a.hs === 'E' || a.hs === 'W' || b.hs === 'N' || b.hs === 'S') [a, b] = [b, a];
      return ok(a.v, b.v);
    }
    return null;
  }

  if (!/^[\s\d.,;+\-NSEWnsew]+$/.test(s)) return null;
  const nums = s.includes('.')
    ? s.match(/[-+]?\d+(?:\.\d+)?/g)
    : (s.match(/[-+]?\d+(?:,\d+)?/g) || []).map(x => x.replace(',', '.'));
  if (!nums || nums.length !== 2) return null;
  let lat = parseFloat(nums[0]), lon = parseFloat(nums[1]);
  const letters = s.toUpperCase().match(/[NSEW]/g) || [];
  if (letters[0] === 'E' || letters[0] === 'W') [lat, lon] = [lon, lat];
  if (letters.includes('S')) lat = -Math.abs(lat);
  if (letters.includes('W')) lon = -Math.abs(lon);
  return ok(lat, lon);
}

/* ---------- Імена файлів: латиницею, без пробілів ---------- */

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'i',
  й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh',
  ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'iu', я: 'ia', ё: 'e', ы: 'y', э: 'e', ъ: '', '’': '', "'": '',
};
function slugify(s) {
  return (
    String(s || '')
      .toLowerCase()
      .split('')
      .map(c => TRANSLIT[c] ?? c)
      .join('')
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '') || 'geolocation'
  );
}

/* ---------- Тайлові джерела ---------- */

const gTile = lyrs => (z, x, y) => `https://mt${(x + y) % 4}.google.com/vt/lyrs=${lyrs}&x=${x}&y=${y}&z=${z}`;
const esriTile = svc => (z, x, y) => `https://server.arcgisonline.com/ArcGIS/rest/services/${svc}/MapServer/tile/${z}/${y}/${x}`;

/* Назви й дороги йдуть окремим прозорим шаром поверх знімка. Так їх можна брати
   грубішим масштабом — підписи стають більші, а сам знімок лишається різким.
   Google віддає цей шар удвічі щільнішим (scale=2), тому збільшені підписи не мутніють. */
const LABEL_LAYERS = {
  esri: [
    { id: 'esri-roads', maxZ: 19, url: esriTile('Reference/World_Transportation') },
    { id: 'esri-places', maxZ: 19, url: esriTile('Reference/World_Boundaries_and_Places') },
  ],
  google: [{ id: 'g-labels', maxZ: 21, url: (z, x, y) => `https://mt${(x + y) % 4}.google.com/vt/lyrs=h&x=${x}&y=${y}&z=${z}&scale=2` }],
};

/* Тайли openstreetmap.org тут не використовуємо: це волонтерські сервери для самого сайту OSM,
   і їхні умови забороняють такі застосунки — замість знімка вони віддають картинку «Access blocked».
   Дані OSM усе одно присутні — у схемі Esri, зібраній зокрема з них. */
const MAP_SOURCES = {
  esri: { name: 'Esri — супутник', maxZ: 19, attr: 'Знімок: Esri, Maxar, Earthstar Geographics', url: esriTile('World_Imagery'), labels: LABEL_LAYERS.esri },
  google: { name: 'Google — супутник', maxZ: 21, attr: 'Знімок: Google', url: gTile('s'), labels: LABEL_LAYERS.google },
  gmap: { name: 'Google — схема', maxZ: 21, attr: 'Дані: Google', url: gTile('m'), baked: true },
  street: { name: 'Esri — схема', maxZ: 19, attr: 'Карта: Esri, HERE, Garmin, © учасники OpenStreetMap', url: esriTile('World_Street_Map'), baked: true },
  topo: { name: 'Esri — топографічна', maxZ: 19, attr: 'Карта: Esri, HERE, Garmin, USGS, GEBCO', url: esriTile('World_Topo_Map'), baked: true },
};
for (const [id, s] of Object.entries(MAP_SOURCES)) s.id = id;

/* Кеш тайлів з LRU-витісненням. Кожен тайл вантажиться з CORS, щоб полотно не «забруднювалось» і експорт працював. */
const TILES = new Map();
const TILE_CACHE_MAX = 1800;
let onTileSettled = () => {};

function requestTile(layer, z, x, y) {
  const key = `${layer.id}/${z}/${x}/${y}`;
  let t = TILES.get(key);
  if (t) {
    TILES.delete(key);
    TILES.set(key, t);
    return t;
  }
  const img = new Image();
  t = { state: 0, img };
  t.done = new Promise(res => {
    img.onload = () => { t.state = 1; res(); onTileSettled(); };
    img.onerror = () => { t.state = 2; res(); onTileSettled(); };
  });
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';
  img.src = layer.url(z, x, y);
  TILES.set(key, t);
  if (TILES.size > TILE_CACHE_MAX) {
    for (const [k, v] of TILES) {
      if (TILES.size <= TILE_CACHE_MAX - 200) break;
      if (v.state !== 0) TILES.delete(k);
    }
  }
  return t;
}

function peekTile(layer, z, x, y) {
  const t = TILES.get(`${layer.id}/${z}/${x}/${y}`);
  return t && t.state === 1 ? t : null;
}

/* ---------- IndexedDB: автозбереження роботи між сесіями ---------- */

const idb = (() => {
  let dbp = null;
  const open = () =>
    (dbp ||= new Promise((res, rej) => {
      const r = indexedDB.open('plitka-geokolazh', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
  const tx = async (mode, fn) => {
    const db = await open();
    return new Promise((res, rej) => {
      const t = db.transaction('kv', mode);
      const req = fn(t.objectStore('kv'));
      t.oncomplete = () => res(req ? req.result : undefined);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  };
  return {
    get: k => tx('readonly', s => s.get(k)),
    set: (k, v) => tx('readwrite', s => { s.put(v, k); }),
    clear: () => tx('readwrite', s => { s.clear(); }),
  };
})();

/* ---------- Геометрія ---------- */

function segDist(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  let t = l2 ? ((px - x1) * dx + (py - y1) * dy) / l2 : 0;
  t = clamp(t, 0, 1);
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function pointInPoly(px, py, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Спрощення ламаної (Рамер — Дуглас — Пекер) для ліній від руки. */
function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  let idx = -1, dmax = 0;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  for (let i = 1; i < pts.length - 1; i++) {
    const d = segDist(pts[i][0], pts[i][1], a[0], a[1], b[0], b[1]);
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax <= eps) return [a, b];
  return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
}

/* ---------- Кольори ---------- */

function hexRgb(hex) {
  const c = parseInt(hex.slice(1), 16);
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
}
function isDark(hex) {
  const [r, g, b] = hexRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 120;
}
function rgba(hex, a) {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
const haloColor = hex => (isDark(hex) ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.55)');
