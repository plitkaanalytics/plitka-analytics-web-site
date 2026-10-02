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
            data-placeholder="ЛІД-ФОТО: гелікоптер MH-60 Берегової охорони спускає члена команди кіберконтролю на палубу танкера тіньового флоту. CTIME 2025, с. 20 [2]. Твір федерального уряду США, суспільне надбання. Витягти з PDF."
          />
        </div>
        <p className="lede">
          У серпні на хакерській конференції DEF CON 34 у Лас-Вегасі
          кібероператори Берегової охорони США показали особливості своєї роботи
          щодо танкерів тіньового флоту Та продемонстрували, які технічні
          рішення оператори затриманих танкерів використовують для введення в
          оману. Від грудня 2025 року затримань таких танкерів у світі відбулося
          понад 19, тоді як за попередні десять років їх було менше п&apos;яти.
          Нині, разом із штурмовиками, на борт піднімаються люди з ноутбуками.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Раніше, у червні 2026 року Кіберкомандування Берегової охорони США
          виклало у щорічному звіті CTIME частину цікавих та не звичайних
          цифрових інструментів, які широко використовуються сучасними танкерами
          тіньового флоту
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Доповідь «Taking on the Dark Fleet… in Cyberspace!», яку читали
          читали командир 2003-ї групи кіберзахисту Берегової охорони Кенні
          Мільтенбергер та мережевий інженер тієї ж групи Шейн Канчілла, додала
          до звіту ряд додаткових механізмів, які особливо цікаві з інженерної
          точки зору
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Виявилося, що сучасні незаконні перевезення являють собою складний
          комплекс інженерних та цифрових рішень, що включають підміну
          координат, програми віддаленого доступу, спроби стерти диски на
          відстані й піратське навігаційне ПЗ.
        </p>

        <p>
          Тим часом у берегів Європи відбувають схожі процеси. На початку
          березня 2026 року ВМС Бельгії за підтримки французьких гелікоптерів
          захопили в Північному морі танкер <strong>Ethera</strong>. Він ішов
          під фальшивим гвінейським прапором, а його суднові документи виявилися
          підробленими
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
          В той час, як боротьба з тіньовою флотилією набирає обертів, сам флот
          стає все винахідливішим та здатен на неймовірні трюки в такій складній
          області, як міжнародне морське право. Що саме знайшли американці, як
          це працює і чого чекати європейським командам, розбираємо далі в
          нашому новому матеріалі.
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
          <a className="ref" href="#ref-2">
            [2]
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
          . Слідом за США судна тіньового флоту почали затримувати Індія,
          Бельгія, Франція, Швеція, Велика Британія, Фінляндія, Естонія й
          Німеччина
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Те, що на ці судна разом з озброєними спецпризначенцями заходять
          кібергрупи Берегової охорони, раніше не афішувалося
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . Кіберкомандування виділило з груп кіберзахисту окремі команди
          кіберконтролю, Cyber Control Teams, і вперше відправило їх на борт
          разом зі штурмовими й правоохоронними групами
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . В їх задачу входить якнайшвидше взяти під контроль цифрове
          середовище судна, щоб нівелювати зовнішннє втручання та доправити його
          до порту у первозданному вигляді. Якщо час дозволяє, команда просто на
          борту шукає загрози в мережі й закриває їх
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . У Береговій охороні цю процедуру називають позитивним
          кіберконтролем, POSCON
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <div className="qtbox">
          <p>
            «Коли йдеться про танкер завдовжки 1100 футів зі складними
            інформаційними й операційними системами на борту, а кіберпростір по
            суті теж є полем операцій, то ми зрозуміли, що для захоплення судна
            мало взяти під контроль його фізичне середовище. Те саме треба
            зробити й у кіберпросторі
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
          Для кібероператорів, що звиклих до корпоративних мереж, це була
          незвична робота. Згідно їх звіту, вони були змушені вони піднімаютися
          на борт по штормтрапу й лебідкою з гелікоптера, а обідати армійськими
          сухпайками просто на захопленому танкері
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          «Ми роками знали, що тіньовий флот несе серйозні ризики, вони ходять
          на старих суднах і не обслуговують їх. Але чого ми не знали до цих
          висадок, так це які кіберризики є на борту», — сказав Тама виданню The
          Wall Street Journal
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Ні звіт, ні доповідь не називають суден, з яких узято ту чи іншу
          знахідку, крім одного приклалу з танкером Sophia, затриманим у
          Карибському морі
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . The Wall Street Journal пише, що в основному це були судна з
          іранською й російською нафтою
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-coords">
          <span className="h2-num">§ 01 · AIS</span>Мистецтво телепортації
        </h2>

        <p>
          Кожне торгове судно світового флоту повідомляє, де воно знаходиться,
          через систему{" "}
          <span
            className="term"
            data-def="Автоматична ідентифікаційна система. Передавач на борту, який транслює назву судна, його координати, курс і швидкість сусіднім суднам, береговим станціям і супутникам."
          >
            AIS
          </span>
          . Передавач на борту безперервно транслює назву судна, його
          ідентифікатор, координати, курс і швидкість. Ці сигнали приймають
          сусідні судна, берегові станції й супутники, а з них дані потрапляють
          у відкриті сервіси відстеження суден.
        </p>

        <p>
          Сам передавач свого місця не знає. Координати йому подає суднова
          система супутникової навігації, найчастіше приймач GPS, звичайною
          послідовною лінією. Прилади на містку обмінюються даними рядками
          стандарту NMEA 0183, і цією ж мовою говорять приймач GPS, AIS, радар
          та інші навігаційні прилади
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Назву судна й ідентифікатор у передавач вносять під час
          налаштування.
        </p>

        <p>
          На деяких танкерах тіньового флоту стояло по кілька передавачів AIS, і
          назву, під якою судно бачить світ, змінювали одним перемиканням
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Перемикач на фото з доповіді зроблено вручну. Маркером на ньому
          написано «AIS SELECTOR», а біля положень тумблера назви двох
          виробників, JRC і SAILOR
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="ФОТО: саморобний перемикач «AIS SELECTOR» з положеннями JRC і SAILOR, слайд 22 [1]; у CTIME с. 21 є те саме фото й саморобний кабель [2]. Твір федерального уряду США, суспільне надбання. Витягти з PDF."
        />

        <p>
          Координати підміняли через лінію даних. Найчастіше команди
          кіберконтролю бачили таку схему: до роз&apos;єму даних на блоці AIS
          припаювали саморобний кабель CAT6, а на другому кінці стояв ноутбук із
          програмою для тестування морських приладів. Програма генерує ті самі
          рядки NMEA 0183, що в нормі йдуть від приймача GPS, і передавач
          транслював вигадану позицію як справжню
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Для налагодження обладнання це звичайний інструмент. Як приклад
          програми такого типу доповідачі показують NemaTalker
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . На містках знаходили й зрощені послідовні лінії між приймачем GPS і
          навігаційними приладами
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Навколо антен на рульовій рубці деяких танкерів стояли, схоже,
          екранувальні клітки. На фото з доповіді антену обмотано фольгою й
          скотчем. Доповідачі вважають, що так відрізали прийом справжнього
          сигналу GPS, щоб він не заважав підміні
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="ФОТО: антена на рубці танкера, обмотана фольгою й скотчем, слайд 20 [1]. Твір федерального уряду США, суспільне надбання. Витягти з PDF."
        />

        <p>
          Серед файлів на борту знайшли й кілька докладних інструкцій з іншими
          способами подавати AIS хибні дані GPS
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Контр-адмірал Девід Барата, заступник командувача Берегової охорони
          з оперативної політики, розповів The Wall Street Journal про судно,
          яке за своїм сигналом стояло біля Кюрасао, а насправді було біля
          берегів Венесуели й везло туди нафту
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          AIS бачать усі: сусідні судна, берегові станції, відкриті сервіси
          відстеження. Є й закритий канал. Судна понад 300 тонн валової
          місткості за вимогою Міжнародної морської організації кожні шість
          годин повідомляють свою назву й координати через систему{" "}
          <span
            className="term"
            data-def="Long Range Identification and Tracking, система далекої ідентифікації та відстеження суден. Звіти йдуть закритим супутниковим каналом лише державним органам."
          >
            LRIT
          </span>
          , зазвичай через супутниковий термінал Inmarsat-C. Ці звіти отримують
          лише держава прапора, прибережна й портова держави та рятувальні
          служби
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Підробити LRIT, за словами доповідачів, на практиці складніше, ніж
          AIS, а з погляду права й безпеки це значно серйозніше порушення. Для
          цього треба або імітувати зовнішній GPS, або змінити прошивку
          терміналу. На суднах знайшли спільну прошивку для терміналів
          Inmarsat-C. Коли судно починало підміняти AIS, у LRIT змінювалася і
          його позиція. Тобто термінал брав координати з того самого
          підробленого джерела, а не з власного приймача GPS, як у новіших
          моделях
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Так судно ховається вже не від сторонніх спостерігачів, а від держави
          прапора й прибережних держав, і саме це допомагає йому уникати санкцій
          і переслідування. Доповідачі називають ще один наслідок. Якщо поруч
          трапиться аварія, рятувальники не знатимуть, що це судно могло б
          прийти на допомогу
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <div className="callout">
          <p>
            Підміна місця на танкерах тіньового флоту йде одразу на трьох
            рівнях. Залізо: саморобний кабель, перемикач між передавачами, екран
            на антені. Програма: ноутбук, що генерує дані GPS. Державна
            звітність: LRIT, яка повторює ту саму вигадану позицію.
          </p>
        </div>

        {/* TODO: § 02 Ідентичність (Stamp 0.62, імена списаних суден, фальшиві прапори Ethera/Caffa/FTM, Marinera: прапор на борту, вимкнені транспондери, 17 танкерів під російським прапором) → § 03 Ключі від берега (віддалений доступ, стирання, Eagle S) → § 04 Машинне відділення (піратське ПЗ, шкідливе ПЗ, IT/OT, ризик вибуху, VL Prosperity) → § 05 Європа (чого чекати) → висновок */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              U.S. Coast Guard Cyber Command — «Cyber Trends and Insights in the
              Marine Environment (CTIME) 2025», червень 2026. Розділ «Cyber
              Operations Aboard Dark Fleet Vessels», с. 20–22.{" "}
              <a href="https://www.uscg.mil/Portals/0/Images/cyber/CTIME2025.pdf">
                uscg.mil
              </a>
            </li>
            <li id="ref-2">
              Kenny Miltenberger, Shane Cancilla (U.S. Coast Guard, 2003 Cyber
              Protection Team) — «Taking on the Dark Fleet… in Cyberspace!»,
              слайди доповіді на DEF CON 34, серпень 2026.{" "}
              <a href="https://media.defcon.org/DEF%20CON%2034/DEF%20CON%2034%20presentations/DEF%20CON%2034%20-%20Kenneth%20Miltenberger,%20Shane%20Cancilla%20-%20Taking%20on%20the%20Dark%20Fleet...%20in%20Cyberspace!.pdf">
                media.defcon.org
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
              DEF CON 34 — програма Main Stage, анонс доповіді «Taking on the
              Dark Fleet… in Cyberspace!» і біографії доповідачів, серпень 2026.{" "}
              <a href="https://defcon.org/html/defcon-34/dc-34-speakers.html">
                defcon.org
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
            <li id="ref-11">
              Spotmedia.ro — «Time bombs on the oceans: Dangerous technology on
              board tankers captured by the USA», 17.06.2026. Переказ статті The
              Wall Street Journal; слова контр-адмірала Барати в переказі.{" "}
              <a href="https://spotmedia.ro/en/news/news/time-bombs-on-the-oceans-dangerous-technology-on-board-tankers-captured-by-the-usa">
                spotmedia.ro
              </a>
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
