/**
 * Фідерна логістика: як нафтопродукти з волзьких заводів потрапляли на
 * океанські танкери, і де цей ланцюг перерізали.
 *
 * Це схема процесу, а не карта: тут важлива послідовність ланок і
 * співвідношення, а не географія. Карту Каспію малює окремий генератор.
 *
 * Рух уздовж ланцюга — чистий CSS усередині SVG, без клієнтського коду:
 * компонент лишається серверним. Для тих, хто просив зменшити рух у системі,
 * анімація вимикається через prefers-reduced-motion, і схема читається так
 * само, бо сенс несуть підписи й пропорція, а не сам рух.
 *
 * Числа: 7000 тонн у фідера, близько 100 000 у океанського танкера, 14–15
 * рейсів на одне завантаження — docs/dossiers/kaspiy-teatr/notes.md,
 * секція «Механізм».
 */

const W = 760;
const H = 300;

const FEEDERS = 15;

/** Силует наливного судна: ніс праворуч, надбудова на кормі. */
function Ship({
  x,
  y,
  w,
  h,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
}) {
  const d =
    `M${x},${y} L${x + w * 0.82},${y} L${x + w},${y + h * 0.5} ` +
    `L${x + w * 0.82},${y + h} L${x},${y + h} Z`;
  return (
    <g>
      <path d={d} fill={fill} />
      <rect
        x={x + w * 0.04}
        y={y - h * 0.55}
        width={w * 0.18}
        height={h * 0.6}
        fill={fill}
      />
    </g>
  );
}

export default function FeederChain() {
  const laneY = 92;
  const stops = [
    { x: 64, label: "волзькі НПЗ", sub: "Волгоград · Самара · Саратов" },
    { x: 246, label: "Волго-Дон", sub: "13 шлюзів, до 5000 т" },
    { x: 420, label: "Азовське море", sub: "мілке" },
    { x: 600, label: "порт Кавказ", sub: "перевантаження" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Схема: нафтопродукти з волзьких заводів ідуть Волго-Донським каналом в Азовське море, звідти через Керченську протоку на перевантаження в порту Кавказ, де вміст чотирнадцяти-пʼятнадцяти фідерних танкерів по сім тисяч тонн перекачують в один океанський танкер на сто тисяч тонн"
    >
      <style>{`
        .fc-flow { stroke-dasharray: 10 7; animation: fc-march 1.6s linear infinite; }
        @keyframes fc-march { to { stroke-dashoffset: -17; } }
        @media (prefers-reduced-motion: reduce) {
          .fc-flow { animation: none; }
        }
      `}</style>

      <line
        x1={64}
        y1={laneY}
        x2={660}
        y2={laneY}
        stroke="var(--warm-gray)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        className="fc-flow"
        x1={64}
        y1={laneY}
        x2={660}
        y2={laneY}
        stroke="var(--orange)"
        strokeWidth="4"
        strokeLinecap="butt"
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
            y={laneY - 22}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--ink)"
          >
            {s.label}
          </text>
          <text
            x={s.x}
            y={laneY - 7}
            textAnchor="middle"
            fontSize="11"
            fill="var(--taupe)"
          >
            {s.sub}
          </text>
        </g>
      ))}

      <text
        x={520}
        y={laneY + 22}
        textAnchor="middle"
        fontSize="11"
        fill="var(--taupe)"
      >
        Керченська протока
      </text>

      {/* ── Пропорція: чому фідерів так багато ──────────────────────────── */}

      <text x={64} y={178} fontSize="12" fontWeight="600" fill="var(--ink)">
        {FEEDERS} рейсів фідера по 7000 тонн
      </text>
      <g>
        {Array.from({ length: FEEDERS }, (_, i) => (
          <Ship
            key={i}
            x={64 + i * 22}
            y={196}
            w={17}
            h={11}
            fill="var(--taupe)"
          />
        ))}
      </g>

      <text x={64} y={248} fontSize="12" fontWeight="600" fill="var(--ink)">
        один океанський танкер
      </text>
      <Ship x={64} y={264} w={238} h={22} fill="var(--rust)" />

      <text x={400} y={212} fontSize="13" fill="var(--ink)">
        Азов не приймає суден на сто тисяч тонн,
      </text>
      <text x={400} y={230} fontSize="13" fill="var(--ink)">
        тому вантаж збирають у протоці з багатьох
      </text>
      <text x={400} y={248} fontSize="13" fill="var(--ink)">
        дрібних. Виб&apos;єш фідери — стане весь
      </text>
      <text x={400} y={266} fontSize="13" fill="var(--ink)">
        ланцюг, від заводу до покупця.
      </text>
    </svg>
  );
}
