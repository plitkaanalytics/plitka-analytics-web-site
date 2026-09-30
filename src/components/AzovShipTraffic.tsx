/**
 * Судна з активними AIS-транспондерами в Азовському морі й Керченській протоці,
 * 30 червня — 11 липня 2026. Дані ISW / Starboard Maritime Intelligence,
 * перемальовані в палітру видання.
 *
 * Статичний SVG: сторінка статті — серверний компонент, стану тут немає.
 * Позначка початку операції «МоЛоЧКа» — тонка вертикаль, а не межа спаду:
 * спад почався раніше за операцію, і графік це показує чесно.
 */

type Point = { label: string; value: number };

const DATA: Point[] = [
  { label: "30.06", value: 267 },
  { label: "01.07", value: 275 },
  { label: "02.07", value: 245 },
  { label: "03.07", value: 220 },
  { label: "04.07", value: 191 },
  { label: "05.07", value: 196 },
  { label: "06.07", value: 194 },
  { label: "07.07", value: 201 },
  { label: "08.07", value: 201 },
  { label: "09.07", value: 192 },
  { label: "10.07", value: 158 },
  { label: "11.07", value: 120 },
];

const W = 680;
const H = 300;
const PAD = { top: 24, right: 12, bottom: 34, left: 38 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX = 300;
const GAP = 2; // проміжок поверхні між сусідніми стовпцями

export default function AzovShipTraffic({ data = DATA }: { data?: Point[] }) {
  const slot = PLOT_W / data.length;
  const barW = slot - GAP;
  const y = (v: number) => PAD.top + PLOT_H - (v / MAX) * PLOT_H;
  const ticks = [0, 100, 200, 300];
  // підписуємо не кожен стовпець, а початок, пік і два останні
  const labelled = new Set([0, 1, data.length - 2, data.length - 1]);
  const opIndex = data.findIndex((d) => d.label === "06.07");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Стовпчикова діаграма: кількість суден з активними AIS-транспондерами в Азовському морі падає з 275 першого липня до 120 одинадцятого липня 2026 року"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={y(t)}
            y2={y(t)}
            stroke="var(--warm-gray)"
            strokeWidth="1"
            opacity={t === 0 ? 0.9 : 0.35}
          />
          <text
            x={PAD.left - 8}
            y={y(t) + 4}
            textAnchor="end"
            fontSize="11"
            fill="var(--taupe)"
          >
            {t}
          </text>
        </g>
      ))}

      {opIndex >= 0 && (
        <g>
          <line
            x1={PAD.left + opIndex * slot - GAP / 2}
            x2={PAD.left + opIndex * slot - GAP / 2}
            y1={PAD.top - 6}
            y2={PAD.top + PLOT_H}
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.55"
          />
          <text
            x={PAD.left + opIndex * slot + 4}
            y={PAD.top - 10}
            fontSize="11"
            fill="var(--ink)"
          >
            6 липня — початок «МоЛоЧКи»
          </text>
        </g>
      )}

      {data.map((d, i) => {
        const x = PAD.left + i * slot;
        const h = PAD.top + PLOT_H - y(d.value);
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y(d.value)}
              width={barW}
              height={h}
              rx="4"
              ry="4"
              fill="var(--rust)"
            />
            {labelled.has(i) && (
              <text
                x={x + barW / 2}
                y={y(d.value) - 6}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--ink)"
              >
                {d.value}
              </text>
            )}
            <text
              x={x + barW / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="10"
              fill="var(--taupe)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
