/**
 * Фідерна логістика: ланцюг від волзьких заводів до океанського танкера й
 * співвідношення, заради якого схема існує.
 *
 * Це схема процесу, а не карта: важлива послідовність ланок і пропорція, а не
 * географія.
 *
 * Судно — схематична іконка з Вікісховища (Tanker ship.svg, Goran tek-en,
 * CC BY-SA 4.0), у якої підтиснуто viewBox до самого силуету. Одна й та сама
 * форма в двох розмірах, бо порівнюємо об'єм, а не вигляд: фотографії в
 * такому масштабі перетворювалися на мішанину.
 *
 * Великий танкер учетверо більший за фідера лінійно, тобто приблизно в
 * пʼятнадцять разів за площею — стільки ж, скільки рейсів потрібно на одне
 * завантаження.
 *
 * Рух уздовж ланцюга — CSS усередині SVG, без клієнтського коду. Для
 * prefers-reduced-motion вимикається.
 *
 * Числа — docs/dossiers/kaspiy-teatr/notes.md.
 */

const W = 760;

const ICON = "/articles/rezervne-more/tanker-icon.svg";
const ICON_RATIO = 18.3 / 49.8; // висота до ширини в підтиснутому viewBox

const FEEDERS = 15;
const PER_ROW = 5;
const SMALL_W = 104;
const SMALL_H = Math.round(SMALL_W * ICON_RATIO);
const COL_GAP = 28;
const ROW_GAP = 20;

const BIG_W = 420;
const BIG_H = Math.round(BIG_W * ICON_RATIO);

const laneY = 74;
const ROWS_TOP = 160;
const BIG_TOP = ROWS_TOP + 3 * (SMALL_H + ROW_GAP) + 46;
const H = BIG_TOP + BIG_H + 14;

export default function FeederChain() {
  const stops = [
    { x: 60, label: "волзькі НПЗ", sub: "Волгоград · Самара · Саратов" },
    { x: 250, label: "Волго-Дон", sub: "13 шлюзів, до 5000 т" },
    { x: 440, label: "Азовське море", sub: "мілке" },
    { x: 650, label: "порт Кавказ", sub: "перевантаження" },
  ];
  const rowW = PER_ROW * SMALL_W + (PER_ROW - 1) * COL_GAP;
  const rowX = (W - rowW) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Схема: нафтопродукти з волзьких заводів ідуть Волго-Донським каналом в Азовське море, звідти через Керченську протоку на перевантаження в порту Кавказ. Нижче пʼятнадцять силуетів фідерних танкерів по сім тисяч тонн і один великий силует океанського танкера на сто тисяч тонн"
    >
      <style>{`
        .fc-flow { stroke-dasharray: 10 7; animation: fc-march 1.6s linear infinite; }
        @keyframes fc-march { to { stroke-dashoffset: -17; } }
        @media (prefers-reduced-motion: reduce) { .fc-flow { animation: none; } }
      `}</style>

      <line
        x1={60}
        y1={laneY}
        x2={700}
        y2={laneY}
        stroke="var(--warm-gray)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <line
        className="fc-flow"
        x1={60}
        y1={laneY}
        x2={700}
        y2={laneY}
        stroke="var(--orange)"
        strokeWidth="4"
      />

      {stops.map((s) => (
        <g key={s.label}>
          <circle
            cx={s.x}
            cy={laneY}
            r="7"
            fill="var(--ink)"
            stroke="var(--white)"
            strokeWidth="2"
          />
          <text
            x={s.x}
            y={laneY - 24}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--ink)"
          >
            {s.label}
          </text>
          <text
            x={s.x}
            y={laneY - 9}
            textAnchor="middle"
            fontSize="11"
            fill="var(--taupe)"
          >
            {s.sub}
          </text>
        </g>
      ))}

      <text
        x={545}
        y={laneY + 22}
        textAnchor="middle"
        fontSize="11"
        fill="var(--taupe)"
      >
        Керченська протока
      </text>

      {/* ── Пропорція ──────────────────────────────────────────────────── */}

      <text
        x={W / 2}
        y={ROWS_TOP - 18}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--ink)"
      >
        15 рейсів фідера, по 7000 тонн
      </text>

      {Array.from({ length: FEEDERS }, (_, i) => {
        const row = Math.floor(i / PER_ROW);
        const col = i % PER_ROW;
        return (
          <image
            key={i}
            href={ICON}
            x={rowX + col * (SMALL_W + COL_GAP)}
            y={ROWS_TOP + row * (SMALL_H + ROW_GAP)}
            width={SMALL_W}
            height={SMALL_H}
            opacity="0.62"
          />
        );
      })}

      <text
        x={W / 2}
        y={BIG_TOP - 18}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--ink)"
      >
        один океанський танкер, близько 100 000 тонн
      </text>
      <image
        href={ICON}
        x={(W - BIG_W) / 2}
        y={BIG_TOP}
        width={BIG_W}
        height={BIG_H}
      />
    </svg>
  );
}
