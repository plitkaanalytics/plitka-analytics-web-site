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
 * Карта до § 00 матеріалу «Сирійський експрес змінює курс»: морський маршрут
 * Новоросійськ — Тартус, ділянка під ескортом і повітряне плече з Хмейміма
 * в Африку. Текст розділу живе на картках — у статті цих абзаців немає.
 * Рушій — ScrollMap; геометрію готує scripts/build-map-region.mjs.
 *
 * Геометрія одна на дві мови, текст — окремо: назви точок і картки беруться
 * за мовою статті, у якій карта стоїть.
 */

const GEO: Record<string, MapPoint> = {
  novoros: { n: "Новоросійськ", c: [37.77, 44.72] },
  bosph: { n: "Босфор", c: [29.05, 41.15], dy: -6 },
  dard: { n: "Дарданелли", c: [26.25, 40.15], dy: 13 },
  tartus: { n: "Тартус", c: [35.87, 34.89], dy: 13 },
  khmeimim: { n: "Хмеймім", c: [35.95, 35.42], dy: -6 },
  tobruk: { n: "Тобрук", c: [23.96, 32.08] },
  jufra: { n: "Ель-Джуфра", c: [15.96, 29.2] },
  khartoum: { n: "Хартум", c: [32.53, 15.59] },
  bangui: { n: "Бангі", c: [18.56, 4.36] },
  bamako: { n: "Бамако · 2021", c: [-8.0, 12.65], dy: 4, side: "left" },
  ouaga: { n: "Уагадугу · 2022", c: [-1.53, 12.37], dy: 20 },
  niamey: { n: "Ніамей · 2023", c: [2.11, 13.51], dy: -12 },
};

const NAMES_EN: Record<string, string> = {
  novoros: "Novorossiysk",
  bosph: "Bosphorus",
  dard: "Dardanelles",
  tartus: "Tartus",
  khmeimim: "Khmeimim",
  tobruk: "Tobruk",
  jufra: "Al-Jufra",
  khartoum: "Khartoum",
  bangui: "Bangui",
  bamako: "Bamako · 2021",
  ouaga: "Ouagadougou · 2022",
  niamey: "Niamey · 2023",
};

const POINTS: Record<Lang, Record<string, MapPoint>> = {
  uk: GEO,
  en: Object.fromEntries(
    Object.entries(GEO).map(([k, v]) => [k, { ...v, n: NAMES_EN[k] ?? v.n }]),
  ),
};

const LEGS: Record<string, LegKind> = {
  sea: "sea",
  escort: "escort",
  airLibya: "air",
  airTobruk: "air",
  airSudan: "air",
  airCar: "air",
  airMali: "air",
  airOuaga: "air",
  airNiamey: "air",
};

const SHORT: Record<Lang, Record<string, string>> = {
  uk: { bamako: "Бамако", ouaga: "Уагадугу", niamey: "Ніамей" },
  en: { bamako: "Bamako", ouaga: "Ouagadougou", niamey: "Niamey" },
};

const steps = (lang: Lang): MapStep[] => [
  { points: ["novoros", "bosph", "dard", "tartus"], legs: ["sea"] },
  { points: ["tartus", "dard", "bosph"], legs: ["escort"] },
  { points: ["tartus", "khmeimim"], legs: [] },
  {
    points: ["khmeimim", "tobruk", "jufra", "khartoum", "bangui"],
    legs: ["airLibya", "airTobruk", "airSudan", "airCar"],
  },
  {
    points: ["bamako", "ouaga", "niamey"],
    legs: ["airMali", "airOuaga", "airNiamey"],
  },
  {
    points: ["khmeimim", "bamako", "ouaga", "niamey"],
    legs: ["airMali", "airOuaga", "airNiamey"],
  },
  {
    points: ["tartus", "novoros", "bamako", "jufra", "bangui"],
    legs: [
      "sea",
      "escort",
      "airLibya",
      "airTobruk",
      "airSudan",
      "airCar",
      "airMali",
      "airOuaga",
      "airNiamey",
    ],
    names: SHORT[lang],
  },
];

const STEPS: Record<Lang, MapStep[]> = { uk: steps("uk"), en: steps("en") };

const CARDS: Record<Lang, MapCard[]> = {
  uk: [
    {
      h: "Сирійський експрес",
      p: (
        <>
          Постачали цю ескадру не разовими рейсами, а постійним маршрутом — за
          розкладом і під охороною. У ЗМІ ці конвої прозвали{" "}
          <b>«сирійський експрес»</b>: суховантажі й ролкери курсували між
          Новоросійськом і Тартусом. Синім — їхній шлях: Чорне море, Босфор,
          Дарданелли, Егейське море. Обидва вузькі місця на ньому контролює
          Туреччина.
        </>
      ),
      refs: [19],
    },
    {
      h: "Ділянка під ескортом",
      p: (
        <>
          Помаранчевим — ділянка, яку конвої проходили не самі: фрегати й
          корвети вели суховантажі від Тартуса до турецьких проток, щоб{" "}
          <b>у Егейському морі ніхто не спробував їх оглянути чи затримати</b>.
        </>
      ),
      refs: [19],
    },
    {
      h: "Порт і аеродром",
      p: (
        <>
          Сирія була потрібна Москві не лише заради Середземного моря. За{" "}
          <b>35 миль</b> на північ від Тартуса стоїть авіабаза <b>Хмеймім</b> —
          і саме там дозаправлялися літаки, що возили в Африку техніку й людей.
        </>
      ),
      grid: [
        {
          k: "Оренда 2017 року",
          v: (
            <>
              49 років, із правом продовжувати ще на 25. Правовий імунітет для
              російського персоналу, дозвіл поглибити дно й поставити плавучі
              причали під більші кораблі — з розрахунком на одинадцять суден
              одночасно, включно з атомними
            </>
          ),
        },
        {
          k: "Частка в прибутку порту",
          v: (
            <>
              65 відсотків — за повідомленням сирійських медіа, яке переказала
              «Москоу Таймс»
            </>
          ),
        },
      ],
      refs: [18, 12, 13, 14],
    },
    {
      h: "Плече в Африку",
      p: (
        <>
          Африканську присутність будували окремо, із Сирією її повʼязувала{" "}
          <b>тільки інфраструктура</b>. З кінця 2021 року в Малі працювали бійці
          «Вагнера» — приватної структури Євгена Пригожина: її найманці воювали
          за місцеві уряди в обмін на доступ до ресурсів. Схема повторювалася в
          Центральноафриканській Республіці, Лівії, Судані. Пунктиром —
          напрямки, а не конкретні коридори.
        </>
      ),
      refs: [22],
    },
    {
      h: "Сахель",
      p: (
        <>
          Паралельно Москва підтримувала перевороти, після яких із країн ішли
          французи й американці: <b>Малі 2021 року</b>,{" "}
          <b>Буркіна-Фасо 2022-го</b>, <b>Нігер 2023-го</b>. Дата біля столиці —
          рік перевороту.
        </>
      ),
      refs: [22],
    },
    {
      h: "Держава замість «Вагнера»",
      p: (
        <>
          У грудні 2023 року заступник міністра оборони РФ Юнус-Бек Євкуров
          заснував <b>«Африканський корпус»</b> — державну заміну «Вагнеру»,
          підпорядковану Міноборони й ГРУ. У Малі корпус розгорнувся наприкінці
          2024-го, а влітку 2025 року «Вагнер» офіційно передав йому операції й
          пішов. Змінилася не лише вивіска: приватну компанію, яка сама шукала
          собі заробіток, замінила державна структура, яку треба постачати{" "}
          <b>з бюджету й силами флоту</b>.
        </>
      ),
      refs: [21, 1],
    },
    {
      h: "Трималося на одній людині",
      p: (
        <>
          Уся ця конструкція трималася на Асаді. Він платив за інтервенцію 2015
          року, яка врятувала його режим, і платив щедро: ремонтна база для
          флоту, аеродром для африканських рейсів і правовий імунітет для
          військових — усе це давав один гарант.
        </>
      ),
      refs: [13],
    },
  ],
  en: [
    {
      h: "The Syrian Express",
      p: (
        <>
          The squadron was supplied not by one-off runs but by a standing route
          — on a schedule and under guard. The press nicknamed these convoys the{" "}
          <b>Syrian Express</b>: dry cargo ships and ro-ros shuttling between
          Novorossiysk and Tartus. The blue line is their path: the Black Sea,
          the Bosphorus, the Dardanelles, the Aegean. Turkey controls both
          chokepoints on it.
        </>
      ),
      refs: [19],
    },
    {
      h: "The escorted stretch",
      p: (
        <>
          The orange line is the stretch the convoys did not sail alone:
          frigates and corvettes led the cargo ships from Tartus to the Turkish
          straits so that{" "}
          <b>no one in the Aegean would try to inspect or detain them</b>.
        </>
      ),
      refs: [19],
    },
    {
      h: "A port and an airfield",
      p: (
        <>
          Moscow needed Syria for more than the Mediterranean.{" "}
          <b>Thirty-five miles</b> north of Tartus stands the <b>Khmeimim</b>{" "}
          air base — and that is where the aircraft carrying equipment and
          people to Africa refuelled.
        </>
      ),
      grid: [
        {
          k: "The 2017 lease",
          v: (
            <>
              49 years, with the right to extend by another 25. Legal immunity
              for Russian personnel, permission to dredge the seabed and install
              floating piers for larger ships — designed for eleven vessels at
              once, nuclear-powered included
            </>
          ),
        },
        {
          k: "Share of the port’s revenue",
          v: (
            <>
              65 per cent — reported by Syrian media and relayed by The Moscow
              Times
            </>
          ),
        },
      ],
      refs: [18, 12, 13, 14],
    },
    {
      h: "The leg into Africa",
      p: (
        <>
          The African presence was built separately; <b>only infrastructure</b>{" "}
          tied it to Syria. From the end of 2021 fighters of Wagner — Yevgeny
          Prigozhin’s private structure — worked in Mali: its mercenaries fought
          for local governments in exchange for access to resources. The pattern
          repeated in the Central African Republic, Libya and Sudan. The dashed
          lines are directions, not specific corridors.
        </>
      ),
      refs: [22],
    },
    {
      h: "The Sahel",
      p: (
        <>
          In parallel Moscow backed coups after which the French and the
          Americans left: <b>Mali in 2021</b>, <b>Burkina Faso in 2022</b>,{" "}
          <b>Niger in 2023</b>. The date beside each capital is the year of the
          coup.
        </>
      ),
      refs: [22],
    },
    {
      h: "The state instead of Wagner",
      p: (
        <>
          In December 2023 Russian deputy defence minister Yunus-Bek Yevkurov
          founded the <b>Africa Corps</b> — a state replacement for Wagner,
          answering to the defence ministry and the GRU. The corps deployed to
          Mali at the end of 2024, and in the summer of 2025 Wagner formally
          handed over its operations and left. More than the signboard changed:
          a private company that earned its own keep gave way to a state
          structure that has to be supplied{" "}
          <b>from the budget and by the navy</b>.
        </>
      ),
      refs: [21, 1],
    },
    {
      h: "It all rested on one man",
      p: (
        <>
          The whole construction rested on Assad. He paid for the 2015
          intervention that saved his regime, and he paid generously: a repair
          base for the fleet, an airfield for the African flights and legal
          immunity for the military — all of it from a single guarantor.
        </>
      ),
      refs: [13],
    },
  ],
};

const LABEL: Record<Lang, string> = {
  uk: "Карта: морський маршрут Новоросійськ — Босфор — Дарданелли — Тартус, ділянка під ескортом в Егейському морі та повітряні маршрути з авіабази Хмеймім до Лівії, Судану, ЦАР, Малі, Буркіна-Фасо й Нігеру",
  en: "Map: the sea route Novorossiysk — Bosphorus — Dardanelles — Tartus, the escorted stretch in the Aegean, and the air routes from Khmeimim air base to Libya, Sudan, the CAR, Mali, Burkina Faso and Niger",
};

const BASE_BOX: [Pt, Pt] = [
  [-16, -2],
  [44, 48],
];

export function TartusMap({ lang = "uk" }: { lang?: Lang }) {
  return (
    <ScrollMap
      dataUrl="/articles/syriyskyi-ekspres/tartus-map.json"
      baseBox={BASE_BOX}
      points={POINTS[lang]}
      legs={LEGS}
      steps={STEPS[lang]}
      cards={CARDS[lang]}
      lang={lang}
      label={LABEL[lang]}
    />
  );
}

export default TartusMap;
