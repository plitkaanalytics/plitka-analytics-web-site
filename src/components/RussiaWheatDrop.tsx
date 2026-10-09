/**
 * Експорт пшениці з Росії восени 2026 року проти 2025-го.
 *
 * Три малі панелі, у кожної своя шкала, бо обсяги відрізняються на порядок:
 * сезон липень–вересень (млн т), друга декада вересня (тис. т) і Новоросійськ
 * у ту саму декаду (тис. т). У кожній панелі 2025 рік — taupe, 2026-й —
 * помаранчевий; значення підписані, тож колір не єдиний розрізнювач.
 * Кількість країн-покупців — текстом під панелями, не смугою.
 *
 * Дані: «Совекон» (липень–вересень, вересень 2026 — оцінка), Російський
 * зерновий союз (друга декада вересня). Російські дані — заявлені.
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const PANELS: {
  uk: string;
  en: string;
  unitUk: string;
  unitEn: string;
  a: number;
  b: number;
  max: number;
  estimate?: boolean;
}[] = [
  {
    uk: "Липень–вересень",
    en: "July–September",
    unitUk: "млн т",
    unitEn: "mn t",
    a: 11.3,
    b: 5.6,
    max: 12,
    estimate: true,
  },
  {
    uk: "Друга декада вересня",
    en: "Mid-September",
    unitUk: "тис. т",
    unitEn: "k t",
    a: 1300,
    b: 347,
    max: 1400,
  },
  {
    uk: "Новоросійськ, та сама декада",
    en: "Novorossiysk, same period",
    unitUk: "тис. т",
    unitEn: "k t",
    a: 696,
    b: 72.5,
    max: 750,
  },
];

const BUYERS: Record<Lang, [string, string]> = {
  uk: ["Країн — покупців пшениці в другій декаді вересня:", "29 → 8"],
  en: ["Countries buying Russian wheat in mid-September:", "29 → 8"],
};
const NOTE: Record<Lang, string> = {
  uk: "* 2026 — оцінка «Совекона»",
  en: "* 2026 is a SovEcon estimate",
};

const ARIA: Record<Lang, string> = {
  uk: "Три стовпчикові діаграми. За оцінкою «Совекона», у липні–вересні 2026 року Росія експортує близько 5,6 мільйона тонн пшениці проти 11,3 мільйона роком раніше. У другій декаді вересня — 347 тисяч тонн проти 1,3 мільйона, через Новоросійськ — 72,5 тисячі тонн проти 696 тисяч. Країн-покупців стало 8 замість 29",
  en: "Three bar charts. According to SovEcon, Russia will export about 5.6 million tonnes of wheat in July–September 2026, against 11.3 million a year earlier. In mid-September it shipped 347 thousand tonnes against 1.3 million, and through Novorossiysk 72.5 thousand tonnes against 696 thousand. The number of buyer countries fell from 29 to 8",
};

const fmt = (v: number, lang: Lang) => {
  const s =
    v >= 1000 ? v.toLocaleString(lang === "uk" ? "uk-UA" : "en-US") : String(v);
  return lang === "uk" ? s.replace(".", ",") : s;
};

const W = 680;
const H = 330;
const PAD = { top: 44, bottom: 78, side: 16 };
const PANEL_W = (W - PAD.side * 2) / 3;
const PH = H - PAD.top - PAD.bottom;
const BAR_W = 52;

export default function RussiaWheatDrop({ lang = "uk" }: { lang?: Lang }) {
  const base = PAD.top + PH;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
    >
      {PANELS.map((p, k) => {
        const cx = PAD.side + PANEL_W * k + PANEL_W / 2;
        const h = (v: number) => (v / p.max) * PH;
        const bars = [
          { v: p.a, year: "2025", fill: "var(--taupe)", x: cx - BAR_W - 6 },
          {
            v: p.b,
            year: p.estimate ? "2026*" : "2026",
            fill: "var(--orange)",
            x: cx + 6,
          },
        ];
        return (
          <g key={p.uk}>
            <text
              x={cx}
              y={18}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--ink)"
            >
              {lang === "uk" ? p.uk : p.en}
            </text>
            <text
              x={cx}
              y={33}
              textAnchor="middle"
              fontSize="10"
              fill="var(--taupe)"
            >
              {lang === "uk" ? p.unitUk : p.unitEn}
            </text>
            <line
              x1={cx - BAR_W - 18}
              x2={cx + BAR_W + 18}
              y1={base}
              y2={base}
              stroke="var(--warm-gray)"
              strokeWidth="1"
            />
            {bars.map((b) => (
              <g key={b.year}>
                <rect
                  x={b.x}
                  y={base - h(b.v)}
                  width={BAR_W}
                  height={h(b.v)}
                  rx="3"
                  fill={b.fill}
                />
                <text
                  x={b.x + BAR_W / 2}
                  y={base - h(b.v) - 7}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {fmt(b.v, lang)}
                </text>
                <text
                  x={b.x + BAR_W / 2}
                  y={base + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--taupe)"
                >
                  {b.year}
                </text>
              </g>
            ))}
          </g>
        );
      })}

      <text x={PAD.side} y={H - 30} fontSize="12" fill="var(--taupe)">
        {BUYERS[lang][0]}{" "}
        <tspan fontWeight="600" fill="var(--ink)">
          {BUYERS[lang][1]}
        </tspan>
      </text>
      <text x={PAD.side} y={H - 12} fontSize="10" fill="var(--taupe)">
        {NOTE[lang]}
      </text>
    </svg>
  );
}
