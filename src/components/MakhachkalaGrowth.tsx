/**
 * Вантажообіг Махачкалинського порту наростальним підсумком, 2026 проти 2025.
 *
 * Лінія 2026 року — опубліковані портові підсумки за чотири місяці,
 * півріччя й вісім місяців. Лінія 2025-го — **наш розрахунок**: ті самі
 * періоди відновлені з опублікованого приросту рік до року (плюс 48%, 50% і
 * 42,5%), плюс відомий підсумок цілого року. Приріст у джерелі округлений,
 * тому торішня крива приблизна, і намальована пунктиром саме тому.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Pt = { month: number; value: number };

const Y2026: Pt[] = [
  { month: 4, value: 1.4 },
  { month: 6, value: 2.11 },
  { month: 8, value: 2.9 },
];

const Y2025: Pt[] = [
  { month: 4, value: 0.95 },
  { month: 6, value: 1.41 },
  { month: 8, value: 2.04 },
  { month: 12, value: 3.5 },
];

const W = 680;
const H = 340;
const PAD = { top: 34, right: 96, bottom: 52, left: 46 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX_M = 12;
const MAX_V = 4;

const x = (m: number) => PAD.left + (m / MAX_M) * PLOT_W;
const y = (v: number) => PAD.top + PLOT_H - (v / MAX_V) * PLOT_H;
const path = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${x(p.month)},${y(p.value)}`).join(" ");

export default function MakhachkalaGrowth() {
  const vTicks = [0, 1, 2, 3, 4];
  const mTicks = [
    { m: 4, label: "4 міс." },
    { m: 6, label: "півріччя" },
    { m: 8, label: "8 міс." },
    { m: 12, label: "рік" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Лінійний графік: вантажообіг Махачкалинського порту наростальним підсумком. У 2026 році 1,4 мільйона тонн за чотири місяці, 2,11 за півріччя і 2,9 за вісім місяців проти приблизно 0,95, 1,41 і 2,04 за ті самі періоди 2025 року, коли за весь рік порт обробив 3,5 мільйона тонн"
    >
      {vTicks.map((t) => (
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
        y={PAD.top - 14}
        textAnchor="end"
        fontSize="10"
        fill="var(--taupe)"
      >
        млн т
      </text>

      {mTicks.map((t) => (
        <text
          key={t.m}
          x={x(t.m)}
          y={H - 30}
          textAnchor="middle"
          fontSize="11"
          fill="var(--taupe)"
        >
          {t.label}
        </text>
      ))}

      <path
        d={path(Y2025)}
        fill="none"
        stroke="var(--taupe)"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      {Y2025.map((p) => (
        <circle
          key={p.month}
          cx={x(p.month)}
          cy={y(p.value)}
          r="4"
          fill="var(--taupe)"
        />
      ))}

      <path
        d={path(Y2026)}
        fill="none"
        stroke="var(--orange)"
        strokeWidth="3"
      />
      {Y2026.map((p) => (
        <g key={p.month}>
          <circle
            cx={x(p.month)}
            cy={y(p.value)}
            r="5.5"
            fill="var(--orange)"
            stroke="var(--white)"
            strokeWidth="2"
          />
          <text
            x={x(p.month)}
            y={y(p.value) - 12}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--ink)"
          >
            {String(p.value).replace(".", ",")}
          </text>
        </g>
      ))}

      <text
        x={x(8) + 12}
        y={y(2.9) + 4}
        fontSize="12"
        fontWeight="600"
        fill="var(--orange)"
      >
        2026
      </text>
      <text
        x={x(12) + 8}
        y={y(3.5) + 4}
        fontSize="12"
        fontWeight="600"
        fill="var(--taupe)"
      >
        2025
      </text>
      <text x={x(12) + 8} y={y(3.5) + 19} fontSize="11" fill="var(--taupe)">
        3,5 за рік
      </text>

      <text x={PAD.left} y={H - 8} fontSize="10" fill="var(--taupe)">
        торішня крива відновлена з опублікованого приросту, тому пунктир
      </text>
    </svg>
  );
}
