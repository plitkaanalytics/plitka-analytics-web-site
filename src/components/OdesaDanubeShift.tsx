/**
 * Перевалка Великої Одеси й Дунаю у 2026 році: до і після літньої кампанії.
 *
 * Дві пари стовпців на одній шкалі в мільйонах тонн. «До» — середня місячна
 * перевалка в січні–липні 2026 року, наш розрахунок із даних Мінрозвитку
 * (Велика Одеса 42,2 млн т, Дунай 3,8 млн т за сім місяців). «Після» —
 * серпень 2026 року за Ambrey. Різні джерела, але одна величина: обсяг
 * вантажів, оброблених портами за місяць.
 *
 * Дані: Мінрозвитку через УНН (14.08.2026), Ambrey через Splash247 (07.10.2026).
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const GROUPS: { uk: string; en: string; before: number; after: number }[] = [
  { uk: "Велика Одеса", en: "Greater Odesa", before: 6.0, after: 0.43 },
  { uk: "Дунай", en: "Danube", before: 0.54, after: 1.24 },
];

const LEG: Record<Lang, [string, string]> = {
  uk: ["у середньому на місяць, січень–липень", "серпень"],
  en: ["monthly average, January–July", "August"],
};
const UNIT: Record<Lang, string> = {
  uk: "млн т на місяць",
  en: "mn t per month",
};

const ARIA: Record<Lang, string> = {
  uk: "Стовпчикова діаграма: у січні–липні 2026 року порти Великої Одеси обробляли в середньому близько 6 мільйонів тонн на місяць, а в серпні 0,43 мільйона тонн. Дунайські порти обробляли в середньому 0,54 мільйона тонн на місяць, а в серпні 1,24 мільйона тонн",
  en: "Bar chart: in January–July 2026 the Greater Odesa ports handled on average about 6 million tonnes a month, and 0.43 million tonnes in August. The Danube ports handled on average 0.54 million tonnes a month, and 1.24 million tonnes in August",
};

const num = (v: number, lang: Lang) => {
  const t = Number.isInteger(v) ? v.toFixed(1) : String(v);
  return lang === "uk" ? t.replace(".", ",") : t;
};

const W = 680;
const H = 300;
const PAD = { top: 44, bottom: 44, left: 46, right: 16 };
const PH = H - PAD.top - PAD.bottom;
const MAX_V = 7;
const BAR_W = 64;

const y = (v: number) => PAD.top + PH - (v / MAX_V) * PH;

export default function OdesaDanubeShift({ lang = "uk" }: { lang?: Lang }) {
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7];
  const groupW = (W - PAD.left - PAD.right) / GROUPS.length;
  const base = y(0);

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
        x={PAD.left - 30}
        y={PAD.top - 14}
        textAnchor="start"
        fontSize="10"
        fill="var(--taupe)"
      >
        {UNIT[lang]}
      </text>

      <g fontSize="11" fill="var(--ink)">
        <rect
          x={W - 372}
          y={8}
          width="12"
          height="12"
          rx="2"
          fill="var(--taupe)"
        />
        <text x={W - 354} y={18}>
          {LEG[lang][0]}
        </text>
        <rect
          x={W - 96}
          y={8}
          width="12"
          height="12"
          rx="2"
          fill="var(--orange)"
        />
        <text x={W - 78} y={18}>
          {LEG[lang][1]}
        </text>
      </g>

      {GROUPS.map((g, k) => {
        const cx = PAD.left + groupW * k + groupW / 2;
        const bars = [
          { v: g.before, fill: "var(--taupe)", x: cx - BAR_W - 4 },
          { v: g.after, fill: "var(--orange)", x: cx + 4 },
        ];
        return (
          <g key={g.uk}>
            {bars.map((b, i) => (
              <g key={i}>
                <rect
                  x={b.x}
                  y={y(b.v)}
                  width={BAR_W}
                  height={Math.max(base - y(b.v), 2)}
                  rx="3"
                  fill={b.fill}
                />
                <text
                  x={b.x + BAR_W / 2}
                  y={y(b.v) - 7}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--ink)"
                >
                  {num(b.v, lang)}
                </text>
              </g>
            ))}
            <text
              x={cx}
              y={base + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--ink)"
            >
              {lang === "uk" ? g.uk : g.en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
