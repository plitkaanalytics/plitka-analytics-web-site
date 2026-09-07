"use client";

import {
  ScrollMap,
  type Lang,
  type LegKind,
  type MapCard,
  type MapPoint,
  type MapStep,
  type Pt,
} from "./ScrollMap";

/**
 * Карта до § 04 матеріалу «Сирійський експрес змінює курс»: північний
 * маршрут із Мурманська й Балтійська в Гвінейську затоку та
 * середземноморський із тієї самої Балтики в Тартус. Текст розділу живе на
 * картках — у статті цих абзаців немає.
 * Рушій — ScrollMap; геометрію готує scripts/build-map-region.mjs.
 *
 * Геометрія одна на дві мови, текст — окремо: назви точок і картки беруться
 * за мовою статті, у якій карта стоїть.
 */

const GEO: Record<string, MapPoint> = {
  murmansk: { n: "Мурманськ", c: [33.08, 68.97] },
  arkhangelsk: { n: "Архангельськ", c: [40.54, 64.54], dy: 13 },
  baltiysk: { n: "Балтійськ", c: [19.9, 54.65], dy: -6 },
  conakry: { n: "Конакрі", c: [-13.71, 9.51] },
  lome: { n: "Ломе", c: [1.29, 6.14], dy: 14 },
  gibraltar: { n: "Гібралтар", c: [-5.35, 36.0], dy: 15, side: "left" },
  tartus: { n: "Тартус", c: [35.87, 34.89], dy: 13 },
  algiers: { n: "Алжир", c: [3.06, 36.76], dy: -6 },
  alexandria: { n: "Александрія", c: [29.92, 31.2], dy: 14 },
};

const NAMES_EN: Record<string, string> = {
  murmansk: "Murmansk",
  arkhangelsk: "Arkhangelsk",
  baltiysk: "Baltiysk",
  conakry: "Conakry",
  lome: "Lomé",
  gibraltar: "Gibraltar",
  tartus: "Tartus",
  algiers: "Algiers",
  alexandria: "Alexandria",
};

const POINTS: Record<Lang, Record<string, MapPoint>> = {
  uk: GEO,
  en: Object.fromEntries(
    Object.entries(GEO).map(([k, v]) => [k, { ...v, n: NAMES_EN[k] ?? v.n }]),
  ),
};

const LEGS: Record<string, LegKind> = {
  assumed: "ghost",
  north: "sea",
  baltic: "sea",
  gulf: "sea",
  med: "escort",
};

const STEPS: MapStep[] = [
  { points: ["tartus", "conakry"], legs: ["assumed"] },
  { points: ["murmansk", "conakry"], legs: ["north"], drop: ["assumed"] },
  // Кадр той самий, що й на попередній картці: рухати карту заради дат немає
  // навіщо.
  { points: ["murmansk", "conakry"], legs: ["north"] },
  {
    points: [
      "baltiysk",
      "arkhangelsk",
      "murmansk",
      "conakry",
      "lome",
      "algiers",
      "alexandria",
    ],
    // Північну лінію лишаємо в повну силу: балтійські рейси йдуть тим самим
    // коридором, і притухла ділянка посеред маршруту читалася б розривом.
    legs: ["north", "baltic", "gulf"],
  },
  {
    points: ["murmansk", "baltiysk", "conakry", "lome", "tartus", "gibraltar"],
    legs: ["north", "baltic", "gulf", "med"],
  },
];

const CARDS: Record<Lang, MapCard[]> = {
  uk: [
    {
      h: "Версія, яка не підтвердилася",
      p: (
        <>
          Коли в січні 2025 року два російські судна з військовим вантажем стали
          в гвінейському <b>Конакрі</b>, їх спершу повʼязали з Тартусом: базу
          втрачено — отже, техніку для «Африканського корпусу» повезуть тим, що
          встигли вивезти із Сирії. Сірим — шлях, який їм тоді приписали.
        </>
      ),
      refs: [1],
    },
    {
      h: "Вони вийшли з Мурманська",
      p: (
        <>
          Розслідування The Sentry, оприлюднене у квітні 2026 року, цю версію
          заперечує. Обидва судна — ролкер «Адлер» і суховантаж «Сияние Севера»
          — вийшли не з Сирії, а з <b>Мурманська</b>. Доказів, що вони в той
          самий період заходили в Тартус, немає.
        </>
      ),
      refs: [1],
    },
    {
      h: "Дати важать більше за маршрут",
      p: (
        <>
          Асад утік <b>8 грудня</b>. Перше судно вийшло з Мурманська через шість
          днів, друге — через тринадцять. Завантажити суховантаж бронетехнікою,
          оформити рейс, спланувати перехід і вийти в море за такий час
          неможливо — якщо рішення ухвалювали вже після падіння режиму. Отже,
          нові маршрути постачання для «Африканського корпусу» почали готувати{" "}
          <b>раніше, ніж Сирія перестала бути опорою</b>.
        </>
      ),
      grid: [
        { k: "14 грудня 2024", v: <>ролкер «Адлер» виходить із Мурманська</> },
        {
          k: "21 грудня 2024",
          v: <>суховантаж «Сияние Севера» — тим самим маршрутом</>,
        },
      ],
      refs: [1],
    },
    {
      h: "Решта рейсів це підтверджує",
      p: (
        <>
          «Сабетта» вийшла з <b>Балтійська</b> наприкінці лютого 2026 року.
          «Михаил Бритнев» — з <b>Архангельська</b> через Балтійськ у червні
          того ж року. Ролкер «Балтик Лідер», за досьє ГУР, до 2025 року ходить
          між Балтійськом, Калінінградом, Белокамʼянкою, Мурманськом — і
          Конакрі, Алжиром та Александрією.
        </>
      ),
      refs: [7, 6, 4],
    },
    {
      h: "Два маршрути",
      p: (
        <>
          <b>Північний</b> веде з Мурманська й Балтійська повз Британію та
          Португалію до Конакрі й Ломе — і в Гібралтар не заходить узагалі.{" "}
          <b>Середземноморський</b> веде з тієї самої Балтики в Тартус і назад.
          Спільне в них тільки місце виходу: біля португальського берега шляхи
          розходяться.
        </>
      ),
      refs: [1, 2],
    },
  ],
  en: [
    {
      h: "The version that did not hold",
      p: (
        <>
          When two Russian ships with military cargo tied up in Guinean{" "}
          <b>Conakry</b> in January 2025, they were first tied to Tartus: the
          base was lost, so the equipment for the Africa Corps had to be
          whatever Russia had managed to pull out of Syria. The grey line is the
          route they were credited with at the time.
        </>
      ),
      refs: [1],
    },
    {
      h: "They sailed from Murmansk",
      p: (
        <>
          An investigation by The Sentry, published in April 2026, contradicts
          that. Both ships — the ro-ro <i>Adler</i> and the dry cargo ship{" "}
          <i>Siyanie Severa</i> — left not Syria but <b>Murmansk</b>. There is
          no evidence that either called at Tartus in that period.
        </>
      ),
      refs: [1],
    },
    {
      h: "The dates matter more than the route",
      p: (
        <>
          Assad fled on <b>8 December</b>. The first ship left Murmansk six days
          later, the second after thirteen. Loading a dry cargo ship with
          armour, filing the voyage, planning the passage and putting to sea in
          that time is impossible — if the decision was taken only after the
          regime fell. Which means the new supply routes for the Africa Corps
          were being prepared <b>before Syria stopped being the foothold</b>.
        </>
      ),
      grid: [
        {
          k: "14 December 2024",
          v: (
            <>
              the ro-ro <i>Adler</i> leaves Murmansk
            </>
          ),
        },
        {
          k: "21 December 2024",
          v: (
            <>
              the dry cargo ship <i>Siyanie Severa</i> — the same route
            </>
          ),
        },
      ],
      refs: [1],
    },
    {
      h: "The other voyages bear it out",
      p: (
        <>
          <i>Sabetta</i> left <b>Baltiysk</b> in late February 2026.{" "}
          <i>Mikhail Britnev</i> sailed from <b>Arkhangelsk</b> via Baltiysk in
          June of the same year. The ro-ro <i>Baltic Leader</i>, according to
          the HUR dossier, worked between Baltiysk, Kaliningrad, Belokamenka and
          Murmansk — and Conakry, Algiers and Alexandria — up to 2025.
        </>
      ),
      refs: [7, 6, 4],
    },
    {
      h: "Two routes",
      p: (
        <>
          The <b>northern</b> one runs from Murmansk and Baltiysk past Britain
          and Portugal to Conakry and Lomé — and never enters Gibraltar. The{" "}
          <b>Mediterranean</b> one runs from the same Baltic to Tartus and back.
          All they share is where they begin: off the Portuguese coast the paths
          part.
        </>
      ),
      refs: [1, 2],
    },
  ],
};

const LABEL: Record<Lang, string> = {
  uk: "Карта двох маршрутів: північний із Мурманська й Балтійська навколо Британії та Португалії до Конакрі й Ломе та середземноморський із тієї самої Балтики через Гібралтар до Тартуса",
  en: "Map of two routes: the northern one from Murmansk and Baltiysk around Britain and Portugal to Conakry and Lomé, and the Mediterranean one from the same Baltic through Gibraltar to Tartus",
};

const BASE_BOX: [Pt, Pt] = [
  [-22, 3],
  [42, 71],
];

export function NorthRoutesMap({ lang = "uk" }: { lang?: Lang }) {
  return (
    <ScrollMap
      dataUrl="/articles/syriyskyi-ekspres/north-routes-map.json"
      baseBox={BASE_BOX}
      points={POINTS[lang]}
      legs={LEGS}
      steps={STEPS}
      cards={CARDS[lang]}
      pad={0.06}
      tall
      lang={lang}
      label={LABEL[lang]}
    />
  );
}

export default NorthRoutesMap;
