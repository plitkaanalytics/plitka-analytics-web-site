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

const SLUG = "arktychnyi-korydor";

/** Опис для пошуку й соцмереж — окремий текст, не дек: дек ставить питання,
 *  опис переказує зміст. Заголовок береться з фронтматера. */
const DESCRIPTION =
  "OSINT-розбір Північного морського шляху: вантажопотік за десять років виріс уп'ятеро й у 2025 році вперше впав, Північний флот уперше пройшов протоку Шокальського, а тіньовий флот на шляху зріс із 13 до 100 суден.";

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
          data-placeholder="Обкладинка: кадр із відео Північного флоту, загін у протоці Шокальського, 29.09.2026. [ джерело й умова публікації ]"
        />
        <p className="lede">
          29 вересня 2026 року пресслужба Північного флоту повідомила, що загін
          його кораблів пройшов протоку Шокальського між островами Північної
          Землі й вийшов у Карське море. За словами флоту, військові кораблі
          Росії зробили це <strong>вперше в історії</strong>
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Сама протока не нова. Її відкрила гідрографічна експедиція 1913 року,
          у радянський час нею ходили цивільні судна, а з 1960-х тільки з
          криголамною й лоцманською проводкою
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Це запасний прохід між Карським морем і морем Лаптєвих, паралельний
          головному, через протоку Вількицького.
        </p>

        <p>
          Флот описує прохід як випробування. На кораблях оголосили навчальну
          тривогу, гелікоптер Ка-29 з патрульного корабля «Іван Папанін» вів
          льодову розвідку, а екіпажі маневрували між айсбергами у «складних
          льодових умовах»
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . На відео, яке поширив сам флот, протока вільна від льоду, видно лише
          кілька дрейфуючих айсбергів
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Суперечності тут менше, ніж здається. У протоку постійно сповзають
          льодовики Карпінського й Семенова-Тян-Шанського, тож айсберги там є
          завжди
          <a className="ref" href="#ref-2">
            [2]
          </a>
          , а пакового льоду на кадрах немає.
        </p>

        <figure
          className="fig"
          data-placeholder="Відео Північного флоту: загін у протоці Шокальського. Оригінал — пресслужба СФ у VK (vk.ru/aoosk?w=wall-101090476_18251), через Barents Observer. [ вбудування або файл, умова публікації ]"
        />

        <p>
          Арктичні походи Північний флот проводить щоосені вже понад десять
          років. Цьогорічний, за заявою флоту, присвячений безпеці судноплавства
          на Північному морському шляху
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Судноплавства там справді побільшало. За десять років вантажопотік
          шляху виріс уп&apos;ятеро, із 7,26 мільйона тонн у 2016 році
          <a className="ref" href="#ref-5">
            [5]
          </a>{" "}
          до майже <strong>37,8 мільйона тонн</strong> у 2024-му
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . У 2025 році він уперше з 2022-го зменшився, на 2,3%, до 37,02
          мільйона тонн
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Путін тим часом обіцяє до 100 мільйонів тонн у 2030 році
          <a className="ref" href="#ref-8">
            [8]
          </a>
          .
        </p>

        <p>
          Розбираємо далі, звідки взявся цей ріст, хто користується шляхом, чому
          за вантажем іде флот і чи встигає Росія за власними планами.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Шлях</span>Найкоротша дорога з Європи
          в Азію, яку контролює одна держава
        </h2>

        <p>
          Північний морський шлях (ПМШ) за російським законом тягнеться від
          архіпелагу Нова Земля на заході до мису Дежньова на Чукотці
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . Це найкоротший морський маршрут між Європою й Азією. Від Мурманська
          до портів Японії, за даними Росатома, судно йде 18 діб замість 37
          через Суецький канал
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . З 2018 року шлях і атомний криголамний флот перебувають під
          державною корпорацією «Росатом»
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Вантажі на ПМШ бувають трьох видів: вивезення з Обської та Єнісейської
          заток, каботаж для арктичних проєктів і селищ і транзит, коли судно
          вантажиться й розвантажується поза межами шляху
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . Транзит найчастіше згадують як «альтернативу Суецу», але у 2025 році
          він склав 3,2 мільйона тонн, менше десятої частини всього потоку.
          Основу шляху, за оцінкою норвезького Центру логістики Високої Півночі
          (CHNL), становить цілорічне вивезення сировини з арктичних
          нафтогазових проєктів
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="Карта: межі ПМШ від Нової Землі до мису Дежньова; Північна Земля з протоками Вількицького й Шокальського; Сабетта, Мурманськ, Певек. Власна графіка редакції."
        />

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-growth">
          <span className="h2-num">§ 01 · Ріст</span>Газ, нафта і санкції, а не
          танення льоду
        </h2>

        <p>
          У 2013 році ПМШ перевіз 3,9 мільйона тонн вантажів
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . Перелом стався, коли в Сабетті запрацював завод «Ямал СПГ». У 2017
          році шлях перевіз 10,7 мільйона тонн, у 2018-му 20,18, у 2019-му 31,5.
          Головним джерелом росту Атомфлот називає саме «Ямал СПГ» і будівництво
          «Арктик СПГ 2» на Гиданському півострові
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Далі ріст вийшов на плато. У 2020 році понад 32 мільйони тонн
          <a className="ref" href="#ref-13">
            [13]
          </a>
          , у 2021-му 34,85, у 2022-му 34,03
          <a className="ref" href="#ref-14">
            [14]
          </a>
          .
        </p>

        <figure
          className="fig"
          data-placeholder="Графік: вантажопотік ПМШ 2013–2025, млн т (3,9 → 37,02), поверх — цілі: 80 млн т до 2024 (указ 2018), 100 млн т до 2030 (Путін, 2025). Власна графіка редакції за даними Росатома, CHNL і «Гекону»."
        />

        <p>
          Після 2022 року шлях отримав другу причину рости. Західні оператори
          пішли, і транзит обвалився з 85 рейсів і двох мільйонів тонн у 2021
          році до 43 рейсів і 41,5 тисячі тонн у 2022-му
          <a className="ref" href="#ref-14">
            [14]
          </a>
          . Наступного року він відновився до 2,1 мільйона тонн, переважно за
          рахунок нафти, яку після ембарго ЄС повезли з Балтики до Китаю. На
          Китай того року припало понад 95% транзитного вантажу
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . Голова Росатома Олексій Лихачов пояснив рекорд 2023 року так:
          партнери, насамперед «Новатек», а також «Газпром нефть», «Лукойл» і
          «Норнікель», «перенаправили вантажі із заходу на схід»
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          У 2025 році зріджений газ дав 58% потоку, нафта 21%, газовий конденсат
          4%, разом до 83%
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Шлях, отже, росте разом з експортом російської сировини і падає
          разом із ним. Скорочення 2025 року консалтинговий центр «Гекон»
          пояснює плановим ремонтом на «Ямал СПГ» і виснаженням Новопортовського
          родовища. Джерел росту на 2026 рік там не бачать
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <p>
          Клімат у цьому рості відіграє другорядну роль. За даними
          американського Національного центру даних про сніг і лід (NSIDC),
          вересневий мінімум арктичного льоду за останні двадцять років помітно
          не зменшувався. Мінімум 2026 року поділив десяте місце з 2008, 2010 і
          2025 роками
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . Площа льоду у 2025 і 2026 роках однакова, а умови на шляху
          протилежні. 2025 рік видався важким. Чиста вода трималася не більше
          двох тижнів, наприкінці вересня й на початку жовтня
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . У 2026 році судноплавство, за Barents Observer, рекордне. У середині
          вересня у східній частині шляху йшло понад 50 суден, із них більше 30
          танкерів
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Загальна площа льоду мало що каже про те, чи пройде судно конкретною
          протокою.
        </p>

        <div className="aside-note">
          <p>
            Цифри за окремі роки в джерелах розходяться. За 2016 рік ТАСС
            наводив 6,9 мільйона тонн станом на 1 грудня
            <a className="ref" href="#ref-19">
              [19]
            </a>
            , High North News — 7,26 мільйона тонн за рік
            <a className="ref" href="#ref-5">
              [5]
            </a>
            . За 2018 рік Атомфлот дає 20,18 мільйона тонн
            <a className="ref" href="#ref-13">
              [13]
            </a>
            , High North News — 18 мільйонів
            <a className="ref" href="#ref-12">
              [12]
            </a>
            ; пояснення цій різниці немає.
          </p>
        </div>

        {/* TODO: § 02 хто зацікавлений (Китай, Південна Корея, тіньовий флот) → § 03 флот іде за вантажем → § 04 монополія → § 05 чи встигає Росія → § 06 Арктика у світовій грі → висновок */}

        {/* ===================== ДЖЕРЕЛА ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Джерела</h3>
          <ol>
            <li id="ref-1">
              ТАСС — «Russian Northern Fleet ships pass through Shokalsky Strait
              for 1st time in Navy history», 29.09.2026. Заява пресслужби
              Північного флоту; дані заявлені.{" "}
              <a href="https://tass.com/society/2194341">tass.com</a>
            </li>
            <li id="ref-2">
              «Вокруг света» — «Корабли ВМФ России впервые прошли через опасный
              пролив Шокальского в Арктике», 29.09.2026. Російське видання.{" "}
              <a href="https://www.vokrugsveta.ru/news/korabli-vmf-rossii-vpervye-proshli-cherez-opasnyi-proliv-shokalskogo-v-arktike-karta-id7325473/">
                vokrugsveta.ru
              </a>
            </li>
            <li id="ref-3">
              The Barents Observer — «Naval flotilla explores new passage on
              Northern Sea Route», 30.09.2026.{" "}
              <a href="https://www.thebarentsobserver.com/news/naval-flotilla-explores-new-passage-on-northern-sea-route/458938">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-4">
              The Barents Observer — «Northern Fleet ships set course for the
              Northern Sea Route», 01.09.2026.{" "}
              <a href="https://www.thebarentsobserver.com/security/northern-fleet-ships-set-course-for-the-northern-sea-route/456978">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-5">
              High North News — «A New Era of Shipping Traffic on The Northern
              Sea Route», 23.08.2017.{" "}
              <a href="https://en.highnorthnews.com/business/a-new-era-of-shipping-traffic-on-the-northern-sea-route/228585">
                highnorthnews.com
              </a>
            </li>
            <li id="ref-6">
              World Nuclear News — «Northern Sea Route cargo set new record in
              2024», 10.01.2025. Дані Росатома, заявлені.{" "}
              <a href="https://www.world-nuclear-news.org/articles/northern-sea-route-cargo-set-new-record-in-2024">
                world-nuclear-news.org
              </a>
            </li>
            <li id="ref-7">
              «Коммерсантъ» через «Мейл.ру Финансы» — «Арктика не держит
              нагрузку», 09.02.2026. Аналітика консалтингового центру «Гекон».{" "}
              <a href="https://finance.mail.ru/article/arktika-ne-derzhit-nagruzku-69197769/">
                finance.mail.ru
              </a>
            </li>
            <li id="ref-8">
              Anadolu Agency — «Russia plans Arctic military buildup, eyes
              cooperation with West», 28.03.2025. Виступ Путіна на Міжнародному
              арктичному форумі в Мурманську.{" "}
              <a href="https://aa.com.tr/en/world/russia-plans-arctic-military-buildup-eyes-cooperation-with-west/3522077">
                aa.com.tr
              </a>
            </li>
            <li id="ref-9">
              Interfax — «Transit traffic along Northern Sea Route reaches
              record 2.1 mln t, oil main cargo — Rosatom», 14.11.2023.{" "}
              <a href="https://interfax.com/newsroom/top-stories/96464/">
                interfax.com
              </a>
            </li>
            <li id="ref-10">
              Interfax — «Rosatom permits China&apos;s Sealegend Shipping to
              transit NSR as part of launching regular container route»,
              07.08.2026.{" "}
              <a href="https://interfax.com/newsroom/top-stories/118643/">
                interfax.com
              </a>
            </li>
            <li id="ref-11">
              CHNL (Nord University) — «Main Results of NSR Transit Navigation
              in 2025», 09.12.2025.{" "}
              <a href="https://chnl.no/news/main-results-of-nsr-transit-navigation-in-2025/">
                chnl.no
              </a>
            </li>
            <li id="ref-12">
              High North News — «Russia&apos;s Northern Sea Route Sees Record
              Cargo Volume in 2018», 19.02.2019.{" "}
              <a href="https://www.highnorthnews.com/en/russias-northern-sea-route-sees-record-cargo-volume-2018">
                highnorthnews.com
              </a>
            </li>
            <li id="ref-13">
              PolarJournal — «Northern Sea Route – never as much cargo as in
              2020», 12.2020. Дані Атомфлоту, заявлені.{" "}
              <a href="https://polarjournal.net/northern-sea-route-never-as-much-cargo-as-in-2020/">
                polarjournal.net
              </a>
            </li>
            <li id="ref-14">
              CHNL (Nord University) — «NSR Shipping activities in 2022»,
              09.06.2023.{" "}
              <a href="https://chnl.no/research/reports-reports/nsr-shipping-activities-in-2022/">
                chnl.no
              </a>
            </li>
            <li id="ref-15">
              High North News — «China Pushes Northern Sea Route Transit Cargo
              to New Record», 18.12.2023. Дані CHNL.{" "}
              <a href="https://en.highnorthnews.com/business/china-pushes-northern-sea-route-transit-cargo-to-new-record/123647">
                highnorthnews.com
              </a>
            </li>
            <li id="ref-16">
              Interfax — «Cargo traffic on Russia&apos;s Northern Sea Route
              topped 36 mln tonnes in 2023 — Rosatom», 10.01.2024. Дані
              Росатома, заявлені.{" "}
              <a href="https://interfax.com/newsroom/top-stories/98266/">
                interfax.com
              </a>
            </li>
            <li id="ref-17">
              NSIDC — «Arctic sea ice minimum ties for tenth lowest», 09.2026.
              Попередні дані.{" "}
              <a href="https://nsidc.org/sea-ice-today/analyses/arctic-sea-ice-minimum-ties-tenth-lowest-0">
                nsidc.org
              </a>
            </li>
            <li id="ref-18">
              The Barents Observer — «As Arctic sea ice reaches this year&apos;s
              low, shipping reaches historic high», 24.09.2026. Дані сервісів
              відстеження суден.{" "}
              <a href="https://www.thebarentsobserver.com/news/as-arctic-sea-ice-reaches-this-years-low-shipping-reaches-historic-high/458715">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-19">
              ТАСС — «Northern Sea Routes&apos; cargo turnover exceeded record
              6.9 million tonnes in 2016», 13.02.2017. Дані Мінекономрозвитку
              РФ, заявлені.{" "}
              <a href="https://tass.com/economy/930620">tass.com</a>
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
