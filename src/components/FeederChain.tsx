/**
 * Ланцюг фідерної логістики: від волзьких заводів до перевантаження в порту
 * Кавказ. Співвідношення між фідером і океанським танкером — окрема вставка,
 * TankerProportion.
 *
 * Це схема процесу, а не карта: важлива послідовність ланок, а не географія.
 *
 * Рух уздовж ланцюга — CSS усередині SVG, без клієнтського коду. Для
 * prefers-reduced-motion вимикається.
 *
 * Числа — docs/dossiers/kaspiy-teatr/notes.md.
 */

const W = 760;

const laneY = 74;
const H = 130;

export default function FeederChain() {
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
      aria-label="Схема: нафтопродукти з волзьких заводів ідуть Волго-Донським каналом в Азовське море, звідти через Керченську протоку на перевантаження в порту Кавказ"
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
    </svg>
  );
}
