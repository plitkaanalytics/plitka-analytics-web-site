/**
 * Вантажообіг Махачкалинського порту в абсолютних тоннах.
 *
 * Стовпці — наростальний підсумок 2026 року за періодами, які публікує порт.
 * Горизонтальна лінія — весь 2025 рік для масштабу: за вісім місяців 2026-го
 * порт майже дотягнув до цілого попереднього року.
 *
 * Свідомо не зводимо це з відсотками приросту: періоди різної довжини, і
 * відсоток без бази читачеві нічого не каже.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Bar = { label: string; value: number; note?: string };

const DATA: Bar[] = [
  { label: "4 місяці", value: 1.4 },
  { label: "півріччя", value: 2.11, note: "з них наливних 1,57" },
  { label: "8 місяців", value: 2.9 },
];

const YEAR_2025 = 3.5;

const W = 680;
const H = 320;
const PAD = { top: 30, right: 118, bottom: 46, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX = 4;
const GAP = 46;

export default function MakhachkalaGrowth({ data = DATA }: { data?: Bar[] }) {
  const slot = PLOT_W / data.length;
  const barW = slot - GAP;
  const y = (v: number) => PAD.top + PLOT_H - (v / MAX) * PLOT_H;
  const ticks = [0, 1, 2, 3, 4];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Стовпчикова діаграма: вантажообіг Махачкалинського порту в 2026 році наростальним підсумком — 1,4 мільйона тонн за чотири місяці, 2,11 за півріччя, 2,9 за вісім місяців, тоді як за весь 2025 рік порт обробив 3,5 мільйона тонн"
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
            opacity={t === 0 ? 0.9 : 0.3}
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

      <text
        x={PAD.left - 8}
        y={PAD.top - 12}
        textAnchor="end"
        fontSize="10"
        fill="var(--taupe)"
      >
        млн т
      </text>

      {data.map((d, i) => {
        const x = PAD.left + i * slot + GAP / 2;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y(d.value)}
              width={barW}
              height={PAD.top + PLOT_H - y(d.value)}
              rx="4"
              ry="4"
              fill="var(--orange)"
            />
            <text
              x={x + barW / 2}
              y={y(d.value) - 8}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="var(--ink)"
            >
              {String(d.value).replace(".", ",")}
            </text>
            <text
              x={x + barW / 2}
              y={H - 26}
              textAnchor="middle"
              fontSize="12"
              fill="var(--ink)"
            >
              {d.label}
            </text>
            {d.note && (
              <text
                x={x + barW / 2}
                y={H - 11}
                textAnchor="middle"
                fontSize="10"
                fill="var(--taupe)"
              >
                {d.note}
              </text>
            )}
          </g>
        );
      })}

      <line
        x1={PAD.left}
        x2={W - PAD.right + 8}
        y1={y(YEAR_2025)}
        y2={y(YEAR_2025)}
        stroke="var(--rust)"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text
        x={W - PAD.right + 14}
        y={y(YEAR_2025) - 4}
        fontSize="12"
        fontWeight="600"
        fill="var(--rust)"
      >
        3,5
      </text>
      <text
        x={W - PAD.right + 14}
        y={y(YEAR_2025) + 12}
        fontSize="11"
        fill="var(--rust)"
      >
        весь 2025 рік
      </text>

      <text x={PAD.left} y={H - 2} fontSize="10" fill="var(--taupe)">
        2026 рік, наростальним підсумком від січня
      </text>
    </svg>
  );
}
