/**
 * Парадокс 2026 року: Urals подорожчав удвічі, а нафтогазові доходи бюджету
 * Росії впали.
 *
 * Дві різні величини — два різні графіки, розділені вертикальною лінією:
 * ліворуч ціна Urals у часі (лінія з трьома точками, для яких є дані:
 * кінець лютого, пік 8 квітня, кінець вересня), праворуч нафтогазові доходи
 * федерального бюджету за січень–вересень 2025 і 2026 років (стовпці).
 *
 * Дані: Reuters через The Insider (ціна, доходи), Мінфін РФ — дані заявлені.
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

/** Місяць як дробове число: 2 = 1 лютого, 2.9 ≈ кінець лютого */
const PRICE: { m: number; v: number; label: Record<Lang, string> }[] = [
  { m: 2.9, v: 45, label: { uk: "≈45", en: "≈45" } },
  { m: 4.25, v: 113.89, label: { uk: "113,89", en: "113.89" } },
  { m: 9.95, v: 92, label: { uk: ">92", en: ">92" } },
];
const REV = [
  { year: "2025", v: 6.61, now: false },
  { year: "2026", v: 5.47, now: true },
];

const MONTHS: Record<Lang, string[]> = {
  uk: ["лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер"],
  en: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
};

const T: Record<Lang, Record<string, string>> = {
  uk: {
    p: "Ціна Urals, 2026",
    pu: "дол. за барель",
    war: "28.02 — війна з Іраном",
    r: "Нафтогазові доходи РФ",
    ru: "бюджет, трлн руб., січень–вересень",
  },
  en: {
    p: "Urals price, 2026",
    pu: "USD per barrel",
    war: "28 Feb — Iran war",
    r: "Russia's oil and gas revenue",
    ru: "budget, RUB trn, January–September",
  },
};

const ARIA: Record<Lang, string> = {
  uk: "Ліворуч лінійний графік: ціна Urals зросла з приблизно 45 доларів за барель наприкінці лютого 2026 року до піку 113,89 долара 8 квітня і трималася понад 92 долари наприкінці вересня. Праворуч стовпчики: нафтогазові доходи федерального бюджету Росії за січень–вересень знизилися з 6,61 трильйона рублів у 2025 році до 5,47 трильйона у 2026-му, на 17%",
  en: "Left, a line chart: the Urals price rose from about 45 dollars a barrel at the end of February 2026 to a peak of 113.89 dollars on 8 April and stayed above 92 dollars at the end of September. Right, bars: Russia's federal oil and gas revenue for January–September fell from 6.61 trillion roubles in 2025 to 5.47 trillion in 2026, a drop of 17%",
};

const num = (v: number, lang: Lang) =>
  lang === "uk" ? String(v).replace(".", ",") : String(v);

const W = 680;
const H = 300;
const TOP = 58;
const BOTTOM = 40;
const PH = H - TOP - BOTTOM;
const L = { x0: 44, x1: 420 };
const DIV = 452;
const R = { x0: 484, x1: 668 };

const px = (m: number) => L.x0 + ((m - 2) / 8) * (L.x1 - L.x0);
const py = (v: number) => TOP + PH - (v / 120) * PH;
const ry = (v: number) => TOP + PH - (v / 7) * PH;

export default function UralsVsRevenue({ lang = "uk" }: { lang?: Lang }) {
  const t = T[lang];
  const line = PRICE.map(
    (p, i) => `${i ? "L" : "M"}${px(p.m)},${py(p.v)}`,
  ).join(" ");
  const rw = 56;
  const rStep = (R.x1 - R.x0) / REV.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
    >
      {/* Ліва панель: ціна в часі */}
      <text x={L.x0} y={20} fontSize="12" fontWeight="600" fill="var(--ink)">
        {t.p}
      </text>
      <text x={L.x0} y={36} fontSize="10" fill="var(--taupe)">
        {t.pu}
      </text>
      {[0, 40, 80, 120].map((v) => (
        <g key={v}>
          <line
            x1={L.x0}
            x2={L.x1}
            y1={py(v)}
            y2={py(v)}
            stroke="var(--warm-gray)"
            strokeWidth="1"
            opacity={v === 0 ? 0.9 : 0.3}
          />
          <text
            x={L.x0 - 8}
            y={py(v) + 4}
            textAnchor="end"
            fontSize="11"
            fill="var(--taupe)"
          >
            {v}
          </text>
        </g>
      ))}
      {MONTHS[lang].map((name, i) => (
        <text
          key={name}
          x={px(i + 2.5)}
          y={TOP + PH + 18}
          textAnchor="middle"
          fontSize="10"
          fill="var(--taupe)"
        >
          {name}
        </text>
      ))}
      <line
        x1={px(2.9)}
        x2={px(2.9)}
        y1={TOP - 4}
        y2={TOP + PH}
        stroke="var(--warm-gray)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <text x={px(2.9) + 6} y={TOP + PH - 8} fontSize="10" fill="var(--taupe)">
        {t.war}
      </text>
      <path d={line} fill="none" stroke="var(--orange)" strokeWidth="3" />
      {PRICE.map((p) => (
        <g key={p.m}>
          <circle
            cx={px(p.m)}
            cy={py(p.v)}
            r="5"
            fill="var(--orange)"
            stroke="var(--white)"
            strokeWidth="2"
          />
          <text
            x={px(p.m) + (p.m > 9 ? -8 : 0)}
            y={py(p.v) - 10}
            textAnchor={p.m > 9 ? "end" : "middle"}
            fontSize="13"
            fontWeight="600"
            fill="var(--ink)"
          >
            {p.label[lang]}
          </text>
        </g>
      ))}

      {/* Розділювач */}
      <line
        x1={DIV}
        x2={DIV}
        y1={10}
        y2={H - 10}
        stroke="var(--warm-gray)"
        strokeWidth="1"
      />

      {/* Права панель: доходи */}
      <text x={R.x0} y={20} fontSize="12" fontWeight="600" fill="var(--ink)">
        {t.r}
      </text>
      <text x={R.x0} y={36} fontSize="10" fill="var(--taupe)">
        {t.ru}
      </text>
      <line
        x1={R.x0}
        x2={R.x1}
        y1={ry(0)}
        y2={ry(0)}
        stroke="var(--warm-gray)"
        strokeWidth="1"
      />
      {REV.map((r, k) => {
        const bx = R.x0 + rStep * k + (rStep - rw) / 2;
        return (
          <g key={r.year}>
            <rect
              x={bx}
              y={ry(r.v)}
              width={rw}
              height={ry(0) - ry(r.v)}
              rx="3"
              fill={r.now ? "var(--orange)" : "var(--taupe)"}
            />
            <text
              x={bx + rw / 2}
              y={ry(r.v) - 7}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {num(r.v, lang)}
            </text>
            <text
              x={bx + rw / 2}
              y={ry(0) + 18}
              textAnchor="middle"
              fontSize="11"
              fill="var(--taupe)"
            >
              {r.year}
            </text>
            {r.now && (
              <text
                x={bx + rw / 2}
                y={ry(r.v) + 22}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--white)"
              >
                −17%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
