import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getArticleBySlug,
  requireVisibleArticle,
  formatDate,
  getAllArticles,
} from "@/lib/articles";
import ArticleHead from "@/components/ArticleHead";
import ArcticIcebreakerFleets from "@/components/ArcticIcebreakerFleets";

const SLUG = "arctic-corridor";

/** Search and social copy — a separate text from the dek: the dek asks a
 *  question, the description states what is inside. Title comes from the
 *  frontmatter. */
const DESCRIPTION =
  "An OSINT analysis of the Northern Sea Route: the 2026 transit record was driven not by a warm year but by war. Cargo is fleeing drones and risk on the southern routes for a passage that Russia alone controls through its icebreaker fleet.";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return {
    title: `${getArticleBySlug(SLUG, "en").title} — PLITKA Analytics`,
    description: DESCRIPTION,
    openGraph: { images: ["/articles/arktychnyi-korydor/cover.jpg"] },
  };
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");
  const related = getAllArticles("en")
    .filter((a) => a.slug !== SLUG)
    .slice(0, 3);

  return (
    <main data-screen-label="Story · Arctic corridor">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Title, dek and reading time come from content/articles/en/arctic-corridor.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Investigation" locale="en" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/arktychnyi-korydor/cover.jpg"
            alt="The nuclear icebreaker Yamal cuts a channel through solid ice, followed by two cargo ships"
          />
        </div>
        <p className="lede">
          In 2026, wars finally changed the rules of maritime trade. Ships,
          whatever their flag or cargo, can no longer feel safe near countries
          at war. A whole series of strategic sea routes has become dangerous,
          and a voyage can end with the loss of the ship, the cargo and even the
          crew’s lives. Shippers are looking for ways around. For Russia, which
          is steadily losing its southern outlets, the obvious way out is an
          escape into the Arctic. The Northern Sea Route is run as a monopoly by
          the Russian icebreaker fleet. With no competition at sea and weak
          neighbours, the Arctic is a convenient corridor for sanctioned goods
          and other illicit cargo. But can Russia hold on to this influence, and
          how is the rest of the world preparing to respond? PLITKA Analytics
          takes a closer look.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          The 2026 summer navigation season on the Northern Sea Route (NSR), the
          shipping lane along Russia’s Arctic coast between the Barents Sea and
          the Bering Strait, set a record. By 30 September, 104 transit voyages
          had passed through the route, more than in the whole of 2025, carrying
          about 3.7 million tonnes of cargo
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Rosatom, the Russian state nuclear corporation that also runs the
          route, expects total cargo for the season to exceed 40 million tonnes
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Figures like these could be put down to climate change and easier
          conditions, but the Arctic summer of 2026 was the coldest since 2018
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . The main reason is war.
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-escape">
          <span className="h2-num">§ 01 · The escape</span>
        </h2>

        <p>
          The war is closing Russia’s southern ports. Novorossiysk, Russia’s
          main Black Sea port, was still handling the last consignments in
          September 2026, but the number of shippers willing to risk a call kept
          falling, and in November local authorities officially admitted that
          the ports of Rostov, Taganrog and Azov were “effectively suspended”
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . In October, cargo typical of the southern regions began arriving in
          Murmansk. On 14 October it was announced that Murmansk would handle
          Ural pig iron bound for Turkey for the first time since 1996
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . On 28 October the northern port began loading its first trial
          shipment of wheat, 29,500 tonnes for North Africa
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . The detour adds about ten days to the journey and up to a hundred
          dollars per tonne, but exporters have no other choice.
        </p>

        <p>
          Oil is heading north as well. Speaking at Russian Energy Week in
          Moscow, Gazprom Neft chief executive Alexander Dyukov said that “the
          risk of attacks on Russian oil facilities has changed the logic of the
          industry”, and singled out the Northern Sea Route as a way to rescue
          the situation
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <p>
          By the end of September, 22 eastbound tanker voyages had passed
          through the NSR with about 2.1 million tonnes of cargo, mostly crude
          oil, loaded in Murmansk and in the Baltic ports of Primorsk and
          Ust-Luga
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . By mid-October, according to Reuters, about 20 million barrels of
          oil had been shipped via the Arctic, 50% more than in the whole of
          2025
          <a className="ref" href="#ref-9">
            [9]
          </a>
          .
        </p>

        <p>
          The ice did not help. In September 2026, according to the Met Office,
          Arctic sea ice extent was the fifth largest since 2007
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Vladimir Panov, Rosatom’s director for the development of the NSR
          and the Arctic, says that even in July this year the waters were still
          covered with ice, so navigation started much later than usual
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . Yet demand from Russian shippers mattered more than the weather.
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/z1JVJJ2jbss?rel=0"
            title="Arctic sea ice in 2026, from the March maximum to the September minimum"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            Arctic sea ice in 2026, from the March maximum to the September
            minimum. The yellow line shows the average minimum for 1981–2010.{" "}
            <em>Visualisation: NASA Scientific Visualization Studio.</em>
          </figcaption>
        </figure>

        <p>
          The Black Sea war is not the only one reshaping logistics. Fighting in
          the Persian Gulf has pushed even US allies north. When India and South
          Korea announced plans to use the Arctic route, both cited the conflict
          in the Middle East, and in August Seoul sent the first commercial
          container ship to Europe this way
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . The same month China’s Sea Legend opened the first seasonal line
          from China to Europe via the Arctic, planned for eight voyages
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . By the end of September there had been four times as many direct
          voyages from Asia to Europe as in the whole of 2025
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          In percentage terms, third-country transit is still small. In 2025,
          transit voyages carried 3.2 million tonnes, less than 9% of all NSR
          cargo
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Over the whole season Sea Legend moved fewer containers than a
          single ultra-large container ship carries on one ordinary voyage
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . A container via the Arctic also costs about $8,500, almost twice the
          spot rate from Shanghai to Rotterdam in August 2026
          <a className="ref" href="#ref-11">
            [11]
          </a>
          , yet the upward trend holds.
        </p>

        <p>
          Every one of these voyages, from the Korean Panstar Acro to the
          Chinese lines, needs Russia’s direct permission to make the passage.
          On this sea, the state holds a monopoly.
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-gatekeeper">
          <span className="h2-num">§ 02 · The gatekeeper</span>
        </h2>

        <p>
          A ship applies for passage to the NSR Administration, which reports to
          Rosatom, and along with the permit comes the obligation to pay for
          pilots and icebreaker escort
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Before opening its line to Europe, China’s Sea Legend obtained
          permits for a set number of ships
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <p>
          The icebreaker does not lead every ship from end to end. It breaks a
          channel on particular stretches, a ship of high ice class follows, and
          covers the rest of the route on its own. Rosatom spreads the cost of
          escort across the whole cargo flow, so the more traffic there is, the
          smaller the share of costs per tonne
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          As its legal basis, Russia cites Article 234 of the UN Convention on
          the Law of the Sea. It allows coastal states to adopt special rules
          against pollution from ships in ice-covered areas, but says nothing
          about the right of passage. The NSR, for its part, crosses Russia’s
          internal waters, territorial sea and exclusive economic zone. Under
          the convention, freedom of navigation applies in the exclusive
          economic zone. Moscow, however, requires a permit for the entire route
          at once, so in practice passage has merged into a single permit system
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Experts in the law of the sea have repeatedly pointed out that prior
          permission and mandatory paid escort go beyond international
          agreements, but the international community has no leverage in the
          north
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          Russia regards five key straits, the Kara Gates and the Shokalsky,
          Vilkitsky, Dmitry Laptev and Sannikov straits, as internal waters.
          They were made so by{" "}
          <span
            className="term"
            data-def="Lines from which the territorial sea is measured. Straight baselines join headland to headland or island to island, and the waters between them and the shore become internal waters, treated like land territory."
          >
            straight baselines
          </span>{" "}
          drawn in 1985. The United States considers the NSR straits
          international
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/arktychnyi-korydor/arctic-routes-en.webp"
            alt="Map of the Arctic with three routes: the Northern Sea Route along the Russian coast, the Northwest Passage through the Canadian archipelago and the Transpolar Sea Route across the pole"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            Three Arctic routes. The Northern Sea Route runs along Russia, the
            Northwest Passage through Canada’s islands.{" "}
            <em>Map: The Arctic Institute.</em>
          </figcaption>
        </figure>

        <p>
          Article 234 does not apply to warships. For them, Moscow passed a
          separate law back in December 2022. A foreign state vessel must
          request permission to pass through the internal waters of the NSR at
          least three months in advance, one request per ship. Russia can
          suspend innocent passage in its territorial sea by a radio
          announcement that takes effect immediately
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Rosatom’s Vladimir Panov calls the NSR a “historical heritage” and
          argues that the time has come to turn it into a “maritime
          Trans-Siberian”. He names safety as the route’s main advantage. About
          70% of the way from Asia to Europe runs along Russia, “in a single
          shipping management system”, while the route through the Suez Canal
          passes the waters of more than twenty states
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . Safety is guaranteed by the gatekeeper who issues the permit.
        </p>

        <p>
          For Russia’s adversaries, this is exactly what makes the route
          dangerous. This year Rosatom stopped publishing the list of ships it
          has granted permits to. Data on ship positions, accidents and
          incidents along the route have also been closed. According to the
          environmental organisation Bellona, about a hundred shadow fleet
          vessels sailed the NSR in 2025
          <a className="ref" href="#ref-14">
            [14]
          </a>
          . Which of them received permits in 2026 is now known only to the
          administration that issued them. The NSR is gradually turning into a
          “black box” of world maritime trade, where sanctioned goods can pass,
          be transshipped and mixed with other cargo beyond the control of other
          states and international legal regimes.
        </p>

        <p>
          This power rests on icebreakers. The eastern part of the route is
          passable only a few months a year, and even the season does not
          guarantee safety. The rest of the time, ships do not sail there
          without Rosatom’s icebreakers
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        {/* ===================== § 03 ===================== */}
        <h2 id="sec-icebreakers">
          <span className="h2-num">§ 03 · Icebreakers</span>
        </h2>

        <p>
          As of late 2026, Rosatom operates eight nuclear icebreakers. Four
          belong to the older generation, Taymyr, Vaygach, Yamal and 50 Let
          Pobedy, and four to the new Project 22220: Arktika, Sibir, Ural and
          Yakutiya
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . Last winter Rosatom deployed all eight on the NSR at once, with no
          spare icebreakers left in reserve
          <a className="ref" href="#ref-16">
            [16]
          </a>
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . In effect, there are not enough icebreakers already, and the
          shortage has persisted for years
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          To cover the gap, the icebreakers are kept at sea longer than normal.
          In March 2026, Vyacheslav Ruksha, head of Rosatom’s Arctic
          directorate, said the operating schedule was being raised from 240 to
          270 days a year. The rest of the time is meant for reactor refuelling,
          repairs, transits to Baltic shipyards and a shared fleet reserve of 75
          days. Refuelling for Vaygach and 50 Let Pobedy was scheduled for 2026.
          Sanctions have complicated repairs. In 2025, British restrictions
          halted the towing of a floating dock for the 22220 icebreakers in the
          Mediterranean, and Arktika had to sail from Murmansk all the way to St
          Petersburg for repairs. In February 2026, Sibir was taken from the
          Arctic to the Baltic to break ice near the oil terminal at Primorsk,
          covering a shortage there
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          The old icebreakers are nearing the end of their service. Taymyr,
          built in 1989, is due to be decommissioned in 2030, Vaygach in 2031
          and Yamal in 2033. Their reactor life has already been extended from
          100,000 to 255,000 hours, and their service life from 33 to 40 years
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . Bellona warns that reactors operated beyond their design life may
          fail, and that rescue capabilities in Arctic waters are limited.
          Neither the Russian government nor Rosatom has a settled view of how
          many icebreakers are needed. Estimates range from 11 to 18
          <a className="ref" href="#ref-16">
            [16]
          </a>
          <a className="ref" href="#ref-15">
            [15]
          </a>
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          New icebreakers are under construction. Rosatom promises to commission
          Chukotka in early 2027, bringing the number of nuclear icebreakers to
          nine. The fifth and sixth serial 22220 ships are being built, and for
          the seventh and eighth “work has begun on the instructions of the
          president”. Even so, these ships essentially replace outdated ones
          rather than add capacity
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . According to experts, there is simply no money for growth, and the
          fleet will stay at around ten nuclear icebreakers for years
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/arktychnyi-korydor/chukotka-spusk-2024.jpg"
            alt="The blue hull of the icebreaker Chukotka, with a Russian flag on the bow, being launched next to port cranes"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            Launch of the nuclear icebreaker Chukotka in St Petersburg, 6
            November 2024.{" "}
            <em>Photo: Alexei Danichev, RIA Novosti, CC BY 4.0.</em>
          </figcaption>
        </figure>

        <p>
          Delivery dates also keep slipping. A 2020 government plan promised the
          lead ship of the super-powerful Lider class in December 2027 and two
          more in 2030–2032
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . By December 2024, Kommersant was citing 2029 for Lider
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . In autumn 2026 the promise was to complete Lider by 2030. Year-round
          navigation in the east of the route depends on this icebreaker
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          The government has been cutting budget funding for nuclear icebreakers
          in recent years, and Rosatom has no money of its own for expansion.
          Lider is being built entirely from the federal budget, the serial
          22220s half from off-budget money, and in the new group of six
          icebreakers the off-budget share has risen to 75%. As of 2026, four
          non-nuclear icebreakers have no funding at all. Rosatom has therefore
          proposed an Arctic investment levy from 2028, a surcharge per tonne of
          cargo on the fee for icebreaker escort in the east of the NSR. That
          makes an already expensive route even more expensive. Large shippers
          are already complaining about tariffs and expect rates to rise further
          as icebreakers become costlier
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          For transit, the price of escort is decisive. Mokpo National Maritime
          University in South Korea modelled a voyage from Shanghai to
          Rotterdam. By its calculation, escort, Arctic insurance and the risk
          of delays add about a million dollars to the voyage, and the NSR comes
          out cheaper than the Suez Canal in only 16.6% of scenarios in summer
          and 1.4% in winter. If escort cost $250,000 per voyage, the Arctic
          would win in almost a third of scenarios
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          For Russia’s Arctic oil and gas infrastructure to work properly, it
          also needs ships to follow the icebreakers. Russia’s Central Marine
          Research and Design Institute (TsNIIMF) has calculated that by 2030
          Russian companies will need at least ten tankers of 120,000 deadweight
          tonnes and five LNG carriers. On top of these come eight ships for gas
          condensate, liquefied petroleum gas and dry cargo, all of them of Arc7
          ice class. Russian yards do not build large ice-class ships, and
          China, citing sanctions, has refused to supply propulsion and steering
          systems for them
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . Arctic LNG 2 still partly ships its gas on Arc4 carriers, which are
          not designed for thick ice even behind an icebreaker. In December
          2025, one such carrier, Buran, failed several times to reach the
          terminal in the Gulf of Ob, even though a nuclear icebreaker was
          escorting it
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <p>
          Rosneft chief Igor Sechin promises to start shipping about 30 million
          tonnes of oil through the Bukhta Sever terminal of the Vostok Oil
          project in the second half of 2027. In the whole of 2026, the NSR is
          expected to carry about 40 million tonnes. Vostok Oil’s deadlines have
          been pushed back more than once, and there are not enough tankers for
          it either
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . In early 2027, Rosatom also promises regular eastbound voyages for
          one of its largest shippers
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . The plans will almost certainly have to be revised again, and the
          resources will again fall short.
        </p>

        <p>
          A monopoly on escort, a permit system and the absence of outside
          oversight create ideal conditions for the shadow fleet and for
          sanctions-busting cargo. And such cargo is becoming ever more common
          on the NSR.
        </p>

        {/* ===================== § 04 ===================== */}
        <h2 id="sec-shadow">
          <span className="h2-num">§ 04 · The shadow</span>
        </h2>

        <p>
          Analysts counted 38 shadow fleet tankers on the NSR in the whole of
          2025 and 50 in the first two months of the 2026 season alone. For gas
          carriers, the figures for the same periods were 13 and 18. About three
          quarters of all tankers that used the route were under sanctions. Of
          the 50 tankers, 26 had an ice class of Ice3 or lower or none at all,
          and 33 were more than 15 years old
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          The rules forbid ships without ice class from sailing on their own
          even in light ice. Yet in September 2025 the tanker Lynx, with no ice
          class and about a million barrels of oil from Murmansk, spent several
          days stuck in ice at 72° N on its way to China. It had no permit and
          did not appear in the daily traffic logs of the route, and yet
          Rosatom’s nuclear icebreakers escorted it onward
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . In October 2026, the 22-year-old Dakar, with a low ice class, headed
          west along the Arctic coast as the window for such ships was closing.
          The EU had sanctioned it back in July
          <a className="ref" href="#ref-24">
            [24]
          </a>
          , and Britain added its own sanctions on 8 October while the ship was
          under way
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <p>
          This is where the NSR’s main advantage lies. Cargo owners overpay not
          for speed but because on this route their cargo cannot be stopped and
          inspected
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . In Arctic waters, Russian shipowners sail without fear of Ukrainian
          drones, Western coast guard raids or crew safety inspections
          <a className="ref" href="#ref-26">
            [26]
          </a>
          .
        </p>

        <p>
          West of Murmansk it is a different story. Almost all tankers carrying
          oil out of this port belong to the shadow fleet
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . Between October 2025 and January 2026, more than 50 such tankers
          sailed along Norway to Murmansk
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . On 11 August 2025, Norway introduced a new practice: it regularly
          asks tankers in its exclusive economic zone to show proof of
          insurance, on a voluntary basis
          <a className="ref" href="#ref-29">
            [29]
          </a>
          . By the end of January, 238 ships had received the request, 194 sent
          a certificate, and 42 certificates turned out to be invalid, mostly
          because of a false flag
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <p>
          Some tankers simply go around the Norwegian zone. In April 2026, the
          sanctioned Apple sailed from the North Sea to the Barents Sea outside
          the 200-mile zone, and Norway’s vessel traffic service in Vardø was
          never able to contact it
          <a className="ref" href="#ref-31">
            [31]
          </a>
          . In August, the tanker Derzhava, formerly Elbrus, which a Ukrainian
          drone had hit in the Black Sea in January, passed within a few
          kilometres of Norway’s Bear Island. According to the OpenSanctions
          database, it had no insurance
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . Oslo refuses to detain such ships on the basis of sanctions alone,
          saying this requires a clear basis in international law
          <a className="ref" href="#ref-32">
            [32]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/arktychnyi-korydor/apple-barentswatch-2026.jpg"
            alt="Nautical chart of the Norwegian and Barents seas: the track of the tanker Apple runs along the edge of Norway’s economic zone towards Murmansk"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            Apple’s track on 17 April 2026. The tanker hugs the very edge of
            Norway’s 200-mile zone.{" "}
            <em>Map: BarentsWatch, via The Barents Observer.</em>
          </figcaption>
        </figure>

        <p>
          Other countries act more boldly. In January 2026, the United States
          seized the tanker Marinera, formerly Bella 1, between Iceland and the
          British Isles as it was heading for Murmansk. During the chase, Russia
          hastily gave the ship its flag and, according to the WSJ and CBS, sent
          a submarine and other warships to escort it
          <a className="ref" href="#ref-33">
            [33]
          </a>
          . On 31 May, French special forces landed by helicopter on the tanker
          Tagor 400 nautical miles west of Brittany. It had loaded oil in
          Murmansk and was sailing under a false Cameroonian flag
          <a className="ref" href="#ref-32">
            [32]
          </a>
          .
        </p>

        <p>
          On 21 January, the Maritime Board chaired by Nikolai Patrushev adopted
          measures to protect Russian shipping, and Murmansk governor Andrei
          Chibis called the navy’s role decisive
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . Since December 2025, the Northern Fleet destroyer Severomorsk has
          escorted ships in the Baltic and then in the Mediterranean. In August
          2026, the frigate Admiral Kasatonov escorted Gazprom’s gas carrier
          Portovyy along Norway from the Baltic to Murmansk, from where it
          probably continued via the NSR to China
          <a className="ref" href="#ref-26">
            [26]
          </a>
          .
        </p>

        {/* ===================== § 05 ===================== */}
        <h2 id="sec-response">
          <span className="h2-num">§ 05 · The response</span>
        </h2>

        <p>
          On 20 October 2026, the European Commission presented a new EU Arctic
          strategy and put security first, ahead even of climate issues
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . “The Arctic is no longer insulated from geopolitical tensions in the
          world,” said Kaja Kallas, the EU’s High Representative for Foreign
          Affairs
          <a className="ref" href="#ref-35">
            [35]
          </a>
          . The strategy provides for a maritime security hub through which EU
          countries and partners will share data on ship movements in the
          Arctic. Later the hub is also meant to track the shadow fleet
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . The EU also declares freedom of navigation on all trade routes, but
          is preparing to use inspections to make ships comply with the Polar
          Code, the mandatory international safety rules for polar waters
          <a className="ref" href="#ref-35">
            [35]
          </a>
          .
        </p>

        <p>
          Another point of the strategy concerns icebreakers, which Europe wants
          to build more of
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . Rosatom responded to Europe’s efforts. Vladimir Panov retorted
          sarcastically that the resources the EU can muster without cooperating
          with Russia will be “a drop in the ocean” compared with the scale of
          the task. He read the strategy itself as an admission of Russian
          superiority, since “a weak player is not called an opponent and nobody
          tries to contain it”
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Back in July 2024, the United States, Canada and Finland signed the
          ICE Pact, an agreement to build icebreakers together in response to
          Russian and Chinese activity in the Arctic. The US Coast Guard
          currently has three polar icebreakers. The oldest of them, the heavy
          Polar Star, has been in service since 1976. By the Coast Guard’s own
          estimate, it needs at least nine new ones. In December 2025, the Coast
          Guard ordered the first of them. Finland’s Rauma yard will build up to
          two, the first in 2028, and Bollinger in Louisiana up to four, the
          first in 2029. The new icebreakers are designed to break ice up to 1.2
          metres thick. Almost $9 billion has been allocated to the programme
          <a className="ref" href="#ref-36">
            [36]
          </a>
          . Canada’s Davie will build five more, the first two in Helsinki and
          the rest in Texas, between 2032 and 2034. In total, the US Coast Guard
          plans to receive 11 medium icebreakers
          <a className="ref" href="#ref-37">
            [37]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/arktychnyi-korydor/polar-star-bering-2021.jpg"
            alt="The red and white US Coast Guard icebreaker Polar Star on the ice, with its crew holding a banner in front"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            Polar Star, the oldest US polar icebreaker, on the ice of the Bering
            Sea, 30 January 2021.{" "}
            <em>Photo: US Coast Guard, Cynthia Oldham.</em>
          </figcaption>
        </figure>

        <p>
          Donald Trump’s aggressive policy could undo this joint effort. The new
          US defence strategy demands American access to key territories “from
          the Arctic to South America”, and threats keep coming towards both
          Canada and Greenland. So by helping America, Canada may well end up
          harming itself. Ottawa regards the straits of the Northwest Passage
          between its Arctic islands as internal waters, while other countries,
          including the United States, do not recognise this. Vincent Rigby, a
          former national security adviser to the Canadian prime minister,
          advises against breaking off the deal for now, since the first
          icebreakers under it will arrive only in 2028–2029, when Trump’s term
          is due to end
          <a className="ref" href="#ref-38">
            [38]
          </a>
          .
        </p>

        <p>
          China has no nuclear icebreakers yet, but is already building its
          first
          <a className="ref" href="#ref-37">
            [37]
          </a>
          . For it, Beijing is considering a thorium molten-salt reactor
          <a className="ref" href="#ref-39">
            [39]
          </a>
          . China’s strategic ambitions in the High North are growing, with
          active investment in ports and infrastructure
          <a className="ref" href="#ref-35">
            [35]
          </a>
          .
        </p>

        <figure className="fig">
          <ArcticIcebreakerFleets lang="en" />
          <figcaption>
            The icebreaker fleets of Russia, the United States and China, and
            what will be added to them by 2034.
          </figcaption>
        </figure>

        {/* ===================== EPILOGUE ===================== */}
        <hr className="section-break" />

        <p>
          The Arctic is one of the places where the tectonic plates of
          geopolitics collide. The EU and NATO make no secret of their plans to
          gradually move forces north and constrain Russia and China, Washington
          is entrenching itself in Greenland, Moscow is reopening Soviet bases
          and laying down new ones, and Beijing, together with Moscow, is
          building its Polar Silk Road. For now, Russia alone decides who sails
          along its coast, and the war in the south has only given this idea
          more weight.
        </p>

        <p>
          In 1985, the American icebreaker Polar Sea sailed through the
          Northwest Passage after merely notifying Canada, without asking for
          permission. An international row followed. What should we expect when
          the first of Europe’s new icebreakers decides to use the Russian
          route, treating these waters as international? At some point it will
          have to. And that is when the results of all the preparation will show
          who has really won the race for the Arctic.
        </p>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              Splash247 — “Northern Sea Route smashes shipping records again”,
              20.10.2026. CHNL data.{" "}
              <a href="https://splash247.com/northern-sea-route-smashes-shipping-records-again/">
                splash247.com
              </a>
            </li>
            <li id="ref-2">
              Interfax — “Transit via Northern Sea Route expected to set new
              record in 2026, top 7 mln t — Rosatom”, 27.10.2026. Rosatom
              forecast; figures as claimed.{" "}
              <a href="https://interfax.com/newsroom/top-stories/119691/">
                interfax.com
              </a>
            </li>
            <li id="ref-3">
              Met Office — “Arctic and Antarctic end-of-season report — October
              2026”, 14.10.2026.{" "}
              <a href="https://www.metoffice.gov.uk/research/approach/monitoring/sea-ice/2026/arctic-and-antarctic-end-of-season-report---october-2026">
                metoffice.gov.uk
              </a>
            </li>
            <li id="ref-4">
              BFM — “«Южный морской путь встал» — эксперт об остановке портов
              Ростовской области после атак беспилотников”, 06.11.2026. In
              Russian. Slyusar’s words are from a Rossiya 24 broadcast.{" "}
              <a href="https://www.bfm.ru/news/623079">bfm.ru</a>
            </li>
            <li id="ref-5">
              Kyiv Post — “Russia Reroutes Pig Iron to Arctic Port for First
              Time in 30 Years”, 07.11.2026. Summary of a Financial Times
              report.{" "}
              <a href="https://www.kyivpost.com/post/89440">kyivpost.com</a>
            </li>
            <li id="ref-6">
              Novaya Gazeta Europe — “Россия вынуждена вывозить зерно через
              Арктику из-за украинских атак на черноморские порты — FT”,
              01.11.2026. In Russian. Summary of a Financial Times report.{" "}
              <a href="https://novayagazeta.eu/articles/2026/11/01/rossiia-vynuzhdena-vyvozit-zerno-cherez-arktiku-iz-za-ukrainskikh-atak-na-chernomorskie-porty-ft-news">
                novayagazeta.eu
              </a>
            </li>
            <li id="ref-7">
              ArcticToday (republished from The Barents Observer) — “Ukraine war
              pushes Russian oil to Arctic route”, 23.10.2026. Dyukov’s words as
              reported by Reuters.{" "}
              <a href="https://www.arctictoday.com/ukraine-war-pushes-russian-oil-to-arctic-route/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-8">
              Container News — “Explainer: NSR record shows a new trend”,
              21.10.2026.{" "}
              <a href="https://container-news.com/explainer-nsr-record-shows-a-new-trend/">
                container-news.com
              </a>
            </li>
            <li id="ref-9">
              RFE/RL — “An Arctic Traffic Jam Highlights Doubts Over Russia’s
              Northern Sea Route To China”, 23.10.2026.{" "}
              <a href="https://www.rferl.org/a/arctic-traffic-jam-russia-northern-sea-route-china/33882814.html">
                rferl.org
              </a>
            </li>
            <li id="ref-10">
              Interfax — “Владимир Панов: Северный морской путь в шаге от
              круглогодичности, маршрут переходит на новый этап”, 27.10.2026. In
              Russian. Interview with a Rosatom official; figures as claimed.{" "}
              <a href="https://www.interfax.ru/interview/1125051">
                interfax.ru
              </a>
            </li>
            <li id="ref-11">
              Mikhail Korostikov, Carnegie Endowment — “International Demand for
              Russia’s Arctic Shipping Route Is Unlikely to Last”, 30.09.2026.
              Analysis.{" "}
              <a href="https://carnegieendowment.org/russia-eurasia/politika/2026/09/russia-northern-sea-route">
                carnegieendowment.org
              </a>
            </li>
            <li id="ref-12">
              Interfax — “Rosatom permits China’s Sealegend Shipping to transit
              NSR as part of launching regular container route”, 07.08.2026.
              Likhachev’s words; figures as claimed.{" "}
              <a href="https://interfax.com/newsroom/top-stories/118643/">
                interfax.com
              </a>
            </li>
            <li id="ref-13">
              Jan Jakub Solski, Norwegian Centre for the Law of the Sea (NCLOS,
              UiT) — “Charting the Future of Arctic Shipping: Why Navigational
              Rights in the Northern Sea Route Matter?”, 24.06.2026. Legal
              analysis.{" "}
              <a href="https://site.uit.no/nclos/2026/06/24/charting-the-future-of-arctic-shipping-why-navigational-rights-in-the-northern-sea-route-matter/">
                site.uit.no
              </a>
            </li>
            <li id="ref-14">
              Vsevolod Levchenko, Bellona — “Russian Shadow Fleet Tanker
              Responsible for Black Sea Oil Spill Regularly Used the Northern
              Sea Route”, 03.05.2026.{" "}
              <a href="https://etc.bellona.org/2026/05/03/sofia-oil-spill/">
                etc.bellona.org
              </a>
            </li>
            <li id="ref-15">
              Kommersant — “Ледосбор”, 18.12.2024. In Russian. The paper’s
              government and industry sources; figures as claimed.{" "}
              <a href="https://www.kommersant.ru/doc/7382754">kommersant.ru</a>
            </li>
            <li id="ref-16">
              Malte Humpert, gCaptain — “Russia Pushes Icebreakers to 270 Days
              at Sea as Sanctions Slow Arctic Fleet Renewal”, 12.03.2026.{" "}
              <a href="https://gcaptain.com/russia-pushes-icebreakers-to-270-days-at-sea-as-sanctions-slow-arctic-fleet-renewal/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-17">
              ShipUniverse — “Russia Puts Full Nuclear Icebreaker Fleet On The
              Line For Arctic Exports”, 16.12.2025.{" "}
              <a href="https://www.shipuniverse.com/news/russia-puts-full-nuclear-icebreaker-fleet-on-the-line-for-arctic-exports/">
                shipuniverse.com
              </a>
            </li>
            <li id="ref-18">
              Kommersant — “Савельев: количество атомных ледоколов на Севморпути
              увеличат до 11”, 19.11.2025. In Russian. Figures as claimed.{" "}
              <a href="https://www.kommersant.ru/doc/8212508">kommersant.ru</a>
            </li>
            <li id="ref-19">
              Logirus — “У Севморпути будет целый флот – ледокольный,
              гидрографический и спасательный”, 29.01.2020. In Russian. Summary
              of the government plan for developing the NSR to 2035.{" "}
              <a href="https://logirus.ru/news/transport/u_sevmorputi_budet_tselyy_flot_-_ledokolnyy-_gidrograficheskiy_i_spasatelnyy.html">
                logirus.ru
              </a>
            </li>
            <li id="ref-20">
              Vzglyad — “Севморпуть кратно бьет тучные советские годы”,
              19.10.2026. In Russian. Comment by Roman Koposov (ARB Pro); the
              Mokpo National Maritime University calculation as summarised by
              him.{" "}
              <a href="https://vz.ru/economy/2026/10/19/1463889.html">vz.ru</a>
            </li>
            <li id="ref-21">
              Kyiv Post — “China Declines to Supply Equipment for Russian
              Northern Sea Route Fleet Due to Sanctions”, 18.07.2026. Summary of
              a Vedomosti report on a TsNIIMF presentation.{" "}
              <a href="https://www.kyivpost.com/post/80572">kyivpost.com</a>
            </li>
            <li id="ref-22">
              gCaptain — “Shadow Fleet Traffic on Northern Sea Route Surges as
              Arctic Safety Concerns Grow”, 05.10.2026. Bellona data.{" "}
              <a href="https://gcaptain.com/shadow-fleet-traffic-on-northern-sea-route-surges-as-arctic-safety-concerns-grow/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-23">
              gCaptain — “Sanctioned Suezmax Oil Tanker Without Ice Protection
              Stuck for Days on Russia’s Arctic Northern Sea Route”, 15.09.2025.{" "}
              <a href="https://gcaptain.com/sanctioned-suezmax-oil-tanker-without-ice-protection-stuck-for-days-on-russias-arctic-northern-sea-route/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-24">
              gCaptain — “Sanctioned 22-Year-Old Tanker Makes Rare Late-Season
              Arctic Voyage”, 07.10.2026.{" "}
              <a href="https://gcaptain.com/sanctioned-22-year-old-non-ice-class-tanker-makes-rare-late-season-arctic-voyage/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-25">
              gCaptain — “UK Sanctions 12 More ‘Shadow-Fleet’ Tankers as
              Russia’s Arctic Traffic Grows”, 08.10.2026.{" "}
              <a href="https://gcaptain.com/uk-sanctions-12-more-shadow-fleet-tankers-as-russias-arctic-traffic-grows/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-26">
              ArcticToday (republished from The Barents Observer) — “Russian
              warship escorts Gazprom tanker along Norwegian coast”, 20.08.2026.{" "}
              <a href="https://www.arctictoday.com/russian-warship-escorts-gazprom-tanker-along-norwegian-coast/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-27">
              The Barents Observer — “30-year-old tanker linked with Iran
              drifting along Norway’s Arctic coast”, 04.11.2026.{" "}
              <a href="https://www.thebarentsobserver.com/news/30yearold-tanker-linked-with-iran-drifting-along-norways-arctic-coast/461333">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-28">
              ArcticToday (republished from The Barents Observer) — “Russia
              hints it will deploy Navy to protect ‘shadow fleet’”, 28.01.2026.{" "}
              <a href="https://www.arctictoday.com/russia-hints-it-will-deploy-navy-to-protect-shadow-fleet/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-29">
              The Barents Observer — “Oslo takes measures against Russian
              ‘shadow fleet’”, 07.08.2025.{" "}
              <a href="https://www.thebarentsobserver.com/news/oslo-takes-measures-against-russian-shadow-fleet/434655">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-30">
              ArcticToday (republished from The Barents Observer) — “Russia’s
              ‘Derzhava’ sneaks into Norwegian waters”, 07.08.2026. Figures from
              a Norwegian Coastal Administration report.{" "}
              <a href="https://www.arctictoday.com/russias-derzhava-sneaks-into-norwegian-waters/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-31">
              The Barents Observer — “Shadow tanker sailed outside 200-mile zone
              to avoid Norwegian scrutiny”, 17.04.2026.{" "}
              <a href="https://www.thebarentsobserver.com/news/shadow-tanker-sailed-outside-200mile-zone-to-avoid-norwegian-scrutiny/448908">
                thebarentsobserver.com
              </a>
            </li>
            <li id="ref-32">
              High North News — “France Detains Russian Arctic Oil Tanker”,
              03.06.2026.{" "}
              <a href="https://en.highnorthnews.com/politics/france-detains-russian-arctic-oil-tanker/1112829">
                highnorthnews.com
              </a>
            </li>
            <li id="ref-33">
              Vsevolod Levchenko, Bellona, for ArcticToday — “Russia attempted
              to shelter a foreign shadow tanker on its Arctic territory. This
              sets a dangerous precedent”, 27.01.2026. Opinion.{" "}
              <a href="https://www.arctictoday.com/russia-attempted-to-shelter-a-foreign-shadow-tanker-on-its-arctic-territory-this-sets-a-dangerous-precedent/">
                arctictoday.com
              </a>
            </li>
            <li id="ref-34">
              Al Jazeera — “EU revises Arctic strategy as pressure from Russia,
              US grows”, 20.10.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/10/20/eu-revises-arctic-strategy-as-pressure-from-russia-us-grows">
                aljazeera.com
              </a>
            </li>
            <li id="ref-35">
              Euronews — “Why is the EU turning up the heat on the Arctic?”,
              20.10.2026.{" "}
              <a href="https://www.euronews.com/2026/10/20/why-is-the-european-union-turning-up-the-heat-on-the-arctic">
                euronews.com
              </a>
            </li>
            <li id="ref-36">
              gCaptain — “Coast Guard Awards Landmark Arctic Security Cutter
              Contracts in U.S.-Finland Partnership”, 29.12.2025.{" "}
              <a href="https://gcaptain.com/coast-guard-awards-landmark-arctic-security-cutter-contracts-in-u-s-finland-partnership/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-37">
              CNBC — “How Chinese, Russian Arctic ambitions are fueling a U.S.
              polar icebreaker mission”, 28.03.2026.{" "}
              <a href="https://www.cnbc.com/2026/03/28/china-russia-arctic-polar-icebreaker-ships.html">
                cnbc.com
              </a>
            </li>
            <li id="ref-38">
              Evan Dyer, CBC — “Canada’s icebreaker pact looked great until
              Trump started threatening the Arctic”, 27.01.2026. Analysis.{" "}
              <a href="https://www.cbc.ca/news/politics/icebreaker-pact-canada-finland-united-states-9.7061953">
                cbc.ca
              </a>
            </li>
            <li id="ref-39">
              CSIS — “China’s Nuclear Energy Priorities Under Its 15th Five-Year
              Plan”, 05.11.2026. Analysis.{" "}
              <a href="https://www.csis.org/analysis/chinas-nuclear-energy-priorities-under-its-15th-five-year-plan">
                csis.org
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
              <h2 className="section__title">More articles</h2>
              <Link href="/en/articles" className="section__more">
                Archive →
              </Link>
            </div>
            <div className="grid-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/en/articles/${a.slug}`}
                  className={`card${a.leadImage ? " card--photo" : ""}`}
                >
                  {a.leadImage && (
                    <img src={a.leadImage} alt="" className="card__media" />
                  )}
                  <span className="card__date">{formatDate(a.date, "en")}</span>
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
