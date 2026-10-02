/**
 * Вантажообіг Махачкалинського порту наростальним підсумком, 2026 проти 2025.
 *
 * Вісь — справжня шкала дванадцяти місяців, обидві криві виходять з нуля.
 * Крапки позначають точки, для яких є опубліковані дані; між ними пряма, бо
 * проміжних місячних значень джерело не дає.
 *
 * Лінія 2026 року — портові підсумки за чотири місяці, півріччя й вісім
 * місяців. Лінія 2025-го — наш розрахунок: ті самі періоди відновлені з
 * опублікованого приросту рік до року (плюс 48%, 50% і 42,5%), плюс відомий
 * підсумок цілого року. Приріст у джерелі округлений, тому торішня крива
 * приблизна, і намальована пунктиром саме тому.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Pt = { month: number; value: number };

const Y2026: Pt[] = [
  { month: 0, value: 0 },
  { month: 4, value: 1.4 },
  { month: 6, value: 2.11 },
  { month: 8, value: 2.9 },
];

const Y2025: Pt[] = [
  { month: 0, value: 0 },
  { month: 4, value: 0.95 },
  { month: 6, value: 1.41 },
  { month: 8, value: 2.04 },
  { month: 12, value: 3.5 },
];

type Lang = "uk" | "en";

const MONTHS: Record<Lang, string[]> = {
  uk: [
    "січ",
    "лют",
    "бер",
    "кві",
    "тра",
    "чер",
    "лип",
    "сер",
    "вер",
    "жов",
    "лис",
    "гру",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

const UNIT: Record<Lang, string> = { uk: "млн т", en: "mn t" };

/** Десятковий роздільник: кома в українській, крапка в англійській. */
const num = (v: number, lang: Lang) =>
  lang === "uk" ? String(v).replace(".", ",") : String(v);

const ARIA: Record<Lang, string> = {
  uk: "Лінійний графік: вантажообіг Махачкалинського порту наростальним підсумком від початку року. У 2026 році 1,4 мільйона тонн на кінець квітня, 2,11 на кінець червня і 2,9 на кінець серпня проти приблизно 0,95, 1,41 і 2,04 за ті самі місяці 2025 року, коли за весь рік порт обробив 3,5 мільйона тонн",
  en: "Line chart: cargo turnover at the port of Makhachkala, cumulative from the start of the year. In 2026, 1.4 million tonnes by the end of April, 2.11 by the end of June and 2.9 by the end of August, against roughly 0.95, 1.41 and 2.04 for the same months of 2025, a year in which the port handled 3.5 million tonnes in total",
};

const W = 680;
const H = 340;
const PAD = { top: 34, right: 78, bottom: 48, left: 46 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX_M = 12;
const MAX_V = 4;

const x = (m: number) => PAD.left + (m / MAX_M) * PLOT_W;
const y = (v: number) => PAD.top + PLOT_H - (v / MAX_V) * PLOT_H;
const path = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${x(p.month)},${y(p.value)}`).join(" ");

export default function MakhachkalaGrowth({ lang = "uk" }: { lang?: Lang }) {
  const vTicks = [0, 1, 2, 3, 4];
  const half = PLOT_W / MAX_M / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
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
        {UNIT[lang]}
      </text>

      {MONTHS[lang].map((name, i) => (
        <g key={name}>
          <line
            x1={x(i + 1)}
            x2={x(i + 1)}
            y1={PAD.top + PLOT_H}
            y2={PAD.top + PLOT_H + 4}
            stroke="var(--warm-gray)"
            strokeWidth="1"
          />
          <text
            x={x(i + 1) - half}
            y={PAD.top + PLOT_H + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--taupe)"
          >
            {name}
          </text>
        </g>
      ))}

      <path
        d={path(Y2025)}
        fill="none"
        stroke="var(--taupe)"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      {Y2025.filter((p) => p.month > 0).map((p) => (
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
      {Y2026.filter((p) => p.month > 0).map((p) => (
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
            {num(p.value, lang)}
          </text>
        </g>
      ))}

      <text
        x={x(8) + 10}
        y={y(2.9) - 4}
        fontSize="12"
        fontWeight="600"
        fill="var(--orange)"
      >
        2026
      </text>
      <text
        x={x(12) + 6}
        y={y(3.5) + 4}
        fontSize="12"
        fontWeight="600"
        fill="var(--taupe)"
      >
        2025
      </text>
      <text x={x(12) + 6} y={y(3.5) + 19} fontSize="11" fill="var(--taupe)">
        {num(3.5, lang)}
      </text>
    </svg>
  );
}
