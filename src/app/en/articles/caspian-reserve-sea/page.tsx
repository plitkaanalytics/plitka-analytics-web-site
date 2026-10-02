import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getArticleBySlug, requireVisibleArticle } from "@/lib/articles";
import IfArticleVisible from "@/components/IfArticleVisible";
import ArticleHead from "@/components/ArticleHead";
import MakhachkalaGrowth from "@/components/MakhachkalaGrowth";
import RouteShiftMap from "@/components/RouteShiftMap";
import KaspiyskStrikes from "@/components/KaspiyskStrikes";
import CaspianRoutesMap from "@/components/CaspianRoutesMap";
import TankerProportion from "@/components/TankerProportion";

const SLUG = "caspian-reserve-sea";

/** Search and social copy — a separate text from the dek: the dek asks a
 *  question, the description states what is inside. Title comes from the
 *  frontmatter. */
const DESCRIPTION =
  "An OSINT account of the Caspian leg of Russian logistics: the port of Makhachkala up 50%, traffic through the Volga-Don Canal down threefold, the Iranian corridor and the September strikes on Dagestan.";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return {
    title: `${getArticleBySlug(SLUG, "en").title} — PLITKA Analytics`,
    description: DESCRIPTION,
    openGraph: { images: ["/articles/rezervne-more/cover.avif"] },
  };
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");

  return (
    <main data-screen-label="Story · The Caspian">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Title, dek and reading time come from content/articles/en/caspian-reserve-sea.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Investigation" locale="en" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/rezervne-more/cover.avif"
            alt="The Russian-flagged vessel Sarmat-1 under tow; a tug to the right and a port city skyline behind in the evening haze"
          />
        </div>
        <p className="lede">
          In the first half of 2026 the seaport of Makhachkala handled{" "}
          <strong>2.11 million tonnes</strong> of cargo, 50% more than in the
          same period a year earlier. Liquid cargo — crude oil and refined
          products — almost doubled. Analysts tie the shift to the security
          situation in the neighbouring Black Sea.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          On the night of 10 September 2026 Ukrainian drones struck that port
          for the <strong>first time in the whole war</strong>
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The next night explosions were heard in Kaspiysk, fifteen kilometres
          to the south. That is where the Caspian Flotilla is based, whose ships
          hit Ukraine with the same Kalibr missiles as the Black Sea Fleet
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . On the night of the 19th air defence was working over Kaspiysk
          again, and by morning Rosaviatsia had closed the airport at
          Makhachkala
          <a className="ref" href="#ref-3">
            [3]
          </a>
          .
        </p>

        <p>
          Three attacks in ten days. Unprecedented attention to a body of water
          that long played a secondary role in Russian logistics and was never a
          priority target for Ukraine. What changed? Why the Caspian now matters
          to Russia, and what Ukraine is after there — in this new piece from
          Plitka Analytics.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · The sea</span>Waters no foreign navy
          can enter
        </h2>

        <p>
          The Caspian is the largest enclosed body of water on earth, with an
          outlet to the ocean only through rivers and canals. Five states share
          its shore: Russia, Iran, Azerbaijan, Kazakhstan and Turkmenistan.
          Russia has three commercial ports — <strong>Astrakhan</strong> in the
          Volga delta, <strong>Olya</strong> eighty kilometres to the south and{" "}
          <strong>Makhachkala</strong> in Dagestan. The flotilla&apos;s naval
          base sits apart from them, at Kaspiysk.
        </p>

        <p>
          Makhachkala stands out among them: it is{" "}
          <strong>
            the only ice-free deepwater Russian port on the Caspian
          </strong>
          , working year-round and taking both liquid and dry cargo. It is also
          a major node on the routes between Russia and Iran
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          The Caspian is the only body of water of this size that an outside
          navy cannot enter, and that rests less on military strength than on
          legal agreement.
        </p>

        <p>
          In 2018 the five littoral states signed the Convention on the Legal
          Status of the Caspian Sea at Aktau. It gave each of them{" "}
          <strong>15 nautical miles</strong> of territorial waters and another
          ten miles of exclusive fishing rights, and left the division of the
          seabed to bilateral deals. The key provision is a different one:{" "}
          <strong>
            the convention expressly bans the presence of armed forces of states
            that have no Caspian coastline
          </strong>
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          The Caspian has <strong>no international waters</strong> in the sense
          the UN Convention on the Law of the Sea gives the term. So the right
          of visit under its Article 110, on which interceptions of suspect
          cargo rest, does not apply either. Nor does the Proliferation Security
          Initiative, created precisely to stop arms shipments
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>
        <figure className="fig">
          <img
            src="/articles/rezervne-more/kaspii_map_svoboda.avif"
            alt="Map of the Caspian Sea showing a 15-nautical-mile band along each state's coast, another 10 miles for fishing and a shared zone in the middle; Russia, Kazakhstan, Turkmenistan, Iran and Azerbaijan are labelled"
          />
          <figcaption>
            The Caspian under the 2018 Aktau Convention. Graphic by RFE/RL.
          </figcaption>
        </figure>

        <p>
          The Caspian connects to the Sea of Azov through the Volga-Don Canal —
          63 miles and thirteen locks between two river systems. The canal is
          narrow: draught is capped at twelve feet, loading at roughly five
          thousand tonnes, and at three thousand on the shallow stretches of the
          Volga and the Don. In winter the canal freezes and navigation normally
          ends in December
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . It is the only way a ship can pass from the Caspian into the Sea of
          Azov, and from there into the Black Sea.
        </p>

        <div className="aside-note">
          <p>
            The canal is not the only constraint on large-scale shipping. The
            Caspian is getting shallower, especially in the north, and that is
            why the flotilla&apos;s main base was moved from Astrakhan to
            Kaspiysk, while the largest ships had preferred to berth at
            Makhachkala since the mid-2000s. Work on the Kaspiysk base began
            only in 2017
            <a className="ref" href="#ref-2">
              [2]
            </a>
            .
          </p>
        </div>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-flotilla">
          <span className="h2-num">§ 01 · The flotilla</span>Forty-eight cells
          for Kalibrs
        </h2>

        <p>
          On 7 October 2015 ships of the Caspian Flotilla used the Kalibr-NK
          against targets in Syria for the first time. In 2022 the missiles flew
          towards Ukraine as well.
        </p>

        <p>
          The flotilla&apos;s strike core is two Project 11661K patrol ships,
          and they differ markedly.
          <strong>Dagestan</strong> carries a 3S14 universal vertical launcher
          with <strong>eight cells</strong> for the Kalibr-NK family: a stated
          range of <strong>375 km against sea targets</strong> and{" "}
          <strong>over 1,600 km against land targets</strong>.{" "}
          <strong>Tatarstan</strong>, commissioned in 2003, carries Kh-35 and
          Kh-35U anti-ship missiles of the Uran system with ranges of 130 and
          260 km, the Osa-MA-2 air defence system and a 76 mm gun
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . <strong>Tatarstan is not a Kalibr carrier</strong>.
        </p>

        <p>
          The flotilla also has three Project 21631 Buyan-M small missile ships
          — Grad Sviyazhsk, Uglich and Veliky Ustyug — each with the same 3S14
          launcher holding eight Kalibrs
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Together with Dagestan that makes <strong>thirty-two cells</strong>{" "}
          — what the flotilla&apos;s permanent complement can fire in a single
          salvo.
        </p>

        <figure className="fig">
          <img
            src="/articles/rezervne-more/buyan_with_protection.jpg"
            alt="A Project 21630 Buyan small artillery ship at a pier: lattice structures mounted over the superstructure, sandbags on deck, a rusted barge placed alongside as a screen"
          />
          <figcaption>
            A Buyan at the Kaspiysk base under anti-drone protection. Image by
            KiberBoroshno.
          </figcaption>
        </figure>

        <p>
          Two more belong elsewhere. Project 22800 Karakurt small missile ships
          — <strong>Tucha</strong> and <strong>Tayfun</strong> — are on the
          Caspian, each with its own eight-cell 3S14. Formally both are assigned
          to the Black Sea Fleet: these are ships that never reached “their” sea
          and stayed in a basin they were not meant for.{" "}
          <IfArticleVisible slug="four-years-at-sea-karakurts" locale="en">
            How they got there is covered in the{" "}
            <Link href="/en/articles/four-years-at-sea-karakurts">
              Karakurt chronicle
            </Link>
            .{" "}
          </IfArticleVisible>
        </p>

        <div className="callout">
          <p>
            With them included,{" "}
            <strong>up to forty-eight cruise missiles</strong> can be launched
            from the Caspian in a single salvo on one sortie.
          </p>
        </div>

        <div className="aside-note">
          <p>
            Three more ships in the flotilla are also called Buyans, but carry
            no missiles at all. The Project 21630 small artillery ships —
            Astrakhan, Volgodonsk and Makhachkala — are armed with a 100 mm
            A-190 gun and a naval version of the Grad with a range of 5–20 km
            <a className="ref" href="#ref-2">
              [2]
            </a>
            . Buyan and Buyan-M are often confused even in official reports, so
            the difference is worth keeping in mind.
          </p>
        </div>

        <p>
          The Russians built the flotilla up specifically as a missile force. In
          2014 its then commander, Vice Admiral Sergey Alekminsky, said the
          formation would have six Buyan-Ms by 2016. That did not happen:
          Zelyony Dol and Serpukhov went to the Black Sea, then around Western
          Europe to the Baltic
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . In that series the Caspian turned out to be a donor rather than a
          priority.
        </p>

        <p>
          The first Ukrainian strike on Kaspiysk came on{" "}
          <strong>6 November 2024</strong>: ultralight drones covered some
          fifteen hundred kilometres and hit two ships
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . Sources in Ukrainian military intelligence named both patrol ships —
          Tatarstan and Dagestan — as the targets; the British defence ministry
          spoke of “at least two, probably Gepard-class frigates”, while ISW
          noted that satellite imagery did not clearly confirm damage to those
          particular ships.{" "}
          <IfArticleVisible slug="four-years-at-sea-frigates" locale="en">
            That episode is examined in detail in the{" "}
            <Link href="/en/articles/four-years-at-sea-frigates">
              frigate chronicle
            </Link>
            .{" "}
          </IfArticleVisible>
        </p>

        <p>
          Then a year and more with no result. A second attack on 30 November
          2024 produced no confirmed hits, nor did the strike on the base on 1
          December 2025. In mid-December 2025 the focus shifted away from ships
          to oil production altogether: the Filanovsky and Korchagin platforms,
          the vessels Kompozitor Rakhmaninov and Askar-Saridzha, and the patrol
          ship Okhotnik.
        </p>

        <p>
          Strikes on missile carriers resumed only in the spring of 2026. On{" "}
          <strong>7 May 2026</strong> the General Staff confirmed a hit on a
          Karakurt small missile ship near the Kaspiysk basing point; the extent
          of the damage was not stated at the time
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . On 15 May a small missile ship and a minesweeper were reported hit
          at the same naval base
          <a className="ref" href="#ref-9">
            [9]
          </a>
          , and on the 17th a border patrol ship in the port alongside
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . On 25 July the Security Service&apos;s target list included a
          Project 12418 missile boat
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . On 11 September OSINT analysts reported a probable hit on Tatarstan
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <figure className="fig">
          <KaspiyskStrikes lang="en" />
          <figcaption>
            Strikes on Caspian targets, November 2024 to September 2026.
          </figcaption>
        </figure>

        <p>
          Set that list against the composition of the force and it shows that,
          of all the Kalibr carriers, the ones definitely hit were{" "}
          <strong>only the Karakurts</strong> — that is, precisely the two ships
          that came here from the Black Sea. The General Staff stated plainly at
          the time that the ship hit was a Kalibr carrier; which of the two,
          Tucha or Tayfun, was never officially named
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          The rest of what was hit carried no Kalibrs, not even potentially.
          Tatarstan, the minesweeper, the border and missile boats are escort
          and support ships.{" "}
          <IfArticleVisible slug="four-years-at-sea-buyan-m" locale="en">
            From what we have tracked on frigates and small missile ships, no
            destruction of a Caspian missile carrier has been confirmed over the
            course of the war.
          </IfArticleVisible>
        </p>

        <p>
          On 20 September, however, an anonymous Telegram channel, “An
          Absolutely Reliable Source”, reported that on the night of the 19th
          the <strong>VTR-79</strong> was damaged at Kaspiysk — a Project 20360
          naval armament transport used to load missiles and ammunition onto
          warships — and that the real target had been Dagestan, moored
          alongside
          <a className="ref" href="#ref-14">
            [14]
          </a>
          . A vessel of that name does exist and is listed among the
          flotilla&apos;s auxiliaries
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . How critical the loss or damage of the VTR-79 would be is hard to
          judge for now.
        </p>

        <p>
          The force has plans for the future, but no certainty. At the Army-2022
          forum the Ak Bars corporation showed a model of the Project 21635
          small missile ship, an enlarged Buyan-M of 1,400 tonnes whose cruise
          missile load grows to <strong>sixteen cells instead of eight</strong>.
          Whether the navy will order such ships, and whether they would reach
          the Caspian, the Russian account does not say
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          The nearer prospect is more modest. The Buyan-M series ends with
          Stavropol, which was to be delivered to the Caspian back in 2024
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Open sources do not show whether it reached the flotilla, but if it
          does, the permanent complement gains another eight cells.
        </p>

        <p>
          What limits these plans is not shipbuilding but the water itself. A
          sea that keeps getting shallower forces any new fleet into the same
          depths.
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-cargo-early">
          <span className="h2-num">§ 02 · Military cargo</span>The gateway to
          Iran
        </h2>

        <p>
          Russia received its first batches of Shaheds by sea across the
          Caspian, back at the start of the full-scale war
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . In 2024 the US Treasury assessed that the Russian defence ministry
          had used the vessel <strong>Port Olya-3</strong> to carry short-range
          ballistic missiles from Iran
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          On 14 August 2025 Ukrainian special operations forces hit the dry
          cargo ship <strong>Port Olya-4</strong> near the port of Olya in
          Astrakhan region. The vessel partly sank. It was carrying{" "}
          <strong>Shahed components</strong> and ammunition from Iran; according
          to MarineTraffic it was off the Iranian coast on 1 August, set out for
          Russia on the 12th, and on the 14th it was gone
          <a className="ref" href="#ref-16">
            [16]
          </a>
          . The governor of Astrakhan region, Igor Babushkin, put the damage
          down to “debris from drones, all of which were shot down”
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          Port Olya-4 is owned by <strong>MG-Flot</strong>, formerly
          TransMorFlot, linked to the Astrakhan businessman{" "}
          <strong>Jamaldin Pashayev</strong>. His companies have been carrying
          Russian military exports since 2021 and have signed over{" "}
          <strong>200 contracts</strong> for arms shipments in that time.
          According to Ukraine&apos;s Main Intelligence Directorate, Pashayev
          and his firms are part of the supply chain of <strong>Alabuga</strong>
          , the plant where Shaheds are assembled. The United States added Port
          Olya-4 to its sanctions list in September 2024; MG-Flot has{" "}
          <strong>26 vessels</strong>
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          The carriers are old ro-ros and dry cargo ships that routinely switch
          off their automatic identification systems to hide calls at Iranian
          and Russian ports. Formally that breaches the Convention for the
          Safety of Life at Sea — but there is no one here to enforce it
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Our own attempts to trace the arms logistics ran into exactly this.
          Ships with military cargo prefer to go unnoticed.
        </p>

        <p>
          Over ninety per cent of ocean tonnage is insured by the International
          Group of P&amp;I clubs, which risk US, UK and EU sanctions if they
          take on risky clients — so Caspian operators have moved to state
          mechanisms: Russia&apos;s Ingosstrakh and Iran&apos;s Kish P&amp;I
          Club
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <div className="aside-note">
          <p>
            If a ship carrying ammunition blows up or spills oil, it is the
            neighbours who will find out how solvent that insurance is —
            Azerbaijan, Kazakhstan and Turkmenistan, for whom the Caspian is a
            link in the Trans-Caspian route to Europe
            <a className="ref" href="#ref-5">
              [5]
            </a>
            .
          </p>
        </div>

        <IfArticleVisible slug="ukraine-vs-africa-corps" locale="en">
          <p>
            MG-Flot is registered at{" "}
            <strong>the settlement of Akhty, Republic of Dagestan</strong>
            <a className="ref" href="#ref-17">
              [17]
            </a>
            . The same company operates thousands of kilometres away. On 6
            September 2026, four days before the first strike on Makhachkala,
            drones attacked the ro-ro carrier <strong>Lady Mariia</strong> in
            the Mediterranean off Crete — also MG-Flot, also under sanctions:
            the United States listed the operator under Executive Order 14024
            back in May 2022, and Ukraine added this particular vessel to its
            own list on 23 May 2026
            <a className="ref" href="#ref-18">
              [18]
            </a>
            . Lady Mariia&apos;s voyages and what she carried to Africa are
            examined in{" "}
            <Link href="/en/articles/ukraine-vs-africa-corps">
              a separate piece
            </Link>
            .{" "}
          </p>
        </IfArticleVisible>

        <div className="aside-note">
          <p>
            These ships mostly transship at the port of Olya. The port was
            promoted and built up as a key node of the North–South corridor,
            that is, of trade with sanctioned Iran
            <a className="ref" href="#ref-16">
              [16]
            </a>
            .
          </p>
        </div>

        <p>
          In the summer of 2026 the arms traffic between the two countries
          reversed. On 18 August, citing a European government document, it
          emerged that <strong>Russia is now sending Iran</strong> explosives,
          ammunition and drone components, so that Tehran can replenish stocks
          after the US and Israeli strikes
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>
        <figure className="fig">
          <CaspianRoutesMap lang="en" />
          <figcaption>
            Shipping lanes between Russian and Iranian ports.
          </figcaption>
        </figure>

        <p>
          In January 2026 the Iranian vessel <strong>Caspian Shiva</strong> was
          reported damaged on the Caspian
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . And on the night of 25 July the Security Service of Ukraine reported
          its widest operation in these waters to date: hits on the Filanovsky
          oil production platform, the dry cargo ships{" "}
          <strong>Port Olya-2</strong> and <strong>Begey</strong>, and a Project{" "}
          <strong>12418 Molniya</strong> missile boat
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . Ukraine&apos;s president said the targets included “vessels carrying
          military cargo from Iran, and also a warship”. Iran said the ship hit
          was a <strong>commercial</strong> vessel of its own carrying iron, en
          route from Astrakhan to Anzali, and that{" "}
          <strong>one sailor was killed and three more wounded</strong>; Tehran
          did not name the ship.
        </p>

        <p>
          The presence of a warship on that list is not incidental: the flotilla
          increasingly works as an escort for the corridor&apos;s cargo.
        </p>

        <div className="callout callout--warn">
          <p>
            The governor of the Iranian province, Hadi Haghshenas, called the
            Astrakhan–Anzali route “a safe and reliable corridor for commercial
            exchange”; Iranian foreign ministry spokesman Esmaeil Baghaei said
            that “Ukraine&apos;s dangerous adventurism will certainly not go
            without our response”, and Ukraine&apos;s chargé d&apos;affaires was
            summoned to the Iranian foreign ministry
            <a className="ref" href="#ref-15">
              [15]
            </a>
            .
          </p>
        </div>

        <p>
          The Caspian leg, as part of the North–South transport corridor, is
          strategically important for Russia&apos;s development after the loss
          of the Western market. This is the route meant to link Russia, Iran,
          Central Asia and India while bypassing Europe and China. The project
          is overseen by Nikolai Patrushev as head of the Maritime Board, and
          Putin personally called a meeting on the corridor&apos;s future
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        {/* ===================== § 03 ===================== */}
        <h2 id="sec-molochka">
          <span className="h2-num">§ 03 · After Molochka</span>Madyar
        </h2>

        <p>
          On 6 July 2026 the Unmanned Systems Forces began an operation named{" "}
          <strong>Molochka</strong>. In the first nine days, from 6 to 14 July,{" "}
          <strong>116 vessels</strong> of the so-called shadow fleet were hit in
          the Sea of Azov
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . As of 22 September, after eleven weeks, the tally stood at{" "}
          <strong>300 craft</strong>: 134 in the Sea of Azov and 166 in the
          Black Sea
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          The target was not merchant shipping at random but one specific link
          in the oil export chain — <strong>feeder tankers</strong> of the
          river-sea class, Volgoneft, Sanar and Primomax types, with a capacity
          of about <strong>7,000 tonnes</strong>. They load refined products at
          inland refineries — Volgograd, Samara, Saratov — and run down the{" "}
          <strong>Volga-Don Canal</strong> into the Sea of Azov
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          The Azov is shallow and cannot take 100,000-tonne ocean tankers. So
          the feeders go out through the Kerch Strait and pump their cargo into
          large ships — at Port Kavkaz or nearby, in Black Sea waters. Filling
          one ocean tanker takes <strong>fourteen or fifteen</strong> such runs
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          The volume of that work was growing right before the strikes: where
          May saw 40–50 feeder tankers in the Azov, June saw more than a hundred
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <figure className="fig">
          <TankerProportion lang="en" />
          <figcaption>
            How many feeder runs fit into one ocean tanker. Ship silhouette —
            Wikimedia Commons, Goran tek-en, CC BY-SA 4.0.
          </figcaption>
        </figure>

        <p>
          <strong>About 20% of Russian crude</strong> is exported through the
          Azov–Black Sea region, according to Captain 2nd Rank Dmytro
          Pletenchuk, spokesman for the Ukrainian Navy
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . Temporarily occupied Crimea needs, by Putin&apos;s own account, at
          least <strong>70,000 tonnes of fuel a month</strong>, and the shallow
          Azov was the main route for that supply
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . Azov ports also handled up to{" "}
          <strong>10 million tonnes of grain</strong> for export — almost a
          quarter of all Russian grain shipments
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <div className="qtbox">
          <p>
            “The ‘three hundredth fleet’ is a suitcase without a handle and a
            torment for the worm-ridden budget. The Sea of Azov is at a
            standstill and will stay that way, along with the Kerch Strait. In
            the northern and north-eastern Black Sea the regime is ‘maybe
            we&apos;ll slip through’. Molochka in action”
            <a className="ref" href="#ref-13">
              [13]
            </a>
          </p>
          <p className="qtbox__src">
            Major Robert “Madyar” Brovdi, commander of the Unmanned Systems
            Forces, 22 September 2026
          </p>
        </div>

        <p>
          Satellite radar imagery as of 14 July showed the number of tankers and
          dry cargo ships remaining in the zone had fallen several times over
          against the period before the operation
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . In August sanctioned tankers began fitting{" "}
          <strong>anti-drone nets</strong>, metal structures and water tanks
          <a className="ref" href="#ref-23">
            [23]
          </a>
          .
        </p>

        <p>
          After thirteen vessels were hit, ten of them tankers, shipping through{" "}
          <strong>
            the Don-Azov canal and the Kerch Strait was temporarily suspended
          </strong>
          <a className="ref" href="#ref-24">
            [24]
          </a>
          . In five days <strong>48 vessels</strong> in all were hit in the Sea
          of Azov, and on 10 July the Unmanned Systems Forces reported another
          thirteen shadow-fleet tankers. Defense Express estimated that about a
          hundred and twenty vessels remained at sea, mostly dry cargo ships
          <a className="ref" href="#ref-24">
            [24]
          </a>
          .
        </p>

        <figure className="fig fig--pair fig--bleed">
          <div className="fig__row">
            <img
              src="/articles/rezervne-more/azov_before_06_07.webp"
              alt="Satellite map of the Sea of Azov on 6 July 2026: yellow dots mark 132 Russian vessels clustered near Taganrog Bay, the Kerch Strait and along the coast"
            />
            <img
              src="/articles/rezervne-more/azov_after_18_07.webp"
              alt="The same map of the Sea of Azov on 18 July 2026: only 29 yellow dots remain, scattered singly"
            />
          </div>
          <figcaption>
            Russian vessels in the Sea of Azov before and after the operation
            began. Images from the Telegram channel Oko Hora.
          </figcaption>
        </figure>

        <p>
          According to the Volga-Don Basin Inland Waterways Administration,{" "}
          <strong>14.1 million tonnes</strong> passed through the canal in the
          2020 navigation season. In 2025 it was already{" "}
          <strong>4.5 million</strong>, with 3,251 vessel transits. And in the
          first four months of the 2026 season, 1.813 million tonnes and 1,182
          vessels
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <p>
          In June 2026 the canal passed 474,000 tonnes and 311 vessels; in July,{" "}
          <strong>299,000 tonnes</strong> and 197 vessels. A drop of{" "}
          <strong>36.92%</strong> in a month. The Russian outlet that published
          the figures put the reason in its headline: “Ukrainian drones are to
          blame”
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <p>
          Nobody struck the canal itself. The canal carried that same feeder
          fleet, and once the Azov stopped being passable there was no one left
          to sail it and nowhere to sail to.
        </p>

        <div className="callout">
          <p>
            In August 2026 Russia&apos;s transport ministry set up an
            operational headquarters to coordinate shipping in the Sea of Azov,
            because of drone attacks on vessels. Its task was worded as follows:
            “to find alternative logistics routes and redistribute cargo flows
            between different modes of transport”
            <a className="ref" href="#ref-25">
              [25]
            </a>
            . This is not an outside analyst&apos;s judgement but an
            administrative act of the Russian government: the search for
            alternative routes became a separate task with a headquarters of its
            own.
          </p>
        </div>

        <p>
          In 2025 the port of Makhachkala handled{" "}
          <strong>3.5 million tonnes</strong> — 6.5–8% more than the year
          before. Growth, then, but modest. In 2026 the pace changed abruptly:
          1.4 million tonnes in the first four months, up 48%; 2.11 million over
          the half-year, up 50%; over 2.9 million in eight months, up 42.5%
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          What drives that growth is liquid cargo — crude oil and refined
          products. <strong>1.5689 million tonnes</strong> of it passed through
          in the first half of the year, almost twice as much as a year earlier
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . That is <strong>almost three quarters</strong> of everything moving
          through the port.
        </p>
        <figure className="fig">
          <MakhachkalaGrowth lang="en" />
          <figcaption>
            Cargo turnover at the port of Makhachkala. Port figures as reported
            by trade publications
            <a className="ref" href="#ref-1">
              [1]
            </a>
            .
          </figcaption>
        </figure>

        <p>
          Trade sources name the reason for the jump directly: pressure on
          Russian shadow-fleet vessels in the Black Sea and the Sea of Azov
          forced a search for alternative routes
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Fuel that used to take the familiar southern lanes went where
          Ukrainians find it harder to reach.
        </p>

        <p>
          The two sets of figures look as if they contradict each other: the
          port up 50%, the canal down threefold. In fact they describe different
          directions. What is drying up is movement <strong>westward</strong>,
          through the canal into the Azov and on into the Black Sea. What is
          growing is movement <strong>straight across the Caspian</strong> — to
          Iranian ports, from which the cargo continues overland and by rail
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <figure className="fig fig--bleed">
          <RouteShiftMap lang="en" />
          <figcaption>
            Below Volgograd the cargo has two ways out: west by canal, or south
            down the Volga
            <a className="ref" href="#ref-22">
              [22]
            </a>
            .
          </figcaption>
        </figure>

        <p>
          So Molochka did not stop Russian oil exports; it changed their
          direction. The Sea of Azov and the Kerch Strait are effectively closed
          to the Russian cargo fleet, yet the overall flow that used to pass
          that way has not gone anywhere and is looking for other routes.
        </p>

        <p>
          The road it found is worse than the old one on almost every count. On
          the Volga-Don Canal a ship takes about five thousand tonnes, and on
          the shallow stretches of the Volga and the Don only three
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . In winter the canal freezes and navigation halts until spring.
          Makhachkala remains the only ice-free deepwater port on the Caspian,
          but from there the cargo does not transfer to an ocean tanker; it sets
          off along the Iranian railway
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . The same fuel arrives more slowly and in smaller lots, and to some
          buyers it does not arrive at all.
        </p>

        <p>
          This reorientation has a flip side. The cargo moved not merely to
          another sea, but to the one sea where every operation carries a
          diplomatic price, because of three littoral states that keep working
          relations with both Moscow and Europe. Ukrainian strikes pushed
          Russian fuel into the region&apos;s best-protected waters.
        </p>

        <p>
          The strikes on Makhachkala and Kaspiysk on 10, 11 and 19 September are
          a continuation of that same Molochka, which followed the cargo into a
          new sea.
        </p>

        {/* ===================== CONCLUSION ===================== */}
        <h2 id="sec-conclusion">
          <span className="h2-num">Conclusion</span>The Caspian knot
        </h2>

        <p>
          Every function of the Caspian examined here has been transformed over
          the course of the war, and each of them has had a direct bearing on
          Russia&apos;s ability to wage it. Most of the threats have still not
          been neutralised, and they have adapted to conditions in which Ukraine
          can reach targets in the region.
        </p>

        <p>
          The commercial line changed the most, taking over a substantial share
          of the functions of ports in the neighbouring sea. Military logistics
          lost three cargo vessels in a year, among them one carrying Shahed
          components, but did not slow down. And the Kalibr launchers still pose
          a serious threat. The flotilla remains combat-capable, and the growing
          reach of our strike systems has not changed that so far.
        </p>

        <p>
          So September&apos;s strikes are most likely not the last. Hitting
          targets on the Caspian remains necessary, and will therefore continue.
          For our part we can wish the Defence Forces luck, and we will keep
          watching the region.
        </p>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              Militarnyi — “Ukrainian Drones Strike Makhachkala Port on the
              Caspian Sea for the First Time”, 10.09.2026. Port throughput for
              2025–2026; the fire confirmed by the Russian side.{" "}
              <a href="https://militarnyi.com/en/news/ukrainian-drones-strike-makhachkala-port-on-the-caspian-sea-for-the-first-time/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-2">
              Caspian Institute — “The Caspian Flotilla: current state and
              prospects”. Composition and armament of the flotilla, the move of
              the base to Kaspiysk. Russian source, figures as claimed.{" "}
              <a href="https://caspian.institute/product/mozgovoj-aleksandr/kaspijskaya-flotiliya-sovremennoe-sostoyanie-i-perspektivy-razvitiya-38392.shtml">
                caspian.institute
              </a>
            </li>
            <li id="ref-3">
              Militarnyi — “Dagestan Attacked by Drones, Explosions Heard Near
              Port of Kaspiysk”, 19.09.2026. Restrictions at Makhachkala
              airport; figures as claimed by the Russian defence ministry.{" "}
              <a href="https://militarnyi.com/en/news/dagestan-drone-attack-near-port-of-kaspiysk/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-4">
              The New Voice of Ukraine — “Explosions reported near Russia&apos;s
              Caspian Flotilla base in Kaspiysk”, 19.09.2026.{" "}
              <a href="https://english.nv.ua/russian-war/drones-attack-dagestan-explosions-reported-near-russia-s-kaspiysk-naval-base-50642768.html">
                english.nv.ua
              </a>
            </li>
            <li id="ref-5">
              Jerusalem Center for Foreign Affairs — “Dark Waters: How Russia
              and Iran Weaponized the Caspian Sea”, 26.08.2026. The 2018 Aktau
              Convention, the inapplicability of the right of visit and of the
              PSI, the shadow fleet and insurance. Israeli think tank.{" "}
              <a href="https://jcfa.org/dark-waters-how-russia-and-iran-weaponized-the-caspian-sea/">
                jcfa.org
              </a>
            </li>
            <li id="ref-6">
              The Maritime Executive — “Russia Invests in Volga-Don Canal as
              Trade With Iran Booms”, 21.12.2022. Structural limits of the
              canal; the financial figures in the source are as of 2022.{" "}
              <a href="https://maritime-executive.com/article/russia-invests-in-volga-don-canal-as-trade-with-iran-booms">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-7">
              RUSI, Emily Ferris — “The Iran-Israel War Presents a Problem for
              Russia&apos;s Military Supply Chains”, 01.05.2026. Nodes on the
              route, the rail leg of the North–South corridor, the March Israeli
              strike and the Kremlin&apos;s response.{" "}
              <a href="https://www.rusi.org/explore-our-research/publications/commentary/iran-israel-war-presents-problem-russias-military-supply-chains">
                rusi.org
              </a>
            </li>
            <li id="ref-8">
              LB.ua — “General Staff confirms hit on Russian missile ship and
              ammunition depot”, 07.05.2026. A Project 22800 Karakurt small
              missile ship hit near the Kaspiysk basing point.{" "}
              <a href="https://lb.ua/society/2026/05/07/736913_genshtab_pidtverdiv_urazhennya.html">
                lb.ua
              </a>
            </li>
            <li id="ref-9">
              Militarnyi — “Small Missile Ship and Minesweeper Struck at
              Kaspiysk Base”, 15.05.2026.{" "}
              <a href="https://militarnyi.com/en/news/missile-ship-minesweeper-hit-kaspiysk-base/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-10">
              UNIAN — “Ukraine hit a Russian border patrol ship in a Dagestan
              port”, 17.05.2026.{" "}
              <a href="https://www.unian.ua/war/udari-po-rosiji-ukrajina-urazila-prikordonniy-storozhoviy-korabel-u-dagestani-13384521.html">
                unian.ua
              </a>
            </li>
            <li id="ref-11">
              ArmyInform — “The SBU staged a ‘night raid’ on Russia: air
              defence, a missile boat and ships with military cargo hit”,
              25.07.2026.{" "}
              <a href="https://armyinform.com.ua/2026/07/25/sbu-vlashtuvala-nichnyj-rejd-po-rf-urazheno-ppo-raketnyj-kater-i-sudna-z-vijskovymy-vantazhamy/">
                armyinform.com.ua
              </a>
            </li>
            <li id="ref-12">
              Oboronka (Mezha) — “Defence Forces probably hit the flagship of
              Russia&apos;s Caspian Flotilla”, 11.09.2026. Reporting a message
              from the OSINT project Exilenova+.{" "}
              <a href="https://oboronka.mezha.ua/sili-oboroni-urazili-korabel-tatarstan-315138/">
                oboronka.mezha.ua
              </a>
            </li>
            <li id="ref-13">
              ArmyInform — “In 11 weeks the USF hit 300 vessels of the Russian
              ‘shadow fleet’”, 22.09.2026. The operation&apos;s tally and a
              quote from the USF commander.{" "}
              <a href="https://armyinform.com.ua/2026/09/22/za-11-tyzhniv-sbs-urazyly-300-suden-rosijskogo-%C2%ABtinovogo-flotu%C2%BB/">
                armyinform.com.ua
              </a>
            </li>
            <li id="ref-14">
              Telegram channel “An Absolutely Reliable Source”, post of
              20.09.2026 on the VTR-79. <strong>Anonymous source</strong>; cited
              with its character stated, no independent confirmation.{" "}
              <a href="https://t.me/absolutely_reliable/111">t.me</a>
            </li>
            <li id="ref-15">
              CNN — “The Iran and Ukraine wars are colliding on the world&apos;s
              biggest lake”, 27.07.2026. The positions of Kyiv and Tehran on the
              July strikes; the US Treasury assessment of Port Olya-3.{" "}
              <a href="https://www.cnn.com/2026/07/27/middleeast/caspian-sea-iran-ukraine-wars-collide-intl">
                cnn.com
              </a>
            </li>
            <li id="ref-16">
              Militarnyi — “Russia Loses First Ship Transporting Ammunition and
              Shahed Drone Parts From Iran”, 15.08.2025. MarineTraffic data;
              MG-Flot ownership, the Alabuga link per Ukrainian military
              intelligence.{" "}
              <a href="https://militarnyi.com/en/news/russia-loses-first-ship-transporting-ammunition-and-shahed-drone-parts-from-iran-how-many-vessels-still-remain/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-17">
              The Maritime Executive — “Russian Military Cargo Vessel Attacked
              in the Mediterranean”, 07.09.2026. MG-Flot&apos;s registered
              address.{" "}
              <a href="https://maritime-executive.com/article/russian-military-cargo-vessel-attacked-in-the-mediterranean">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-18">
              Tech Times — “Ukraine Drones Strike Lady Mariia: Russia&apos;s
              Weapons Ship, Not Oil Tanker”, 07.09.2026. Sanctions status of the
              vessel and its operator.{" "}
              <a href="https://www.techtimes.com/articles/326906/20260907/ukraine-drones-strike-lady-mariia-russias-weapons-ship-not-oil-tanker.htm">
                techtimes.com
              </a>
            </li>
            <li id="ref-19">
              UNITED24 Media — “Russia Has Started Supplying Explosives to Iran
              to Replenish Weapons Stocks”, 18.08.2026.{" "}
              <a href="https://united24media.com/world/russia-has-started-supplying-explosives-to-iran-to-replenish-weapons-stocks-21791">
                united24media.com
              </a>
            </li>
            <li id="ref-20">
              Militarnyi — “Iranian Vessel Suffers Damage of ‘Unknown Origin’ in
              the Caspian Sea”, 29.01.2026.{" "}
              <a href="https://militarnyi.com/en/news/iranian-vessel-suffers-damage-of-unknown-origin-in-the-caspian-sea/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-21">
              ArmyInform — “The occupiers&apos; southern bridgehead is
              suffocating: how Molochka turned the Sea of Azov into a trap for
              the Russians”, 16.07.2026. The first nine days of the operation,
              SAR data, comment from the Ukrainian Navy spokesman.{" "}
              <a href="https://armyinform.com.ua/2026/07/16/pivdennyj-placzdarm-okupantiv-zadyhayetsya-yak-molochka-peretvoryla-azovske-more-na-pastku-dlya-rosiyan/">
                armyinform.com.ua
              </a>
            </li>
            <li id="ref-22">
              NV — “Operation Azov. Greetings to Russian tankers from Madyar”,
              07.2026. Signed analysis: the mechanics of the feeder fleet,
              volumes and consequences.{" "}
              <a href="https://nv.ua/opinion/udary-po-tankeram-v-azovskom-more-v-2026-godu-chto-daet-eta-specoperaciya-ukrainy-istoricheskie-posledstviya-50623649.html">
                nv.ua
              </a>
            </li>
            <li id="ref-23">
              Slovo i Dilo — “Madyar said how many shadow-fleet vessels were hit
              in the Sea of Azov and the Black Sea”, 22.09.2026. The start date
              of the operation, anti-drone protection on tankers.{" "}
              <a href="https://www.slovoidilo.ua/2026/09/22/novyna/bezpeka/madyar-rozpoviv-skilky-suden-tinovoho-flotu-rf-urazyly-azovskomu-ta-chornomu-moryax">
                slovoidilo.ua
              </a>
            </li>
            <li id="ref-24">
              The New Voice of Ukraine — “Russian ship numbers in the Sea of
              Azov may have halved since July — ISW”, 07.2026. Starboard
              Maritime Intelligence data in the ISW report; the suspension of
              shipping through the canal and the strait per Reuters; the Defense
              Express estimate.{" "}
              <a href="https://english.nv.ua/nation/isw-reports-55-drop-in-russian-ships-using-ais-in-sea-of-azov-50623793.html">
                english.nv.ua
              </a>
            </li>
            <li id="ref-25">
              Bloknot-Volgodonsk — “Ukrainian drones are to blame: Volga-Don
              Canal throughput fell 37% in a month”, 17.08.2026. Figures from
              the Volga-Don Basin Administration; Russian source, figures as
              claimed.{" "}
              <a href="https://bloknot-volgodonsk.ru/news/vinovaty-ukrainskie-bpla-gruzooborot-volgo-donskog">
                bloknot-volgodonsk.ru
              </a>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
