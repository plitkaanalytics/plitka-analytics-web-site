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
          Світовий торговельний флот потерпає від наслідків воєн. Дрони
          б&apos;ють по суднах у Чорному морі, Ормузька протока й Червоне море
          стали небезпечними, і судноплавці шукають обхідні шляхи, зокрема через
          Арктику. Але головний такий маршрут, Північний морський шлях,
          монопольно регулює російський флот криголамів. Чи здатна Росія
          втримати цей вплив і як на це готується реагувати світ, розбираємо в
          новому матеріалі PLITKA Analytics.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          Літня навігація 2026 року на Північному морському шляху (ПМШ) стала
          рекордною. До 30 вересня його наскрізь пройшли 104 транзитні рейси,
          більше, ніж за весь 2025 рік, і перевезли близько 3,7 мільйона тонн
          вантажу
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . «Росатом» очікує, що загальний вантажообіг шляху за сезон перевищить
          40 мільйонів тонн
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Причина не в тому, що Арктика стала доступнішою, і не тому, що тане
          лід. Літо 2026 року в Арктиці було найхолоднішим із 2018-го
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Вантаж сюди погнала війна.
        </p>

        <p>
          <IfArticleVisible slug="zahrozy-torhovelnomu-flotu">
            Як ми показали в матеріалі{" "}
            <Link href="/articles/zahrozy-torhovelnomu-flotu">
              «Перископ Деніца»
            </Link>
            , захист на морі з&apos;являється лише там, де є військовий
            конвой.{" "}
          </IfArticleVisible>
          На Північному морському шляху дозвіл на прохід видає адміністрація,
          підпорядкована «Росатому», а транзитні судна йдуть за російськими
          криголамами
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-vtecha">
          <span className="h2-num">§ 01 · Втеча</span>Хто веде вантаж на північ
          і від чого він тікає
        </h2>

        <p>
          Очільник «Газпром нефти» Олександр Дюков на Московському енергетичному
          тижні сказав, що «ризик атак на російські нафтові об&apos;єкти змінив
          логіку галузі», і окремо наголосив на значенні Північного морського
          шляху. Його слова переказує Reuters
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Володимир Панов, директор «Росатому» з розвитку ПМШ і Арктики,
          говорить про «місцями ажиотажний» попит російських вантажовідправників
          на перевезення з портів Балтики цим шляхом «на тлі зростання ризиків»
          традиційних морських маршрутів
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Війна закриває південь. Останню партію чавуну з Новоросійська
          відвантажили 31 липня, а з 14 жовтня Мурманськ уперше з 1996 року
          приймає уральський чавун для Туреччини. Дорога туди на десять днів
          довша, і частина виробників, за оцінкою аналітика Argus для FT,
          доплачує до 100 доларів за тонну
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . 28 жовтня в Мурманську почали вантажити й першу пробну партію
          пшениці, 29,5 тисячі тонн для Північної Африки
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Губернатор Ростовської області Юрій Слюсар 5 листопада сказав, що
          робота портів Ростова, Таганрога й Азова «фактично призупинена»
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . Цей вантаж іде на захід, повз Норвегію, і криголами йому не
          потрібні.
        </p>

        <p>
          До кінця вересня ПМШ пройшли 22 танкерні рейси на схід із приблизно
          2,1 мільйона тонн вантажу, здебільшого сирої нафти. Вантажили її в
          Мурманську, Приморську й Усть-Лузі. Container News називає це
          балтійською нафтою, яка тікає з моря, де танкери зупиняють, оглядають
          і атакують дронами
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . До середини жовтня, за даними Reuters, Арктикою вивезли близько 20
          мільйонів барелів нафти, на 50% більше, ніж за весь 2025 рік. Водночас
          це лише близько 1% морського експорту російської нафти
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
          . Панов визнає, що навіть у липні акваторію вкривав лід, і через це
          навігація без льоду почалася пізніше
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Михайло Коростиков із Carnegie пише, що нинішній ріст руху ПМШ «не
          наслідок глобального потепління чи змін в економіці маршруту», його
          спричинила кількість воєн у світі. Він має на увазі війну Росії проти
          України, війну США та Ізраїлю проти Ірану й протистояння США та Китаю
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          Війна в Перській затоці штовхнула на північ навіть союзників США.
          Індія й Південна Корея, оголошуючи плани ходити Арктикою, послалися
          саме на конфлікт на Близькому Сході, а в серпні Сеул відправив цим
          шляхом до Європи перший комерційний контейнеровоз
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Того ж місяця китайська Sea Legend відкрила першу сезонну лінію з
          Китаю до Європи через Арктику, розраховану на вісім рейсів
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Прямих рейсів з Азії до Європи до кінця вересня набралося чотири,
          тоді як за весь 2025 рік був один
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Поки що це невеликий потік. У 2025 році транзитні рейси перевезли 3,2
          мільйона тонн, менше 9% усього вантажу ПМШ
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Увесь сезон Sea Legend перевіз менше контейнерів, ніж бере за рейс
          один ультравеликий контейнеровоз
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Контейнер через Арктику до того ж коштує близько 8&nbsp;500 доларів,
          майже вдвічі більше за спотову ціну з Шанхая до Роттердама в серпні
          2026 року, а залізницею з Китаю до Європи виходить близько 6&nbsp;000
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          Скільки вантажу пройшло шляхом за весь сезон, остаточно ще невідомо.
          Норвезький Центр високоширотної логістики (CHNL) рахує рейси за даними
          AIS
          <a className="ref" href="#ref-9">
            [9]
          </a>
          , «Росатом» дає власні оцінки, і ці ряди помітно розходяться.
        </p>

        <table>
          <thead>
            <tr>
              <th />
              <th>CHNL, на 30 вересня</th>
              <th>«Росатом», оцінка на сезон</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Транзитний вантаж</td>
              <td>3,7 млн т; до кінця сезону, за прогнозом, понад 4,5 млн т</td>
              <td>понад 7 млн т</td>
            </tr>
            <tr>
              <td>Транзитні рейси</td>
              <td>104; до кінця сезону, за прогнозом, близько 150</td>
              <td>не названо</td>
            </tr>
            <tr>
              <td>Контейнерні транзити</td>
              <td>13</td>
              <td>46</td>
            </tr>
          </tbody>
        </table>
        <p className="aside-note">
          Джерела: CHNL через Splash247 і SAFETY4SEA
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-9">
            [9]
          </a>
          ; Володимир Панов, «Росатом», через Interfax
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Навіть прогноз CHNL на кінець сезону в півтора раза менший за оцінку
          «Росатому», тож різницю не пояснити лише тим, що CHNL рахує до 30
          вересня. Незалежних підтверджень цифрам «Росатому» немає.
        </p>

        <p>
          Хоч би якими були підсумкові цифри, кожен новачок на цьому шляху, від
          корейського Panstar Acro до китайських ліній, зайшов на нього з
          дозволу Росії
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        {/* TODO: § 02 Шлях із господарем → § 03 Конвой, який є лише тут → § 04 Чи втримає → § 05 Як реагує світ → висновок (структура погоджена 07.11, див. notes.md) */}

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
              SAFETY4SEA — «Northern Sea Route transits surpass 2025 levels as
              EU seeks greater Arctic access», 20.10.2026. Дані CHNL.{" "}
              <a href="https://safety4sea.com/northern-sea-route-transits-surpass-2025-levels-as-eu-seeks-greater-arctic-access/">
                safety4sea.com
              </a>
            </li>
            <li id="ref-10">
              Kyiv Post — «Russia Reroutes Pig Iron to Arctic Port for First
              Time in 30 Years», 07.11.2026. Переказ Financial Times.{" "}
              <a href="https://www.kyivpost.com/post/89440">kyivpost.com</a>
            </li>
            <li id="ref-11">
              «Новая газета Европа» — «Россия вынуждена вывозить зерно через
              Арктику из-за украинских атак на черноморские порты — FT»,
              01.11.2026. Переказ Financial Times.{" "}
              <a href="https://novayagazeta.eu/articles/2026/11/01/rossiia-vynuzhdena-vyvozit-zerno-cherez-arktiku-iz-za-ukrainskikh-atak-na-chernomorskie-porty-ft-news">
                novayagazeta.eu
              </a>
            </li>
            <li id="ref-12">
              BFM — «„Южный морской путь встал“ — эксперт об остановке портов
              Ростовской области после атак беспилотников», 06.11.2026. Слова
              Слюсаря — з ефіру «Россия 24».{" "}
              <a href="https://www.bfm.ru/news/623079">bfm.ru</a>
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
