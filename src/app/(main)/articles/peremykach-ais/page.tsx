import "../chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticleBySlug,
  requireVisibleArticle,
  formatDate,
  getAllArticles,
} from "@/lib/articles";
import ArticleHead from "@/components/ArticleHead";

const SLUG = "peremykach-ais";

/** Опис для пошуку й соцмереж — окремий текст, не дек: дек ставить питання,
 *  опис переказує зміст. Заголовок береться з фронтматера. */
const DESCRIPTION =
  "Що кібергрупи Берегової охорони США знайшли на танкерах тіньового флоту: підміна AIS і LRIT, віддалений доступ і стирання дисків, піратські ECDIS, генератор суднових печаток. І чого чекати європейським абордажним командам.";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG);
  return {
    title: `${getArticleBySlug(SLUG).title} — PLITKA Analytics`,
    description: DESCRIPTION,
  };
}

export default function Page() {
  requireVisibleArticle(SLUG);
  const related = getAllArticles()
    .filter((a) => a.slug !== SLUG)
    .slice(0, 3);

  return (
    <main data-screen-label="Стаття · Тіньовий флот">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Заголовок, дек і час читання — з фронтматера content/articles/peremykach-ais.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Розслідування" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <figure
            className="fig"
            data-placeholder="ЛІД-ФОТО: саморобний перемикач «AIS SELECTOR» з положеннями JRC і SAILOR, слайд 22 доповіді USCG на DEF CON 34 [1]. Твір федерального уряду США, суспільне надбання. Витягти з PDF у повній роздільності."
          />
        </div>
        <p className="lede">
          На одному з танкерів тіньового флоту, які США затримують від грудня
          2025 року, кібергрупа Берегової охорони сфотографувала саморобний
          перемикач. Маркером на ньому написано «AIS SELECTOR», а біля двох
          положень тумблера стоять назви виробників, JRC і SAILOR. Кожне
          положення вмикає окремий передавач, і кожен може транслювати іншу
          назву судна.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Знімок показали в серпні 2026 року в Лас-Вегасі на хакерській
          конференції DEF CON 34. Доповідь «Taking on the Dark Fleet… in
          Cyberspace!» читали командир 2003-ї групи кіберзахисту Берегової
          охорони США Кенні Мільтенбергер та інженер тієї ж групи Шейн Канчілла
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . У червні Кіберкомандування Берегової охорони виклало ті самі
          знахідки в щорічному звіті CTIME
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Разом це перший публічний опис того, що стоїть усередині танкерів із
          санкційною нафтою. Там знайшли підміну координат, програми віддаленого
          доступу, спроби стерти диски на відстані, піратське навігаційне ПЗ і
          генератор суднових печаток.
        </p>

        <p>
          Європа тим часом затримує такі танкери сама. На початку березня 2026
          року ВМС Бельгії за підтримки французьких гелікоптерів захопили в
          Північному морі танкер <strong>Ethera</strong>. Він ішов під фальшивим
          гвінейським прапором, а його суднові документи виявилися підробленими
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . 6 березня шведська поліція піднялася на борт вантажного судна{" "}
          <strong>Caffa</strong>, і одного з членів екіпажу підозрюють у
          використанні підробленого документа
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . 20 липня сили операції ЄС IRINI перевірили прапор танкера{" "}
          <strong>South Star</strong> у Середземному морі
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Кожна така команда заходить на судно, ключі від комп&apos;ютерів
          якого можуть лишатися в когось на березі.
        </p>

        <p>
          Що саме знайшли американці, як це працює і чого чекати європейським
          командам, розбираємо далі.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Кампанія</span>Кібероператори на
          штормтрапі
        </h2>

        <p>
          Тіньовим флотом називають танкери, які возять нафту з Росії, Ірану й
          Венесуели в обхід санкцій. Здебільшого це старі судна з непрозорими
          власниками, сумнівним страхуванням і прапорами, що часто змінюються
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . За оцінкою Дослідницької служби Конгресу США, яку наводять
          доповідачі, у 2024 році таких суден було близько 1600
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Розслідування нідерландського видання Follow the Money на початку
          2026 року налічило понад 1300 танкерів, і щонайменше третина з них,
          понад 500, ходили під фальшивими прапорами
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          У грудні 2025 року США почали затримувати такі судна у відкритому
          морі. Першим, 10 грудня, став танкер <strong>Skipper</strong>. Він
          ішов під прапором Гаяни, хоча сама Гаяна його реєстрацію не визнавала.
          20 грудня затримали <strong>Centuries</strong>, 7 січня{" "}
          <strong>Sophia</strong>
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Кампанія була спрямована передусім проти танкерів, пов&apos;язаних
          із Венесуелою
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Того ж 7 січня за 190 миль на південь від Ісландії американський
          спецназ висадився з гелікоптерів на танкер <strong>Marinera</strong>.
          Ще в грудні він звався Bella 1 і почав тікати від Берегової охорони,
          коли підходив до Венесуели. Переслідування тривало 18 днів і близько
          4000 миль. Дорогою екіпаж намалював на борту російський прапор, а
          Москва надіслала Вашингтону дипломатичну ноту з вимогою припинити
          гонитву. США визнали судно таким, що не має національності, і захопили
          його
          <a className="ref" href="#ref-8">
            [8]
          </a>
          .
        </p>

        <p>
          За підрахунком доповідачів, від грудня 2025 року у світі відбулося
          понад 19 фізичних затримань суден тіньового флоту. За попередні десять
          років їх було менше п&apos;яти. Слідом за США такі судна почали
          затримувати Індія, Бельгія, Франція, Швеція, Велика Британія,
          Фінляндія, Естонія й Німеччина
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Уперше разом зі штурмовими й правоохоронними групами на борт
          затриманих суден ішли кібероператори Берегової охорони
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Кіберкомандування виділило з груп кіберзахисту окремі команди
          кіберконтролю, Cyber Control Teams. Вони мають якнайшвидше взяти під
          контроль цифрове середовище судна, щоб воно безпечно дійшло до порту,
          а абордажна група й екіпаж не постраждали. Якщо час дозволяє, команда
          далі шукає загрози в мережі й закриває їх
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . У Береговій охороні цю процедуру називають позитивним
          кіберконтролем, POSCON
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="ФОТО: гелікоптер MH-60 Берегової охорони спускає члена команди кіберконтролю на палубу танкера тіньового флоту. CTIME 2025, с. 20 [2]. Твір федерального уряду США, суспільне надбання. Витягти з PDF."
        />

        <div className="qtbox">
          <p>
            «Коли йдеться про танкер завдовжки 1100 футів зі складними
            інформаційними й операційними системами на борту, а кіберпростір є
            таким самим полем операцій, ми зрозуміли, що для захоплення судна
            мало взяти під контроль його фізичне середовище. Те саме треба
            зробити й у кіберпросторі. Ці мережі можуть обернути на зброю наші
            супротивники»
            <a className="ref" href="#ref-9">
              [9]
            </a>
          </p>
          <p className="qtbox__src">
            контр-адмірал Джейсон Тама, командувач Кіберкомандування Берегової
            охорони США, 18 серпня 2026 року
          </p>
        </div>

        <p>
          Для кібероператорів, звиклих до корпоративних мереж, це була незвична
          робота. На слайдах доповіді вони піднімаються на борт по штормтрапу й
          лебідкою з гелікоптера, а обідають армійськими сухпайками просто на
          захопленому танкері
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          «Ми роками знали, що тіньовий флот несе серйозні фізичні ризики, бо
          знали, що вони ходять на старих суднах і не обслуговують їх. Але чого
          ми не знали до цих висадок, так це які кіберризики є на борту», —
          сказав Тама виданню The Wall Street Journal
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Ні звіт, ні доповідь не називають суден, з яких узято ту чи іншу
          знахідку. Названо лише один приклад, танкер Sophia, затриманий у
          Карибському морі
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The Wall Street Journal пише про танкери з іранською й російською
          нафтою
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        {/* TODO: § 01 Координати (AIS, NMEA, антени, LRIT) → § 02 Ідентичність (Stamp 0.62, фальшиві прапори, Marinera) → § 03 Ключі від берега (віддалений доступ, стирання, Eagle S) → § 04 Машинне відділення (піратське ПЗ, шкідливе ПЗ, IT/OT, ризик вибуху, VL Prosperity) → § 05 Європа (чого чекати) → висновок */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              Kenny Miltenberger, Shane Cancilla (U.S. Coast Guard, 2003 Cyber
              Protection Team) — «Taking on the Dark Fleet… in Cyberspace!»,
              слайди доповіді на DEF CON 34, серпень 2026.{" "}
              <a href="https://media.defcon.org/DEF%20CON%2034/DEF%20CON%2034%20presentations/DEF%20CON%2034%20-%20Kenneth%20Miltenberger,%20Shane%20Cancilla%20-%20Taking%20on%20the%20Dark%20Fleet...%20in%20Cyberspace!.pdf">
                media.defcon.org
              </a>
            </li>
            <li id="ref-2">
              U.S. Coast Guard Cyber Command — «Cyber Trends and Insights in the
              Marine Environment (CTIME) 2025», червень 2026. Розділ «Cyber
              Operations Aboard Dark Fleet Vessels», с. 20–22.{" "}
              <a href="https://www.uscg.mil/Portals/0/Images/cyber/CTIME2025.pdf">
                uscg.mil
              </a>
            </li>
            <li id="ref-3">
              Euronews — «Belgium seizes Russian shadow fleet tanker in North
              Sea crackdown», 01.03.2026.{" "}
              <a href="https://www.euronews.com/my-europe/2026/03/01/belgium-seizes-russian-shadow-fleet-tanker-in-north-sea-sanctions-crackdown">
                euronews.com
              </a>
            </li>
            <li id="ref-4">
              Euronews — «Sweden confiscates false-flagged Russian &apos;shadow
              fleet&apos; ship, prosecutors say», 29.04.2026.{" "}
              <a href="https://www.euronews.com/my-europe/2026/04/29/sweden-confiscates-false-flagged-russian-shadow-fleet-ship-prosecutors-say">
                euronews.com
              </a>
            </li>
            <li id="ref-5">
              gCaptain — «EU Naval Force Boards Sanctioned Russian Shadow Fleet
              Tanker Over Suspected False Flag», 22.07.2026.{" "}
              <a href="https://gcaptain.com/eu-naval-force-boards-sanctioned-russian-shadow-fleet-tanker-over-suspected-false-flag/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-6">
              Follow the Money — «Hundreds of shadow fleet ships sail under a
              false flag. The West is coming for them – but is it fast enough?»,
              12.02.2026.{" "}
              <a href="https://www.ftm.eu/articles/hundreds-of-shadow-fleet-ships-sail-under-false-flag">
                ftm.eu
              </a>
            </li>
            <li id="ref-7">
              USNI News — «U.S. Targeting Shadow Oil Fleets Using U.N. Law of
              the Sea Convention, Former Coast Guard JAGs Say», 22.01.2026.{" "}
              <a href="https://news.usni.org/2026/01/22/u-s-targeting-shadow-oil-fleets-using-u-n-law-of-the-sea-convention-former-coast-guard-jags-say">
                news.usni.org
              </a>
            </li>
            <li id="ref-8">
              CNN — «A painted flag, a Russian bluff and an 18-day chase across
              the Atlantic», 10.01.2026.{" "}
              <a href="https://www.cnn.com/2026/01/10/politics/a-painted-flag-a-russian-bluff-and-an-18-day-chase-across-the-atlantic">
                cnn.com
              </a>
            </li>
            <li id="ref-9">
              McCrary Institute, Cyber Focus Podcast №139 — «Boarding the Dark
              Fleet: Coast Guard Cyber and Maritime Security with RADM Jason
              Tama», 18.08.2026. Стенограма.{" "}
              <a href="https://mccraryinstitute.com/cyber-focus-podcast/139/boarding-the-dark-fleet-coast-guard-cyber-and-maritime-security-with-radm-jason-tama/">
                mccraryinstitute.com
              </a>
            </li>
            <li id="ref-10">
              The Insider — «&ldquo;Shadow fleet&rdquo; vessels found to have
              remote control and data deletion software, which creates risk of
              explosion and oil spills, WSJ reports», 16.06.2026. Переказ статті
              The Wall Street Journal «The Dangerous Tech Found Aboard
              &lsquo;Dark-Fleet&rsquo; Tankers Captured by the U.S.» від
              15.06.2026.{" "}
              <a href="https://theins.press/en/news/293776">theins.press</a>
            </li>
          </ol>
        </section>
      </div>

      {/* ============ RELATED ARTICLES ============ */}
      {related.length > 0 && (
        <section className="section section--beige">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Інші матеріали</h2>
              <Link href="/articles" className="section__more">
                Архів →
              </Link>
            </div>
            <div className="grid-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className={`card${a.leadImage ? " card--photo" : ""}`}
                >
                  {a.leadImage && (
                    <img src={a.leadImage} alt="" className="card__media" />
                  )}
                  <span className="card__date">{formatDate(a.date)}</span>
                  <span className="card__title">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
