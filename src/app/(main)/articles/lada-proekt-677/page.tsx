import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, formatDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "«Лада» - нове покоління підводних човнів, що не вдалося",
  description:
    "OSINT-огляд проєкту 677 «Лада» — нового покоління дизельних  підводних каліброносців ВМФ РФ. Частина 5 циклу про ракетоносці ВМФ РФ.",
  openGraph: {
    images: ["/articles/lada-proekt-677/cover.jpg"],
  },
};

const SLUG = "lada-proekt-677";

export default function Page() {
  const all = getAllArticles();
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);

  return (
    <main>
      {/* ============ SUB STRIP ============ */}
      <div className="substrip">
        <div className="substrip__inner">
          <span>
            Цикл · Ракетоносці ВМФ РФ · <strong>Підводні човни «Лада»</strong>
          </span>
          <span>проєкт 677 · частина 5</span>
        </div>
      </div>

      <main data-screen-label="Стаття · Підводні човни 677 «Лада»">
        {/* breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Головна</a>
          <span className="sep">›</span>
          <a href="/articles">Розслідування</a>
          <span className="sep">›</span>
          <span className="current">Підводні човни «Лада»</span>
        </nav>

        {/* ============ ARTICLE HEAD ============ */}
        <div className="article-head">
          <div className="article-head__chips">
            <span className="chip chip--red">Цикл · Флот РФ</span>
            <span className="chip chip--solid">пр. 677</span>
            <span className="chip chip--rust">Калібр-ПЛ</span>
            <span className="chip chip--steel">Балтійський флот</span>
            <span className="chip chip--steel">Північний флот</span>
            <span className="chip">Санкт-Петербург</span>
            <span className="chip">«Рубін»</span>
            <span className="chip">ПНЕУ / AIP</span>
            <span className="chip">OSINT</span>
          </div>
          <h1>«Лада» - нове покоління підводних човнів, що не вдалося.</h1>
          <p className="article-head__dek">
            Продовження циклу про носіїв «Калібрів». Проєкт 677 «Лада» - нове
            покоління малошумних дизельних каліброносців. Чому флот відкочується
            до тих самих «Варшавянок», які «Лада» мала замінити.
          </p>
          <div className="article-head__meta">
            <div>
              <span className="meta__lbl">Автори</span>
              <span className="meta__val">Олег Гриценко</span>
            </div>
            <div>
              <span className="meta__lbl">Проєкт</span>
              <span className="meta__val meta__val--mono">
                Ракетоносці ВМФ РФ
              </span>
            </div>
            <div>
              <span className="meta__lbl">Оновлено</span>
              <span className="meta__val">21.07.2026</span>
            </div>
          </div>
        </div>

        {/* ============ LEAD · PHOTO ============ */}
        <div className="lead-img">
          <img
            src="/articles/lada-proekt-677/cover.jpg"
            alt="Підводний човен проєкту 677 «Лада» Б-585 «Санкт-Петербург» на Неві"
            style={{
              width: "100%",
              aspectRatio: "21/10",
              objectFit: "cover",
            }}
          />
          <div className="lead-img__caption">
            <span>Б-585 «Санкт-Петербург» — головний човен проєкту 677.</span>
            <span>Фото · Morozov Leonid, Wikimedia Commons, CC BY 3.0</span>
          </div>
        </div>

        {/* ============ ARTICLE BODY ============ */}
        <div className="article-body">
          <p className="lede">
            У попередніх частинах циклу ми показали, як Чорноморський флот РФ
            перетворив «Калібр» на головний інструмент ударів по Україні — з
            фрегатів, малих ракетних кораблів і дизельних «Варшавянок». Логіка
            російського суднобудування останні десятиліття підпорядкована одній
            ідеї: якнайбільше платформ, здатних нести крилаті ракети великої
            дальності, у кожному морі. Проєкт 677 «Лада» подають як наступний,
            технологічно вищий крок цієї ж лінії.
          </p>

          {/* ===================== ПРОЄКТ 677 ===================== */}
          <h2>
            <span className="h2-num">Проєкт 677</span>Що таке «Лада» і навіщо її
            будували
          </h2>

          <p>
            Проєкт 677 розробило петербурзьке ЦКБ МТ «Рубін» у 1990-х під
            керівництвом головного конструктора{" "}
            <strong>Юрія Кормиліцина</strong>; будівник усіх човнів серії —
            «Адміралтейські верфі» (входять до Об&apos;єднаної суднобудівної
            корпорації)
            <a className="ref" href="#ref1">
              [1]
            </a>
            . «Ладу» задумували як універсальну заміну «Варшавянок» проєкту 877
            «Палтус» — з нижчим рівнем шумності серед головних вимог
            <a className="ref" href="#ref1">
              [1]
            </a>
            .
          </p>

          <p>
            За призначенням це багатоцільовий човен: знищення надводних кораблів
            і суден противника, патрулювання, розвідка, захист морських
            комунікацій, постановка мінних загороджень
            <a className="ref" href="#ref1">
              [1]
            </a>
            . Важливий нюанс, який часто губиться: «Ладу» проєктували насамперед
            як <strong>протичовновий і патрульний засіб</strong>, а не як
            ударний носій крилатих ракет — роль «каліброносця» стала виразним
            наголосом уже пізніше, на хвилі захоплення «Калібрами» після 2015
            року
            <a className="ref" href="#ref11">
              [11]
            </a>
            .
          </p>

          <div className="callout">
            <p className="callout__title">
              Три конструктивні рішення, що вирізняють «Ладу»
            </p>
            <ul>
              <li>
                <strong>Однокорпусна архітектура</strong> — конфігурація, якої в
                російських ударних човнах не застосовували від 1940-х років
                <a className="ref" href="#ref14">
                  [14]
                </a>
                . Порівняно з проєктом 877 надводну водотоннажність зменшено
                приблизно в 1,3 раза, знижено шумність і підвищено підводну
                швидкість
                <a className="ref" href="#ref1">
                  [1]
                </a>
                .
              </li>
              <li>
                <strong>Автоматизована бойова система «Литий»</strong> і високий
                ступінь автоматизації, завдяки чому екіпаж скорочено до{" "}
                <strong>35 осіб</strong>
                <a className="ref" href="#ref1">
                  [1]
                </a>
                <a className="ref" href="#ref13">
                  [13]
                </a>
                .
              </li>
              <li>
                <strong>Електродвигун на постійних магнітах</strong> та
                акумуляторна батарея підвищеного ресурсу
                <a className="ref" href="#ref14">
                  [14]
                </a>
                .
              </li>
            </ul>
          </div>

          <div className="qtbox">
            <div className="qtbox__lang">Заява · «Рубін»</div>
            <p className="qtbox__quote">
              Для човна створили «цілу серію нового обладнання — понад 130
              одиниць», розробленого «на нових принципах».
            </p>
            <div className="qtbox__cite">
              Ігор Вільніт, гендиректор ЦКБ МТ «Рубін»
              <a className="ref" href="#ref13">
                [13]
              </a>
            </div>
          </div>

          {/* ===================== ТТХ ===================== */}
          <h2>
            <span className="h2-num">ТТХ</span>Тактико-технічні характеристики
          </h2>

          <p>
            Показники подано як <strong>заявлені</strong>: незалежно вони не
            верифіковані, а окремі величини в різних джерелах різняться
            <a className="ref" href="#ref14">
              [14]
            </a>
            .
          </p>

          <table>
            <thead>
              <tr>
                <th>Параметр</th>
                <th>Значення</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Проєкт</td>
                <td>677 «Лада» (експортний — «Амур-1650»)</td>
              </tr>
              <tr>
                <td>Розробник / будівник</td>
                <td>ЦКБ МТ «Рубін» / «Адміралтейські верфі»</td>
              </tr>
              <tr>
                <td>Водотоннажність (надводна)</td>
                <td>~1&nbsp;793 т</td>
              </tr>
              <tr>
                <td>Водотоннажність (підводна)</td>
                <td>~2&nbsp;743 т</td>
              </tr>
              <tr>
                <td>Довжина</td>
                <td>
                  ~72 м{" "}
                  <span style={{ color: "var(--slate)" }}>
                    (TWZ оцінює «близько 200 футів» ≈ 61 м — дані різняться)
                  </span>
                </td>
              </tr>
              <tr>
                <td>Ширина</td>
                <td>7,1 м</td>
              </tr>
              <tr>
                <td>Гранична глибина занурення</td>
                <td>понад 300 м</td>
              </tr>
              <tr>
                <td>Швидкість (надводна / підводна)</td>
                <td>~10 / ~21 вузол</td>
              </tr>
              <tr>
                <td>Дальність плавання</td>
                <td>~7&nbsp;500 км</td>
              </tr>
              <tr>
                <td>Автономність</td>
                <td>~45 діб</td>
              </tr>
              <tr>
                <td>Енергоустановка</td>
                <td>
                  дизель-електрична; електродвигун на постійних магнітах, 1 вал,
                  ~2&nbsp;700 к.с.
                </td>
              </tr>
              <tr>
                <td>Екіпаж</td>
                <td>35 осіб</td>
              </tr>
              <tr>
                <td>Торпедні апарати</td>
                <td>6 × 533 мм</td>
              </tr>
              <tr>
                <td>Боєкомплект</td>
                <td>
                  16–18 торпед/ракет <strong>або</strong> 44 міни;{" "}
                  <strong>до 10 «Калібр»/«Клаб»</strong>; РПК-6 «Водопад»
                  (SS-N-16)
                </td>
              </tr>
            </tbody>
          </table>

          {/* ===================== СЕНСОРИ ===================== */}
          <h2>
            <span className="h2-num">Сенсори</span>Ставка на гідроакустику
          </h2>

          <p>
            Ключова заявлена перевага «Лади» — не ракети, а «вуха». Човен
            обладнано <strong>буксированою антеною</strong> гідроакустичного
            комплексу і, за наявними даними, великою{" "}
            <span
              className="term"
              data-def="Гнучка антена, вбудована в обвід корпусу («під форму»), а не в окремий обтічник — дає більшу площу приймання без збільшення опору."
            >
              конформною антеною
            </span>{" "}
            в носовій частині
            <a className="ref" href="#ref13">
              [13]
            </a>
            . За оцінкою військово-морського аналітика Х.&nbsp;І.&nbsp;Саттона
            (H.&nbsp;I.&nbsp;Sutton), ця носова конформна антена може бути
            найбільшою свого типу серед усіх неатомних човнів
            <a className="ref" href="#ref13">
              [13]
            </a>
            .
          </p>

          <p className="pullquote pullquote--soft">
            Якщо характеристики відповідають заявленому, саме сенсорика — а не
            ударний потенціал — могла б дати «Ладі» перевагу: виявляти чужі
            човни раніше, ніж помітять її саму.
            <cite>
              Узгоджується з первісним протичовновим призначенням проєкту
              <a className="ref" href="#ref13">
                [13]
              </a>
            </cite>
          </p>

          <p>
            Реальні характеристики новітньої російської гідроакустики достеменно
            невідомі. Але саме тут, а не в ракетному залпі, лежить закладена в
            проєкт логіка — тиха дизельна субмарина-«мисливець» для тісних
            прибережних вод.
          </p>

          {/* ===================== ОЗБРОЄННЯ ===================== */}
          <h2>
            <span className="h2-num">Озброєння</span>«Калібр» із торпедного
            апарата: 10 проти 4
          </h2>

          <p>
            Ударний потенціал — саме те, що робить «Ладу» цікавою з погляду
            загрози. Човен має шість 533-мм торпедних апаратів; боєкомплект — до
            16–18 торпед і ракет або до 44 мін, а заявлена спроможність за
            «Калібрами» — <strong>до десяти ракет</strong>
            <a className="ref" href="#ref14">
              [14]
            </a>
            <a className="ref" href="#ref7">
              [7]
            </a>
            . З тих самих апаратів запускається протикорабельний «Клаб» і
            протичовнова ракета{" "}
            <span
              className="term"
              data-def="РПК-6 «Водопад» (за класифікацією НАТО SS-N-16) — протичовнова ракета, що запускається з 533-мм торпедного апарата й доставляє торпеду або глибинний заряд у район цілі."
            >
              РПК-6 «Водопад»
            </span>
            <a className="ref" href="#ref13">
              [13]
            </a>
            .
          </p>

          <p>
            Для порівняння: «Варшавянки» проєкту 636.3, які реально стріляли по
            Україні й Сирії, несуть лише <strong>чотири</strong> «Калібри» кожна
            <a className="ref" href="#ref10">
              [10]
            </a>
            . Тобто на папері одна «Лада» дорівнює приблизно двом-трьом
            «Варшавянкам» за ракетним залпом — і в цьому вся суть наративу про
            «нове покоління носіїв».
          </p>

          <div className="callout callout--warn">
            <span className="callout__label">
              Конструктивне «але» · вертикальних пускових немає
            </span>
            <p>
              Серійна «Лада»{" "}
              <strong>не має вертикальних пускових установок (VLS)</strong> —
              усі ракети йдуть через торпедні апарати
              <a className="ref" href="#ref13">
                [13]
              </a>
              . Це обмежує темп залпу й змушує ділити боєкомплект між ракетами,
              торпедами й мінами. Парадокс: саме VLS Росія пропонувала{" "}
              <strong>іноземцям</strong> — в експортній версії (див. нижче), а
              власним човнам його так і не дала.
            </p>
          </div>

          {/* ===================== ПНЕУ ===================== */}
          <h2>
            <span className="h2-num">ПНЕУ</span>Повітронезалежна установка, якої
            немає
          </h2>

          <p>
            Технологією, заради якої проєкт затівався, була{" "}
            <span
              className="term"
              data-def="Повітронезалежна енергоустановка (AIP) — дозволяє дизельному човну тривало йти під водою без спливання для запуску дизелів, різко знижуючи ризик виявлення."
            >
              повітронезалежна енергоустановка (ПНЕУ/AIP)
            </span>{" "}
            — вона мала різко збільшити час перебування під водою й зробити
            човен важчим для виявлення. Іронія в тому, що в цій галузі
            СРСР/Росія мали заділ ще з 1950-х (дослідний проєкт 617)
            <a className="ref" href="#ref13">
              [13]
            </a>
            .
          </p>

          <p>
            Проте на «Санкт-Петербурзі», який слугував прототипом, установка не
            запрацювала, і від ПНЕУ для серії фактично{" "}
            <strong>відмовилися</strong> — у 2019 році «Рубін» прямо вказав, що
            човни серії нею не оснащуватимуться
            <a className="ref" href="#ref13">
              [13]
            </a>
            <a className="ref" href="#ref14">
              [14]
            </a>
            . Натомість того ж 2019-го відновили розробку електрохімічного
            генератора (добування водню з дизпального й кисню) із завершенням у
            «середині 2020-х»; обговорювали й альтернативу у вигляді
            літій-іонних батарей, які теоретично дали б дизельному човну дуже
            велику підводну автономність
            <a className="ref" href="#ref13">
              [13]
            </a>
            <a className="ref" href="#ref14">
              [14]
            </a>
            .
          </p>

          <p>
            Станом на зараз{" "}
            <strong>на жодному з побудованих човнів ПНЕУ не встановлено</strong>
            <a className="ref" href="#ref5">
              [5]
            </a>
            <a className="ref" href="#ref11">
              [11]
            </a>
            . Без неї «Лада» лишається шумнішою і легше виявляється — тобто
            головна заявлена перевага нового покоління досі на кресленнях.
            Західні аналітики послідовно описують програму як «розчарування»
            <a className="ref" href="#ref5">
              [5]
            </a>
            .
          </p>

          {/* ===================== ХРОНІКА ===================== */}
          <h2>
            <span className="h2-num">Хроніка</span>П&apos;ять закладок, три
            човни, 28 років
          </h2>

          <p>
            П&apos;ять човнів закладено — три на воді або в бойовому складі, два
            будуються. Номер у дужках біля назви — серійний (заводський).
          </p>

          <table>
            <thead>
              <tr>
                <th>Назва (серійний №)</th>
                <th>Проєкт</th>
                <th>Закладено</th>
                <th>Спущено</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Б-585 «Санкт-Петербург»</strong> (01570)
                </td>
                <td>677</td>
                <td>26.12.1997</td>
                <td>28.10.2004</td>
                <td>
                  <span className="status-rust">Списаний, на брухт (2024)</span>{" "}
                  — був дослідною платформою
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Б-586 «Кронштадт»</strong> (01571)
                </td>
                <td>677</td>
                <td>28.07.2005</td>
                <td>20.09.2018</td>
                <td>
                  <span className="status-steel">У строю з 31.01.2024</span>,
                  Північний флот
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Б-587 «Великие Луки»</strong> (01572)
                </td>
                <td>677М</td>
                <td>10.11.2006*</td>
                <td>23.12.2022</td>
                <td>
                  <span className="status-steel">У строю з 16.12.2025</span>,
                  Балтійський флот**
                </td>
              </tr>
              <tr>
                <td>
                  <strong>«Вологда»</strong> (01573)
                </td>
                <td>677М</td>
                <td>12.06.2022</td>
                <td>—</td>
                <td>
                  <span className="status-slate">Будується</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>«Ярославль»</strong> (01574)
                </td>
                <td>677М</td>
                <td>12.06.2022</td>
                <td>—</td>
                <td>
                  <span className="status-slate">Будується</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="aside-note">
            <div className="aside-note__lbl">Примітки до таблиці</div>*
            Закладений як «Севастополь», будівництво зупинено 2009-го,
            перезакладено/перейменовано на «Великие Луки» 19.03.2015.
            <br />
            ** Флот приписки за TASS і GlobalMilitary — Балтійський; окремі
            видання писали про Північний. Фіксуємо як розбіжність.
          </div>

          <p>
            Нижче — дос&apos;є на кожен човен. Розгорни картку, щоб побачити
            повну історію будівництва й ключові дати.
          </p>

          {/* ---------- ДОСЬЄ: САНКТ-ПЕТЕРБУРГ ---------- */}
          <details className="dossier-card dossier-card--sub" open>
            <summary>
              <div className="dossier-card__num">
                Б-585
                <strong>01570</strong>
              </div>
              <div className="dossier-card__main">
                <div className="dossier-card__proj">
                  Проєкт 677 · головний корабель
                </div>
                <div className="dossier-card__name">«Санкт-Петербург»</div>
                <div className="dossier-card__strap">
                  13 років будівництва → дослідна платформа → брухт
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip dossier-card__chip--lost">
                  На брухт · 2024
                </span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Головний корабель заклали 26 грудня 1997 року, спустили на
                  воду 28 жовтня 2004-го
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Уже під час випробувань наприкінці 2000-х виявили проблеми з
                  головною енергоустановкою; попри це човен прийняли до
                  Північного флоту 8 травня 2010 року
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Щойно він потрапив до екіпажів, з&apos;ясувалося, що{" "}
                  <strong>сонар і рушій працюють неналежно</strong>
                  <a className="ref" href="#ref11">
                    [11]
                  </a>
                  .
                </p>
                <p>
                  У листопаді 2011-го ухвалили рішення переробити головний човен
                  і добудовувати наступні за зміненим проєктом (системи
                  керування, електрорушій, навігація)
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Фактично «Санкт-Петербург» лишили дослідною платформою для
                  випробування систем
                  <a className="ref" href="#ref14">
                    [14]
                  </a>
                  .
                </p>
                <p>
                  5 лютого 2024 року оголосили, що човен виводять зі складу
                  флоту й <strong>відправляють на злам</strong>: за словами
                  джерела ТАРС, «його модернізація дуже дорога — за ці ж гроші
                  можна побудувати новий човен»
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Головний корабель проєкту так і не став повноцінною бойовою
                  одиницею — 13 років будівництва завершилися брухтом
                  <a className="ref" href="#ref11">
                    [11]
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="dossier-card__photo">
                  <img
                    src="/articles/lada-proekt-677/cover.jpg"
                    alt="«Санкт-Петербург» — головний човен проєкту 677"
                  />
                  <div className="dossier-card__photo-cap">
                    Фото · «Санкт-Петербург» на Неві, Wikimedia Commons, CC BY
                    3.0
                  </div>
                </div>
                <div className="tth">
                  <h5>Ключові дати</h5>
                  <div className="tth__row">
                    <span className="k">Закладено</span>
                    <span className="v">26.12.1997</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Спущено</span>
                    <span className="v">28.10.2004</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">У строю</span>
                    <span className="v">08.05.2010</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Рішення переробити</span>
                    <span className="v">11.2011</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">На брухт</span>
                    <span className="v">05.02.2024</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* ---------- ДОСЬЄ: КРОНШТАДТ ---------- */}
          <details className="dossier-card dossier-card--sub">
            <summary>
              <div className="dossier-card__num">
                Б-586
                <strong>01571</strong>
              </div>
              <div className="dossier-card__main">
                <div className="dossier-card__proj">
                  Проєкт 677 · перший серійний
                </div>
                <div className="dossier-card__name">«Кронштадт»</div>
                <div className="dossier-card__strap">
                  19 років від закладки до передачі флоту
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip dossier-card__chip--doubt">
                  У строю · Північний флот
                </span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Другий човен серії заклали 28 липня 2005 року, але 2009-го
                  будівництво зупинили через світову фінансову кризу, що вдарила
                  по всьому суднобудуванню
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  <a className="ref" href="#ref11">
                    [11]
                  </a>
                  . Роботи відновили 9 липня 2013-го — уже з урахуванням
                  зауважень за випробуваннями головного човна
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Спустили на воду 20 вересня 2018 року, а передали флоту лише
                  31 січня 2024-го
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  .
                </p>
                <p>
                  Церемонію провели, найімовірніше, на базі Полярний (Мурманська
                  область); Андріївський прапор командиру вручив головком ВМФ РФ
                  Микола Євменов, човен увійшов до 161-ї бригади (дивізіону)
                  підводних човнів Північного флоту
                  <a className="ref" href="#ref13">
                    [13]
                  </a>
                  . За розмірами — близько 61 м завдовжки, підводна
                  водотоннажність близько 2&nbsp;700 т
                  <a className="ref" href="#ref13">
                    [13]
                  </a>
                  . Попри урочистості, човен від початку вважали проблемним
                  <a className="ref" href="#ref2">
                    [2]
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="dossier-card__photo">
                  <img
                    src="/articles/lada-proekt-677/DEPL-Kronshtadt.jpg"
                    alt="Підводний човен «Кронштадт» під час ходових випробувань. Фото: ВМФ РФ"
                  />
                  <div className="dossier-card__photo-cap">
                    Підводний човен «Кронштадт» під час ходових випробувань.
                    Фото: ВМФ РФ
                  </div>
                </div>
                <div className="tth">
                  <h5>Ключові дати</h5>
                  <div className="tth__row">
                    <span className="k">Закладено</span>
                    <span className="v">28.07.2005</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Пауза</span>
                    <span className="v">2009–2013</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Спущено</span>
                    <span className="v">20.09.2018</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">У строю</span>
                    <span className="v">31.01.2024</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">З&apos;єднання</span>
                    <span className="v">161-а бр. ПЧ</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* ---------- ДОСЬЄ: ВЕЛИКИЕ ЛУКИ ---------- */}
          <details className="dossier-card dossier-card--sub">
            <summary>
              <div className="dossier-card__num">
                Б-587
                <strong>01572</strong>
              </div>
              <div className="dossier-card__main">
                <div className="dossier-card__proj">
                  Проєкт 677М · ex-«Севастополь»
                </div>
                <div className="dossier-card__name">«Великие Луки»</div>
                <div className="dossier-card__strap">
                  Приймання переносили щонайменше шість разів
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip dossier-card__chip--doubt">
                  У строю · приписка спірна
                </span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Третій човен (серійний 01572) заклали 10 листопада 2006 року
                  як «Севастополь», будівництво зупинили 2009-го, а 19 березня
                  2015-го перезаклали й перейменували на «Великие Луки»
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . На воду вивели 23 грудня 2022 року, підняли прапор аж 16
                  грудня 2025-го
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  <a className="ref" href="#ref12">
                    [12]
                  </a>
                  . За даними профільних видань, приймання переносили щонайменше{" "}
                  <strong>шість разів</strong>
                  <a className="ref" href="#ref6">
                    [6]
                  </a>
                  .
                </p>
                <p>
                  Того ж дня командування ВМФ РФ оголосило про закладку ще двох
                  човнів на початку 2026-го
                  <a className="ref" href="#ref4">
                    [4]
                  </a>
                  <a className="ref" href="#ref8">
                    [8]
                  </a>
                  . Флот приписки — Балтійський (за TASS і GlobalMilitary), хоча
                  окремі видання писали про Північний: фіксуємо це як{" "}
                  <strong>невизначеність</strong>
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  <a className="ref" href="#ref3">
                    [3]
                  </a>
                  <a className="ref" href="#ref14">
                    [14]
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="dossier-card__photo">
                  <img
                    src="/articles/lada-proekt-677/velikie-luki.jpg"
                    alt="«Великие Луки» — човен проєкту 677М на Неві, 2024"
                  />
                  <div className="dossier-card__photo-cap">
                    Фото · «Великие Луки» на Неві, mil.ru / Wikimedia Commons,
                    CC BY 4.0
                  </div>
                </div>
                <div className="tth">
                  <h5>Ключові дати</h5>
                  <div className="tth__row">
                    <span className="k">Закладено</span>
                    <span className="v">10.11.2006</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Перезакладка</span>
                    <span className="v">19.03.2015</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Спущено</span>
                    <span className="v">23.12.2022</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">У строю</span>
                    <span className="v">16.12.2025</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Перенесень</span>
                    <span className="v">≥ 6</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* ---------- ДОСЬЄ: ВОЛОГДА + ЯРОСЛАВЛЬ ---------- */}
          <details className="dossier-card dossier-card--sub">
            <summary>
              <div className="dossier-card__num">
                01573
                <strong>01574</strong>
              </div>
              <div className="dossier-card__main">
                <div className="dossier-card__proj">
                  Проєкт 677М · закладені в один день
                </div>
                <div className="dossier-card__name">
                  «Вологда» · «Ярославль»
                </div>
                <div className="dossier-card__strap">
                  «Продовження серії» — поки що декларація
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip">Будуються</span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Обидва човни (01573 і 01574) заклали в один день — 12 червня
                  2022 року
                  <a className="ref" href="#ref1">
                    [1]
                  </a>
                  . Саме про них ідеться в оголошеннях про «продовження серії»;
                  загалом РФ заявляє про плани щонайменше на дев&apos;ять човнів
                  <a className="ref" href="#ref4">
                    [4]
                  </a>{" "}
                  — цифру варто читати як декларацію намірів, а не як графік.
                </p>
              </div>
              <div>
                <div className="tth">
                  <h5>Статус</h5>
                  <div className="tth__row">
                    <span className="k">Закладено</span>
                    <span className="v">12.06.2022</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Спущено</span>
                    <span className="v">—</span>
                  </div>
                  <div className="tth__row">
                    <span className="k">Заявлено в серії</span>
                    <span className="v">≥ 9 од.</span>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* ===================== ЕКСПОРТ ===================== */}
          <h2>
            <span className="h2-num">Експорт</span>«Амур-1650» і «Амур-950»:
            VLS, якого не дали своїм
          </h2>

          <p>
            Росія намагалася відбити витрати, продавши проєкт за кордон.
            Експортні версії дістали назви <strong>«Амур-1650»</strong> та{" "}
            <strong>«Амур-950»</strong>
            <a className="ref" href="#ref1">
              [1]
            </a>
            . Прикметно, що «Амур-950» пропонували з{" "}
            <strong>вертикальною пусковою установкою</strong> під крилаті ракети
            (зокрема BrahMos) — тобто іноземному покупцеві пропонували краще
            озброєну конфігурацію, ніж ту, що врешті отримав власний флот
            <a className="ref" href="#ref11">
              [11]
            </a>
            .
          </p>

          <p>
            Головним потенційним замовником була Індія, якій пропонували спільне
            виробництво. Індія обрала французький проєкт, і експортна програма
            «Амурів» фактично згасла — інших покупців не знайшлося
            <a className="ref" href="#ref11">
              [11]
            </a>
            . Це б&apos;є і по економіці програми, і по її репутації.
          </p>

          {/* ===================== ПЕРСПЕКТИВИ ===================== */}
          <h2>
            <span className="h2-num">Перспективи</span>Майбутнє проєкту — курс
            на конвенційні човни
          </h2>

          <p>
            Попри всі проблеми «Лади», загальна лінія Кремля — тримати курс на
            конвенційні підводні човни (на відміну, скажімо, від США, які
            будують лише атомні)
            <a className="ref" href="#ref13">
              [13]
            </a>
            . Російське Міноборони заявляє, що за десять років флот отримав 24
            підводні човни різних проєктів — увосьмеро більше, ніж за попереднє
            десятиліття
            <a className="ref" href="#ref13">
              [13]
            </a>
            . Але саме через затримки «Лади» Росія змушена й далі будувати менш
            досконалі «Варшавянки» проєкту 636.3, які «Лада» мала замінити
            <a className="ref" href="#ref13">
              [13]
            </a>
            .
          </p>

          <div className="stat-2col">
            <div className="stat-2col__cell">
              <div className="stat-2col__lbl">На папері — «нове покоління»</div>
              <ul>
                <li>
                  Одна «Лада» заявлено несе <strong>до 10 «Калібрів»</strong> —
                  удвічі-втричі більше за «Варшавянку».
                </li>
                <li>
                  Дальність «Калібру» (до ~2&nbsp;500 км) означає, що човен із
                  Балтики теоретично тримає під прицілом значну частину Європи.
                </li>
                <li>
                  Велика конформна гідроакустична антена — за заявленим,
                  серйозний протичовновий засіб у тісних водах.
                </li>
                <li>
                  Програму не згорнуто: нові човни закладають у 2026 році.
                </li>
              </ul>
            </div>
            <div className="stat-2col__cell">
              <div className="stat-2col__lbl">На практиці — довгобуд</div>
              <ul>
                <li>
                  За 28 років — лише <strong>два-три</strong> боєздатні човни;
                  головний списано на брухт.
                </li>
                <li>
                  Ключова технологія (<strong>ПНЕУ</strong>) не реалізована; VLS
                  немає.
                </li>
                <li>
                  Жодна «Лада»{" "}
                  <strong>не здійснила жодного бойового пуску «Калібру»</strong>{" "}
                  за всю війну — на відміну від «Варшавянок».
                </li>
                <li>
                  Провал експорту й санкційний тиск на постачання компонентів.
                </li>
              </ul>
            </div>
          </div>

          <p>
            До того ж Балтика й Північна Атлантика — зона щільного спостереження
            НАТО, де малій дизельній субмарині складніше маневрувати
            непоміченою, ніж у закритому Чорному морі.
          </p>

          <p className="pullquote">
            «Лада» справді стає новим дизельним носієм «Калібрів» — але значно
            повільніше, у значно менших числах і з гіршими характеристиками, ніж
            декларує Москва.
            <cite>
              Не так «нове покоління загроз», як довгобуд із високим паперовим
              потенціалом і низькою реалізацією
            </cite>
          </p>

          <p>
            Головне питання — не в паспортних можливостях човна, а в
            спроможності російської промисловості будувати такі човни серійно й
            якісно в умовах війни та санкцій
            <a className="ref" href="#ref13">
              [13]
            </a>
            . Якщо Росія колись доведе ПНЕУ (чи літій-іонний варіант) і вийде на
            серію — картину доведеться переглянути; поки що реальний внесок
            «Лади» в ударний потенціал флоту мінімальний.
          </p>

          {/* ===================== ДЖЕРЕЛА ===================== */}
          <div className="refs">
            <h3>Джерела</h3>
            <ol>
              <li id="ref1">
                TASS — FACTBOX: Project 677 Lada-class submarines, 16.12.2025
                (серійні номери, дати, головний конструктор, експортні версії).{" "}
                <a href="https://tass.com/defense/2059523">
                  tass.com/defense/2059523
                </a>
              </li>
              <li id="ref2">
                Naval News — Russia Commissions First Serial Lada-class
                Submarine (Kronshtadt), 02.2024.{" "}
                <a href="https://www.navalnews.com/naval-news/2024/02/russia-commissions-first-serial-lada-class-submarine/">
                  navalnews.com
                </a>
              </li>
              <li id="ref3">
                Zona Militar — The Russian Navy has finally commissioned the
                third Lada-class submarine, 16.12.2025.{" "}
                <a href="https://www.zona-militar.com/en/2025/12/16/the-russian-navy-has-finally-commissioned-into-service-the-third-of-its-new-lada-class-attack-submarines/">
                  zona-militar.com
                </a>
              </li>
              <li id="ref4">
                Army Recognition — Russia Expands Lada-Class Submarine Program
                with Two New Boats in 2026.{" "}
                <a href="https://www.armyrecognition.com/news/navy-news/2025/russia-expands-lada-class-submarine-program-with-two-new-boats-set-to-begin-construction-in-2026">
                  armyrecognition.com
                </a>
              </li>
              <li id="ref5">
                National Security Journal — Russia&apos;s Lada-Class Submarine
                Looks Like a &apos;Major Disappointment&apos; With No Fix.{" "}
                <a href="https://nationalsecurityjournal.org/russias-lada-class-submarine-looks-like-a-major-disappointment-with-no-fix/">
                  nationalsecurityjournal.org
                </a>
              </li>
              <li id="ref6">
                United24 Media — After Six Missed Deadlines, Russia Pushes to
                Accept Long-Delayed Lada-Class Submarine.{" "}
                <a href="https://united24media.com/latest-news/after-six-missed-deadlines-russia-pushes-to-accept-long-delayed-silent-lada-class-submarine-14191">
                  united24media.com
                </a>
              </li>
              <li id="ref7">
                19FortyFive — Russia&apos;s &apos;New&apos; Lada Diesel
                Submarine Will Carry Lethal Kalibr Cruise Missile, 2023.{" "}
                <a href="https://www.19fortyfive.com/2023/03/russias-new-lada-diesel-submarine-will-carry-lethal-kalibr-cruise-missile/">
                  19fortyfive.com
                </a>
              </li>
              <li id="ref8">
                РИА Новости — Ще дві підлодки проєкту 677 планують закласти у
                2026, 16.12.2025.{" "}
                <a href="https://ria.ru/20251216/podlodka-2062359117.html">
                  ria.ru
                </a>
              </li>
              <li id="ref9">
                CSIS Missile Threat — 3M-14 Kalibr (SS-N-30A) (дальність,
                наведення, БЧ).{" "}
                <a href="https://missilethreat.csis.org/missile/ss-n-30a/">
                  missilethreat.csis.org
                </a>
              </li>
              <li id="ref10">
                Wikipedia — Lada-class / Kilo-class submarine (боєкомплект
                «Калібрів»: 10 проти 4).{" "}
                <a href="https://en.wikipedia.org/wiki/Lada-class_submarine">
                  en.wikipedia.org — Lada-class
                </a>
              </li>
              <li id="ref11">
                Brent M. Eastwood, 19FortyFive — Russia&apos;s &apos;New&apos;
                Lada-Class Submarines Are So Bad the First Boat Took 13 Years to
                Build and Was Scrapped, 14.07.2026.{" "}
                <a href="https://www.19fortyfive.com/2026/07/russias-new-lada-class-submarines-are-so-bad-the-first-boat-took-13-years-to-build-and-was-scrapped/">
                  19fortyfive.com
                </a>
              </li>
              <li id="ref12">
                Naval News — Admiralty Shipyard Launches 3rd Lada-Class
                Submarine Velikie Luki, 12.2022.{" "}
                <a href="https://www.navalnews.com/naval-news/2022/12/admiralty-shipyard-launches-3rd-lada-class-submarine-velikie-luki/">
                  navalnews.com
                </a>
              </li>
              <li id="ref13">
                Thomas Newdick, TWZ (The War Zone) — First Of Russia&apos;s New
                Diesel-Electric Submarines Enters Service, 31.01.2024.{" "}
                <a href="https://www.twz.com/sea/first-of-russias-new-diesel-electric-submarines-enters-service">
                  twz.com
                </a>
              </li>
              <li id="ref14">
                GlobalMilitary.net — Lada-class (Project 677): Specs &amp;
                History.{" "}
                <a href="https://www.globalmilitary.net/ships/lada/">
                  globalmilitary.net
                </a>
              </li>
            </ol>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".06em",
                color: "var(--slate)",
                marginTop: "18px",
              }}
            >
              Матеріал підготовлено на основі відкритих джерел. ТТХ за
              російськими та довідковими джерелами не верифіковано незалежно й
              подано як заявлені.
            </p>
          </div>

          {/* ===================== NEXT UP ===================== */}
          <div className="next-up">
            <span className="next-up__label">Цикл · Флот РФ</span>
            <div>
              <p className="next-up__title">
                «Калібр» з моря: які кораблі Росії загрожують Україні і чому
                саме вони
              </p>
              <p className="next-up__dek">
                Хаб циклу — огляд усіх носіїв «Калібрів» ВМФ РФ: фрегати, малі
                ракетні кораблі та підводні човни в одній карті загроз.
              </p>
            </div>
            <a className="btn btn--red" href="/articles/kalibre-z-morya">
              Читати
            </a>
          </div>

          {/* ===================== ARTICLE FOOT ===================== */}
          <div className="article-foot">
            <div className="article-foot__tags">
              <span className="chip">пр. 677</span>
              <span className="chip">Лада</span>
              <span className="chip chip--rust">Калібр-ПЛ</span>
              <span className="chip chip--steel">ВМФ РФ</span>
              <span className="chip">OSINT</span>
            </div>
            <div>CC BY-NC 4.0 · 21.07.2026</div>
          </div>
        </div>
        {/* /article-body */}

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
                  <article className="card" key={a.slug}>
                    {a.leadImage ? (
                      <img
                        src={a.leadImage}
                        alt={a.title}
                        className="card__img card__img--photo"
                      />
                    ) : (
                      <div className="ph ph__cross card__img">
                        <span className="ph__corners" />
                        <div className="ph__label">{a.projectCode}</div>
                      </div>
                    )}
                    <div className="card__body">
                      <span className="card__tag">{a.project}</span>
                      <h3 className="card__title">
                        <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                      </h3>
                      <p className="card__dek">{a.dek}</p>
                      <div className="card__meta">
                        <span>{formatDate(a.date)}</span>
                        <span>
                          {a.authors[0]?.split(" ").at(-1)?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </main>
  );
}
