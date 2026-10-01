/**
 * Морські шляхи між російськими та іранськими портами Каспію.
 *
 * Це схема, а не карта: обриси моря спрощені, порти розставлені приблизно за
 * взаємним розташуванням, відстані не в масштабі. Напрямків руху й дат тут
 * немає навмисне — вантаж ходить в обидва боки, а дати зміни потоку джерела
 * не дають.
 *
 * Статичний SVG: сторінка статті — серверний компонент.
 */

type Port = {
  name: string;
  x: number;
  y: number;
  side: "ru" | "ir";
  note?: string;
};

const PORTS: Port[] = [
  { name: "Астрахань", x: 196, y: 58, side: "ru" },
  { name: "Оля", x: 205, y: 92, side: "ru" },
  { name: "Махачкала", x: 150, y: 196, side: "ru" },
  { name: "Каспійськ", x: 156, y: 218, side: "ru", note: "база флотилії" },
  { name: "Бандар-Ензелі", x: 205, y: 384, side: "ir" },
  { name: "Ношехр", x: 286, y: 402, side: "ir" },
  { name: "Амірабад", x: 352, y: 392, side: "ir" },
];

/** Пари портів, рух між якими описують джерела. */
const ROUTES: [string, string][] = [
  ["Астрахань", "Бандар-Ензелі"],
  ["Астрахань", "Амірабад"],
  ["Оля", "Бандар-Ензелі"],
  ["Оля", "Амірабад"],
  ["Махачкала", "Бандар-Ензелі"],
  ["Махачкала", "Ношехр"],
];

const W = 560;
const H = 470;

/** Спрощений силует Каспію: витягнутий з півночі на південь, вузький посередині. */
const SEA =
  "M196,40 C236,46 256,64 262,92 C268,120 250,140 238,162 C226,184 232,206 250,226 " +
  "C268,246 300,252 318,274 C336,296 338,330 330,360 C322,390 300,412 266,418 " +
  "C232,424 198,414 178,392 C158,370 156,344 166,318 C176,292 196,276 200,252 " +
  "C204,228 188,210 170,196 C152,182 136,166 134,140 C132,114 146,88 164,66 " +
  "C176,50 186,42 196,40 Z";

export default function CaspianRoutes() {
  const at = (n: string) => PORTS.find((p) => p.name === n) as Port;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Схема Каспійського моря: російські порти Астрахань, Оля й Махачкала на півночі та заході, іранські Бандар-Ензелі, Ношехр і Амірабад на півдні, лініями позначено морські шляхи між ними"
    >
      <path
        d={SEA}
        fill="var(--beige)"
        stroke="var(--warm-gray)"
        strokeWidth="1.5"
      />

      <text x="78" y="120" fontSize="12" fill="var(--taupe)" letterSpacing="1">
        РОСІЯ
      </text>
      <text x="356" y="140" fontSize="12" fill="var(--taupe)" letterSpacing="1">
        КАЗАХСТАН
      </text>
      <text x="74" y="330" fontSize="12" fill="var(--taupe)" letterSpacing="1">
        АЗЕРБ.
      </text>
      <text x="398" y="300" fontSize="12" fill="var(--taupe)" letterSpacing="1">
        ТУРКМ.
      </text>
      <text x="248" y="452" fontSize="12" fill="var(--taupe)" letterSpacing="1">
        ІРАН
      </text>

      {ROUTES.map(([a, b]) => {
        const p = at(a);
        const q = at(b);
        return (
          <line
            key={a + b}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke="var(--orange)"
            strokeWidth="1.5"
            opacity="0.55"
          />
        );
      })}

      {PORTS.map((p) => (
        <g key={p.name}>
          <circle
            cx={p.x}
            cy={p.y}
            r={p.side === "ru" ? 5 : 4.5}
            fill={p.note ? "var(--rust)" : "var(--ink)"}
            stroke="var(--white)"
            strokeWidth="1.5"
          />
          <text
            x={p.x + (p.side === "ru" ? -10 : 0)}
            y={p.y + (p.side === "ru" ? 4 : 18)}
            textAnchor={p.side === "ru" ? "end" : "middle"}
            fontSize="12"
            fontWeight="600"
            fill="var(--ink)"
          >
            {p.name}
          </text>
          {p.note && (
            <text
              x={p.x - 10}
              y={p.y + 18}
              textAnchor="end"
              fontSize="10"
              fill="var(--rust)"
            >
              {p.note}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
