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
import OdesaDanubeShift from "@/components/OdesaDanubeShift";
import RussiaWheatDrop from "@/components/RussiaWheatDrop";
import UralsVsRevenue from "@/components/UralsVsRevenue";
import FaoCerealIndex from "@/components/FaoCerealIndex";
import BlackSeaWarRisk from "@/components/BlackSeaWarRisk";

const SLUG = "donitz-periscope";

/** Search and social copy — a separate text from the dek: the dek asks a
 *  question, the description states what is inside. Title comes from the
 *  frontmatter. */
const DESCRIPTION =
  "An OSINT account of the war on merchant shipping in autumn 2026: strikes on ships in the Romanian and Bulgarian EEZs, the shadow fleet off Sochi, the Hormuz blockade, and the cost for Ukraine, Russia and the world's food and fuel markets.";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return {
    title: `${getArticleBySlug(SLUG, "en").title} — PLITKA Analytics`,
    description: DESCRIPTION,
    openGraph: { images: ["/articles/zahrozy-torhovelnomu-flotu/cover.jpg"] },
  };
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");
  const related = getAllArticles("en")
    .filter((a) => a.slug !== SLUG)
    .slice(0, 3);

  return (
    <main data-screen-label="Story · Merchant shipping">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Title, dek and reading time come from content/articles/en/donitz-periscope.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Investigation" locale="en" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/zahrozy-torhovelnomu-flotu/cover.jpg"
            alt="A rusty, half-sunken ship with a wrecked superstructure lies by a pier with cormorants perched on it; the silhouette of a warship on the horizon"
          />
        </div>
        <p className="lede">
          At around three in the morning on 6 October 2026, some 70 nautical
          miles east of the Bulgarian town of Byala, a sea drone and an aerial
          drone struck two dry cargo ships. One of them, the Togo-flagged Alfa
          Watan, went to the bottom. According to Bulgaria&apos;s Chief of
          Defence, Admiral Emil Eftimov, the crew had{" "}
          <strong>three minutes</strong> to save themselves
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Rescuers found a capsized boat, three life rafts and life jackets.
          Ten sailors were never found, and the search was called off the same
          day
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          The day before, a grain carrier, the Royad Mammadov, sank after a
          strike near the Romanian gas platform Pescăruș. Three hours before the
          strike it had left the Ukrainian Danube port of Izmail with maize for
          Ravenna in Italy
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Its captain was killed
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . On the same 6 October a Russian drone hit a Marshall Islands-flagged
          ship carrying rapeseed oil off the Odesa region, killing a steward
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . And in the evening the tanker Aframax Rio caught fire eleven
          kilometres off Sochi, and oil burned spectacularly on the open water
          in full view of holidaymakers on the promenade
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . The war on shipping in the Black Sea keeps crossing new lines and
          growing more brutal by the day.
        </p>

        <figure className="fig">
          <img
            src="/articles/zahrozy-torhovelnomu-flotu/mamadov.webp"
            alt="The blue-and-white cargo ship Royad Mammadov, IMO number 9356969 on its hull, listing heavily and settling into the water, an orange lifeboat hanging from its davit"
          />
          <figcaption>
            The Royad Mammadov going down off the Romanian coast, 5 October
            2026.
          </figcaption>
        </figure>

        <p>
          On 1 October 1946 the International Military Tribunal at Nuremberg
          found Grand Admiral Karl Dönitz guilty of violating the London
          Protocol of 1936. The protocol forbade any warship, surface or
          submarine, to sink a merchant vessel without first placing its crew in
          a place of safety, and lifeboats did not count as one
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . The tribunal wrote in its judgment that the protocol was explicit:
          if a commander cannot save the crew, he may not sink the ship and
          should allow it to pass harmless before his periscope
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . Both the United States and the Soviet Union acceded to the protocol
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          Eighty years on, the rule protected none of these ships. The ships
          that sank were sailing in the exclusive economic zones of Romania and
          Bulgaria, NATO members that are not at war, and not one of them was
          even under sanctions
          <a className="ref" href="#ref-11">
            [11]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . Three thousand kilometres to the east, in the Strait of Hormuz,
          tankers have been burning for eight months. Why does neither a flag,
          nor neutral waters, nor the country whose waters a merchant ship is
          crossing protect it today, and who will pay for the war at sea out of
          their own pocket and with an empty stomach? PLITKA Analytics
          investigates.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · The sea</span>Shipping in dangerous
          waters
        </h2>

        <p>
          The ships that carry grain, oil and fertiliser across the Black Sea
          mostly belong neither to Ukraine nor to Russia. The Alfa Watan, built
          in 1976, flew the flag of Togo and was owned by Baraka Shipping of
          Mersin in Turkey
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . The twenty-year-old Royad Mammadov flew the flag of Saint Kitts and
          Nevis, was registered to a company called MG Shipping 5 and was
          commercially managed by Spring Marine of Istanbul
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . On board the Able, the second ship hit off Byala, were eleven
          Turkish and seven Indian nationals
          <a className="ref" href="#ref-1">
            [1]
          </a>
          ; the Royad Mammadov had Azerbaijani and Indian crew
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . This is what the{" "}
          <span
            className="term"
            data-def="Ships that sail no fixed timetable and take cargo wherever there is a charter. Mostly old, under flags of convenience, with multinational crews."
          >
            tramp fleet
          </span>{" "}
          that carries world trade looks like. The ship, the flag, the owner and
          the crew belong to different states, and often none of them is a party
          to the war whose victim the ship becomes.
        </p>

        <p>
          On 16 September 2026 the{" "}
          <span
            className="term"
            data-def="A committee of the London insurance market that keeps a list of sea areas of heightened war risk. Ship insurers worldwide take their cue from it."
          >
            Joint War Committee
          </span>{" "}
          of the London insurance market extended its war-risk listed area to
          the whole of the Black Sea. Only the 12-mile territorial waters of
          Turkey, Romania, Bulgaria and Georgia were left outside it
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . Until then the area covered only the waters off Russia and Ukraine.
          Sailing through it is not prohibited, but the shipowner must notify
          the insurer and pay an additional premium, and is sometimes refused
          cover altogether
          <a className="ref" href="#ref-14">
            [14]
          </a>
          .
        </p>

        <figure className="fig">
          <BlackSeaWarRisk lang="en" />
          <figcaption>
            The Black Sea war-risk area before and after 16 September 2026, and
            the strikes of 5–6 October. Graphic by PLITKA Analytics.
          </figcaption>
        </figure>

        <p>
          By the count of the maritime security company Ambrey, in the twelve
          months to 21 September 2026 <strong>45 merchant ships</strong> were
          hit outside the old listed area, against none in the twelve months
          before. Inside the old area, in the fifth year of the war, an average
          of 28 ships a month are hit, against four a year earlier
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Ambrey explains the jump by both warring sides having set up
          industrial production of aerial and sea drones and turned them first
          of all against the enemy&apos;s trade rather than its navy. Russia
          strikes Ukraine&apos;s export corridor: the ports of Greater Odesa and
          the Danube, and ships at berth, at anchor and at sea. Since late
          November 2025 Ukraine has been attacking ships calling at Russian
          ports, above all shadow-fleet tankers, and since July 2026 dry cargo
          ships, container ships and ro-ros as well
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          Almost six times as many floating explosive objects were found outside
          Russian and Ukrainian waters in the past year, 65 against 11, and
          instead of mines it is now uncrewed boats and drone debris that drift
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . The International Maritime Organization (IMO) calls the war a
          &quot;serious and imminent threat&quot; to crews and ships in the
          Black Sea and the Sea of Azov
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          The Black Sea is not alone. The US and Israeli war with Iran, which
          began on 28 February 2026, turned the Strait of Hormuz, through which
          a fifth of the world&apos;s oil passed before the war, into a hunting
          ground
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . According to the IMO, at least twenty seafarers and port workers had
          been killed there by the end of August
          <a className="ref" href="#ref-16">
            [16]
          </a>
          . Both theatres hit the markets for grain, fertiliser and diesel, and
          the whole world market suffers badly for it
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-west">
          <span className="h2-num">§ 01 · West</span>Port Ukraine
        </h2>

        <p>
          According to the MagicPort service, in the past year the Royad
          Mammadov called at the Russian ports of Yeysk, Azov and Taman, as well
          as Istanbul and Haifa
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . The Alfa Watan visited Burgas, Sulina, Tulcea, Istanbul and Tartus
          in Syria
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . This is ordinary tramp tonnage that carries cargo for every side and
          may well take no interest in politics. On its last voyage the Royad
          Mammadov was carrying Ukrainian maize from Izmail
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . It was sailing along the Romanian coast, on a route that by every
          logic should have been safe, since under international law these
          waters belong to a NATO country
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Moscow makes no secret of hunting such ships. The day before the
          strike on the Royad Mammadov, the Russian Ministry of Defence said
          that &quot;two dry cargo vessels delivering military property to the
          port of Odesa have been hit&quot;. It did not name the ships or show
          any evidence
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . After the Alfa Watan sank, the Russian embassy in Bulgaria told
          Reuters that neither ship had been &quot;on the list of targets&quot;
          of the defence ministry and called for an investigation into whose
          drones they were
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <div className="callout callout--warn">
          <div className="callout__title">Sofia and Bucharest stay silent</div>
          <p>
            Neither of the two states in whose waters the ships sank dared to
            name the aggressor. Romania&apos;s interior ministry gave no cause
            for the fire on the Royad Mammadov
            <a className="ref" href="#ref-21">
              [21]
            </a>
            . Bulgaria&apos;s president Rumen Radev said the drones were
            &quot;clearly either Russian or Ukrainian&quot;
            <a className="ref" href="#ref-1">
              [1]
            </a>
            , and the next day conceded that the type of cargo and the
            ships&apos; direction of travel may point to Russia, although there
            is no evidence that would allow responsibility to be placed on it
            directly
            <a className="ref" href="#ref-22">
              [22]
            </a>
            . On the same evening that Zelensky spoke of a Russian attack
            established jointly with the Bulgarians
            <a className="ref" href="#ref-23">
              [23]
            </a>
            , Bulgaria&apos;s defence minister Dimitar Stoyanov was also careful
            not to say too much: &quot;Drone debris has to be found, or one of
            the sides has to claim responsibility, but that has not happened, so
            we cannot confirm whether they are Ukrainian or Russian&quot;
            <a className="ref" href="#ref-24">
              [24]
            </a>
            .
          </p>
          <p>
            Sofia&apos;s caution has a context. In June 2026 Bulgaria halted
            military aid to Ukraine, and in August, after a drone exploded near
            the Balkan Stream gas pipeline, its defence ministry said the drone
            was of a type &quot;widely used by the Ukrainian military&quot;
            <a className="ref" href="#ref-25">
              [25]
            </a>
            .
          </p>
          <p>
            The European Commission, as usual, shows more courage. Its spokesman
            Christian Wigand called the attacks on ships carrying wheat
            &quot;absolutely unacceptable&quot; and called on Russia
            specifically to &quot;stop all actions that endanger international
            shipping and the lives of seafarers&quot;. At the request of Romania
            and Bulgaria, the EU is passing satellite imagery to them
            <a className="ref" href="#ref-26">
              [26]
            </a>
            .
          </p>
        </div>

        <p>
          Syria, whose nationals went missing with the Alfa Watan, is demanding
          an independent investigation from the IMO and Bulgaria and asking why
          the search for the crew was called off without establishing their fate
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          Andrii Klymenko of the Black Sea Institute of Strategic Studies called
          the events of 5–6 October &quot;a Russian hunt for ships of Turkish
          owners&quot; and claims that the Alfa Watan and the Royad Mammadov are
          linked to the same Istanbul company, Spring Marine
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . We cannot confirm this. Spring Marine is indeed the commercial
          manager of the Royad Mammadov, but according to MagicPort the Alfa
          Watan is both owned and managed by Baraka Shipping of Mersin
          <a className="ref" href="#ref-12">
            [12]
          </a>
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/zahrozy-torhovelnomu-flotu/able-crew.webp"
            alt="Sailors in orange life jackets stepping off a border police boat onto a pier in Varna; a border guard and photographers stand nearby"
          />
          <figcaption>
            Sailors from the Able come ashore in Varna, 6 October 2026.
          </figcaption>
        </figure>

        <p>
          The strikes off Romania and Bulgaria continued a campaign Russia has
          been waging against Ukraine&apos;s maritime corridor since early
          summer. In July 2026 alone it attacked port facilities 67 times, ships
          at berth 35 times and ships in the corridor another 22 times
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . On 13 July five foreign sailors were killed off Chornomorsk aboard a
          Togo-flagged ship carrying fertiliser, and on 17 and 18 July four more
          in the ports of Mykolaiv and Odesa
          <a className="ref" href="#ref-29">
            [29]
          </a>
          .
        </p>

        <p>
          On 19 July three cruise missiles hit the Guinea-Bissau-flagged bulk
          carrier Golden Leo as it was leaving Greater Odesa with maize. Ten
          people were killed, among them a Ukrainian pilot
          <a className="ref" href="#ref-29">
            [29]
          </a>
          . Ukraine&apos;s Seaports Authority called this strike one of the
          events that changed how shipowners and insurers see the risk of
          calling at Odesa. On 22 July not a single ship entered the ports of
          Greater Odesa, for the first time since the corridor opened. In all of
          July 169 ships called there, and in the first eleven days of August
          just seven
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <p>
          Cargo went where it could still be loaded: to the Danube. By
          Ambrey&apos;s count, the Danube ports&apos; share of cargo handled by
          Ukrainian ports rose from about 10% in the first half of the year to
          74% in August. The Greater Odesa cluster fell from 7.9 million tonnes
          in April to 430,000 tonnes in August, while the Danube almost doubled
          in a month, to 1.24 million tonnes. Ship calls at the Danube ports
          rose from 363 to 737
          <a className="ref" href="#ref-31">
            [31]
          </a>
          .
        </p>

        <figure className="fig">
          <OdesaDanubeShift lang="en" />
          <figcaption>
            Cargo handled by Greater Odesa and the Danube ports before and after
            the summer strikes. Graphic by PLITKA Analytics based on data from
            Ukraine&apos;s Ministry for Development and Ambrey.
          </figcaption>
        </figure>

        <p>
          The strikes followed the cargo to the Danube. In July–September there
          were 3.7 times as many incidents a month near Izmail, Reni and Kiliia
          as in the first half of the year. Since July Ambrey has counted at
          least nine ships hit on the approaches to the Danube, five of them in
          Romanian waters
          <a className="ref" href="#ref-31">
            [31]
          </a>
          . The company put it this way: &quot;The Danube is no longer simply an
          alternative route. It is now part of the contested front line of
          Ukraine&apos;s maritime trade. Where the volumes go, the strikes
          follow, from the berth to the open sea&quot;
          <a className="ref" href="#ref-31">
            [31]
          </a>
          .
        </p>

        <p>
          The Danube cannot bear such a load. In July, during a record drought,
          the river&apos;s flow on the Romanian stretch fell to 1,700 cubic
          metres a second against the usual 4,700, the lowest since 1996, and
          barges stood idle
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . At the end of August some 80 ships were waiting to enter the Danube
          <a className="ref" href="#ref-32">
            [32]
          </a>
          , and on 5 October up to 125 ships were queuing off Sulina, with waits
          of 14–17 days. Ambrey notes that the queue gathers ships at
          predictable points within drone range
          <a className="ref" href="#ref-31">
            [31]
          </a>
          .
        </p>

        <p>
          Lorries to Izmail and Reni take the Odesa–Reni highway across the
          bridge over the Dniester near Maiaky. It is the last Ukrainian bridge
          over the Dniester in the Odesa region, since the bridge at Zatoka has
          long been impassable after hundreds of strikes
          <a className="ref" href="#ref-33">
            [33]
          </a>
          . Russia first struck it in December 2025; traffic to the west of the
          region then stopped, and Ukraine and Moldova agreed on detours through
          Moldovan territory
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . In August 2026 analysts at the Institute for the Study of War
          noticed that Russia was shifting its strikes from seaports to the
          overland routes of the Odesa region in order to disrupt grain exports,
          and that the Maiaky bridge was under threat
          <a className="ref" href="#ref-35">
            [35]
          </a>
          .
        </p>

        <p>
          On 5 October a ricocheting shell hit a scheduled bus near the
          Palanca–Maiaky–Udobne border crossing, and the crossing was closed
          <a className="ref" href="#ref-36">
            [36]
          </a>
          . Moldova is building drone shelters at its border crossings and
          pulling its border guards out of the joint Palanca and Criva
          checkpoints onto its own territory
          <a className="ref" href="#ref-37">
            [37]
          </a>
          . On 9 October Ukraine&apos;s Air Force twice warned of jet-powered
          drones heading for Maiaky
          <a className="ref" href="#ref-38">
            [38]
          </a>
          <a className="ref" href="#ref-39">
            [39]
          </a>
          . On 7 and 9 October the pro-Russian Telegram channel Voenny
          Osvedomitel published videos of jet-powered Geran-4 drones hitting
          columns of Ukrainian lorries on the highway near Maiaky. By its
          account, the 9 October strike hit lorries stuck in a jam after yet
          another strike on the bridge
          <a className="ref" href="#ref-40">
            [40]
          </a>
          <a className="ref" href="#ref-41">
            [41]
          </a>
          .
        </p>

        <p>
          Those who still call at Odesa keep coming under fire. On 17 September
          a Russian drone killed the captain of a Tanzania-flagged ship bound
          for a Ukrainian port, and on 3 October a sailor from a Liberia-flagged
          ship was killed in a port of the Odesa region
          <a className="ref" href="#ref-42">
            [42]
          </a>
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          In this way Russia is deliberately demonstrating that the old rules of
          naval warfare no longer apply, nor do the old routes, that it will
          strike any ship, even in the waters of neutral countries, and that if
          it happens to hit a ship that had nothing to do with Ukraine, nothing
          much will change. The Black Sea countries, for their part, have
          confirmed that they are not prepared to deter such a threat. They find
          it easier to stand aside from potential confrontation. Appeasing the
          enemy opens the way to deeper terror.
        </p>

        <p>
          The National Bank of Ukraine calls what began on 23 July a new phase
          of the maritime blockade. In recent years Ukraine exported an average
          of 4–4.5 million tonnes of agricultural produce a month, about 90% of
          it by sea. Alternative routes, by the NBU&apos;s estimate, can handle
          about 2.5 million tonnes in August–October. The bank puts the direct
          loss of export revenue in the second half of 2026 at more than $2
          billion, and the contribution of the attacks, above all the
          destruction of logistics and the blocking of seaports, to GDP growth
          at minus 0.9 percentage points
          <a className="ref" href="#ref-43">
            [43]
          </a>
          . Market estimates are harsher: each day the Black Sea ports stand
          idle costs Ukraine about $70 million in export earnings, and the
          foreign trade deficit reached $28.3 billion in the first half of the
          year alone
          <a className="ref" href="#ref-44">
            [44]
          </a>
          .
        </p>

        <p>
          Farmers pay first, because the price they get equals the world price
          minus delivery. As soon as grain is forced onto a more expensive
          route, the difference comes off the purchase price. Between 16 July
          and 6 August class-2 wheat in central Ukraine fell 31% in price, from
          9,200 to 6,400 hryvnias a tonne, barley 27% and maize 15%. By the
          estimate of the Ukrainian Agribusiness Club, wheat is already selling
          about $15 a tonne below production cost, barley by more than $40
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . Bypass routes cost at least $50 a tonne more than the sea route
          <a className="ref" href="#ref-32">
            [32]
          </a>
          . NIBULON counts $70 of additional costs, of which higher world prices
          offset only $15–20
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . Agriculture minister Taras Vysotskyi puts the extra logistics burden
          at almost $3 billion, money neither farmers nor the state have, and
          expects less to be sown for the 2027 harvest, above all winter wheat
          <a className="ref" href="#ref-32">
            [32]
          </a>
          .
        </p>

        <p>
          The All-Ukrainian Agrarian Council and the government estimate the
          surplus of grain building up in the country because of the port
          shutdown at roughly 30–35 million tonnes
          <a className="ref" href="#ref-44">
            [44]
          </a>
          <a className="ref" href="#ref-45">
            [45]
          </a>
          . As early as the beginning of September the council advised exporters
          to plan on the deep-water ports staying shut until December or January
          <a className="ref" href="#ref-32">
            [32]
          </a>
          . The neighbours are in no hurry to help: Romania and Poland have
          refused Kyiv additional transit. &quot;The interests of our own
          farmers remain the priority,&quot; explained Romania&apos;s
          agriculture minister Barna Tánczos
          <a className="ref" href="#ref-45">
            [45]
          </a>
          .
        </p>

        <p>
          According to the Ukroliyaprom association, Ukraine is shipping about
          300,000 tonnes of sunflower oil a month, half the usual amount
          <a className="ref" href="#ref-46">
            [46]
          </a>
          . Agricultural produce and metals together make up 70% of all
          Ukrainian exports, and most of it went by sea
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . For those who still dare to make the voyage, insurance is getting
          more expensive. At the end of August the additional war-risk premium
          for calls at Greater Odesa and the Danube was 1–1.25% of the
          ship&apos;s value, while earlier the figures had been up to 0.75% for
          Odesa and 0.3–0.5% for the Danube
          <a className="ref" href="#ref-47">
            [47]
          </a>
          . In October Ambrey reported that many insurers are refusing to cover
          calls at Ukrainian ports at all
          <a className="ref" href="#ref-31">
            [31]
          </a>
          .
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-east">
          <span className="h2-num">§ 02 · East</span>Port Russia
        </h2>

        <p>
          The Aframax Rio was under the sanctions of only one country: Ukraine.
          The National Security and Defence Council added it to its list on 12
          February 2026 together with another 90 shadow-fleet vessels. According
          to the council, the tanker belongs to Rio Enterprises, registered in
          the Marshall Islands, and was chartered through the Singapore operator
          Navig8 and Greek managers. In 2024–2026 it repeatedly carried oil from
          Ust-Luga, Novorossiysk and Taman to India, Singapore and Saudi Arabia
          <a className="ref" href="#ref-48">
            [48]
          </a>
          .
        </p>

        <p>
          In its last weeks before the strike the tanker pretended to be heading
          for Romania. Its AIS destination was set to Constanța
          <a className="ref" href="#ref-48">
            [48]
          </a>
          , but Constanța does not appear among its port calls over the past
          year as shown by MagicPort. Tuzla, Samsun, Çanakkale, Suez and Port
          Said do
          <a className="ref" href="#ref-49">
            [49]
          </a>
          . It caught fire 11 kilometres from Sochi, in Russian territorial
          waters
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . All 23 crew members, Indian nationals, were rescued
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . The next day Zelensky reported a strike in the Black Sea without
          naming the target
          <a className="ref" href="#ref-50">
            [50]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/zahrozy-torhovelnomu-flotu/sochi.webp"
            alt="A huge cloud of black smoke rises over the sea against the sunset, a strip of flame at the waterline; in the foreground the shore and a yellow flag on the beach"
          />
          <figcaption>
            The Aframax Rio on fire off Sochi, 6 October 2026. View from the
            shore.
          </figcaption>
        </figure>

        <p>
          The Russian authorities called the attack terrorism
          <a className="ref" href="#ref-51">
            [51]
          </a>
          . Within a day of oil burning openly on the water, the transport
          ministry declared that there was no pollution of the sea. The clean-up
          is being handled by a joint task force of the transport ministry, the
          emergencies ministry, Krasnodar region and the defence ministry
          <a className="ref" href="#ref-52">
            [52]
          </a>
          . Greenpeace warns of &quot;unprecedented pollution of the Black
          Sea&quot;, larger than the two previous major spills in the region
          <a className="ref" href="#ref-51">
            [51]
          </a>
          . According to Greenpeace&apos;s analysis of satellite imagery, by 8
          October the slick behind the tanker had grown to about 25 km², and the
          Aframax Rio itself had been towed north-west past Tuapse
          <a className="ref" href="#ref-53">
            [53]
          </a>
          . The organisation believes that what burned was most likely the
          ship&apos;s own bunker fuel, and bluntly calls the Russian
          authorities&apos; claims that there was no pollution untrue
          <a className="ref" href="#ref-54">
            [54]
          </a>
          .
        </p>

        <figure className="fig fig--bleed fig--pair">
          <div className="fig__row">
            <img
              src="/articles/zahrozy-torhovelnomu-flotu/greenpeace-0710.webp"
              alt="Satellite image of 7 October 2026: the tanker Aframax Rio in open sea with an oil film of about 8 km² beside it; on the right its outline is hatched"
            />
            <img
              src="/articles/zahrozy-torhovelnomu-flotu/greenpeace-0810.webp"
              alt="Satellite image of 8 October 2026: a long narrow strip of oil film of about 25 km² trails the tanker under tow; on the right its outline is hatched"
            />
          </div>
          <figcaption>
            The slick behind the Aframax Rio on 7 and 8 October. Images by
            Planet Labs, processed by Greenpeace.
          </figcaption>
        </figure>

        <p>
          The Aframax Rio became another bright point in the campaign Ukraine
          has been waging against Russian seaborne exports since the end of
          2025. Strikes attributed to Ukraine now land on average 58 nautical
          miles from shore, off Turkey&apos;s northern coast and in open sea
          south of Novorossiysk and Sochi
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . On 10 July 18 Russian vessels, 13 of them tankers, were hit in the
          Sea of Azov in a single night, and 35 within 96 hours. On 15 July
          drones hit up to 20 vessels in the Black Sea in one night, among them
          17 tankers and 2 gas carriers
          <a className="ref" href="#ref-29">
            [29]
          </a>
          . On that same 10 July Russia restricted shipping in the Sea of Azov
          <a className="ref" href="#ref-55">
            [55]
          </a>
          .
        </p>

        <p>
          Since 21 July the Sheskharis terminal in Novorossiysk has not loaded a
          single tanker. In the first seven months of the year it shipped about
          650,000 barrels of oil a day, roughly a fifth of Russia&apos;s
          seaborne exports. Drones also forced the neighbouring Caspian Pipeline
          Consortium terminal, which handles about 80% of Kazakhstan&apos;s oil,
          to stop, and Kazakhstan began cutting output. The Russian authorities
          warned all ships in Russia&apos;s Black Sea economic zone that the
          area was dangerous
          <a className="ref" href="#ref-56">
            [56]
          </a>
          . On 12–13 August all three grain terminals in Novorossiysk, KSK, NZT
          and NKHP, stopped work: 24.6 million tonnes a year between them, about
          75% of Russia&apos;s Black Sea grain capacity
          <a className="ref" href="#ref-55">
            [55]
          </a>
          .
        </p>

        <div className="aside-note">
          <p>
            In the north, where the threat is of a different kind, namely the
            detention of ships, Russia responds with naval convoys. In the Black
            Sea it cannot do that. Only recently the large anti-submarine ship
            Admiral Levchenko and the frigate Neustrashimy escorted the
            sanctioned cargo ships General Skobelev and Sparta through the North
            Sea and the English Channel, while the Royal Navy shadowed them
            <a className="ref" href="#ref-57">
              [57]
            </a>
            . The First Sea Lord, General Sir Gwyn Jenkins, explains this by
            saying that after the British seized the sanctioned tanker Smyrtos
            in June, shadow-fleet ships have been forced to change routes, and
            Moscow is diverting warships to guard cargoes
            <a className="ref" href="#ref-57">
              [57]
            </a>
            . Retaliatory provocations followed: in the Baltic on 30 September
            FSB border guards detained for several hours the Cypriot cargo ship
            Västerbotten, which was sailing from Sweden to Sillamäe in Estonia
            <a className="ref" href="#ref-58">
              [58]
            </a>
            .
          </p>
        </div>

        <p>
          Grain is getting stuck in Russia just as it is in Ukraine. According
          to the Russian Grain Union, in the middle ten days of September the
          country exported 347,000 tonnes of wheat against 1.3 million a year
          earlier, and only 72,500 tonnes went through Novorossiysk, 9.6 times
          less. Wheat buyers fell from 29 countries to eight, Egypt took 3.6
          times less, and Turkey only 6,100 tonnes against more than 200,000 a
          year earlier. For the whole of September the union forecasts no more
          than a million tonnes against 5.7 million a year earlier, and
          shipments increasingly go through the Baltic ports of Vysotsk and
          Ust-Luga
          <a className="ref" href="#ref-59">
            [59]
          </a>
          . Analysts at SovEcon estimate the fall in July–September at half, and
          the Baltic ports can replace less than a tenth of the usual southern
          volumes
          <a className="ref" href="#ref-60">
            [60]
          </a>
          .
        </p>

        <figure className="fig">
          <RussiaWheatDrop lang="en" />
          <figcaption>
            Russian wheat exports in autumn 2026 as a percentage of 2025.
            Graphic by PLITKA Analytics based on data from the Russian Grain
            Union and SovEcon.
          </figcaption>
        </figure>

        <p>
          Kuban, Russia&apos;s main grain region, has declared a state of
          emergency. &quot;We have harvested a large grain crop, but we have run
          into a problem selling it because of restrictions on the ports,&quot;
          the governor explained. At federal level export duties have been
          scrapped, a moratorium on farm bankruptcies introduced, and subsidies
          for sowing winter crops are being prepared
          <a className="ref" href="#ref-61">
            [61]
          </a>
          . A 20,000-tonne shipment of Russian sunflower oil for India was
          cancelled because the supplier could not load it, and another 60,000
          tonnes or so were delayed
          <a className="ref" href="#ref-46">
            [46]
          </a>
          .
        </p>

        <p>
          On 24 September exports of diesel and gasoil through the Black Sea
          fell to zero for the first time on record, and all of Russia&apos;s
          seaborne diesel exports went only from the Baltic port of Primorsk
          <a className="ref" href="#ref-62">
            [62]
          </a>
          . Crude oil is a different story. In September, according to market
          sources, loadings from Novorossiysk recovered to about 650,000 barrels
          a day
          <a className="ref" href="#ref-63">
            [63]
          </a>
          . Meanwhile weekly revenue from seaborne oil exports, according to
          Bloomberg, reached its highest since the start of the full-scale
          invasion
          <a className="ref" href="#ref-62">
            [62]
          </a>
          .
        </p>

        <p>
          The war in the Persian Gulf doubled the price of Urals crude, from
          about $45 a barrel to more than $92. Yet the federal budget&apos;s oil
          and gas revenue for the first nine months of 2026 fell by 17%,
          production is falling, the government has cut its output forecast to a
          17-year low, and refineries remain under attack
          <a className="ref" href="#ref-64">
            [64]
          </a>
          . In September revenue was down 22% year on year, and the entire gain
          in mineral extraction tax was eaten up by compensation payments to
          refiners
          <a className="ref" href="#ref-65">
            [65]
          </a>
          . The finance ministry has cut its estimate of oil and gas revenue for
          2026 from 8.9 to 7.6 trillion roubles
          <a className="ref" href="#ref-66">
            [66]
          </a>
          .
        </p>

        <figure className="fig">
          <UralsVsRevenue lang="en" />
          <figcaption>
            The Urals price and Russia&apos;s budget revenue from oil and gas in
            2026. Graphic by PLITKA Analytics based on data from Reuters and the
            Russian finance ministry.
          </figcaption>
        </figure>

        {/* ===================== § 03 ===================== */}
        <h2 id="sec-world">
          <span className="h2-num">§ 03 · World</span>Other seas
        </h2>

        <p>
          Before the war about 125 large commercial ships passed through the
          Strait of Hormuz every day
          <a className="ref" href="#ref-67">
            [67]
          </a>
          . After 28 February Iran effectively closed the strait, and since 13
          April the US has been blockading Iranian ports. Formally the blockade
          does not affect transit to non-Iranian ports, but ships heading to or
          from Iran are turned back or disabled by US forces
          <a className="ref" href="#ref-68">
            [68]
          </a>
          . On 5 October US Central Command summed up twelve weeks of the
          blockade: 130 ships stopped, three disabled, 13 commercial vessels
          destroyed
          <a className="ref" href="#ref-68">
            [68]
          </a>
          .
        </p>

        <p>
          On 5 September, after Iran&apos;s Islamic Revolutionary Guard Corps
          fired ballistic missiles at a US aircraft carrier and destroyer, the
          US struck three Iranian tankers. Two were disabled; the third, the
          empty Kylo, was destroyed and sank in the Gulf of Oman
          <a className="ref" href="#ref-69">
            [69]
          </a>
          . Before the strike on the Stark 1, a US aircraft came on the
          emergency channel: &quot;Tanker STARK 1, this is the United States
          military aircraft. I am preparing to fire at your stern. You have 10
          minutes to clear the crew from the stern of your ship.&quot; Then came
          the final warning: get into the lifeboats and abandon ship
          <a className="ref" href="#ref-70">
            [70]
          </a>
          . On 8 and 9 September the US destroyed five more tankers, each time
          ordering the crews to abandon ship before the strike
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . &quot;If Iran shoots at U.S. ships, we will destroy (and sink) their
          oil tankers,&quot; explained Pete Hegseth, head of the Pentagon
          <a className="ref" href="#ref-70">
            [70]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/zahrozy-torhovelnomu-flotu/kylo.webp"
            alt="A night-time thermal image from above: the hull of a tanker marked M/T KYLO going under, an UNCLASSIFIED marking at the top of the frame"
          />
          <figcaption>
            The tanker Kylo sinking in the Gulf of Oman, 5 September 2026. Still
            from CENTCOM video.
          </figcaption>
        </figure>

        <p>
          In June the US blockade killed seafarers for the first time. An
          aircraft hit the engine room of the Palau-flagged tanker Settebello
          because, according to Central Command, the crew was not following
          instructions. Three Indian nationals were killed. India summoned the
          US deputy ambassador and lodged a strong protest
          <a className="ref" href="#ref-71">
            [71]
          </a>
          .
        </p>

        <p>
          Attacks, naturally, come from the Iranian side too. On 2–3 October
          four such attacks were confirmed off the Omani coast; in one case a
          drone flew into a ship&apos;s funnel and fell into the engine room.
          Separately, the Revolutionary Guard ordered a tanker 11 miles north of
          Khasab by radio to turn back or be attacked, and the master complied
          <a className="ref" href="#ref-72">
            [72]
          </a>
          . In the first six days of October nine tankers were attacked in
          Hormuz, as many as in the whole first half of September
          <a className="ref" href="#ref-67">
            [67]
          </a>
          .
        </p>

        <p>
          On the evening of 7 October several projectiles hit a tanker 51 miles
          north of Madinat ash Shamal in Qatar. There were casualties, but UKMTO
          did not report how many, nor the name of the ship or the origin of the
          projectiles
          <a className="ref" href="#ref-73">
            [73]
          </a>
          . It was the first strike in the Persian Gulf outside Hormuz, 54
          kilometres from Ras Laffan, Qatar&apos;s main gas terminal. No one
          claimed responsibility
          <a className="ref" href="#ref-74">
            [74]
          </a>
          . It happened in Qatar&apos;s exclusive economic zone, and Doha, like
          Sofia and Bucharest a week earlier, chose not to comment
          <a className="ref" href="#ref-67">
            [67]
          </a>
          .
        </p>

        <p>
          About 20,000 seafarers remain in the region, some of them on ships
          that cannot leave the Persian Gulf. An IMO plan to evacuate six
          thousand of them has been suspended
          <a className="ref" href="#ref-75">
            [75]
          </a>
          . By the end of August the International Maritime Organization had
          confirmed 68 attacks in the region, on average one every 2.6 days.
          Half of them involved tankers, most often under the flags of Liberia,
          Panama and the Marshall Islands
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          The International Energy Agency estimates that in August more than 10
          million barrels a day of production was shut in across the Persian
          Gulf. In February the Gulf and Russia together still accounted for
          almost 45% of world seaborne trade in diesel; in August their net
          exports were 1.6 million barrels a day lower. The agency ties these
          losses directly to Ukrainian strikes on Russian refineries and the
          near-complete halt of Russian product exports. In early September
          diesel in the US cost more than $200 a barrel, 94% more than before
          the war
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <p>
          In Yemen, on the coast of the Red Sea, another key shipping corridor,
          the situation is not stable either. Yemeni government forces backed by
          Saudi Arabia are fighting the Houthis for Mocha and the coast of the
          Bab el-Mandeb, and the Houthis answer with missiles at Saudi airports.
          As for ships, the Houthis say they act only against those linked to
          Saudi Arabia
          <a className="ref" href="#ref-76">
            [76]
          </a>
          . On 4 October a series of explosions went off near the tanker
          Chrystal Sky 60 miles south of Mocha, one of them a hundred metres
          from its side
          <a className="ref" href="#ref-77">
            [77]
          </a>
          . On 7 October a small boat fired on a Chinese container ship in the
          northern Bab el-Mandeb. The crew was unharmed; who fired is unknown
          <a className="ref" href="#ref-76">
            [76]
          </a>
          .
        </p>

        <div className="aside-note">
          <p>
            The Caribbean offers the most direct example of how declaring an
            &quot;armed conflict&quot; strips a civilian boat of any protection.
            Since September 2025 the US military has carried out at least 70
            strikes on boats the Trump administration calls narco-terrorists,
            killing at least 235 people. The latest strike, on 4 October, killed
            four. The military offers no evidence that the boats were carrying
            drugs, and more often than not there is none
            <a className="ref" href="#ref-78">
              [78]
            </a>
            .
          </p>
        </div>

        {/* ===================== § 04 ===================== */}
        <h2 id="sec-law">
          <span className="h2-num">§ 04 · Law</span>Nobody&apos;s ships
        </h2>

        <p>
          The Alfa Watan flew the flag of Togo, belonged to a Turkish company,
          probably had a Syrian crew
          <a className="ref" href="#ref-20">
            [20]
          </a>{" "}
          and sank in Bulgaria&apos;s economic zone. None of these four states
          is obliged to protect it. An exclusive economic zone is not a
          state&apos;s territory. A coastal state&apos;s sovereignty extends
          only to its 12-mile territorial waters and the airspace above them; in
          the economic zone it has rights to resources but cannot forbid a
          foreign warship or drone from entering. Even an aerial drone over the
          Bulgarian economic zone does not formally violate Bulgarian airspace
          <a className="ref" href="#ref-79">
            [79]
          </a>
          .
        </p>

        <p>
          That is why Radev ruled out consultations under Article 4 of the North
          Atlantic Treaty, let alone Article 5. In his words, although this is
          Bulgaria&apos;s economic zone, the waters are considered neutral
          <a className="ref" href="#ref-80">
            [80]
          </a>
          . Article 6 of the treaty defines where an attack on allied ships
          counts as an attack on the Alliance, and the Black Sea is not among
          those places. Togo and Palau, whose flags the Alfa Watan and the Able
          flew, are not parties to the Rome Statute, so even the International
          Criminal Court has no obvious jurisdiction here
          <a className="ref" href="#ref-79">
            [79]
          </a>
          . Back in 2003 the International Court of Justice, ruling on the
          attacks on tankers in the Persian Gulf, found that a strike on a ship
          not flying the US flag cannot be treated as an attack on the United
          States
          <a className="ref" href="#ref-79">
            [79]
          </a>
          .
        </p>

        <p>
          The law that ought to protect precisely these ships exists, but it has
          never worked. Privateering, the licensing of private ships to plunder
          the enemy&apos;s merchant vessels, was abolished by the Paris
          Declaration of 1856, signed after the Crimean War, a war for the Black
          Sea
          <a className="ref" href="#ref-81">
            [81]
          </a>
          . Among the seven states that adopted it were Russia and Turkey
          <a className="ref" href="#ref-82">
            [82]
          </a>
          . Besides the United States and the Soviet Union, the London Protocol
          of 1936 was joined by Turkey, Bulgaria and Iran, that is, by almost
          every state in whose waters or by whose forces ships are being sunk
          today
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          At Nuremberg Dönitz was never sentenced for breaching the protocol.
          The grounds were an order of the British Admiralty of 8 May 1940 to
          sink without warning all ships in the Skagerrak. The second ground was
          the written answers of Admiral Chester Nimitz that the US had waged
          unrestricted submarine warfare in the Pacific from the first day of
          the war
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . The rule was written down, but even the victors did not dare to
          punish its breach.
        </p>

        <p>
          As in the old days, protection appears only where there is a naval
          convoy. In Hormuz, oil from the Persian Gulf is partly saved by US
          naval escorts
          <a className="ref" href="#ref-17">
            [17]
          </a>
          ; in the Red Sea ships are escorted by the EU&apos;s Aspides mission
          <a className="ref" href="#ref-76">
            [76]
          </a>
          ; in the English Channel the Royal Navy shadows the Russian warships
          escorting the shadow fleet
          <a className="ref" href="#ref-57">
            [57]
          </a>
          . In the Black Sea there are no convoys.
        </p>

        <p>
          The bulk carrier Emil shows what happens to a ship that nobody
          protects. A Russian drone hit it on 5 August about 21 miles off
          Greater Odesa, and the crew abandoned ship. For two months the
          292-metre bulker drifted across the sea with no one aboard, and on 4
          October it turned up in Bulgaria&apos;s economic zone, 40 miles from
          Cape Shabla. No one is taking on its salvage; the Bulgarian navy
          merely monitors its drift
          <a className="ref" href="#ref-83">
            [83]
          </a>
          .
        </p>

        <p>
          Andrii Klymenko believes the attacks could have been prevented only by
          joint patrols by Turkey, Bulgaria and Romania beyond their 12-mile
          zones
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . But the NATO members Bulgaria, Romania and Turkey have only a joint
          mine countermeasures group
          <a className="ref" href="#ref-84">
            [84]
          </a>
          . On 7 October Bulgaria&apos;s Consultative Council for National
          Security recommended putting Black Sea security on the agenda of the
          European Council on 15–16 October and creating an EU mechanism for
          freedom of navigation with satellite monitoring and compensation for
          losses. The Romanian MEP Dan Barna proposes taking Operation Aspides
          as the model, but with the combined navies of Romania and Bulgaria,
          funded by the EU
          <a className="ref" href="#ref-85">
            [85]
          </a>
          .
        </p>

        <p>
          The EU High Representative Kaja Kallas has called for a moratorium on
          attacks in the Black Sea, and Turkey and the UN are preparing talks on
          a maritime ceasefire
          <a className="ref" href="#ref-86">
            [86]
          </a>
          . On 7 October Recep Tayyip Erdoğan discussed shipping safety with
          Vladimir Putin
          <a className="ref" href="#ref-87">
            [87]
          </a>
          . India has proposed a three-part ceasefire, one part of which
          concerns commercial shipping specifically, and the Ukrainian side
          called it the most comprehensive it has received
          <a className="ref" href="#ref-88">
            [88]
          </a>
          . Back in August Ukraine proposed through an intermediary that both
          sides stop striking civilian targets in the Black Sea, but received no
          answer
          <a className="ref" href="#ref-55">
            [55]
          </a>
          , and Moscow had already rejected a similar proposal from Kyiv before
          <a className="ref" href="#ref-86">
            [86]
          </a>
          . On 9 October US and Ukrainian delegations in Miami were due to
          discuss, among other things, a possible partial ceasefire covering
          strikes on energy and grain shipments
          <a className="ref" href="#ref-89">
            [89]
          </a>
          . According to US and Ukrainian officials, Moscow is prepared to
          discuss an energy ceasefire only in exchange for the lifting of US
          sanctions, and links it to a ceasefire in the Black Sea. Publicly,
          Kremlin spokesman Dmitry Peskov says Russia sees no sense in sectoral
          ceasefires
          <a className="ref" href="#ref-90">
            [90]
          </a>
          . Ukraine is unlikely to accept such terms.
        </p>

        <p>
          Despite all the statements, appeals and expressions of concern, the
          war on merchant ships is only growing crueller and wider. No country,
          union or force has managed to offer an effective solution. It looks as
          though ships will go on dying off the shores of the Black Sea, the Red
          Sea and other seas.
        </p>

        {/* ===================== § 05 ===================== */}
        <h2 id="sec-cost">
          <span className="h2-num">§ 05 · The cost</span>Who pays for losses at
          sea
        </h2>

        <p>
          Russia and Ukraine together account for 27.3% of world wheat exports
          <a className="ref" href="#ref-91">
            [91]
          </a>
          . SovEcon estimates that in July–September 2026 the two countries
          together will export roughly half of last year&apos;s wheat volume
          <a className="ref" href="#ref-91">
            [91]
          </a>
          . The FAO Food Price Index rose to 136 points in September, 5.8%
          higher than a year earlier. The cereal index rose 17.2% over the year,
          and wheat rose 6.3% in a month to its highest since August 2023. FAO
          links this primarily to logistical constraints in the Black Sea
          region, which are pushing importers to switch to other suppliers
          <a className="ref" href="#ref-92">
            [92]
          </a>
          . &quot;We are seeing a persistent and increasingly broad-based build
          up in global commodity prices, as disruptions in the Strait of Hormuz
          and the Black Sea combine with climate shocks,&quot; says FAO chief
          economist Maximo Torero. &quot;If sustained, these pressures will soon
          pass through to consumer food prices, especially in food and energy
          import-dependent countries&quot;
          <a className="ref" href="#ref-93">
            [93]
          </a>
          .
        </p>

        <figure className="fig">
          <FaoCerealIndex lang="en" />
          <figcaption>
            The FAO Cereal Price Index in 2025–2026. Graphic by PLITKA Analytics
            based on FAO data.
          </figcaption>
        </figure>

        <p>
          There is no less grain in the world. FAO forecasts that the 2026 world
          cereal harvest will be the second largest on record
          <a className="ref" href="#ref-93">
            [93]
          </a>
          . The grain is stuck where it was grown: Ukrainian farmers sell their
          crop well below production cost, while importers, on the contrary, pay
          more because they compete for access to a commodity that has slipped
          out of reach
          <a className="ref" href="#ref-32">
            [32]
          </a>
          . Sunflower oil in the FAO index has been getting cheaper for the
          third month in a row precisely because there is plenty of it in the
          Black Sea region
          <a className="ref" href="#ref-92">
            [92]
          </a>
          , while India is short of it. The country needs about 250,000 tonnes a
          month, and in October only 160,000 may arrive. Indian buyers bought
          150,000 tonnes of palm oil as a substitute within three days
          <a className="ref" href="#ref-46">
            [46]
          </a>
          .
        </p>

        <p>
          The country most dependent on the Black Sea is Egypt, one of the
          world&apos;s largest wheat buyers. It imports about 12.5 million
          tonnes a year, 62% of its consumption, and its subsidised bread
          programme alone needs 8.6 million tonnes of grain
          <a className="ref" href="#ref-94">
            [94]
          </a>
          . In the first half of 2026 Russia and Ukraine supplied about 80% of
          Egypt&apos;s imported wheat. In September imports fell by 77%. The
          price per tonne rose from about $245 in early July to $320
          <a className="ref" href="#ref-94">
            [94]
          </a>
          . Some of Egypt&apos;s wheat went through the Russian port of Kavkaz
          in the Kerch Strait, where it was transshipped onto larger vessels,
          but after the shipping restrictions the port closed altogether
          <a className="ref" href="#ref-95">
            [95]
          </a>
          .
        </p>

        <p>
          &quot;The shock in supply we are seeing now is far bigger than the one
          we saw at the start of the war between Russia and Ukraine in February
          2022,&quot; Andrey Sizov, head of the analytics firm SovEcon, says of
          the African market. Food inflation exceeds 20% in Nigeria and 15% in
          Ethiopia, and reaches 9% in Kenya
          <a className="ref" href="#ref-96">
            [96]
          </a>
          . Yevgeniy Karabanov of the Grain Union of Kazakhstan estimates that
          Russia and Ukraine together may fail to deliver 30–40 million tonnes
          of grain to the world market, which would push world food prices up by
          15–20%
          <a className="ref" href="#ref-55">
            [55]
          </a>
          .
        </p>

        <p>
          Hormuz, in turn, is hitting next year&apos;s harvest too. Up to 30% of
          world fertiliser trade passed through the strait, including 30–35% of
          urea exports, and after its closure 3–4 million tonnes of fertiliser
          got stuck there. Unlike oil, the world has no strategic fertiliser
          reserves
          <a className="ref" href="#ref-97">
            [97]
          </a>
          . According to the World Bank, urea rose in price by more than 80% in
          February–April, and on average fertilisers will be 31% more expensive
          in 2026
          <a className="ref" href="#ref-98">
            [98]
          </a>
          . FAO warns that the shortage of fertiliser and costlier energy
          threaten crop yields worldwide
          <a className="ref" href="#ref-97">
            [97]
          </a>
          .
        </p>

        <p>
          As early as March the World Food Programme warned that the war with
          Iran could push up to 45 million more people into acute hunger. In
          total their number could reach 363 million. That is more than after
          Russia&apos;s invasion of Ukraine in 2022
          <a className="ref" href="#ref-99">
            [99]
          </a>
          . In Sudan, according to WFP, about 20 million people are already in
          acute hunger, and staple foods have risen in price by almost 40% in
          seven months
          <a className="ref" href="#ref-91">
            [91]
          </a>
          .
        </p>

        {/* ===================== EPILOGUE ===================== */}
        <hr className="section-break" />

        <p>
          The world of shipping has changed, and it will never again be as safe
          as it was. A year ago the war at sea still had clear rules, and
          international shipping enjoyed a certain sovereignty. Now ships sink
          in the economic zones of NATO countries, random tankers burn in the
          world&apos;s most important trade arteries, and a boat in the
          Caribbean can be sunk because of a simple mix-up by men in uniform.
          Just like in the golden age of piracy.
        </p>

        <p>
          What kept the merchant fleet safe was not warships but international
          rules. For a long time a merchant ship was believed to enjoy the
          protection of international institutions, and a neutral flag in
          neutral waters was thought to count for something. World trade
          flourished and grew for decades, troubled only by piracy off poor
          countries, which was seen as an anomaly. This autumn those rules
          vanished, and the reaction of the victim states and of the guarantors
          of the world order makes it clear that no one intends to restore them.
        </p>

        <p>
          The safe waters shipping grew used to after the Second World War are
          gone. Total war at sea is back.
        </p>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              BTA — “Drone Attack on Two Merchant Ships in Bulgaria&apos;s
              Exclusive Economic Zone Prompts President to Convene Security
              Council”, 06.10.2026.{" "}
              <a href="https://www.bta.bg/en/news/bulgaria/1218986-drone-attack-on-two-merchant-ships-in-bulgaria-s-exclusive-economic-zone-prompts">
                bta.bg
              </a>
            </li>
            <li id="ref-2">
              Euronews — “Bulgaria calls off search for 10 missing sailors after
              drone attack sinks cargo ship”, 06.10.2026, updated 07.10.2026.{" "}
              <a href="https://www.euronews.com/2026/10/06/drones-hit-two-ships-off-coast-of-bulgaria-as-government-calls-emergency-meeting">
                euronews.com
              </a>
            </li>
            <li id="ref-3">
              Euronews — “Turkish grain ship sinks in Black Sea after deadly
              drone attack”, 05.10.2026.{" "}
              <a href="https://www.euronews.com/2026/10/05/drone-reportedly-hits-ship-in-black-sea-killing-two-and-injuring-11">
                euronews.com
              </a>
            </li>
            <li id="ref-4">
              The Kyiv Independent — “Russian drones strike cargo ship in Black
              Sea, kill captain, Zelensky says”, 05.10.2026.{" "}
              <a href="https://kyivindependent.com/russian-drones-strike-cargo-ship-in-black-sea-kill-captain-zelensky-says/">
                kyivindependent.com
              </a>
            </li>
            <li id="ref-5">
              The Kyiv Independent — “Drones strike merchant vessels in Black
              Sea off Bulgaria, Ukraine, killing at least 1”, 06.10.2026.{" "}
              <a href="https://kyivindependent.com/drones-strike-merchant-vessels-in-black-sea-off-bulgaria-and-ukraine-killing-at-least-one/">
                kyivindependent.com
              </a>
            </li>
            <li id="ref-6">
              PortNews (Telegram) — Russian transport ministry statement on the
              attack on the tanker Aframax Rio, 06.10.2026. Russian source,
              figures as claimed.{" "}
              <a href="https://t.me/PortNews_ru/14452">t.me/PortNews_ru</a>
            </li>
            <li id="ref-7">
              Krymsky Veter (Telegram) — location of the fire from satellite
              data, 06.10.2026. Monitoring channel.{" "}
              <a href="https://t.me/Crimeanwind/110645">t.me/Crimeanwind</a>
            </li>
            <li id="ref-8">
              Procès-verbal relating to the Rules of Submarine Warfare set forth
              in Part IV of the Treaty of London of 22 April 1930, London,
              06.11.1936. Text via the University of Minnesota Human Rights
              Library.{" "}
              <a href="https://hrlibrary.umn.edu/instree/1936a.htm">
                hrlibrary.umn.edu
              </a>
            </li>
            <li id="ref-9">
              International Military Tribunal, Nuremberg — Judgment: Doenitz,
              01.10.1946. Text via the Avalon Project, Yale Law School.{" "}
              <a href="https://avalon.law.yale.edu/imt/juddoeni.asp">
                avalon.law.yale.edu
              </a>
            </li>
            <li id="ref-10">
              Fedlex / LexFind — Procès-verbal concernant les règles de la
              guerre sous-marine, 1936: list of states parties.{" "}
              <a href="https://www.lexfind.ch/tolv/195671/fr">lexfind.ch</a>
            </li>
            <li id="ref-11">
              MagicPort — vessel profile ALFA WATAN (IMO 7510884). Commercial
              AIS aggregator.{" "}
              <a href="https://magicport.ai/vessels/general-cargo/alfa-watan-mmsi-671480000">
                magicport.ai
              </a>
            </li>
            <li id="ref-12">
              MagicPort — vessel profile ROYAD MAMMADOV (IMO 9356969).
              Commercial AIS aggregator.{" "}
              <a href="https://magicport.ai/vessels/general-cargo/royad-mammadov-mmsi-636020314">
                magicport.ai
              </a>
            </li>
            <li id="ref-13">
              Ambrey — “JWLA-035: Why the Whole Black Sea Is Now a Listed Area”,
              23.09.2026.{" "}
              <a href="https://ambrey.com/operations/event/jwla-035-why-the-whole-black-sea-is-now-a-listed-area/">
                ambrey.com
              </a>
            </li>
            <li id="ref-14">
              Regulas Shipping — “Joint War Committee Lists Almost the Entire
              Black Sea as War-Risk Area”, 10.2026.{" "}
              <a href="https://regulasshipping.com/blog/joint-war-committee-lists-almost-the-entire-black-sea-as-war-risk-area/">
                regulasshipping.com
              </a>
            </li>
            <li id="ref-15">
              NPR — “U.S. military says it destroyed 5 Iranian oil tankers after
              attacks on Navy warship”, 09.09.2026.{" "}
              <a href="https://www.npr.org/2026/09/09/nx-s1-5962641/us-destroy-iranian-oil-tankers">
                npr.org
              </a>
            </li>
            <li id="ref-16">
              ShareSansar (AFP) — “Six months of war: 20 dead in 68 incidents
              near Hormuz, IMO says”, 25.08.2026.{" "}
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
              Voenny Osvedomitel (Telegram), 05.10.2026. Pro-Russian channel.{" "}
              <a href="https://t.me/milinfolive/180944">t.me/milinfolive</a>
            </li>
            <li id="ref-19">
              Interfax — “Two dry cargo ships with military property hit in the
              Black Sea en route to the port of Odesa”, 04.10.2026. Russian
              defence ministry statement, as claimed.{" "}
              <a href="https://www.interfax.ru/russia/1120254">interfax.ru</a>
            </li>
            <li id="ref-20">
              The Maritime Executive — “Bulgaria Suspends Search for Missing
              Crew as Russia Denies Attack”, 07.10.2026. Russian embassy
              statement via Reuters, as claimed.{" "}
              <a href="https://maritime-executive.com/article/bulgaria-suspends-search-for-missing-crew-as-russia-denies-attack">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-21">
              Al Jazeera — “Ukraine says Russian drone attack sinks ship in
              Romanian waters”, 05.10.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/10/5/ukraine-says-russian-drone-attack-sinks-ship-in-romanian-waters">
                aljazeera.com
              </a>
            </li>
            <li id="ref-22">
              Ukrinform — “Syria calls for investigation into the sinking of a
              ship in the Black Sea in which its citizens went missing”,
              08.10.2026.{" "}
              <a href="https://www.ukrinform.ua/rubric-world/4172463-siria-zaklikae-rozsliduvati-zatoplenna-sudna-u-cornomu-mori-de-znikli-bezvisti-ii-gromadani.html">
                ukrinform.ua
              </a>
            </li>
            <li id="ref-23">
              Ukrainska Pravda / Yevropeiska Pravda — “Zelensky: Russia attacked
              the ships in Bulgarian waters, Ukraine&apos;s Navy already in
              contact with the Bulgarians”, 06.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/06/8056782/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-24">
              Ukrainska Pravda / Yevropeiska Pravda — “Bulgarian minister calls
              the Russia–Ukraine war hybrid and is unsure whose drones hit the
              ships”, 06.10.2026. Statement on bTV.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/06/8056783/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-25">
              Euronews — “Ukraine denies targeting Bulgaria as drone explodes
              near pipeline, Kyiv promises inquiry”, 09.08.2026.{" "}
              <a href="https://www.euronews.com/2026/08/09/ukraine-denies-targeting-bulgaria-as-drone-explodes-near-pipeline-kyiv-promises-inquiry">
                euronews.com
              </a>
            </li>
            <li id="ref-26">
              Ukrainska Pravda / Yevropeiska Pravda — “EU calls strikes on
              merchant ships in the Black Sea unacceptable”, 07.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/07/8056886/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-27">
              NV — “Russia&apos;s hunt for ships of Turkish owners. A second
              ship in two days sinks off Bulgaria after a drone attack”,
              06.10.2026. Comment by A. Klymenko.{" "}
              <a href="https://nv.ua/ukr/world/geopolitics/ataka-droniv-u-chornomu-mori-zatonulo-sudno-alfa-watan-ye-zagibli-50647583.html">
                nv.ua
              </a>
            </li>
            <li id="ref-28">
              UNN — “Ukraine&apos;s grain exports have collapsed due to the
              situation in the Black Sea: what happened to the maritime
              corridor”, 14.08.2026. Ministry for Development data.{" "}
              <a href="https://unn.ua/en/news/ukraines-grain-exports-have-collapsed-due-to-the-situation-in-the-black-sea-what-happened-to-the-maritime-corridor">
                unn.ua
              </a>
            </li>
            <li id="ref-29">
              DC Marítimo — “Ukraine&apos;s Ports in H1 2026: Growth, Disruption
              and the July Crisis”, 04.07.2026, with updates.{" "}
              <a href="https://www.dcmaritimo.es/en/analytics/ukraine-ports-h1-2026">
                dcmaritimo.es
              </a>
            </li>
            <li id="ref-30">
              Kyiv Post — “Ships Not Entering Odesa Ports: What This Means for
              Ukraine&apos;s Grain Exports”, 18.08.2026. Data from the Ukrainian
              Seaports Authority, UCAB and the NBU.{" "}
              <a href="https://www.kyivpost.com/post/82580">kyivpost.com</a>
            </li>
            <li id="ref-31">
              Splash247 — “Aframax Rio blaze underscores widening Black Sea
              threat”, 07.10.2026. Ambrey estimates.{" "}
              <a href="https://splash247.com/aframax-rio-blaze-underscores-widening-black-sea-threat/">
                splash247.com
              </a>
            </li>
            <li id="ref-32">
              Ag Policy &amp; Markets Daily — “Ukraine Grain Trade Told to Plan
              for Odesa Ports to Stay Shut Into Winter”, 02.09.2026.{" "}
              <a href="https://www.agbull.com/ukraine-grain-trade-told-to-plan-for-odesa-ports-to-stay-shut-into-winter/">
                agbull.com
              </a>
            </li>
            <li id="ref-33">
              Kyiv Post — “Odesa Region Cut Off From Romania and Moldova After
              Bridge Attack”, 19.12.2025.{" "}
              <a href="https://www.kyivpost.com/post/66617">kyivpost.com</a>
            </li>
            <li id="ref-34">
              The New Voice of Ukraine — “Ukraine and Moldova agree on
              alternative routes after Russian strike on Dniester bridge”,
              27.12.2025.{" "}
              <a href="https://english.nv.ua/nation/ukraine-moldova-agree-alternative-routes-after-russian-strike-on-dniester-bridge-50571578.html">
                english.nv.ua
              </a>
            </li>
            <li id="ref-35">
              Intent — “Analysts have warned of the threat of Russian strikes on
              the bridge on the Odesa-Reni highway”, 10.08.2026. Summary of the
              ISW report of 09.08.2026.{" "}
              <a href="https://intent.press/en/news/war/2026/analysts-have-warned-of-the-threat-of-russian-strikes-on-the-bridge-on-the-odesa-reni-highway/">
                intent.press
              </a>
            </li>
            <li id="ref-36">
              Ukrainska Pravda / Yevropeiska Pravda — “Ukraine discusses changes
              to border operations with neighbouring countries due to Russian
              strikes”, 07.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/07/8056922/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-37">
              RBC-Ukraine — “Threat of drone strikes: Moldova builds shelters on
              the border and withdraws border guards”, 07.10.2026. Moldovan
              interior ministry data via NewsMaker.{" "}
              <a href="https://www.rbc.ua/rus/news/zagroza-udariv-droniv-moldova-budue-ukrittya-1791402508.html">
                rbc.ua
              </a>
            </li>
            <li id="ref-38">
              Ukrainian Air Force (Telegram), 09.10.2026, 04:37.{" "}
              <a href="https://t.me/kpszsu/84151">t.me/kpszsu</a>
            </li>
            <li id="ref-39">
              Ukrainian Air Force (Telegram), 09.10.2026, 08:08.{" "}
              <a href="https://t.me/kpszsu/84254">t.me/kpszsu</a>
            </li>
            <li id="ref-40">
              Voenny Osvedomitel (Telegram), 07.10.2026. Pro-Russian channel,
              video.{" "}
              <a href="https://t.me/milinfolive/181056">t.me/milinfolive</a>
            </li>
            <li id="ref-41">
              Voenny Osvedomitel (Telegram), 09.10.2026. Pro-Russian channel,
              video; description as claimed.{" "}
              <a href="https://t.me/milinfolive/181141">t.me/milinfolive</a>
            </li>
            <li id="ref-42">
              RBC-Ukraine — “Drones attacked a ship with Ukrainian grain off
              Romania: Zelensky responds”, 05.10.2026.{" "}
              <a href="https://www.rbc.ua/rus/news/dron-atakuvav-sudno-ukrayinskim-zernom-nepodalik-1791203993.html">
                rbc.ua
              </a>
            </li>
            <li id="ref-43">
              National Bank of Ukraine — Inflation Report, July 2026.{" "}
              <a href="https://bank.gov.ua/admin_uploads/article/IR_2026-Q3.pdf?v=19">
                bank.gov.ua
              </a>
            </li>
            <li id="ref-44">
              Agroportal — “Port shutdown: minus 70 million in export earnings
              every day. Will the hryvnia hold?”, 31.07.2026. Signed analysis.{" "}
              <a href="https://agroportal.ua/en/publishing/zupinka-portiv-minus-70-mln-eksportnih-nadhodzhen-shchodnya-chi-vitrimaye-grivnya">
                agroportal.ua
              </a>
            </li>
            <li id="ref-45">
              The Insider — summary of Politico reporting on Romania and Poland
              refusing additional transit, 04.10.2026.{" "}
              <a href="https://theins.ru/news/297879">theins.ru</a>
            </li>
            <li id="ref-46">
              NV Business — “Not just oil. Ukraine is disrupting deliveries of
              another Russian commodity to India”, 08.10.2026. Reuters and
              Ukroliyaprom data.{" "}
              <a href="https://biz.nv.ua/ukr/markets/ukrajina-okrim-nafti-zrivaye-postavki-z-rosiji-v-indiyu-shche-odnogo-tovaru-reuters-50648018.html">
                biz.nv.ua
              </a>
            </li>
            <li id="ref-47">
              Centre for Transport Strategies — “War-Related Risks and More:
              Five Questions About Marine Insurance in the Black Sea”,
              28.08.2026.{" "}
              <a href="https://en.cfts.org.ua/articles/war_related_risks_and_more_five_questions_about_marine_insurance_in_the_black_sea">
                cfts.org.ua
              </a>
            </li>
            <li id="ref-48">
              Ukrinform — “A Russian shadow-fleet tanker under Ukrainian
              sanctions is burning off Sochi”, 06.10.2026. NSDC and
              MarineTraffic data.{" "}
              <a href="https://www.ukrinform.ua/rubric-world/4171703-bila-soci-gorit-tanker-tinovogo-flotu-rf-akij-perebuvae-pid-sankciami-ukraini.html">
                ukrinform.ua
              </a>
            </li>
            <li id="ref-49">
              MagicPort — vessel profile AFRAMAX RIO (IMO 9273844). Commercial
              AIS aggregator.{" "}
              <a href="https://magicport.ai/vessels/tanker/aframax-rio-mmsi-373641000">
                magicport.ai
              </a>
            </li>
            <li id="ref-50">
              RBC-Ukraine — “Ukraine hit targets in three Russian regions and in
              the Black Sea — Zelensky”, 07.10.2026.{" "}
              <a href="https://www.rbc.ua/rus/news/ukrayina-urazila-tsili-troh-regionah-rf-ta-1791362284.html">
                rbc.ua
              </a>
            </li>
            <li id="ref-51">
              The Maritime Executive — “Greenpeace Warns of Environmental
              Fallout From Tanker Attack in Black Sea”, 07.10.2026.{" "}
              <a href="https://maritime-executive.com/article/greenpeace-warns-of-environmental-fallout-from-tanker-attack-in-black-sea">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-52">
              PortNews (Telegram) — Russian transport ministry report on the
              clean-up, 07.10.2026. Russian source, figures as claimed.{" "}
              <a href="https://t.me/PortNews_ru/14455">t.me/PortNews_ru</a>
            </li>
            <li id="ref-53">
              The Insider — the slick behind the tanker Aframax Rio according to
              Greenpeace, 08.10.2026.{" "}
              <a href="https://theins.ru/news/298074">theins.ru</a>
            </li>
            <li id="ref-54">
              The Insider — Greenpeace on the fire aboard the Aframax Rio,
              09.10.2026. <a href="https://theins.ru/news/298093">theins.ru</a>
            </li>
            <li id="ref-55">
              Baird Maritime — “Port shutdowns push Russia into deeper grain
              export slowdown”, 13.08.2026. Reuters data.{" "}
              <a href="https://www.bairdmaritime.com/shipping/dry-cargo/bulkers/port-shutdowns-push-russia-into-deeper-grain-export-slowdown">
                bairdmaritime.com
              </a>
            </li>
            <li id="ref-56">
              The Moscow Times — “Major Russian Black Sea Oil Terminal Halts
              Operations Amid Ukrainian Drone Threat”, 25.07.2026. Bloomberg
              data.{" "}
              <a href="https://www.themoscowtimes.com/2026/07/25/major-russian-black-sea-oil-terminal-halts-operations-amid-ukrainian-drone-threat-a93337">
                themoscowtimes.com
              </a>
            </li>
            <li id="ref-57">
              Royal Navy — “Royal Navy shadows Russian warships and shadow fleet
              activity in UK waters”, 29.08.2026.{" "}
              <a href="https://www.royalnavy.mod.uk/news/2026/august/29/29082026-royal-navy-shadows-russian-warships-and-shadow-fleet-activity-in-uk-waters">
                royalnavy.mod.uk
              </a>
            </li>
            <li id="ref-58">
              The Maritime Executive — “Russia Briefly Detains Cargo Ship Taking
              Short Cut to Estonia”, 10.2026.{" "}
              <a href="https://maritime-executive.com/article/russia-briefly-detains-cargo-ship-taking-short-cut-to-estonia">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-59">
              UkrAgroConsult — “Russia may export only around 1 mln tons of
              wheat in September”, 09.2026. Russian Grain Union data, as
              claimed.{" "}
              <a href="https://ukragroconsult.com/en/news/russia-may-export-only-around-1-mln-tons-of-wheat-in-september/">
                ukragroconsult.com
              </a>
            </li>
            <li id="ref-60">
              The Sizov Report — “Russian Wheat Exports Start 2026/27 at Half
              Last Year&apos;s Pace”, 09.2026.{" "}
              <a href="https://blog.sizov.report/russian-wheat-exports-start-2026-27-at-half-last-years-pace/">
                sizov.report
              </a>
            </li>
            <li id="ref-61">
              PortNews (Telegram) — state of emergency in Krasnodar region,
              28.09.2026. Russian source, figures as claimed.{" "}
              <a href="https://t.me/PortNews_ru/14410">t.me/PortNews_ru</a>
            </li>
            <li id="ref-62">
              The Insider — “Russian diesel exports via the Black Sea fall to
              zero for the first time on record”, 29.09.2026. S&amp;P Global and
              Bloomberg data.{" "}
              <a href="https://theins.press/en/news/297795">theins.press</a>
            </li>
            <li id="ref-63">
              Newsquawk — “Russia&apos;s oil exports from Black Sea Novorossiysk
              Port reportedly surged to 650k bpd in September”, 22.09.2026.
              Market sources.{" "}
              <a href="https://www.newsquawk.com/headlines/russias-oil-exports-from-black-sea-novorossiysk-port-reportedly-surged-to-650k-bpd-in-september-50-mm-sources-suggest">
                newsquawk.com
              </a>
            </li>
            <li id="ref-64">
              The Insider — “Russia&apos;s oil and gas revenues fall 17% in 2026
              despite doubling of Urals crude prices”, 05.10.2026. Reuters and
              Russian finance ministry data.{" "}
              <a href="https://theins.press/en/news/297921">theins.press</a>
            </li>
            <li id="ref-65">
              Ukrainska Pravda — “Russia&apos;s oil and gas revenues dropped by
              22% in September despite rising oil prices”, 05.10.2026. Russian
              finance ministry data via The Bell.{" "}
              <a href="https://www.pravda.com.ua/eng/news/2026/10/05/8056530/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-66">
              Newsquawk — “Russia cuts oil and gas revenues estimate for 2026 to
              RUB 7.6tln from RUB 8.9tln previously”, 28.09.2026.{" "}
              <a href="https://www.newsquawk.com/headlines/russia-cuts-oil-and-gas-revenues-estimate-for-2026-to-rub-76tln-from-rub-89tln-previously">
                newsquawk.com
              </a>
            </li>
            <li id="ref-67">
              Al Jazeera — “Tanker hit by multiple projectiles off north coast
              of Qatar, UKMTO says”, 08.10.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/10/8/tanker-hit-by-multiple-projectiles-off-north-coast-of-qatar-ukmto-says">
                aljazeera.com
              </a>
            </li>
            <li id="ref-68">
              IranWire — “CENTCOM Destroys 13 Vessels and Reroutes 130 Ships
              Enforcing Maritime Blockade on Iran”, 06.10.2026.{" "}
              <a href="https://iranwire.com/en/news/158535-centcom-destroys-13-vessels-and-reroutes-130-ships-enforcing-maritime-blockade-on-iran/">
                iranwire.com
              </a>
            </li>
            <li id="ref-69">
              Air &amp; Space Forces Magazine — “US Fighters, Drones Strike 3
              Iranian Oil Tankers After Iran Fires on Navy Ships”, 05.09.2026.{" "}
              <a href="https://www.airandspaceforces.com/us-strikes-3-iranian-tankers-fighters-and-drones-trump-administration-seeks-higher-economic-costs-iran/">
                airandspaceforces.com
              </a>
            </li>
            <li id="ref-70">
              CNN — “US military strikes three Iranian tankers in retaliation
              for missile attacks”, 05.09.2026. Audio of the radio warnings
              verified by CNN.{" "}
              <a href="https://www.cnn.com/2026/09/05/middleeast/iran-us-tanker-kharg-intl">
                cnn.com
              </a>
            </li>
            <li id="ref-71">
              Baird Maritime — “India confirms three of its sailors died in US
              tanker strike, another incident reported”, 06.2026.{" "}
              <a href="https://www.bairdmaritime.com/security/incidents/india-confirms-three-of-its-sailors-died-in-us-tanker-strike-another-incident-reported">
                bairdmaritime.com
              </a>
            </li>
            <li id="ref-72">
              gCaptain — “More Tankers Hit in Hormuz as IRGC Orders Ship to Turn
              Back”, 05.10.2026. UKMTO and JMIC data.{" "}
              <a href="https://gcaptain.com/more-tankers-hit-in-hormuz-as-irgc-orders-ship-to-turn-back/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-73">
              Arab Times — “Tanker Hit by Multiple Projectiles Off Qatar,
              Casualties Reported”, 07.10.2026. UKMTO data.{" "}
              <a href="https://www.arabtimesonline.com/news/tanker-hit-by-multiple-projectiles-off-qatar-casualties-reported/">
                arabtimesonline.com
              </a>
            </li>
            <li id="ref-74">
              Discovery Alert — “Tanker Struck 51nm North of Qatar in New Gulf
              Shipping Attack”, 10.2026. Comment by M. Kelly (EOS Risk Group);
              analytical aggregator.{" "}
              <a href="https://discoveryalert.com/news/gulf-tanker-attack-qatar-ras-laffan-october-2026/">
                discoveryalert.com
              </a>
            </li>
            <li id="ref-75">
              IMO — “Middle East: information related to shipping and seafarers
              — Strait of Hormuz and the Middle East”, updated 06.10.2026.{" "}
              <a href="https://www.imo.org/en/mediacentre/hottopics/pages/middle-east-strait-of-hormuz.aspx">
                imo.org
              </a>
            </li>
            <li id="ref-76">
              The Maritime Executive — “Shots Fired at Chinese Containership in
              the Red Sea”, 07.10.2026.{" "}
              <a href="https://maritime-executive.com/article/shots-fired-at-chinese-containership-in-the-red-sea">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-77">
              Seatrade Maritime — “Product tanker attacked in Red Sea as
              hostilities escalate”, 05.10.2026.{" "}
              <a href="https://seatrade-maritime.com/security/product-tanker-attacked-in-red-sea-as-hostilities-escalate">
                seatrade-maritime.com
              </a>
            </li>
            <li id="ref-78">
              CBS News — “Another U.S. strike on alleged drug-smuggling boat
              kills 4, SOUTHCOM says”, 05.10.2026.{" "}
              <a href="https://www.cbsnews.com/news/us-strike-alleged-drug-smuggling-boat-caribbean-4-dead-southcom/">
                cbsnews.com
              </a>
            </li>
            <li id="ref-79">
              Diplomacy and Law — “Drone Attacks on Merchant Ships in
              Bulgaria&apos;s Black Sea EEZ: What International Law Says”,
              06.10.2026. Legal analysis.{" "}
              <a href="https://www.diplomacyandlaw.com/post/drone-attacks-on-merchant-ships-in-bulgaria-black-sea-eez">
                diplomacyandlaw.com
              </a>
            </li>
            <li id="ref-80">
              RBC-Ukraine — “Bulgaria will not invoke NATO Articles 4 and 5 over
              the attack on ships in the Black Sea”, 06.10.2026. BNT data.{" "}
              <a href="https://www.rbc.ua/rus/news/bolgariya-zadiyuvatime-statti-4-i-5-nato-1791305128.html">
                rbc.ua
              </a>
            </li>
            <li id="ref-81">
              Wikipedia — “Paris Declaration Respecting Maritime Law”.{" "}
              <a href="https://en.wikipedia.org/wiki/Paris_Declaration_Respecting_Maritime_Law">
                wikipedia.org
              </a>
            </li>
            <li id="ref-82">
              Encyclopædia Britannica (1911) — “Declaration of Paris”. Text via
              Wikisource.{" "}
              <a href="https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Declaration_of_Paris">
                wikisource.org
              </a>
            </li>
            <li id="ref-83">
              The Maritime Executive — “Large Bulker Abandoned After Attack
              Drifts Hundreds of Miles in Black Sea”, 08.10.2026.{" "}
              <a href="https://maritime-executive.com/article/large-bulker-abandoned-after-attack-drifts-hundreds-of-miles-in-black-sea">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-84">
              Türkiye Today — “11 Turkish sailors rescued, Alfa Watan crew still
              missing after Black Sea drone attack”, 06.10.2026.{" "}
              <a href="https://www.turkiyetoday.com/world/11-turkish-sailors-rescued-alfa-watan-crew-still-missing-after-black-sea-drone-attack-3229748">
                turkiyetoday.com
              </a>
            </li>
            <li id="ref-85">
              Ukrinform — “Bulgaria demands an EU plan for navigation security
              in the Black Sea”, 08.10.2026.{" "}
              <a href="https://www.ukrinform.ua/rubric-world/4172322-bolgaria-vimagae-vid-es-plan-bezpeki-navigacii-v-cornomu-mori.html">
                ukrinform.ua
              </a>
            </li>
            <li id="ref-86">
              Euromaidan Press — “Two ships sunk and a third set ablaze off NATO
              coasts in two days, and neither Bucharest nor Sofia will say
              ‘Russia’”, 06.10.2026.{" "}
              <a href="https://euromaidanpress.com/2026/10/06/two-ships-sunk-and-a-third-set-ablaze-off-nato-coasts-in-two-days-and-neither-bucharest-nor-sofia-will-say-russia/">
                euromaidanpress.com
              </a>
            </li>
            <li id="ref-87">
              Ukrinform — “Erdoğan discussed Black Sea shipping safety with
              Putin by phone”, 07.10.2026.{" "}
              <a href="https://www.ukrinform.ua/rubric-world/4171971-erdogan-telefonom-govoriv-iz-putinim-pro-bezpeku-sudnoplavstva-v-cornomu-mori.html">
                ukrinform.ua
              </a>
            </li>
            <li id="ref-88">
              Ukrainska Pravda — “Media: India proposed a three-part ceasefire
              to Ukraine and Russia, including on Black Sea security”,
              07.10.2026. Hindustan Times reporting.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/07/8056909/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-89">
              Kyiv Post — US–Ukraine talks in Miami, 09.10.2026.{" "}
              <a href="https://www.kyivpost.com/post/86536">kyivpost.com</a>
            </li>
            <li id="ref-90">
              Ukrainska Pravda — “Russia wants US sanctions lifted in exchange
              for an ‘energy ceasefire’”, 09.10.2026.{" "}
              <a href="https://www.pravda.com.ua/news/2026/10/09/8057222/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-91">
              Down To Earth — “Disruptions across Strait of Hormuz, Black Sea
              and alternative routes raise global food and fuel security risks”,
              25.09.2026. S&amp;P Global, SovEcon and WFP data.{" "}
              <a href="https://www.downtoearth.org.in/energy/disruptions-across-strait-of-hormuz-black-sea-and-alternative-routes-raise-global-food-and-fuel-security-risks">
                downtoearth.org.in
              </a>
            </li>
            <li id="ref-92">
              FAO — FAO Food Price Index, release of 02.10.2026.{" "}
              <a href="https://www.fao.org/worldfoodsituation/foodpricesindex/en/">
                fao.org
              </a>
            </li>
            <li id="ref-93">
              Daily Maverick (Reuters) — “World food prices near four-year high
              in September, UN says”, 02.10.2026.{" "}
              <a href="https://www.dailymaverick.co.za/article/2026-10-02-world-food-prices-near-four-year-high-in-september-un-say.md">
                dailymaverick.co.za
              </a>
            </li>
            <li id="ref-94">
              Al Manassa — “Egypt&apos;s wheat imports drop 77% in September”,
              04.10.2026.{" "}
              <a href="https://manassa.news/en/news/34232">manassa.news</a>
            </li>
            <li id="ref-95">
              Al Manassa — “Russian port restrictions threaten Egyptian wheat
              supply chains”, 30.07.2026.{" "}
              <a href="https://manassa.news/en/news/33152">manassa.news</a>
            </li>
            <li id="ref-96">
              African Business — “Wheat prices spike as Ukraine and Russia trade
              Black Sea blows”, 24.08.2026.{" "}
              <a href="https://african.business/2026/08/resources/wheat-prices-spike-as-ukraine-and-russia-trade-black-sea-blows">
                african.business
              </a>
            </li>
            <li id="ref-97">
              FAO — “Global agrifood implications of the 2026 conflict in the
              Middle East”, 2026.{" "}
              <a href="https://openknowledge.fao.org/server/api/core/bitstreams/1aafb5d8-39d1-481a-b1f8-25facaec3051/content">
                openknowledge.fao.org
              </a>
            </li>
            <li id="ref-98">
              World Bank — Food and Nutrition Security Update 122, 29.05.2026.{" "}
              <a href="https://thedocs.worldbank.org/en/doc/40ebbf38f5a6b68bfc11e5273e1405d4-0090012022/related/Food-and-Nutrition-Security-Update-122-May-29-2026.pdf">
                worldbank.org
              </a>
            </li>
            <li id="ref-99">
              Bloomberg — “UN Warns Prolonged Iran War Could Spur Record Global
              Hunger”, 17.03.2026. WFP data.{" "}
              <a href="https://bloomberg.com/news/articles/2026-03-17/un-warns-prolonged-iran-war-could-trigger-record-global-hunger">
                bloomberg.com
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
