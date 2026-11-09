import "../chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticleBySlug,
  requireVisibleArticle,
  formatDate,
  getAllArticles,
} from "@/lib/articles";
import IfArticleVisible from "@/components/IfArticleVisible";
import ArticleHead from "@/components/ArticleHead";

const SLUG = "arktychnyi-korydor";

/** Опис для пошуку й соцмереж — окремий текст, не дек: дек ставить питання,
 *  опис переказує зміст. Заголовок береться з фронтматера. */
const DESCRIPTION =
  "OSINT-розбір Північного морського шляху: рекорд транзиту 2026 року приніс не теплий рік, а війна. Вантаж тікає від дронів і ризиків на південних маршрутах на шлях, яким одноосібно розпоряджається Росія завдяки своїм криголамам.";

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
    <main data-screen-label="Стаття · Арктичний коридор">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Заголовок, дек і час читання — з фронтматера content/articles/arktychnyi-korydor.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Розслідування" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <figure
          className="fig"
          data-placeholder="Обкладинка: танкерний караван за атомним криголамом на Північному морському шляху, сезон 2026. [ джерело й умова публікації ]"
        />
        <p className="lede">
          У 2026 році війни остаточно змінили правила морської торгівлі. Віднині
          судна, незалежно від прапора чи вантажу, не можуть себе почувати
          безпечно поряд з країнами, що воюють. Цілий ряд стратегічних морських
          маршрутів став небезпечним, проходження може закінчитися втратою
          судна, вантажу, та навіть життя екіпажу. Відтак, судноплавці шукають
          обхідні шляхи. Для Росії, яка остаточно втрачає південь, таким
          очевидним виходом є втеча в Арктику. Північний морський шлях
          монопольно регулює російський флот криголамів. Відсутність конкуренції
          в морі та слабкість сусідніх держав робить Арктику зручною для
          санкційних продуктів та інших нелегальних товарів. Проте чи здатна
          Росія втримати цей вплив і як на це готується реагувати світ,
          розбираємо в новому матеріалі PLITKA Analytics.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Літня навігація 2026 року на Північному морському шляху (ПМШ) стала
          рекордною. До 30 вересня через шлях пройшли 104 транзитні рейси,
          більше, ніж за весь 2025 рік, і перевезли близько 3,7 мільйона тонн
          вантажу
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . «Росатом» очікує, що загальний вантажообіг за сезон перевищить 40
          мільйонів тонн
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Такі цифри можна було б пояснити зміною клімату та зміною умов, але
          літо 2026 року в Арктиці було найхолоднішим із 2018 року
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Головна причина — війна.
        </p>

        <p>
          <IfArticleVisible slug="zahrozy-torhovelnomu-flotu">
            Як ми показали в нашому минулому матеріалі{" "}
            <Link href="/articles/zahrozy-torhovelnomu-flotu">
              «Перископ Деніца»
            </Link>
            , захист на морі з&apos;являється лише там, де є військовий
            конвой.{" "}
          </IfArticleVisible>
          На Північному морському шляху дозвіл на прохід видає адміністрація,
          підпорядкована «Росатому», і без цього дозволу транзитне судно шляхом
          не пройде
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-vtecha">
          <span className="h2-num">§ 01 · Втеча</span>
        </h2>

        <p>
          Війна закриває південні порти РФ. Останні партії товарів Новоросійськ
          ще перевалював у вересні 2026 року, поступово потік бажаючих ризикнути
          та зайти в порт падав і вже в листопаді місцева влада офіційно
          визнала, що робота портів Ростова, Таганрога й Азова «фактично
          призупинена»
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . В жовтні у Мурманськ починають прибувати вантажі, характерні для
          південних регіонів. 14 жовтня було оголошено, що Мурманськ уперше з
          1996 року прийме уральський чавун для Туреччини
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . 28 жовтня в північному місті почали вантажити й першу пробну партію
          пшениці, 29,5 тисячі тонн для Північної Африки
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . Таке рішення додає до дороги десяток днів і до сотні доларів на
          кожній тонні, проте в експортерів немає іншого вибору та альтернативи.
        </p>

        <p>
          На північ також йде нафта. Очільник «Газпром нефти» Олександр Дюков на
          Московському енергетичному тижні заявив, що «ризик атак на російські
          нафтові об&apos;єкти змінив логіку галузі», і окремо наголосив на
          значенні Північного морського шляху, який може врятувати ситуацію
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          До кінця вересня ПМШ пройшли 22 танкерні рейси на схід із приблизно
          2,1 мільйона тонн вантажу, здебільшого сирої нафти. Вантажили її в
          Мурманську, Приморську й Усть-Лузі
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . До середини жовтня, за даними Reuters, Арктикою вивезли близько 20
          мільйонів барелів нафти, що на 50% більше, ніж за весь 2025 рік
          <a className="ref" href="#ref-8">
            [8]
          </a>
          .
        </p>

        <p>
          Лід цьому не сприяв. Площа арктичного льоду у вересні 2026 року, за
          Met Office, була п&apos;ятою найбільшою з 2007 року
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Володимир Панов, директор «Росатому» з розвитку ПМШ і Арктики,
          говорить, що навіть у липні цього року акваторію все ще вкривав лід, і
          через це навігація почалася значно пізніше
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . Проте «ажиотажний» попит російських вантажовідправників вплинув на
          показники значніше, ніж погодні умови.
        </p>

        <p>
          Проте кораблі тонуть не лише в Чорноморському басейні. Війна у
          Перській затоці штовхнула на північ навіть союзників США. Індія й
          Південна Корея, оголошуючи плани ходити Арктикою, послалися саме на
          конфлікт на Близькому Сході, а в серпні Сеул відправив цим шляхом до
          Європи перший комерційний контейнеровоз
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Того ж місяця китайська Sea Legend відкрила першу сезонну лінію з
          Китаю до Європи через Арктику, розраховану на вісім рейсів
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Прямих рейсів з Азії до Європи до кінця вересня набралося в чотири
          рази більше, ніж за весь 2025 рік
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Поки що транзит третіх країн — невеликий потік. У 2025 році транзитні
          рейси перевезли 3,2 мільйона тонн, менше 9% усього вантажу ПМШ
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Увесь сезон Sea Legend перевіз менше контейнерів, ніж бере за рейс
          один ультравеликий контейнеровоз у звичайному морі
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Контейнер через Арктику до того ж коштує близько 8&nbsp;500 доларів,
          майже вдвічі більше за спотову ціну з Шанхая до Роттердама в серпні
          2026 року
          <a className="ref" href="#ref-4">
            [4]
          </a>
          , проте тенденція на зростання зберігається. І кожен такий рейс, від
          корейського Panstar Acro до китайських ліній, не може пройти маршрут
          без прямого дозволу Росії. Це море де діє монополія влади.
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-hospodar">
          <span className="h2-num">§ 02 · Господар</span>
        </h2>

        <p>
          Заявку на прохід судно подає до Адміністрації ПМШ, підпорядкованої
          «Росатому», і разом із дозволом отримує обов&apos;язок платити за
          лоцманів і криголамну проводку
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . «Росатом» поділив шлях на 28 районів і цього сезону сам видав кожен
          дозвіл
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Китайська Sea Legend, перш ніж відкрити лінію до Європи, отримала
          дозволи на сім суден.
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <p>
          Криголам у цій схемі не веде судно від краю до краю. Він пробиває
          канал на окремих ділянках, судно високого льодового класу йде слідом,
          а далі частину шляху долає саме. Вартість проводки «Росатом» розкладає
          на весь вантажопотік, тож що більше перевезень, то менша частка витрат
          на кожну тонну
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Правовою підставою Росія називає статтю 234 Конвенції ООН з морського
          права. Вона дозволяє прибережним державам встановлювати особливі
          правила проти забруднення з суден у вкритих кригою районах, але про
          право проходу не каже нічого
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . ПМШ, в свою чергу, перетинає внутрішні води, територіальне море й
          виключну економічну зону Росії. У виключній зоні згідно з конвенцією
          діє свобода судноплавства. Проте дозвіл Москва вимагає на весь шлях
          одразу, і весь прохід на практиці злилився в одну дозвільну систему
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Спеціалісти по морському праву вже неодноразово вказували, що
          попередній дозвіл і обов&apos;язкова платна проводка виходять за межі
          міжнародних домовленостей
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          П&apos;ять ключових проток: Карські Ворота, Шокальського,
          Вількицького, Дмитра Лаптєва й Санникова — Росія вважає внутрішніми
          водами. Такими їх зробили{" "}
          <span
            className="term"
            data-def="Лінії, від яких відміряють територіальне море. Прямі вихідні лінії з'єднують мис із мисом чи острів з островом, і води між ними та берегом стають внутрішніми, прирівняними до суші."
          >
            прямі вихідні лінії
          </span>
          , проведені 1985 року, і від льоду ця претензія вже не залежить. США
          вважають протоки ПМШ міжнародними
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="Карта: акваторія ПМШ, 28 районів і п'ять проток, які Росія вважає внутрішніми водами. [ джерело й умова публікації ]"
        />

        <p>
          На військові кораблі стаття 234 не поширюється. Для них Москва ще в
          грудні 2022 року ухвалила окремий закон. Іноземне державне судно
          мусить просити дозволу на прохід внутрішніми водами ПМШ щонайменше за
          три місяці, один запит стосується одного судна. Мирний прохід у
          територіальному морі Росія може призупинити оголошенням по радіо з
          умовою негайного виконання.
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Директор «Росатому» з розвитку ПМШ і Арктики Володимир Панова називає
          ПМШ «історични надбанням» і стверджує, що настав час зробити його
          «морським Транссибом». Головною перевагою маршруту він називає
          безпеку. Близько 70% шляху з Азії до Європи пролягає вздовж Росії, «в
          єдиній системі управління судноплавством», в той час як шлях через
          Суецький канал іде водами більш ніж двадцяти держав
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . Безпеку гарантує господар, що видає дозвіл.
        </p>

        <p>
          Для ворогів Росії саме цей фактор і становить головну небезпеку. Цього
          року «Росатом» перестав публікувати перелік суден, яким видав дозвіл.
          Закритими стали й дані про розташування суден, аварії та інциденти на
          шляху. За підрахунком екологічної організації Bellona, 2025 року ПМШ
          ходили близько сотні суден тіньового флоту
          <a className="ref" href="#ref-14">
            [14]
          </a>
          . Хто з них отримав дозвіл у 2026 році, тепер знає лише адміністрація,
          яка його видавала. ПМШ поступово перетворюється на «чорний ящик»
          світової морської торгівлі, де санкційні товари можуть проходити,
          перевантажуватись та перемішуватись з іншими вантажами без контролю з
          боку інших держав та міжнародних правових режимів.
        </p>

        {/* ===================== § 03 ===================== */}
        <h2 id="sec-tin">
          <span className="h2-num">§ 03 · Тінь</span>
        </h2>

        <p>
          Лише танкерів тіньового флоту, що пройшли через ПМШ аналітики
          нарухвали 38 за весь 2025 рік і 50 за перші два місяці сезону 2026
          року. Газовозів за ті самі періоди 13 і 18. Під санкціями близько
          трьох чвертей усіх танкерів, які ходили шляхом. З 50 танкерів 26 мають
          льодовий клас Ice3 і нижче або не мають його зовсім, 33 танкери
          старіші за 15 років
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          Правила забороняють суднам без льодового класу йти самостійно навіть у
          легкому льоду. Проте, у вересні 2025 року, танкер Lynx без льодового
          класу з близько мільйоном барелів нафти з Мурманська кілька днів
          простояв у кризі на 72° пн. ш. по дорозі до Китаю. Необхідного дозволу
          він не мав, у щоденних журналах руху шляхом не значився, і все ж далі
          його провели атомні криголами Росатому
          <a className="ref" href="#ref-16">
            [16]
          </a>
          . У жовтні 2026 року 22-річний Dakar із низьким льодовим класом пішов
          на захід уздовж арктичного узбережжя, коли вікно для таких суден уже
          зачинялося. ЄС запровадив проти нього санкції ще в липні
          <a className="ref" href="#ref-17">
            [17]
          </a>
          , Британія додала свої 8 жовтня, коли судно було в дорозі
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          І тут відкривається головна перевага ПМШ. Вантажовласники переплачують
          не заради швидкості, а тому, що ніде на маршруті вантаж не можуть
          зупинити та перевірити
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . В арктичних водах російські судновласники ходять без страху перед
          українськими дронами, рейдами західної берегової охорони та
          перевірками щодо безпеки екіпажу
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <p>
          Інша справа на захід від Мурманська. Майже всі танкери, що вивозять
          нафту з цього порту належать до тіньового флоту
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . З жовтня 2025 по січень 2026 року вздовж Норвегії до Мурманська
          пройшли понад 50 таких танкерів
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . З 11 серпня 2025 року Норвегія започаткувала нову практивку. Вона
          регулярно просить танкери у своїй виключній економічній зоні показати
          страховку, добровільно
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . До кінця січня запит отримали 238 суден, 194 надіслали сертифікат,
          42 сертифікати виявилися недійсними, здебільшого через фальшивий
          прапор
          <a className="ref" href="#ref-23">
            [23]
          </a>
          .
        </p>

        <p>
          Частина танкерів просто обходить норвезьку зону. У квітні 2026 року
          підсанкційний Apple пройшов від Північного моря до Баренцевого за
          межами 200-мильної зони, і норвезька служба руху суден у Вардьо так і
          не змогла з ним зв&apos;язатися
          <a className="ref" href="#ref-24">
            [24]
          </a>
          . У серпні танкер Derzhava, колишній Elbrus, якого в січні уразив
          український дрон у Чорному морі, пройшов за кілька кілометрів від
          норвезького острова Ведмежий. Страховки він, за базою OpenSanctions,
          не мав
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . Затримувати такі судна лише через санкції Осло відмовляється, адже,
          за їх словами, для цього потрібна чітка підстава в міжнародному праві
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="Карта: західний вихід із Мурманська вздовж Норвегії, межа норвезької ЕЕЗ і обхідні маршрути Apple і Derzhava. [ джерело й умова публікації ]"
        />

        <p>
          Інші країни діють зухваліще. У січні 2026 року США захопили танкер
          Marinera, колишній Bella 1, коли той ішов до Мурманська, між Ісландією
          й Британськими островами. Під час погоні Росія терміново дала судну
          свій прапор, а за даними WSJ і CBS, послала на супровід підводний
          човен та інші кораблі
          <a className="ref" href="#ref-26">
            [26]
          </a>
          . 31 травня французький спецназ висадився з гелікоптерів на танкер
          Tagor за 400 морських миль на захід від Бретані. Нафту він завантажив
          у Мурманську і йшов під фальшивим прапором Камеруну
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <p>
          21 січня Морська колегія на чолі з Миколою Патрушевим ухвалила заходи
          для захисту російського судноплавства, мурманський губернатор Андрій
          Чибіс назвав роль ВМФ вирішальною
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . З грудня 2025 року есмінець Північного флоту «Североморськ»
          супроводжував судна на Балтиці, потім у Середземному морі. У серпні
          2026 року фрегат «Адмірал Касатонов» провів уздовж Норвегії газовоз
          «Газпрому» Portovyy з Балтики до Мурманська, звідки той, імовірно,
          пішов ПМШ до Китаю
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <p>
          За оцінкою берлінського SWP, поза прилеглими морями Москва може
          захистити свої танкери лише обмежено, адже їй бракує великих надводних
          бойових кораблів. Головнокомандувач ВМФ Олександр Моісеєв та інші
          аналітики, що його критикують, сходяться в одному. Флот може
          гарантувати хіба що Північний морський шлях і вихід у Тихий океан
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . У східному напрямку проблема інша, тут умови диктує наявність та
          кількість криголамів.
        </p>

        {/* TODO: § 04 Чи втримає → § 05 Як реагує світ → висновок (структура погоджена 07.11, див. notes.md) */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              Splash247 — «Northern Sea Route smashes shipping records again»,
              20.10.2026. Дані CHNL.{" "}
              <a href="https://splash247.com/northern-sea-route-smashes-shipping-records-again/">
                splash247.com
              </a>
            </li>
            <li id="ref-2">
              Interfax — «Transit via Northern Sea Route expected to set new
              record in 2026, top 7 mln t — Rosatom», 27.10.2026. Прогноз
              «Росатому»; дані заявлені.{" "}
              <a href="https://interfax.com/newsroom/top-stories/119691/">
                interfax.com
              </a>
            </li>
            <li id="ref-3">
              Met Office — «Arctic and Antarctic end-of-season report — October
              2026», 14.10.2026.{" "}
              <a href="https://www.metoffice.gov.uk/research/approach/monitoring/sea-ice/2026/arctic-and-antarctic-end-of-season-report---october-2026">
                metoffice.gov.uk
              </a>
            </li>
            <li id="ref-4">
              Михайло Коростиков, Carnegie Endowment — «International Demand for
              Russia&apos;s Arctic Shipping Route Is Unlikely to Last»,
              30.09.2026. Авторський аналітичний матеріал.{" "}
              <a href="https://carnegieendowment.org/russia-eurasia/politika/2026/09/russia-northern-sea-route">
                carnegieendowment.org
              </a>
            </li>
            <li id="ref-5">
              ArcticToday (передрук The Barents Observer) — «Ukraine war pushes
              Russian oil to Arctic route», 23.10.2026. Слова Дюкова — у
              переказі Reuters.{" "}
              <a href="https://www.arctictoday.com/ukraine-war-pushes-russian-oil-to-arctic-route/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-6">
              Інтерфакс — «Владимир Панов: Северный морской путь в шаге от
              круглогодичности, маршрут переходит на новый этап», 27.10.2026.
              Інтерв&apos;ю представника «Росатому»; дані заявлені.{" "}
              <a href="https://www.interfax.ru/interview/1125051">
                interfax.ru
              </a>
            </li>
            <li id="ref-7">
              Container News — «Explainer: NSR record shows a new trend»,
              21.10.2026.{" "}
              <a href="https://container-news.com/explainer-nsr-record-shows-a-new-trend/">
                container-news.com
              </a>
            </li>
            <li id="ref-8">
              RFE/RL — «An Arctic Traffic Jam Highlights Doubts Over
              Russia&apos;s Northern Sea Route To China», 23.10.2026.{" "}
              <a href="https://www.rferl.org/a/arctic-traffic-jam-russia-northern-sea-route-china/33882814.html">
                rferl.org
              </a>
            </li>
            <li id="ref-9">
              Kyiv Post — «Russia Reroutes Pig Iron to Arctic Port for First
              Time in 30 Years», 07.11.2026. Переказ Financial Times.{" "}
              <a href="https://www.kyivpost.com/post/89440">kyivpost.com</a>
            </li>
            <li id="ref-10">
              «Новая газета Европа» — «Россия вынуждена вывозить зерно через
              Арктику из-за украинских атак на черноморские порты — FT»,
              01.11.2026. Переказ Financial Times.{" "}
              <a href="https://novayagazeta.eu/articles/2026/11/01/rossiia-vynuzhdena-vyvozit-zerno-cherez-arktiku-iz-za-ukrainskikh-atak-na-chernomorskie-porty-ft-news">
                novayagazeta.eu
              </a>
            </li>
            <li id="ref-11">
              BFM — «„Южный морской путь встал“ — эксперт об остановке портов
              Ростовской области после атак беспилотников», 06.11.2026. Слова
              Слюсаря — з ефіру «Россия 24».{" "}
              <a href="https://www.bfm.ru/news/623079">bfm.ru</a>
            </li>
            <li id="ref-12">
              Interfax — «Rosatom permits China&apos;s Sealegend Shipping to
              transit NSR as part of launching regular container route»,
              07.08.2026. Слова Лихачова; дані заявлені.{" "}
              <a href="https://interfax.com/newsroom/top-stories/118643/">
                interfax.com
              </a>
            </li>
            <li id="ref-13">
              Ян Якуб Сольський, Норвезький центр морського права (NCLOS, UiT) —
              «Charting the Future of Arctic Shipping: Why Navigational Rights
              in the Northern Sea Route Matter?», 24.06.2026. Авторська правова
              аналітика.{" "}
              <a href="https://site.uit.no/nclos/2026/06/24/charting-the-future-of-arctic-shipping-why-navigational-rights-in-the-northern-sea-route-matter/">
                site.uit.no
              </a>
            </li>
            <li id="ref-14">
              Всеволод Левченко, Bellona — «Russian Shadow Fleet Tanker
              Responsible for Black Sea Oil Spill Regularly Used the Northern
              Sea Route», 03.05.2026.{" "}
              <a href="https://etc.bellona.org/2026/05/03/sofia-oil-spill/">
                etc.bellona.org
              </a>
            </li>
            <li id="ref-15">
              gCaptain — «Shadow Fleet Traffic on Northern Sea Route Surges as
              Arctic Safety Concerns Grow», 05.10.2026. Дані Bellona.{" "}
              <a href="https://gcaptain.com/shadow-fleet-traffic-on-northern-sea-route-surges-as-arctic-safety-concerns-grow/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-16">
              gCaptain — «Sanctioned Suezmax Oil Tanker Without Ice Protection
              Stuck for Days on Russia&apos;s Arctic Northern Sea Route»,
              15.09.2025.{" "}
              <a href="https://gcaptain.com/sanctioned-suezmax-oil-tanker-without-ice-protection-stuck-for-days-on-russias-arctic-northern-sea-route/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-17">
              gCaptain — «Sanctioned 22-Year-Old Tanker Makes Rare Late-Season
              Arctic Voyage», 07.10.2026.{" "}
              <a href="https://gcaptain.com/sanctioned-22-year-old-non-ice-class-tanker-makes-rare-late-season-arctic-voyage/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-18">
              gCaptain — «UK Sanctions 12 More &apos;Shadow-Fleet&apos; Tankers
              as Russia&apos;s Arctic Traffic Grows», 08.10.2026.{" "}
              <a href="https://gcaptain.com/uk-sanctions-12-more-shadow-fleet-tankers-as-russias-arctic-traffic-grows/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-19">
              ArcticToday (передрук The Barents Observer) — «Russian warship
              escorts Gazprom tanker along Norwegian coast», 20.08.2026.{" "}
              <a href="https://www.arctictoday.com/russian-warship-escorts-gazprom-tanker-along-norwegian-coast/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-20">
              The Barents Observer — «30-year-old tanker linked with Iran
              drifting along Norway&apos;s Arctic coast», 04.11.2026.{" "}
              <a href="https://www.thebarentsobserver.com/news/30yearold-tanker-linked-with-iran-drifting-along-norways-arctic-coast/461333">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-21">
              ArcticToday (передрук The Barents Observer) — «Russia hints it
              will deploy Navy to protect &apos;shadow fleet&apos;», 28.01.2026.{" "}
              <a href="https://www.arctictoday.com/russia-hints-it-will-deploy-navy-to-protect-shadow-fleet/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-22">
              The Barents Observer — «Oslo takes measures against Russian
              &apos;shadow fleet&apos;», 07.08.2025.{" "}
              <a href="https://www.thebarentsobserver.com/news/oslo-takes-measures-against-russian-shadow-fleet/434655">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-23">
              ArcticToday (передрук The Barents Observer) — «Russia&apos;s
              „Derzhava“ sneaks into Norwegian waters», 07.08.2026. Цифри зі
              звіту Берегової адміністрації Норвегії.{" "}
              <a href="https://www.arctictoday.com/russias-derzhava-sneaks-into-norwegian-waters/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-24">
              The Barents Observer — «Shadow tanker sailed outside 200-mile zone
              to avoid Norwegian scrutiny», 17.04.2026.{" "}
              <a href="https://www.thebarentsobserver.com/news/shadow-tanker-sailed-outside-200mile-zone-to-avoid-norwegian-scrutiny/448908">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-25">
              High North News — «France Detains Russian Arctic Oil Tanker»,
              03.06.2026.{" "}
              <a href="https://en.highnorthnews.com/politics/france-detains-russian-arctic-oil-tanker/1112829">
                highnorthnews.com
              </a>
            </li>
            <li id="ref-26">
              Всеволод Левченко, Bellona, для ArcticToday — «Russia attempted to
              shelter a foreign shadow tanker on its Arctic territory. This sets
              a dangerous precedent», 27.01.2026. Авторський матеріал.{" "}
              <a href="https://www.arctictoday.com/russia-attempted-to-shelter-a-foreign-shadow-tanker-on-its-arctic-territory-this-sets-a-dangerous-precedent/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-27">
              Гельге Адріанс, SWP — «Russlands begrenzte Fähigkeiten zum Schutz
              seiner „Schattenflotte“», 02.04.2026. Аналітичний матеріал.{" "}
              <a href="https://www.swp-berlin.org/10.18449/2026A17/">
                swp-berlin.org
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
