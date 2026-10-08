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

const SLUG = "zahrozy-torhovelnomu-flotu";

/** Опис для пошуку й соцмереж — окремий текст, не дек: дек ставить питання,
 *  опис переказує зміст. Заголовок береться з фронтматера. */
const DESCRIPTION =
  "OSINT-розбір війни проти торговельного судноплавства восени 2026 року: удари по суднах у ВЕЗ Румунії й Болгарії, тіньовий флот біля Сочі, блокада Ормузу, ціна для України, Росії та світового ринку продовольства й пального.";

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
    <main data-screen-label="Стаття · Торговельний флот">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Заголовок, дек і час читання — з фронтматера content/articles/zahrozy-torhovelnomu-flotu.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Розслідування" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <figure
            className="fig"
            data-placeholder="ОБКЛАДИНКА: Aframax Rio у вогні біля Сочі ввечері 6.10 (кадр із соцмереж, AFPTV / ASTRA) або Alfa Watan у морі (VesselFinder). Умова публікації — уточнити."
          ></figure>
        </div>
        <p className="lede">
          Близько третьої ночі 6 жовтня 2026 року за 70 морських миль на схід
          від болгарського міста Бяла морський і повітряний дрони вдарили по
          двох суховантажах. Один з них, Alfa Watan під прапором Того, пішов на
          дно. За словами начальника оборони Болгарії адмірала Еміла Ефтімова,
          екіпаж мав <strong>три хвилини</strong>, щоб встигнути врятуватися
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Рятувальники знайшли перекинутий човен, три плоти й рятувальні
          жилети. Десятьох моряків знайти не вдалося, того ж дня пошук припинили
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Напередодні, біля румунської газової платформи Pescăruș, від удару
          затонув зерновоз Royad Mammadov. За три години до удару він вийшов з
          українського Ізмаїла з кукурудзою для італійської Равенни
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Капітан загинув
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Того ж 6 жовтня російський дрон уразив біля Одещини судно під
          прапором Маршаллових Островів з ріпаковою олією, загинув стюард
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . А ввечері за одинадцять кілометрів від Сочі загорівся танкер Aframax
          Rio, і нафта відкрито ефектно горіла на воді, вражаючи
          відпочивальників на набережній
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Війна проти судноплавства в Чорному морі продовжує переходити все
          нові межі та досягає нових рівнів жорстокості з кожним днем.
        </p>

        <p>
          1 жовтня 1946 року Міжнародний військовий трибунал у Нюрнберзі визнав
          гросадмірала Карла Деніца винним у порушенні Лондонського протоколу
          1936 року. Протокол забороняв військовому кораблю, надводному чи
          підводному, топити торговельне судно, не перевівши спершу екіпаж у
          безпечне місце, і рятувальні шлюпки таким місцем не вважалися
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . Трибунал записав у вироку, що протокол чіткий та зрозумілий: якщо
          командир не може врятувати людей, він не має права топити судно і
          повинен дати йому пройти неушкодженим повз свій перископ
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . До протоколу приєдналися і Сполучені Штати, і Радянський Союз
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Вісімдесят років по тому ця норма не захистила жодного з цих суден.
          Затонулі кораблі йшли у виключних економічних зонах Румунії й
          Болгарії, у водах країн НАТО, які не воюють, і жодне не перебувало
          навіть під санкціями
          <a className="ref" href="#ref-11">
            [11]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . За три тисячі кілометрів на схід, в Ормузькій протоці, танкери
          горять уже восьмий місяць. Чому торговельне судно сьогодні не захищає
          ні прапор, ні нейтральні води, ні країна, у водах якої воно йде, і хто
          заплатить за війну на морі з власної кишені та порожнім шлунком,
          розбираємо в новому матеріалі Plitka Analytics.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Море</span>Судноплавство небезпечних
          вод
        </h2>

        <p>
          Судна, які везуть через Чорне море зерно, нафту й добрива, здебільшого
          не належать ні Україні, ні Росії. Alfa Watan, збудований 1976 року,
          ходив під прапором Того і належав компанії Baraka Shipping з
          турецького Мерсина
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Двадцятирічний Royad Mammadov ходив під прапором Сент-Кітс і Невіс,
          був записаний на компанію MG Shipping 5, а комерційно ним керувала
          стамбульська Spring Marine
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . На борту Able, другого судна з-під Бяли, було одинадцять громадян
          Туреччини й семеро громадян Індії
          <a className="ref" href="#ref-1">
            [1]
          </a>
          , на Royad Mammadov були громадяни Азербайджану та Індії
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Так виглядає{" "}
          <span
            className="term"
            data-def="Судна, які не ходять за сталим розкладом, а беруть вантаж там, де є фрахт. Здебільшого старі, під прапорами зручних країн, з міжнародними екіпажами."
          >
            трамповий флот
          </span>
          , на якому тримається світова торгівля. Судно, прапор, власник і
          екіпаж належать різним державам, і часто жодна з них не воює у війні
          жертвою якої стає.
        </p>

        <p>
          16 вересня 2026 року{" "}
          <span
            className="term"
            data-def="Joint War Committee — комітет лондонського страхового ринку, що складає перелік акваторій підвищеного воєнного ризику. На нього орієнтуються страховики суден у всьому світі."
          >
            Об&apos;єднаний воєнний комітет
          </span>{" "}
          лондонського страхового ринку розширив зону воєнного ризику на все
          Чорне море. Поза нею лишилися тільки 12-мильні територіальні води
          Туреччини, Румунії, Болгарії та Грузії
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Доти до зони входили лише води біля берегів Росії та України. Рейс
          через неї не заборонено, але судновласник мусить попередити страховика
          й сплатити додаткову премію, а подекуди отримувати відмову в покритті
          <a className="ref" href="#ref-14">
            [14]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="КАРТА: Чорне море. Стара зона воєнного ризику JWC (води біля РФ і України) і нова за JWLA-035 від 16.09.2026 (усе море, крім 12 миль Туреччини, Румунії, Болгарії, Грузії). Точки 5–6.10: Royad Mammadov біля Pescăruș, Alfa Watan і Able за 70 миль від Бяли, судно під прапором Маршаллових Островів біля Одещини, Aframax Rio за 11 км від Сочі. Власна графіка редакції."
        >
          <figcaption>
            Зона воєнного ризику в Чорному морі до і після 16 вересня 2026 року
            та удари 5–6 жовтня. Графіка PLITKA Analytics.
          </figcaption>
        </figure>

        <p>
          За підрахунками компанії морської безпеки Ambrey, за дванадцять
          місяців до 21 вересня 2026 року поза старою зоною уразили{" "}
          <strong>45 торговельних суден</strong>, а за попередні дванадцять
          місяців жодного. У самій старій зоні в п&apos;ятий рік війни в
          середньому уражають 28 суден на місяць проти чотирьох роком раніше
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Ambrey пояснює стрибок тим, що обидві воюючі сторони налагодили
          промислове виробництво повітряних і морських дронів і спрямували їх
          передусім проти торгівлі супротивника, а не проти його флоту. Росія
          б&apos;є по українському експортному коридору, тобто по портах Великої
          Одеси й Дунаю та по суднах біля причалів, на якорі й у морі. Україна з
          кінця листопада 2025 року атакує судна, що ходять у російські порти,
          насамперед танкери тіньового флоту, а з липня 2026 року також
          суховантажі, контейнеровози й ро-ро
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Плавучих вибухонебезпечних предметів поза водами Росії та України за
          рік знайшли майже вшестеро більше, 65 проти 11, і замість мін тепер
          дрейфують безекіпажні катери та уламки дронів
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Міжнародна морська організація (IMO) називає війну «серйозною і
          безпосередньою загрозою» для екіпажів і суден у Чорному та Азовському
          морях
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          Чорне море не єдине. Війна США та Ізраїлю з Іраном, що почалася 28
          лютого 2026 року, перетворила на зону полювання Ормузьку протоку, якою
          до війни йшла п&apos;ята частина світової нафти
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . За даними IMO, до кінця серпня там загинули щонайменше двадцять
          моряків і портовиків
          <a className="ref" href="#ref-16">
            [16]
          </a>
          . Обидва театри б&apos;ють по ринках зерна, добрив і дизельного
          пального, від чого неабияк страждає весь світовий ринок
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-west">
          <span className="h2-num">§ 01 · Води НАТО</span>Без провокацій
        </h2>

        <figure
          className="fig"
          data-placeholder="ФОТО: моряки з Able сходять на берег у Варні з катера прикордонної поліції, 6.10.2026 (BTA / Rumen Sarandev або Reuters / Petko Momchilov). Умова публікації — уточнити."
        >
          <figcaption>
            Моряки з Able у Варні, 6 жовтня 2026 року. [ джерело й умова
            публікації ]
          </figcaption>
        </figure>

        <p>
          Royad Mammadov віз українську кукурудзу з Ізмаїла
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Ішов він уздовж румунського берега, маршрутом, який за усією логікою
          мав бути безпечним, адже за міжнародною логікою ця територія належить
          країні НАТО
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Москва полювання на такі судна не приховує. За день до удару по
          Royad Mammadov Міноборони РФ заявило, що «поражены два морских судна
          типа сухогруз, доставлявшие в порт Одесса военное имущество». Назв
          суден відомство не навело і доказів не показало
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . Після потоплення Alfa Watan посольство Росії в Болгарії заявило
          Reuters, що обидва судна «не були в переліку цілей» Міноборони, і
          закликало розслідувати, чиї це були дрони
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          Водночас український вантаж не був обов&apos;язковою ознакою цілі. За
          даними сервісу MagicPort, Royad Mammadov за останній рік заходив у
          російські Єйськ, Азов і Тамань, а також у Стамбул і Хайфу
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . Alfa Watan побував у Бургасі, Суліні, Тульчі, Стамбулі й сирійському
          Тартусі
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Це звичайний трамповий тоннаж, який возить вантажі всім сторонам, і
          саме по ньому припав удар.
        </p>

        <div className="callout callout--warn">
          <div className="callout__title">Софія й Бухарест мовчать</div>
          <p>
            Жодна з двох держав, у чиїх водах тонули судна, атакувальника не
            назвала. Міністерство внутрішніх справ Румунії причину пожежі на
            Royad Mammadov не вказало
            <a className="ref" href="#ref-21">
              [21]
            </a>
            . Радев сказав, що дрони були «явно або російськими, або
            українськими»
            <a className="ref" href="#ref-1">
              [1]
            </a>
            . Того ж вечора, коли Зеленський говорив про встановлену спільно з
            болгарами російську атаку{" "}
            <a className="ref" href="#ref-22">
              [22]
            </a>
            , міністр оборони Болгарії Дімітар Стоянов заявив інше. «Потрібно
            знайти уламки дронів або щоб одна зі сторін взяла на себе
            відповідальність, але цього не сталося, тому ми не можемо
            підтвердити, чи вони українські, чи російські»
            <a className="ref" href="#ref-23">
              [23]
            </a>
            .
          </p>
          <p>
            Обережність Софії має контекст. У червні 2026 року Болгарія зупинила
            військову допомогу Україні, а в серпні, після вибуху дрона біля
            Трансбалканського газогону, її Міноборони заявляло, що дрон був
            типу, «широко вживаного українськими військовими»
            <a className="ref" href="#ref-24">
              [24]
            </a>
            .
          </p>
          <p>
            Єврокомісія діє інакше. Її речник Крістіан Віганд назвав атаки на
            судна з пшеницею «абсолютно неприйнятними» і закликав саме Росію
            «припинити всі дії, які ставлять під загрозу міжнародне
            судноплавство та життя моряків». На прохання Румунії й Болгарії ЄС
            передає їм супутникові знімки
            <a className="ref" href="#ref-25">
              [25]
            </a>
            .
          </p>
        </div>

        <p>
          Андрій Клименко з Інституту чорноморських стратегічних досліджень
          назвав події 5–6 жовтня «полюванням на судна турецьких власників» і
          стверджує, що Alfa Watan і Royad Mammadov пов&apos;язані з однією
          стамбульською компанією Spring Marine
          <a className="ref" href="#ref-26">
            [26]
          </a>
          . Підтвердити цю тезу ми не можемо. Spring Marine справді є
          комерційним менеджером Royad Mammadov, але Alfa Watan, за даними
          MagicPort, і належить, і управляється мерсинською Baraka Shipping
          <a className="ref" href="#ref-12">
            [12]
          </a>
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-danube">
          <span className="h2-num">§ 02 · Від Одеси до Суліни</span>Куди йдуть
          вантажі, туди летять дрони
        </h2>

        <p>
          Удари біля Румунії й Болгарії стали продовженням кампанії, яку Росія
          веде проти українського морського коридору з початку літа. Лише в
          липні 2026 року вона 67 разів атакувала об&apos;єкти морських портів,
          35 разів судна біля причалів і ще 22 рази судна в коридорі
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . 13 липня в акваторії Чорноморська загинули п&apos;ятеро іноземних
          моряків на судні під прапором Того з добривами, 17 і 18 липня ще
          четверо моряків у портах Миколаєва й Одеси
          <a className="ref" href="#ref-28">
            [28]
          </a>
          .
        </p>

        <p>
          19 липня три крилаті ракети влучили в балкер Golden Leo під прапором
          Гвінеї-Бісау, який виходив з порту Великої Одеси з кукурудзою.
          Загинули десятеро людей, серед них український лоцман
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . Адміністрація морських портів України назвала цей удар однією з
          подій, що змінили погляд судновласників і страховиків на ризик заходу
          в Одесу. 22 липня в порти Великої Одеси не зайшло жодне судно, уперше
          відтоді, як запрацював коридор. За весь липень їх зайшло 169, а за
          перші одинадцять днів серпня лише сім
          <a className="ref" href="#ref-29">
            [29]
          </a>
          .
        </p>

        <p>
          Вантажі пішли туди, де ще можна було вантажитися, на Дунай. За
          підрахунками Ambrey, частка дунайських портів в обробці вантажів
          українських портів зросла з приблизно 10% у першому півріччі до 74% у
          серпні. Кластер Великої Одеси впав із 7,9 мільйона тонн у квітні до
          430 тисяч тонн у серпні, а Дунай майже подвоївся за місяць, до 1,24
          мільйона тонн. Кількість заходів суден у дунайські порти зросла з 363
          до 737
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="ГРАФІК: перевалка Великої Одеси й дунайських портів по місяцях 2026 року (квітень — 7,9 млн т Одеса; серпень — 430 тис. т Одеса, 1,24 млн т Дунай; частка Дунаю ~10% у I півріччі → 74% у серпні). Дані Ambrey / АМПУ. Власна графіка редакції."
        >
          <figcaption>
            Перевалка Великої Одеси й Дунаю у 2026 році. Графіка PLITKA
            Analytics за даними Ambrey.
          </figcaption>
        </figure>

        <p>
          Слідом за вантажами на Дунай прийшли й удари. У липні–вересні біля
          Ізмаїла, Рені й Кілії траплялося в 3,7 раза більше інцидентів на
          місяць, ніж у першому півріччі. З липня Ambrey нарахувала щонайменше
          дев&apos;ять уражених суден на підходах до Дунаю, п&apos;ять із них у
          румунських водах
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . Компанія сформулювала це так: «Дунай більше не просто альтернативний
          маршрут. Він тепер частина спірної лінії фронту морської торгівлі
          України. Куди йдуть обсяги, туди йдуть і удари, від причалу до
          відкритого моря»
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <p>
          Такого навантаження Дунай не витримує. У липні витрата води на
          румунській ділянці впала до 1700 кубометрів на секунду проти звичних
          4700, найменше з 1996 року, і баржі стояли
          <a className="ref" href="#ref-29">
            [29]
          </a>
          . Наприкінці серпня на вхід у Дунай чекали близько 80 суден
          <a className="ref" href="#ref-31">
            [31]
          </a>
          , а 5 жовтня біля Суліни в черзі стояло до 125 суден, і очікування
          тривало 14–17 днів. Ambrey звертає увагу, що черга збирає судна в
          передбачуваних точках у межах досяжності дронів
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <p>
          Під удар потрапляють і ті, хто ще заходить в Одесу. 17 вересня
          російський дрон убив капітана судна під прапором Танзанії, яке йшло в
          український порт, а 3 жовтня в порту Одещини загинув моряк із судна
          під прапором Ліберії
          <a className="ref" href="#ref-32">
            [32]
          </a>
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        {/* TODO: § 03 Схід моря (+ aside Ла-Манш і Балтика) → § 04 Ормуз (+ aside Кариби) → § 05 Чому судна ніхто не захищає → § 06 Ціна для обох берегів → § 07 Хто платить за чужу війну → § 08 Висновок */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              BTA — «Drone Attack on Two Merchant Ships in Bulgaria&apos;s
              Exclusive Economic Zone Prompts President to Convene Security
              Council», 06.10.2026.{" "}
              <a href="https://www.bta.bg/en/news/bulgaria/1218986-drone-attack-on-two-merchant-ships-in-bulgaria-s-exclusive-economic-zone-prompts">
                bta.bg
              </a>
            </li>
            <li id="ref-2">
              Euronews — «Bulgaria calls off search for 10 missing sailors after
              drone attack sinks cargo ship», 06.10.2026, оновлено 07.10.2026.{" "}
              <a href="https://www.euronews.com/2026/10/06/drones-hit-two-ships-off-coast-of-bulgaria-as-government-calls-emergency-meeting">
                euronews.com
              </a>
            </li>
            <li id="ref-3">
              Euronews — «Turkish grain ship sinks in Black Sea after deadly
              drone attack», 05.10.2026.{" "}
              <a href="https://www.euronews.com/2026/10/05/drone-reportedly-hits-ship-in-black-sea-killing-two-and-injuring-11">
                euronews.com
              </a>
            </li>
            <li id="ref-4">
              The Kyiv Independent — «Russian drones strike cargo ship in Black
              Sea, kill captain, Zelensky says», 05.10.2026.{" "}
              <a href="https://kyivindependent.com/russian-drones-strike-cargo-ship-in-black-sea-kill-captain-zelensky-says/">
                kyivindependent.com
              </a>
            </li>
            <li id="ref-5">
              The Kyiv Independent — «Drones strike merchant vessels in Black
              Sea off Bulgaria, Ukraine, killing at least 1», 06.10.2026.{" "}
              <a href="https://kyivindependent.com/drones-strike-merchant-vessels-in-black-sea-off-bulgaria-and-ukraine-killing-at-least-one/">
                kyivindependent.com
              </a>
            </li>
            <li id="ref-6">
              PortNews (Telegram) — заява Мінтрансу РФ про атаку на танкер
              «Афрамакс Рио», 06.10.2026. Російське джерело, дані заявлені.{" "}
              <a href="https://t.me/PortNews_ru/14452">t.me/PortNews_ru</a>
            </li>
            <li id="ref-7">
              «Крымский ветер» (Telegram) — місце пожежі за супутниковими
              даними, 06.10.2026. Telegram-канал моніторингу.{" "}
              <a href="https://t.me/Crimeanwind/110645">t.me/Crimeanwind</a>
            </li>
            <li id="ref-8">
              Procès-verbal relating to the Rules of Submarine Warfare set forth
              in Part IV of the Treaty of London of 22 April 1930, London,
              06.11.1936. Текст за University of Minnesota Human Rights Library.{" "}
              <a href="https://hrlibrary.umn.edu/instree/1936a.htm">
                hrlibrary.umn.edu
              </a>
            </li>
            <li id="ref-9">
              International Military Tribunal, Nuremberg — Judgment: Doenitz,
              01.10.1946. Текст за Avalon Project, Yale Law School.{" "}
              <a href="https://avalon.law.yale.edu/imt/juddoeni.asp">
                avalon.law.yale.edu
              </a>
            </li>
            <li id="ref-10">
              Fedlex / LexFind — Procès-verbal concernant les règles de la
              guerre sous-marine, 1936: перелік держав-учасниць.{" "}
              <a href="https://www.lexfind.ch/tolv/195671/fr">lexfind.ch</a>
            </li>
            <li id="ref-11">
              MagicPort — профіль судна ALFA WATAN (IMO 7510884). Комерційний
              AIS-агрегатор.{" "}
              <a href="https://magicport.ai/vessels/general-cargo/alfa-watan-mmsi-671480000">
                magicport.ai
              </a>
            </li>
            <li id="ref-12">
              MagicPort — профіль судна ROYAD MAMMADOV (IMO 9356969).
              Комерційний AIS-агрегатор.{" "}
              <a href="https://magicport.ai/vessels/general-cargo/royad-mammadov-mmsi-636020314">
                magicport.ai
              </a>
            </li>
            <li id="ref-13">
              Ambrey — «JWLA-035: Why the Whole Black Sea Is Now a Listed Area»,
              23.09.2026.{" "}
              <a href="https://ambrey.com/operations/event/jwla-035-why-the-whole-black-sea-is-now-a-listed-area/">
                ambrey.com
              </a>
            </li>
            <li id="ref-14">
              Regulas Shipping — «Joint War Committee Lists Almost the Entire
              Black Sea as War-Risk Area», 10.2026.{" "}
              <a href="https://regulasshipping.com/blog/joint-war-committee-lists-almost-the-entire-black-sea-as-war-risk-area/">
                regulasshipping.com
              </a>
            </li>
            <li id="ref-15">
              NPR — «U.S. military says it destroyed 5 Iranian oil tankers after
              attacks on Navy warship», 09.09.2026.{" "}
              <a href="https://www.npr.org/2026/09/09/nx-s1-5962641/us-destroy-iranian-oil-tankers">
                npr.org
              </a>
            </li>
            <li id="ref-16">
              ShareSansar (AFP) — «Six months of war: 20 dead in 68 incidents
              near Hormuz, IMO says», 25.08.2026.{" "}
              <a href="https://www.sharesansar.com/newsdetail/six-months-of-war-20-dead-in-68-incidents-near-hormuz-imo-says-2026-08-25">
                sharesansar.com
              </a>
            </li>
            <li id="ref-17">
              IEA — Oil Market Report, September 2026, 11.09.2026.{" "}
              <a href="https://www.iea.org/reports/oil-market-report-september-2026">
                iea.org
              </a>
            </li>
            <li id="ref-18">
              «Военный осведомитель» (Telegram), 05.10.2026. Проросійський
              канал.{" "}
              <a href="https://t.me/milinfolive/180944">t.me/milinfolive</a>
            </li>
            <li id="ref-19">
              «Интерфакс» — «Два сухогруза с военным имуществом поражены в
              Черном море на переходе в порт Одессы», 04.10.2026. Заява
              Міноборони РФ, дані заявлені.{" "}
              <a href="https://www.interfax.ru/russia/1120254">interfax.ru</a>
            </li>
            <li id="ref-20">
              The Maritime Executive — «Bulgaria Suspends Search for Missing
              Crew as Russia Denies Attack», 07.10.2026. Заява посольства РФ
              через Reuters, дані заявлені.{" "}
              <a href="https://maritime-executive.com/article/bulgaria-suspends-search-for-missing-crew-as-russia-denies-attack">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-21">
              Al Jazeera — «Ukraine says Russian drone attack sinks ship in
              Romanian waters», 05.10.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/10/5/ukraine-says-russian-drone-attack-sinks-ship-in-romanian-waters">
                aljazeera.com
              </a>
            </li>
            <li id="ref-22">
              УП / «Європейська правда» — «Зеленський: Судна у водах Болгарії
              атакувала Росія, ВМС України вже контактує з болгарами»,
              06.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/06/8056782/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-23">
              УП / «Європейська правда» — «Болгарський міністр назвав війну РФ і
              України гібридною і не певен, чиї дрони вразили кораблі»,
              06.10.2026. Заява в ефірі бТВ.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/06/8056783/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-24">
              Euronews — «Ukraine denies targeting Bulgaria as drone explodes
              near pipeline, Kyiv promises inquiry», 09.08.2026.{" "}
              <a href="https://www.euronews.com/2026/08/09/ukraine-denies-targeting-bulgaria-as-drone-explodes-near-pipeline-kyiv-promises-inquiry">
                euronews.com
              </a>
            </li>
            <li id="ref-25">
              УП / «Європейська правда» — «У ЄС назвали неприйнятними удари по
              торговельних суднах у Чорному морі», 07.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/07/8056886/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-26">
              NV — «Полювання РФ на судна турецьких власників. Біля Болгарії
              після атаки дронів затонуло друге за два дні судно», 06.10.2026.
              Коментар А. Клименка.{" "}
              <a href="https://nv.ua/ukr/world/geopolitics/ataka-droniv-u-chornomu-mori-zatonulo-sudno-alfa-watan-ye-zagibli-50647583.html">
                nv.ua
              </a>
            </li>
            <li id="ref-27">
              УНН — «Ukraine’s grain exports have collapsed due to the situation
              in the Black Sea: what happened to the maritime corridor»,
              14.08.2026. Дані Мінрозвитку.{" "}
              <a href="https://unn.ua/en/news/ukraines-grain-exports-have-collapsed-due-to-the-situation-in-the-black-sea-what-happened-to-the-maritime-corridor">
                unn.ua
              </a>
            </li>
            <li id="ref-28">
              DC Marítimo — «Ukraine’s Ports in H1 2026: Growth, Disruption and
              the July Crisis», 04.07.2026, з доповненнями.{" "}
              <a href="https://www.dcmaritimo.es/en/analytics/ukraine-ports-h1-2026">
                dcmaritimo.es
              </a>
            </li>
            <li id="ref-29">
              Kyiv Post — «Ships Not Entering Odesa Ports: What This Means for
              Ukraine’s Grain Exports», 18.08.2026. Дані АМПУ, УКАБ, НБУ.{" "}
              <a href="https://www.kyivpost.com/post/82580">kyivpost.com</a>
            </li>
            <li id="ref-30">
              Splash247 — «Aframax Rio blaze underscores widening Black Sea
              threat», 07.10.2026. Оцінки Ambrey.{" "}
              <a href="https://splash247.com/aframax-rio-blaze-underscores-widening-black-sea-threat/">
                splash247.com
              </a>
            </li>
            <li id="ref-31">
              Ag Policy &amp; Markets Daily — «Ukraine Grain Trade Told to Plan
              for Odesa Ports to Stay Shut Into Winter», 02.09.2026.{" "}
              <a href="https://www.agbull.com/ukraine-grain-trade-told-to-plan-for-odesa-ports-to-stay-shut-into-winter/">
                agbull.com
              </a>
            </li>
            <li id="ref-32">
              РБК-Україна — «Дрони атакували судно з українським зерном біля
              Румунії: Зеленський відреагував», 05.10.2026.{" "}
              <a href="https://www.rbc.ua/rus/news/dron-atakuvav-sudno-ukrayinskim-zernom-nepodalik-1791203993.html">
                rbc.ua
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
