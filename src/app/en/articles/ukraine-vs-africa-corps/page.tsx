import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
import "../../../(main)/articles/afrykanska-kampaniia/africa-map.css";
import type { Metadata } from "next";
import Link from "next/link";
import { requireVisibleArticle } from "@/lib/articles";
import IfArticleVisible from "@/components/IfArticleVisible";
import { LibyaControlMap } from "@/components/LibyaControlMap";
import { AutoFrame } from "@/components/AutoFrame";

const metadata: Metadata = {
  title: "Ukraine vs the Africa Corps — PLITKA Analytics",
  description:
    "The strike on the ro-ro carrier Lady Mariia in the Mediterranean, a Ukrainian foothold in Libya, HUR operations in Sudan and Mali: how Ukraine reaches Russia in its African rear.",
  openGraph: {
    images: ["/articles/afrykanska-kampaniia/cover.jpg"],
  },
};

const SLUG = "ukraine-vs-africa-corps";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return metadata;
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");

  return (
    <main data-screen-label="Story · The Africa campaign">
      {/* ============ ARTICLE HEAD ============ */}
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Investigation</span>
        <h1>
          Ukraine vs the Africa Corps. Three years of operations Kyiv will not
          admit to
        </h1>
        <p className="article-head__metaline">36 min read</p>
        <p className="article-head__dek">
          Where the drones that hit Russian ships off Libya come from — and how
          Ukraine ended up in the Kremlinʼs African rear
        </p>
      </div>

      {/* ============ LEDE ============ */}
      <div className="lede-block">
        <div className="lede-block__img">
          <img
            src="/articles/afrykanska-kampaniia/cover.jpg"
            alt="The face of a Tuareg in a blue tagelmust: only the eyes uncovered"
          />
        </div>
        <p className="lede">
          On 6 September 2026, in the Mediterranean between Crete and Libya,
          several drones dropped munitions on the Russian ro-ro carrier Lady
          Mariia
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-2">
            [2]
          </a>
          . The blasts hit the deck, the cargo cranes and the area around the
          superstructure, a fire broke out on board, but no genuinely serious
          damage is visible on the video
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . The ship had left Oran in Algeria and was heading east, towards
          Syria. Ukraineʼs military intelligence, HUR, lists her among the
          vessels that carry weapons for Russia, including out of Syria through
          the Bosphorus
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . Nobody claimed the attack
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . As of 12 September, Lady Mariia is at anchor off Port Said, Egypt;
          the damage, in ItaMilRadarʼs assessment, is minor
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        {/* ===================== INTRO ===================== */}
        <h2 id="sec-intro">
          <span className="h2-num">§ 00 · Introduction</span>The same “express”
        </h2>

        <p>
          The attack was first reported by Andriy Klymenko, head of the
          Institute of Black Sea Strategic Studies, and by the Russian
          opposition journalist Alexander Nevzorov, who posted the video
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-7">
            [7]
          </a>
          . In Nevzorovʼs account the ship was hit 12 times, the drones were
          launched from Libyan territory, and the cargo was Iranian weapons and
          armoured vehicles from Algeria bound for Russia
          <a className="ref" href="#ref-7">
            [7]
          </a>
          <a className="ref" href="#ref-8">
            [8]
          </a>
          . None of those claims has been independently confirmed
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-5">
            [5]
          </a>
          . The draught before the strike was 4.8 metres out of a possible 6.7,
          so the ship was not sailing fully loaded
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . Klymenko wrote drily that the attackers were “unknown drones” from
          Libyan territory and that Ukraine had nothing to do with it
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-9">
            [9]
          </a>
          . Militarnyi does not rule out an Israeli strike either, since the
          ship carried weapons to Syria
          <a className="ref" href="#ref-10">
            [10]
          </a>
          ; there is no evidence for that version either
          <a className="ref" href="#ref-11">
            [11]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/QtJvB5nZiBo?rel=0"
            title="Drone strike on the ro-ro carrier Lady Mariia, 6 September 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            Footage of the strike on Lady Mariia, 6 September 2026.
          </figcaption>
        </figure>

        <IfArticleVisible slug="syrian-express-changes-course" locale="en">
          <p>
            The “Syrian Express” is the name for the sea bridge along which
            Russia carried military cargo to Tartus in Syria for years, and from
            there further south. How that bridge was rebuilt after Assad fell is
            the subject of{" "}
            <Link href="/en/articles/syrian-express-changes-course">
              the previous part of this series
            </Link>
            : the Black Sea route wound down, the cargo began going from the
            Baltic and the Arctic around the whole of Europe, and Africa became
            the main recipient of the weapons.
          </p>
        </IfArticleVisible>

        <p>
          Lady Mariia comes from that same fleet. She is a sister ship of the
          ro-ro carrier Baltic Leader, whose file we went through in the
          previous article: both were built in 2000 at the German yard
          Peene-Werft, both are about 127 metres long, they have almost
          mirror-image renaming histories, and they belong to the same company —
          MG-Flot, formerly Transmorflot
          <a className="ref" href="#ref-4">
            [4]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . The voyage is familiar too: in early August Lady Mariia left St
          Petersburg, passed Gibraltar on 29 August and called at Oran on the
          North African coast
          <a className="ref" href="#ref-6">
            [6]
          </a>
          <a className="ref" href="#ref-3">
            [3]
          </a>
          .
        </p>

        {/* Column widths are set explicitly: otherwise the table lays them out
            by content, the two ship columns come out different, and the images
            in them differ in height even though the aspect ratio is shared. */}
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "22%" }} />
              <th style={{ width: "39%" }}>Lady Mariia</th>
              <th style={{ width: "39%" }}>Baltic Leader</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Appearance</td>
              <td>
                <img
                  src="/articles/afrykanska-kampaniia/lady-mariia.jpg"
                  alt="A red ro-ro carrier under way: white superstructure forward, two cargo cranes on the hull"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "2px",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    marginTop: "5px",
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    lineHeight: 1.35,
                    opacity: 0.65,
                  }}
                >
                  Photographed as Global Carrier — one of the eight names this
                  hull has sailed under
                </span>
              </td>
              <td>
                <img
                  src="/articles/afrykanska-kampaniia/baltic-leader.jpg"
                  alt="A red ro-ro carrier under way on a river, long pipes on deck; the same white superstructure forward and two cargo cranes"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "2px",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    marginTop: "5px",
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    lineHeight: 1.35,
                    opacity: 0.65,
                  }}
                >
                  Photographed under her present name: it appears on the hull in
                  both Cyrillic and Latin script
                </span>
              </td>
            </tr>
            <tr>
              <td>IMO</td>
              <td>9220641</td>
              <td>9220639</td>
            </tr>
            <tr>
              <td>Yard, year</td>
              <td>Peene-Werft, 2000</td>
              <td>Peene-Werft, 2000</td>
            </tr>
            <tr>
              <td>Length, deadweight</td>
              <td>126.88 m, 7,184 t</td>
              <td>126.86 m, 7,195 t</td>
            </tr>
            <tr>
              <td>First and last of the former names</td>
              <td>Scan Finlandia … Stella-Maria</td>
              <td>Scan Germania … Fleet Leader</td>
            </tr>
            <tr>
              <td>With MG-Flot</td>
              <td>since 21 June 2021</td>
              <td>since 16 February 2022</td>
            </tr>
          </tbody>
        </table>

        {/* TODO(rights): the left image needs permission; the right one needs
            the author and licence name from its Wikimedia Commons file page. */}
        <p
          style={{
            marginTop: "-18px",
            fontSize: "11px",
            lineHeight: 1.5,
            opacity: 0.65,
          }}
        >
          Ship data from the HUR files
          <a className="ref" href="#ref-4">
            [4]
          </a>
          <a className="ref" href="#ref-12">
            [12]
          </a>
          . The photograph of Baltic Leader is from Wikimedia Commons; author
          and licence to be credited before publication.
        </p>

        <p>
          We closed the previous article with the conclusion that losing Tartus
          did not stop the logistics: the route got longer, cargo ships started
          sailing under escort by warships — the loss of one node turned out to
          be too little to collapse the chain. Lady Mariia was sailing without
          an escort. The nearest Russian escort — the destroyer Admiral
          Levchenko with the tanker General Skobelev, plus Akademik Pashin and
          that same ro-ro carrier Sparta which featured in the first part —
          passed Gibraltar eastbound on 27 August and could not have reached her
          in time
          <a className="ref" href="#ref-2">
            [2]
          </a>
          .
        </p>

        <p>
          This was not the first strike on Russian ships in the Mediterranean.
          There had been earlier attacks in the same sea on tankers — ships
          carrying the oil and gas whose sale funds the war. HUR puts Lady
          Mariia in a different category: vessels that carry military cargo
          <a className="ref" href="#ref-4">
            [4]
          </a>
          . If Ukraine is behind the attack, then for the first time here it hit
          not the Kremlinʼs revenue but its arms logistics
          <a className="ref" href="#ref-13">
            [13]
          </a>
          .
        </p>

        <p>
          There is no official acknowledgement from the Ukrainian side — and
          that is no exception: Kyiv has never officially admitted to a single
          one of its operations in Africa.
          <a className="ref" href="#ref-14">
            [14]
          </a>
          <a className="ref" href="#ref-15">
            [15]
          </a>{" "}
          Attacks at sea, though, are not the only evidence of a Ukrainian
          presence in the region. RFI and AP wrote about Ukrainian servicemen in
          western Libya back in the spring
          <a className="ref" href="#ref-15">
            [15]
          </a>
          <a className="ref" href="#ref-16">
            [16]
          </a>
          ; in Mali and Sudan, according to CNN, Ukrainian specialists have been
          working for years
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . How did they get there?
        </p>

        {/* ===================== SUDAN ===================== */}
        <h2 id="sec-sudan">
          <span className="h2-num">§ 01 · Sudan</span>A call from a besieged
          Khartoum
        </h2>

        <p>
          Wagner had been working in Sudan since 2017, still under President
          Omar al-Bashir, and the job was twofold: guarding gold mines and
          mining operations, and training the army and other paramilitary
          formations
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . Sudanese gold was taken out through neighbouring countries to
          Russia; back in 2023 the US Treasury wrote that African resources were
          helping Moscow get around sanctions
          <a className="ref" href="#ref-19">
            [19]
          </a>
          .
        </p>

        <p>
          In April 2023 that construction fell apart. The regular army of
          General Abdel Fattah al-Burhan and the paramilitary Rapid Support
          Forces (RSF) of Mohamed Hamdan Dagalo, known as Hemedti — who two
          years earlier had together overthrown the civilian government — now
          started fighting each other. Wagner picked the RSF: a senior figure in
          the Sudanese security structures told CNN that roughly 90% of the
          RSFʼs weapons came from the Russians, and that the supplies did not
          stop even after Prigozhinʼs death
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">Where the Africa Corps came from</div>
          <p>
            Until 2023 the Russian presence in Africa was built by the private
            company Wagner. After Prigozhinʼs mutiny and death, its networks of
            influence passed under the control of the Russian defence ministry
            and were given a new name: the Africa Corps
            <a className="ref" href="#ref-19">
              [19]
            </a>
            <a className="ref" href="#ref-21">
              [21]
            </a>
            . The chain of command changed, the tasks did not: gold, weapons and
            protection for regimes — tasks that lost none of their value in the
            handover of authority
            <a className="ref" href="#ref-19">
              [19]
            </a>
            . From here on, “Wagner” in this text means the period before 2023,
            and “the Corps” the period after.
          </p>
        </div>

        <p>
          In the summer of 2023 al-Burhan found himself surrounded in his own
          capital — and phoned Zelensky. There were two reasons to answer the
          call for help: according to Ukrainian and Sudanese military officials,
          Burhan had been quietly supplying Kyiv with weapons since the start of
          the full-scale invasion, and on the other side of the Sudanese front
          stood Wagner, which was funding the war against Ukraine with Sudanese
          gold. A few weeks after the call, Ukrainian fighters landed in Sudan
          and began driving the RSF out of the capital
          <a className="ref" href="#ref-22">
            [22]
          </a>
          . In Carnegieʼs account it was about a hundred HUR fighters, who
          arrived in Khartoum in mid-August 2023, and the first task was the
          evacuation of al-Burhan from the capital
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . Kyiv Post adds a detail: al-Burhan left the city, thanked the
          Ukrainian soldiers — and a month later met Zelensky in Ireland
          <a className="ref" href="#ref-23">
            [23]
          </a>
          .
        </p>

        <p>
          In public Budanov explained the logic of Ukraineʼs actions without
          naming specifics: Ukraine had killed and would go on killing Russians
          “anywhere in this world, right up to full victory”
          <a className="ref" href="#ref-24">
            [24]
          </a>
          .
        </p>

        <p>
          The first public traces of the operation surfaced later. CNN published
          an investigation: a series of drone strikes and a ground operation
          against the RSF in Omdurman, the city across the Nile from Khartoum,
          were “likely” carried out by Ukrainian special services
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . CNN could not confirm it independently. The video shows at least
          eight strikes by two types of commercial drone widely used in the
          Ukrainian army; the Ukrainian word for “stop” is visible on the
          controller screen, and an operator in a balaclava is visible in the
          reflection. A British weapons researcher from the Calibre Obscura
          project, who analysed the footage for the broadcaster, recognised the
          controller used to fly DJI Mavic drones. Six strikes hit pickup trucks
          on the Shambat bridge, eight others hit vehicles, buildings and people
          in Omdurman and the Ombada suburb; CNN geolocated the places but could
          not confirm the date of filming. Wim Zwijnenburg of the Dutch
          organisation PAX said drones of this type were being seen in Africa
          for the first time
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          The strikes began two days after Wagner ran a large weapons convoy to
          the RSF garrison at al-Zurug in the south-west of the country:
          satellite images showed more than a hundred vehicles, and two Chadian
          military informants told CNN the column had come through Chad
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . HUR spokesman Andriy Yusov answered the broadcasterʼs query with a
          phrase that would become standard for this campaign: “We can neither
          confirm nor deny it”
          <a className="ref" href="#ref-20">
            [20]
          </a>
          . Sudanese military officials told CNN they knew nothing about a
          Ukrainian operation, and American officials were caught off guard and
          could not give a clear answer either
          <a className="ref" href="#ref-20">
            [20]
          </a>
          .
        </p>

        <p>
          On 23 September 2023, four days after the CNN story, Zelensky and
          al-Burhan met unexpectedly at Shannon airport in Ireland, where the
          plane had landed for a technical stop. The official statement spoke of
          “common security challenges, in particular the activity of illegal
          armed formations funded by Russia”, thanked Sudan for supporting
          Ukraineʼs territorial integrity and invited it to join Grain from
          Ukraine
          <a className="ref" href="#ref-25">
            [25]
          </a>
          . Sudanʼs Sovereign Council made no statement but published
          photographs and a short video of the meeting; the Sudanese outlet
          Sudan Tribune noted that the meeting came shortly after reports of
          strikes by Ukrainian special services on the RSF in Khartoum
          <a className="ref" href="#ref-26">
            [26]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/zelensky-burhan.jpg"
            alt="Two men sit facing each other in armchairs in an airport lounge; a low glass table between them"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            Zelensky and al-Burhan at Shannon, 23 September 2023.
          </figcaption>
        </figure>

        <p>
          On 6 October 2023 another video appeared on Ukrainian Telegram
          channels and on the Babel website — light-skinned men with sniper
          rifles in a mountainous desert. Bellingcat set about checking it. The
          shooterʼs position was geolocated to the Al-Markhiyat hills west of
          Omdurman (15.708352, 32.426962), and the drone strike footage down to
          specific neighbourhoods: a house on Al-Amin El-Karab street in
          Khartoum on the bank of the Nile, and the Abu Rof and Wad Nubawi
          districts of Omdurman
          <a className="ref" href="#ref-27">
            [27]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/OQD-wnaZ3-I?rel=0"
            title="The compilation of footage from Sudan analysed by Bellingcat: a rifleman in the hills and drone strikes"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            The compilation Bellingcat analysed: a rifleman in the hills, then
            drone strikes.
          </figcaption>
        </figure>

        <p>
          Small details in frame gave away a little: beside the rifleman lay an
          empty bottle of Egyptian Lavie water and a can of the Saudi energy
          drink LiftUp, which may say something about how the operators moved.
          The weapon, in Calibre Obscuraʼs assessment, cannot be identified
          precisely: “a modern rifle with a suppressor, similar to those used by
          special operations forces around the world”. Bellingcatʼs conclusion
          was cautious: the video really was shot in Sudan, but it was not
          possible to establish from open sources that the men in it were
          Ukrainian special forces
          <a className="ref" href="#ref-27">
            [27]
          </a>
          . A better-quality copy, though, was sent to a Bellingcat contributor
          and to other journalists — that is, the video did not simply “leak”,
          it was deliberately circulated
          <a className="ref" href="#ref-27">
            [27]
          </a>
          .
        </p>

        <figure className="fig">
          <AutoFrame
            src="/maps/afrykanska-kampaniia/sudan-geolocation-en.html"
            title="Bellingcat geolocations: where the Sudan footage was filmed"
            fallbackHeight={620}
            mobileFallbackHeight={480}
          />
          <figcaption>
            Where that footage was filmed: seven Bellingcat geolocations.
          </figcaption>
        </figure>

        <p>
          That was far from the last video. In November 2023 Kyiv Post published
          two new pieces of evidence: a night assault on a building, filmed from
          a drone in infrared, with a grenade launcher round fired through a
          window, and daytime footage from two to four hundred metres up, with
          munitions exploding among the streets. The outlet noted that it could
          not verify the recordings independently, and a source in the Ukrainian
          security sector said it was “likely the work of HUR special units”
          <a className="ref" href="#ref-28">
            [28]
          </a>
          . Irelandʼs RTÉ, which showed the same footage, drew attention to
          something else: after it, the September meeting at Shannon read
          completely differently
          <a className="ref" href="#ref-18">
            [18]
          </a>
          . In January 2024 the outlet showed three drone strikes on vehicles
          <a className="ref" href="#ref-29">
            [29]
          </a>
          , and in February a video in which fighters of HURʼs Tymur group
          inspect wrecked vehicles and interrogate prisoners
          <a className="ref" href="#ref-30">
            [30]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/zEgQq9g5zMg?rel=0"
            title="Night assault on a building in Sudan, filmed from a drone in infrared"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            Night assault on a house in Omdurman, filmed from a drone in
            infrared.
          </figcaption>
        </figure>

        <div className="qtbox">
          <div className="qtbox__lang">
            Interrogation recording · February 2024
          </div>
          <p className="qtbox__quote">
            — Your rank? — Private. — Unit? — PMC Wagner. — How did you end up
            in Sudan? — We travelled through the Central African Republic to
            Khartoum. — What was the aim? — To overthrow the local government. —
            How many of you are here? — A hundred.
          </p>
          <div className="qtbox__cite">
            Video obtained by Kyiv Post from sources in the Ukrainian special
            services. Alongside, two Africans are being interrogated, whom the
            outlet describes as probably locals recruited by Wagner
            <a className="ref" href="#ref-30">
              [30]
            </a>
            . Middle East Eye, which relayed the video, notes that it did not
            verify it independently
            <a className="ref" href="#ref-31">
              [31]
            </a>
          </div>
        </div>

        <p>
          A week after the prisoner video, the commander of the Tymur unit gave
          his first long interview, to Ukrainska Pravda. On Sudan he used the
          same phrase as Yusov — and immediately let more show than silence
          would have.
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">
            Commander of the Tymur special unit · February 2024
          </div>
          <p className="qtbox__quote">
            We can neither confirm nor deny that information, thatʼs the first
            thing. And secondly — what surprises you? […] For all the evil the
            occupiers have brought to our land, there will be nowhere safe for
            them in the world. Not at home in the Russian Federation, not in the
            occupied territories, not in any other corner of the world.
          </p>
          <div className="qtbox__cite">
            Interview with Ukrainska Pravda.
            <a className="ref" href="#ref-32">
              [32]
            </a>
          </div>
        </div>

        <p>
          Asked directly in an interview what Ukrainians were doing in Africa,
          Zelensky replied: “Right now Iʼm not talking about Africa”, and a
          little later added: “Iʼll put it this way: in Africa, it seems to me,
          they are doing the same evil to people as they do at home. In my view
          they should not be travelling anywhere, and they should not be
          committing terrorism around the world”
          <a className="ref" href="#ref-32">
            [32]
          </a>
          . The unit itself, by its commanderʼs account, was put together on the
          first day of the full-scale war from career officers, volunteers and
          athletes; its record includes Snake Island, the Boyko Towers and raids
          in Crimea and the Kherson region
          <a className="ref" href="#ref-32">
            [32]
          </a>
          .
        </p>

        <p>
          Analysts were restrained about what the operation was worth. Matthew
          Orr of the firm RANE pointed out that most of the content came from
          Ukrainian media, to which HUR selectively leaked material, and that
          the volume of that material suggested a small presence rather than a
          large one. The point, in his view, lay elsewhere: forcing Moscow to
          spend disproportionate resources protecting its interests in new
          geographies. Anton Mardasov of the Middle East Institute was blunter —
          “this is more like fighting Russia where it isnʼt”. Nicholas Heras of
          the New Lines Institute summed up: a small Ukrainian contingent in
          Sudan is a signal to the world that Ukraine is ready to fight Russia
          anywhere, and at the same time an attempt to find allies on a
          continent where most countries back Moscow
          <a className="ref" href="#ref-33">
            [33]
          </a>
          .
        </p>

        <p>
          In the spring of 2024 Sergei Lavrov suddenly arrived in Khartoum and
          met al-Burhan and Hemedti separately
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . After that Wagner went on arming the RSF in exchange for gold, while
          the channels to the army stayed open for official communication with
          Russia. In April 2024 the Russian ambassador offered al-Burhan
          weapons, Sudanʼs intelligence chief travelled to Moscow, and on 28
          April Russian deputy foreign minister Mikhail Bogdanov flew into Port
          Sudan with a delegation that included military officers. He publicly
          called the Sovereign Council the countryʼs legitimate authority, the
          Sudanese army was promised “unlimited quality military aid”, Russia
          began shipping diesel to Sudan, and on 4 May a Russian Il-76 from
          Dubai landed at Port Sudan
          <a className="ref" href="#ref-34">
            [34]
          </a>
          .
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Assessment · May 2024</div>
          <p className="qtbox__quote">
            The result is a double situation in Sudan, where official Russia
            backs Burhan while the proxy Wagner, an instrument of Russian
            foreign policy, backs the RSF. In effect Russia has bet on every
            horse in the race.
          </p>
          <div className="qtbox__cite">
            Kholood Khair, founder of the Sudanese analytical firm Confluence
            Advisory, speaking to Middle East Eye
            <a className="ref" href="#ref-34">
              [34]
            </a>
          </div>
        </div>

        <p>
          The price of that turn was cooperation with Ukraine. Following
          Bogdanovʼs visit to Khartoum, the local government promised to wind
          down its cooperation with Ukraine — in exchange for Russia ending its
          help to the RSF
          <a className="ref" href="#ref-35">
            [35]
          </a>
          . Whether the new bargain was kept is hard to judge. The RSF has since
          leaned first and foremost on the United Arab Emirates, and the
          official government, besides Russia, also on Iran
          <a className="ref" href="#ref-35">
            [35]
          </a>
          <a className="ref" href="#ref-36">
            [36]
          </a>
          , while the supply channel through Kufra airport in south-eastern
          Libya, which became the RSFʼs main one in 2025–2026, is linked by
          analysts to the UAE — even though the transport aircraft in satellite
          images are often Russian-built
          <a className="ref" href="#ref-36">
            [36]
          </a>
          .
        </p>

        <p>
          The most interesting item in the bargain, though, was the opening of a
          Russian naval port at Port Sudan. Russia was planning a base there
          that would let it control the Red Sea and part of the Indian Ocean. An
          agreement on a logistics facility for four ships and three hundred
          personnel was signed back in 2020 but never ratified
          <a className="ref" href="#ref-37">
            [37]
          </a>
          . The base never appeared. In November 2025 the Russian ambassador
          Andrey Chernovol said: “Given the current military conflict, movement
          on this question has been halted for now”
          <a className="ref" href="#ref-37">
            [37]
          </a>
          .
        </p>

        <p>
          Less is known about the Ukrainian forces. In May 2024 Middle East Eye
          wrote, citing analysts, that there were between one and three hundred
          Ukrainian servicemen in the country, working mostly at night alongside
          the Sudanese army
          <a className="ref" href="#ref-34">
            [34]
          </a>
          . Asked at the time whether they were still in Sudan, Budanov answered
          evasively: “We are waging a full-scale war with Russia. They have
          units in various parts of the world, and we sometimes try to hit them
          there”
          <a className="ref" href="#ref-23">
            [23]
          </a>
          . After that there is almost no public evidence. Only in September
          2026 did CNN write, citing sources in HUR, that several Ukrainian
          specialists are still working in Sudan
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <p>
          Yet for all the strategic failure, the Sudan episode set the narrative
          under which Ukraine acquired the ambition to go on working on the
          African continent. Mali came next.
        </p>

        {/* ===================== MALI ===================== */}
        <h2 id="sec-mali">
          <span className="h2-num">§ 02 · Mali</span>The trap at Tinzaouaten
        </h2>

        <p>
          Mali has been run since 2020 by a junta that came to power in two
          coups in a row. It ended up expelling the French contingent and the UN
          mission, and inviting Wagner into the country instead; by the US State
          Departmentʼs estimate the deal with the mercenaries cost ten million
          dollars a month
          <a className="ref" href="#ref-19">
            [19]
          </a>
          . In November 2023 the cooperation bore fruit: the army, together with
          the Russians, took Kidal — a town in the north that Tuareg separatists
          had controlled for almost ten years
          <a className="ref" href="#ref-38">
            [38]
          </a>
          . That victory was quickly taken as the main proof that the Russian
          model works
          <a className="ref" href="#ref-39">
            [39]
          </a>
          .
        </p>

        <p>
          At the end of July 2024 a Malian army column with Wagner fighters
          advanced on the border town of Tinzaouaten, which is surrounded on
          almost every side by Algerian territory. The Malian army announced
          that a “stabilisation operation” had begun on 19 July
          <a className="ref" href="#ref-40">
            [40]
          </a>
          . The fighting lasted three days
          <a className="ref" href="#ref-41">
            [41]
          </a>
          . The column could not take the town and withdrew
          <a className="ref" href="#ref-40">
            [40]
          </a>
          . During the withdrawal, though, sandstorms caught the military
          columns — routine for the Tuaregs, presumably, and not for the
          Russians. The Tuaregs were able to regroup, set up an ambush and catch
          their opponents off guard, after which fierce fighting began with
          heavy losses in men and equipment
          <a className="ref" href="#ref-40">
            [40]
          </a>
          . It was Wagnerʼs worst defeat in its entire presence in Africa
          <a className="ref" href="#ref-40">
            [40]
          </a>
          .
        </p>

        {/* TODO(source): record where this image came from — channel or
            publication and date — and who took it. Without that the caption
            stays a description of whatʼs in frame, not an attribution. */}
        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/tinzaouaten-aftermath.jpg"
            alt="Six armed fighters in the desert pose in front of an abandoned sand-coloured armoured vehicle; belongings scattered around"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            The aftermath of the battle at Tinzaouaten. We are not using the
            images of bodies and prisoners that circulated more widely.
          </figcaption>
        </figure>

        <p>
          The death tolls do not agree. Comparing the claims of the different
          sides, though, makes it possible to form an estimate.
        </p>

        <table>
          <thead>
            <tr>
              <th>Who claimed it</th>
              <th>What exactly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Tuareg coalition CSP</td>
              <td>
                84 Wagner fighters and 47 Malian soldiers killed
                <a className="ref" href="#ref-42">
                  [42]
                </a>
              </td>
            </tr>
            <tr>
              <td>CSP-DPA military leader — to Le Monde</td>
              <td>
                About 50 Wagner fighters killed and two taken prisoner
                <a className="ref" href="#ref-38">
                  [38]
                </a>
              </td>
            </tr>
            <tr>
              <td>JNIM, an al-Qaeda affiliate</td>
              <td>
                50 Russians and 10 Malians — a claim circulated via SITE
                <a className="ref" href="#ref-40">
                  [40]
                </a>
              </td>
            </tr>
            <tr>
              <td>Wagner</td>
              <td>
                A rare statement of its own: fighting on 22–27 July, heavy
                losses, commander Sergei Shevchenko killed; Russian war
                correspondents wrote of at least twenty dead
                <a className="ref" href="#ref-40">
                  [40]
                </a>
              </td>
            </tr>
            <tr>
              <td>The Malian army</td>
              <td>
                A “large number” of dead, no figures
                <a className="ref" href="#ref-43">
                  [43]
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Which of the regimeʼs opponents actually took part in the ambush is
          also disputed. The Tuaregs insist they fought the battle on their own,
          “exclusively from beginning to end”
          <a className="ref" href="#ref-42">
            [42]
          </a>
          , and accused JNIM of trying to appropriate someone elseʼs victory
          <a className="ref" href="#ref-41">
            [41]
          </a>
          . Reutersʼ sources, however, said the column was attacked by both
          Tuareg separatists and JNIM, and how far they acted in concert is not
          known
          <a className="ref" href="#ref-40">
            [40]
          </a>
          . The Malian authorities, naturally, maintain that the Tuaregs and the
          jihadists work together
          <a className="ref" href="#ref-40">
            [40]
          </a>
          . These details matter here, because shortly before, the Tuaregs
          described their links with Kyiv as an everyday matter: “We have links
          with the Ukrainians, but the same as with everyone else — the French,
          the Americans and the rest”, CSP-DPA spokesman Mohamed Elmaouloud
          Ramadane told Le Monde
          <a className="ref" href="#ref-38">
            [38]
          </a>
          . A Ukrainian link to the Islamists, meanwhile, was alleged solely by
          pro-Russian sources.
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">
            Whoʼs who · the Tuaregs and JNIM
          </div>
          <p>
            The CSP, later the Front for the Liberation of Azawad, are secular
            Tuareg separatists fighting for northern Mali against the central
            government. JNIM is a group linked to al-Qaeda, with different aims
            and a different ideology. They share an opponent — the Malian army
            and the Russians — and they sometimes fight in the same area.
            Russian agencies consistently roll the two into one: that is how
            help for the Tuaregs turns into “support for terrorism”.
          </p>
        </div>

        <p>
          On 29 July, HUR spokesman Andriy Yusov unexpectedly said on the
          national telethon: “The rebels received the necessary information, and
          not only information, which allowed them to conduct a successful
          military operation against Russian war criminals. We will certainly
          not discuss the details for now, but there will be more to come”
          <a className="ref" href="#ref-44">
            [44]
          </a>
          . That same week the same Kyiv Post, through which evidence from
          Africa had already been leaked, published a photograph of Tuareg
          fighters with a Ukrainian flag; sources in the Ukrainian security
          structures confirmed to the outlet that the image was genuine
          <a className="ref" href="#ref-45">
            [45]
          </a>
          . Ukraineʼs ambassador to Senegal, Yuriy Pyvovarov, shared the video
          of Yusov on the embassyʼs Facebook page and added that “the work will
          continue” and that “punishment for war crimes and terrorism is
          inevitable”
          <a className="ref" href="#ref-46">
            [46]
          </a>
          .
        </p>

        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/tuaregs-ukrainian-flag.webp"
            alt="A line of fighters in the desert holds the flag of Azawad and the flag of Ukraine"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            The photograph in question: Tuareg fighters with the flag of Azawad
            and the Ukrainian flag. Published by Kyiv Post, its authenticity
            confirmed by sources in the Ukrainian security structures
            <a className="ref" href="#ref-45">
              [45]
            </a>
            .
          </figcaption>
        </figure>

        <p>
          On 4 August Mali broke off diplomatic relations with Ukraine,
          accusing it of “supporting international terrorism” and invoking the
          “neo-Nazi and cowardly nature” of the Ukrainian authorities
          <a className="ref" href="#ref-42">
            [42]
          </a>
          <a className="ref" href="#ref-45">
            [45]
          </a>
          . On 6 August Niger did the same — “in full solidarity with the
          government and people of Mali”
          <a className="ref" href="#ref-43">
            [43]
          </a>
          . Senegal summoned Pyvovarov to “remind him of the duty of restraint
          and non-interference”
          <a className="ref" href="#ref-46">
            [46]
          </a>
          ; he deleted the post. Maria Zakharova declared that Kyiv, “unable to
          defeat Russia on the battlefield, has opened a second front in Africa”
          <a className="ref" href="#ref-43">
            [43]
          </a>
          . On 19 August the foreign ministers of Mali, Niger and Burkina Faso
          wrote a joint letter to the UN Security Council — about the “open and
          acknowledged support by the government of Ukraine for international
          terrorism, particularly in the Sahel” — and demanded that the Council
          “assume its responsibilities”
          <a className="ref" href="#ref-47">
            [47]
          </a>
          . Ukraineʼs foreign ministry called Bamakoʼs decision short-sighted
          and hasty, stressed that nobody had produced evidence of involvement,
          and rejected the accusation of supporting terrorism
          <a className="ref" href="#ref-48">
            [48]
          </a>
          . Yusov himself later backtracked and said he had not meant that
          Ukrainian intelligence was involved
          <a className="ref" href="#ref-45">
            [45]
          </a>
          .
        </p>

        <p>
          The price of speaking openly turned out to be real. The statement came
          days before foreign minister Dmytro Kuleba set off on his fourth
          African tour in two years, and ECOWAS condemned “any foreign
          interference” in the region
          <a className="ref" href="#ref-46">
            [46]
          </a>
          . Malian media at the same time began writing about a “secret HUR
          project” to train “terrorists” and even named a handler — though the
          source of that information turned out to be the pro-Russian blogger
          Anatoliy Shariy
          <a className="ref" href="#ref-45">
            [45]
          </a>
          .
        </p>

        <p>
          In the autumn of 2024 Le Monde noticed a marked change in how the
          Tuareg tribes fought: light quadcopters with an improvised release
          system approach the target, drop small charges and withdraw. On 4
          October such drones worked over an army camp at Goundam in the
          Timbuktu region, where Wagner fighters are based — according to a CSP
          representative, “at least nine mercenaries” were killed; in September
          the same tactic had been used at Goundam and against Léré, 150
          kilometres to the south-west. The rebels posted every such attack on
          social media
          <a className="ref" href="#ref-49">
            [49]
          </a>
          . After those publications Ukraineʼs foreign ministry issued a
          statement: Kyiv “firmly rejects the accusations… regarding our stateʼs
          alleged involvement in supplying drones to rebels in Mali”
          <a className="ref" href="#ref-50">
            [50]
          </a>
          .
        </p>

        <p>
          A year and a half later, on 25 April 2026, at around five in the
          morning, shooting broke out in Sévaré, and at six there were
          explosions near the main military base at Kati outside Bamako. The
          capitalʼs airport was closed, flights were turned back, and a
          three-day curfew was imposed in the city. The house of defence
          minister Sadio Camara at Kati was destroyed, according to two
          witnesses
          <a className="ref" href="#ref-51">
            [51]
          </a>
          . The army said it had killed “several hundred” attackers and
          repelled the assault; a government spokesman gave a figure of sixteen
          wounded
          <a className="ref" href="#ref-51">
            [51]
          </a>
          .
        </p>

        <p>
          Both rebel groups claimed responsibility for the sudden escalation.
          JNIM announced via SITE attacks at Kati, on Bamako airport, and in
          Mopti, Sévaré and Gao, and said Kidal had been “captured” in an
          operation coordinated with the Front for the Liberation of Azawad. The
          FLAʼs spokesman Mohamed Elmaouloud Ramadane wrote instead that his
          forces had seized positions in Gao and one of the two military camps
          in Kidal. Reuters could not verify any of these claims
          <a className="ref" href="#ref-51">
            [51]
          </a>
          . Separately, JNIM stated that it had not attacked the Malian armyʼs
          Russian partners and would like “balanced and effective relations”
          with them in future
          <a className="ref" href="#ref-51">
            [51]
          </a>
          . The Russian embassy in Bamako condemned the “cowardly” attacks, and
          the Russian foreign ministry added that, on preliminary information,
          “Western security services” might have been involved in preparing the
          attackers
          <a className="ref" href="#ref-51">
            [51]
          </a>
          .
        </p>

        <p>
          A day later the Africa Corps, finding itself surrounded in Kidal,
          negotiated a safe corridor and left the town. On 26 April the FLA
          announced that an agreement with the Russians had been reached and the
          town was “now free”; videos soon appeared of Tuaregs jeering the
          column on its way out
          <a className="ref" href="#ref-39">
            [39]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/0Xk34G3HqGY?rel=0"
            title="An Africa Corps column leaves Kidal, April 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            The Africa Corps leaves Kidal, April 2026.
          </figcaption>
        </figure>

        <p>
          The scale of the Ukrainian contribution to training the Tuaregs, and
          to their recent successes, is hard to assess. By CNNʼs own
          investigation, about fifteen Ukrainian specialists work in Mali,
          attached to the Front for the Liberation of Azawad; they take no part
          in front-line fighting, but train, coordinate and fly other peopleʼs
          drones remotely. “I run their operations remotely. The signal from
          their drone reaches me over the internet, and I tell them straight
          away by radio what to do and where to fly”, one of the operators told
          the broadcaster
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . The same operator said the Ukrainians had also helped the rebels
          during the capture of Kidal
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . According to a source in HUR, soldiers from Chad, Niger and Burkina
          Faso have also trained in Mali
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <div className="qtbox">
          <div className="qtbox__lang">Source in HUR · September 2026</div>
          <p className="qtbox__quote">
            The culture and the religion are different, but when the same idiots
            are attacking you, ideological differences take second place.
          </p>
          <div className="qtbox__cite">
            A source in Ukrainian military intelligence on the partnership with
            the Tuaregs, speaking to CNN. The operator himself calls some of the
            rebels “radicals” and adds: “It has turned out that right now weʼre
            on the same side of the barricades”
            <a className="ref" href="#ref-17">
              [17]
            </a>
          </div>
        </div>

        <p>
          Conditions there are different from those at home. “Dust and heat put
          equipment out of action faster. Filters, cooling, protecting the
          electronics, batteries — everything works differently”, the HUR source
          explains; the war itself is different too: “In Ukraine itʼs high
          intensity, massed strikes, constant pressure. Here itʼs more a war of
          manoeuvre across large territories — ambushes, control of routes, work
          in small groups and knowledge of the terrain”
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        <p>
          For Russia, Kidal turned into a reputational blow: the analysts CNN
          spoke to call the filmed withdrawal serious damage to Moscowʼs image
          as a guarantor of regimes, and Ulf Laessing of the Konrad Adenauer
          Foundation sums up that the Russiansʼ only victory in Mali was the
          capture of Kidal in 2023
          <a className="ref" href="#ref-39">
            [39]
          </a>
          . At the same time, Bamako has no alternative: Russia remains the only
          partner willing to send fighters directly to the front line
          <a className="ref" href="#ref-39">
            [39]
          </a>
          . Taking that into account, along with the rebelsʼ evident attempt not
          to strain relations with Moscow, the work of the Ukrainian specialists
          in the region is very risky and very tense. It is also without an
          alternative, if Ukraine still wants to strike Russian forces in
          different corners of the world.
        </p>

        {/* ===================== LIBYA AND THE SEA ===================== */}
        <h2 id="sec-libya">
          <span className="h2-num">§ 03 · Libya</span>A foothold on someone
          elseʼs shore
        </h2>

        <p>
          Libya has been split in two since 2014. In the west is the Government
          of National Unity based in Tripoli, which the UN recognises; in the
          east are the structures behind which stands Field Marshal Khalifa
          Haftar. The big war between them ended in a truce in 2020, and since
          then the country has lived under dual power
          <a className="ref" href="#ref-52">
            [52]
          </a>
          . Russia has been entrenched in the east since 2018: six airbases with
          an Africa Corps presence are acquiring new infrastructure, and in
          February 2025 Haftar signed an agreement with Moscow and Minsk on
          shared use of the infrastructure at Tobruk
          <a className="ref" href="#ref-53">
            [53]
          </a>
          . And when the Assad regime fell in December 2024, Libya became almost
          the main Russian port of the Mediterranean basin. Within a month CEPA
          analysts were writing that it was the “only viable transit hub” left
          for supplying Russian units in Africa
          <a className="ref" href="#ref-54">
            [54]
          </a>
          , and the flights to Bamako that used to run through Khmeimim in Syria
          began departing from here
          <a className="ref" href="#ref-55">
            [55]
          </a>
          . At the end of 2025, Ukrainians appeared in that same country.
        </p>

        <LibyaControlMap lang="en" />

        <p>
          On 2 April 2026 the French international broadcaster RFI published an
          investigation according to which more than two hundred Ukrainian
          officers and specialists are in western Libya by agreement with the
          government. They are based at three sites: the air force academy at
          Misrata, where Turkish and Italian units, US Africa Command and a
          British intelligence centre are also stationed; a base at Zawiya near
          the Mellitah oil complex, equipped for launching aerial and naval
          drones; and the headquarters of the 111th Brigade on the road to
          Tripoli airport, where coordination meetings with Libyan officers take
          place
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . The coastal plot with direct access to the sea was allocated to the
          Ukrainians by the Tripoli government; in October and November 2025 the
          perimeter there was being reinforced and runways and antennas put up
          <a className="ref" href="#ref-15">
            [15]
          </a>
          .
        </p>

        <p>
          The agreement, according to RFI, was signed in October 2025 at the
          request of the Ukrainian military attaché in Algeria. In return the
          Libyan military gets training, above all in drones, and in prospect
          weapons supplies and Ukrainian investment in the oil sector
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . The Ukrainian authorities did not respond to RFIʼs queries, and the
          Tripoli government stayed silent even after questions from the Libyan
          parliament
          <a className="ref" href="#ref-15">
            [15]
          </a>
          . A few days later the presence was confirmed by the Associated Press
          — also citing two Libyan officials, who called the arrangement a
          “secret agreement” backed by Western countries, the United States
          among them
          <a className="ref" href="#ref-16">
            [16]
          </a>
          .
        </p>

        <p>
          Why Tripoli wants this is a separate question, and the answer is not
          about Ukraine. Jalel Harchaoui, a Libya specialist associated with
          RUSI, recalls that when Russian fighters appeared outside Tripoli on
          Haftarʼs side in September 2019, NATO adopted a simple doctrine: the
          capital must stay out of Russiaʼs reach. That is precisely why
          Washington backed the large-scale Turkish intervention
          <a className="ref" href="#ref-56">
            [56]
          </a>
          . Sabotage on Libyan soil began earlier than the present presence: in
          December 2023 an expensive Russian military transport aircraft was
          destroyed at the Al-Jufra airbase, and such incidents have long been
          linked to Ukrainian operators with probable NATO assistance
          <a className="ref" href="#ref-56">
            [56]
          </a>
          .
        </p>

        <p>
          Then comes local politics. According to Harchaoui, between May and
          December 2025 the countryʼs leader Dbeibah was in real danger: tension
          in Tripoli, pressure from Haftar, and fears that Turkey, the
          traditional patron of the west, was increasingly “trying to please”
          his eastern rival. The prime minister was looking for a way to show
          himself unique and valuable to NATO — and “one way of not being like
          the pro-Russian Haftar is to be anti-Russian”
          <a className="ref" href="#ref-56">
            [56]
          </a>
          . Ukraine, in the same analystʼs words, has become “the drone capital
          of the world”, and around that have grown up entirely commercial
          structures — small companies legally registered in Bulgaria, Serbia or
          Turkey, which ferry specialists and mentors to wherever they are paid
          for
          <a className="ref" href="#ref-56">
            [56]
          </a>
          .
        </p>

        <h2 id="sec-sea">
          <span className="h2-num">§ 04 · The sea</span>Three ships in nine
          months
        </h2>

        <p>
          The first incident in the Mediterranean happened on 19 December 2025.
          A source in the SBU told The War Zone about a “new, unprecedented
          special operation” more than “two thousand kilometres” from Ukraine:
          the Alpha group hit the Oman-flagged tanker Qendil with aerial drones.
          The ship was sailing empty from Jamnagar in India, where it had
          discharged on 1 December, having left Novorossiysk on 4 November
          before that
          <a className="ref" href="#ref-57">
            [57]
          </a>
          . According to Lloydʼs List Intelligence the strike came as the tanker
          was heading west between Malta and Crete — roughly 930 miles from
          Ukraine
          <a className="ref" href="#ref-57">
            [57]
          </a>
          . In the video the SBU gave journalists, the munitions are dropped by
          a hexacopter: that implies a short range, so the drones were most
          likely launched from a nearby vessel
          <a className="ref" href="#ref-57">
            [57]
          </a>
          . RFI, by contrast, writes that the drone flew from Misrata
          <a className="ref" href="#ref-58">
            [58]
          </a>
          .
        </p>

        <p>
          The SBU stressed that the tanker was empty, so there was no
          environmental threat, and that in terms of international law it was an
          “absolutely legitimate target”
          <a className="ref" href="#ref-57">
            [57]
          </a>
          . The video was released by the volunteer Serhiy Sternenko
          <a className="ref" href="#ref-59">
            [59]
          </a>
          . That same day, at his annual press conference, Putin promised to
          “certainly respond” to the Ukrainian campaign against the shadow fleet
          <a className="ref" href="#ref-57">
            [57]
          </a>
          .
        </p>

        <figure className="fig">
          <iframe
            src="https://www.youtube.com/embed/Zy3D86j5KTc?rel=0"
            title="Strike on the tanker Qendil in the Mediterranean, 19 December 2025"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ aspectRatio: "16/9", height: "auto" }}
          />
          <figcaption>
            The strike on the tanker Qendil: the munitions are dropped by a
            hexacopter.
          </figcaption>
        </figure>

        <p>
          The sequel was not long in coming. On the night of 3 March 2026 the
          gas carrier Arctic Metagaz caught fire in the Mediterranean while on
          course for Port Said. She had taken her cargo on 18 February from the
          floating storage unit Saam off Murmansk, and on the evening of 2 March
          switched off her AIS as she left Maltaʼs exclusive economic zone
          <a className="ref" href="#ref-60">
            [60]
          </a>
          . All thirty crew members, Russian citizens, were taken off the ship
          <a className="ref" href="#ref-61">
            [61]
          </a>
          .
        </p>

        <p>
          Putin called it a “terrorist attack”, and the Russian transport
          ministry an “act of international terrorism and maritime piracy”,
          stating that the ship had been hit by Ukrainian naval drones launched
          from the Libyan coast
          <a className="ref" href="#ref-61">
            [61]
          </a>
          . Egypt, where the cargo was bound, denied having contracts with the
          vessel
          <a className="ref" href="#ref-61">
            [61]
          </a>
          . According to RFIʼs sources it was a surface drone of the Magura V5
          type, which hit the engine room; two of the four gas tanks exploded,
          tearing open the sides
          <a className="ref" href="#ref-15">
            [15]
          </a>
          <a className="ref" href="#ref-58">
            [58]
          </a>
          .
        </p>

        {/* TODO(rights): the image needs attribution — author and terms of use. */}
        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/arctic-metagaz-hull.jpg"
            alt="A burnt-out green-hulled gas carrier adrift in the open sea; the superstructure aft destroyed by fire"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            What was left of Arctic Metagaz. The name is still legible in
            Cyrillic on the bow.
          </figcaption>
        </figure>

        <p>
          The ship did not sink; for two months she drifted on the
          Mediterranean currents. On 16 March nine European countries wrote to
          the European Commission that the state of the vessel together with the
          nature of her cargo created an “imminent and serious risk of a major
          environmental disaster”
          <a className="ref" href="#ref-62">
            [62]
          </a>
          . Malta announced a response plan, but neither Malta nor Italy took
          the ship
          <a className="ref" href="#ref-62">
            [62]
          </a>
          . On 21 March Libyaʼs national oil corporation began towing her, on 2
          April the line parted in a storm, and the Libyan maritime
          administration declared the operation a failure, warning ships to keep
          at least ten miles away
          <a className="ref" href="#ref-62">
            [62]
          </a>
          . On 28 April a tug finally brought the gas carrier to anchor; at the
          end of the month she lay eight miles north-west of Daryanah, about
          eighteen miles from Benghazi — that is, in the part of Libya
          controlled by Haftar
          <a className="ref" href="#ref-63">
            [63]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">Why nobody took her</div>
          <p>
            Responsibility for a ship lies with the owner and the flag state,
            explains maritime law specialist Ian Ralby: “The owner doesnʼt want
            to take responsibility, and the flag state doesnʼt want to impose
            it. Liability insurance appears not to exist. That means whoever
            takes it upon themselves to do something will most likely be left
            with the bill for the goods. The ship has ended up in a legal vacuum
            where nobody owes anything”
            <a className="ref" href="#ref-62">
              [62]
            </a>
            . According to the Equasis database the shipʼs owner is an Indian
            company, while at the time of the incident a Russian firm was listed
            only as “manager”; Starboard analyst Mark Douglas calls the Indian
            structure a likely front
            <a className="ref" href="#ref-62">
              [62]
            </a>
            . Eikland Energy director Kjell Eikland puts it more bluntly still:
            “Here one has to assume that Russia and Novatek simply want the ship
            to sink”
            <a className="ref" href="#ref-62">
              [62]
            </a>
            .
          </p>
        </div>

        <p>
          The risks were counted separately. WWF warned of “cryogenic clouds
          lethal to marine fauna” and of long-term contamination of water and
          air. Besides the gas, about nine hundred tonnes of fuel oil remained
          on board
          <a className="ref" href="#ref-62">
            [62]
          </a>
          . Libyaʼs oil corporation later reported that most of the gas had
          probably already evaporated
          <a className="ref" href="#ref-63">
            [63]
          </a>
          .
        </p>

        <p>
          The consequence was recorded by maritime trackers: after March,
          Russian gas carriers began avoiding the Mediterranean and taking the
          longer route around southern Africa
          <a className="ref" href="#ref-63">
            [63]
          </a>
          .
        </p>

        <p>
          The third strike came on 6 September 2026 — the one this article opens
          with. The ro-ro carrier Lady Mariia was sailing east from Oran in
          Algeria towards Syria when several drones dropped munitions on her:
          the blasts hit the deck, the cargo cranes and the area around the
          superstructure
          <a className="ref" href="#ref-1">
            [1]
          </a>
          <a className="ref" href="#ref-3">
            [3]
          </a>
          . This episode differs from the previous two in its target. Qendil and
          Arctic Metagaz carried oil and gas, that is money; HUR lists Lady
          Mariia among the vessels that carry military cargo
          <a className="ref" href="#ref-4">
            [4]
          </a>
          — and if Ukraine is behind the attack, then for the first time in the
          Mediterranean it struck not the Kremlinʼs revenue but its arms
          logistics
          <a className="ref" href="#ref-13">
            [13]
          </a>
          . The ship survived: as of 12 September she was at anchor off Port
          Said with minor damage
          <a className="ref" href="#ref-1">
            [1]
          </a>
          .
        </p>

        <h2 id="sec-lefkada">
          <span className="h2-num">§ 05 · Lefkada</span>The drone that lost its
          way
        </h2>

        <p>
          On 7 May 2026 fishermen from the Greek island of Lefkada spotted a
          black uncrewed boat in a coastal cave near Cape Doukato. Its engine
          was running. They towed it into the port of Vasiliki and handed it
          over to the coastguard
          <a className="ref" href="#ref-64">
            [64]
          </a>
          . The next day the craft was taken to the mainland, and the explosives
          were later destroyed
          <a className="ref" href="#ref-65">
            [65]
          </a>
          . “It appears to have had some kind of malfunction and was moving
          without control”, said deputy shipping minister Stefanos Gikas. “That
          is, this thing — a black object with no navigation, carrying
          explosives — could have rammed a tourist vessel”
          <a className="ref" href="#ref-65">
            [65]
          </a>
          .
        </p>

        <p>
          Greek officials at first called the craft a Ukrainian Magura V3
          <a className="ref" href="#ref-64">
            [64]
          </a>
          . UFORCE, the company that makes the Magura, responded: “We have every
          reason to state: the vessel found off Lefkada is not a Magura drone…
          Moreover, UFORCE has never produced a V3 version, no such model
          exists”
          <a className="ref" href="#ref-66">
            [66]
          </a>
          . Reuters corrected its report, removing the model. A week later the
          Greek military gave a different preliminary identification — Kozak
          Mamai, a model Ukrainian forces use in the Black Sea
          <a className="ref" href="#ref-67">
            [67]
          </a>
          .
        </p>

        {/* TODO(rights): the image needs attribution — author and terms of use. */}
        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/lefkada-towing.jpg"
            alt="A white inflatable boat tows a black uncrewed craft in a harbour"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            The craft found off Cape Doukato being brought into the port of
            Vasiliki.
          </figcaption>
        </figure>

        <p>
          On 15 May Reuters, citing sources, wrote that Greek investigators had
          taken the craft apart and were examining the metadata to work out its
          mission and where it had started from — a mother ship or the shore,
          “potentially as far away as Libya”. The preliminary conclusion was
          that the drone had covered only a short distance, which makes a launch
          from Libya less likely, and that the key factor in the assessment was
          the fuel level
          <a className="ref" href="#ref-68">
            [68]
          </a>
          . Four months later a source in HUR told CNN the opposite: the craft
          had in fact got away from Ukrainian operators in north-western Libya
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . Both claims rest on anonymous sources, and there is no public data
          to settle between them.
        </p>

        <p>
          On 12 May Greeceʼs defence minister Nikos Dendias declared: “We now
          have certainty that this is a Ukrainian uncrewed surface vessel”,
          calling the incident an “extremely serious matter”
          <a className="ref" href="#ref-65">
            [65]
          </a>
          . The same day the spokesman for Ukraineʼs foreign ministry, Heorhiy
          Tykhyi, said there was “no evidence whatsoever that it belongs to
          Ukrainian naval drone operators”
          <a className="ref" href="#ref-69">
            [69]
          </a>
          . Ukraineʼs defence minister Mykhailo Fedorov declined to comment on
          the subject during a video conference with European colleagues when
          Dendias raised it
          <a className="ref" href="#ref-67">
            [67]
          </a>
          . On 14 May the Greek foreign minister Giorgos Gerapetritis set out
          Athensʼ position: “Turning the Mediterranean into a theatre of war
          will not be tolerated”
          <a className="ref" href="#ref-67">
            [67]
          </a>
          .
        </p>

        <p>
          The conclusion of the Greek general staff was harsher than the
          diplomatic wording: the craft was Ukrainian and “acted on behalf of
          Ukraine”, and it was part of a broader operation in which other such
          systems were to attack vessels working for Russian interests. Athens
          informed Kyiv that it knew about the plan, and said it wanted an
          admission of error and the withdrawal of the remaining combat drones
          from the Mediterranean
          <a className="ref" href="#ref-69">
            [69]
          </a>
          . At the end of May Greece delivered notes of protest: “The presence
          of an uncrewed surface vessel in Greek territorial waters created a
          serious danger to shipping and could have cost innocent lives”, and
          “Ukraineʼs right to self-defence cannot justify such actions”
          <a className="ref" href="#ref-70">
            [70]
          </a>
          .
        </p>

        <p>
          On 5 June Tykhyi apologised: “The Ukrainian side expresses its
          apologies for the incident, stressing that it was a consequence of
          circumstances caused by Russian aggression against Ukraine”
          <a className="ref" href="#ref-71">
            [71]
          </a>
          . The statement acknowledged neither the craftʼs origin nor its
          mission. In closed conversations, though, according to diplomatic
          sources in Athens, Ukrainian diplomats explained something else: Kyiv
          would go on striking Russian tankers on the high seas, invoking
          article 51 of the UN Charter. In all, Greece delivered three
          démarches; the Ukrainian side responded by pointing to the 1996 Treaty
          of Friendship, which obliges the parties to consult in such
          situations, and reproached Athens for taking the matter to the media
          before taking it to consultations
          <a className="ref" href="#ref-72">
            [72]
          </a>
          .
        </p>

        {/* ===================== CONCLUSION ===================== */}
        <h2 id="sec-conclusion">
          <span className="h2-num">§ 06 · Conclusion</span>A suit and camouflage
        </h2>

        <p>
          In three years Ukraine has gone from a dozen fighters landing in a
          Khartoum engulfed in battle, to operators flying other peopleʼs drones
          in the Malian desert remotely over the internet, to strikes on ships
          thousands of kilometres from its own coast. The instrument changed
          along with the scale: special forces — training locals — the remote
          use of weapons. One thing stayed constant: the Russian presence in
          Africa.
        </p>

        <p>
          It is worth noting how that presence was handled in public. While it
          was Sudan, where nobody broke off relations with Kyiv, an ambiguous
          “no comment” was enough. After Tinzaouaten, when Bamako and Niamey cut
          ties and three neighbours complained to the UN Security Council, a
          flat denial appeared.
        </p>

        <p>
          But in September 2026, in the CNN piece, a source in HUR explained:
          “We are turning our experience with drones into an instrument of
          foreign policy”
          <a className="ref" href="#ref-17">
            [17]
          </a>
          . Budanov, who had taken over the Presidentʼs Office, congratulated
          military intelligence that same week on defending the countryʼs
          interests all over the world — “from Russia to Africa, in a suit and
          in camouflage” — and posted a set of suggestive photographs from
          different points on the planet
          <a className="ref" href="#ref-17">
            [17]
          </a>
          .
        </p>

        {/* TODO(rights): screenshot of the post — give the date, time and an
            archived copy. */}
        <figure className="fig">
          <img
            src="/articles/afrykanska-kampaniia/budanov-collage.jpg"
            alt="A collage of six images: armed men in the desert, a gunner with a machine gun, officials in suits on a staircase, pickup trucks with machine guns, a man with a bullet-holed Ukrainian flag"
            style={{ width: "100%", display: "block" }}
          />
          <figcaption>
            The collage from that same Budanov post: suits — and camouflage in
            desert landscapes.
          </figcaption>
        </figure>

        <p>
          For Russia the balance of these three years is mixed. It lost and it
          gained, it pulled opponents over to its own side, it made deals with
          dictators and with underground forces, it signed agreements on
          military cooperation between states. In short, the fight was an active
          one, and it continues.
        </p>

        <p>
          For Ukraine the balance is mixed too. On one hand, the very fact of
          such operations, and of building the conditions for a Ukrainian long
          arm at all, is a considerable achievement. Russian military logistics
          is no longer safe by default anywhere — not in the Sudanese desert,
          not a hundred and thirty miles off Sirte. But it has been paid for
          with severed relations with certain states, a complaint to the UN
          Security Council, and démarches from a NATO country that supports
          Ukraine. Support for Ukraine on the continent is melting away at the
          UN General Assembly: in 2023 a resolution condemning the invasion was
          backed by twenty-five African states, in 2025 by thirteen, with eight
          voting against
          <a className="ref" href="#ref-21">
            [21]
          </a>
          . Sam Bowden of Carnegie states the problem plainly: explanations
          along the lines of “the right hand doesnʼt always know what the left
          is doing” do not convince African officials, and instead of a
          protector against Russian mercenaries Ukraine risks looking like one
          more European state playing on someone elseʼs instability
          <a className="ref" href="#ref-21">
            [21]
          </a>
          .
        </p>

        <p>
          The previous part of this series ended by concluding that losing one
          node of Russian logistics is not enough to undermine its presence in
          Africa. This part shows that Ukraine understands that and is trying to
          act systematically, but does not yet have enough resources to close
          the problem for good. Still, the work done cannot go unremarked:
          Ukraine has built from nothing a whole system of international
          military presence in the extremely difficult conditions of the African
          continent. It has built it and is using it systematically, gaining the
          experience it needs. Which means further strikes and further activity
          are to be expected — and we will be glad to keep watching.
        </p>

        {/* ===================== SOURCES ===================== */}
        <section className="refs" id="sec-refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref-1">
              ItaMilRadar — “Lady Mariia hit by drones in the Mediterranean,
              exposing Russiaʼs maritime logistics route”, 07.09.2026, updated
              12.09.2026.{" "}
              <a href="https://www.itamilradar.com/2026/09/07/lady-mariia-hit-by-drones-in-the-mediterranean-exposing-russias-maritime-logistics-route/">
                itamilradar.com
              </a>
            </li>
            <li id="ref-2">
              The Maritime Executive — “Russian Military Cargo Vessel Attacked
              in the Mediterranean”, 07.09.2026.{" "}
              <a href="https://maritime-executive.com/article/russian-military-cargo-vessel-attacked-in-the-mediterranean">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-3">
              Army Recognition, Jérôme Brahy — “Ukraine strikes sanctioned
              Russian cargo ship Lady Mariia with bomber drones in the
              Mediterranean”, 12.09.2026. Vessel specifications and the latest
              AIS data.{" "}
              <a href="https://www.armyrecognition.com/news/navy-news/2026/russian-ship-lady-mariia-drone-strike-mediterranean">
                armyrecognition.com
              </a>
            </li>
            <li id="ref-4">
              HUR MO Ukraine, the War&amp;Sanctions database — dossier on the
              ship LADY MARIIA (IMO 9220641), updated 02.06.2026.{" "}
              <a href="https://war-sanctions.gur.gov.ua/en/transport/ships/65">
                war-sanctions.gur.gov.ua
              </a>
            </li>
            <li id="ref-5">
              IBTimes UK — “Russian Ship Reportedly Hit by Drones in
              Mediterranean as Ukraine Link Remains Unconfirmed”, 07.09.2026.{" "}
              <a href="https://www.ibtimes.co.uk/russian-cargo-ship-drones-mediterranean-1818175">
                ibtimes.co.uk
              </a>
            </li>
            <li id="ref-6">
              The Insider — “Sanctioned Russian ship Lady Mariia, tied to arms
              shipments, attacked by drones in the Mediterranean Sea”,
              07.09.2026. Tracking data from Starboard Maritime Intelligence.{" "}
              <a href="https://theins.press/en/news/296905">theins.press</a>
            </li>
            <li id="ref-7">
              The NEVZOROV Telegram channel, post with video of the strike,
              06.09.2026. A personal channel; the claims of 12 hits, of the
              cargo and of a drone launch from Libya are not independently
              confirmed.{" "}
              <a href="https://t.me/nevzorovtv/36849">t.me/nevzorovtv</a>
            </li>
            <li id="ref-8">
              Krym.Realii — “Russian sanctioned vessel LADY MARIIA may have been
              attacked in the Mediterranean”, 06.09.2026, in Russian.{" "}
              <a href="https://ru.krymr.com/a/krym-news-mariia-atack/33847941.html">
                krymr.com
              </a>
            </li>
            <li id="ref-9">
              Ukrainian Shipping Magazine — “Drones attacked the sanctioned
              Russian ship ‘Lady Mariia’ in the Mediterranean Sea”, 07.09.2026.{" "}
              <a href="https://en.usm.media/drones-attacked-the-sanctioned-russian-ship-lady-mariia-in-the-mediterranean-sea/">
                en.usm.media
              </a>
            </li>
            <li id="ref-10">
              Militarnyi — “Drones Attack Sanctioned Russian Vessel Lady Maria
              in Mediterranean Sea”, 06.09.2026.{" "}
              <a href="https://militarnyi.com/en/news/drones-attack-sanctioned-russian-vessel-lady-maria-in-mediterranean-sea/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-11">
              Marine Insight — “Video: Russian Military-Linked Cargo Ship
              Reportedly Struck 12 Times By Drones Near Crete”, 08.09.2026.{" "}
              <a href="https://www.marineinsight.com/video-russian-military-linked-cargo-ship-reportedly-struck-12-times-by-drones-near-crete/">
                marineinsight.com
              </a>
            </li>
            <li id="ref-12">
              HUR MO Ukraine, the War&amp;Sanctions database — dossier on the
              ship BALTIC LEADER (IMO 9220639).{" "}
              <a href="https://war-sanctions.gur.gov.ua/en/transport/ships/99">
                war-sanctions.gur.gov.ua
              </a>
            </li>
            <li id="ref-13">
              Tech Times — “Ukraine Drones Strike Lady Mariia: Russiaʼs Weapons
              Ship, Not Oil Tanker”, 07.09.2026.{" "}
              <a href="https://www.techtimes.com/articles/326906/20260907/ukraine-drones-strike-lady-mariia-russias-weapons-ship-not-oil-tanker.htm">
                techtimes.com
              </a>
            </li>
            <li id="ref-14">
              The Moscow Times — “Kyiv Claims Drone Strike Against Russian
              ‘Shadow Fleet’ Tanker in Mediterranean”, 19.12.2025.{" "}
              <a href="https://www.themoscowtimes.com/2025/12/19/kyiv-claims-drone-strike-against-russian-shadow-fleet-tanker-in-mediterranean-a91489">
                themoscowtimes.com
              </a>
            </li>
            <li id="ref-15">
              RFI, Houda Ibrahim — “Des militaires ukrainiens déployés dans
              lʼouest de la Libye”, 02.04.2026. The investigation rests on two
              anonymous Libyan sources.{" "}
              <a href="https://www.rfi.fr/fr/afrique/20260402-exclusif-rfi-ces-militaires-ukrainiens-pr%C3%A9sents-dans-l-ouest-libyen">
                rfi.fr
              </a>
            </li>
            <li id="ref-16">
              Associated Press — “Ukrainian forces operating in Libya have
              attacked a Russian tanker, officials say”, 04.2026.{" "}
              <a href="https://apnews.com/article/libya-ukraine-russia-tanker-drones-4b9ec378ea1bf064d13cfe4ea026d2d4">
                apnews.com
              </a>
            </li>
            <li id="ref-17">
              CNN — “Ukraine is fighting Russia anywhere it can – even in the
              deserts of Africa”, 12.09.2026.{" "}
              <a href="https://edition.cnn.com/2026/09/12/africa/ukraine-russia-drones-mali-libya-intl">
                edition.cnn.com
              </a>
            </li>
            <li id="ref-18">
              RTÉ Prime Time — “Ukrainian footage from Sudan casts an Irish
              meeting in new light”, 15.11.2023. With comments from Chris York
              (Kyiv Post) and Ahmed Soliman (Chatham House).{" "}
              <a href="https://www.rte.ie/news/primetime/2023/1115/1416502-ukrainian-footage-from-sudan-casts-an-irish-meeting-in-new-light/">
                rte.ie
              </a>
            </li>
            <li id="ref-19">
              Congressional Research Service — “Russiaʼs Security Operations in
              Africa”, IF12389, 08.04.2026.{" "}
              <a href="https://www.congress.gov/crs-product/IF12389">
                congress.gov
              </a>
            </li>
            <li id="ref-20">
              CNN — “Exclusive: Ukraineʼs special services ‘likely’ behind
              strikes on Wagner-backed forces in Sudan, a Ukrainian military
              source says”, 19.09.2023.{" "}
              <a href="https://www.cnn.com/2023/09/19/africa/ukraine-military-sudan-wagner-cmd-intl/index.html">
                cnn.com
              </a>
            </li>
            <li id="ref-21">
              Carnegie Endowment, Sam Bowden — “A Shadow War in the Global
              South: Are Kyivʼs Operations in Africa Paying Off?”, 20.11.2025.{" "}
              <a href="https://carnegieendowment.org/research/2025/11/a-shadow-war-in-the-global-south-are-kyivs-operations-in-africa-paying-off">
                carnegieendowment.org
              </a>
            </li>
            <li id="ref-22">
              The Wall Street Journal — “Ukraine Is Now Fighting Russia in
              Sudan”, 06.03.2024. Full text behind a paywall; the accessible
              excerpt is quoted.{" "}
              <a href="https://www.wsj.com/world/ukraine-is-now-fighting-russia-in-sudan-87caf1d8">
                wsj.com
              </a>
            </li>
            <li id="ref-23">
              Kyiv Post — “Khartoum Gave Weapons to Kyiv so Zelensky Sent
              Ukrainian Special Forces to Sudan”, 06.03.2024, a summary of The
              Wall Street Journal investigation with a quote from Kyrylo
              Budanov.{" "}
              <a href="https://www.kyivpost.com/post/29106">kyivpost.com</a>
            </li>
            <li id="ref-24">
              Yahoo News, Michael Weiss and James Rushton — “‘We will keep
              killing Russians,’ Ukraineʼs military intelligence chief vows”,
              2023. The quote came in answer to a question about the killing of
              Darya Dugina.{" "}
              <a href="https://www.yahoo.com/news/we-will-keep-killing-russians-ukraines-military-intelligence-chief-vows-232156674.html">
                yahoo.com
              </a>
            </li>
            <li id="ref-25">
              Office of the President of Ukraine — statement on the meeting with
              the head of Sudanʼs Transitional Sovereign Council, 23.09.2023.{" "}
              <a href="https://www.globalsecurity.org/wmd/library/news/ukraine/2023/09/ukraine-230923-ukraine-president04.htm">
                globalsecurity.org
              </a>
            </li>
            <li id="ref-26">
              Sudan Tribune — “Sudanʼs al-Burhan, Ukraineʼs Zelensky discuss
              security challenges”, 23.09.2023.{" "}
              <a href="https://sudantribune.com/article277588/">
                sudantribune.com
              </a>
            </li>
            <li id="ref-27">
              Bellingcat — “Examining Videos of Suspected Ukrainian Riflemen in
              Sudan”, 07.10.2023. Geolocations of the footage; it was not
              possible to establish from open sources who the fighters were.{" "}
              <a href="https://www.bellingcat.com/news/2023/10/07/examining-videos-of-suspected-ukrainian-riflemen-in-sudan/">
                bellingcat.com
              </a>
            </li>
            <li id="ref-28">
              Kyiv Post — “EXCLUSIVE: Videos Show Ukrainian Special Forces
              ‘Cleaning Up’ Wagner Fighters in Sudan”, 06.11.2023. The outlet
              notes that it did not verify the video independently.{" "}
              <a href="https://www.kyivpost.com/post/23722">kyivpost.com</a>
            </li>
            <li id="ref-29">
              Kyiv Post — “Ukrainian Drones ‘Destroy Russian Mercenaries’ in
              Sudan”, 30.01.2024.{" "}
              <a href="https://www.kyivpost.com/post/27383">kyivpost.com</a>
            </li>
            <li id="ref-30">
              Kyiv Post — “EXCLUSIVE: Ukrainian Special Forces Interrogate
              Wagner Mercenaries in Sudan”, 05.02.2024.{" "}
              <a href="https://www.kyivpost.com/post/27637">kyivpost.com</a>
            </li>
            <li id="ref-31">
              Middle East Eye — “Sudan: Video claims to show Ukrainian special
              forces hunting down Wagner mercenaries”, 06.02.2024. UN figures on
              the dead and the displaced are given in the same piece.{" "}
              <a href="https://www.middleeasteye.net/news/sudan-ukrainian-video-purports-show-wagner-mercenaries-captued-country">
                middleeasteye.net
              </a>
            </li>
            <li id="ref-32">
              Ukrainska Pravda, Roman Kravets — interview with the commander of
              HURʼs Tymur special unit, 13.02.2024.{" "}
              <a href="https://www.pravda.com.ua/articles/2024/02/13/7441562/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-33">
              The New Arab, Paul Iddon — “Why are Ukrainian special forces
              fighting in Sudanʼs war?”, 26.02.2024.{" "}
              <a href="https://www.newarab.com/analysis/why-are-ukrainian-special-forces-fighting-sudans-war">
                newarab.com
              </a>
            </li>
            <li id="ref-34">
              Middle East Eye — “Sudan war: Russia hedges bets by aiding both
              sides in conflict”, 06.05.2024. The outlet attributes its estimate
              of the number of Ukrainian servicemen to analysts.{" "}
              <a href="https://www.middleeasteye.net/news/russia-sudan-war-saf-rsf-hedges-bets-both-sides-support">
                middleeasteye.net
              </a>
            </li>
            <li id="ref-35">
              Jamestown Foundation, Andrew McGregor — “Russia Switches Sides in
              Sudan War”, 08.07.2024.{" "}
              <a href="https://jamestown.org/russia-switches-sides-in-sudan-war/">
                jamestown.org
              </a>
            </li>
            <li id="ref-36">
              Africa Defense Forum — “Airport in Libya Used to Route Weapons to
              Sudan”, 03.02.2026, based on reporting by Reuters and Agenzia
              Nova.{" "}
              <a href="https://adf-magazine.com/2026/02/airport-in-libya-used-to-route-weapons-to-sudan/">
                adf-magazine.com
              </a>
            </li>
            <li id="ref-37">
              Kyiv Post — “Putinʼs African Naval Dream Sinks: Sudan War Halts
              Russiaʼs Red Sea Base”, 10.11.2025.{" "}
              <a href="https://www.kyivpost.com/post/63969">kyivpost.com</a>
            </li>
            <li id="ref-38">
              Le Monde, Benjamin Roger — “In Mali, the shadow of Ukraine behind
              rebels at war with Wagnerʼs Russian mercenaries”, 02.08.2024.
              Behind a paywall; the accessible excerpt is quoted.{" "}
              <a href="https://www.lemonde.fr/en/le-monde-africa/article/2024/08/02/in-mali-ukraine-s-shadow-behind-rebels-at-war-with-wagner-s-russian-mercenaries_6707255_124.html">
                lemonde.fr
              </a>
            </li>
            <li id="ref-39">
              CNN — “Rebels jeered Putinʼs Africa Corps out of a key Sahel town.
              Now his regional grip is slipping away”, 10.05.2026.{" "}
              <a href="https://www.cnn.com/2026/05/10/africa/putin-africa-corps-kidal-mali-intl-cmd">
                cnn.com
              </a>
            </li>
            <li id="ref-40">
              Reuters — “Al Qaeda branch says it killed 50 Russian mercenaries,
              10 Malian soldiers in Mali”, 30.07.2024.{" "}
              <a href="https://www.reuters.com/world/africa/al-qaeda-branch-says-it-killed-50-russian-mercenaries-10-malian-soldiers-mali-2024-07-30/">
                reuters.com
              </a>
            </li>
            <li id="ref-41">
              RFI / AFP — “Mali separatists claim major victory over army,
              Russian allies”, 28.07.2024.{" "}
              <a href="https://www.rfi.fr/en/international-news/20240728-mali-separatists-claim-major-victory-over-army-russian-allies">
                rfi.fr
              </a>
            </li>
            <li id="ref-42">
              RFE/RL — “Mali Breaks Off Relations With Ukraine Over Alleged Role
              In Separatist Attack”, 05.08.2024.{" "}
              <a href="https://www.rferl.org/a/mali-wagner-yusov-russia-ukraine/33065807.html">
                rferl.org
              </a>
            </li>
            <li id="ref-43">
              Al Jazeera — “Russia accuses Ukraine of opening ‘African front’ as
              Niger cuts Kyiv ties”, 07.08.2024.{" "}
              <a href="https://www.aljazeera.com/news/2024/8/7/russia-accuses-ukraine-of-opening-african-front-as-niger-cuts-kyiv-ties">
                aljazeera.com
              </a>
            </li>
            <li id="ref-44">
              Suspilne — “‘There will be more to come’: Yusov on the destruction
              of a Wagner detachment in Mali”, 29.07.2024, in Ukrainian.{" "}
              <a href="https://suspilne.media/801377-prodovzenna-bude-usov-pro-znisenna-zagonu-vagnerivciv-v-mali-2/">
                suspilne.media
              </a>
            </li>
            <li id="ref-45">
              Jamestown Foundation, Andrew McGregor — “Ukraineʼs African
              Campaign Against Russia Prompts International Backlash”,
              11.09.2024.{" "}
              <a href="https://jamestown.org/ukraines-african-campaign-against-russia-prompts-international-backlash/">
                jamestown.org
              </a>
            </li>
            <li id="ref-46">
              Semafor — “Mali, Niger cut ties with Ukraine over Russian attack”,
              07.08.2024.{" "}
              <a href="https://www.semafor.com/article/08/07/2024/mali-niger-cut-ukraine-ties-over-russia-tuareg-attack">
                semafor.com
              </a>
            </li>
            <li id="ref-47">
              UN Security Council, document S/2024/623 — joint letter from the
              foreign ministers of Burkina Faso, Mali and Niger, 19.08.2024.{" "}
              <a href="https://documents.un.org/doc/undoc/gen/n24/245/76/pdf/n2424576.pdf">
                documents.un.org
              </a>
            </li>
            <li id="ref-48">
              Ministry of Foreign Affairs of Ukraine — “Statement of the MFA of
              Ukraine on the decision of the Transitional Government of the
              Republic of Mali to sever diplomatic relations with Ukraine”,
              05.08.2024.{" "}
              <a href="https://mfa.gov.ua/en/news/zayava-mzs-ukrayini-shchodo-rishennya-perehidnogo-uryadu-respubliki-mali-rozirvati-diplomatichni-vidnosini-z-ukrayinoyu">
                mfa.gov.ua
              </a>
            </li>
            <li id="ref-49">
              Le Monde, Benjamin Roger and Emmanuel Grynszpan — “Ukrainian
              drones provide support for northern Maliʼs rebels”, 13.10.2024.
              Behind a paywall; the accessible excerpt is quoted.{" "}
              <a href="https://www.lemonde.fr/en/le-monde-africa/article/2024/10/13/ukrainian-drones-provide-support-for-northern-mali-s-rebels_6729231_124.html">
                lemonde.fr
              </a>
            </li>
            <li id="ref-50">
              Reuters — “Ukraine denies involvement in drone supplies to Maliʼs
              rebels”, 15.10.2024.{" "}
              <a href="https://www.reuters.com/world/ukraine-denies-involvement-drone-supplies-malis-rebels-2024-10-14/">
                reuters.com
              </a>
            </li>
            <li id="ref-51">
              CNN / Reuters — “Mali insurgents hit military bases in ‘complex
              attacks’ claimed by al Qaeda-linked militants”, 25.04.2026.{" "}
              <a href="https://www.cnn.com/2026/04/25/africa/mali-bamako-gunmen-attacks-intl">
                cnn.com
              </a>
            </li>
            <li id="ref-52">
              Al Jazeera — “Huge fire breaks out at Libyaʼs Zawiya refinery
              after drone attack”, 11.08.2026.{" "}
              <a href="https://www.aljazeera.com/news/2026/8/11/huge-fire-breaks-out-at-libyas-zawiya-refinery-after-drone-attack">
                aljazeera.com
              </a>
            </li>
            <li id="ref-53">
              Tearline — “Libya: Russia Develops Air Base Infrastructure Likely
              to Secure Military Foothold in North Africa and Sahel”,
              03.06.2026. Research by the University of Texas at Austin; the NGA
              reviewed the methodology but is not responsible for the
              conclusions.{" "}
              <a href="https://www.tearline.mil/public_page/libya-russia-develops-air-base-infrastructure-likely-to-secure-military-foothold-in-sahel-region">
                tearline.mil
              </a>
            </li>
            <li id="ref-54">
              CEPA, Chris Stephen — “Putinʼs Empire-Building Base Hunt Reaches
              Libya”, 09.01.2025.{" "}
              <a href="https://cepa.org/article/putins-empire-building-base-hunt-reaches-libya/">
                cepa.org
              </a>
            </li>
            <li id="ref-55">
              Foreign Policy, Nosmot Gbadamosi — “After Assadʼs Fall, Russia
              Looks to Libya and Sudan”, 19.02.2025.{" "}
              <a href="https://foreignpolicy.com/2025/02/19/russia-putin-libya-sudan-naval-air-bases-syria-assad-fall/">
                foreignpolicy.com
              </a>
            </li>
            <li id="ref-56">
              Forbes, Paul Iddon — “How Ukraine Could Launch Drones From Libya
              To Strike Russiaʼs Tanker”, 29.04.2026. With an interview with
              Jalel Harchaoui (RUSI).{" "}
              <a href="https://www.forbes.com/sites/pauliddon/2026/04/29/how-ukraine-could-launch-drones-from-libya-to-strike-russias-tanker/">
                forbes.com
              </a>
            </li>
            <li id="ref-57">
              The War Zone, Thomas Newdick and Howard Altman — “Ukraine Strikes
              Russia-Linked Tanker In The Mediterranean With ‘Bomber Drone’”,
              19.12.2025.{" "}
              <a href="https://www.twz.com/news-features/ukraine-strikes-russia-linked-tanker-in-the-mediterranean-with-bomber-drone">
                twz.com
              </a>
            </li>
            <li id="ref-58">
              The Maritime Executive — “Libya Resumes Monitoring Arctic Metagaz
              as Report Details Ukrainian Attack”, 07.04.2026.{" "}
              <a href="https://maritime-executive.com/article/libya-resumes-monitoring-arctic-metagaz-as-report-ids-attack-by-ukrainians">
                maritime-executive.com
              </a>
            </li>
            <li id="ref-59">
              Militarnyi — “Ukraine Hits Russian ‘Shadow Fleet’ Tanker in
              Neutral Mediterranean Waters”, 19.12.2025.{" "}
              <a href="https://militarnyi.com/en/news/ukraine-hits-russian-shadow-fleet-tanker-in-neutral-mediterranean-waters/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-60">
              Militarnyi — “Sanctioned Arctic Metagaz Tanker Suffers Irreparable
              Damage After Strike”, 04.03.2026.{" "}
              <a href="https://militarnyi.com/en/news/arctic-metagaz-suffers-irreparable-damage/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-61">
              Al Jazeera — “Russia accuses Ukraine of drone attack as gas tanker
              sinks in Mediterranean”, 04.03.2026. The report that she sank was
              not subsequently confirmed.{" "}
              <a href="https://www.aljazeera.com/news/2026/3/4/russia-accuses-ukraine-of-drone-attack-as-gas-tanker-sinks-in-mediterranean">
                aljazeera.com
              </a>
            </li>
            <li id="ref-62">
              France 24 — “Arctic Metagaz: Russian ‘shadow fleet’ tanker adrift
              in the Mediterranean faces uncertain fate”, 08.04.2026. With
              comments from Ian Ralby, Mark Douglas (Starboard), Kjell Eikland
              and Doug Weir.{" "}
              <a href="https://www.france24.com/en/africa/20260408-uncertain-fate-arctic-metagaz-russian-shadow-fleet-lng-tanker-adrift-mediterranean">
                france24.com
              </a>
            </li>
            <li id="ref-63">
              Marine Insight — “Stricken Russian LNG Tanker Arctic Metagaz
              Anchors Off Libya After Drifting For Two Months”, 05.05.2026.{" "}
              <a href="https://www.marineinsight.com/stricken-russian-lng-tanker-arctic-metagaz-anchors-off-libya-after-drifting-for-two-months/">
                marineinsight.com
              </a>
            </li>
            <li id="ref-64">
              eKathimerini — “Ukrainian Magura V3 naval drone found off Lefkada
              sparks investigation”, 08.05.2026.{" "}
              <a href="https://www.ekathimerini.com/politics/foreign-policy/1303182/ukrainian-magura-v5-naval-drone-found-off-lefkada-sparks-investigation/">
                ekathimerini.com
              </a>
            </li>
            <li id="ref-65">
              AP via WTOP — “Greece says attack sea drone found on island is
              Ukrainian, calls incident ‘extremely serious’”, 12.05.2026.{" "}
              <a href="https://wtop.com/russia-ukraine-war-news/2026/05/greece-says-attack-sea-drone-found-on-island-is-ukrainian-calls-incident-extremely-serious/">
                wtop.com
              </a>
            </li>
            <li id="ref-66">
              Militarnyi — “UFORCE: Marine Drone Found Off the Coast of Greece
              Is Not a Magura”, 12.05.2026.{" "}
              <a href="https://militarnyi.com/en/news/marine-drone-coast-of-greece-not-a-magura/">
                militarnyi.com
              </a>
            </li>
            <li id="ref-67">
              eKathimerini — “FM says Ukraine war spilling over into
              Mediterranean ‘will not be tolerated’”, 14.05.2026.{" "}
              <a href="https://www.ekathimerini.com/politics/foreign-policy/1303750/fm-says-ukraine-war-spilling-over-into-mediterranean-will-not-be-tolerated/">
                ekathimerini.com
              </a>
            </li>
            <li id="ref-68">
              Reuters — “Greek probe finds suspected Ukrainian sea drone lost
              course after malfunction, sources say”, 15.05.2026.{" "}
              <a href="https://www.reuters.com/world/greek-probe-finds-suspected-ukrainian-sea-drone-lost-course-after-malfunction-2026-05-15/">
                reuters.com
              </a>
            </li>
            <li id="ref-69">
              Ukrainska Pravda — “Greece lodges protest with Ukraine over naval
              drone found in its waters”, 03.06.2026, and “No evidence that
              drone found off Greek coast belongs to Ukrainian operators”,
              12.05.2026.{" "}
              <a href="https://www.pravda.com.ua/eng/news/2026/06/03/8037596/">
                pravda.com.ua
              </a>
            </li>
            <li id="ref-70">
              Kyiv Post — “Athens Accuses Ukraine of Endangering Mediterranean
              Security After Explosive-Laden Sea Drone Incident”, 03.06.2026.{" "}
              <a href="https://www.kyivpost.com/post/77459">kyivpost.com</a>
            </li>
            <li id="ref-71">
              Heorhiy Tykhyi, spokesman for Ukraineʼs foreign ministry, post on
              X, 05.06.2026.{" "}
              <a href="https://x.com/SpoxUkraineMFA/status/2062992746122789353">
                x.com
              </a>
            </li>
            <li id="ref-72">
              Ukrainska Pravda, after Euractiv — “Right to self-defence: Ukraine
              tells Greece Russian vessels remain a target”, 09.07.2026.{" "}
              <a href="https://www.pravda.com.ua/eng/news/2026/07/09/8043199/">
                pravda.com.ua
              </a>
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
