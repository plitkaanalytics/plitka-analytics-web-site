import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "./ScrollMap";

/**
 * Карта російських об'єктів у Лівії до § 03 матеріалу «Сирійський експрес
 * змінює курс».
 *
 * Полотно малює scripts/build-libya-map.mjs — тут готовий SVG вклеюється в
 * розмітку; для кожної мови свій файл, бо підписи вросли в саму графіку.
 * Поруч із ним — тільки перелік об'єктів: що це за точки. Форму позначки
 * пояснює плашка на самій карті, зони — підписи в їхніх тілах, а політичний
 * ризик, оцінки чисельності й цитати живуть абзацами в статті: вони читаються
 * як текст і без карти.
 *
 * Читається на збірці, не в запиті: компонент серверний, клієнтського коду в
 * ньому немає зовсім.
 */
const SVG: Record<Lang, string> = {
  uk: readFileSync(
    join(process.cwd(), "public/articles/syriyskyi-ekspres/libya-objects.svg"),
    "utf8",
  ),
  en: readFileSync(
    join(
      process.cwd(),
      "public/articles/syriyskyi-ekspres/libya-objects-en.svg",
    ),
    "utf8",
  ),
};

/**
 * Картка об'єкта: номер, назва, рід і кілька рядків про сам об'єкт. Колір
 * роду той самий, що й у позначки на карті.
 */
function Card({
  n,
  name,
  role,
  tier,
  children,
}: {
  n: string;
  name: string;
  role: string;
  tier: "doc" | "image" | "list";
  children: React.ReactNode;
}) {
  return (
    <li className="lmap__card">
      <span className="lmap__n">{n}</span>
      <div>
        <p className="lmap__cardh">
          {name}{" "}
          <span className={"lmap__role lmap__role--" + tier}>{role}</span>
        </p>
        <p className="lmap__cardp">{children}</p>
      </div>
    </li>
  );
}

interface CardText {
  n: string;
  name: string;
  role: string;
  tier: "doc" | "image" | "list";
  body: React.ReactNode;
}

const CARDS: Record<Lang, CardText[]> = {
  uk: [
    {
      n: "01",
      name: "Тобрук",
      role: "порт",
      tier: "doc",
      body: (
        <>
          <b>6000&nbsp;тонн</b> техніки морем у квітні 2024 року. Аеродром за 16
          км південніше — це Ель-Адем, а не Ель-Кадім.
        </>
      ),
    },
    {
      n: "02",
      name: "Ель-Кадім",
      role: "авіабаза",
      tier: "doc",
      body: (
        <>
          Головна точка повітряного мосту, за сто кілометрів на схід від
          Бенгазі. 18 травня 2025 року Maxar зафіксував тут Ан-124, який за два
          дні до того злетів із Хмейміма.
        </>
      ),
    },
    {
      n: "03",
      name: "Ель-Джуфра",
      role: "авіабаза · штаб",
      tier: "doc",
      body: (
        <>
          Колишній опорний пункт «Вагнера», тепер штаб: навесні 2024-го сюди
          перекинули 1000–1500 бійців.
        </>
      ),
    },
    {
      n: "04",
      name: "Маатен ес-Сарра",
      role: "авіабаза",
      tier: "image",
      body: (
        <>
          Не працювала з <b>2011 року</b>. На знімках — відновлена смуга й нові
          склади; чи стоять там росіяни, невідомо.
        </>
      ),
    },
    {
      n: "05",
      name: "Гардабія",
      role: "авіабаза",
      tier: "list",
      body: (
        <>
          За 15 км південніше Сирта. Її звуть «новим Хмеймімом», але присутності
          росіян ніхто не підтвердив.
        </>
      ),
    },
    {
      n: "06",
      name: "Брак-еш-Шаті",
      role: "авіабаза",
      tier: "list",
      body: (
        <>
          Глибина Феццану. База ЛНА на південних лініях постачання; російського
          використання не підтверджено.
        </>
      ),
    },
  ],
  en: [
    {
      n: "01",
      name: "Tobruk",
      role: "port",
      tier: "doc",
      body: (
        <>
          <b>6,000&nbsp;tonnes</b> of equipment by sea in April 2024. The
          airfield 16 km to the south is Al-Adem, not Al-Khadim.
        </>
      ),
    },
    {
      n: "02",
      name: "Al-Khadim",
      role: "airbase",
      tier: "doc",
      body: (
        <>
          The main node of the air bridge, a hundred kilometres east of
          Benghazi. On 18 May 2025 Maxar caught an An-124 here that had taken
          off from Khmeimim two days earlier.
        </>
      ),
    },
    {
      n: "03",
      name: "Al-Jufra",
      role: "airbase · headquarters",
      tier: "doc",
      body: (
        <>
          A former Wagner stronghold, now a headquarters: 1,000–1,500 fighters
          were moved here in the spring of 2024.
        </>
      ),
    },
    {
      n: "04",
      name: "Maaten al-Sarra",
      role: "airbase",
      tier: "image",
      body: (
        <>
          Out of use since <b>2011</b>. Imagery shows a restored runway and new
          storage; whether Russians are based there is unknown.
        </>
      ),
    },
    {
      n: "05",
      name: "Ghardabiya",
      role: "airbase",
      tier: "list",
      body: (
        <>
          Fifteen kilometres south of Sirte. It is called the new Khmeimim, but
          no one has confirmed a Russian presence.
        </>
      ),
    },
    {
      n: "06",
      name: "Brak al-Shati",
      role: "airbase",
      tier: "list",
      body: (
        <>
          Deep in Fezzan. An LNA base on the southern supply lines; Russian use
          is unconfirmed.
        </>
      ),
    },
  ],
};

const SRC: Record<Lang, React.ReactNode> = {
  uk: (
    <>
      BISI · Foreign Policy · RUSI · CNN · RFI Info Vérif · All Eyes on Wagner ·
      Asharq Al-Awsat · Eekad · IEEE · геометрія Natural Earth 1:50m · відстані
      по великому колу. Смуга розмежування побудована за словесним описом
      контролю від 5 червня 2025 року
      <a className="ref" href="#ref-32">
        [32]
      </a>
      {": "}що менше подробиць дає опис, то ширша смуга.
    </>
  ),
  en: (
    <>
      BISI · Foreign Policy · RUSI · CNN · RFI Info Vérif · All Eyes on Wagner ·
      Asharq Al-Awsat · Eekad · IEEE · geometry from Natural Earth 1:50m ·
      great-circle distances. The band of control is drawn from a verbal
      description dated 5 June 2025
      <a className="ref" href="#ref-32">
        [32]
      </a>
      {": "}the vaguer the description, the wider the band.
    </>
  ),
};

export function LibyaMap({ lang = "uk" }: { lang?: Lang }) {
  return (
    <figure className="fig lmap">
      <div
        className="lmap__canvas"
        dangerouslySetInnerHTML={{ __html: SVG[lang] }}
      />

      <div className="lmap__side">
        <ol className="lmap__cards">
          {CARDS[lang].map((c) => (
            <Card key={c.n} n={c.n} name={c.name} role={c.role} tier={c.tier}>
              {c.body}
            </Card>
          ))}
        </ol>
      </div>

      <figcaption className="lmap__src">{SRC[lang]}</figcaption>
    </figure>
  );
}

export default LibyaMap;
