// English locale for fleet-engine infographics.
// Loaded by *-en.html before fleet-engine-app1.js / fleet-engine-app2.js.
window.FLEET_LOCALE = {
  // ── Calendar ──────────────────────────────────────────────────────
  months:      ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  monthsUpper: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
  weekdays:    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

  // ── Event type labels (map sidebar) ───────────────────────────────
  typeLabels: {
    position:        'Base',
    transit:         'Transit',
    strike_outgoing: 'Strike from ship',
    strike_incoming: 'Strike on ship',
    incident:        'Incident',
    command:         'Command',
    operation:       'Operation',
    context:         'Context',
  },

  // ── Event type badges (line chart) ────────────────────────────────
  typeBadge: {
    strike_outgoing: 'STRIKE ON TARGET',
    strike_incoming: 'SHIP STRIKE',
    incident:        'INCIDENT',
    command:         'COMMAND',
    operation:       'OPERATION',
    context:         'CONTEXT',
    transit:         'TRANSIT',
  },

  // ── Map waterway tooltips ─────────────────────────────────────────
  waterwayVolgaBalt: 'Volga-Baltic Waterway (VBW)',
  waterwayWSBC:      'White Sea-Baltic Canal (WSBC)',
  waterwayVolga:     'Volga River',
  waterwayVolgaDon:  'Volga-Don Canal (VDC)',

  // ── Event list (map/timeline panel) ───────────────────────────────
  noEvents:        'No events match current filters.',
  currentEvent:    'Current event',
  earlier:         'Earlier · from ',
  next:            'Next',
  today:           'today',
  daysSuffix:      'd',
  unverifiedBadge: '⚠ Unverified',
  attrUnverified:  '⚠ Attribution unverified',
  locationLabel:   'Location',
  shipLabel:       'Ship',
  casualtiesLabel: 'Casualties: ',
  sourcesLabel:    'Sources',

  // ── Line chart / dossier ──────────────────────────────────────────
  // allBands: fallback used when DATA.meta.all_bands is absent
  allBands: [
    { key: 'caspian',      name: 'Caspian',           sub: 'Kaspiysk · Astrakhan · Volga' },
    { key: 'sevastopol',   name: 'Sevastopol',        sub: 'BSF Main Naval Base' },
    { key: 'novorossiysk', name: 'Novorossiysk',      sub: 'BSF · Temryuk Bay · Azov Sea' },
    { key: 'med',          name: 'Mediterranean Sea', sub: 'Tartus · Bosphorus · transit' },
    { key: 'baltic',       name: 'Baltic',            sub: 'Baltiysk · Kronstadt · Lake Onega' },
  ],

  inService:    'in service',
  damaged:      'damaged',
  currentBase:  'Current base',
  statusLabel:  'Status',

  summaryMed:      (date)  => `In the Mediterranean Sea from ${date}. The Bosphorus closed behind it. <b>Did not return to the Black Sea.</b>`,
  summaryLaunches: (n)     => `Cruise missile launches: <b>${n}</b>.`,
  summaryDamaged:  (dates) => `Damaged: <b>${dates}</b>.`,

  todayLine:      'TODAY · ',
  damagedSeg:     'DAMAGED · ',
  repairSeg:      'REPAIR · ',
  unverifiedLabel: 'unverified',
  sourcesDetail:  'SOURCES',
  damagedState:   'DAMAGED',
  repairState:    'REPAIR',
  inServiceState: 'IN SERVICE',
  durationLabel:  'DURATION',
  daysLabel:      'days',
};
