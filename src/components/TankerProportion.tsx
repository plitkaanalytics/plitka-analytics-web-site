/**
 * Скільки рейсів фідера вміщується в один океанський танкер.
 *
 * Судно — схематична іконка з Вікісховища (Tanker ship.svg, Goran tek-en,
 * CC BY-SA 4.0) з підтиснутим до силуету viewBox. Одна й та сама форма у двох
 * розмірах, бо порівнюємо обʼєм, а не вигляд: різні малюнки різних авторів
 * змушували б око чіплятися за стиль замість розміру.
 *
 * Великий танкер учетверо більший лінійно, тобто приблизно в пʼятнадцять разів
 * за площею — стільки ж, скільки рейсів потрібно на одне завантаження.
 *
 * Числа — docs/dossiers/kaspiy-teatr/notes.md.
 */

const W = 760;

const ICON = "/articles/rezervne-more/tanker-icon.svg";
const ICON_RATIO = 18.3 / 49.8;

const FEEDERS = 15;
const PER_ROW = 5;
const SMALL_W = 104;
const SMALL_H = Math.round(SMALL_W * ICON_RATIO);
const COL_GAP = 28;
const ROW_GAP = 20;

const BIG_W = 420;
const BIG_H = Math.round(BIG_W * ICON_RATIO);

const ROWS_TOP = 26;
const BIG_TOP = ROWS_TOP + 3 * (SMALL_H + ROW_GAP) + 46;
const H = BIG_TOP + BIG_H + 10;

type Lang = "uk" | "en";

const T = {
  uk: {
    aria: "Пʼятнадцять силуетів фідерних танкерів по сім тисяч тонн у трьох рядах і один великий силует океанського танкера на сто тисяч тонн під ними",
    feeders: "15 рейсів фідера, по 7000 тонн",
    ocean: "один океанський танкер, близько 100 000 тонн",
  },
  en: {
    aria: "Fifteen silhouettes of 7,000-tonne feeder tankers in three rows, and one large silhouette of a 100,000-tonne ocean tanker below them",
    feeders: "15 feeder runs, 7,000 t each",
    ocean: "one ocean tanker, about 100,000 t",
  },
};

export default function TankerProportion({ lang = "uk" }: { lang?: Lang }) {
  const rowW = PER_ROW * SMALL_W + (PER_ROW - 1) * COL_GAP;
  const rowX = (W - rowW) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={T[lang].aria}
    >
      <text
        x={W / 2}
        y={ROWS_TOP - 8}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--ink)"
      >
        {T[lang].feeders}
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
        {T[lang].ocean}
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
