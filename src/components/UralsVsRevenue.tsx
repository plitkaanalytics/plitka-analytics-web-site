/**
 * Парадокс 2026 року: Urals подорожчав удвічі, а нафтогазові доходи бюджету
 * Росії впали.
 *
 * Дві окремі панелі з власними шкалами замість графіка з двома осями: ліворуч
 * ціна Urals у трьох точках, для яких є дані (до 28.02, пік 8.04, кінець
 * вересня), праворуч нафтогазові доходи федерального бюджету за
 * січень–вересень 2025 і 2026 років. Значення підписані.
 *
 * Дані: Reuters через The Insider (ціна, доходи), Мінфін РФ — дані заявлені.
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const PRICE: { uk: string; en: string; v: number; peak?: boolean }[] = [
  { uk: "до 28 лютого", en: "before 28 Feb", v: 45 },
  { uk: "8 квітня, пік", en: "8 Apr, peak", v: 113.89, peak: true },
  { uk: "кінець вересня", en: "end of Sep", v: 92 },
];
const REV = [
  { year: "2025", v: 6.61, now: false },
  { year: "2026", v: 5.47, now: true },
];

const T: Record<Lang, Record<string, string>> = {
  uk: {
    p: "Ціна Urals",
    pu: "дол. за барель",
    r: "Нафтогазові доходи бюджету РФ",
    ru: "трлн руб., січень–вересень",
    approx: "≈",
  },
  en: {
    p: "Urals price",
    pu: "USD per barrel",
    r: "Russia's oil and gas budget revenue",
    ru: "RUB trn, January–September",
    approx: "≈",
  },
};

const ARIA: Record<Lang, string> = {
  uk: "Дві стовпчикові діаграми. Ціна Urals зросла з приблизно 45 доларів за барель до 28 лютого 2026 року до піку 113,89 долара 8 квітня і понад 92 долари наприкінці вересня. Водночас нафтогазові доходи федерального бюджету Росії за січень–вересень знизилися з 6,61 трильйона рублів у 2025 році до 5,47 трильйона у 2026-му, на 17%",
  en: "Two bar charts. The Urals price rose from about 45 dollars a barrel before 28 February 2026 to a peak of 113.89 dollars on 8 April and over 92 dollars at the end of September. Meanwhile, Russia's federal oil and gas revenue for January–September fell from 6.61 trillion roubles in 2025 to 5.47 trillion in 2026, a drop of 17%",
};

const num = (v: number, lang: Lang) =>
  lang === "uk" ? String(v).replace(".", ",") : String(v);

const W = 680;
const H = 320;
const PAD = { top: 56, bottom: 52 };
const PH = H - PAD.top - PAD.bottom;
const LEFT = { x0: 20, w: 380 };
const RIGHT = { x0: 450, w: 210 };

export default function UralsVsRevenue({ lang = "uk" }: { lang?: Lang }) {
  const base = PAD.top + PH;
  const hp = (v: number) => (v / 120) * PH;
  const hr = (v: number) => (v / 7) * PH;
  const pw = 74;
  const pStep = LEFT.w / PRICE.length;
  const rw = 58;
  const rStep = RIGHT.w / REV.length;
  const t = T[lang];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
    >
      {/* Ліва панель: ціна */}
      <text x={LEFT.x0} y={20} fontSize="12" fontWeight="600" fill="var(--ink)">
        {t.p}
      </text>
      <text x={LEFT.x0} y={36} fontSize="10" fill="var(--taupe)">
        {t.pu}
      </text>
      <line
        x1={LEFT.x0}
        x2={LEFT.x0 + LEFT.w}
        y1={base}
        y2={base}
        stroke="var(--warm-gray)"
        strokeWidth="1"
      />
      {PRICE.map((p, k) => {
        const bx = LEFT.x0 + pStep * k + (pStep - pw) / 2;
        return (
          <g key={p.uk}>
            <rect
              x={bx}
              y={base - hp(p.v)}
              width={pw}
              height={hp(p.v)}
              rx="3"
              fill={k === 0 ? "var(--taupe)" : "var(--orange)"}
            />
            <text
              x={bx + pw / 2}
              y={base - hp(p.v) - 7}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {k === 0
                ? `${t.approx}${num(p.v, lang)}`
                : k === 2
                  ? `>${num(p.v, lang)}`
                  : num(p.v, lang)}
            </text>
            <text
              x={bx + pw / 2}
              y={base + 18}
              textAnchor="middle"
              fontSize="11"
              fill="var(--taupe)"
            >
              {lang === "uk" ? p.uk : p.en}
            </text>
          </g>
        );
      })}

      {/* Права панель: доходи */}
      <text
        x={RIGHT.x0}
        y={20}
        fontSize="12"
        fontWeight="600"
        fill="var(--ink)"
      >
        {t.r}
      </text>
      <text x={RIGHT.x0} y={36} fontSize="10" fill="var(--taupe)">
        {t.ru}
      </text>
      <line
        x1={RIGHT.x0}
        x2={RIGHT.x0 + RIGHT.w}
        y1={base}
        y2={base}
        stroke="var(--warm-gray)"
        strokeWidth="1"
      />
      {REV.map((r, k) => {
        const bx = RIGHT.x0 + rStep * k + (rStep - rw) / 2;
        return (
          <g key={r.year}>
            <rect
              x={bx}
              y={base - hr(r.v)}
              width={rw}
              height={hr(r.v)}
              rx="3"
              fill={r.now ? "var(--orange)" : "var(--taupe)"}
            />
            <text
              x={bx + rw / 2}
              y={base - hr(r.v) - 7}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {num(r.v, lang)}
            </text>
            <text
              x={bx + rw / 2}
              y={base + 18}
              textAnchor="middle"
              fontSize="11"
              fill="var(--taupe)"
            >
              {r.year}
            </text>
            {r.now && (
              <text
                x={bx + rw + 8}
                y={base - hr(r.v) + 16}
                fontSize="12"
                fontWeight="600"
                fill="var(--ink)"
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
