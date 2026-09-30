/**
 * Приріст вантажообігу Махачкалинського порту рік до року.
 *
 * За 2025 рік джерело дає діапазон 6,5–8%, тому цей стовпець намальовано як
 * смугу невизначеності зі штрихуванням, а не як одну висоту. Періоди 2026-го —
 * наростальні підсумки, кожен порівняно з тим самим періодом попереднього року.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Bar = { label: string; value?: number; range?: [number, number] };

const DATA: Bar[] = [
  { label: "2025 рік", range: [6.5, 8] },
  { label: "4 місяці 2026", value: 48 },
  { label: "півріччя 2026", value: 50 },
  { label: "8 місяців 2026", value: 42.5 },
];

const W = 680;
const H = 300;
const PAD = { top: 28, right: 12, bottom: 44, left: 40 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX = 60;
const GAP = 24;

export default function MakhachkalaGrowth({ data = DATA }: { data?: Bar[] }) {
  const slot = PLOT_W / data.length;
  const barW = slot - GAP;
  const y = (v: number) => PAD.top + PLOT_H - (v / MAX) * PLOT_H;
  const ticks = [0, 20, 40, 60];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Стовпчикова діаграма: приріст вантажообігу Махачкалинського порту рік до року зростає з 6,5–8 відсотків за 2025 рік до 48, 50 і 42,5 відсотка за періоди 2026 року"
    >
      <defs>
        <pattern
          id="mk-hatch"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="6" height="6" fill="var(--white)" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            stroke="var(--orange)"
            strokeWidth="2.5"
          />
        </pattern>
      </defs>

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
            {t}%
          </text>
        </g>
      ))}

      {data.map((d, i) => {
        const x = PAD.left + i * slot + GAP / 2;
        const top = d.range ? d.range[1] : (d.value as number);
        const bottom = d.range ? d.range[0] : 0;
        const yTop = y(top);
        const h = y(bottom) - yTop;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={yTop}
              width={barW}
              height={h}
              rx="4"
              ry="4"
              fill={d.range ? "url(#mk-hatch)" : "var(--orange)"}
              stroke={d.range ? "var(--orange)" : "none"}
              strokeWidth={d.range ? 1 : 0}
            />
            <text
              x={x + barW / 2}
              y={yTop - 8}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {d.range ? `${d.range[0]}–${d.range[1]}%` : `+${d.value}%`}
            </text>
            <text
              x={x + barW / 2}
              y={H - 22}
              textAnchor="middle"
              fontSize="11"
              fill="var(--taupe)"
            >
              {d.label}
            </text>
          </g>
        );
      })}

      <text x={PAD.left} y={H - 4} fontSize="10" fill="var(--taupe)">
        штрихування — діапазон, який дає джерело, а не одне значення
      </text>
    </svg>
  );
}
