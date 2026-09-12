import "../chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import { requireVisibleArticle } from "@/lib/articles";

const metadata: Metadata = {
  title: "Африканська кампанія — PLITKA Analytics",
  description:
    "Удар по ролкеру Lady Mariia в Середземному морі, український плацдарм у Лівії, операції ГУР у Судані й Малі: як Україна дістає Росію в її африканському тилу.",
};

const SLUG = "afrykanska-kampaniia";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG);
  return metadata;
}

export default function Page() {
  requireVisibleArticle(SLUG);

  return (
    <main data-screen-label="Стаття · Африканська кампанія">
      {/* ============ ARTICLE HEAD ============ */}
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Розслідування</span>
        <h1>Африканська кампанія</h1>
        <p className="article-head__metaline">час читання 6 хв</p>
        <p className="article-head__dek">
          Звідки біля берегів Лівії беруться дрони, які бʼють по російських
          суднах, — і як Україна опинилася в африканському тилу Кремля
        </p>
      </div>

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <p className="lede">
          6 вересня 2026 року в Середземному морі, між Критом і Лівією, кілька
          дронів скинули боєприпаси на російський ролкер Lady Mariia
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Вибухи припали на палубу, вантажні крани й район надбудови, на борту
          спалахнула пожежа, але серйозних пробоїн на відео не видно
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Судно вийшло з алжирського Орана й ішло на схід, у бік Сирії. ГУР
          вносить його до переліку суден, що возять для Росії зброю, зокрема з
          Сирії через Босфор
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Відповідальності за атаку не взяв ніхто
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Станом на 12 вересня Lady Mariia стоїть на якорі біля Порт-Саїда;
          пошкодження, за оцінкою ItaMilRadar, незначні
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        {/* ===================== ВСТУП ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Вступ</span>Той самий «експрес»
        </h2>

        <p>
          Про атаку першими повідомили керівник Інституту чорноморських
          стратегічних досліджень Андрій Клименко й російський опозиційний
          журналіст Олександр Невзоров, який виклав відео
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . За версією Невзорова, у судно влучили 12 разів, дрони запустили з
          території Лівії, а на борту були іранська зброя й бронетехніка з
          Алжиру для Росії
          <a className="ref" href="#ref-7">
            [7]
          </a>
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . Жодне з цих тверджень незалежно не підтверджене
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Осадка перед ударом становила 4,8 метра з 6,7 можливих, тобто
          повністю завантаженим судно не йшло
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Клименко з іронією написав, що атакували «невідомі дрони» з
          лівійської території, а Україна тут ні до чого
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . Militarnyi не виключає й удару Ізраїлю, адже судно возило зброю до
          Сирії
          <a className="ref" href="#ref-10">
            [10]
          </a>
          ; доказів цієї версії теж немає
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          «Сирійський експрес» — так називають морський міст, яким Росія роками
          возила військові вантажі до сирійського Тартуса, а звідти далі на
          південь. Про те, як цей міст перебудували після падіння Асада, —{" "}
          <Link href="/articles/syriyskyi-ekspres">
            попередня частина циклу
          </Link>
          : чорноморський маршрут згорнувся, вантажі пішли з Балтики й Заполярʼя
          навколо всієї Європи, а головним отримувачем зброї стала Африка.
        </p>

        <p>
          Lady Mariia — з того самого флоту. Вона однотипна з ролкером «Балтик
          Лідер», досьє якого є в тій статті: обидва судна збудовані 2000 року
          на німецькій верфі Peene-Werft, мають довжину близько 127 метрів,
          майже дзеркальні історії перейменувань і належать одній компанії —
          МГ-Флот, колишньому «Трансморфлоту»
          <a className="ref" href="#ref-4">
            [4]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . Рейс теж знайомий: на початку серпня Lady Mariia вийшла з
          Санкт-Петербурга, 29 серпня пройшла Гібралтар і зайшла в Оран
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-3">
            [3]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">Уточнення · близнюки</div>
          <table>
            <thead>
              <tr>
                <th />
                <th>Lady Mariia</th>
                <th>«Балтик Лідер»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IMO</td>
                <td>9220641</td>
                <td>9220639</td>
              </tr>
              <tr>
                <td>Верф, рік</td>
                <td>Peene-Werft, 2000</td>
                <td>Peene-Werft, 2000</td>
              </tr>
              <tr>
                <td>Довжина, дедвейт</td>
                <td>126,88 м, 7184 т</td>
                <td>126,86 м, 7195 т</td>
              </tr>
              <tr>
                <td>Перше й останнє з колишніх імен</td>
                <td>Scan Finlandia … Stella-Maria</td>
                <td>Scan Germania … Fleet Leader</td>
              </tr>
              <tr>
                <td>У МГ-Флот</td>
                <td>з 21 червня 2021</td>
                <td>з 16 лютого 2022</td>
              </tr>
            </tbody>
          </table>
          <p>
            Дані суднових досьє ГУР
            <a className="ref" href="#ref-4">
              [4]
            </a>
            <a className="ref" href="#ref-12">
              [12]
            </a>
            .
          </p>
        </div>

        <p>
          Та частина закінчувалася висновком, що втрата Тартуса логістику не
          зупинила: маршрут подовшав, а вантажні судна почали ходити під
          ескортом бойових кораблів — і втрати одного вузла виявилося замало.
          Lady Mariia йшла без ескорту. Найближчий російський загін — есмінець
          «Адмирал Левченко» з танкером «Генерал Скобелев», оилером «Академик
          Пашин» і тим самим ролкером «Спарта», що фігурував у першій частині, —
          пройшов Гібралтар на схід 27 серпня й біля неї не був
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Є й різниця. Попередні удари в цьому морі припадали на танкери —
          судна, що возять нафту й газ, з продажу яких Росія фінансує війну.
          Lady Mariia ГУР відносить до іншої категорії: суден, що возять
          військові вантажі
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Якщо за атакою стоїть Україна, вона вперше вдарила тут не по доходах
          Кремля, а по його збройовій логістиці
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Офіційного визнання немає — і це не виняток: жодної своєї операції в
          Африці Київ офіційно не визнавав. При цьому Lady Mariia — не перше
          судно, повʼязане з Росією, яке дістали в Середземному морі за останній
          рік
          <a className="ref" href="#ref-14">
            [14]
          </a>
          <a className="ref" href="#ref-15">
            [15]
          </a>
          , і не єдиний слід української присутності південніше Європи. Про
          українських військових у західній Лівії ще навесні написали RFI й AP
          <a className="ref" href="#ref-15">
            [15]
          </a>
          <a className="ref" href="#ref-16">
            [16]
          </a>
          ; у Малі й Судані українські фахівці, за даними CNN, працюють роками
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . Звідки вони там узялися?
        </p>

        {/* ===================== РАМКА ===================== */}
        <h2 id="sec-frame">
          <span className="h2-num">§ 01 · Рамка</span>Африканський тил
        </h2>

        <p>
          Морська кампанія — лише найновіша частина ширшої. Судна на кшталт Lady
          Mariia обслуговують присутність, яку Росія майже десять років будує в
          Африці. По цій присутності Україна бʼє з 2023 року: від Судану через
          Малі до Лівії.
        </p>

        <p>
          Африка для Кремля не периферія. Континент дає Москві союзників у
          голосуваннях ООН, ринок для зброї й доступ до ресурсів; золото з
          Африки, за даними Мінфіну США, допомагало Росії обходити санкції
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Від 2017 року цю присутність будувала група «Вагнер»; після заколоту
          Пригожина 2023-го її мережі перейшли під контроль Міноборони РФ як
          «Африканський корпус»
          <a className="ref" href="#ref-18">
            [18]
          </a>
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . Станом на квітень 2026 року найбільші російські контингенти на
          континенті стоять у Центральноафриканській Республіці, Лівії та Малі;
          лише в Малі — до 2500 осіб
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          Коли в грудні 2024 року впав режим Асада, головним перевалочним вузлом
          стала Лівія. Уже за місяць аналітики CEPA писали, що вона лишилася
          «єдиним придатним транзитним вузлом» для постачання російських
          підрозділів в Африці
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . Рейси до Бамако, які раніше йшли через сирійський Хмеймім, почали
          вилітати з Лівії
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . Шість лівійських авіабаз, де стоїть «Африканський корпус», із квітня
          2024 року обросли новими ангарами й казармами, там оновили злітні
          смуги
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . У лютому 2025-го Халіфа Хафтар підписав із Росією та Білоруссю угоду
          про спільне використання інфраструктури Тобрука, зокрема 11,7
          квадратного кілометра акваторії порту
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          Інші опори слабші. Алжир, з якого вийшла Lady Mariia, отримує з Росії
          близько 85 % озброєнь, але, на думку аналітиків RUSI, навряд чи прийме
          постійну російську базу
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . Про військово-морську базу біля Порт-Судана Москва домовилася в
          лютому 2025 року
          <a className="ref" href="#ref-21">
            [21]
          </a>
          , та вже наприкінці того ж року проєкт призупинили
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Постійного прикриття флотом ця логістика теж не має: 1 липня 2026
          року в Середземному морі вперше від початку повномасштабного
          вторгнення не лишилося жодного бойового корабля ВМФ РФ
          <a className="ref" href="#ref-24">
            [24]
          </a>
          , а загін «Адмирала Левченка» зайшов туди лише наприкінці серпня
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Ще 2023 року тодішній начальник ГУР Кирило Буданов сказав Yahoo News,
          що Україна вбивала і вбиватиме росіян «будь-де на цьому світі аж до
          повної перемоги»
          <a className="ref" href="#ref-25">
            [25]
          </a>
          . Відтоді, за журналістськими розслідуваннями, українська розвідка
          діяла проти російських сил і їхніх союзників у Судані, Малі й Сирії
          <a className="ref" href="#ref-19">
            [19]
          </a>
          , а з кінця 2025 року — з лівійського узбережжя
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . «Ми перетворюємо свій досвід у сфері дронів на інструмент зовнішньої
          політики», — пояснило CNN джерело в ГУР
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . 7 вересня 2026 року, наступного дня після удару по Lady Mariia,
          Буданов, тепер уже керівник Офісу президента, привітав воєнну розвідку
          з тим, що вона захищає інтереси країни «від Росії до Африки, у костюмі
          й у камуфляжі»
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <div className="callout">
          <p>За три роки змінився інструмент.</p>
          <ul>
            <li>
              <strong>Судан, 2023–2024.</strong> Спецпризначенці й FPV-дрони в
              міських боях під Хартумом проти сил, які підтримував «Вагнер»
              <a className="ref" href="#ref-26">
                [26]
              </a>
              .
            </li>
            <li>
              <strong>Малі, 2024–2026.</strong> Розвідка, навчання й дистанційне
              керування дронами для туарезьких повстанців, які воюють з
              «Африканським корпусом»
              <a className="ref" href="#ref-17">
                [17]
              </a>
              .
            </li>
            <li>
              <strong>Середземне море, 2025–2026.</strong> Удари по суднах, що
              працюють на Росію: від танкерів тіньового флоту до ролкера з
              військовими вантажами
              <a className="ref" href="#ref-14">
                [14]
              </a>
              <a className="ref" href="#ref-1">
                [1]
              </a>
              .
            </li>
          </ul>
        </div>

        <div className="callout callout--warn">
          <p>
            Офіційно Київ не визнав жодної операції на африканському континенті.
            Про Судан представник ГУР Андрій Юсов 2023 року сказав CNN: «Не
            можемо ні підтвердити, ні спростувати»
            <a className="ref" href="#ref-26">
              [26]
            </a>
            . Про Малі той самий Юсов 2024-го сказав, що повстанці отримали
            «необхідну інформацію і не лише інформацію»
            <a className="ref" href="#ref-27">
              [27]
            </a>
            , — після чого Малі й Нігер розірвали з Україною дипломатичні
            відносини. МЗС «рішуче відкинуло» звинувачення в підтримці тероризму
            <a className="ref" href="#ref-28">
              [28]
            </a>
            , а згодом Київ заперечив будь-яку суттєву співпрацю з повстанцями
            <a className="ref" href="#ref-17">
              [17]
            </a>
            . Лівійської присутності уряд не підтверджував, хоча CNN уже називає
            її «відкритим секретом»
            <a className="ref" href="#ref-17">
              [17]
            </a>
            . Більшість фактів нижче походить із журналістських розслідувань,
            свідчень анонімних українських військових і заяв сторін, у кожної з
            яких свій інтерес.
          </p>
        </div>

        <p>
          Ця кампанія має ціну, і її вже рахують. Аналітик Carnegie Сем Боуден
          вважає, що гучні операції розвідки підважують дипломатію Києва на
          континенті, де підтримка України й так тане: 2023 року резолюцію
          Генасамблеї ООН, що засуджувала вторгнення, підтримали 25 африканських
          держав, 2025-го — 13
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . Пояснення, що «права рука не завжди знає, що робить ліва», пише він,
          африканських урядовців не переконують
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        {/* TODO: § 02 Судан → § 03 Малі → § 04 Лівія й море → § 05 офіційне
            проти тіньового → § 06 підсумок. Нумерація джерел нарощується за
            першою появою; список нижче тримати в тому самому порядку. */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              ItaMilRadar — «Lady Mariia hit by drones in the Mediterranean,
              exposing Russiaʼs maritime logistics route», 07.09.2026, оновлено
              12.09.2026.{" "}
              <a href="https://www.itamilradar.com/2026/09/07/lady-mariia-hit-by-drones-in-the-mediterranean-exposing-russias-maritime-logistics-route/">
                itamilradar.com
              </a>
            </li>
            <li id="ref-2">
              The Maritime Executive — «Russian Military Cargo Vessel Attacked
              in the Mediterranean», 07.09.2026.{" "}
              <a href="https://maritime-executive.com/article/russian-military-cargo-vessel-attacked-in-the-mediterranean">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-3">
              Army Recognition, Жером Брай — «Ukraine strikes sanctioned Russian
              cargo ship Lady Mariia with bomber drones in the Mediterranean»,
              12.09.2026. Технічні дані судна й останні дані AIS.{" "}
              <a href="https://www.armyrecognition.com/news/navy-news/2026/russian-ship-lady-mariia-drone-strike-mediterranean">
                armyrecognition.com
              </a>
            </li>
            <li id="ref-4">
              ГУР МО України, база War&amp;Sanctions — досьє судна LADY MARIIA
              (IMO 9220641), оновлено 02.06.2026.{" "}
              <a href="https://war-sanctions.gur.gov.ua/en/transport/ships/65">
                war-sanctions.gur.gov.ua
              </a>
            </li>
            <li id="ref-5">
              IBTimes UK — «Russian Ship Reportedly Hit by Drones in
              Mediterranean as Ukraine Link Remains Unconfirmed», 07.09.2026.{" "}
              <a href="https://www.ibtimes.co.uk/russian-cargo-ship-drones-mediterranean-1818175">
                ibtimes.co.uk
              </a>
            </li>
            <li id="ref-6">
              The Insider — «Sanctioned Russian ship Lady Mariia, tied to arms
              shipments, attacked by drones in the Mediterranean Sea»,
              07.09.2026. Дані трекінгу — Starboard Maritime Intelligence.{" "}
              <a href="https://theins.press/en/news/296905">theins.press</a>
            </li>
            <li id="ref-7">
              Телеграм-канал «НЕВЗОРОВ», допис із відео удару, 06.09.2026.
              Авторський канал; твердження про 12 влучань, вантаж і запуск
              дронів із Лівії незалежно не підтверджені.{" "}
              <a href="https://t.me/nevzorovtv/36849">t.me/nevzorovtv</a>
            </li>
            <li id="ref-8">
              Крим.Реалії — «В Средиземном море могли атаковать подсанкционное
              российское судно LADY MARIIA», 06.09.2026.{" "}
              <a href="https://ru.krymr.com/a/krym-news-mariia-atack/33847941.html">
                krymr.com
              </a>
            </li>
            <li id="ref-9">
              Ukrainian Shipping Magazine — «Drones attacked the sanctioned
              Russian ship “Lady Mariia” in the Mediterranean Sea», 07.09.2026.{" "}
              <a href="https://en.usm.media/drones-attacked-the-sanctioned-russian-ship-lady-mariia-in-the-mediterranean-sea/">
                en.usm.media
              </a>
            </li>
            <li id="ref-10">
              Militarnyi — «Drones Attack Sanctioned Russian Vessel Lady Maria
              in Mediterranean Sea», 06.09.2026.{" "}
              <a href="https://militarnyi.com/en/news/drones-attack-sanctioned-russian-vessel-lady-maria-in-mediterranean-sea/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-11">
              Marine Insight — «Video: Russian Military-Linked Cargo Ship
              Reportedly Struck 12 Times By Drones Near Crete», 08.09.2026.{" "}
              <a href="https://www.marineinsight.com/video-russian-military-linked-cargo-ship-reportedly-struck-12-times-by-drones-near-crete/">
                marineinsight.com
              </a>
            </li>
            <li id="ref-12">
              ГУР МО України, база War&amp;Sanctions — досьє судна BALTIC LEADER
              (IMO 9220639).{" "}
              <a href="https://war-sanctions.gur.gov.ua/en/transport/ships/99">
                war-sanctions.gur.gov.ua
              </a>
            </li>
            <li id="ref-13">
              Tech Times — «Ukraine Drones Strike Lady Mariia: Russiaʼs Weapons
              Ship, Not Oil Tanker», 07.09.2026.{" "}
              <a href="https://www.techtimes.com/articles/326906/20260907/ukraine-drones-strike-lady-mariia-russias-weapons-ship-not-oil-tanker.htm">
                techtimes.com
              </a>
            </li>
            <li id="ref-14">
              The Moscow Times — «Kyiv Claims Drone Strike Against Russian
              “Shadow Fleet” Tanker in Mediterranean», 19.12.2025.{" "}
              <a href="https://www.themoscowtimes.com/2025/12/19/kyiv-claims-drone-strike-against-russian-shadow-fleet-tanker-in-mediterranean-a91489">
                themoscowtimes.com
              </a>
            </li>
            <li id="ref-15">
              RFI, Хусейн Асфур — «Des militaires ukrainiens déployés dans
              lʼouest de la Libye», 02.04.2026. Розслідування спирається на два
              анонімні лівійські джерела.{" "}
              <a href="https://www.rfi.fr/fr/afrique/20260402-exclusif-rfi-ces-militaires-ukrainiens-pr%C3%A9sents-dans-l-ouest-libyen">
                rfi.fr
              </a>
            </li>
            <li id="ref-16">
              Associated Press — «Ukrainian forces operating in Libya have
              attacked a Russian tanker, officials say», 04.2026.{" "}
              <a href="https://apnews.com/article/libya-ukraine-russia-tanker-drones-4b9ec378ea1bf064d13cfe4ea026d2d4">
                apnews.com
              </a>
            </li>
            <li id="ref-17">
              CNN — «Ukraine is fighting Russia anywhere it can – even in the
              deserts of Africa», 12.09.2026.{" "}
              <a href="https://edition.cnn.com/2026/09/12/africa/ukraine-russia-drones-mali-libya-intl">
                edition.cnn.com
              </a>
            </li>
            <li id="ref-18">
              Congressional Research Service — «Russiaʼs Security Operations in
              Africa», IF12389, 08.04.2026.{" "}
              <a href="https://www.congress.gov/crs-product/IF12389">
                congress.gov
              </a>
            </li>
            <li id="ref-19">
              Carnegie Endowment, Сем Боуден — «A Shadow War in the Global
              South: Are Kyivʼs Operations in Africa Paying Off?», 20.11.2025.{" "}
              <a href="https://carnegieendowment.org/research/2025/11/a-shadow-war-in-the-global-south-are-kyivs-operations-in-africa-paying-off">
                carnegieendowment.org
              </a>
            </li>
            <li id="ref-20">
              CEPA, Кріс Стівен — «Putinʼs Empire-Building Base Hunt Reaches
              Libya», 09.01.2025.{" "}
              <a href="https://cepa.org/article/putins-empire-building-base-hunt-reaches-libya/">
                cepa.org
              </a>
            </li>
            <li id="ref-21">
              Foreign Policy, Носмот Гбадамосі — «After Assadʼs Fall, Russia
              Looks to Libya and Sudan», 19.02.2025.{" "}
              <a href="https://foreignpolicy.com/2025/02/19/russia-putin-libya-sudan-naval-air-bases-syria-assad-fall/">
                foreignpolicy.com
              </a>
            </li>
            <li id="ref-22">
              Tearline — «Libya: Russia Develops Air Base Infrastructure Likely
              to Secure Military Foothold in North Africa and Sahel»,
              03.06.2026. Дослідження Техаського університету в Остіні;
              методологію переглянуло NGA, але агентство не відповідає за
              висновки.{" "}
              <a href="https://www.tearline.mil/public_page/libya-russia-develops-air-base-infrastructure-likely-to-secure-military-foothold-in-sahel-region">
                tearline.mil
              </a>
            </li>
            <li id="ref-23">
              RUSI, Едвард Блек і Сідхарт Каушал — «Russiaʼs Options for Naval
              Basing in the Mediterranean After Syriaʼs Tartus», 14.01.2025.{" "}
              <a href="https://www.rusi.org/explore-our-research/publications/commentary/russias-options-naval-basing-mediterranean-after-syrias-tartus">
                rusi.org
              </a>
            </li>
            <li id="ref-24">
              ItaMilRadar — «From a Powerful Mediterranean Squadron to Zero
              Warships», 01.07.2026.{" "}
              <a href="https://www.itamilradar.com/2026/07/01/from-a-powerful-mediterranean-squadron-to-zero-warships-how-russias-naval-presence-has-collapsed/">
                itamilradar.com
              </a>
            </li>
            <li id="ref-25">
              Yahoo News, Майкл Вайс і Джеймс Раштон — «“We will keep killing
              Russians,” Ukraineʼs military intelligence chief vows», 2023.
              Цитата прозвучала у відповідь на питання про вбивство Дарʼї
              Дугіної.{" "}
              <a href="https://www.yahoo.com/news/we-will-keep-killing-russians-ukraines-military-intelligence-chief-vows-232156674.html">
                yahoo.com
              </a>
            </li>
            <li id="ref-26">
              CNN — «Exclusive: Ukraineʼs special services “likely” behind
              strikes on Wagner-backed forces in Sudan, a Ukrainian military
              source says», 19.09.2023.{" "}
              <a href="https://www.cnn.com/2023/09/19/africa/ukraine-military-sudan-wagner-cmd-intl/index.html">
                cnn.com
              </a>
            </li>
            <li id="ref-27">
              Суспільне — «“Продовження буде”: Юсов про знищення загону
              “вагнерівців” в Малі», 29.07.2024.{" "}
              <a href="https://suspilne.media/801377-prodovzenna-bude-usov-pro-znisenna-zagonu-vagnerivciv-v-mali-2/">
                suspilne.media
              </a>
            </li>
            <li id="ref-28">
              МЗС України — «Заява МЗС України щодо рішення Перехідного уряду
              Республіки Малі розірвати дипломатичні відносини з Україною»,
              05.08.2024.{" "}
              <a href="https://mfa.gov.ua/en/news/zayava-mzs-ukrayini-shchodo-rishennya-perehidnogo-uryadu-respubliki-mali-rozirvati-diplomatichni-vidnosini-z-ukrayinoyu">
                mfa.gov.ua
              </a>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
