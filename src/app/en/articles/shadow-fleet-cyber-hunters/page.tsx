import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
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
import InterdictionsMap from "@/components/InterdictionsMap";

const SLUG = "shadow-fleet-cyber-hunters";

/** Search and social copy — a separate text from the dek: the dek asks a
 *  question, the description states what is inside. Title comes from the
 *  frontmatter. */
const DESCRIPTION =
  "What US Coast Guard cyber teams found aboard shadow fleet tankers: spoofed AIS and LRIT, remote access and wiped drives, pirated ECDIS, a seal generator for forged papers. And what European boarding teams should expect.";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return {
    title: `${getArticleBySlug(SLUG, "en").title} — PLITKA Analytics`,
    description: DESCRIPTION,
    openGraph: { images: ["/articles/peremykach-ais/cover.jpg"] },
  };
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");
  const related = getAllArticles("en")
    .filter((a) => a.slug !== SLUG)
    .slice(0, 3);

  return (
    <main data-screen-label="Story · Shadow fleet">
      {/* ============ ARTICLE HEAD ============ */}
      {/* Title, dek and reading time come from content/articles/en/shadow-fleet-cyber-hunters.mdx */}
      <ArticleHead slug={SLUG} eyebrow="Investigation" locale="en" />

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/peremykach-ais/cover.jpg"
            alt="A US Coast Guard officer in a red jacket watches the rusting tanker Bella 1 through binoculars on a grey sea"
          />
        </div>
        <p className="lede">
          At the DEF CON 34 hacker conference in Las Vegas this August, US Coast
          Guard cyber operators showed how they work aboard shadow fleet
          tankers, and which technical tricks the owners of these ships use to
          mislead investigators. Since December 2025 more than 19 such tankers
          have been seized worldwide, against fewer than five in the previous
          ten years. Today, people with laptops go aboard alongside the assault
          teams.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p>
          In June 2026 US Coast Guard Cyber Command had already described some
          of the unusual digital tools that today’s shadow fleet tankers rely
          on, in its annual CTIME report
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The DEF CON talk, “Taking on the Dark Fleet… in Cyberspace!”, was
          given by Commander Kenny Miltenberger, who leads the Coast Guard’s
          2003rd Cyber Protection Team, and the team’s network engineer Shane
          Cancilla. It added a number of mechanisms that are especially
          interesting from an engineering point of view
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Sanctions-busting shipping, it turns out, runs on a whole set of
          engineering and digital fixes: spoofed coordinates, remote access
          software, attempts to wipe drives from afar and pirated navigation
          software.
        </p>

        <p>
          Meanwhile, the same thing is happening off Europe’s coasts. In early
          March 2026 the Belgian Navy, supported by French helicopters, seized
          the tanker <strong>Ethera</strong> in the North Sea. It was sailing
          under a false Guinean flag, and its ship’s papers turned out to be
          forged
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . On 6 March Swedish police boarded the cargo ship{" "}
          <strong>Caffa</strong>, and a crew member is suspected of using a
          forged document
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . On 20 July forces of the EU’s Operation IRINI verified the flag of
          the tanker <strong>South Star</strong> in the Mediterranean
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . Every such team boards a ship whose computers may still be in the
          hands of someone ashore.
        </p>

        <p>
          The harder the shadow fleet is pursued, the more inventive it gets,
          including in a field as complex as the international law of the sea.
          What exactly the Americans found, how it works and what European teams
          should expect is set out below.
        </p>

        {/* ===================== § 00 ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · The campaign</span>Cyber operators on
          the rope ladder
        </h2>

        <p>
          The shadow fleet is the name given to tankers that carry oil from
          Russia, Iran and Venezuela around sanctions. Most are old ships with
          opaque owners, doubtful insurance and frequently changing flags
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . The US Congressional Research Service, as cited by the speakers,
          counted about 1,600 ships carrying sanctioned oil in 2024
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . An investigation by the Dutch outlet Follow the Money in early 2026
          counted more than 1,300 tankers, at least a third of them, over 500,
          sailing under false flags
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          In December 2025 the United States began seizing such ships on the
          high seas. The first, on 10 December, was the tanker{" "}
          <strong>Skipper</strong>. It flew the flag of Guyana, although Guyana
          itself did not recognise its registration. <strong>Centuries</strong>{" "}
          followed on 20 December and <strong>Sophia</strong> on 7 January
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . The campaign targeted mainly Venezuela-linked tankers
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . After the US, India, Belgium, France, Sweden, the United Kingdom,
          Finland, Estonia and Germany also began seizing shadow fleet ships
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <InterdictionsMap
          lang="en"
          caption={
            <>
              Seizures, boarding inspections and failed attempts to seize shadow
              fleet ships in 2025–2026. Locations are approximate. Sources:{" "}
              <a className="ref" href="#ref-8">
                [8]
              </a>
              <a className="ref" href="#ref-9">
                [9]
              </a>
              <a className="ref" href="#ref-10">
                [10]
              </a>
              <a className="ref" href="#ref-11">
                [11]
              </a>
              <a className="ref" href="#ref-12">
                [12]
              </a>
              <a className="ref" href="#ref-13">
                [13]
              </a>
              <a className="ref" href="#ref-14">
                [14]
              </a>
              <a className="ref" href="#ref-5">
                [5]
              </a>
              .
            </>
          }
        />

        <p>
          That Coast Guard cyber teams board these ships alongside armed special
          forces had not been publicised before
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . Cyber Command drew dedicated Cyber Control Teams from its Cyber
          Protection Teams and, for the first time, sent them aboard together
          with assault and law enforcement teams
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Their job is to take control of the ship’s digital environment as
          fast as possible, to cut off interference from outside and bring the
          ship into port in the state in which it was seized. Time permitting,
          the team hunts for threats in the network on board and closes them
          down
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The Coast Guard calls this procedure cyber positive control, or
          POSCON
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/mh60-cyber-team.jpg"
            alt="A US Coast Guard MH-60 helicopter with its door open hovers over the sea, a basket with a team member hanging below on a cable"
          />
          <figcaption>
            An MH-60 helicopter lowers a Cyber Control Team member aboard.
            Photo: US Coast Guard, public domain.
          </figcaption>
        </figure>

        <div className="qtbox">
          <p>
            “When you’re talking about an 1,100-foot tanker with complex IT and
            OT systems on board, and cyberspace is an operational domain, we
            realized that not only do you need to take positive control of that
            ship’s physical environment to successfully control and seize the
            vessel, but you need to do that in the cyber domain as well.”
            <a className="ref" href="#ref-16">
              [16]
            </a>
          </p>
          <p className="qtbox__src">
            Rear Admiral Jason Tama, commander of US Coast Guard Cyber Command,
            18 August 2026
          </p>
        </div>

        <p>
          For cyber operators used to corporate networks it was unusual work. As
          their talk shows, they climbed aboard by rope ladder or were winched
          down from a helicopter, and ate army field rations on the seized
          tanker
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          “We’ve known for years that the dark fleet posed significant physical
          risks, because we knew they were operating old ships, they weren’t
          maintaining them. But what we didn’t know until these boardings was
          what type of cyber risks were aboard these ships,” Tama told The Wall
          Street Journal
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <p>
          Neither the report nor the talk names the ships behind individual
          findings, except for one example, the tanker Sophia, seized in the
          Caribbean
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . The Wall Street Journal writes that they were mostly ships carrying
          Iranian and Russian oil
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        {/* ===================== § 01 ===================== */}
        <h2 id="sec-coords">
          <span className="h2-num">§ 01 · AIS</span>The art of teleportation
        </h2>

        <p>
          Every merchant ship in the world reports where it is through the{" "}
          <span
            className="term"
            data-def="Automatic Identification System. An on-board transmitter that broadcasts the ship’s name, position, course and speed to nearby ships, shore stations and satellites."
          >
            AIS
          </span>
          . The transmitter on board continuously broadcasts the ship’s name,
          identifier, position, course and speed. Nearby ships, shore stations
          and satellites pick up these signals, and from there the data flows
          into public ship-tracking services.
        </p>

        <p>
          The transmitter does not know its own position. It gets coordinates
          from the satellite navigation system, usually a GPS receiver, over an
          ordinary serial line. Instruments on the bridge exchange data in the
          NMEA 0183 standard, the same language spoken by the GPS receiver, the
          AIS, the radar and other navigation equipment
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The ship’s name and identifier are entered into the transmitter when
          it is set up.
        </p>

        <p>
          The inspections showed that some shadow fleet tankers carried several
          AIS transmitters, and the name under which the ship appeared to the
          world was changed with a single switch
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/ais-selector.jpg"
            alt="A white plastic box with a toggle switch; AIS SELECTOR is written in marker, with JRC and SAILOR next to the switch positions"
          />
          <figcaption>
            A home-made switch between two AIS transmitters on a shadow fleet
            tanker. Photo: US Coast Guard, public domain.
          </figcaption>
        </figure>

        <p>
          The position was faked through the data line. The scheme the Cyber
          Control Teams saw most often was this: a custom-made CAT6 cable was
          soldered to the data port of the AIS unit, and at the other end sat a
          laptop running marine instrument testing software. The software
          generates the same NMEA 0183 strings that normally come from the GPS
          receiver, and the transmitter broadcast an invented position as if it
          were real
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . On bridges the teams also found spliced serial connections between
          the GPS receiver and the navigation equipment
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Around the antennas on the wheelhouse of some tankers stood what
          appeared to be attenuation cages. In a photo from the talk an antenna
          is wrapped in foil and tape. The speakers believe this was done to cut
          off the genuine GPS signal so that it would not interfere with the
          spoofing
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/antenna-foil.jpg"
            alt="An antenna on a mast above the wheelhouse wrapped in silver foil and tape against a blue sky"
          />
          <figcaption>
            An antenna on the wheelhouse wrapped in foil, probably to block the
            genuine GPS signal. Photo: US Coast Guard, public domain.
          </figcaption>
        </figure>

        <p>
          Among the files on board, the teams also found several detailed guides
          to other ways of feeding false GPS data into the AIS
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Rear Admiral David Barata, the Coast Guard’s deputy commander for
          operational policy, told The Wall Street Journal about a ship whose
          signal placed it near Curaçao, while in fact it was off the coast of
          Venezuela, carrying oil there
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          Russia uses the same tricks off Europe’s coasts when it moves military
          cargo. In April 2026 the tanker General Skobelev, the ro-ro ship
          Sparta and the replenishment tanker Akademik Pashin left St
          Petersburg, Kaliningrad and Murmansk. The first two are under
          sanctions; the frigate Admiral Kasatonov escorted them, and the ships
          declared Port Said in Egypt as their destination
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <p>
          After the English Channel the ships switched off their AIS, and later
          the trackers showed the impossible. On 1 May General Skobelev’s signal
          placed it off Estonia. On 8 May Sparta broadcast that it was in
          Kaliningrad, sailing at 49.8 knots, a speed beyond any ship of its
          size. Two days later a satellite photographed all four ships
          south-west of Malta, and on 11 May the convoy was already in the
          Syrian port of Tartus. What it delivered is unknown, but Sparta has
          long served Russia’s military logistics
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
          <IfArticleVisible slug="syrian-express-changes-course" locale="en">
            {" "}
            We covered this voyage in detail in “
            <Link href="/en/articles/syrian-express-changes-course">
              The Syrian Express Changes Course
            </Link>
            ”.
          </IfArticleVisible>
        </p>

        <p>
          A year earlier, in June 2025, the Russian corvette Boikiy escorted two
          sanctioned shadow fleet tankers, Sierra and Naxos, also known as
          Selva, through the English Channel
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . The corvette itself broadcast a false identity over AIS at the same
          time
          <a className="ref" href="#ref-21">
            [21]
          </a>
          .
        </p>

        <p>
          In June 2026 Bellingcat traced the bulk carrier{" "}
          <strong>Grumant</strong>, which took grain from occupied Feodosia to
          Benghazi in Libya. Near Feodosia its AIS positions were erratic, and
          some even placed it on land: satellite navigation has long been jammed
          in that part of the Black Sea. But the heading in AIS messages comes
          not from GPS but from the ship’s gyrocompass. All 29 messages between
          7 and 19 February showed a heading of 267–268 degrees, and the berth
          at Feodosia is oriented at 267.5 degrees. No other ship nearby
          consistently broadcast such a heading
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . Charlie Brown, a former US Navy officer with whom Bellingcat shared
          the method, called it sound but noted that some compasses may be
          vulnerable too, so the data must be checked against other sources
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          PLITKA Analytics runs its own tool that tracks the voyages of Russian
          fleet ships and records cases where AIS shows a position other than
          the one the ship is actually in.
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/ais-only-near-shore.jpg"
            alt="A satellite map of Denmark with a ship’s route: AIS points appear only in the Skagerrak, Kattegat and Øresund straits, with long straight gaps without a signal in between; a pop-up with data on the ship Baltic Leader"
          />
          <figcaption>
            Baltic Leader rounds Denmark on 2 October 2026: its AIS signal
            appears only in the straits and off foreign coasts. Data: PLITKA
            Analytics.
          </figcaption>
        </figure>

        <p>
          Anyone who knows where to look can spot a lie in AIS. But there is
          also a closed channel. Under International Maritime Organization
          rules, ships above 300 gross tonnage report their identity and
          position every six hours through the{" "}
          <span
            className="term"
            data-def="Long Range Identification and Tracking. Reports go over a closed satellite channel to government bodies only."
          >
            LRIT
          </span>{" "}
          system. Only the flag state, the coastal and port states and search
          and rescue services receive these reports
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          Spoofing LRIT is harder than spoofing AIS, and legally and in safety
          terms it is a far more serious offence. It requires either simulating
          an external GPS or altering the terminal’s firmware. On the ships the
          teams found shared firmware for Inmarsat-C terminals. When a ship
          began spoofing its AIS, its LRIT position changed too. In other words,
          the terminal took its coordinates from the same faked source, not from
          a GPS receiver of its own
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        {/* ===================== § 02 ===================== */}
        <h2 id="sec-identity">
          <span className="h2-num">§ 02 · IMO</span>The art of disguise
        </h2>

        <p>
          Every ship keeps one International Maritime Organization number, its
          IMO number, for life, while its name and flag can change as often as
          it likes
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . A flag means registration in a particular state, and it is the flag
          state that is responsible for the ship following the rules, from
          sanctions to safety and crew protection
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          The tanker that Estonia detained in April 2025 because it was not in
          any registry was called Kiwala and flew the flag of Djibouti. Then it
          became Boracay under a false flag of Benin, and under that name it was
          stopped by the French military in September 2025
          <a className="ref" href="#ref-24">
            [24]
          </a>
          . Some shipping databases also list it as Pushpa
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . According to Rear Admiral Barata, shadow fleet owners often take new
          names from ships that have already gone for scrap. That way the new
          name has at least some digital trail
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          A new name needs new papers too. Aboard shadow fleet tankers the teams
          found a Russian program, Stamp 0.62 for Windows. It quickly draws
          images of ship’s seals so that the ship’s name and IMO number can be
          changed in official documents
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . An IMO number cannot be changed lawfully, so a seal with a new
          number is good for one thing only: forgery.
        </p>

        <p>
          The program is old. Its window title reads “Stamp 0.62 for Windows
          95/98/2000/NT”, the author gave an address at mail.ru, and the
          Cyrillic interface shows up as garbled characters in the screenshot.
          To show how it works, the speakers used it to recreate a seal with the
          name SURPRISE and the port of Portsmouth
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/stamp-062.png"
            alt="The Stamp 0.62 for Windows 95/98/2000/NT program window with a Cyrillic interface in broken encoding; in the middle a round seal reading SURPRISE PORTSMOUTH No 03081757"
          />
          <figcaption>
            Stamp 0.62 and a seal the speakers recreated with it. Screenshot: US
            Coast Guard, public domain.
          </figcaption>
        </figure>

        <p>
          It is the false flag that makes a ship vulnerable at sea. The UN
          Convention on the Law of the Sea allows a warship to visit a ship on
          the high seas that is reasonably suspected of being without
          nationality or of flying a flag it is not entitled to
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . In October 2025 all the states bordering the Baltic and North Seas
          declared that a ship without nationality has no right of innocent
          passage, and on 15 December the EU confirmed the right to visit such
          ships
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . The Belgians seized Ethera precisely for its false flag and forged
          documents
          <a className="ref" href="#ref-3">
            [3]
          </a>
          , while South Star was boarded to verify its flag
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . For a European boarding team, the ship’s papers therefore become the
          key evidence.
        </p>

        <p>
          When the false flag stopped protecting it, part of the fleet found
          another shield. The tanker Bella 1 flew the flag of Guyana, although
          Guyana had already cancelled its registration
          <a className="ref" href="#ref-25">
            [25]
          </a>
          . In December 2025 it began running from the US Coast Guard, and on
          the way the crew renamed it Marinera, painted a Russian flag on its
          side, and the ship was re-registered in Russia. Moscow sent Washington
          a diplomatic note demanding an end to the pursuit
          <a className="ref" href="#ref-26">
            [26]
          </a>
          . According to The Wall Street Journal, as cited by USNI News, the
          tanker picked up a Russian Navy escort that included at least one
          attack submarine
          <a className="ref" href="#ref-27">
            [27]
          </a>
          .
        </p>

        <p>
          On 7 January 2026, 190 miles south of Iceland, a Coast Guard team with
          special forces seized the tanker. The US treated it as a ship without
          nationality
          <a className="ref" href="#ref-26">
            [26]
          </a>
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . The British Ministry of Defence, which supported the operation, said
          the ship had first flown a false flag, switched off its transponders
          and tried to reflag while it was being pursued
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . Rob McLaughlin, professor of international law at Australia’s
          University of Wollongong, argued in Just Security, by contrast, that
          the seizure’s lawfulness is doubtful if the Russian registration was
          valid
          <a className="ref" href="#ref-25">
            [25]
          </a>
          .
        </p>

        <p>
          Marinera was not alone. According to Lloyd’s List, as cited by CNN, 17
          shadow fleet tankers took the Russian flag in December 2025 alone
          <a className="ref" href="#ref-26">
            [26]
          </a>
          . Another 20 switched from false flags to Cameroon’s obscure but
          legitimate registry in a single week in early February 2026
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Law enforcement does have tools against false flags. The first is the
          consent of the flag state. Panama, whose flag Centuries and Sophia
          flew, has a long-standing boarding agreement with the US and usually
          agrees, because it wants such ships off its own registry
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . States whose flags the shadow fleet favours are cleaning up their
          registries. Palau has already removed 29 of the 43 shadow fleet ships
          it identified, and Sierra Leone has promised to remove all sanctioned
          vessels
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . And, as noted, a ship without nationality can be boarded on the high
          seas without anyone’s consent
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          The Russian flag neutralises all three tools. Russia will not consent
          to a boarding, will not strike its own ship from its registry, and a
          ship under a valid flag is not a ship without nationality. Seizing it
          is no longer a document check but a confrontation with a state. With
          Marinera the US went that far, declaring the Russian registration
          invalid, and lawyers see this as the most vulnerable step
          <a className="ref" href="#ref-25">
            [25]
          </a>
          . Retired Rear Admiral William Baumgartner, a former Coast Guard Judge
          Advocate General, fears that the so far solid legal footing of the
          seizures could be undermined by US forces themselves operating at the
          edge of legal authority
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <p>
          Europe is more cautious for now. “One question is: how willing are
          European countries to let the problem escalate?” says Yf Reykers of
          Maastricht University. “We are seeing Russia becoming more assertive,
          sometimes sending armed men on their ships and deploying drones”
          <a className="ref" href="#ref-6">
            [6]
          </a>
          . Nele Matz-Lück, professor of international law at Kiel University,
          points to the other side: if Europe starts reading the law of the sea
          more strictly, China and other states will read it the same way,
          including towards Western ships
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <div className="callout">
          <p>
            A false flag gives the right to board. A Russian flag takes that
            right away, and every further seizure becomes a question not of law
            but of political will.
          </p>
        </div>

        {/* ===================== § 03 ===================== */}
        <h2 id="sec-remote">
          <span className="h2-num">§ 03 · Data</span>The art of wiping
        </h2>

        <p>
          A modern tanker is constantly in touch with the shore. Internet
          reaches the ship by satellite, over Ku-band or Starlink, and is then
          distributed through the ship’s network: a modem, a core switch, user
          switches and Wi-Fi access points
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Through this link an ordinary shipowner monitors the ship’s
          condition, and its staff ashore can configure the onboard computers
          remotely.
        </p>

        <p>
          Shadow fleet tankers are no exception here. Old and poorly maintained,
          they often have modern high-bandwidth satellite links
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . On most computers the Cyber Control Teams found three remote access
          programs at once: AnyDesk, TeamViewer and ScreenConnect. They were set
          up to allow connections even when nobody was at the computer on board.
          Someone ashore could get into the ship’s network at any time
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          According to Cyber Command, shadow fleet administrators attempted to
          delete data on board remotely
          <a className="ref" href="#ref-1">
            [1]
          </a>
          , and The Wall Street Journal reports that at least once this happened
          after Americans had already boarded the ship
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . Using remote access software, someone logged into a workstation on
          board and from there used PowerShell to zero-fill the servers’ hard
          drives
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . A screenshot from the talk shows an image of such a drive: the file
          system is not recognised, and in place of data there are only zeros.
          Evidence, in other words, can vanish under the boarding team’s feet
          while the ship is still connected to the shore. That is why the cyber
          team has to take control of the network as fast as possible.
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/disk-wiped.png"
            alt="A forensic disk analysis window: the file system is not recognised, and the hexadecimal view shows nothing but zeros"
          />
          <figcaption>
            An image of a server drive after remote wiping: zeros instead of
            data. Screenshot: US Coast Guard, public domain.
          </figcaption>
        </figure>

        <p>
          In December 2024 the shadow fleet tanker <strong>Eagle S</strong>,
          flagged in the Cook Islands, dragged its anchor across the bed of the
          Gulf of Finland and damaged five undersea cables, including the
          Estlink 2 power link
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . Its voyage data recorder, the ship’s “black box”, failed to record
          the very moment the ship crossed the cable. Yet the ship got off
          lightly: Finland’s National Bureau of Investigation found no signs of
          tampering. An outdated GPS receiver from the early 2000s, on losing
          its signal, reset the date to 2005, and the recorder deleted files on
          its own to free up space
          <a className="ref" href="#ref-29">
            [29]
          </a>
          .
        </p>

        <p>
          Legally, the difference between these cases is fundamental. Drives
          wiped remotely point to intent to cover one’s tracks, while a failure
          of old equipment, seemingly accidental, proves no such intent. Only a
          specialist who gets into the ship’s network before it can be altered
          can tell one from the other.
        </p>

        {/* ===================== § 04 ===================== */}
        <h2 id="sec-software">
          <span className="h2-num">§ 04 · Soft</span>The art of piracy
        </h2>

        <p>
          A tanker has two different networks. The first, information
          technology, serves office work: email, documents, accounting. The
          second, operational technology, runs the ship itself: the engine,
          cargo systems, navigation
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The design is meant to keep a virus on an office computer away from
          the ship’s controls.
        </p>

        <p>
          On shadow fleet tankers, however, that boundary was crossed all the
          time. Software was carried across on USB sticks for updates, and
          laptops were plugged straight into navigation systems such as{" "}
          <span
            className="term"
            data-def="Electronic Chart Display and Information System. On modern ships it replaces paper charts."
          >
            ECDIS
          </span>{" "}
          and into engine room control systems
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . A photo from the talk shows an adapter connecting Ethernet to the
          AIS serial line, and in the engine control room stand gateways linking
          the industrial CAN bus to an ordinary Ethernet network
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/peremykach-ais/ais-serial-adapter.jpg"
            alt="An adapter with a green terminal block, white and blue wires screwed into it, lying on a desk in front of a navigation instrument"
          />
          <figcaption>
            A home-made adapter used to spoof AIS data. Photo: US Coast Guard,
            public domain.
          </figcaption>
        </figure>

        <p>
          The software on these computers was mostly pirated, both for office
          work and for navigation. Crews downloaded it through uTorrent from a
          Russian maritime torrent forum offering maritime chats, technical
          literature, applications, training videos, tests and simulators.
          Windows and Office were activated without a licence. The Cyber Control
          Teams found AAct.exe and KMSAuto from the Ratiborus KMS Tools package,
          which trick Microsoft’s licensing system, as well as scheduled tasks
          that ran them again and again. They also found pirated ECDIS and route
          planning software
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Pirated software brought malware aboard. One computer picked up Lumma
          Stealer, a data-stealing program commonly rented out on
          Russian-speaking forums
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . The speakers also describe an attempt to run MusaLLaT, a worm that
          spreads via USB sticks, the very route by which the boundary between
          the networks was crossed. It rewrites DNS records so that antivirus
          software cannot reach its servers, disables Task Manager, the command
          prompt, the registry editor and System Restore, opens a network port
          and hides an autorun file on the drive. Trojans turned up too, some of
          them aimed at Chinese users
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          All of this spread easily thanks to weak, shared or entirely missing
          passwords, disabled antivirus, outdated operating systems and shared
          USB sticks
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . Across the fleet the cyber teams inspected, they counted 17
          confirmed malware detections and 2,268 configuration changes, and on
          344 occasions someone had cleared the antivirus threat history
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          On an ordinary office network this would be an unpleasant but routine
          incident. On a tanker the stakes are different. “For a vessel that’s
          carrying tens of millions of gallons of crude oil, which is highly
          volatile, there’s always a risk of fire explosion. The atmosphere in
          the tanks has to be very carefully managed. And then there’s always a
          risk of an oil spill”, Rear Admiral Tama told The Wall Street Journal
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . As an example of a system the tanker’s safety depends on, the
          speakers point to inert gas generators
          <a className="ref" href="#ref-2">
            [2]
          </a>
          , the very system that fills the empty space in the tanks with
          oxygen-free gas so that oil vapour cannot ignite.
        </p>

        <p>
          August 2026 showed what happens when such a network is attacked from
          outside, although that ship had no trouble with the law. South Korea’s
          HMM managed the 333-metre supertanker <strong>VL Prosperity</strong>,
          bound for Galveston, Texas. Iran’s Mehr news agency claimed that on 7
          August hackers took over the ship’s engine room systems: they reduced
          engine cooling, raised the revolutions and interfered with the fuel
          system, and communications were lost for 30 hours. The US confirmed
          only signs of a network compromise and gave no details
          <a className="ref" href="#ref-30">
            [30]
          </a>
          . On 21 August law enforcement officers and a Coast Guard cyber team,
          together with an FBI cyber team, boarded the tanker, and the agencies
          later said there was no disruption to the ship’s operations and no
          danger to the crew or the environment. The prompt response allowed the
          threat to be removed
          <a className="ref" href="#ref-31">
            [31]
          </a>
          .
        </p>

        {/* ===================== § 05 ===================== */}
        <h2 id="sec-europe">
          <span className="h2-num">§ 05 · Europe</span>The art of being ready
        </h2>

        <p>
          On 27 September 2025, off the island of Ushant, the French military
          stopped the tanker Boracay, which was sailing without a visible flag.
          The master refused to let them inspect it, and the sailors had to
          carry out a dangerous manoeuvre. On board were two employees of the
          Russian private security company Moran Security Group, reportedly
          there to monitor the crew and gather intelligence
          <a className="ref" href="#ref-24">
            [24]
          </a>
          .
        </p>

        <p>
          In May 2025, when Estonia tried to inspect a tanker suspected of
          having no nationality, a Russian fighter jet briefly appeared nearby,
          and the ship refused to enter Estonian waters. Finland’s defence
          minister Antti Häkkänen said at the time that tankers leaving Russia
          through the Gulf of Finland were escorted by warships
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . Boikiy escorted tankers through the English Channel, Admiral
          Kasatonov led the convoy to Tartus
          <a className="ref" href="#ref-20">
            [20]
          </a>
          <a className="ref" href="#ref-19">
            [19]
          </a>
          , and according to The Wall Street Journal a submarine followed
          Marinera
          <a className="ref" href="#ref-27">
            [27]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/PqXwHUXmet4?rel=0"
            title="US forces board the tanker Marinera"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            US forces board the tanker Marinera, 7 January 2026. Video: PLITKA
            Analytics.
          </figcaption>
        </figure>

        <p>
          Europe therefore faces a harder version of the task: being ready for
          armed resistance. Private military companies and the Russian navy and
          air force already act as countermeasures. Their aim is to intimidate,
          provoke and buy time while Europeans look for a safe solution and
          agree on a plan for the case of resistance. That alone is a difficult
          task.
        </p>

        <p>
          But the American experience is worth studying and applying now. The
          cyber team should always go aboard with the assault team, right away,
          rather than arrive in port a week later. The network has to be brought
          under control as early as possible, before someone ashore can wipe the
          drives. A specialist must be able to tell deliberate destruction of
          data from a failure of old equipment, because a prosecution will rest
          on it. Ship’s papers, seals and navigation data should be treated as
          possible forgeries until they have been checked.
        </p>

        <div className="callout">
          <p>
            The shadow fleet has learned to forge not only papers and flags but
            the ship’s digital footprint, and it does so right on board. The
            Americans were the first to see it from the inside. Europe should be
            ready, and respond to these combined threats now.
          </p>
        </div>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              U.S. Coast Guard Cyber Command — “Cyber Trends and Insights in the
              Marine Environment (CTIME) 2025”, June 2026. Section “Cyber
              Operations Aboard Dark Fleet Vessels”, pp. 20–22.{" "}
              <a href="https://www.uscg.mil/Portals/0/Images/cyber/CTIME2025.pdf">
                uscg.mil
              </a>
            </li>
            <li id="ref-2">
              Kenny Miltenberger, Shane Cancilla (U.S. Coast Guard, 2003 Cyber
              Protection Team) — “Taking on the Dark Fleet… in Cyberspace!”, DEF
              CON 34 slides, August 2026.{" "}
              <a href="https://media.defcon.org/DEF%20CON%2034/DEF%20CON%2034%20presentations/DEF%20CON%2034%20-%20Kenneth%20Miltenberger,%20Shane%20Cancilla%20-%20Taking%20on%20the%20Dark%20Fleet...%20in%20Cyberspace!.pdf">
                media.defcon.org
              </a>
            </li>
            <li id="ref-3">
              Euronews — “Belgium seizes Russian shadow fleet tanker in North
              Sea crackdown”, 01.03.2026.{" "}
              <a href="https://www.euronews.com/my-europe/2026/03/01/belgium-seizes-russian-shadow-fleet-tanker-in-north-sea-sanctions-crackdown">
                euronews.com
              </a>
            </li>
            <li id="ref-4">
              Euronews — “Sweden confiscates false-flagged Russian ‘shadow
              fleet’ ship, prosecutors say”, 29.04.2026.{" "}
              <a href="https://www.euronews.com/my-europe/2026/04/29/sweden-confiscates-false-flagged-russian-shadow-fleet-ship-prosecutors-say">
                euronews.com
              </a>
            </li>
            <li id="ref-5">
              gCaptain — “EU Naval Force Boards Sanctioned Russian Shadow Fleet
              Tanker Over Suspected False Flag”, 22.07.2026.{" "}
              <a href="https://gcaptain.com/eu-naval-force-boards-sanctioned-russian-shadow-fleet-tanker-over-suspected-false-flag/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-6">
              Follow the Money — “Hundreds of shadow fleet ships sail under a
              false flag. The West is coming for them – but is it fast enough?”,
              12.02.2026.{" "}
              <a href="https://www.ftm.eu/articles/hundreds-of-shadow-fleet-ships-sail-under-false-flag">
                ftm.eu
              </a>
            </li>
            <li id="ref-7">
              USNI News — “U.S. Targeting Shadow Oil Fleets Using U.N. Law of
              the Sea Convention, Former Coast Guard JAGs Say”, 22.01.2026.{" "}
              <a href="https://news.usni.org/2026/01/22/u-s-targeting-shadow-oil-fleets-using-u-n-law-of-the-sea-convention-former-coast-guard-jags-say">
                news.usni.org
              </a>
            </li>
            <li id="ref-8">
              Wikipedia — “2025–2026 United States oil blockade of Venezuela”,
              table of seizures, revision as of 05.10.2026.{" "}
              <a href="https://en.wikipedia.org/wiki/2025%E2%80%932026_United_States_oil_blockade_of_Venezuela">
                wikipedia.org
              </a>
            </li>
            <li id="ref-9">
              Wikipedia — “Russian shadow fleet”, section on ship seizures,
              revision as of 05.10.2026.{" "}
              <a href="https://en.wikipedia.org/wiki/Russian_shadow_fleet">
                wikipedia.org
              </a>
            </li>
            <li id="ref-10">
              The Maritime Executive — “Indian Coast Guard Busts Three
              Iran-Linked Shadow Fleet Tankers”, 08.02.2026.{" "}
              <a href="https://maritime-executive.com/article/indian-coast-guard-busts-three-iran-linked-shadow-fleet-tankers">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-11">
              Army Recognition — “Italian Navy Boards Russian Shadow Fleet
              Tanker During EU Sanctions Mission in Mediterranean”, 2026.{" "}
              <a href="https://www.armyrecognition.com/news/navy-news/2026/italian-navy-boards-russian-shadow-fleet-tanker-during-eu-sanctions-mission-in-mediterranean">
                armyrecognition.com
              </a>
            </li>
            <li id="ref-12">
              The Moscow Times — “European Forces Intercept Russian ‘Shadow
              Fleet’ Tanker in Mediterranean”, 31.08.2026.{" "}
              <a href="https://www.themoscowtimes.com/2026/08/31/european-forces-intercept-russian-shadow-fleet-tanker-in-mediterranean-a93610">
                themoscowtimes.com
              </a>
            </li>
            <li id="ref-13">
              Al Jazeera — “UK boards and seizes Russian shadow fleet tanker in
              English Channel”, 14.06.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/6/14/uk-boards-and-seizes-russian-shadow-fleet-tanker-in-english-channel">
                aljazeera.com
              </a>
            </li>
            <li id="ref-14">
              Windward — “Sweden Seizes Shadow Fleet Tanker Jin Hui”,
              27.08.2026.{" "}
              <a href="https://windward.ai/knowledge-base/sweden-seizes-shadow-fleet-tanker-jin-hui-the-false-flag-problem-is-bigger-than-one-ship/">
                windward.ai
              </a>
            </li>
            <li id="ref-15">
              DEF CON 34 — Main Stage programme, abstract of “Taking on the Dark
              Fleet… in Cyberspace!” and speaker biographies, August 2026.{" "}
              <a href="https://defcon.org/html/defcon-34/dc-34-speakers.html">
                defcon.org
              </a>
            </li>
            <li id="ref-16">
              McCrary Institute, Cyber Focus Podcast No. 139 — “Boarding the
              Dark Fleet: Coast Guard Cyber and Maritime Security with RADM
              Jason Tama”, 18.08.2026. Transcript.{" "}
              <a href="https://mccraryinstitute.com/cyber-focus-podcast/139/boarding-the-dark-fleet-coast-guard-cyber-and-maritime-security-with-radm-jason-tama/">
                mccraryinstitute.com
              </a>
            </li>
            <li id="ref-17">
              The Insider — “‘Shadow fleet’ vessels found to have remote control
              and data deletion software, which creates risk of explosion and
              oil spills, WSJ reports”, 16.06.2026. A summary of The Wall Street
              Journal’s “The Dangerous Tech Found Aboard ‘Dark-Fleet’ Tankers
              Captured by the U.S.” of 15.06.2026.{" "}
              <a href="https://theins.press/en/news/293776">theins.press</a>
            </li>
            <li id="ref-18">
              Spotmedia.ro — “Time bombs on the oceans: Dangerous technology on
              board tankers captured by the USA”, 17.06.2026. A summary of The
              Wall Street Journal’s story; Rear Admiral Barata’s words as
              summarised.{" "}
              <a href="https://spotmedia.ro/en/news/news/time-bombs-on-the-oceans-dangerous-technology-on-board-tankers-captured-by-the-usa">
                spotmedia.ro
              </a>
            </li>
            <li id="ref-19">
              The Maritime Executive, Peter Boerstling, Giangiuseppe Pili —
              “Russia’s ‘Syria Express’ Convoys May Be Combining Multiple AIS
              Tricks”, 27.05.2026.{" "}
              <a href="https://maritime-executive.com/article/russia-s-syria-express-convoys-may-be-combining-multiple-ais-tricks">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-20">
              The Maritime Executive — “Russian Warship Spotted Escorting Two
              Inbound Stateless Tankers”, 23.06.2025.{" "}
              <a href="https://maritime-executive.com/article/russian-warship-spotted-escorting-two-inbound-stateless-tankers">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-21">
              Kyiv Post — “Russian Warship Masked Identity to Move Through
              English Channel”, 24.06.2025.{" "}
              <a href="https://www.kyivpost.com/post/55116">kyivpost.com</a>
            </li>
            <li id="ref-22">
              Bellingcat — “Heading Off: New Technique Helps Track Grain
              Smuggling Expansion to Libya”, 12.06.2026.{" "}
              <a href="https://www.bellingcat.com/news/2026/06/12/shadow-fleet-russian-grain-stolen-ukraine-libya-ais-technique-grumant/">
                bellingcat.com
              </a>
            </li>
            <li id="ref-23">
              gCaptain (Reuters) — “France Probes Sanctioned Russian-Linked
              Tanker Off Atlantic Coast”, 30.09.2025.{" "}
              <a href="https://gcaptain.com/france-probes-sanctioned-russian-linked-tanker-off-atlantic-coast/">
                gcaptain.com
              </a>
            </li>
            <li id="ref-24">
              The Insider — “Chinese captain of Russian ‘shadow fleet’ tanker
              Boracay sentenced to 1 year in prison in France”, 30.03.2026.{" "}
              <a href="https://theins.press/en/news/290909">theins.press</a>
            </li>
            <li id="ref-25">
              Just Security, Rob McLaughlin, Conor McLaughlin — “Law of the Sea
              Assessment of the seizure of Bella 1 / Marinera”, 14.01.2026.{" "}
              <a href="https://www.justsecurity.org/128760/law-sea-assessment-boarding-bella1-marinera/">
                justsecurity.org
              </a>
            </li>
            <li id="ref-26">
              CNN — “A painted flag, a Russian bluff and an 18-day chase across
              the Atlantic”, 10.01.2026.{" "}
              <a href="https://www.cnn.com/2026/01/10/politics/a-painted-flag-a-russian-bluff-and-an-18-day-chase-across-the-atlantic">
                cnn.com
              </a>
            </li>
            <li id="ref-27">
              USNI News, Mallory Shelbourne, Sam LaGrone — “Coast Guard Seizes
              Russian-flagged Tanker in North Atlantic, Second Tanker in
              Caribbean”, 07.01.2026.{" "}
              <a href="https://news.usni.org/2026/01/07/coast-guard-seizes-russian-flagged-tanker-in-north-atlantic-second-tanker-in-caribbean">
                news.usni.org
              </a>
            </li>
            <li id="ref-28">
              Splash247, Sam Chambers — “Eagle S trial exposes voyage data
              recorder blackout during Baltic rampage”, 27.08.2025.{" "}
              <a href="https://splash247.com/eagle-s-trial-exposes-voyage-data-recorder-blackout-during-baltic-rampage/">
                splash247.com
              </a>
            </li>
            <li id="ref-29">
              Helsinki Times — “Black box offline during cable damage by Russian
              tanker Eagle S”, 26.08.2025.{" "}
              <a href="https://www.helsinkitimes.fi/finland/finland-news/domestic/27770-black-box-offline-during-cable-damage-by-russian-tanker-eagle-s.html">
                helsinkitimes.fi
              </a>
            </li>
            <li id="ref-30">
              CBS News — “Coast Guard, FBI boarded Texas-bound oil tanker after
              ship’s network was potentially breached”, 15.09.2026. Claims by
              Iranian media presented as unconfirmed.{" "}
              <a href="https://www.cbsnews.com/news/coast-guard-fbi-board-oil-tanker-texas/">
                cbsnews.com
              </a>
            </li>
            <li id="ref-31">
              CyberScoop — “Coast Guard, FBI board US-bound foreign ships in
              order to probe for cyberattacks”, 16.09.2026.{" "}
              <a href="https://cyberscoop.com/coast-guard-fbi-investigate-tanker-cyberattacks/">
                cyberscoop.com
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
