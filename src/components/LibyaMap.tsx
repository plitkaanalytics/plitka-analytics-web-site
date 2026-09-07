import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Карта російських об'єктів у Лівії до § 03 матеріалу «Сирійський експрес
 * змінює курс».
 *
 * Полотно малює scripts/build-libya-map.mjs — тут готовий SVG вклеюється в
 * розмітку. Поруч із ним — тільки перелік об'єктів: що це за точки. Форму
 * позначки пояснює плашка на самій карті, зони — підписи в їхніх тілах, а
 * політичний ризик, оцінки чисельності й цитати живуть абзацами в статті:
 * вони читаються як текст і без карти.
 *
 * Читається на збірці, не в запиті: компонент серверний, клієнтського коду в
 * ньому немає зовсім.
 */
const svg = readFileSync(
  join(process.cwd(), "public/articles/syriyskyi-ekspres/libya-objects.svg"),
  "utf8",
);

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

export function LibyaMap() {
  return (
    <figure className="fig lmap">
      <div className="lmap__canvas" dangerouslySetInnerHTML={{ __html: svg }} />

      <div className="lmap__side">
        <ol className="lmap__cards">
          <Card n="01" name="Тобрук" role="порт" tier="doc">
            <b>6000&nbsp;тонн</b> техніки морем у квітні 2024 року. Аеродром за
            16 км південніше — це Ель-Адем, а не Ель-Кадім.
          </Card>

          <Card n="02" name="Ель-Кадім" role="авіабаза" tier="doc">
            Головна точка повітряного мосту, за сто кілометрів на схід від
            Бенгазі. 18 травня 2025 року Maxar зафіксував тут Ан-124, який за
            два дні до того злетів із Хмейміма.
          </Card>

          <Card n="03" name="Ель-Джуфра" role="авіабаза · штаб" tier="doc">
            Колишній опорний пункт «Вагнера», тепер штаб: навесні 2024-го сюди
            перекинули 1000–1500 бійців.
          </Card>

          <Card n="04" name="Маатен ес-Сарра" role="авіабаза" tier="image">
            Не працювала з <b>2011 року</b>. На знімках — відновлена смуга й
            нові склади; чи стоять там росіяни, невідомо.
          </Card>

          <Card n="05" name="Гардабія" role="авіабаза" tier="list">
            За 15 км південніше Сирта. Її звуть «новим Хмеймімом», але
            присутності росіян ніхто не підтвердив.
          </Card>

          <Card n="06" name="Брак-еш-Шаті" role="авіабаза" tier="list">
            Глибина Феццану. База ЛНА на південних лініях постачання;
            російського використання не підтверджено.
          </Card>
        </ol>
      </div>

      <figcaption className="lmap__src">
        BISI · Foreign Policy · RUSI · CNN · RFI Info Vérif · All Eyes on Wagner
        · Asharq Al-Awsat · Eekad · IEEE · геометрія Natural Earth 1:50m ·
        відстані по великому колу. Смуга розмежування побудована за словесним
        описом контролю від 5 червня 2025 року
        <a className="ref" href="#ref-32">
          [32]
        </a>
        {": "}що менше подробиць дає опис, то ширша смуга.
      </figcaption>
    </figure>
  );
}

export default LibyaMap;
