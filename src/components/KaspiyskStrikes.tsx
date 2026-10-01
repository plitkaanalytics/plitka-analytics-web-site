/**
 * Удари по каспійських цілях, листопад 2024 — вересень 2026.
 *
 * Один стовпчик — один удар. Опису подій тут немає навмисне: він у тексті, а
 * вставка показує те, чого абзац не показує — щільність у часі. Видно паузу
 * завдовжки рік, грудневу серію по нафтовидобутку, травневу по кораблях і
 * вересневе згущення.
 *
 * Колір несе клас цілі й продубльований легендою, щоб не спиратися на нього
 * самотужки.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Kind = "carrier" | "other" | "unconfirmed";

type Strike = { date: string; kind: Kind };

const STRIKES: Strike[] = [
  { date: "2024-11-06", kind: "unconfirmed" },
  { date: "2024-11-30", kind: "unconfirmed" },
  { date: "2025-12-01", kind: "unconfirmed" },
  { date: "2025-12-11", kind: "other" },
  { date: "2025-12-12", kind: "other" },
  { date: "2025-12-15", kind: "other" },
  { date: "2025-12-19", kind: "other" },
  { date: "2026-05-07", kind: "carrier" },
  { date: "2026-05-15", kind: "other" },
  { date: "2026-05-17", kind: "other" },
  { date: "2026-07-25", kind: "other" },
  { date: "2026-09-10", kind: "other" },
  { date: "2026-09-11", kind: "other" },
  { date: "2026-09-19", kind: "unconfirmed" },
];

const FILL: Record<Kind, string> = {
  carrier: "var(--rust)",
  other: "var(--taupe)",
  unconfirmed: "var(--warm-gray)",
};

const LEGEND: { kind: Kind; label: string }[] = [
  { kind: "carrier", label: "носій «Калібрів»" },
  { kind: "other", label: "інші кораблі та інфраструктура" },
  { kind: "unconfirmed", label: "без підтвердження" },
];

const W = 680;
const H = 190;
const PAD = { top: 18, right: 14, bottom: 58, left: 14 };
const PLOT_W = W - PAD.left - PAD.right;
const BAR_H = 64;
const BASE = PAD.top + BAR_H;

const START = Date.UTC(2024, 9, 1); // 1 жовтня 2024
const END = Date.UTC(2026, 9, 1); // 1 жовтня 2026
const span = END - START;

const x = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return PAD.left + ((Date.UTC(y, m - 1, d) - START) / span) * PLOT_W;
};

export default function KaspiyskStrikes() {
  const quarters: { at: number; label: string }[] = [];
  for (let y = 2024; y <= 2026; y++) {
    for (let m = 0; m < 12; m += 3) {
      const t = Date.UTC(y, m, 1);
      if (t < START || t > END) continue;
      quarters.push({
        at: PAD.left + ((t - START) / span) * PLOT_W,
        label: m === 0 ? String(y) : ["", "кві", "лип", "жов"][m / 3],
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Смуга ударів по каспійських цілях від листопада 2024 до вересня 2026 року: два удари в листопаді 2024, пауза завдовжки рік, пʼять ударів у грудні 2025 переважно по нафтовидобутку, три в травні 2026, один у липні і три у вересні"
    >
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={BASE}
        y2={BASE}
        stroke="var(--ink)"
        strokeWidth="1.5"
      />

      {quarters.map((q) => (
        <g key={q.label + q.at}>
          <line
            x1={q.at}
            x2={q.at}
            y1={BASE}
            y2={BASE + 5}
            stroke="var(--warm-gray)"
            strokeWidth="1"
          />
          <text
            x={q.at}
            y={BASE + 19}
            textAnchor="middle"
            fontSize={q.label.length === 4 ? "12" : "10"}
            fontWeight={q.label.length === 4 ? "600" : "400"}
            fill={q.label.length === 4 ? "var(--ink)" : "var(--taupe)"}
          >
            {q.label}
          </text>
        </g>
      ))}

      {STRIKES.map((s) => (
        <rect
          key={s.date}
          x={x(s.date) - 3}
          y={BASE - BAR_H}
          width="6"
          height={BAR_H}
          rx="2"
          fill={FILL[s.kind]}
        />
      ))}

      {LEGEND.map((l, i) => (
        <g
          key={l.kind}
          transform={`translate(${PAD.left + i * 215}, ${H - 14})`}
        >
          <rect width="10" height="10" y="-9" rx="2" fill={FILL[l.kind]} />
          <text x="16" y="0" fontSize="11" fill="var(--taupe)">
            {l.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
