/**
 * Експорт пшениці з Росії восени 2026 року у відсотках від 2025-го.
 *
 * Показники мають різні одиниці (мільйони тонн, тисячі тонн, кількість
 * країн), тому всі зведено до однієї величини: скільки від торішнього
 * лишилося у 2026 році. Сіра доріжка — 100% торішнього рівня, помаранчева
 * смуга — 2026 рік. Абсолютні значення підписані праворуч.
 *
 * Дані: «Совекон» (липень–вересень, 2026 — оцінка), Російський зерновий союз
 * (друга декада вересня, Новоросійськ, країни-покупці). Російські дані —
 * заявлені.
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const ROWS: {
  uk: string;
  en: string;
  a: number;
  b: number;
  detUk: string;
  detEn: string;
}[] = [
  {
    uk: "Липень–вересень*",
    en: "July–September*",
    a: 11.3,
    b: 5.6,
    detUk: "5,6 з 11,3 млн т",
    detEn: "5.6 of 11.3 mn t",
  },
  {
    uk: "Друга декада вересня",
    en: "Mid-September",
    a: 1300,
    b: 347,
    detUk: "347 тис. т з 1,3 млн",
    detEn: "347k t of 1.3 mn",
  },
  {
    uk: "Країн-покупців",
    en: "Buyer countries",
    a: 29,
    b: 8,
    detUk: "8 з 29",
    detEn: "8 of 29",
  },
  {
    uk: "Через Новоросійськ",
    en: "Via Novorossiysk",
    a: 696,
    b: 72.5,
    detUk: "72,5 тис. т з 696",
    detEn: "72.5k t of 696k",
  },
];

const HEAD: Record<Lang, string> = {
  uk: "2026 рік у відсотках від 2025-го",
  en: "2026 as a percentage of 2025",
};
const NOTE: Record<Lang, string> = {
  uk: "* 2026 — оцінка «Совекона»",
  en: "* 2026 is a SovEcon estimate",
};

const ARIA: Record<Lang, string> = {
  uk: "Смугова діаграма, 2026 рік у відсотках від 2025-го. Експорт пшениці з Росії в липні–вересні — близько 50% торішнього (5,6 з 11,3 мільйона тонн, оцінка «Совекона»). У другій декаді вересня — 27% (347 тисяч тонн з 1,3 мільйона). Країн-покупців — 8 з 29, тобто 28%. Через Новоросійськ — 10% (72,5 тисячі тонн з 696 тисяч)",
  en: "Bar chart, 2026 as a percentage of 2025. Russian wheat exports in July–September are about 50% of last year (5.6 of 11.3 million tonnes, SovEcon estimate). In mid-September, 27% (347 thousand of 1.3 million tonnes). Buyer countries, 8 of 29, or 28%. Via Novorossiysk, 10% (72.5 of 696 thousand tonnes)",
};

const W = 680;
const LABEL_W = 170;
const DET_W = 150;
const TOP = 40;
const ROW_H = 30;
const GAP = 18;
const H = TOP + ROWS.length * (ROW_H + GAP) + 18;
const TRACK_W = W - LABEL_W - DET_W - 24;
const X0 = LABEL_W;

export default function RussiaWheatDrop({ lang = "uk" }: { lang?: Lang }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
    >
      <text x={X0} y={18} fontSize="11" fill="var(--taupe)">
        {HEAD[lang]}
      </text>
      {[0, 50, 100].map((t) => (
        <text
          key={t}
          x={X0 + (t / 100) * TRACK_W}
          y={32}
          textAnchor={t === 0 ? "start" : t === 100 ? "end" : "middle"}
          fontSize="10"
          fill="var(--taupe)"
        >
          {t}%
        </text>
      ))}

      {ROWS.map((r, k) => {
        const top = TOP + k * (ROW_H + GAP);
        const pct = Math.round((r.b / r.a) * 100);
        return (
          <g key={r.uk}>
            <text
              x={X0 - 12}
              y={top + ROW_H / 2 + 4}
              textAnchor="end"
              fontSize="12"
              fill="var(--ink)"
            >
              {lang === "uk" ? r.uk : r.en}
            </text>
            <rect
              x={X0}
              y={top}
              width={TRACK_W}
              height={ROW_H}
              rx="3"
              fill="var(--warm-gray)"
              opacity="0.45"
            />
            <rect
              x={X0}
              y={top}
              width={(pct / 100) * TRACK_W}
              height={ROW_H}
              rx="3"
              fill="var(--orange)"
            />
            <text
              x={X0 + (pct / 100) * TRACK_W + 8}
              y={top + ROW_H / 2 + 5}
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {pct}%
            </text>
            <text
              x={X0 + TRACK_W + 12}
              y={top + ROW_H / 2 + 4}
              fontSize="11"
              fill="var(--taupe)"
            >
              {lang === "uk" ? r.detUk : r.detEn}
            </text>
          </g>
        );
      })}

      <text x={X0} y={H - 6} fontSize="10" fill="var(--taupe)">
        {NOTE[lang]}
      </text>
    </svg>
  );
}
