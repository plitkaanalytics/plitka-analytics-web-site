/**
 * Зерновий індекс FAO (2014–2016 = 100), січень 2025 — вересень 2026.
 *
 * Одна лінія одним кольором; роки підписано під віссю. Вертикальні позначки — події, з
 * якими FAO і ринок пов'язують зростання: закриття Ормузу (28.02), блокада
 * іранських портів (13.04) і зупинка заходів у порти Великої Одеси (22.07).
 * Підписано лише перше, найнижче й останнє значення.
 *
 * Дані: FAO Food Price Index, food_price_indices_data.csv (реліз 02.10.2026).
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Lang = "uk" | "en";

const DATA: number[] = [
  // 2025: січ–гру
  111.8, 112.6, 109.7, 110.9, 109.0, 107.3, 106.5, 105.6, 104.8, 103.8, 105.6,
  107.2,
  // 2026: січ–вер
  107.5, 108.7, 110.4, 111.3, 114.2, 110.0, 113.8, 116.8, 122.8,
];

const MONTHS: Record<Lang, string[]> = {
  uk: ["січ", "кві", "лип", "жов", "січ", "кві", "лип", "вер"],
  en: ["Jan", "Apr", "Jul", "Oct", "Jan", "Apr", "Jul", "Sep"],
};
const TICK_IDX = [0, 3, 6, 9, 12, 15, 18, 20];

const EVENTS: { i: number; dy: number; uk: string; en: string }[] = [
  { i: 13.9, dy: 0, uk: "Ормуз", en: "Hormuz" },
  { i: 15.4, dy: 14, uk: "блокада Ірану", en: "Iran blockade" },
  { i: 18.7, dy: 0, uk: "зупинка Одеси", en: "Odesa halted" },
];

/** Червень 2026: індекс −3,5% за місяць — жнива в Чорноморському регіоні й
 *  очікування, що напруга навколо Ормузу спадає (FAO, реліз 3.07.2026). */
const DIP = 17;
const DIP_LABEL: Record<Lang, [string, string]> = {
  uk: ["жнива і пауза", "в Ормузі"],
  en: ["harvest and", "Hormuz lull"],
};

const ARIA: Record<Lang, string> = {
  uk: "Лінійний графік: зерновий індекс FAO з січня 2025 до вересня 2026 року. У 2025 році індекс знижувався від 111,8 у січні до 103,8 у жовтні. У 2026 році він зростав після закриття Ормузької протоки в лютому, блокади Ірану у квітні й зупинки портів Великої Одеси в липні і у вересні досяг 122,8 пункту, на 17,2% вище, ніж роком раніше",
  en: "Line chart: FAO cereal price index from January 2025 to September 2026. In 2025 the index fell from 111.8 in January to 103.8 in October. In 2026 it rose after the closure of the Strait of Hormuz in February, the blockade of Iran in April and the halt of the Greater Odesa ports in July, reaching 122.8 points in September, 17.2% higher than a year earlier",
};

const num = (v: number, lang: Lang) =>
  lang === "uk" ? String(v).replace(".", ",") : String(v);

const W = 680;
const H = 340;
const PAD = { top: 54, right: 56, bottom: 52, left: 46 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;
const MIN_V = 100;
const MAX_V = 125;
const N = DATA.length - 1;

const x = (i: number) => PAD.left + (i / N) * PW;
const y = (v: number) => PAD.top + PH - ((v - MIN_V) / (MAX_V - MIN_V)) * PH;
const line = (from: number, to: number) =>
  DATA.slice(from, to + 1)
    .map((v, k) => `${k ? "L" : "M"}${x(from + k)},${y(v)}`)
    .join(" ");

export default function FaoCerealIndex({ lang = "uk" }: { lang?: Lang }) {
  const vTicks = [100, 105, 110, 115, 120, 125];
  const low = 9;
  const last = N;

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
            opacity={0.3}
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

      {TICK_IDX.map((i, k) => (
        <text
          key={i}
          x={x(i)}
          y={PAD.top + PH + 18}
          textAnchor="middle"
          fontSize="10"
          fill="var(--taupe)"
        >
          {MONTHS[lang][k]}
        </text>
      ))}
      <text
        x={x(5.5)}
        y={PAD.top + PH + 36}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--taupe)"
      >
        2025
      </text>
      <text
        x={x(16)}
        y={PAD.top + PH + 36}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--taupe)"
      >
        2026
      </text>

      {EVENTS.map((e) => (
        <g key={e.uk}>
          <line
            x1={x(e.i)}
            x2={x(e.i)}
            y1={PAD.top - 6 - e.dy}
            y2={PAD.top + PH}
            stroke="var(--warm-gray)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x={x(e.i)}
            y={PAD.top - 12 - e.dy}
            textAnchor="middle"
            fontSize="10"
            fill="var(--taupe)"
          >
            {lang === "uk" ? e.uk : e.en}
          </text>
        </g>
      ))}

      <path
        d={line(0, N)}
        fill="none"
        stroke="var(--orange)"
        strokeWidth="2.5"
      />

      {[0, low].map((i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(DATA[i])} r="4" fill="var(--orange)" />
          <text
            x={x(i)}
            y={y(DATA[i]) + (i === low ? 18 : -10)}
            textAnchor="middle"
            fontSize="12"
            fill="var(--ink)"
          >
            {num(DATA[i], lang)}
          </text>
        </g>
      ))}
      <circle cx={x(DIP)} cy={y(DATA[DIP])} r="4" fill="var(--orange)" />
      <text
        x={x(DIP)}
        y={y(DATA[DIP]) + 18}
        textAnchor="middle"
        fontSize="10"
        fill="var(--taupe)"
      >
        {DIP_LABEL[lang][0]}
      </text>
      <text
        x={x(DIP)}
        y={y(DATA[DIP]) + 30}
        textAnchor="middle"
        fontSize="10"
        fill="var(--taupe)"
      >
        {DIP_LABEL[lang][1]}
      </text>
      <circle
        cx={x(last)}
        cy={y(DATA[last])}
        r="5.5"
        fill="var(--orange)"
        stroke="var(--white)"
        strokeWidth="2"
      />
      <text
        x={x(last) + 9}
        y={y(DATA[last]) + 4}
        fontSize="13"
        fontWeight="600"
        fill="var(--ink)"
      >
        {num(DATA[last], lang)}
      </text>
    </svg>
  );
}
