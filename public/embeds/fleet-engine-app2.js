// ─────────────────────────────────────────────────────────────────
// PLITKA Analytics — режим «Лінія» (Black Fleet Dossier)
//
// Точний рендер з Ракетоносці-ЧМ-Каспію-фрегати-11356Р.html, але всі
// масиви даних (ships, positions, events) виводяться з DATA з data.js.
// Кількість кораблів може зростати — все динамічне.
// ─────────────────────────────────────────────────────────────────

// Locale — set window.FLEET_LOCALE before loading this script to override.
const _L2 = window.FLEET_LOCALE || {};

(function() {

const NS = 'http://www.w3.org/2000/svg';

// ── Mapping DATA.locations → band keys ─────────────────────────────
// Bands шість штук (верх → низ). Кожна позиція або стрілковий ивент
// потрапляє у відповідну смугу.
const LOC_TO_BAND = DATA.meta.loc_to_band || {
  sevastopol:      'sevastopol',
  novorossiysk:    'novorossiysk',
  black_sea:       'novorossiysk',
  azov_sea:        'novorossiysk',
  temryuk:         'novorossiysk',
  rostov_don:      'novorossiysk',
  tartus:          'med',
  med_east:        'med',
  med_west:        'med',
  bosphorus:       'med',
  onega_lake:      'baltic',
  northern_fleet_range: 'baltic',
  white_sea:       'baltic',
  baltic_sea:      'baltic',
  baltiysk:        'baltic',
  kronstadt:       'baltic',
  kaspiysk:        'caspian',
  astrakhan:       'caspian',
  caspian_sea:     'caspian',
  rybinsk:         'caspian',
  volgograd:       'caspian',
  zeleno_dol_shipyard: 'caspian',
};

const ALL_BANDS = DATA.meta.all_bands || _L2.allBands || [
  { key: 'caspian',      name: 'Каспій',              sub: 'Каспійськ · Астрахань · Волга' },
  { key: 'sevastopol',   name: 'Севастополь',         sub: 'ВМБ Чорноморського флоту' },
  { key: 'novorossiysk', name: 'Новоросійськ',        sub: 'ЧМФ · Темрюцька затока · Азов' },
  { key: 'med',          name: 'Середземне море',     sub: 'Тартус · Босфор · транзит' },
  { key: 'baltic',       name: 'Балтика',             sub: 'Балтійськ · Кронштадт · Онезьке оз.' },
];

const MONTHS_UA = _L2.monthsUpper || ['СІЧ','ЛЮТ','БЕР','КВІ','ТРА','ЧЕР','ЛИП','СЕР','ВЕР','ЖОВ','ЛИС','ГРУ'];
const TYPE_BADGE = _L2.typeBadge || {
  strike_outgoing: 'УДАР ПО ЦІЛІ',
  strike_incoming: 'УРАЖЕННЯ КОРАБЛЯ',
  incident:        'ІНЦИДЕНТ',
  command:         'КОМАНДУВАННЯ',
  operation:       'ОПЕРАЦІЯ',
  context:         'КОНТЕКСТ',
  transit:         'ПЕРЕХІД',
};

function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function fmtDate(s) {
  const d = new Date(s);
  return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_UA[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtDateDot(s) {
  return s.slice(8,10) + '.' + s.slice(5,7) + '.' + s.slice(0,4);
}

// ── Build normalized positions (map .location → band, copy fields) ─
function buildPositions() {
  const out = [];
  DATA.positions.forEach(p => {
    const band = LOC_TO_BAND[p.location];
    if (!band) return;
    out.push({
      ship: p.ship,
      from: p.from,
      to: p.to,
      loc: band,
      origLoc: p.location,
      note: p.note,
    });
  });
  return out;
}

// ── Damage detection — DISABLED ─────────────────────────────────
// Раніше ми ділили сегмент на «чисту» частину і «damaged tail» після
// удару, фарбуючи хвіст у червоний. Користувач попросив зберігати
// колір корабля незмінним, бо тривалість ремонту переважно невідома.
// Ремонт у Калінінграді все одно лишається штрих-кодом (це інша
// гілка стилю, не залежить від цього поля).
function applyDamage(positions) {
  return positions;
}

// ── Compute "now" date — max event/position date ──────────────────
function computeNow() {
  let max = -Infinity;
  DATA.positions.forEach(p => { const t = +new Date(p.to); if (t > max) max = t; });
  DATA.events.forEach(e => { const t = +new Date(e.date); if (t > max) max = t; });
  return new Date(max);
}

// ── Filter state ──────────────────────────────────────────────────
const shipState = {};
const evtState = {
  strike_outgoing: true, strike_incoming: true, incident: true,
  command: true, operation: true, context: true,
};

// ── Build dynamic ship chips / dossier ────────────────────────────
function buildShipChips() {
  const cont = document.getElementById('ships-toggle');
  if (!cont) return;
  // Keep the label child, remove existing chips
  cont.querySelectorAll('.chip').forEach(c => c.remove());
  DATA.meta.ships.forEach(s => {
    if (!(s.id in shipState)) shipState[s.id] = true;
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.ship = s.id;
    if (!shipState[s.id]) btn.classList.add('off');
    btn.innerHTML = `<span class="dot" style="background:${s.color}"></span>${escapeHtml(shortName(s))}`;
    btn.addEventListener('click', () => {
      shipState[s.id] = !shipState[s.id];
      btn.classList.toggle('off', !shipState[s.id]);
      applyFilters();
    });
    cont.appendChild(btn);
  });
}

function buildDossier() {
  const cont = document.getElementById('dossier');
  if (!cont) return;
  cont.innerHTML = '';
  const positions = buildPositions();
  const bandName = Object.fromEntries(ALL_BANDS.map(b => [b.key, b.name]));

  DATA.meta.ships.forEach(s => {
    const segs = positions.filter(p => p.ship === s.id);
    const last = segs[segs.length - 1];
    const hits = DATA.events.filter(e => e.type === 'strike_incoming' && e.ships.includes(s.id));
    const launches = DATA.events.filter(e => e.type === 'strike_outgoing' && e.ships.includes(s.id));

    let stateText = _L2.inService || 'у строю';
    let stateColor = 'var(--lv-ink)';
    if (hits.length) {
      const _dmg = _L2.damaged || 'пошкоджений';
      stateText = hits.length >= 2 ? `${_dmg} ${hits.length}×` : _dmg;
      stateColor = 'var(--lv-damage)';
    }

    const lastLoc = last ? (bandName[last.loc] || last.loc) : '—';
    const summary = buildSummary(s, segs, hits, launches);

    const card = document.createElement('div');
    card.className = 'ship-card';
    card.dataset.shipCard = s.id;
    card.innerHTML = `
      <div class="accent" style="background:${s.color}"></div>
      <div class="h">
        <div class="name">${escapeHtml(s.name)}</div>
        <div class="hull">№ ${escapeHtml(s.hull_number)} · ${s.commissioned.replace(/-/g, '.')}</div>
      </div>
      <div class="stat">
        <div><span class="lbl">${_L2.currentBase || 'Поточне базування'}</span><span>${escapeHtml(lastLoc)}</span></div>
        <div><span class="lbl">${_L2.statusLabel || 'Стан'}</span><span style="color:${stateColor}">${stateText}</span></div>
      </div>
      <div class="state">${summary}</div>
    `;
    cont.appendChild(card);
  });
}

function buildSummary(ship, segs, hits, launches) {
  const parts = [];
  const firstMed = segs.find(s => s.loc === 'med');
  const lastSeg = segs[segs.length - 1];
  const bosphorus = DATA.events.find(e => e.location === 'bosphorus' && e.type === 'context');

  if (firstMed && bosphorus && +new Date(firstMed.from) < +new Date(bosphorus.date)) {
    const _medFn = _L2.summaryMed || (date => `У Середземному морі від ${date}. Босфор замкнувся за ним. <b>Не повернувся в Чорне море.</b>`);
    parts.push(_medFn(firstMed.from.replace(/-/g,'.')));
  }
  if (launches.length) {
    const _lFn = _L2.summaryLaunches || (n => `Пусків крилатих ракет: <b>${n}</b>.`);
    parts.push(_lFn(launches.length));
  }
  if (hits.length) {
    const dates = hits.map(h => fmtDateDot(h.date)).join(', ');
    const _dFn = _L2.summaryDamaged || (d => `Пошкоджений: <b>${d}</b>.`);
    parts.push(_dFn(dates));
  }
  if (lastSeg && lastSeg.note) {
    parts.push(escapeHtml(lastSeg.note) + '.');
  }
  return parts.join(' ');
}

function shortName(s) {
  return s.name.replace(/^Адмірал\s+/i, '');
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

// ── Build event-type chips (static, but with handlers) ────────────
function buildEventChips() {
  const cont = document.getElementById('events-toggle');
  if (!cont) return;
  cont.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('off', !evtState[c.dataset.evt]);
    if (c._wired) return;
    c._wired = true;
    c.addEventListener('click', () => {
      const t = c.dataset.evt;
      evtState[t] = !evtState[t];
      c.classList.toggle('off', !evtState[t]);
      applyFilters();
    });
  });
}

// ── Chart render ──────────────────────────────────────────────────
let _svg = null;

function buildChart() {
  const svg = document.getElementById('line-chart');
  if (!svg) return;
  _svg = svg;
  svg.innerHTML = '';

  // Layout
  const W = 1620;
  const margin = { top: 70, right: 60, bottom: 40, left: 220 };
  const innerW = W - margin.left - margin.right;

  // Time range
  const now = computeNow();
  const T0 = +new Date('2022-01-01T00:00:00Z');
  const TENDmin = +new Date('2026-05-15T00:00:00Z');
  const T1 = Math.max(TENDmin, +now + 14 * 86400000);

  function xOf(d) {
    const t = (typeof d === 'string' ? +new Date(d) : +d);
    return margin.left + ((t - T0) / (T1 - T0)) * innerW;
  }

  // Bands — pre-compute early for compact variable-height layout
  const positions = applyDamage(buildPositions());
  const usedBandKeys = new Set();
  positions.forEach(p => usedBandKeys.add(p.loc));
  DATA.events.forEach(e => {
    const b = LOC_TO_BAND[e.location];
    if (b) usedBandKeys.add(b);
  });
  const bands = ALL_BANDS.filter(b => usedBandKeys.has(b.key));

  // Per-band ship lists (positions only)
  const bandShipList = {};
  bands.forEach(b => { bandShipList[b.key] = []; });
  positions.forEach(p => {
    if (bandShipList[p.loc] && !bandShipList[p.loc].includes(p.ship))
      bandShipList[p.loc].push(p.ship);
  });

  // Variable band heights: each band sized to its actual ship count
  const TRACK_PITCH = 16;
  const BAND_PAD = 28;
  const bandHOf = (key) => Math.max(48, (bandShipList[key] || []).length * TRACK_PITCH + BAND_PAD);
  const dynH = margin.top + margin.bottom + bands.reduce((s, b) => s + bandHOf(b.key), 0);

  svg.setAttribute('viewBox', `0 0 ${W} ${dynH}`);
  const innerH = dynH - margin.top - margin.bottom;

  function bandY(key) {
    let y = margin.top;
    for (const b of bands) { if (b.key === key) return y; y += bandHOf(b.key); }
    return margin.top;
  }

  // Ship Y — tight packing using per-band ship list
  const shipY = (bandKey, shipId) => {
    const top = bandY(bandKey);
    const h = bandHOf(bandKey);
    const list = bandShipList[bandKey] || [];
    const n = Math.max(1, list.length);
    const idx = list.indexOf(shipId);
    const i = idx >= 0 ? idx : n - 1;
    const inset = 14;
    return top + inset + (i + 0.5) * ((h - inset * 2) / n);
  };

  // Band backgrounds + labels
  bands.forEach((b, i) => {
    const bY = bandY(b.key);
    const bH = bandHOf(b.key);
    el('rect', {
      x: margin.left, y: bY,
      width: innerW, height: bH,
      fill: i % 2 ? 'rgba(255,255,255,0.018)' : 'transparent',
    }, svg);
    el('line', {
      x1: margin.left, y1: bY + bH,
      x2: margin.left + innerW, y2: bY + bH,
      class: 'lv-divider',
    }, svg);
    el('text', {
      x: margin.left - 18, y: bY + bH / 2 - 5,
      'text-anchor': 'end', class: 'lv-band-label',
    }, svg).textContent = b.name;
    el('text', {
      x: margin.left - 18, y: bY + bH / 2 + 12,
      'text-anchor': 'end', class: 'lv-band-sub',
    }, svg).textContent = b.sub;
  });
  el('line', { x1: margin.left, y1: margin.top, x2: margin.left + innerW, y2: margin.top, class: 'lv-divider-strong' }, svg);
  el('line', { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + innerH, class: 'lv-divider-strong' }, svg);

  // Year & quarter ticks
  const Y0 = new Date(T0).getUTCFullYear();
  const Y1 = new Date(T1).getUTCFullYear();
  for (let y = Y0; y <= Y1; y++) {
    const xY = xOf(`${y}-01-01`);
    if (xY > margin.left + innerW || xY < margin.left - 4) continue;
    el('line', { x1: xY, y1: margin.top, x2: xY, y2: margin.top + innerH, class: 'lv-year-tick' }, svg);
    el('text', { x: xY + 8, y: margin.top - 36, class: 'lv-year-label' }, svg).textContent = y;
    for (let m = 1; m <= 12; m++) {
      const xM = xOf(`${y}-${String(m).padStart(2,'0')}-01`);
      if (xM > margin.left + innerW || xM < margin.left) continue;
      if (m !== 1) {
        el('line', { x1: xM, y1: margin.top + innerH - 6, x2: xM, y2: margin.top + innerH, class: 'lv-month-tick' }, svg);
      }
      if ([4, 7, 10].includes(m)) {
        el('text', { x: xM + 4, y: margin.top - 14, class: 'lv-year-sub' }, svg).textContent = ['Q1','Q2','Q3','Q4'][Math.floor((m-1)/3)];
      }
    }
  }

  // "Now" line
  const nowX = xOf(now);
  el('line', { x1: nowX, y1: margin.top, x2: nowX, y2: margin.top + innerH, class: 'lv-now-line' }, svg);
  el('text', { x: nowX + 6, y: margin.top + innerH + 22, class: 'lv-now-label' }, svg)
    .textContent = (_L2.todayLine || 'СЬОГОДНІ · ') + fmtDateDot(now.toISOString().slice(0,10));

  // Context events as guide lines
  DATA.events.filter(e => e.type === 'context').forEach(e => {
    const xC = xOf(e.date);
    if (xC < margin.left || xC > margin.left + innerW) return;
    el('line', { x1: xC, y1: margin.top + 6, x2: xC, y2: margin.top + innerH - 6, class: 'lv-evt-ctx' }, svg);
  });

  // Ship paths
  DATA.meta.ships.forEach(s => {
    const segs = positions
      .filter(p => p.ship === s.id)
      .sort((a, b) => new Date(a.from) - new Date(b.from));
    if (!segs.length) return;
    const grp = el('g', { 'data-ship-group': s.id }, svg);
    let prev = null;

    segs.forEach((seg, i) => {
      const x1 = Math.max(margin.left, xOf(seg.from));
      const x2 = Math.min(margin.left + innerW, xOf(seg.to));
      if (x2 <= margin.left) { prev = null; return; }
      const y = shipY(seg.loc, s.id);

      // Transition from prev band → current band
      if (prev) {
        const dx = Math.max(40, (x1 - prev.x2));
        el('path', {
          d: `M ${prev.x2} ${prev.y} C ${prev.x2 + dx*0.5} ${prev.y}, ${x1 - dx*0.5} ${y}, ${x1} ${y}`,
          stroke: s.color, 'stroke-width': 2.6,
          fill: 'none', 'stroke-linecap': 'round',
          opacity: 0.55, class: 'lv-ship-line',
        }, grp);
      }

      // Segment line
      let cls = 'lv-ship-line';
      let strokeColor = s.color;
      if (seg.damaged) { cls += ' damaged'; strokeColor = undefined; }
      else if (seg.loc === 'kaliningrad' || seg.origLoc === 'astrakhan') { cls += ' repair'; strokeColor = undefined; }

      const line = el('line', {
        x1, y1: y, x2, y2: y, class: cls,
      }, grp);
      if (strokeColor) line.setAttribute('stroke', strokeColor);
      line.dataset.ship = s.id;
      line.style.cursor = 'pointer';
      line.addEventListener('mouseenter', (ev) => showSegTip(ev, s, seg, bands));
      line.addEventListener('mousemove', moveTip);
      line.addEventListener('mouseleave', hideTip);
      line.addEventListener('click', () => showSegDetail(s, seg, bands));

      // Endpoint dots
      if (i === 0) {
        const dot = el('circle', { cx: x1, cy: y, r: 3.5, fill: s.color }, grp);
        dot.dataset.ship = s.id;
      }
      const ed = el('circle', {
        cx: x2, cy: y, r: 3.5,
        fill: seg.damaged ? 'var(--lv-damage)' : s.color,
      }, grp);
      ed.dataset.ship = s.id;

      prev = { x2, y };
    });

    // Ship handles — right side only (left side collides with band labels)
    const lastSeg = segs[segs.length - 1];
    if (lastSeg) {
      const x = Math.min(margin.left + innerW, xOf(lastSeg.to));
      const y = shipY(lastSeg.loc, s.id);
      const t = el('text', {
        x: x + 8, y: y + 4, class: 'lv-ship-handle', fill: s.color,
      }, svg);
      t.dataset.ship = s.id;
      t.textContent = shortName(s).toUpperCase();
    }
  });

  // Events on top
  const shipsWithSegments = new Set(positions.map(p => p.ship));
  DATA.events.forEach(e => {
    if (e.type === 'context') {
      const x = xOf(e.date);
      if (x < margin.left - 8 || x > margin.left + innerW + 8) return;
      const g = el('g', { class: 'lv-evt', transform: `translate(${x},${margin.top - 4})` }, svg);
      const inner = el('g', { class: 'lv-evt-inner' }, g);
      el('circle', { cx: 0, cy: 4, r: 12, class: 'lv-evt-hit-area' }, g);
      el('polygon', { points: '-5,0 5,0 0,7', fill: 'var(--lv-ink-3)' }, inner);
      g.dataset.evtId = e.id;
      g.dataset.type = e.type;
      g.addEventListener('mouseenter', (ev) => showEvtTip(ev, e));
      g.addEventListener('mousemove', moveTip);
      g.addEventListener('mouseleave', hideTip);
      g.addEventListener('click', () => showEvtDetail(e));
      return;
    }

    e.ships.forEach(shipId => {
      if (!shipsWithSegments.has(shipId)) return;
      const x = xOf(e.date);
      if (x < margin.left - 8 || x > margin.left + innerW + 8) return;
      // Always anchor the marker to the ship's current band so the dot
      // sits ON the ship's line. The exact event location stays in the
      // tooltip / detail card / map view. Fall back to the event's own
      // band only if the ship has no active position at that date.
      const band = bandOfShipAt(positions, shipId, e.date) || LOC_TO_BAND[e.location];
      if (!band) return;
      const y = shipY(band, shipId);

      const g = el('g', { class: 'lv-evt', transform: `translate(${x},${y})` }, svg);
      const inner = el('g', { class: 'lv-evt-inner' }, g);
      el('circle', { cx: 0, cy: 0, r: 14, class: 'lv-evt-hit-area' }, g);

      if (e.type === 'strike_outgoing') {
        const rays = 8;
        for (let i = 0; i < rays; i++) {
          const a = (i / rays) * Math.PI * 2;
          el('line', {
            x1: Math.cos(a) * 3, y1: Math.sin(a) * 3,
            x2: Math.cos(a) * 7, y2: Math.sin(a) * 7,
            stroke: 'var(--lv-warn)', 'stroke-width': 1.5, 'stroke-linecap': 'round',
          }, inner);
        }
        el('circle', { cx: 0, cy: 0, r: 3, fill: 'var(--lv-warn)' }, inner);
      } else if (e.type === 'strike_incoming') {
        el('circle', { cx: 0, cy: 0, r: 13, class: 'lv-evt-hit-glow' }, inner);
        const pts = [];
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          const r = i % 2 === 0 ? 8 : 3.5;
          pts.push(`${Math.cos(a) * r},${Math.sin(a) * r}`);
        }
        el('polygon', { points: pts.join(' '), fill: 'var(--lv-damage)' }, inner);
        el('circle', { cx: 0, cy: 0, r: 2, fill: '#fff' }, inner);
      } else if (e.type === 'incident') {
        el('polygon', { points: '0,-7 7,5 -7,5', fill: 'var(--lv-warn)', stroke: 'var(--lv-bg)', 'stroke-width': 1 }, inner);
        el('rect', { x: -0.7, y: -3, width: 1.4, height: 4, fill: 'var(--lv-bg)' }, inner);
        el('rect', { x: -0.7, y: 2.2, width: 1.4, height: 1.4, fill: 'var(--lv-bg)' }, inner);
      } else if (e.type === 'command') {
        el('rect', { x: -5, y: -5, width: 10, height: 10, fill: 'var(--lv-ink-3)', transform: 'rotate(45)' }, inner);
      } else if (e.type === 'operation') {
        el('circle', { cx: 0, cy: 0, r: 5, fill: 'none', stroke: 'var(--lv-grig)', 'stroke-width': 2 }, inner);
        el('circle', { cx: 0, cy: 0, r: 1.6, fill: 'var(--lv-grig)' }, inner);
      } else if (e.type === 'transit') {
        el('polygon', { points: '-6,0 6,-4 6,4', fill: 'var(--lv-grig)', opacity: 0.8 }, inner);
      }

      g.dataset.evtId = e.id;
      g.dataset.type = e.type;
      g.dataset.ship = shipId;
      g.addEventListener('mouseenter', (ev) => showEvtTip(ev, e));
      g.addEventListener('mousemove', moveTip);
      g.addEventListener('mouseleave', hideTip);
      g.addEventListener('click', () => showEvtDetail(e));
    });
  });

  applyFilters();
}

function bandOfShipAt(positions, shipId, date) {
  const t = +new Date(date);
  for (const p of positions) {
    if (p.ship !== shipId) continue;
    if (t >= +new Date(p.from) && t < +new Date(p.to)) return p.loc;
  }
  return null;
}

// ── Filters ───────────────────────────────────────────────────────
function applyFilters() {
  if (!_svg) return;
  _svg.querySelectorAll('.lv-evt').forEach(g => {
    const eid = g.dataset.evtId;
    const e = DATA.events.find(x => x.id === eid);
    if (!e) return;
    const shipOK = (e.type === 'context') || e.ships.some(id => shipState[id]);
    const typeOK = evtState[e.type] !== false;
    g.style.display = (shipOK && typeOK) ? '' : 'none';
  });
  _svg.querySelectorAll('[data-ship]').forEach(node => {
    node.style.display = shipState[node.dataset.ship] ? '' : 'none';
  });
  _svg.querySelectorAll('[data-ship-group]').forEach(node => {
    node.style.opacity = shipState[node.dataset.shipGroup] ? '1' : '0.15';
  });
}

// ── Tooltip & detail panel ────────────────────────────────────────
let _tip;
function tipEl() {
  if (_tip) return _tip;
  _tip = document.getElementById('line-tip');
  return _tip;
}
function showEvtTip(ev, e) {
  const t = tipEl(); if (!t) return;
  t.innerHTML = `
    <div class="date">${fmtDate(e.date)} · ${TYPE_BADGE[e.type] || e.type.toUpperCase()}</div>
    <div class="ttl">${escapeHtml(e.title)}</div>
    <div class="desc">${escapeHtml((e.description || '').slice(0, 200))}${(e.description || '').length > 200 ? '…' : ''}</div>`;
  t.classList.add('show');
  moveTip(ev);
}
function showSegTip(ev, ship, seg, bands) {
  const t = tipEl(); if (!t) return;
  const bnd = bands.find(b => b.key === seg.loc);
  const isRepair = seg.loc === 'kaliningrad' || seg.origLoc === 'astrakhan';
  const state = seg.damaged ? (_L2.damagedSeg || 'ПОШКОДЖЕНИЙ · ') : (isRepair ? (_L2.repairSeg || 'РЕМОНТ · ') : '');
  t.innerHTML = `
    <div class="date">${fmtDate(seg.from)} → ${fmtDate(seg.to)}</div>
    <div class="ttl" style="color:${ship.color}">${escapeHtml(ship.name)}</div>
    <div class="desc">${state}<b style="color:${seg.damaged ? 'var(--lv-damage)' : 'var(--lv-ink)'}">${escapeHtml(bnd ? bnd.name : seg.loc)}</b> · ${escapeHtml(seg.note || '')}</div>`;
  t.classList.add('show');
  moveTip(ev);
}
function moveTip(ev) {
  const t = tipEl(); if (!t) return;
  const pad = 18;
  let x = ev.clientX + pad;
  let y = ev.clientY + pad;
  const rect = t.getBoundingClientRect();
  if (x + rect.width + 20 > window.innerWidth) x = ev.clientX - rect.width - pad;
  if (y + rect.height + 20 > window.innerHeight) y = ev.clientY - rect.height - pad;
  t.style.left = x + 'px';
  t.style.top  = y + 'px';
}
function hideTip() {
  const t = tipEl(); if (!t) return;
  t.classList.remove('show');
}

function showEvtDetail(e) {
  const detail = document.getElementById('line-detail');
  if (!detail) return;
  const shipsHtml = e.ships.map(id => {
    const s = DATA.meta.ships.find(sh => sh.id === id);
    if (!s) return '';
    return `<span class="s" style="background:${hexAlpha(s.color, 0.15)};color:${s.color};border:1px solid ${hexAlpha(s.color, 0.3)}">${escapeHtml(shortName(s))}</span>`;
  }).join('');
  const cas = e.casualties ? `<div class="cas">⚠ ${escapeHtml(e.casualties)}</div>` : '';
  const unv = e.verified === false ? `<span class="unverified">${_L2.unverifiedLabel || 'не підтверджено'}</span>` : '';
  detail.innerHTML = `
    <div class="topline">
      <span>${fmtDate(e.date)}</span>
      <span class="pill t-${e.type}">${TYPE_BADGE[e.type] || e.type.toUpperCase()}</span>
      ${unv}
    </div>
    <h2>${escapeHtml(e.title)}</h2>
    <div class="ships">${shipsHtml}</div>
    <div class="body">${escapeHtml(e.description || '')}</div>
    ${cas}
    <div class="src"><span class="lbl">${_L2.sourcesDetail || 'ДЖЕРЕЛА'}</span>${(e.sources || []).map(escapeHtml).join(' · ') || '—'}</div>
  `;
}
function showSegDetail(ship, seg, bands) {
  const detail = document.getElementById('line-detail');
  if (!detail) return;
  const bnd = bands.find(b => b.key === seg.loc);
  const isRepair = seg.loc === 'kaliningrad' || seg.origLoc === 'astrakhan';
  const stateLbl = seg.damaged ? (_L2.damagedState || 'ПОШКОДЖЕНИЙ') : (isRepair ? (_L2.repairState || 'РЕМОНТ') : (_L2.inServiceState || 'У СТРОЮ'));
  const days = Math.round((+new Date(seg.to) - +new Date(seg.from)) / 86400000);
  detail.innerHTML = `
    <div class="topline">
      <span>${fmtDate(seg.from)} → ${fmtDate(seg.to)}</span>
      <span class="pill">${stateLbl}</span>
    </div>
    <h2 style="color:${ship.color}">${escapeHtml(ship.name)}</h2>
    <div class="ships"><span class="s" style="background:${hexAlpha(ship.color, 0.15)};color:${ship.color};border:1px solid ${hexAlpha(ship.color, 0.3)}">${escapeHtml(shortName(ship))} · № ${escapeHtml(ship.hull_number)}</span></div>
    <div class="body"><b style="color:var(--lv-ink)">${escapeHtml(bnd ? bnd.name : seg.loc)}.</b> ${escapeHtml(seg.note || '')}</div>
    <div class="src"><span class="lbl">${_L2.durationLabel || 'ТРИВАЛІСТЬ'}</span>${days} ${_L2.daysLabel || 'днів'}</div>
  `;
}
function hexAlpha(hex, a) {
  // hex like "#5AA4DD"
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Update header meta (events count, ship count, updated date) ───
function updateMeta() {
  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setText('lv-meta-ships', DATA.meta.ships.length);
  setText('lv-meta-events', DATA.events.length);
  const now = computeNow();
  const ds = String(now.getUTCDate()).padStart(2,'0') + '.' +
             String(now.getUTCMonth()+1).padStart(2,'0') + '.' +
             now.getUTCFullYear();
  setText('lv-meta-updated', ds);
  // period
  let min = Infinity;
  DATA.positions.forEach(p => { const t = +new Date(p.from); if (t < min) min = t; });
  DATA.events.forEach(e => { const t = +new Date(e.date); if (t < min) min = t; });
  // clamp to start-of-war for the line view
  const startTs = Math.min(min, +new Date('2022-01-01'));
  const sd = new Date(Math.max(startTs, +new Date('2022-01-01')));
  const periodStart = sd.getUTCFullYear() + '.' + String(sd.getUTCMonth()+1).padStart(2,'0');
  const periodEnd   = now.getUTCFullYear() + '.' + String(now.getUTCMonth()+1).padStart(2,'0');
  setText('lv-meta-period', `${periodStart} — ${periodEnd}`);
}

// ── Public API ────────────────────────────────────────────────────
let _inited = false;
function _render() {
  buildShipChips();
  buildEventChips();
  updateMeta();
  buildChart();
  buildDossier();
}
window.LineMode = {
  init() {
    if (_inited) return;
    _inited = true;
    _render();
  },
  resume() { /* no-op — SVG is responsive via viewBox */ },
};

})();
