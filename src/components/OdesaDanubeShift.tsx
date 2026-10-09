/**
 * Перевалка Великої Одеси й Дунаю у 2026 році: до і після літньої кампанії.
 *
 * Помісячного ряду для обох кластерів у відкритих джерелах немає, тому
 * графік — три горизонтальні смуги на одній шкалі в мільйонах тонн: Велика
 * Одеса в квітні (taupe, «до»), Велика Одеса й Дунай у серпні (помаранчеві,
 * «після»). Частка Дунаю — окремим підписом, не смугою, бо це інша одиниця.
 *
 * Дані: Ambrey через Splash247 (07.10.2026).
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const ROWS: { uk: string; en: string; v: number; after: boolean }[] = [
  {
    uk: "Велика Одеса, квітень",
    en: "Greater Odesa, April",
    v: 7.9,
    after: false,
  },
  {
    uk: "Велика Одеса, серпень",
    en: "Greater Odesa, August",
    v: 0.43,
    after: true,
  },
  { uk: "Дунай, серпень", en: "Danube, August", v: 1.24, after: true },
];

const UNIT: Record<Lang, string> = { uk: "млн т", en: "mn t" };
const SHARE: Record<Lang, [string, string]> = {
  uk: [
    "Частка Дунаю в перевалці портів України:",
    "~10% у I півріччі → 74% у серпні",
  ],
  en: ["Danube share of Ukraine's port cargo:", "~10% in H1 → 74% in August"],
};

const ARIA: Record<Lang, string> = {
  uk: "Стовпчикова діаграма: порти Великої Одеси обробили 7,9 мільйона тонн у квітні 2026 року і лише 0,43 мільйона тонн у серпні, тоді як дунайські порти в серпні обробили 1,24 мільйона тонн. Частка Дунаю в перевалці українських портів зросла приблизно з 10% у першому півріччі до 74% у серпні",
  en: "Bar chart: the Greater Odesa ports handled 7.9 million tonnes in April 2026 and only 0.43 million tonnes in August, while the Danube ports handled 1.24 million tonnes in August. The Danube's share of Ukraine's port cargo rose from about 10% in the first half of the year to 74% in August",
};

const num = (v: number, lang: Lang) =>
  lang === "uk" ? String(v).replace(".", ",") : String(v);

const W = 680;
const H = 250;
const LABEL_W = 190;
const PAD = { top: 28, right: 64, bottom: 64, left: 12 };
const PW = W - PAD.left - LABEL_W - PAD.right;
const MAX_V = 8;
const BAR_H = 26;
const GAP = 22;

const x = (v: number) => PAD.left + LABEL_W + (v / MAX_V) * PW;

export default function OdesaDanubeShift({ lang = "uk" }: { lang?: Lang }) {
  const ticks = [0, 2, 4, 6, 8];
  const plotBottom = PAD.top + ROWS.length * (BAR_H + GAP) - GAP;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={ARIA[lang]}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={x(t)}
            x2={x(t)}
            y1={PAD.top - 6}
            y2={plotBottom + 6}
            stroke="var(--warm-gray)"
            strokeWidth="1"
            opacity={t === 0 ? 0.9 : 0.3}
          />
          <text
            x={x(t)}
            y={plotBottom + 22}
            textAnchor="middle"
            fontSize="11"
            fill="var(--taupe)"
          >
            {t}
          </text>
        </g>
      ))}
      <text
        x={x(MAX_V)}
        y={plotBottom + 36}
        textAnchor="end"
        fontSize="10"
        fill="var(--taupe)"
      >
        {UNIT[lang]}
      </text>

      {ROWS.map((r, k) => {
        const top = PAD.top + k * (BAR_H + GAP);
        return (
          <g key={r.uk}>
            <text
              x={PAD.left + LABEL_W - 10}
              y={top + BAR_H / 2 + 4}
              textAnchor="end"
              fontSize="12"
              fill="var(--ink)"
            >
              {lang === "uk" ? r.uk : r.en}
            </text>
            <rect
              x={x(0)}
              y={top}
              width={Math.max(x(r.v) - x(0), 3)}
              height={BAR_H}
              rx="3"
              fill={r.after ? "var(--orange)" : "var(--taupe)"}
            />
            <text
              x={x(r.v) + 8}
              y={top + BAR_H / 2 + 5}
              fontSize="13"
              fontWeight="600"
              fill="var(--ink)"
            >
              {num(r.v, lang)}
            </text>
          </g>
        );
      })}

      <text x={PAD.left} y={H - 18} fontSize="12" fill="var(--taupe)">
        {SHARE[lang][0]}{" "}
        <tspan fontWeight="600" fill="var(--ink)">
          {SHARE[lang][1]}
        </tspan>
      </text>
    </svg>
  );
}
