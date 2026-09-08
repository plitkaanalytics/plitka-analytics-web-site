import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
import "../../../(main)/articles/syriyskyi-ekspres/scroll-map.css";
import "../../../(main)/articles/syriyskyi-ekspres/libya-map.css";
import "../../../(main)/articles/syriyskyi-ekspres/tartus-plan.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, formatDate } from "@/lib/articles";
import { XPost } from "@/components/XPost";
import { TartusMap } from "@/components/TartusMap";
import { NorthRoutesMap } from "@/components/NorthRoutesMap";
import { LibyaMap } from "@/components/LibyaMap";
import { TartusPlan } from "@/components/TartusPlan";
import { AisConvoyMap } from "@/components/AisConvoyMap";

export const metadata: Metadata = {
  title: "The Syrian Express Changes Course — PLITKA Analytics",
  openGraph: {
    images: ["/articles/syriyskyi-ekspres/cover.jpg"],
  },
  description:
    "An OSINT breakdown of Russian naval logistics after the fall of Assad: how convoys carrying weapons for the Sahel now sail from Murmansk and Baltiysk. Who carries them, through which ports, and what the new Syrian authorities actually cancelled.",
};

const SLUG = "syrian-express-changes-course";

export default function Page() {
  const all = getAllArticles("en");
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);

  return (
    <main data-screen-label="Story · The Syrian Express">
      {/* ============ ARTICLE HEAD ============ */}
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Investigation</span>
        <h1>The Syrian Express changes course</h1>
        <p className="article-head__metaline">38 min read</p>
        <p className="article-head__dek">
          How the loss of Tartus hit Russiaʼs military logistics in the Middle
          East and Africa — and how the aggressor is making up for it
        </p>
      </div>

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/syriyskyi-ekspres/cover.jpg"
            alt="The port of Tartus from the sea: quays, gantry cranes and ships by the mole"
          />
        </div>
        <p className="lede">
          For thirteen years Russia kept a permanent naval group in the
          Mediterranean. It rested on a single port — Tartus in Syria, a Russian
          military base with considerable reach across the Mediterranean and the
          Middle East. In December 2024 the regime that guaranteed that presence
          fell in two weeks. Yet the Africa Corps still exists and has to
          survive in new conditions. How exactly Russia keeps its
          extraterritorial forces supplied is what we take apart below.
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        {/* ===================== INTRO ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Introduction</span>Tartus
        </h2>

        <p>
          Tartus is a small port on the Syrian coast, some 150 kilometres north
          of Beirut. The Soviet Union obtained a logistics support point there
          back in <strong>1971</strong>, when it lost its Egyptian ports and had
          to move its Mediterranean ship repair base somewhere. After the
          collapse of the USSR the 720th support point lay idle for almost
          twenty years, until the base and the squadron were restored against
          the backdrop of the Syrian civil war. Until recently Russia had only
          two naval bases abroad: Sevastopol and Tartus.
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          The importance of Tartus is out of all proportion to its size, and the
          reason is technical. The port gave three things: fuel, supplies and —
          most importantly — <strong>repairs</strong>. It was the repair base
          that let Russian ships stay away from home for months. Without it, a
          ship that breaks down thousands of kilometres from its own yards
          either sails home or stops working
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          This was the foundation the Russian group in the Mediterranean rested
          on — the <strong>5th Operational Squadron</strong>, re-established in
          2010. On paper it was to have fifteen pennants; in practice it was
          three frigates, one or two submarines and several auxiliaries
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . Analysts who follow the fleet put the real presence of recent years
          at no more than eleven ships, three to five of them auxiliaries
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          Russia neither intended nor was able to fight seriously with such a
          force. The squadron did other work: it showed the flag, gathered
          intelligence, escorted Iranian oil tankers to Syria so that no one
          would try to stop them, and from 2015 struck Assadʼs opponents with
          Kalibr missiles. Above all it simply <em>was there</em>: a permanent
          presence beside NATOʼs southern flank is in itself a serious lever on
          the alliance.
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <TartusMap lang="en" />

        <p>
          The first crack in the structure appeared before Assad fell. On{" "}
          <strong>28 February 2022</strong>, four days after the start of the
          full-scale invasion, Turkey closed the straits to warships. The
          Mediterranean squadron lost its link with the Black Sea Fleet: from
          then on it could only be reinforced from the Baltic and the North,
          sailing all the way around Europe
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          But the final collapse of the logistics came at the end of November
          2024, when the coalition led by Hayat Tahrir al-Sham began its
          offensive against government forces and took Aleppo. On{" "}
          <strong>8 December</strong> Damascus fell. Assad was flown out of that
          same Khmeimim and ended up in Moscow
          <a className="ref" href="#ref-13">
            [13]
          </a>
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <div className="callout">
          <p>
            In two weeks Russia lost the guarantor who had given it a repair
            base for the fleet, an airfield for the African flights and legal
            immunity for its military. The question that followed mattered a
            great deal: how much of that could be salvaged — and at what price.
          </p>
        </div>

        <p>
          In April 2022 the Mediterranean held
          <a className="ref" href="#ref-9">
            [9]
          </a>
          :
        </p>

        <ul>
          <li>
            two Project 1164 cruisers — <em>Varyag</em> and{" "}
            <em>Marshal Ustinov</em>;
          </li>
          <li>two Project 1155 destroyers;</li>
          <li>
            the Project 22350 frigate <em>Admiral Kasatonov</em> and the Project
            11356 frigate <em>Admiral Grigorovich</em>;
          </li>
          <li>two Improved Kilo submarines;</li>
          <li>
            the Project 21631 small missile ship <em>Orekhovo-Zuyevo</em> — a
            Kalibr carrier;
          </li>
          <li>
            intelligence ships, minesweepers and auxiliary vessels.
          </li>
        </ul>

        <p>
          <strong>As of 1 July 2026</strong> there were no combat ships left:
          the frigate <em>Admiral Kasatonov</em> and the replenishment tanker{" "}
          <em>Akademik Pashin</em> were already in the Atlantic after calling at
          Algiers. Open sources do not say when exactly they left — 1 July is
          the date of the first report, not of the event
          <a className="ref" href="#ref-9">
            [9]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">
            Clarification · what the zero actually means
          </div>
          <p>
            It is worth noting that when the worldʼs media wrote about an
            absence of ships in the Mediterranean, they meant large surface
            combatants. Project 21980 and 03160 boats were recorded at Tartus in
            June 2026
            <a className="ref" href="#ref-15">
              [15]
            </a>
            . In January 2025 it was the <em>port</em> that was empty; in July
            2026 it was the <em>waters</em>.
          </p>
        </div>

        <p>
          What followed was mostly dramatised by the international press: Russia
          has left Syria, Russia has lost the Mediterranean, the Russian
          presence is disappearing. Those statements have grounds. But they
          buried events that were unfolding very close by.
        </p>

        {/* ===================== EXIT ===================== */}
        <h2>
          <span className="h2-num">§ 01 · Exit</span>The Russians go home
        </h2>

        <p>
          The first thing the Russian navy did was take its ships out of the
          harbour. The reason is simple: a base in a port no longer held by an
          ally turns from shelter into a trap. A ship at the quay cannot
          manoeuvre, and nobody knew who would hold the shore the following
          week.
        </p>

        <figure className="fig">
          <img
            src="/articles/syriyskyi-ekspres/tartus-gate.webp"
            alt="The entrance gate of the Tartus naval base: a stone arch with Arabic lettering and an anchor, an armed fighter in field uniform standing with his back to the camera in front of it"
          />
          <figcaption>
            The gate of the Tartus base after the fall of the regime. The
            sentry at the entrance already answers to the new Syrian
            authorities, not to Russian security.
          </figcaption>
        </figure>

        <p>
          On 3 December 2024 the ships began to leave. By evening satellite
          imagery analysts recorded empty quays. Two frigates left the base —
          one Project 22350, one Project 11356 — together with one Improved Kilo
          and two auxiliaries, among them the tanker <em>Yelnya</em>
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          That same day, according to TASS, the submarine B-261{" "}
          <em>Novorossiysk</em> fired a Kalibr at a barge target at sea. She
          fired alongside the frigates <em>Admiral Gorshkov</em> and{" "}
          <em>Admiral Golovko</em>, under the command of the navyʼs
          commander-in-chief, Admiral Alexander Moiseyev. These were
          demonstration exercises. It may be that the exercises were exactly how
          the Russian military tried to explain its own manoeuvres and cover the
          shipsʼ departure to sea. But neither the submarine nor the surface
          group ever returned to Tartus
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          Five days later the Russian foreign ministry announced that the base
          had been put on heightened alert. The same day the Rybar channel,
          considered close to the Russian defence ministry, wrote that Russiaʼs
          military presence in the Middle East was “hanging by a thread”. Its
          list was specific: the ships had left Tartus and taken station off the
          coast for safety; Khmeimim was effectively cut off after rebels seized
          a neighbouring town; Kurdish forces had begun blockading Russian sites
          beyond the Euphrates; positions at the oil facility in Homs had been
          shut off
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          A day later Kremlin spokesman Dmitry Peskov said channels of
          communication had been opened with Hayat Tahrir al-Sham — to negotiate
          keeping the naval and air bases
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . At the same time Ukraineʼs HUR reported that a frigate and a dry
          cargo ship had been withdrawn from Tartus, and that the remaining
          weapons were being flown out of Khmeimim by military transport
          aircraft. Intelligence estimated that “several hundred” Russian
          special forces remained at Tartus, overseeing the evacuation
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          On the night of <strong>2 January 2025</strong>{" "}
          <em>Novorossiysk</em> passed through the Strait of Gibraltar westbound
          and left the Mediterranean. The passage was logged by the watch of the
          British patrol ship HMS <em>Cutlass</em>
          <a className="ref" href="#ref-16">
            [16]
          </a>
          . On 14 January the submarine passed the Danish straits on her way to
          the Baltic, escorted by the corvette <em>Boikiy</em>
          <a className="ref" href="#ref-17">
            [17]
          </a>
        </p>

        <div className="callout">
          <p>
            <em>Novorossiysk</em> and <em>Krasnodar</em> are assigned to the
            Black Sea Fleet and based at Sevastopol. When the full-scale
            invasion began in February 2022 both were in the Mediterranean — and
            could no longer go home: Turkey had closed the straits
            <a className="ref" href="#ref-17">
              [17]
            </a>
            .
          </p>
        </div>

        <p>
          At the end of January the equipment began to be shipped out. A Maxar
          image from <strong>25 January 2025</strong> shows the ro-ros{" "}
          <em>Sparta</em> and <em>Sparta II</em> under the Russian flag at the
          Tartus quay — before that they had waited several days at anchor for
          permission to enter. A Planet Labs image from{" "}
          <strong>27 January</strong> records that the equipment which had piled
          up on the quay for weeks was gone and one of the two ships had left;
          beside it a dense mass of containers had appeared
          <a className="ref" href="#ref-23">
            [23]
          </a>
          .
        </p>

        <figure className="fig fig--bleed fig--pair">
          <div className="fig__row">
            <img
              src="/articles/syriyskyi-ekspres/tartus-pier-loaded.webp"
              alt="Satellite image of the mole in the port of Tartus: several rows of military vehicles, dozens of them packed tightly along the quay"
            />
            <img
              src="/articles/syriyskyi-ekspres/tartus-sparta-berthed.webp"
              alt="Satellite image of the Tartus quay: two ro-ro ships moored side-on to the mole, with gantry cranes and stacks of containers nearby"
            />
          </div>
          <figcaption>
            Left — the mole packed with equipment that had been piling up for
            weeks. Right — <em>Sparta</em> and <em>Sparta II</em> at the quay on
            25 January: the ships that came for it. Both waited several days at
            anchor before being let into the port. Maxar imagery.
          </figcaption>
        </figure>

        <p>
          The withdrawal was covered from the air: Ka-52s and Mi-8s worked over
          the port, and a Project 21980 <em>Grachonok</em> boat — designed
          precisely for guarding an anchorage — stood in the harbour itself. The
          same was done while Khmeimim was being wound down. It meant
          dismantling the baseʼs existing defences — and, accordingly, its
          growing vulnerability, above all to drones
          <a className="ref" href="#ref-26">
            [26]
          </a>
          .
        </p>

        <XPost
          user="kromark"
          id="1883930929913336169"
          fallback="A Planet Labs image from 27 January 2025: the equipment on the Tartus quay is gone along with the departure of Sparta II, and containers now stand packed tightly beside it."
          caption={
            <>
              What analysts saw on 27 January: the yard beside the quay had
              emptied, and the containers next to it had been packed tighter. A
              post by Mark Krutov with Planet Labs satellite imagery.
            </>
          }
        />

        <p>
          On <strong>2 February 2025</strong> all Russian ships previously based
          at Tartus were reported as gone. Satellite imagery at the same time
          showed them still present nearby, in Syrian territorial waters
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          A snapshot of May 2026 shows that the Russians were still trying to be
          present in the Mediterranean, but their forces had shrunk by almost
          half compared with the Tartus period. At that point the sea held
          <a className="ref" href="#ref-12">
            [12]
          </a>
          :
        </p>

        <ul>
          <li>
            <em>Admiral Grigorovich</em> — off Tartus;
          </li>
          <li>
            the corvette <em>Soobrazitelny</em> and the auxiliary{" "}
            <em>Kola</em> — off the Moroccan coast;
          </li>
          <li>
            the tanker <em>Vyazma</em> — on a visit to Alexandria;
          </li>
          <li>
            the intelligence ship <em>Viktor Leonov</em> — shadowing the HMS{" "}
            <em>Prince of Wales</em> carrier group off Sicily and refuelling in
            Algiers.
          </li>
        </ul>

        <p>
          In July 2026, for the first time since 2013, not a single Russian
          warship was left in the Mediterranean.
          <a className="ref" href="#ref-24">
            [24]
          </a>
          .
        </p>

        {/* ===================== THE CORRECTION ===================== */}
        <h2>
          <span className="h2-num">§ 02 · Negotiations</span>The lease that was
          never cancelled
        </h2>

        <p>
          While the ships were leaving the harbour, the fate of the base itself
          was being decided in Damascus — and here it is worth stepping back two
          weeks. On <strong>22 January 2025</strong> reports appeared that the
          new Syrian authorities had torn up the agreement on the Russian
          military base at Tartus — the very one signed in 2017 for 49 years.
          The Moscow Times relayed this citing the Syrian opposition outlet
          Shaam, which in turn cited the ministry of information
          <a className="ref" href="#ref-14">
            [14]
          </a>
          . The wording spread through dozens of stories and settled in as fact.
        </p>

        <p>
          What was actually cancelled was something else. Back on{" "}
          <strong>19 January</strong> the head of Tartus customs, Riyad Judi,
          told the newspaper Al-Watan that the interim government had terminated
          the <strong>2019</strong> agreement with a former subsidiary of
          Stroytransgaz on refurbishing the <strong>civilian part</strong> of
          the port. It had nothing to do with the naval base agreement
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . The disinformation nevertheless kept spreading through the worldʼs
          media
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . TWZ, the outlet that first published satellite imagery of the
          withdrawal, cautiously called those reports unconfirmed
          <a className="ref" href="#ref-23">
            [23]
          </a>
          .
        </p>

        <div className="callout callout--warn">
          <p>
            The difference is not terminological. The cancelled commercial
            contract meant Russia had lost the civilian berth and the revenue
            from it. The base agreement remained in force — which is exactly why
            negotiations over the future of Tartus went on for another year and
            a half.
          </p>
        </div>

        <p>
          The confusion in the information space persisted. A month later the
          Russian company STG Engineering said it was still running the port and
          had received no notice of cancellation. Stroytransgaz at the same time
          denied having anything to do with the port at all, and said it was not
          connected to STG Engineering
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          The port did eventually change hands, in favour of the Gulf. On{" "}
          <strong>13 November 2025</strong> the Emirati DP World began
          operations in Tartus under a thirty-year concession
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          The status of the military base itself was still awaiting review. On{" "}
          <strong>15 October 2025</strong>, at a meeting with Putin where — by
          the Russian sideʼs account — the status of Tartus and Khmeimim was on
          the agenda, Syrian president Ahmed al-Sharaa said: “we respect all
          agreements concluded”. Journalists read that as consent to Russia
          continuing to use both bases. Four days earlier Russia had begun
          supplying Khmeimim by road convoys from Tartus — at least five times
          in the first half of the month
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          The final revision came on <strong>9 August 2026</strong>. The
          memorandum had been about eighteen months in preparation. It handed
          Khmeimim and the fourth commercial berth at Tartus to civilian
          management, while the military facilities were to become training
          centres after a three-month transition. Russian troops may stay — but
          on Damascusʼs terms
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Assessment · the regional press</div>
          <p className="qtbox__quote">
            The agreement does not mean a complete withdrawal of Russian forces
            from Syria. But, judging by what has been announced, it does mean
            the end of the “Russian bases” model established under Assad, and a
            shift to a new presence regulated by the consent of Syriaʼs new
            government.
          </p>
          <div className="qtbox__cite">
            Ibrahim Hamidi, editor-in-chief of the Saudi outlet Al-Majalla
            <a className="ref" href="#ref-13">
              [13]
            </a>
          </div>
        </div>

        <TartusPlan lang="en" />

        {/* ===================== THE TURN ===================== */}
        <h2>
          <span className="h2-num">§ 03 · The squadron</span>Will the navy come
          back
        </h2>

        <p>
          Tartus offered not so much a berth as repairs. It is the repair base
          that explains why ships like <em>Admiral Grigorovich</em> did not go
          home for months. Without it the ratio of combatants to auxiliaries
          shifts in favour of the latter, and to keep up the same presence you
          have to deploy still more ships
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          The problem runs deeper than one port. The Russian navy is built
          around ships of the near sea zone with limited endurance; without an
          intermediate base their ability to hold station in an area drops
          sharply
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <h3>One submarine as the measure</h3>

        <p>
          What the loss of a repair base means is best seen through a single
          ship — that same <em>Novorossiysk</em> that left Tartus first.
        </p>

        <p>
          The submarineʼs departure was not a decision but a dead end. Russia
          made considerable diplomatic efforts in Libya, Egypt and Algeria — but
          found no basing for its submarine component, and that forced it to
          withdraw the boat
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          In September 2025 the submarine suffered serious damage from a fuel
          system failure. By October she was already returning to the Baltic{" "}
          <strong>on the surface</strong>
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . By another account of the same event, the breakdown happened in
          waters near Gibraltar, and the boat was towed by{" "}
          <em>Yakov Grebelsky</em> under British and Dutch observation
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/syriyskyi-ekspres/novorosiysk_goes_home.png"
            alt="A grey hazy sea: the submarine Novorossiysk running on the surface, her sail and part of the hull visible; in the distance to the left a French Navy frigate escorting her"
          />
          <figcaption>
            <em>Novorossiysk</em> running on the surface under the eye of a
            French frigate. For a diesel-electric boat a surface passage means
            she cannot dive: there is nowhere left in the region to repair her.
          </figcaption>
        </figure>

        <p>
          The second boat, <em>Krasnodar</em>, repeated her sisterʼs story. On
          23 December 2024 the Russian defence ministry reported torpedo firings
          in the Baltic after repairs at Kronstadt. On 3 February 2025 the
          submarine passed the Great Belt into the Skagerrak together with the
          same tug <em>Yevgeny Churov</em>; on 11 February she was outside
          Portuguese territorial waters. She was shadowed by the Danish patrol
          vessel HDMS <em>Triton</em>, and in the German zone of the Baltic by
          the federal police boats <em>Bamberg</em> and <em>Neustadt</em>
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . On 27 April <em>Krasnodar</em> left the Mediterranean{" "}
          <strong>with no replacement</strong> — an unusual situation for the
          Russian navy. That gives grounds to think the departure was not
          planned
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <p>
          So without a repair base, and after losing that capability at Tartus,
          the Mediterranean group was doomed to fade away. And the absence of
          any prospect of building such a port raised the question of Russiaʼs
          ambitions in the region.
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          Three possible replacements for Tartus are named. None of them closes
          the task fully.
        </p>

        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>What is there</th>
              <th>Why it is not a replacement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Algeria</strong>
              </td>
              <td>
                13 commercial ports, ship repair, its own Kilo-class submarines,
                Russian instructors at five sites
              </td>
              <td>
                Article 31 of the constitution directly forbids foreign military
                bases. Requests for a base at Mers El Kébir were refused in 1968
                and 2001
                <a className="ref" href="#ref-12">
                  [12]
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Port Sudan</strong>
              </td>
              <td>
                An agreement on Russiaʼs first base in Africa, announced in 2025
              </td>
              <td>
                Designed capacity — four ships. In its present state the port
                cannot service a formation; years of dredging are needed. The
                Suez Canal is a chokepoint for passages meant to go unnoticed
                <a className="ref" href="#ref-11">
                  [11]
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tobruk</strong>
              </td>
              <td>
                Existing quays, an airfield nearby, deliveries already running
              </td>
              <td>
                No dry dock, few berths of the required size; the port was never
                the main base of the Libyan navy
                <a className="ref" href="#ref-11">
                  [11]
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          The Algerian option has more than constitutional problems. The country
          buys enormous volumes of Russian weapons — estimates differ: RUSI
          writes of about 85 per cent of its military equipment and training,
          the Maritime Executive of about 70 per cent of its armaments
          <a className="ref" href="#ref-11">
            [11]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . But tension has crept into the relationship over Russian actions in
          neighbouring Mali that run against Algerian interests, and over
          Algeriaʼs need to avoid falling out with the United States and the UAE
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <p>
          The most detailed analysis by researchers comes out in favour of
          Tobruk. It amounts to calling it the lesser evil. A position south of
          Crete brings ships closer to the central Mediterranean: closer to a
          potential adversaryʼs forces on the one hand, but with a Kalibr
          engagement zone that covers most of Europe. Tankers and Project 304{" "}
          <em>Amur</em> repair ships could keep a formation combat-capable, as
          was done at Tartus. The fuel scheme can be repeated — export crude on
          civilian tankers and bring in aviation fuel
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <p>
          Cargo does indeed already go there, and was going there before Assad
          fell. In early April 2024 between one thousand and fifteen hundred
          fighters, mostly former Wagner men, were moved to southern Libya,
          while ships delivered <strong>6,000 tonnes</strong> of equipment to
          Tobruk — light and heavy pickups, trucks, anti-aircraft artillery. The
          Al-Jufra airfield became the headquarters
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . In 2024 there was also a “Libyan express” — at least four transport
          runs
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <LibyaMap lang="en" />

        <p>
          The network of sites in Libya has grown markedly in two years. Besides
          Al-Jufra, there is the <strong>Al-Khadim</strong> air base east of
          Benghazi, the <strong>Ghardabiya</strong> airfield that is called “the
          new Khmeimim”, <strong>Brak al-Shati</strong> and — most tellingly —{" "}
          <strong>Maaten al-Sarra</strong> in the south-east, near the borders
          with Chad and Sudan. The last of these had not been used since 2011,
          since Gaddafiʼs time; satellite imagery shows a restored runway, new
          storage buildings and reinforced logistics capability
          <a className="ref" href="#ref-20">
            [20]
          </a>
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          The point of that particular base is explained by the Middle East
          research platform Eekad: it “allows Moscow to control supply routes
          and eases the movement of equipment and personnel into the African
          Sahel while avoiding international attention to large ports and
          airports”
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          Ukraineʼs HUR tracked at least <strong>ten flights</strong> from
          Khmeimim to eastern Libya from mid-December 2024
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . Le Monde documented <strong>eight flights</strong> across December
          and January
          <a className="ref" href="#ref-31">
            [31]
          </a>
          . And CNN, which analysed tracking data itself, writes of{" "}
          <strong>more than one flight a day</strong> from mid-December — An-124s
          and Il-76s from Khmeimim to Al-Khadim
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <p>
          One such flight was traced from beginning to end. On 16 May 2025 an
          An-124 with tail number <strong>RA-82030</strong> — an aircraft of the
          224th Flight Unit, a structure of the Russian defence ministry — took
          off near Khmeimim, disappeared from the trackers over the
          Mediterranean an hour later and reappeared north of Egypt. On 18 May a
          Maxar satellite image caught it on the runway at Al-Khadim, and
          between 20 and 26 May the aircraft showed up in Bamako and Ouagadougou
          <a className="ref" href="#ref-31">
            [31]
          </a>
          . An aviation engineer who spoke to RFI called the loss of signal
          “very much like a deliberate switch-off” — the same trick as the
          ships, only in the air.
        </p>

        <p>
          Estimates of numbers kept rising, though they count different things:
          1,000–1,500 fighters in southern Libya in early April 2024 — and
          2,000–2,500 at military sites across the country by August of the same
          year
          <a className="ref" href="#ref-21">
            [21]
          </a>
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          But the political risk remains. Unlike Assad, Khalifa Haftar is not an
          international outcast and keeps working relations, including with
          France. The terms of access may turn out to be the kind Hafez
          al-Assad once set: the fleet was barred from keeping shore facilities
          and had to make do with floating workshops. And if Haftar decides
          other alliances pay better, being squeezed out is not impossible — as
          happened in Egypt under Sadat
          <a className="ref" href="#ref-11">
            [11]
          </a>
        </p>

        <p>
          Ironically, history is repeating itself. Tartus itself was a
          consolation prize for the Soviet navy after the loss of the Egyptian
          ports in the 1970s: a small harbour, limited access, a poor
          replacement for Alexandria
          <a className="ref" href="#ref-11">
            [11]
          </a>
          . The Soviet Mediterranean squadron was reinforced by ships of three
          fleets — Northern, Baltic and Black Sea — precisely because it had no
          ports of its own. Repairs and supply were done from tankers and
          floating workshops at anchor in international waters — in the gulfs of
          Hammamet, Sidra and Alboran. Now the Russians are again working out
          how to live without Tartus
          <a className="ref" href="#ref-22">
            [22]
          </a>
          .
        </p>

        <p>
          The Russian side offered its own assessment of the problem — in
          December 2024, before it became clear how it would all end. The
          military channel Rybar wrote that after Syria the next logistics hub
          would be Libya. And it immediately named the limits: Russian aircraft
          can only reach Libya without refuelling when empty, so supplying
          operations in Africa through it “becomes very expensive and unstable”.
          <a className="ref" href="#ref-18">
            [18]
          </a>
          .
        </p>

        <p>
          The Russian bloggerʼs assessment matches that of the Institute for the
          Study of War: the loss of the bases would disrupt the logistics,
          supply and rotations of the Africa Corps, weakening operations in
          Libya and sub-Saharan Africa most of all.
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . British defence intelligence put it in January 2025 as a Kremlin
          priority: to preserve the ability to sustain its military and private
          military companies in Africa — and at the same time to limit the
          reputational damage from the fall of the Assad regime
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        {/* ===================== NOVOROSSIYSK ===================== */}
        <h2>
          <span className="h2-num">§ 04 · Rebuild</span>The expressʼs new routes
        </h2>

        <NorthRoutesMap lang="en" />

        <p>
          In February 2025 Rear Admiral Mike Mattis, director of strategic
          effects for US Naval Forces Europe and Africa, described what had
          happened to the old route from Novorossiysk.
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">
            Assessment · US Naval Forces Europe and Africa
          </div>
          <p className="qtbox__quote">
            In 2022 — no problems at all, routine passages. In 2023 — a sharp
            reduction. In 2024 — a gradual decline to a full stop. In the end
            the supply of Tartus went via the Baltic. Instead of a five to
            seven-day passage we now observe a twelve to fourteen-day one.
          </p>
          <div className="qtbox__cite">
            Rear Admiral Mike Mattis on Syrian Express shipping out of the Black
            Sea
            <a className="ref" href="#ref-2">
              [2]
            </a>
          </div>
        </div>

        <p>
          Mattis is talking about the Syrian route, not the African one. Cargo
          ships did not stop sailing to Tartus — the journey got longer: instead
          of five to seven days from Novorossiysk it is now twelve to fourteen
          from the Baltic. The cause is common to both directions: once the
          Black Sea exit stopped working, everything Russia sends south began
          leaving from the Baltic and the Arctic — Syrian cargo and African
          cargo alike
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        {/* ===================== THE SHIPS ===================== */}
        <h2>
          <span className="h2-num">§ 05 · The ships</span>How the shipping
          actually works
        </h2>

        <p>
          What follows is a look at four ships whose stories are the most
          telling. They should be read not as a reference table but as a
          chronicle: the dates of each show how the Black Sea route was closing
          and where the ships were redirected afterwards.
        </p>

        <p>
          They belong to a narrow circle of companies, and that circle is not
          hidden by the Russian state. Most are assets of{" "}
          <strong>Oboronlogistika</strong>, a shipping company that works within
          the military construction complex of the Russian defence ministry and
          is the ministryʼs sole supplier of transport services. The formal
          owner of the specific ships is its subsidiary <strong>SK-Yug</strong>.
          Oboronlogistika does not conceal its affiliation: the link to the
          defence ministry is stated outright on its website, which also
          mentions a licence for work involving state secrets. The technical
          manager of <em>Sparta IV</em> is listed as the subsidiary
          OBL-Shipping. As of 2023 its director was <strong>Timur Ivanov</strong>
          , at the time Russiaʼs deputy defence minister responsible for
          procurement and military construction
          <a className="ref" href="#ref-28">
            [28]
          </a>
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <div className="dossier">
          <div className="dossier__intro">
            <p>
              Four ships around which most of the events revolve. Data from HUR
              sanctions dossiers.
            </p>
          </div>

          <details className="dossier-card" open>
            <summary>
              <div className="dossier-card__num">
                IMO
                <strong>9268710</strong>
              </div>
              <div className="dossier-card__main">
                {" "}
                <div className="dossier-card__proj">
                  Ro-ro · Oboronlogistika / SK-Yug
                </div>
                <div className="dossier-card__name">Sparta</div>
                <div className="dossier-card__strap">
                  126.42 m · 8,831 GT · the workhorse of both routes
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip">In service</span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  The ship carried military cargo and personnel between
                  Novorossiysk and Tartus. Former names — Scan Brasil, Hyundai
                  Buffalo, Hc Paulina; she sailed under the flags of the Isle of
                  Man, Germany, Antigua and Belize.
                </p>
                <p>
                  She left Baltiysk on 11 December 2024. On 5 January 2025 she
                  was recorded in Syriaʼs exclusive economic zone — the ship was
                  due to enter port that day, but as of the morning of 7 January
                  she was still steaming along the coast, probably waiting for
                  permission from the new authorities. She sailed together with
                  the large landing ships <em>Ivan Gren</em> and{" "}
                  <em>Alexander Otrakovsky</em>; on board the latter was the
                  chief of staff of the 121st landing ship brigade, Captain 1st
                  Rank Yuri Davityan
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
                <p>
                  <strong>18 April 2026</strong> — cargo from Kaliningrad to
                  Tartus, already after the fall of Assad. The link kept working
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
              </div>
              <div className="dossier-card__photo">
                <img
                  src="/articles/syriyskyi-ekspres/sparta.webp"
                  alt="The ro-ro Sparta alongside under her former name HC Paulina: dark blue hull, red underwater section, two cargo columns with cranes amidships"
                />
                <div className="dossier-card__photo-cap">
                  Photo · Sparta under her former name HC Paulina. Andreas
                  Modersitzki / MarineTraffic, from the HUR dossier
                </div>
              </div>
            </div>
          </details>

          <details className="dossier-card">
            <summary>
              <div className="dossier-card__num">
                IMO
                <strong>9743033</strong>
              </div>
              <div className="dossier-card__main">
                {" "}
                <div className="dossier-card__proj">
                  Dry cargo · 2018, Jiangsu Hongqiang
                </div>
                <div className="dossier-card__name">Sparta IV</div>
                <div className="dossier-card__strap">
                  122.2 m · two 55-t cranes · six runs to Tartus in 2023
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip">In service</span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Her design, certification and lifting capacity make her
                  convenient for heavy equipment such as T-90 tanks. She has
                  been used in naval logistics since 2018.
                </p>
                <p>
                  In 2023 she made at least <strong>six runs</strong> between
                  Tartus and Novorossiysk: 14–25 January, 1–6 March, 8–15 April,
                  16–25 May, 25 June — 15 July, 10 August. Each time she called
                  exclusively at the naval base terminals
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
                <p>
                  On the night of Sunday <strong>5 March 2023</strong> she
                  passed the Bosphorus with a draught of <strong>6.2 m</strong>,
                  which points to a heavy load; HUR assesses that she probably
                  carried missiles for S-300 systems — the same ones used to
                  shell Kharkiv. Loading took place at the base in Tartus, with
                  military equipment on the quay and the holds open
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
                <p>
                  On <strong>15 July 2023</strong> artillery systems were loaded
                  onto her in Novorossiysk — probably M-46, D-30 or 2B16 Nona.
                  They were delivered to Tartus on 7 August. After returning, on
                  30 August, the ship entered Sevastopol empty for scheduled
                  repairs
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
              </div>
              <div className="dossier-card__photo">
                <img
                  src="/articles/syriyskyi-ekspres/sparta-iv-at-sea.webp"
                  alt="The dry cargo ship Sparta IV under way: green hull, superstructure aft, two cargo columns with cranes above open holds"
                />
                <div className="dossier-card__photo-cap">
                  Photo · Sparta IV under her own name. Oliver Sesemann /
                  MarineTraffic, from the HUR dossier
                </div>
              </div>
            </div>
          </details>

          <details className="dossier-card">
            <summary>
              <div className="dossier-card__num">
                IMO
                <strong>9220639</strong>
              </div>
              <div className="dossier-card__main">
                {" "}
                <div className="dossier-card__proj">
                  Ro-ro · 2000, Peene-werft · MG-Flot
                </div>
                <div className="dossier-card__name">Baltic Leader</div>
                <div className="dossier-card__strap">
                  Seized by France in 2022 · now runs to Africa
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip dossier-card__chip--lost">
                  Sanctioned in five jurisdictions
                </span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Owned by MG-Flot, formerly Transmorflot. The ship is linked to
                  PSB Leasing, a structure of Promsvyazbank — the systemic state
                  bank that finances Russiaʼs defence industry and services the
                  state defence order.
                </p>
                <p>
                  In 2022 the ship was{" "}
                  <strong>seized by French customs</strong> for breaching EU
                  decision 2022/260. The seizure was a temporary measure, not a
                  confiscation: the ship was released, and HUR notes separately
                  that the Russian embassy in France pushed actively for that
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  . The owner changed too — in the HUR dossier MG-Flot is
                  recorded as owner from <strong>16 February 2022</strong>, that
                  is a week before the EU decision for breaching which the ship
                  was detained. The same dossier, however, writes that at the
                  moment of the seizure the ship belonged to PSB Leasing. Those
                  two statements in one document do not agree.
                </p>
                <p>
                  MG-Flot is linked to the Astrakhan businessman Dzhamaldin
                  Pashayev, whose business was built around the port of Olya —
                  the very one proposed as a key node of the North–South
                  transport corridor for trade with Iran
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
                <p>
                  Up to 2025 the ship worked between Russian ports — Baltiysk,
                  Kaliningrad, Belokamenka, Murmansk — and the ports of African
                  countries: <strong>Conakry, Algiers, Alexandria</strong>. The
                  full list of calls also includes Djibouti, Umm Qasr, Jeddah,
                  Chennai and Kolkata
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                  .
                </p>
              </div>
              <div className="dossier-card__photo">
                <img
                  src="/articles/syriyskyi-ekspres/baltic-leader.webp"
                  alt="The ro-ro Baltic Leader under way: red hull, her name on the side in Latin and Cyrillic script, two cranes, sections of pipe secured on deck"
                />
                <div className="dossier-card__photo-cap">
                  Photo · Baltic Leader off Świnoujście, 13 October 2021.
                  Gestumblindi / Wikimedia Commons, CC BY-SA 4.0
                </div>
              </div>
            </div>
          </details>

          <details className="dossier-card">
            <summary>
              <div className="dossier-card__num">
                IMO
                <strong>9538892</strong>
              </div>
              <div className="dossier-card__main">
                <div className="dossier-card__proj">
                  Dry cargo · 2009, Detlef Hegemann Rolandwerft
                </div>
                <div className="dossier-card__name">Ursa Major</div>
                <div className="dossier-card__strap">
                  Formerly Sparta III · sank on 24 December 2024
                </div>
              </div>
              <div className="dossier-card__chips">
                <span className="dossier-card__chip dossier-card__chip--lost">
                  Lost
                </span>
                <span className="dossier-card__toggle" />
              </div>
            </summary>
            <div className="dossier-card__body">
              <div className="dossier-card__lede">
                <p>
                  Former names — Scan Britania, Hyundai Britania, Eit Palmina
                  and <strong>Sparta III</strong>.
                </p>
                <p>
                  After long service on the Caspian between Russian and Iranian
                  ports, in September 2023 she moved to the Azov–Black Sea basin{" "}
                  <strong>with no AIS signal</strong>, and called at Tartus by
                  the same method — with the transponder switched off.
                </p>
              </div>
              <div className="dossier-card__photo">
                <img
                  src="/articles/syriyskyi-ekspres/ursa-major.webp"
                  alt="The dry cargo ship Ursa Major under her former name Eit Palmina, seen from ahead: dark blue hull, tall white superstructure, oversized cargo secured on deck"
                />
                <div className="dossier-card__photo-cap">
                  Photo · Ursa Major under her former name Eit Palmina. Juergen
                  Braker / MarineTraffic, from the HUR dossier
                </div>
              </div>
            </div>
          </details>
        </div>

        <h3>Where they moved in 2024</h3>

        <p>
          The runs from Novorossiysk listed in the cards above are 2022, 2023
          and early 2024. After that each shipʼs route changes, in favour of
          Russiaʼs northern ports.
        </p>

        <table>
          <thead>
            <tr>
              <th>Ship</th>
              <th>Black Sea route</th>
              <th>Where she moved</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ursa Major</td>
              <td>Novorossiysk — Tartus, 2022–2023</td>
              <td>
                <strong>from March 2024</strong> — Baltiysk, Kronstadt, St
                Petersburg
              </td>
            </tr>
            <tr>
              <td>Sparta IV</td>
              <td>six runs in 2023, one more in February 2024</td>
              <td>
                <strong>June 2024</strong> — the St Petersburg — Kaliningrad
                line, and at the end of the month a passage through the North
                Sea
              </td>
            </tr>
            <tr>
              <td>Baltic Leader</td>
              <td>first put on this route in February 2024</td>
              <td>
                <strong>up to 2025</strong> — Baltiysk and Murmansk ↔ Conakry,
                Algiers, Alexandria
              </td>
            </tr>
            <tr>
              <td>Sparta</td>
              <td>the same route earlier</td>
              <td>
                <strong>11 December 2024</strong> she leaves from Baltiysk
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          This is exactly the transformation Rear Admiral Mattis described, and
          it can be followed freely in the ship dossiers
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . <em>Baltic Leader</em> completes the whole arc within one year: in
          February 2024 she is put on the Novorossiysk — Tartus line for the
          first time, and by 2025 she is already sailing from the Baltic and the
          Arctic to Conakry and Algiers.
        </p>

        <p>
          The sanctions chronology around these ships shows how unevenly the
          route out of the Black Sea closed. The United States listed{" "}
          <em>Sparta</em> as early as <strong>May 2022</strong> — as property of
          SK-Yug. The EU did the same only in <strong>April 2026</strong>,
          Switzerland on 22 May 2026, Ukraine on 23 May, Canada on 12 June
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          It is worth noting that these ships are not a shadow fleet: they do
          not hide what they are for and have to reckon with direct sanctions.
          In July 2025, when the corvette <em>Boikiy</em> led <em>Sparta</em>{" "}
          and the tanker <em>General Skobelev</em> through the English Channel,
          the ship was under the sanctions of <strong>the United States only</strong>
          , not of Britain and not of the EU, whose exclusive economic zones she
          had just passed. <em>General Skobelev</em> was under no sanctions at
          all and sailed openly under the Russian flag, so formally she did not
          belong to any “shadow fleet”
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <p>
          The most natural question about this whole chronicle: if the ships are
          under sanctions and Turkey closed the straits, how did they sail
          through the Bosphorus with military cargo for years?
        </p>

        <p>
          The answer lies in <em>what exactly</em> Turkey closed. The Montreux
          Convention governs the passage of both warships and merchant vessels,
          but the ban Ankara invoked on 28 February 2022 applies to
          <strong> warships of belligerent states</strong> — that is Article 19,
          and even it has exceptions for ships returning to their home bases
          <a className="ref" href="#ref-29">
            [29]
          </a>
          . A dry cargo ship under a merchant flag does not fall under that ban,
          whatever lies in her hold.
        </p>

        <p>
          That is precisely what the scheme is built on. The US Naval
          Instituteʼs publication puts it plainly: Russia shifts its military
          logistics onto civilian hulls, and Turkey, having closed the straits
          to warships, could do more to restrict individual Russian ships and
          their cargoes that still sail the Black Sea — such as Sparta IV,
          Sparta II, Pizhma and Ursa Major. All of them are under sanctions, yet
          Turkey so far refrains from intercepting them
          <a className="ref" href="#ref-28">
            [28]
          </a>
          .
        </p>

        <p>
          More than that, Turkey knowingly grants preferences to the Russian
          military cargo fleet. <em>Ursa Major</em> passed the Bosphorus{" "}
          <strong>out of turn</strong>. Under established practice ships wait
          their turn for a certain time, and, as HUR notes, that is impossible
          without a prior arrangement with representatives of the Turkish
          maritime administration
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        <p>
          The main problem with sanctions is that a decision restricts access to
          the ports of the sanctioning party that adopted it, and the operations
          of its residents. It does not forbid sailing between Russian ports and
          West Africa. <em>Baltic Leader</em>ʼs route after 2024 — Baltiysk,
          Kaliningrad, Belokamenka, Murmansk and onward to Conakry, Algiers,
          Alexandria — includes <strong>not a single EU port</strong>
          <a className="ref" href="#ref-4">
            [4]
          </a>
          .
        </p>

        {/* ===================== THE SINKING ===================== */}
        <h2>
          <span className="h2-num">§ 06 · The sinking</span>What happened aboard
          Ursa Major
        </h2>

        <p>
          One of the four cards above ends with the word “lost”. The loss of{" "}
          <em>Ursa Major</em> deserves its own section not for the event itself
          but for its consequence: it was after this that Oboronlogistika began
          escorting its dry cargo ships with warships.
        </p>

        <p>
          The ship sank in international waters between Spain and Algeria on the
          night of <strong>24 December 2024</strong>. Fourteen crew were
          rescued, two went missing
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . She had left St Petersburg on 11 December; arrival in Vladivostok
          was planned for 22 January 2025.
        </p>

        <p>
          From here the accounts diverge, and the divergence is telling — because
          it concerns one and the same hold.
        </p>

        <table>
          <thead>
            <tr>
              <th>Version of the cargo</th>
              <th>Who says so</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty containers</td>
              <td>
                the shipʼs master
                <a className="ref" href="#ref-4">
                  [4]
                </a>
              </td>
            </tr>
            <tr>
              <td>
                380-tonne port cranes for the Vladivostok terminal and 45-tonne
                hatch covers for new icebreakers
              </td>
              <td>
                Oboronlogistikaʼs press service, a few days before departure
                <a className="ref" href="#ref-4">
                  [4]
                </a>
              </td>
            </tr>
            <tr>
              <td>Civilian hatch covers, as stated in the manifest</td>
              <td>
                WION
                <a className="ref" href="#ref-27">
                  [27]
                </a>
              </td>
            </tr>
            <tr>
              <td>
                Prohibited VM-4SG reactor units for submarines, destined for
                North Korea
              </td>
              <td>
                “Spanish investigators”, as relayed by WION
                <a className="ref" href="#ref-27">
                  [27]
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          The second and third versions most likely describe the same thing:
          the forty-five-tonne hatch covers for icebreakers later turned into
          civilian hatches. The fourth — the claim about reactor units for North
          Korea — looks entirely in the spirit of Russian logistics. There is no
          independent confirmation of it.
        </p>

        <p>
          The cause of the sinking is disputed too. HUR writes of an explosion
          in the engine room
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Oboronlogistika claimed a terrorist attack — three explosions on the
          starboard side
          <a className="ref" href="#ref-10">
            [10]
          </a>
          . WION speaks of a probable external strike
          <a className="ref" href="#ref-27">
            [27]
          </a>
          .
        </p>

        <p>
          Whatever actually happened, the consequence is documented: after the
          shipʼs loss, Oboronlogistika dry cargo vessels carrying cargo out of
          Syria began sailing under the escort of Russian warships
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        {/* ===================== THE CARGO ===================== */}
        <h2>
          <span className="h2-num">§ 07 · The cargo</span>What exactly goes
          south
        </h2>

        <p>
          So far this has been about the Mediterranean direction. But a large
          part of the logistics concerns the African one. In the first five
          months of 2025 <strong>three large convoys</strong> reached Bamako;
          they give the fullest picture of what Russia actually ships to the
          Sahel.
        </p>

        <p>
          The January one comprised about <strong>50 vehicles</strong> of
          logistics, supply and transport — among them an armoured Linza
          ambulance. To these were added about{" "}
          <strong>60 armoured fighting vehicles</strong>: APCs, VPK Urals,
          Tigrs and tracked equipment, apparently two tank platoons and two IFV
          platoons. Separately — two automatic anti-aircraft guns, two boats and
          three towed artillery systems
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <figure className="fig fig--bleed">
          <img
            src="/articles/syriyskyi-ekspres/britnev-baltiysk-loading.webp"
            alt="Satellite image of the quay at Baltiysk: a dry cargo ship alongside, with armoured vehicles and trucks drawn up in rows on the quay beside her"
          />
          <figcaption>
            <em>Mikhail Britnev</em> at Baltiysk, 16 June. On the quay —
            armour and APCs that will be in Bamako three weeks later.
          </figcaption>
        </figure>

        <p>
          The number of vehicles matches the size of a battalion tactical group,
          which in the Donbas numbers 600–800 men. But the purpose of the
          equipment is different. The Sentry notes that most of the vehicles are
          unsuited to combat in desert terrain: this is equipment for guarding
          bases. A senior European officer who previously served in the region
          adds that it is relatively new and not of the type foreign forces hand
          over to local armies
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . Bamakoʼs official line — that the cargo was intended for Maliʼs
          armed forces — does not square with that.
        </p>

        <p>
          The maker of most of the equipment is known. VPK Urals, Tigrs and
          several types of APC are produced by the Military Industrial Company,
          which is linked to Oleg Deripaska; together with its subsidiary, the
          Arzamas Machine-Building Plant, it is under US, British and EU
          sanctions. The company did not respond to The Sentryʼs query
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          The convoyʼs route inside Mali makes sense too. From the main military
          base in Bamako the equipment was split: part went to <strong>Gao</strong>{" "}
          in the north, part to <strong>Banimanotié</strong>. That is a new base
          of Maliʼs armed forces 170 km from the capital; defence minister Sadio
          Camara opened it on 17 January 2025 — a day before the cargo arrived.
          The 82nd armoured regiment is stationed there, and the base itself is{" "}
          <strong>100 km from the Yanfolila gold mine</strong>. A source in
          Maliʼs armed forces puts it plainly: the Russians want the Africa
          Corps sitting closer to Yanfolila
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Another source, in Mopti, lists the bases that received equipment from
          all three shipments: “Sokoro, Bafo, Nampala, Bandiagara, Sofara, Boni
          and Timbuktu”. A further part went to a new base at Diéma in the west
          of the country, three hoursʼ drive from the Mauritanian border.
          Notably, the equipment went mostly to <strong>new recruits</strong> of
          the Africa Corps rather than to former Wagner men stationed at the
          northern bases
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Least is known about the March 2025 shipment: missiles and several
          military and civilian vehicles. The May one is documented better —{" "}
          <strong>152 mm artillery pieces</strong>, BTR-80s with electronic
          warfare equipment, armoured Spartak vehicles and other personnel
          carriers. And a <strong>Su-24</strong>: a frontline bomber, sorely
          needed in the north after the defeat Wagner and the Malian army
          suffered in 2024 for want of air power. Shortly after delivery the
          Su-24 crashed into the Niger river
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          In 2026 the route repeats almost word for word, only with different
          ships. <em>Sabetta</em> left Baltiysk around 22 February escorted by
          the large landing ship <em>Alexander Shabalin</em>. On 5 March the
          Royal Navy said it had “intercepted” Russian vessels in the Channel:
          it shadowed them with boats and helicopters, and did not board. On 19
          March <em>Sabetta</em> tied up in Conakry; an Airbus image from 21
          March shows military equipment by the quay. From Conakry to Bamako is
          995 kilometres overland, about seventeen hours. On 27 March the Malian
          newspaper LʼEssor described a convoy arriving in the capital on the
          night of the 24th, from where the equipment went on to Kati, the site
          of an armed forces base
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/syriyskyi-ekspres/hms-tyne-shadows-sabetta.webp"
            alt="The British patrol ship HMS Tyne at sea alongside a Russian landing ship and a dry cargo vessel"
          />
          <figcaption>
            The British patrol ship HMS Tyne shadowing{" "}
            <em>Alexander Shabalin</em> and <em>Sabetta</em> in the Channel. No
            one boarded — the ships were sailing within their rights.
          </figcaption>
        </figure>

        <p>
          The June voyage of <em>Mikhail Britnev</em> is documented in more
          detail. A general cargo ship 136 m long, 12,700 tonnes deadweight,
          five holds, structurally reinforced for heavy cargo, ice class 1A;
          under US sanctions since 2024. The ship left Arkhangelsk on 3 June,
          called at Baltiysk on the 11th and lay there a week{" "}
          <strong>without unloading</strong>. Imagery from 16 June shows her
          loaded with armour and APCs. She sailed on 18 June; from the Fehmarn
          Belt she was led by <em>Alexander Shabalin</em>. On 25 June the ship
          was photographed west of Portugal — the escort was still in place
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">
            Design · netting on an ocean voyage
          </div>
          <p>
            On this passage <em>Shabalin</em> sailed{" "}
            <strong>with anti-drone netting</strong> covering part of her
            superstructure from the bow
            <a className="ref" href="#ref-6">
              [6]
            </a>
            . The same structural answer to drones that the Black Sea Fleet
            rigs over the sails of its submarines in Novorossiysk had reached a
            landing ship on an ocean voyage thousands of kilometres from the
            Black Sea.
          </p>
        </div>

        <p>
          After passing the Channel on <strong>23 June</strong>,{" "}
          <em>Mikhail Britnev</em> switched off her{" "}
          <span
            className="term"
            data-def="Automatic Identification System — shipborne transponders that continuously broadcast a vesselʼs name, position, course and speed. Switching it off is permitted only for the safety of the ship."
          >
            AIS
          </span>
          . A day before arrival she declared Dakar as her port of destination.
          She reappeared on 9 July in Lomé, Togo
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/syriyskyi-ekspres/bamako-convoy.jpg"
            alt="A column of military vehicles on a street in Bamako: armoured personnel carriers and infantry fighting vehicles moving one behind another"
          />
          <figcaption>
            The column in Bamako, 25 July 2026. In frame — BMP-3s, BTR-82As and
            Tigrs; the same equipment a satellite caught aboard the ship.
          </figcaption>
        </figure>

        <p>
          On 25 July Malian state television showed the column in Bamako:
          BMP-3s, BTR-82As, Tigrs and Chinese VP11s. BBC Verify assessed that
          the equipment in the satellite imagery of the ship matches what drove
          through the capital. The British defence ministry declined to comment
          on the passage
          <a className="ref" href="#ref-8">
            [8]
          </a>
          .
        </p>

        <p>
          One more ship, which never appeared in publicly available tracking
          data, was photographed loading military equipment at Baltiysk on 6
          June
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . How many such voyages went unnoticed cannot be established from open
          sources.
        </p>

        <p>
          The Chinese vehicles in Russian shipments are not a recognition error.
          The March shipment included CS/VP14s, resistant to improvised
          explosive devices, and the CS/VN9 infantry fighting vehicle — both
          made by Norinco — as well as a Dongfeng Mengshi all-terrain vehicle,
          alongside Russian BMP-3s, Tigrs and VPK Urals
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Assessment · GI-TOC</div>
          <p className="qtbox__quote">
            It is entirely plausible that Russian supply is carrying Chinese
            equipment. Most likely Russia buys certain types of equipment from
            China, most probably from Norinco, especially where military
            vehicles are concerned. Given the scale of the deliveries Russia has
            been sending to Mali since the beginning of 2025, it is logical that
            some shipments may contain equipment from different manufacturers.
          </p>
          <div className="qtbox__cite">
            Julia Stanyard, Global Initiative Against Transnational Organized
            Crime
            <a className="ref" href="#ref-7">
              [7]
            </a>
          </div>
        </div>

        <p>
          There is also a suggestion that the Africa Corps could have
          redirected some of the Chinese vehicles from earlier deliveries China
          made directly to the Malian army
          <a className="ref" href="#ref-7">
            [7]
          </a>
          .
        </p>

        {/* ===================== THE PORT ===================== */}
        <h2>
          <span className="h2-num">§ 08 · The port</span>A railway built for
          bauxite
        </h2>

        <p>
          All three convoys of 2025 passed through one terminal of the
          Autonomous Port of Conakry. It is served by subsidiaries of Rusal —{" "}
          <strong>ACG-Fria</strong> and{" "}
          <strong>Compagnie des Bauxites de Kindia</strong>. The second is the
          companyʼs largest raw materials asset, about a quarter of its bauxite
          output. ACG-Fria holds the Friguia complex — bauxite plus an alumina
          refinery — in the town of Fria, built from scratch in the 1950s
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          The port itself and its terminals are managed by Conakry Port S.A., a
          subsidiary of the Turkish conglomerate{" "}
          <strong>Albayrak Group</strong>, which won the terminal concession in
          2018. Neither Albayrak nor the Autonomous Port of Conakry replied to
          The Sentryʼs queries. Rusal answered that it and its companies operate
          in Guinea “in full compliance with applicable laws and regulations”
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <figure className="fig fig--bleed">
          <img
            src="/articles/syriyskyi-ekspres/conakry-port.jpg"
            alt="Satellite image of the port of Conakry: the ore terminal with a red bauxite stockpile, a rail spur along the quay, ships alongside"
          />
          <figcaption>
            The terminal at Conakry. The red stockpile is bauxite; the railway
            leads to the mine. All three military convoys of 2025 went through
            that same berth.
          </figcaption>
        </figure>

        <p>
          So infrastructure built to export bauxite is carrying armoured
          vehicles. A port worker describes the requirement simply:
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Testimony · the port of Conakry</div>
          <p className="qtbox__quote">
            For deliveries like this to work here you need a berth — either a
            ro-ro ramp or a mobile heavy crane — a secured yard and a clear road
            corridor out of the port. The railway here is for bauxite, not for
            weapons. That is what these companies can give to whoever is making
            military deliveries.
          </p>
          <div className="qtbox__cite">
            a Guinean port worker speaking to The Sentry
            <a className="ref" href="#ref-1">
              [1]
            </a>
          </div>
        </div>

        <p>
          On <strong>27 December 2024</strong> a ship with several thousand
          tonnes of Russian wheat for Mali tied up in Conakry — reported by
          Maliʼs ambassador to Guinea, Mamadou Keïta. A port worker confirmed to
          The Sentry that this voyage “tested” the port: military deliveries
          cost more and were far more sensitive, and they needed to be sure the
          cargo would not only enter the port but cross Guinea without incident
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          The ground was prepared diplomatically too: in June 2024 Sergei Lavrov
          visited Conakry and president Mamadi Doumbouya. Russiaʼs ambassador to
          Guinea, Alexei Popov, formally recognised the Guinean military
          leadership
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Testimony · choosing the port</div>
          <p className="qtbox__quote">
            They knew it was harder to make friends with the other coastal
            states, and harder to carry cargo to their main ally in Mali through
            other countries. Conakry is certainty. They know they will not be
            refused access here, that they will be able to control the rail
            terminal.
          </p>
          <div className="qtbox__cite">
            a source at the port of Conakry
            <a className="ref" href="#ref-1">
              [1]
            </a>
          </div>
        </div>

        <figure className="fig fig--bleed">
          <img
            src="/articles/syriyskyi-ekspres/conakry-bamako-route.jpg"
            alt="Map of West Africa with the route marked from the port of Conakry through Guinea to Bamako and on to Bougouni and Gao"
          />
          <figcaption>
            The convoysʼ overland route: 995 kilometres from Conakry to Bamako,
            then a fork south to Bougouni and north to Gao. Graphic by The
            Sentry.
          </figcaption>
        </figure>

        <p>
          Analysts and journalists pointed out that Senegal, with better port
          infrastructure, would suit deliveries to Mali better. Russia chose
          Conakry for two reasons: friendly relations with the Guinean junta and
          ties to Rusal, which holds the cargo, rail and logistics apparatus
          around the port
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          A telling detail: the ships did not hide. <em>Adler</em>,{" "}
          <em>Siyanie Severa</em>, <em>Patria</em> and <em>Baltic Leader</em>{" "}
          sailed under the Russian flag, without swapping it for someone elseʼs
          the way shadow fleet vessels do. The Sentry calls this a
          “non-shadow” delivery: the government in Conakry knew about the
          military cargo and welcomed it
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          The May 2025 shipment — 25–28 May — was carried by exactly{" "}
          <strong>
            <em>Baltic Leader</em> and <em>Patria</em>
          </strong>
          . Radio France Internationale collected testimony about the column
          moving along National Road No. 1 on 28 May; it reached Bamako on the
          31st
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          What exactly travels on the new routes is not always known. Bellingcat
          followed <em>Patria</em> for six months, which was convenient thanks
          to her distinctive features: bridge forward, red deck, blue hull, two
          yellow cranes, a ramp aft. The ship began her voyage in the Sea of
          Japan, loading at <strong>the port of Olga</strong> on 21–23 January
          2026, and from March shuttled between Owendo in Gabon and Douala in
          Cameroon
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          The method proved more telling than the conclusion: the shipʼs draught{" "}
          <strong>increased</strong> every time after a call at Owendo and{" "}
          <strong>decreased</strong> every time after Douala — four loadings
          against five unloadings from March to July. While <em>Patria</em> lay
          at anchor off Lagos for more than thirty days, no other ro-ro or
          container ship waited more than ten days to enter the port
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          Bellingcat does not say what was in the holds. Experts offer only
          versions. Charlie Brown, a former US Navy officer, calls the behaviour
          atypical for a merchant ship, but lists innocent explanations too: a
          breakdown, a commercial dispute, a lack of cargo, chartering delays, a
          long repair. David Soud of I.R Consilium adds that Douala is the main
          gateway for cargo into the Central African Republic, and that Gabon
          has recently grown closer to Moscow
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        <p>
          Bellingcat found no signs of position spoofing, though for part of the
          passage there was no satellite imagery, so it cannot rule it out
          entirely. The shipʼs owner and manager, the ports of Douala and Owendo
          and the Nigerian Ports Authority did not respond to queries
          <a className="ref" href="#ref-5">
            [5]
          </a>
          .
        </p>

        {/* ===================== LOMÉ ===================== */}
        <h2>
          <span className="h2-num">§ 09 · Lomé</span>The scheme shifts
        </h2>

        <p>
          By 2026 the scheme shifts. <em>Mikhail Britnev</em> sails not to
          Conakry but to Lomé — a deepwater port in Togo able to take large
          container ships and warships, linked by a transport corridor to
          Burkina Faso and through it to Mali
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          The shift is confirmed on paper. On 22 July 2025 the Russian
          government approved a bill ratifying a military cooperation agreement
          with Togo — joint exercises and emergency medical assistance
          <a className="ref" href="#ref-1">
            [1]
          </a>
          . In October 2025 the agreement was ratified: joint exercises,
          training of Togolese troops, intelligence sharing. The cooperation has
          run since 2022, when Togo received Mi-35s and Mi-17s from Russia;
          there are also reports of Togolese soldiers being recruited for the
          war against Ukraine
          <a className="ref" href="#ref-6">
            [6]
          </a>
          .
        </p>

        <p>
          Togo is also a notable gold exporter — and, according to reports,
          serves as a transit point for gold mined in neighbouring countries
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Togo is not the only new address. In Niger, on{" "}
          <strong>12 April 2024</strong>, a hundred Africa Corps fighters
          arrived in Niamey: with equipment and an agreement to install an air
          defence system. Through 2025 Russian aircraft regularly landed at
          Agadez airport
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          In Equatorial Guinea, in the autumn of 2024, up to{" "}
          <strong>two hundred</strong> fighters appeared — to guard the
          president and train an elite guard in the two main cities, Malabo and
          Bata. The head of the Africa Corps, Averyanov, met president Teodoro
          Obiang Nguema Mbasogo to agree on joint training of personnel and on
          strengthening information security and critical infrastructure
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Both countries matter to Moscow for the same prosaic reason: they have
          large ports. Equatorial Guinea is also close to Cameroon — the key
          country for Russian logistics into the Central African Republic.
          Together with the deployments in Sudan and Libya this adds up to a
          picture The Sentry describes as a gradual encirclement of West Africa
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        {/* ===================== THE CORPS ===================== */}
        <h2>
          <span className="h2-num">§ 10 · The recipient</span>The ultimate
          beneficiary
        </h2>

        <p>
          The Africa Corps was founded in December 2023 by deputy defence
          minister Colonel General <strong>Yunus-Bek Yevkurov</strong>
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . In Mali the structure deployed at the end of 2024, and in June 2025
          Wagner announced its exit from the country, handing over most of its
          operations to it
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>
          Its strength in Mali is <strong>at least 1,500 people</strong>, about
          the same as Wagnerʼs, and a large share of them are former Wagner men.
          For Malian civilians there is no difference: in the list of victims
          The Sentry collected in Goundam, Léré, Mema, Taoudenni, Gao and
          Timbuktu for the second half of 2025, Africa Corps and Wagner are used
          as synonyms
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <p>The chain of command looks like this:</p>

        <ul>
          <li>
            <strong>Yunus-Bek Yevkurov</strong>, Russian deputy defence minister
            — political oversight from Moscow;
          </li>
          <li>
            <strong>Major General Andrei Averyanov</strong>, GRU — military
            oversight of operations. At least until 2022 he headed{" "}
            <strong>Unit 29155</strong>, accused of sabotage and assassination
            attempts against Western countries;
          </li>
          <li>
            <strong>Andrei “Kep” Ivanov</strong> — overall commander in Mali,
            who personally oversaw the supply of equipment;
          </li>
          <li>
            <strong>Ivan “Miron” Maslov</strong> — commander in the north, in
            the Gao — Kidal area, where mostly former Wagner men are stationed.
          </li>
        </ul>

        {/* ===================== THE EXPRESS ===================== */}

        <p>
          For this story one thing matters: the cargo is received not by a
          private company looking for a way to pay for its own war, but by a
          structure of the defence ministry. That is why state ships of a state
          company carry its equipment — and why this route will not disappear
          along with any single contractor.
        </p>
        <h2>
          <span className="h2-num">§ 11 · The express</span>The Syrian Express
          survived
        </h2>

        <p>
          But Africa is not the whole of it: the Syrian route keeps working too
          — and it is there that Russia has shown the most elaborate concealment
          scheme in the history of its maritime shipping.
        </p>

        <AisConvoyMap lang="en" />

        <p>
          The escort tactics changed as well: a frigate appeared in the convoy.
          The practice of military escort for commercial traffic began earlier —
          at the end of June 2025 the corvette <em>Boikiy</em> led two shadow
          fleet tankers, <em>Selva</em> and <em>Sierra</em>, through the English
          Channel. The trigger was Estoniaʼs failed attempt to detain an
          unregistered tanker, which was thwarted by the appearance of a Russian
          fighter jet
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">Trick · the jumping buoy</div>
          <p>
            <em>Boikiy</em> herself masked her position by transmitting a
            generic MMSI number: tracking systems showed her as “objects” — for
            instance buoys that suddenly jump from the coast of China or from
            the Persian Gulf to the northern approaches of the Channel
            <a className="ref" href="#ref-10">
              [10]
            </a>
            .
          </p>
        </div>

        <p>
          The upshot is that the loss of the naval base has not reduced Russiaʼs
          interest in Tartus, nor closed off the possibility of calling there.
        </p>

        <div className="callout">
          <p>
            Tartus has passed through three states.{" "}
            <strong>Until December 2024</strong> — a base with rights, repairs
            and a permanent squadron. <strong>Through 2025</strong> — empty
            quays and an undefined status while negotiations dragged on.{" "}
            <strong>From 2026</strong> — ships do call, but by permission: the
            May convoy stayed eleven days, and <em>Sparta</em> brought cargo
            from Kaliningrad back in April.
          </p>
        </div>

        <p>
          So from a base of permanent presence Tartus has become a restricted
          logistics node. Long waits for entry permission and short stays
          indicate that Russia no longer holds its former rights — access is
          granted case by case, as it is to any foreign warship. Cargo ships get
          in more easily than combatants, which usually anchor in the roadstead
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <p>
          Khmeimim, 35 miles to the north, Russia has held onto better: aircraft
          bound for Africa still refuel there and the logistics capacity has
          survived. But that position is shaky too — the base has come under
          drone attack recently, and the Russian military there has ended up
          between a local population of Assad loyalists and their old opponents
          <a className="ref" href="#ref-12">
            [12]
          </a>
          .
        </p>

        <p>
          In parallel the port is being prepared for transshipping Russian
          grain, coal, timber and steel: according to a Reuters report of 11 July
          2026, this is being handled by the Syrian company Rus Line. Its chief
          executive, Jinan Mubadda, says one berth goes to commercial cargo
          while the second keeps its military purpose
          <a className="ref" href="#ref-10">
            [10]
          </a>
          .
        </p>

        {/* ===================== THE REPLACEMENT ===================== */}
        <h2>
          <span className="h2-num">§ 12 · Conclusion</span>What follows from
          this
        </h2>

        <p>
          The story of how Russia lost the Mediterranean has been told at least
          twice: in January 2025, when the last submarine left, and in July
          2026, when the sea was left without Russian combatants. Both times it
          was true — and both times it overshadowed what was happening next
          door.
        </p>

        <p>
          Yet the model of presence, and the military logistics Tartus was
          needed for, were changing gradually and pre-empted Assadʼs fall.
          Weapons for the Sahel travel from Murmansk and Baltiysk — by a route
          devised not after the loss of Tartus but before it.
        </p>

        <p>
          The beneficiary of the cargo changed gradually too. Wagner took
          territory in exchange for resources and fought battles; the Africa
          Corps ships equipment for guarding bases, does geopolitics and runs a
          far more prosaic military policy. It is a more cautious, more
          expensive and slower presence — but it is a state one rather than
          private, and that is exactly why it will not vanish along with any one
          company.
        </p>

        <p>
          As a result Russia has managed to head off the risks to its influence
          both in Africa and in the Middle East. It has cut its own logistical
          losses by diversifying routes and reformatting the delivery scheme.
          Russia has kept the ability to ship armour to Mali; the accessibility
          of its facilities has cost it time, but not its influence outright.
          The threat to its cargo fleet has forced it to use a navy that is hard
          to sustain in the region — and that has, in its own way, even
          strengthened its position there. So it is fair to say that the loss of
          a single node has not been enough to counter Russian influence, and
          far greater effort will be needed to undo it. There is a great deal of
          work ahead.
        </p>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              The Sentry — “Doubling Down: Russiaʼs Military Network in West
              Africa”, April 2026.{" "}
              <a href="https://thesentry.org/wp-content/uploads/2026/04/DoublingDown-TheSentry-April2026.pdf">
                thesentry.org
              </a>
            </li>
            <li id="ref-2">
              CSIS — “Maritime Domain Lessons from Russia-Ukraine”, panel
              transcript of 27.02.2025.{" "}
              <a href="https://www.csis.org/analysis/maritime-domain-lessons-russia-ukraine-conflict-focus">
                csis.org
              </a>
            </li>
            <li id="ref-3">
              Maritime Executive, Peter Berstling and Gianguiseppe Pili —
              “Russiaʼs ‘Syria Express’ Convoys May Be Combining Multiple AIS
              Tricks”.{" "}
              <a href="https://maritime-executive.com/article/russia-s-syria-express-convoys-may-be-combining-multiple-ais-tricks">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-4">
              HUR MO Ukraine, the War&amp;Sanctions database — dossiers on the
              ships SPARTA (IMO 9268710), SPARTA IV (9743033), URSA MAJOR
              (9538892) and BALTIC LEADER (9220639).{" "}
              <a href="https://war-sanctions.gur.gov.ua/en/transport/ships/99">
                war-sanctions.gur.gov.ua
              </a>
            </li>
            <li id="ref-5">
              Bellingcat — “Tracking a Sanctioned Russian Vesselʼs West African
              Odyssey”, 25.08.2026. The route of the ro-ro Patria — from Lloydʼs
              List Intelligence AIS data and satellite imagery.{" "}
              <a href="https://www.bellingcat.com/news/africa/2026/08/25/patria-sanctioned-russian-vessel-russia-us-africa-cameroon-gabon-lagos-nigeria/">
                bellingcat.com
              </a>
            </li>
            <li id="ref-6">
              Eurasia.ro — the voyage of Mikhail Britnev from Arkhangelsk to
              Lomé, 16.07.2026.{" "}
              <a href="https://eurasia.ro/2026/07/16/russian-dry-cargo-ship-escorted-by-bdk-delivered-armored-vehicles-for-the-african-corps-to-africa/">
                eurasia.ro
              </a>
            </li>
            <li id="ref-7">
              France 24 Observers — the voyage of Sabetta from Baltiysk to
              Conakry, 14.04.2026.{" "}
              <a href="https://www.france24.com/en/africa/20260414-russian-ship-sanctions-delivered-armoured-vehicles-mali">
                france24.com
              </a>
            </li>
            <li id="ref-8">
              Militarnyi, on a BBC Verify investigation — the delivery of BMP-3s
              and other equipment to Mali by the ship Mikhail Britnev.{" "}
              <a href="https://militarnyi.com/en/news/russia-sends-large-shipment-of-military-equipment-including-bmp-3-ifvs-to-mali/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-9">
              ItaMilRadar — “From a Powerful Mediterranean Squadron to Zero
              Warships”, 01.07.2026.{" "}
              <a href="https://www.itamilradar.com/2026/07/01/from-a-powerful-mediterranean-squadron-to-zero-warships-how-russias-naval-presence-has-collapsed/">
                itamilradar.com
              </a>
            </li>
            <li id="ref-10">
              The Insider — “Russia left without warships in Mediterranean for
              first time in 13 years”, 16.07.2026, and a piece of 08.07.2025 on
              the escort by the corvette Boikiy. The “first time since 2013”
              assessment belongs to the OSINT project Russian Forces Spotter and
              is presented as its observation.{" "}
              <a href="https://theins.press/en/news/294958">theins.press</a>
            </li>
            <li id="ref-11">
              RUSI, Edward Black and Sidharth Kaushal — “Russiaʼs Options for
              Naval Basing in the Mediterranean After Syriaʼs Tartus”,
              14.01.2025.{" "}
              <a href="https://www.rusi.org/explore-our-research/publications/commentary/russias-options-naval-basing-mediterranean-after-syrias-tartus">
                rusi.org
              </a>
            </li>
            <li id="ref-12">
              Maritime Executive — “Russian Navyʼs Weakness in the Mediterranean
              Becomes Clear”. The piece calls Admiral Grigorovich a cruiser —
              she is a Project 11356 frigate.{" "}
              <a href="https://maritime-executive.com/editorials/russian-navy-s-weakness-in-the-mediterranean-becomes-clear">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-13">
              Forbes, Paul Iddon — “Russia Never Realized Full Potential Of
              Syriaʼs Tartus Naval Base—And Never Will”, 23.08.2026.{" "}
              <a href="https://www.forbes.com/sites/pauliddon/2026/08/23/russia-never-realized-full-potential-of-syrias-tartus-naval-base-and-never-will/">
                forbes.com
              </a>
            </li>
            <li id="ref-14">
              The Moscow Times — “Syria Terminates Russian Naval Base Deal –
              Reports”, 22.01.2025. The report was relayed citing the Syrian
              opposition outlet Shaam; the wording about the agreement being
              torn up later proved inaccurate.{" "}
              <a href="https://www.themoscowtimes.com/2025/01/22/syria-terminates-russian-naval-base-deal-reports-a87690">
                themoscowtimes.com
              </a>
            </li>
            <li id="ref-15">
              English Wikipedia, the articles Tartus naval base and
              Mediterranean Sea Task Force — a consolidated chronology of the
              base with links to primary sources.{" "}
              <a href="https://en.wikipedia.org/wiki/Tartus_naval_base">
                en.wikipedia.org
              </a>
            </li>
            <li id="ref-16">
              James Droxford — “Russia concludes conventional submarine
              operations in the Mediterranean Sea”. The author is a former
              Royal Navy signals intelligence officer.{" "}
              <a href="https://jamesdroxford.substack.com/p/russia-concludes-conventional-submarine">
                jamesdroxford.substack.com
              </a>
            </li>
            <li id="ref-17">
              European Security &amp; Defence, Hans-Uwe Mergener — “A Russian
              sub could be heading back to the Med”, 02.2025.{" "}
              <a href="https://euro-sd.com/2025/02/major-news/42534/a-russian-sub-back-to-the-med/">
                euro-sd.com
              </a>
            </li>
            <li id="ref-18">
              Newsweek — “Syriaʼs critical role in Russiaʼs Africa operations”,
              December 2024. Quotations from the Russian military channel Rybar
              are presented as claimed.{" "}
              <a href="https://www.newsweek.com/syria-critical-role-russia-africa-operations-tartus-khmeimim-1998938">
                newsweek.com
              </a>
            </li>
            <li id="ref-19">
              russianfleetanalysis — “The Russian Navy and the fall of Tartus”,
              12.2024. A niche analytical blog; the assessments are the authorʼs
              own.{" "}
              <a href="https://russianfleetanalysis.blogspot.com/2024/12/the-russian-navy-and-fall-of-tartus.html">
                russianfleetanalysis.blogspot.com
              </a>
            </li>
            <li id="ref-20">
              Foreign Policy — “After Assadʼs Fall, Russia Looks to Libya and
              Sudan”, 19.02.2025.{" "}
              <a href="https://foreignpolicy.com/2025/02/19/russia-putin-libya-sudan-naval-air-bases-syria-assad-fall/">
                foreignpolicy.com
              </a>
            </li>
            <li id="ref-21">
              BISI — “The Expansion of Russiaʼs Africa Corps in Libya”,
              13.06.2024.{" "}
              <a href="https://bisi.org.uk/reports/the-expansion-of-russias-africa-corps-in-libya">
                bisi.org.uk
              </a>
            </li>
            <li id="ref-22">
              Alberto Priego — “Russian strategy in the Mediterranean: A second
              front”, Opinion Paper 08/2026, Spanish Institute for Strategic
              Studies (IEEE), 23.01.2026. An authored paper; it does not set out
              the position of Spainʼs defence ministry. It contains factual
              errors — among them the wrong project number for the submarines
              Krasnodar and Mozhaysk.{" "}
              <a href="https://www.defensa.gob.es/documents/2073105/3095923/estrategia_rusa_en_el_mediterraneo_2026_dieeeo08_eng.pdf">
                defensa.gob.es
              </a>
            </li>
            <li id="ref-23">
              TWZ — “Russian Withdrawal From Prized Syrian Naval Base Now
              Underway”: Maxar imagery of 25.01.2025 and Planet Labs imagery of
              27.01.2025.{" "}
              <a href="https://www.twz.com/news-features/russian-withdrawal-from-prized-syrian-naval-base-now-underway">
                twz.com
              </a>
            </li>
            <li id="ref-24">
              Defense Mirror — “Russia Withdraws Last Submarine from
              Mediterranean Sea; No Naval Vessels Remain at Syriaʼs Tartus”. The
              submarineʼs hull number is given with a typo: “B-61” instead of
              B-261.{" "}
              <a href="https://defensemirror.com/news/38535">
                defensemirror.com
              </a>
            </li>
            <li id="ref-25">
              ItaMilRadar — “Russian Syrian Express Convoy Crosses Gibraltar
              Under Naval Escort”, 22.05.2026.{" "}
              <a href="https://www.itamilradar.com/2026/05/22/russian-syrian-express-convoy-crosses-gibraltar-under-naval-escort-signaling-continued-moscow-supply-operations-from-tartus/">
                itamilradar.com
              </a>
            </li>
            <li id="ref-26">
              Zona Militar — on the withdrawal of troops and equipment from
              Tartus, 02.2025: Maxar and Planet Labs imagery.{" "}
              <a href="https://www.zona-militar.com/en/2025/02/03/the-russian-armed-forces-have-reportedly-begun-withdrawing-troops-and-equipment-from-the-strategic-tartus-naval-base-in-syria/">
                zona-militar.com
              </a>
            </li>
            <li id="ref-27">
              WION — “From Sparta III to Ursa Major: the sanctioned history of
              the sunken Russian cargo ship”, 12.05.2026. The claim about
              reactor units for North Korea is attributed to unnamed Spanish
              investigators and has no independent confirmation.{" "}
              <a href="https://www.wionews.com/photos/from-sparta-iii-to-ursa-major-the-sanctioned-history-of-the-sunken-russian-cargo-ship-1778582372147">
                wionews.com
              </a>
            </li>
            <li id="ref-28">
              U.S. Naval Institute, Proceedings — “Russia Is Violating the
              Montreux Convention with Civilian Ships”, 09.2023.{" "}
              <a href="https://www.usni.org/magazines/proceedings/2023/september/russia-violating-montreux-convention-civilian-ships">
                usni.org
              </a>
            </li>
            <li id="ref-29">
              JURIST — “The Implications of the Montreux Convention on the
              Transit of Russian Vessels”, 06.2022.{" "}
              <a href="https://www.jurist.org/commentary/2022/06/akshat-goyal-montreux-convention-russia-ukraine/">
                jurist.org
              </a>
            </li>
            <li id="ref-30">
              CNN — “Spike in Russian flights from Syria to Libyan desert base
              as Moscow eyes new Mediterranean hub”, 31.12.2024. The tracking
              data analysis is the outletʼs own.{" "}
              <a href="https://www.cnn.com/2024/12/31/middleeast/spike-russian-flights-libya-desert-base-intl">
                cnn.com
              </a>
            </li>
            <li id="ref-31">
              RFI, the Info Vérif investigations desk — “Libyaʼs Al-Khadim
              airbase becomes a hub for Russian arms in the Sahel”, 23.06.2025.{" "}
              <a href="https://www.rfi.fr/en/africa/20250623-libya-s-al-khadim-airbase-becomes-a-hub-for-russian-arms-in-the-sahel">
                rfi.fr
              </a>
            </li>
            <li id="ref-32">
              Asharq Al-Awsat — “From Haftar to Dbeibah: The Map of Control and
              Influence in Libya”, 05.06.2025. The boundary of the zones of
              control on the map of sites in Libya is drawn from the
              demarcation described in this piece.{" "}
              <a href="https://english.aawsat.com/features/5151154-haftar-dbeibah-map-control-and-influence-libya">
                english.aawsat.com
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
            This story is based on open sources. Data from Russian outlets and
            reference works is presented as claimed. The Russian side has
            published no official data on cargo composition or routes.
          </p>
        </section>

        {/* ===================== ARTICLE FOOT ===================== */}
        <div className="article-foot">
          <div className="article-foot__tags">
            <span className="chip">Tartus</span>
            <span className="chip">Africa Corps</span>
            <span className="chip chip--rust">Syrian Express</span>
            <span className="chip chip--steel">AIS</span>
            <span className="chip">OSINT</span>
          </div>
          <div>CC BY-NC 4.0 · 01.09.2026</div>
        </div>
      </div>
      {/* /article-body */}

      {/* ============ RELATED ARTICLES ============ */}
      {related.length > 0 && (
        <section className="section section--beige">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">More stories</h2>
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
