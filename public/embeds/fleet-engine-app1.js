// ─────────────────────────────────────────────────────────────────
// PLITKA Analytics — Interactive Timeline
// Дані: data.js (const DATA)
// ─────────────────────────────────────────────────────────────────

// Locale — set window.FLEET_LOCALE before loading this script to override.
const _L = window.FLEET_LOCALE || {};

// ── Constants ────────────────────────────────────────────────────
// Time range auto-derived from DATA, with war start as the floor.
// Adding new events/positions to data.js automatically extends the timeline.
function _computeTimeRange() {
  let max = -Infinity;
  const consider = (s) => {
    const t = +new Date(s + 'T12:00:00Z');
    if (isFinite(t) && t > max) max = t;
  };
  DATA.positions.forEach(p => { consider(p.from); consider(p.to); });
  DATA.events.forEach(e => { consider(e.date); });
  const start = new Date('2022-02-01T00:00:00Z');
  const end   = new Date(max + 30 * 86400000); // +1 month buffer
  return { start, end };
}
const _TR    = _computeTimeRange();
const T_START = _TR.start;
const T_END   = _TR.end;
const T_SPAN  = T_END - T_START;

const TYPE_COLORS = {
  position:        '#5C6B7A',
  transit:         '#1F4E78',
  strike_outgoing: '#8C2D04',
  strike_incoming: '#C8102E',
  incident:        '#B58900',
  command:         '#2E7D32',
  operation:       '#1F4E78',
  context:         '#5C6B7A',
};

const TYPE_LABELS = _L.typeLabels || {
  position:        'Базування',
  transit:         'Переміщення',
  strike_outgoing: 'Удар від корабля',
  strike_incoming: 'Удар по кораблю',
  incident:        'Інцидент',
  command:         'Командування',
  operation:       'Операція',
  context:         'Контекст',
};

const TYPE_ICONS = {
  position:        '•',
  transit:         '→',
  strike_outgoing: '↗',
  strike_incoming: '✕',
  incident:        '!',
  command:         '★',
  operation:       '◇',
  context:         '◷',
};

const MONTH_NAMES_UA = _L.months      || ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
const MONTH_SHORT_UA = _L.monthsShort || ['січ','лют','бер','кві','тра','чер','лип','сер','вер','жов','лис','гру'];
const WEEKDAY_UA     = _L.weekdays    || ['нд','пн','вт','ср','чт','пт','сб'];

const DAY = 86400000;

// ── State ────────────────────────────────────────────────────────
const state = {
  date: new Date('2022-02-24T00:00:00Z'),
  shipsOn: Object.fromEntries(DATA.meta.ships.map(s => [s.id, true])),
  typesOn: Object.fromEntries(Object.keys(TYPE_COLORS).map(k => [k, true])),
  minImportance: 1,
  activeEventId: 'e_001',
  draggingCaret: false,
};

// ── Helpers ──────────────────────────────────────────────────────
function parseDate(s) { return new Date(s + 'T12:00:00Z'); }
function clampDate(d) {
  if (d < T_START) return new Date(T_START);
  if (d > T_END)   return new Date(T_END);
  return d;
}
function dateToFraction(d) {
  return (d - T_START) / T_SPAN;
}
function fractionToDate(f) {
  return new Date(T_START.getTime() + Math.max(0, Math.min(1, f)) * T_SPAN);
}
function fmtDateUkr(d) {
  // "24 лютого 2022"
  return d.getUTCDate() + ' ' + MONTH_NAMES_UA[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
}
function fmtDateShort(d) {
  // "24.02.2022"
  const dd = String(d.getUTCDate()).padStart(2,'0');
  const mm = String(d.getUTCMonth()+1).padStart(2,'0');
  return `${dd}.${mm}.${d.getUTCFullYear()}`;
}
function fmtDateUkrFull(d) {
  return fmtDateUkr(d) + ' · ' + WEEKDAY_UA[d.getUTCDay()];
}
function daysBetween(a, b) {
  return Math.round((b - a) / DAY);
}
function shipById(id) { return DATA.meta.ships.find(s => s.id === id); }
function locById(id) { return DATA.meta.locations[id]; }

// Last name from "Адмірал Григорович" → "ГРИГОРОВИЧ"
function shipShortName(id) {
  const ship = shipById(id);
  return ship.name.split(' ').pop().toUpperCase();
}

// ── Compute ship position at date ────────────────────────────────
// Algorithm:
// 1. Find the active position segment for ship at date D
// 2. If a transit event exists for this ship within ±2 days of D, use its location
// 3. Otherwise use the segment's location
function shipPositionAt(shipId, date) {
  const ts = date.getTime();

  // Find active position segment
  const seg = DATA.positions.find(p => {
    if (p.ship !== shipId) return false;
    return parseDate(p.from).getTime() <= ts && ts <= parseDate(p.to).getTime();
  });

  // Check for transit event nearby
  const nearTransit = DATA.events.find(e => {
    if (e.type !== 'transit') return false;
    if (!e.ships.includes(shipId)) return false;
    const ed = parseDate(e.date).getTime();
    return Math.abs(ed - ts) <= 2 * DAY;
  });

  if (nearTransit) return locById(nearTransit.location);
  if (seg) return locById(seg.location);

  // Fallback: nearest position segment
  const sorted = DATA.positions.filter(p => p.ship === shipId)
    .sort((a,b) => parseDate(a.from) - parseDate(b.from));
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (parseDate(sorted[i].from).getTime() <= ts) return locById(sorted[i].location);
  }
  return locById(sorted[0].location);
}

// Current base name (for tooltip)
function shipBaseNoteAt(shipId, date) {
  const ts = date.getTime();
  const seg = DATA.positions.find(p => {
    if (p.ship !== shipId) return false;
    return parseDate(p.from).getTime() <= ts && ts <= parseDate(p.to).getTime();
  });
  if (seg) return { loc: locById(seg.location), note: seg.note };
  return { loc: null, note: '—' };
}

// ─────────────────────────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────────────────────────
let map, locationMarkers = {}, shipMarkers = {}, eventMarkers = [];

function initMap() {
  map = L.map('map', {
    center: [48, 20],
    zoom: 4,
    minZoom: 3,
    maxZoom: 10,
    zoomControl: true,
    attributionControl: true,
  });

  // OpenStreetMap — reliable basemap (no API key)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map);

  // Fit initial view to wider area
  map.fitBounds([[33, 18], [66, 53]]);

  // Render locations as small grey dots. Labels only for ports (naval
  // bases + shipyards). Operational zones (mid-sea points) are hidden
  // entirely so we don't drop a marker in open water.
  Object.entries(DATA.meta.locations).forEach(([id, loc]) => {
    if (loc.type === 'operational_zone') return;
    const showLabel = (loc.type === 'naval_base' || loc.type === 'shipyard');
    const labelHtml = showLabel ? `<div class="location-label">${loc.name}</div>` : '';
    const icon = L.divIcon({
      className: 'location-marker',
      html: `<div class="loc-dot"></div>${labelHtml}`,
      iconSize: [80, 24],
      iconAnchor: [40, 3],
    });
    const m = L.marker([loc.lat, loc.lng], { icon, interactive: false, keyboard: false }).addTo(map);
    locationMarkers[id] = m;
  });

  // Create ship markers (kept as empty placeholder; actual rendering is in updateMap)

  // -- Inland waterways (Buyan-M transit routes) ----------------------
  (function addInlandWaterways() {
    var wStyle = { color: '#2176AE', weight: 2.5, opacity: 0.55, dashArray: '6 4', interactive: true };
    var tipOpts = { sticky: true, className: 'ww-tip' };
    var wCss = document.createElement('style');
    wCss.textContent = '.ww-tip { background: rgba(12,28,60,0.88) !important; border: none !important; color: #7AB8F5 !important; font-size: 11px !important; font-family: monospace; letter-spacing: 0.04em; padding: 3px 7px !important; border-radius: 2px !important; box-shadow: none !important; } .ww-tip::before { display:none !important; }';
    document.head.appendChild(wCss);
    // VBK: Volgo-Balt waterway (Kronstadt -> Ladoga -> Svir -> Onega -> Rybinsk)
    L.polyline([[59.97,30.24],[60.05,31.5],[60.15,32.6],[60.8,33.5],[61.5,35.0],[60.5,37.2],[59.1,37.9],[58.7,38.7]], wStyle).addTo(map).bindTooltip(_L.waterwayVolgaBalt || 'Волго-Балт. вод. шлях (ВБК)', tipOpts);
    // BBK: Belomoro-Baltic canal (Onega -> White Sea)
    L.polyline([[61.9,34.5],[62.8,34.1],[63.6,33.8],[64.5,34.8]], wStyle).addTo(map).bindTooltip(_L.waterwayWSBC || 'Беломоро-Балт. канал (ББК)', tipOpts);
    // Volga: Rybinsk -> Nizhny Novgorod -> Kazan -> Samara -> Volgograd -> Astrakhan -> Caspian
    L.polyline([[58.7,38.7],[57.7,39.9],[56.3,44.0],[55.8,49.1],[53.2,50.2],[51.5,46.0],[48.7,44.5],[46.3,48.0],[45.3,49.0]], wStyle).addTo(map).bindTooltip(_L.waterwayVolga || 'р. Волга', tipOpts);
    // VDK: Volgo-Don canal (Volga -> Don -> Azov Sea)
    L.polyline([[48.7,44.5],[48.2,43.3],[48.7,43.5],[48.0,41.5],[47.5,40.4],[47.2,39.7],[47.1,38.9]], wStyle).addTo(map).bindTooltip(_L.waterwayVolgaDon || 'Волго-Донський канал (ВДК)', tipOpts);
  })();

}

// Build a single-ship marker (icon + label below)
function createSingleShipMarker(loc, ship) {
  const icon = L.divIcon({
    className: 'ship-marker',
    html: `
      <div class="ship-marker-inner">
        <div class="ship-icon" style="background:${ship.color}"></div>
        <div class="ship-label">${shipShortName(ship.id)}</div>
      </div>`,
    iconSize: [110, 60],
    iconAnchor: [55, 14],
  });
  const m = L.marker([loc.lat, loc.lng], { icon, zIndexOffset: 1000, title: ship.name });
  m.bindTooltip(`<b>${ship.name}</b><br><span style="color:#5C6B7A">${loc.name}</span>`, {
    direction: 'top', offset: [0, -28],
  });
  return m;
}

// Build a grouped marker for N ships at same location
function createGroupShipMarker(loc, ships) {
  // Conic gradient segments by ship color
  const seg = 360 / ships.length;
  const stops = ships.map((s, i) => {
    const a = i * seg, b = (i + 1) * seg;
    return `${s.color} ${a}deg ${b}deg`;
  }).join(', ');

  // Tooltip with vertical list
  const tipList = ships.map(s =>
    `<div style="display:flex;align-items:center;gap:6px;line-height:1.6;font-size:12px">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};flex-shrink:0"></span>
      <span>${s.name}</span>
    </div>`).join('');

  const icon = L.divIcon({
    className: 'ship-marker ship-group-marker',
    html: `
      <div class="ship-marker-inner">
        <div class="ship-group-icon" style="background:conic-gradient(${stops})">
          <div class="ship-group-count">${ships.length}</div>
        </div>
        <div class="ship-label">${ships.length === 2 ? '2 КОРАБЛІ' : ships.length + ' КОРАБЛІВ'}</div>
      </div>`,
    iconSize: [120, 64],
    iconAnchor: [60, 16],
  });

  const m = L.marker([loc.lat, loc.lng], { icon, zIndexOffset: 1000 });
  m.bindTooltip(
    `<div style="font-weight:700;margin-bottom:4px;font-size:13px">${loc.name}</div>${tipList}`,
    { direction: 'top', offset: [0, -28] }
  );

  // Popup with vertical list of ships
  const popupHtml = `
    <div class="group-popup">
      <div class="group-popup-loc">${loc.name}</div>
      <div class="group-popup-list">
        ${ships.map(s => `
          <div class="group-popup-row">
            <span class="group-popup-dot" style="background:${s.color}"></span>
            <div>
              <div class="group-popup-name">${s.name}</div>
              <div class="group-popup-hull">борт. ${s.hull_number}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  m.bindPopup(popupHtml, { closeButton: true, autoPan: true, className: 'ship-group-popup' });
  return m;
}

function makeEventIcon(ev) {
  const color = TYPE_COLORS[ev.type] || '#5C6B7A';
  const verifyClass = ev.verified === false ? ' unverified' : '';
  return L.divIcon({
    className: 'event-map-marker',
    html: `<div class="evm-circle${verifyClass}" style="background:${color}">${TYPE_ICONS[ev.type] || '?'}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

// Update ship positions and event markers based on state.date
let groupMarkers = [];

function updateMap() {
  // Remove old grouped markers
  groupMarkers.forEach(m => map.removeLayer(m));
  groupMarkers = [];

  // Hide all preset shipMarkers (we no longer use them directly — keep around for compat)
  Object.values(shipMarkers).forEach(m => {
    if (map.hasLayer(m)) map.removeLayer(m);
  });

  // Group ships by location
  const groups = {};
  DATA.meta.ships.forEach(ship => {
    if (!state.shipsOn[ship.id]) return;
    const loc = shipPositionAt(ship.id, state.date);
    const key = `${loc.lat.toFixed(4)},${loc.lng.toFixed(4)}`;
    if (!groups[key]) groups[key] = { loc, ships: [] };
    groups[key].ships.push(ship);
  });

  Object.values(groups).forEach(({loc, ships}) => {
    const m = ships.length === 1
      ? createSingleShipMarker(loc, ships[0])
      : createGroupShipMarker(loc, ships);
    m.addTo(map);
    groupMarkers.push(m);
  });

  // Clear old event markers
  eventMarkers.forEach(m => map.removeLayer(m));
  eventMarkers = [];

  // Add event markers within ±14 days of date and matching filters
  const windowStart = state.date.getTime() - 14 * DAY;
  const windowEnd   = state.date.getTime() + 14 * DAY;
  DATA.events.forEach(ev => {
    if (!eventVisible(ev)) return;
    const ed = parseDate(ev.date).getTime();
    if (ed < windowStart || ed > windowEnd) return;
    const loc = locById(ev.location);
    if (!loc) return;
    const m = L.marker([loc.lat, loc.lng], {
      icon: makeEventIcon(ev),
      zIndexOffset: 500,
    }).addTo(map);
    m.on('click', () => showModal(ev));
    eventMarkers.push(m);
  });
}

function eventVisible(ev) {
  if (!state.typesOn[ev.type]) return false;
  if ((ev.importance || 1) < state.minImportance) return false;
  // Must include at least one visible ship
  if (!ev.ships.some(s => state.shipsOn[s])) return false;
  return true;
}

// ─────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────
function buildTimeline() {
  const yearsEl = document.getElementById('tlYears');
  const eventsEl = document.getElementById('tlEvents');
  yearsEl.innerHTML = '';
  eventsEl.innerHTML = '';

  // Year ticks + quarter markers — auto-derived from T_START / T_END,
  // so adding events past the current end of timeline grows the axis.
  const Y0 = T_START.getUTCFullYear();
  const Y1 = T_END.getUTCFullYear();
  for (let y = Y0; y <= Y1; y++) {
    const d = new Date(`${y}-01-01T00:00:00Z`);
    const f = dateToFraction(d);
    if (f >= 0 && f <= 1) {
      const yearEl = document.createElement('div');
      yearEl.className = 'tl-year';
      yearEl.style.left = (f * 100) + '%';
      yearEl.innerHTML = `<div class="tl-year-label">${y}</div><div class="tl-year-tick"></div>`;
      yearsEl.appendChild(yearEl);
    }
    for (let m of [4, 7, 10]) {
      const dm = new Date(`${y}-${String(m).padStart(2,'0')}-01T00:00:00Z`);
      if (dm < T_START || dm > T_END) continue;
      const fm = dateToFraction(dm);
      const monthEl = document.createElement('div');
      monthEl.className = 'tl-month';
      monthEl.style.left = (fm * 100) + '%';
      monthEl.textContent = MONTH_SHORT_UA[m-1];
      yearsEl.appendChild(monthEl);
    }
  }

  // Event dots
  DATA.events.forEach(ev => {
    const d = parseDate(ev.date);
    if (d < T_START || d > T_END) return;
    const f = dateToFraction(d);
    const dot = document.createElement('div');
    dot.className = 'tl-event-dot' + ((ev.importance || 1) >= 5 ? ' big' : '') + (ev.verified === false ? ' unverified' : '');
    dot.style.left = (f * 100) + '%';
    dot.style.background = TYPE_COLORS[ev.type];
    dot.style.color = TYPE_COLORS[ev.type];
    dot.dataset.id = ev.id;
    dot.title = `${ev.date} · ${ev.title}`;
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      state.date = d;
      state.activeEventId = ev.id;
      render();
      showModal(ev);
    });
    eventsEl.appendChild(dot);
  });

  setupCaretDrag();
}

function setupCaretDrag() {
  const wrap = document.getElementById('tlWrap');
  const hit = document.getElementById('tlCaretHit');

  let dragging = false;

  function startDrag(e) {
    e.preventDefault();
    dragging = true;
    state.draggingCaret = true;
    document.body.style.userSelect = 'none';
  }
  function move(clientX) {
    const rect = wrap.getBoundingClientRect();
    const f = (clientX - rect.left) / rect.width;
    state.date = clampDate(fractionToDate(f));
    render();
  }
  function endDrag() {
    dragging = false;
    state.draggingCaret = false;
    document.body.style.userSelect = '';
  }

  hit.addEventListener('mousedown', startDrag);
  document.getElementById('tlCaret').addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', e => { if (dragging) move(e.clientX); });
  window.addEventListener('mouseup', endDrag);

  // Touch
  hit.addEventListener('touchstart', e => { startDrag(e); }, { passive: false });
  window.addEventListener('touchmove', e => {
    if (dragging && e.touches[0]) move(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', endDrag);

  // Click on track also moves caret
  wrap.addEventListener('mousedown', e => {
    if (e.target === wrap || e.target.classList.contains('tl-track') || e.target.classList.contains('tl-progress') || e.target.classList.contains('tl-events')) {
      move(e.clientX);
      startDrag(e);
    }
  });
}

function updateTimeline() {
  const f = dateToFraction(state.date);
  document.getElementById('tlCaret').style.left = (f * 100) + '%';
  document.getElementById('tlCaretHit').style.left = (f * 100) + '%';
  document.getElementById('tlProgress').style.width = (f * 100) + '%';
  document.getElementById('currentDate').innerHTML =
    fmtDateUkr(state.date) + ` <span class="day-name">${WEEKDAY_UA[state.date.getUTCDay()]}</span>`;
}

// ─────────────────────────────────────────────────────────────────
// EVENT PANEL
// ─────────────────────────────────────────────────────────────────
function buildShipFilters() {
  const cont = document.getElementById('shipFilters');
  cont.innerHTML = '';
  DATA.meta.ships.forEach(ship => {
    const chip = document.createElement('div');
    chip.className = 'ship-chip';
    chip.dataset.id = ship.id;
    chip.innerHTML = `
      <div class="ship-chip-dot" style="background:${ship.color}"></div>
      <div class="ship-chip-name">${shipShortName(ship.id)}</div>`;

    let dblClickTimer = null;
    chip.addEventListener('click', () => {
      if (dblClickTimer) return; // wait for dblclick handler
      dblClickTimer = setTimeout(() => {
        dblClickTimer = null;
        state.shipsOn[ship.id] = !state.shipsOn[ship.id];
        render();
      }, 220);
    });
    chip.addEventListener('dblclick', () => {
      if (dblClickTimer) clearTimeout(dblClickTimer);
      dblClickTimer = null;
      // isolate mode
      const isolated = state.shipsOn[ship.id] &&
        Object.entries(state.shipsOn).every(([k,v]) => k === ship.id ? v : !v);
      if (isolated) {
        // un-isolate
        DATA.meta.ships.forEach(s => state.shipsOn[s.id] = true);
      } else {
        DATA.meta.ships.forEach(s => state.shipsOn[s.id] = (s.id === ship.id));
      }
      render();
    });

    cont.appendChild(chip);
  });
}

function buildTypeFilters() {
  const cont = document.getElementById('typeFilters');
  cont.innerHTML = '';
  // Skip "position" (no marker)
  const types = Object.keys(TYPE_COLORS).filter(t => t !== 'position');
  types.forEach(t => {
    const chip = document.createElement('div');
    chip.className = 'type-chip';
    chip.dataset.type = t;
    chip.innerHTML = `
      <div class="type-chip-dot" style="background:${TYPE_COLORS[t]}"></div>
      <div>${TYPE_LABELS[t]}</div>`;
    chip.addEventListener('click', () => {
      state.typesOn[t] = !state.typesOn[t];
      render();
    });
    cont.appendChild(chip);
  });

  // Importance slider
  document.getElementById('impSlider').addEventListener('input', (e) => {
    state.minImportance = parseInt(e.target.value, 10);
    document.getElementById('impValue').textContent = '≥ ' + state.minImportance;
    render();
  });
}

function updateFilterChips() {
  document.querySelectorAll('.ship-chip').forEach(chip => {
    chip.classList.toggle('off', !state.shipsOn[chip.dataset.id]);
  });
  document.querySelectorAll('.type-chip').forEach(chip => {
    chip.classList.toggle('off', !state.typesOn[chip.dataset.type]);
  });
}

function buildEventList() {
  const list = document.getElementById('eventList');
  list.innerHTML = '';

  const center = state.date.getTime();
  const filtered = DATA.events
    .filter(ev => eventVisible(ev))
    .map(ev => ({
      ev,
      ts: parseDate(ev.date).getTime(),
    }))
    .sort((a, b) => a.ts - b.ts);  // chronological: oldest → newest

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.style.cssText = 'padding:24px;text-align:center;color:#5C6B7A;font-size:13px;';
    empty.textContent = _L.noEvents || 'Немає подій за поточними фільтрами.';
    list.appendChild(empty);
    return;
  }

  // Find index of event closest in time to current date
  let closestIndex = 0;
  let minDelta = Infinity;
  filtered.forEach((f, i) => {
    const d = Math.abs(f.ts - center);
    if (d < minDelta) { minDelta = d; closestIndex = i; }
  });
  state.activeEventId = filtered[closestIndex].ev.id;

  // Render all in chronological order, splitting visually into past/active/future
  filtered.forEach((f, i) => {
    if (i === closestIndex) {
      renderListHeader(list, _L.currentEvent || 'Поточна подія');
    } else if (i === 0) {
      renderListHeader(list, (_L.earlier || 'Раніше · від ') + fmtDateShort(parseDate(filtered[0].ev.date)));
    } else if (i === closestIndex + 1) {
      renderListHeader(list, _L.next || 'Далі');
    }
    const delta = f.ts - center;
    renderEventCard(list, f.ev, delta, i === closestIndex);
  });

  // Center the active card in the panel (defer until layout is complete)
  setTimeout(() => {
    const activeCard = list.querySelector('.event-card.active');
    if (!activeCard) return;
    const target = activeCard.offsetTop - list.offsetHeight / 2 + activeCard.offsetHeight / 2;
    list.scrollTop = Math.max(0, target);
  }, 30);
}

function renderListHeader(list, text) {
  const h = document.createElement('div');
  h.className = 'event-list-header';
  h.textContent = text;
  list.appendChild(h);
}

function renderEventCard(list, ev, delta, isActive) {
  const card = document.createElement('div');
  card.className = 'event-card';
  if (isActive) card.classList.add('active');
  card.style.cssText = `border-left-color: ${TYPE_COLORS[ev.type]};`;

  const d = parseDate(ev.date);
  const deltaDays = Math.round(delta / DAY);
  const _ds = _L.daysSuffix || 'д';
  const deltaText = deltaDays === 0 ? (_L.today || 'сьогодні') :
    deltaDays > 0 ? `+${deltaDays}${_ds}` : `${deltaDays}${_ds}`;

  card.innerHTML = `
    <style>.event-card[data-id="${ev.id}"]::before{background:${TYPE_COLORS[ev.type]}}</style>
    <div class="ec-date">${fmtDateShort(d)}<span class="ec-delta">${deltaText}</span></div>
    <div class="ec-title">${escapeHtml(ev.title)}</div>
    <div class="ec-meta">
      ${ev.ships.map(s => {
        const sh = shipById(s);
        return `<span class="ec-ship-badge" style="background:${sh.color}">${shipShortName(s)}</span>`;
      }).join('')}
      <span class="ec-type-badge">${TYPE_LABELS[ev.type]}</span>
      ${ev.verified === false ? `<span class="ec-unverified">${_L.unverifiedBadge || '⚠ Непідтв.'}</span>` : ''}
    </div>`;
  card.dataset.id = ev.id;
  card.addEventListener('click', () => showModal(ev));
  list.appendChild(card);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

// ─────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────
function showModal(ev) {
  state.activeEventId = ev.id;
  // also move date to event
  state.date = parseDate(ev.date);
  render();

  const modal = document.getElementById('modal');
  const body  = document.getElementById('modalBody');
  const strip = document.getElementById('modalStrip');
  strip.style.background = TYPE_COLORS[ev.type];

  const loc = locById(ev.location);
  const d = parseDate(ev.date);

  const shipsHtml = ev.ships.map(sid => {
    const sh = shipById(sid);
    return `<span class="ship-tag" style="background:${sh.color}">${shipShortName(sid)}</span><span style="color:${sh.color}">${sh.name}</span>`;
  }).join('<br>');

  body.innerHTML = `
    ${ev.verified === false ? `<div class="modal-unverified-warn">${_L.attrUnverified || '⚠ Атрибуція непідтверджена'}</div>` : ''}
    <div class="modal-meta">
      <span class="modal-date">${fmtDateUkr(d)} · ${WEEKDAY_UA[d.getUTCDay()]}</span>
      <span class="modal-type" style="color:${TYPE_COLORS[ev.type]}; border-color:${TYPE_COLORS[ev.type]}">${TYPE_LABELS[ev.type]}</span>
    </div>
    <div class="modal-title">${escapeHtml(ev.title)}</div>
    <div class="modal-row">
      <div class="modal-row-label">${_L.locationLabel || 'Локація'}</div>
      <div class="modal-row-value">${loc ? escapeHtml(loc.name) : '—'}</div>
    </div>
    <div class="modal-row">
      <div class="modal-row-label">${_L.shipLabel || 'Корабель'}</div>
      <div class="modal-row-value">${shipsHtml}</div>
    </div>
    ${ev.casualties ? `<div class="modal-casualties">${_L.casualtiesLabel || 'Втрати: '}${escapeHtml(ev.casualties)}</div>` : ''}
    <div class="modal-description">${escapeHtml(ev.description)}</div>
    <div class="modal-sources">
      <div class="modal-sources-label">${_L.sourcesLabel || 'Джерела'}</div>
      <ul>${(ev.sources || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
    </div>`;

  modal.classList.add('show');
}

function hideModal() {
  document.getElementById('modal').classList.remove('show');
}

// ─────────────────────────────────────────────────────────────────
// BUTTONS & KEYBOARD
// ─────────────────────────────────────────────────────────────────
function setupButtons() {
  const shift = (days) => {
    state.date = clampDate(new Date(state.date.getTime() + days * DAY));
    render();
  };
  document.getElementById('btnPrev30').addEventListener('click', () => shift(-30));
  document.getElementById('btnPrev7').addEventListener('click',  () => shift(-7));
  document.getElementById('btnNext7').addEventListener('click',  () => shift(7));
  document.getElementById('btnNext30').addEventListener('click', () => shift(30));
  document.getElementById('btnToday').addEventListener('click', () => {
    state.date = new Date(T_END);
    render();
  });

  document.getElementById('modalClose').addEventListener('click', hideModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') hideModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hideModal(); return; }
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    const step = e.shiftKey ? 30 : 7;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); shift(-step); }
    if (e.key === 'ArrowRight') { e.preventDefault(); shift(step); }
  });
}

// ─────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────
function render() {
  updateTimeline();
  updateMap();
  updateFilterChips();
  buildEventList();
}

// ─────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────
// Exposed for the combined shell. Original auto-init kicks in only if
// no shell takes over (so `interactive-timeline.html` still works on its own).
let _appInited = false;
function initApp() {
  if (_appInited) {
    if (map) setTimeout(() => map.invalidateSize(), 60);
    return;
  }
  _appInited = true;
  initMap();
  buildTimeline();
  buildShipFilters();
  buildTypeFilters();
  setupButtons();
  render();
}
window.MapMode = {
  init: initApp,
  resume() { if (map) setTimeout(() => map.invalidateSize(), 60); },
};
window.addEventListener('load', () => {
  if (!window.__skipMapAutoInit) initApp();
});
