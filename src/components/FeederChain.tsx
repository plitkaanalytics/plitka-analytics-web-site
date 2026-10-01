/**
 * Фідерна логістика: як нафтопродукти з волзьких заводів потрапляли на
 * океанські танкери.
 *
 * Це схема процесу, а не карта: тут важлива послідовність ланок і
 * співвідношення, а не географія.
 *
 * Пропорція показана шириною, а не числом: ряд із пʼятнадцяти фідерів займає
 * рівно стільки, скільки один океанський танкер. Судна — реальні знімки з
 * Вікісховища, а не мальовані силуети: «Волгонефть-239» саме того типу, який
 * ходив Волго-Доном, і знятий він на Волзі.
 *
 * Рух уздовж ланцюга — чистий CSS усередині SVG, без клієнтського коду, тож
 * компонент лишається серверним. Для prefers-reduced-motion анімація
 * вимикається, і схема читається так само: сенс несуть підписи й пропорція.
 *
 * Числа: 7000 тонн у фідера, близько 100 000 у океанського танкера, 14–15
 * рейсів на одне завантаження — docs/dossiers/kaspiy-teatr/notes.md.
 */

const W = 760;
const H = 330;

const FEEDERS = 15;
const ROW_Y = 176;
const FEEDER_W = 760 / FEEDERS;
const FEEDER_H = Math.round((FEEDER_W * 143) / 600);

const TANKER_Y = 246;
const TANKER_H = Math.round((W * 281) / 1200);

export default function FeederChain() {
  const laneY = 86;
  const stops = [
    { x: 60, label: "волзькі НПЗ", sub: "Волгоград · Самара · Саратов" },
    { x: 250, label: "Волго-Дон", sub: "13 шлюзів, до 5000 т" },
    { x: 440, label: "Азовське море", sub: "мілке" },
    { x: 650, label: "порт Кавказ", sub: "перевантаження" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Схема: нафтопродукти з волзьких заводів ідуть Волго-Донським каналом в Азовське море, звідти через Керченську протоку на перевантаження в порту Кавказ. Нижче — ряд із пʼятнадцяти фідерних танкерів по сім тисяч тонн, який за шириною дорівнює одному океанському танкеру на сто тисяч тонн"
    >
      <style>{`
        .fc-flow { stroke-dasharray: 10 7; animation: fc-march 1.6s linear infinite; }
        @keyframes fc-march { to { stroke-dashoffset: -17; } }
        @media (prefers-reduced-motion: reduce) { .fc-flow { animation: none; } }
      `}</style>

      <line
        x1={60}
        y1={laneY}
        x2={700}
        y2={laneY}
        stroke="var(--warm-gray)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        className="fc-flow"
        x1={60}
        y1={laneY}
        x2={700}
        y2={laneY}
        stroke="var(--orange)"
        strokeWidth="4"
      />

      {stops.map((s) => (
        <g key={s.label}>
          <circle
            cx={s.x}
            cy={laneY}
            r="7"
            fill="var(--ink)"
            stroke="var(--white)"
            strokeWidth="2"
          />
          <text
            x={s.x}
            y={laneY - 24}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--ink)"
          >
            {s.label}
          </text>
          <text
            x={s.x}
            y={laneY - 9}
            textAnchor="middle"
            fontSize="11"
            fill="var(--taupe)"
          >
            {s.sub}
          </text>
        </g>
      ))}

      <text
        x={545}
        y={laneY + 22}
        textAnchor="middle"
        fontSize="11"
        fill="var(--taupe)"
      >
        Керченська протока
      </text>

      {/* ── Пропорція: ряд фідерів дорівнює одному танкеру ─────────────── */}

      <text
        x={0}
        y={ROW_Y - 12}
        fontSize="13"
        fontWeight="600"
        fill="var(--ink)"
      >
        15 рейсів фідера «Волгонефть», по 7000 тонн
      </text>
      {Array.from({ length: FEEDERS }, (_, i) => (
        <image
          key={i}
          href="/articles/rezervne-more/feeder-volgoneft.webp"
          x={i * FEEDER_W}
          y={ROW_Y}
          width={FEEDER_W}
          height={FEEDER_H}
          preserveAspectRatio="xMidYMid slice"
        />
      ))}

      <text
        x={0}
        y={TANKER_Y - 12}
        fontSize="13"
        fontWeight="600"
        fill="var(--rust)"
      >
        один океанський танкер, близько 100 000 тонн
      </text>
      <image
        href="/articles/rezervne-more/tanker-vlcc.webp"
        x={0}
        y={TANKER_Y}
        width={W}
        height={TANKER_H}
      />
    </svg>
  );
}
