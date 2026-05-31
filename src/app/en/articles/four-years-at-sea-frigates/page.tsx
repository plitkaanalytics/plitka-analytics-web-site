import "../../../(main)/articles/chotyry-roky-v-mori-frehaty/frigates.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getArticleBySlug, formatDate } from "@/lib/articles";
import { AutoFrame } from "@/components/AutoFrame";

export const metadata: Metadata = {
  title: "Four Years at Sea. Frigates — PLITKA Analytics",
  description:
    "Part 1 — Frigates. What happened to each Caliber carrier platform from February 2022: launches, strikes against carriers, movements, losses.",
};

const SLUG = "four-years-at-sea-frigates";

export default function Page() {
  const article = getArticleBySlug(SLUG, "en");
  const all = getAllArticles("en");
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);

  return (
    <main>
      {/* Article header */}
      <div className="article-head">
        <h1>{article.title}</h1>
        <p className="article-head__dek">{article.dek}</p>
        <div className="article-head__meta">
          <div>
            <span className="meta__lbl">Authors</span>
            <span className="meta__val">{article.authors.join(", ")}</span>
          </div>
          <div>
            <span className="meta__lbl">Project</span>
            <span className="meta__val">{article.project}</span>
          </div>
          <div>
            <span className="meta__lbl">Reading time</span>
            <span className="meta__val meta__val--mono">
              {article.readingTime} min
            </span>
          </div>
        </div>
      </div>

      {/* Infographic embed */}
      <div className="infographic-embed">
        <AutoFrame
          src="/embeds/black-fleet-frigates-en.html?noscroll"
          title="Black Sea and Caspian missile carriers · Proj. 11356R + Proj. 11661K"
          fallbackHeight={1050}
        />
      </div>
      <div className="infographic-mobile-note">
        <p className="infographic-mobile-note__text">
          The interactive timeline is only available on desktop — please open
          this page on a computer or tablet in landscape mode.
        </p>
      </div>

      {/* TOC + article body */}
      <div className="article-shell">
        <aside className="toc" aria-label="In this article">
          <span className="toc__label">In this article</span>
          <ol>
            <li>
              <a href="#sec-intro">Context and Methodology</a>
            </li>
            <li>
              <a href="#sec-11356">§ 01 · 11356R Frigates</a>
            </li>
            <li>
              <a href="#ship-grigorovich">Admiral Grigorovich</a>
            </li>
            <li>
              <a href="#ship-essen">Admiral Essen</a>
            </li>
            <li>
              <a href="#ship-makarov">Admiral Makarov</a>
            </li>
            <li>
              <a href="#sec-gepard">§ 02 · Gepard-3.9</a>
            </li>
            <li>
              <a href="#ship-tatarstan">Tatarstan</a>
            </li>
            <li>
              <a href="#ship-dagestan">Dagestan</a>
            </li>
            <li>
              <a href="#sec-next">What&apos;s Next: MRKs &amp; Submarines</a>
            </li>
            <li>
              <a href="#sec-refs">Sources</a>
            </li>
          </ol>
        </aside>

        <article className="article-body prose">
          <p className="lede">
            Over four years of full-scale war, the naval component of Russian
            missile strikes has undergone the most significant transformation in
            the post-Soviet history of the Russian Navy. Ships that in 2022
            seemed unreachable from the shore fled their main base in 2023 and
            were burning in Novorossiysk by 2026. This is the first detailed
            chronicle in the series tracing the fate of Russian fleet missile
            carriers — focusing here on frigates and what they endured during
            the war.
          </p>

          {/* ===== § 00 INTRO ===== */}
          <h2 id="sec-intro">
            <span className="h2-num">§ 00 · Introduction</span>Context and
            Methodology
          </h2>

          <p>
            This piece is the second instalment in the series on the naval
            missile threat. Where{" "}
            <Link href="/en/articles/caliber-from-the-sea">
              <strong>the first instalment</strong>
            </Link>{" "}
            described <em>what</em> comprises the Caliber carrier group, this
            article reconstructs <em>how</em> each platform has fared over four
            years of combat operations. The first part of the reconstruction is
            limited to two classes of surface carriers — frigates of Project
            11356R (Black Sea Fleet) and Project 11661K Gepard-3.9 (Caspian
            Flotilla). Five frigates, three fleets, four years of documented
            movements and strikes.
          </p>

          <div className="method">
            <div className="method__label">Methodology</div>
            <div className="method__body">
              This piece distinguishes between confirmed and unconfirmed
              episodes.{" "}
              <strong>Confirmed</strong> means verified by at least one source
              of the following type: Ukrainian Navy, HUR MO, SBU, SBI
              indictments, joint General Staff assessments, verified OSINT
              analyses with satellite imagery or drone strike footage. Episodes
              circulating in the public domain without such verification are
              explicitly marked &ldquo;<em>unconfirmed</em>&rdquo;.
            </div>
          </div>

          {/* ===== § 01 — 11356R ===== */}
          <h2 id="sec-11356">
            <span className="h2-num">§ 01 · Black Sea Fleet</span>Project
            11356R Frigates: Three Ships, Four Years
          </h2>

          <p>
            Admiral Grigorovich, Admiral Essen, and Admiral Makarov — three of
            the six planned frigates of the series that Russia managed to
            complete by 2017. The remaining three — Butakov, Istomin, Kornilov
            — were frozen after 2014 following the Mykolaiv enterprise
            Zorya-Mashproekt&apos;s refusal to supply gas turbine units.
            Technical details, incomplete hulls, and programme constraints are
            covered in{" "}
            <Link href="/en/articles/caliber-from-the-sea#d-11356">
              <strong>the first instalment of the series</strong>
            </Link>
            .
          </p>

          <p>Below — each ship in the series individually.</p>

          {/* ===== SHIP 1: GRIGOROVICH ===== */}
          <section className="ship" id="ship-grigorovich">
            <header className="ship__head">
              <div className="ship__num">
                № 01.1<strong>494</strong>
              </div>
              <h2 className="ship__title">
                Admiral Grigorovich
                <em>The Ship That Never Came Back</em>
              </h2>
              <div className="ship__chips">
                <span className="chip chip--steel">BSF → Baltic</span>
                <span className="chip">Not struck</span>
              </div>
            </header>

            <div className="status-bar">
              <div className="status-bar__cell">
                <div className="status-bar__k">Hull No.</div>
                <div className="status-bar__v">
                  494<em>commissioned 11.03.2016</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 02.2022</div>
                <div className="status-bar__v">
                  Tartus (Syria)<em>outside the Black Sea</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 05.2026</div>
                <div className="status-bar__v">
                  Kronstadt<em>Baltic</em>
                </div>
              </div>
              <div className="status-bar__cell is-warn">
                <div className="status-bar__k">Status</div>
                <div className="status-bar__v">
                  In service<em>not fulfilling primary role</em>
                </div>
              </div>
            </div>

            <div className="ship-grid">
              <div className="ship-grid__main">
                <p>
                  The lead frigate of the 11356R series joined the Black Sea
                  Fleet on 11 March 2016. Hull number 494, home port —
                  Sevastopol, 30th Surface Ships Division. The first five years
                  of service were a standard story for a new ship: rotations to
                  the Mediterranean, exercises, flag-showing. In May–June 2020
                  Grigorovich completed the longest voyage in Black Sea Fleet
                  history — over 24,000 nautical miles in 134 days across the
                  Atlantic, through Suez, and into the Indian Ocean. In February
                  2021 it participated in the multinational exercise{" "}
                  <em>Aman-2021</em> at Karachi, after which it was the first
                  Russian warship in modern history to call at Port Sudan.
                </p>

                <p>
                  In 2021 the ship transited the Bosphorus southbound — for
                  another rotation to the permanent Russian Navy squadron in the
                  Mediterranean. This proved to be Grigorovich&apos;s last
                  passage through the Turkish straits. Eight months later,{" "}
                  <strong>27 February 2022</strong>, Turkey invoked Article 19
                  of the{" "}
                  <span
                    className="term"
                    data-def="The 1936 international treaty governing navigation through the Bosphorus and Dardanelles."
                  >
                    Montreux Convention
                  </span>
                  , classifying the Russian invasion as a war and closing the
                  Bosphorus and Dardanelles to warships of the belligerents.
                  Grigorovich was left outside the Black Sea — with no way to
                  return to its home base.
                </p>

                <figure className="fig">
                  <iframe
                    src="https://www.youtube.com/embed/548lhK6hEoY?rel=0"
                    title="Frigate Admiral Grigorovich transiting the Bosphorus, 2021"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ aspectRatio: "16/9", height: "auto" }}
                  />
                  <figcaption>
                    Video.{" "}
                    <em>
                      Frigate Admiral Grigorovich transiting the Bosphorus,
                      2021.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  From this point, the ship&apos;s entire subsequent trajectory
                  was determined by geography, not tactics. Its new anchor point
                  was the Russian naval base at Tartus, Syria. From there
                  Grigorovich performed the duties of the permanent squadron:
                  patrols of the eastern Mediterranean, rotations, calls at
                  Latakia. In April 2023 the ship went for repairs via
                  Gibraltar, the Bay of Biscay, the English Channel, and the
                  North Sea — to the Baltic shipyard Yantar in Kaliningrad. The
                  Royal Navy deployed the Type-23 HMS <em>Defender</em> for
                  shadowing escort. In November of the same year Grigorovich
                  completed the same route in reverse — back to Tartus, this
                  time escorted by HMS <em>Richmond</em>.
                </p>

                <div className="callout">
                  <div className="callout__label">Why the Escort</div>
                  Under British naval doctrine, every passage of a Russian
                  warship through the English Channel is escorted by a Royal
                  Navy vessel from the western entrance to the Strait to the
                  northern boundary of Scottish waters. This is not an
                  interception but an observation: recording the course, speed,
                  and likely route. All such episodes are publicly confirmed by
                  the British Admiralty with reference to photographic and radar
                  evidence.
                </div>

                <p>
                  The Russian presence at Tartus had been sustained by the Assad
                  regime.{" "}
                  <strong>27 November 2024</strong>, the Hayat Tahrir al-Sham
                  coalition and allied factions launched an offensive from
                  northern Syria; eleven days later — 8 December — Damascus
                  fell, and Assad flew to Moscow. Tartus and Hmeimim air base
                  came under threat of seizure. Satellite imagery from Planet
                  Labs, published by OSINT analyst MT Anderson, captured the
                  sequence: 30 November – 1 December, Russian ships still at
                  their berths; 3 December — the harbour already empty, the
                  squadron had moved to the outer roadstead. On 8 December HUR
                  MO confirmed: Grigorovich had left Tartus escorted by the
                  cargo vessel <em>Inzhener Trubin</em>.
                  <a className="ref" href="#ref-1">
                    [1]
                  </a>
                </p>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/empty_tartus.webp"
                    alt="Planet Labs satellite imagery published by MT Anderson"
                  />
                  <figcaption>
                    Planet Labs satellite imagery published by MT Anderson:{" "}
                    <em>
                      3 December 2024 — Tartus harbour already empty, the
                      squadron has moved to the outer roadstead.
                    </em>
                  </figcaption>
                </figure>

                <div className="callout">
                  <div className="callout__label">Tartus Status After Assad</div>
                  In January 2025 the new Syrian authorities terminated the
                  commercial contract with Russian Stroytransgaz for port
                  management, but the 2017 naval base agreement formally remains
                  suspended rather than terminated. In May 2025 the port was
                  placed under UAE management. Russian warships continue
                  episodic calls on a case-by-case basis, but there is no longer
                  a permanent basing status.
                </div>

                <p>
                  After leaving Tartus the ship transferred to the Baltic Sea.
                  Turkey will not permit a return to the Black Sea, so the new
                  operational area became the Atlantic, the North Sea, and the
                  Baltic. Here Grigorovich remains{" "}
                  <strong>
                    the only surface Caliber carrier of the Black Sea Fleet
                    operating outside the Black Sea
                  </strong>{" "}
                  — and it is this that gave rise to its most significant
                  episode of 2026.
                </p>

                <div className="episode">
                  <div className="episode__date">27.07.2025 · Kronstadt</div>
                  <h3 className="episode__h">Navy Day</h3>
                </div>

                <p>
                  That morning Leningrad Oblast suffered the largest drone
                  attack since the start of the war — Governor Alexander
                  Drozdenko reported strikes on &ldquo;industrial and military
                  facilities,&rdquo; and the Russian Ministry of Defence claimed
                  the destruction of 51 UAVs over the region. Pulkovo airport
                  halted operations. The main naval parade in St. Petersburg,
                  held annually since 2017, was cancelled in advance — officially
                  for security reasons.{" "}
                  <em>It was the first cancellation in eight years.</em>
                </p>

                <p>
                  Admiral Grigorovich, which had transferred to the Baltic after
                  leaving Tartus, was at Kronstadt following 20 months of
                  operational deployment in the Mediterranean. According to
                  Russian media, the frigate participated in repelling the
                  attack alongside ground-based air defences and the forces of
                  the Leningrad Naval Base. That evening Vladimir Putin arrived
                  in Kronstadt and boarded the ship.
                </p>

                <p>
                  The President spoke with the crew over tea, thanking them for
                  &ldquo;successfully repelling the drone attack.&rdquo; Aksionov
                  reported that during the ship&apos;s operational deployment it
                  had covered over 87,000 nautical miles. This was followed by
                  a public promotion of the commander:
                </p>

                <div className="qtbox">
                  <div className="qtbox__lang">Quote · original Russian</div>
                  <p className="qtbox__quote">
                    «Я смотрю, вы капитан третьего ранга, а положено вроде для
                    кораблей такого ранга, чтобы командовал капитан второго
                    ранга. Думаю, что пора это сделать, я вас поздравляю с
                    получением очередного звания».
                  </p>
                  <div className="qtbox__cite">
                    Vladimir Putin to Konstantin Aksionov · aboard Grigorovich ·
                    Kronstadt · 27.07.2025
                  </div>
                </div>

                <figure className="fig">
                  <iframe
                    src="https://www.youtube.com/embed/1vvNScYIquY?si=habIs0B0YXQkiB0q"
                    title="VIDEO · PUTIN'S VISIT TO GRIGOROVICH · 27.07.2025"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ aspectRatio: "16/9", height: "auto" }}
                  />
                  <figcaption>
                    Footage: Kremlin.ru / Russian state media.{" "}
                    <em>
                      Live promotion of the commanding officer — Captain 3rd
                      rank Konstantin Aksionov advanced to Captain 2nd rank.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  This was the episode Russian state media made the centrepiece
                  of Navy Day 2025. Instead of the traditional parade — the
                  President on a warship&apos;s deck, a commander, a repelled
                  attack, and a live promotion.
                </p>

                <div className="episode">
                  <div className="episode__date">08.04.2026 · English Channel</div>
                  <h3 className="episode__h">
                    Between Two Shadow Fleet Tankers
                  </h3>
                </div>

                <p>
                  The Telegraph published footage taken from the auxiliary vessel
                  RFA <em>Tideforce</em>: Admiral Grigorovich was transiting the
                  English Channel{" "}
                  <strong>
                    precisely between two sanctioned tankers
                  </strong>
                  . Universal, sailing under the Russian flag, had departed from
                  Vysotsk; Enigma, flying the Cameroonian flag, had loaded at
                  Ust-Luga. The British Type-23 frigate HMS <em>Richmond</em>{" "}
                  was escorting the Russians in the North Sea. None of the
                  vessels were stopped.
                  <a className="ref" href="#ref-2">
                    [2]
                  </a>
                </p>

                <p>
                  A month earlier, Prime Minister Keir Starmer had publicly
                  stated his intention to &ldquo;push harder on the shadow
                  fleet.&rdquo; Grigorovich&apos;s passage between the two
                  tankers in a combat escort configuration was{" "}
                  <strong>the first recorded instance</strong> of Moscow
                  deploying a warship in such an arrangement. The Kremlin
                  officially characterised the operation as
                  &ldquo;protecting Russian shipping from piracy&rdquo; in
                  international waters.
                </p>

                <div className="satfig">
                  <div
                    className="satfig__cell"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/428A6090  Foreground RFN Admiral Grigorovich FFG494 ADMIRAL GRIGOROVICH background RFA TIDEFORCE 1.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="tag">
                      RFA TIDEFORCE · 08.04.2026 · ENGLISH CHANNEL
                    </div>
                  </div>
                  <div
                    className="satfig__cell"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/Grigorovich and Universal.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="tag is-hit">UNIVERSAL · GRIGOROVICH</div>
                  </div>
                  <div className="satfig__cap">
                    Frame from RFA <em>Tideforce</em>.{" "}
                    <em>
                      Grigorovich in the English Channel between Universal
                      (Russian flag, Vysotsk) and Enigma (Cameroon, Ust-Luga).
                      British escort: HMS Richmond. The Telegraph, 08.04.2026.
                    </em>
                  </div>
                </div>

                <p>
                  Throughout spring 2026, the Russian military frigate Admiral
                  Grigorovich continued to appear off the British coast and
                  escort tankers of Russia&apos;s so-called shadow fleet,
                  despite London&apos;s promises to increase pressure on Russian
                  shipping. According to British media, since April Admiral
                  Grigorovich has escorted more than a dozen Russian tankers,
                  auxiliary vessels, and one submarine through the waters around
                  Great Britain.
                </p>

                <p>
                  Grigorovich remains in service — it is the only one of the
                  three Project 11356R frigates that had not been struck in
                  combat by May 2026. The paradox is that the price of this
                  intact condition is{" "}
                  <strong>
                    the complete inability to fulfil its primary purpose
                  </strong>{" "}
                  — missile strikes against Ukrainian targets from the Black Sea.
                </p>

                <div className="commander">
                  <div
                    className="commander__photo"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/captain aksionov.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                  <div>
                    <div className="commander__label">Commanding Officer</div>
                    <div className="commander__name">Konstantin Aksionov</div>
                    <div className="commander__rank">
                      Captain 2nd rank · since 27.07.2025 (previously 3rd rank)
                    </div>
                    <div className="commander__text">
                      <p>
                        Has commanded Admiral Grigorovich since 31 March 2019 —
                        the appointment was made on the 50th anniversary of the
                        30th Surface Ships Division. He was 38 at the time of
                        appointment. A 2008 graduate of the navigation faculty
                        of the Peter the Great Naval Corps, son of an ocean-going
                        ship captain.
                      </p>
                      <p>
                        Before receiving his own command he followed a standard
                        career path: junior officer on the LST Korolev of the
                        Baltic Fleet, patrol ship Neustrashimy, executive officer
                        on LST Kaliningrad, Naval Officers&apos; Advanced
                        Courses in St. Petersburg — and as the final step,
                        executive officer on Admiral Essen of the Black Sea
                        Fleet.
                      </p>
                      <p>
                        Among BSF commanders, Aksionov is one of those covered
                        systematically by the Russian military press: interviews
                        in Rossiyskaya Gazeta (2020), features in Gudok and the
                        Sevastopol outlet NTS (2019–2021), a portrait piece in
                        Gazeta Kryma for Ship Commander&apos;s Day (2022).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="aside-note">
                  <div className="aside-note__lbl">
                    Internal rotation within the 11356R series
                  </div>
                  Aksionov moved to Grigorovich from the executive officer
                  position on Essen — meaning he knows the 11356R frigates from
                  the inside. Such internal rotation among the commanders and
                  executive officers of the three hulls of the project is
                  standard practice.
                </div>
              </div>
            </div>
          </section>

          {/* ===== SHIP 2: ESSEN ===== */}
          <section className="ship" id="ship-essen">
            <header className="ship__head">
              <div className="ship__num">
                № 01.2<strong>490</strong>
              </div>
              <h2 className="ship__title">
                Admiral Essen<em>The War&apos;s First Neptune</em>
              </h2>
              <div className="ship__chips">
                <span className="chip chip--red">4 strikes</span>
                <span className="chip">BSF</span>
              </div>
            </header>

            <div className="status-bar">
              <div className="status-bar__cell">
                <div className="status-bar__k">Hull No.</div>
                <div className="status-bar__v">
                  490<em>commissioned 07.06.2016</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 02.2022</div>
                <div className="status-bar__v">
                  Sevastopol<em>30th Surface Ships Div. BSF</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 05.2026</div>
                <div className="status-bar__v">
                  Novorossiysk<em>from 10.2023</em>
                </div>
              </div>
              <div className="status-bar__cell is-bad">
                <div className="status-bar__k">Status</div>
                <div className="status-bar__v">
                  Not operational<em>after 23.05.2026</em>
                </div>
              </div>
            </div>

            <div className="ship-grid">
              <div className="ship-grid__main">
                <p>
                  The second frigate of the series joined the Black Sea Fleet on
                  7 June 2016 with hull number 490. Named after Nikolai von
                  Essen — an admiral of the Imperial Russian Navy and commander
                  of the Baltic Fleet during the First World War. Before the
                  full-scale invasion Essen was based primarily at Sevastopol
                  and performed routine Mediterranean rotation duties. The most
                  notable combat episode before 2022 were Caliber launches
                  against ISIS positions in Syria in September 2017 — the first
                  confirmed combat launches of cruise missiles from a ship of
                  this series.
                </p>

                <div className="callout">
                  <div className="callout__label">
                    Accident of 10 October 2016
                  </div>
                  Four months after commissioning, Essen sustained damage to
                  both propellers and one propeller shaft while mooring to buoys
                  at Baltiysk. The senior officer aboard was Deputy Commander of
                  the 30th Division, Captain 1st rank Vitaliy Zvyagintsev — a
                  former Ukrainian Navy officer who had defected to Russia in
                  2014. Zvyagintsev ordered mooring without tugs, overriding the
                  frigate commander Sergei Tomashkov&apos;s recommendation to
                  wait for them. The buoys were drawn under the propellers.
                  Tomashkov was relieved of command; Zvyagintsev was fined
                  264,200 roubles. Essen&apos;s transfer to the Black Sea was
                  delayed by six months.
                </div>

                <div className="episode">
                  <div className="episode__date">24.02.2022 · Snake Island</div>
                  <h3 className="episode__h">«Русский военный корабль…»</h3>
                </div>

                <p>
                  On the first day of the full-scale invasion, Essen together
                  with the cruiser Moskva approached Snake Island (Odesa Oblast).
                  An ultimatum was transmitted over radio demanding the garrison
                  lay down its arms. The recording, published by the State Border
                  Guard Service of Ukraine, became one of the iconic artefacts of
                  the war:
                </p>

                <div className="qtbox">
                  <div className="qtbox__lang">
                    Quote · original Russian · radio intercept
                  </div>
                  <p className="qtbox__quote">
                    — Я российский военный корабль. Предлагаю сложить оружие и
                    сдаться, во избежание кровопролития и неоправданных жертв. В
                    противном случае вы будете подвергнуты обстрелу.
                    <br />— Русский военный корабль, иди на х*й.
                  </p>
                  <div className="qtbox__cite">
                    Radio intercept · Snake Island · 24.02.2022 · State Border
                    Guard Service of Ukraine
                  </div>
                </div>

                <p>
                  Ukrainian Wikipedia and official Ukrainian Navy materials
                  indicate the ultimatum was read from Admiral Essen, not from
                  the cruiser Moskva. Both ships took part in the seizure of the
                  island — 13 Ukrainian border guards and naval personnel were
                  taken captive, later exchanged.
                </p>

                <div className="episode">
                  <div className="episode__date">29.03.2022 · Mykolaiv</div>
                  <h3 className="episode__h">
                    Strike on the Mykolaiv Regional Military Administration
                  </h3>
                </div>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/Mykolaiv ODA.webp"
                    alt="Destroyed Mykolaiv Regional Military Administration building · 29.03.2022 · DSNS / REUTERS / AP"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    The cruise missile struck clean through the building.{" "}
                    <em>
                      37 killed, over 30 wounded. Regional Governor Vitaliy Kim
                      was minutes away.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  On 29 March 2022 a Russian cruise missile struck the Mykolaiv
                  Regional Military Administration building. The impact punched
                  through the structure and several floors collapsed. 37 people
                  were killed and over 30 wounded. Five months later the
                  Ukrainian monitoring organisation Truth Hounds published an
                  investigation attributing the strike to a specific ship —
                  Admiral Essen. The team identified not only the ship but the
                  officers who directly executed the launch: frigate commander
                  Captain 2nd rank Alexander Smirnov and the commander of the
                  missile-artillery combat unit, Senior Lieutenant Anatoly
                  Peretyatko.
                  <a className="ref" href="#ref-3">
                    [3]
                  </a>
                </p>

                <div className="callout callout--warn">
                  <div className="callout__label">
                    Launch and accountability for the strike
                  </div>
                  Truth Hounds is one of the few organisations that
                  systematically attributes specific war crimes to specific units
                  and individuals. The Mykolaiv RMA investigation is one of the
                  rare cases where a Caliber strike against a Ukrainian civilian
                  target received{" "}
                  <strong>full individual attribution</strong>.
                </div>

                <div className="crew">
                  <div className="crew__head">
                    <span className="crew__title">
                      Crew linked to the strike · Truth Hounds · 08.2022
                    </span>
                    <span className="crew__count">
                      16 persons · commander + 15 identified
                    </span>
                  </div>
                  <div className="crew__grid">
                    <div className="crew__row">
                      <span className="crew__rank">
                        Captain 2nd rank · commanding officer
                      </span>
                      <span className="crew__name">Smirnov Alexander</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Captain 3rd rank · deputy commander
                      </span>
                      <span className="crew__name">Lepisevich Oleg</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Lieutenant commander · CO BU-1 (navigation)
                      </span>
                      <span className="crew__name">Myasoyedov Denis</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Lieutenant commander · CO BU-2 (weapons)
                      </span>
                      <span className="crew__name">Petrov Volodymyr</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior lieutenant · missile battery commander
                      </span>
                      <span className="crew__name">Rovba Serhiy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Warrant officer · artillery battery tech BU-2
                      </span>
                      <span className="crew__name">Payusov Valeriy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior lieutenant · targeting group commander
                      </span>
                      <span className="crew__name">Havrylchenko Serhiy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior seaman · mine specialist BU-3
                      </span>
                      <span className="crew__name">Kasyanenko Vitaliy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Lieutenant commander · CO BU-5 (engineering)
                      </span>
                      <span className="crew__name">Hruzintsev Alexander</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Seaman · turbine group operator BU-5
                      </span>
                      <span className="crew__name">Husev Pavel</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior seaman · senior electrician BU-5
                      </span>
                      <span className="crew__name">Rudenko Maksym</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior seaman · radio telegraphist BU-4
                      </span>
                      <span className="crew__name">Lapin Oleksiy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Lieutenant commander · CO BU-7 (combat mgmt)
                      </span>
                      <span className="crew__name">Smirnov Viktor</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Chief petty officer · group petty officer
                      </span>
                      <span className="crew__name">Krymov Volodymyr</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Senior seaman · sonar operator BU-7
                      </span>
                      <span className="crew__name">Hrebenyuk Vitaliy</span>
                    </div>
                    <div className="crew__row">
                      <span className="crew__rank">
                        Seaman · ACS group operator BU-7
                      </span>
                      <span className="crew__name">Halas Serhiy</span>
                    </div>
                  </div>
                </div>

                <div className="episode">
                  <div className="episode__date">
                    03.04.2022 · Tendra Spit
                  </div>
                  <h3 className="episode__h">The First Neptune</h3>
                </div>

                <p>
                  In early April 2022, Admiral Essen as part of a Russian naval
                  group approached the Ukrainian coastline off Tendra Spit. The
                  Ukrainian Navy fired a Neptune anti-ship missile.{" "}
                  <strong>
                    This was the first-ever combat use of the Neptune
                  </strong>{" "}
                  — the system that, eleven days later on 14 April, would sink
                  the cruiser Moskva.
                </p>

                <p>
                  The missile did not strike the hull directly. The explosion
                  occurred near the ship, damaging weapon systems; there were
                  several killed aboard. Essen urgently returned to Sevastopol
                  for repairs. The first official confirmation came in February
                  2023 from Captain 1st rank Stepan Yakimyak. The full
                  reconstruction of the episode appeared in an interview given
                  by the Commander of the Ukrainian Navy, Vice Admiral Oleksiy
                  Neizhpapa, to Ukrainska Pravda:
                  <a className="ref" href="#ref-4">
                    [4]
                  </a>
                </p>

                <div className="qtbox">
                  <div className="qtbox__lang">
                    Quote · Ukrainian original
                  </div>
                  <p className="qtbox__quote">
                    «А коли „Ессен" підійшов, ми вирішили спробувати, що ж може
                    наш „Нептун". Перші пуски не були настільки вдалі, як по
                    крейсеру „Москва", але тоді вперше був пошкоджений цей
                    фрегат „Ессен". Було там декілька „двохсотих" у них на
                    борту, наскільки мені відомо».
                  </p>
                  <div className="qtbox__cite">
                    Vice Admiral Oleksiy Neizhpapa · Commander, Ukrainian Navy ·
                    Ukrainska Pravda · 11.01.2024
                  </div>
                </div>

                <div className="episode">
                  <div className="episode__date">19.06.2023 · Sevastopol</div>
                  <h3 className="episode__h">
                    Deceptive Camouflage — First in the Series
                  </h3>
                </div>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/Russia-Navy-Deceptive-camouflage-2023-1024x576.jpg"
                    alt="Admiral Essen with deceptive camouflage applied."
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Admiral Essen with deceptive camouflage applied.{" "}
                    <em>
                      Dark patches on the bow and stern of the hull. Analysis:
                      Naval News / H. I. Sutton / covertshores.com, 22.06.2023.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  On 19 June 2023 a Planet Labs satellite image captured Admiral
                  Essen at Sevastopol with new paintwork: dark patches on the
                  bow and stern of the hull. Essen became{" "}
                  <strong>the first ship of the 11356R series</strong> to receive
                  such camouflage.
                  <a className="ref" href="#ref-5">
                    [5]
                  </a>{" "}
                  <em>
                    As events in 2026 would show, the camouflage did not save
                    it.
                  </em>
                </p>

                <div className="episode">
                  <div className="episode__date">10.2023 · Novorossiysk</div>
                  <h3 className="episode__h">Relocation</h3>
                </div>

                <p>
                  In autumn 2023 Sevastopol ceased to be a safe base. On 13
                  September, Storm Shadow cruise missiles struck the large landing
                  ship Minsk and the diesel submarine Rostov-on-Don at the
                  Sevastopol Maritime Plant. On 22 September — a Storm Shadow
                  strike on the Black Sea Fleet headquarters. Planet Labs imagery
                  from 1–3 October 2023, published by MT Anderson, records the
                  arrival of two frigates at Novorossiysk port — Admiral Essen
                  and Admiral Makarov.{" "}
                  <strong>
                    This was the largest change of basing in the Black Sea Fleet
                    during the full-scale war.
                  </strong>
                </p>

                <div className="episode">
                  <div className="episode__date">02.03.2026 · Novorossiysk</div>
                  <h3 className="episode__h">First Strike at Novorossiysk</h3>
                </div>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/Essen_novoros.jpg"
                    alt="Satellite imagery · Novorossiysk port after 02.03.2026 · CyberBoroshno"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Combined strike by Ukraine&apos;s Security Forces and Defence
                    Forces.{" "}
                    <em>
                      Up to 200 UAVs combined with missile assets. Essen took the
                      hit to the midship superstructure.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  In the night of 2 March 2026, Ukraine&apos;s Security Forces
                  and Defence Forces conducted a combined strike against the
                  Novorossiysk naval base. Admiral Essen took a hit to the
                  midship superstructure; secondary detonations followed.
                  Confirmed damage to the PK-10 decoy system, TK-25 EW system,
                  MR-90 and Fregat-M2M radars. A fire on deck burned for
                  approximately{" "}
                  <strong>18 hours</strong>.
                  <a className="ref" href="#ref-6">
                    [6]
                  </a>
                </p>

                <div className="qtbox">
                  <div className="qtbox__lang">Official statement · translation</div>
                  <p className="qtbox__quote">
                    &ldquo;Following additional analysis of the damage inflicted on
                    2 March 2026 on the Novorossiysk naval base in Krasnodar
                    Krai, damage to two Black Sea Fleet ships — frigates Admiral
                    Essen and Admiral Makarov — has been confirmed.&rdquo;
                  </p>
                  <div className="qtbox__cite">
                    General Staff of the Armed Forces of Ukraine · statement of
                    06.03.2026
                  </div>
                </div>

                <div className="episode">
                  <div className="episode__date">06.04.2026 · Novorossiysk</div>
                  <h3 className="episode__h">Second Strike at Novorossiysk</h3>
                </div>

                <p>
                  In the night of 6 April, Ukraine&apos;s Security Forces and
                  Defence Forces struck the Sheskharis terminal and ships
                  directly in the Novorossiysk naval base. According to OSINT
                  analysis by CyberBoroshno based on satellite imagery taken on
                  7 April,{" "}
                  <strong>
                    Admiral Essen was struck in the bow section
                  </strong>{" "}
                  — in the area of the 100mm A-190 gun mount. In the same zone
                  below the waterline sits the MHK-335M Platina hydroacoustic
                  complex: damage to it would deprive the ship of submarine
                  detection capability. The OSINT identification of Essen — as
                  opposed to the neighbouring Makarov — was based on a
                  distinctive feature: the radar antennas on Essen are painted
                  white, while those on Makarov are grey.
                </p>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/essen kviten 2026.jpg"
                    alt="Satellite imagery · Admiral Essen at Novorossiysk after 06.04.2026 · CyberBoroshno / Planet Labs"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Bow section with damage in the area of the A-190 mount.{" "}
                    <em>
                      Image: 07.04.2026. Analysis: CyberBoroshno / Planet Labs.
                      Identification by white antenna colour — the distinguishing
                      feature of Essen vs. Makarov.
                    </em>
                  </figcaption>
                </figure>

                <div className="callout callout--warn">
                  <div className="callout__label">
                    After 06.04.2026 · Ukrainian Navy assessment
                  </div>
                  According to Ukrainian Navy spokesman Dmytro Pletenchuk, Essen
                  had now sustained its{" "}
                  <strong>third combat strike during the war</strong> (counting
                  from the Neptune strike in 2022) and is currently not
                  performing combat tasks. This means the Black Sea Fleet was
                  temporarily left without active surface Caliber carriers.
                </div>

                <div className="episode">
                  <div className="episode__date">23.05.2026 · Novorossiysk</div>
                  <h3 className="episode__h">Third Strike at Novorossiysk</h3>
                </div>

                <figure className="fig">
                  <iframe
                    src="https://www.youtube.com/embed/SHLUtLSdNcc?rel=0"
                    title="Frigate Admiral Essen and missile carrier struck during UAS Forces 'Birds' raid · 05.2026"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ aspectRatio: "16/9", height: "auto" }}
                  />
                  <figcaption>
                    Kamikaze drone approaching Essen despite active air defences.{" "}
                    <em>
                      Video published by UAS Forces Commander Robert
                      &apos;Magyar&apos; Brovdi.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  In the night of 23 May 2026, the 1st Separate Centre of the
                  Unmanned Systems Forces delivered the fourth confirmed strike
                  against Admiral Essen at Novorossiysk. Several kamikaze drones
                  attacked the frigate in the hull near deck level; the ship
                  attempted to intercept them with its Osa-M surface-to-air
                  missile system. The operation was part of the UAS
                  Forces&apos; 48-hour massed &ldquo;Birds&rdquo; raid on
                  Novorossiysk port — alongside strikes on the Sheskharis oil
                  terminal and the Grushova Balka oil storage facility.{" "}
                  <strong>
                    UAS Forces Commander Robert &apos;Magyar&apos; Brovdi
                    personally confirmed the strike
                  </strong>
                  : &ldquo;You are doomed to sink, there is nowhere to
                  hide.&rdquo;
                  <a className="ref" href="#ref-12">
                    [12]
                  </a>
                </p>

                <div className="commander">
                  <div
                    className="commander__photo"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/Aleksandr-Smirnov_65ce722802817.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                  <div>
                    <div className="commander__label">Commanding Officer</div>
                    <div className="commander__name">Alexander Smirnov</div>
                    <div className="commander__rank">
                      Captain 2nd rank · commanding officer since 2020
                    </div>
                    <div className="commander__text">
                      <p>
                        Career officer of the Russian Navy. Born in Murmansk.
                        Before taking command of Essen he progressed through the
                        executive officer position on two frigates of the 11356R
                        series — first Grigorovich, then Essen.
                      </p>
                      <p>
                        The Truth Hounds investigation of August 2022 identifies
                        Smirnov as{" "}
                        <strong>
                          the commanding officer of the carrier ship from which
                          the cruise missile was launched against the Mykolaiv
                          RMA
                        </strong>
                        . Legal attribution of a specific strike to a specific
                        individual is a rare achievement in the documentation of
                        war crimes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="callout">
                  <div className="callout__label">
                    Paradox of the command succession
                  </div>
                  Of Essen&apos;s three most recent commanding officers,{" "}
                  <strong>one</strong> was relieved following the 2016 accident
                  (Sergei Tomashkov),{" "}
                  <strong>the second</strong> died on Moskva when struck by a
                  Neptune missile on 14.04.2022 (Anton Kuprin), and{" "}
                  <strong>the third</strong> commands a ship that was itself the
                  first Neptune target of this war and was later struck three
                  times in Novorossiysk.
                </div>
              </div>
            </div>
          </section>

          {/* ===== SHIP 3: MAKAROV ===== */}
          <section className="ship" id="ship-makarov">
            <header className="ship__head">
              <div className="ship__num">
                № 01.3<strong>499</strong>
              </div>
              <h2 className="ship__title">
                Admiral Makarov<em>Flagship by Default</em>
              </h2>
              <div className="ship__chips">
                <span className="chip chip--red">USV + 2× DRN</span>
                <span className="chip">BSF · flagship</span>
              </div>
            </header>

            <div className="status-bar">
              <div className="status-bar__cell">
                <div className="status-bar__k">Hull No.</div>
                <div className="status-bar__v">
                  499<em>commissioned 27.12.2017</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 02.2022</div>
                <div className="status-bar__v">Sevastopol</div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Base 05.2026</div>
                <div className="status-bar__v">
                  Novorossiysk<em>Sheskharis terminal</em>
                </div>
              </div>
              <div className="status-bar__cell is-bad">
                <div className="status-bar__k">Status</div>
                <div className="status-bar__v">
                  Severe damage<em>after 06.04.2026</em>
                </div>
              </div>
            </div>

            <div className="ship-grid">
              <div className="ship-grid__main">
                <p>
                  The third and last frigate of the 11356R series joined the
                  Black Sea Fleet on 27 December 2017 with hull number 499.
                  Before the full-scale invasion Makarov was on routine service
                  at Sevastopol. That changed on 14 April 2022 — the day Moskva
                  sank in the Black Sea.
                </p>

                <div className="episode">
                  <div className="episode__date">14.04.2022 · BSF</div>
                  <h3 className="episode__h">Moskva&apos;s Legacy</h3>
                </div>

                <p>
                  On 14 April 2022 two Ukrainian Neptune missiles struck the
                  cruiser Moskva — flagship of the Black Sea Fleet. The cruiser
                  sank; among the dead was commanding officer Anton Kuprin. The
                  flagship status passed to Admiral Makarov —{" "}
                  <em>by residual default</em>. Among the BSF&apos;s combat-ready
                  ships it was the most capable and newest vessel with
                  long-range missile armament: 8 Caliber launch cells.
                </p>

                <div className="callout">
                  <div className="callout__label">
                    De facto flagship vs. de jure flagship
                  </div>
                  Officially, after the loss of Moskva, the Black Sea Fleet has
                  not designated a new flagship — such a decision requires a
                  separate order from the Commander-in-Chief of the Russian
                  Navy. Ukrainian and Western analysts (ISW, Defence Express)
                  track Makarov in this role based on combat capability and
                  armament.
                </div>

                <div className="episode">
                  <div className="episode__date">
                    18.10.2022 · Dnipropetrovsk Oblast
                  </div>
                  <h3 className="episode__h">
                    Strike on Prydniprovska Power Plant
                  </h3>
                </div>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/ТЕС.webp"
                    alt="Damage to Prydniprovska thermal power plant · 18.10.2022 · DTEK / Ukrenergo"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Precision Caliber-NK strike on a thermal power station.{" "}
                    <em>
                      Dnipro left without power — residential districts, schools,
                      hospitals.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  On 18 October 2022 Admiral Makarov carried out a precision
                  cruise missile strike (Caliber-NK) against the Prydniprovska
                  thermal power station in Dnipropetrovsk Oblast. In April 2026
                  the SBU filed a notice of suspicion in absentia against Captain
                  1st rank Volodymyr Kuzmin — commander of the 30th Surface Ships
                  Division of the BSF. Following the strike, the Kremlin promoted
                  Kuzmin to the rank of rear admiral.
                  <a className="ref" href="#ref-7">
                    [7]
                  </a>
                </p>

                <div className="episode">
                  <div className="episode__date">29.10.2022 · Sevastopol</div>
                  <h3 className="episode__h">
                    The World&apos;s First USV Operation
                  </h3>
                </div>

                <p>
                  At 4:20 a.m. on 29 October 2022, a combined force of{" "}
                  <strong>
                    9 aerial and 7 naval unmanned vehicles
                  </strong>{" "}
                  attacked Black Sea Fleet ships at Sevastopol. This was the
                  first joint operation in history by the Ukrainian Navy and SBU
                  using{" "}
                  <strong>exclusively unmanned systems</strong>. Three naval
                  drones headed for the outer roadstead where Admiral Makarov
                  was anchored.
                </p>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/admiral-makarov-ataka.jpg"
                    alt="VIDEO · USV ATTACKS ADMIRAL MAKAROV · 29.10.2022 · Ukrainian Navy / SBU"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Footage from a naval drone.{" "}
                    <em>
                      The first joint operation in history by the Ukrainian Navy
                      and SBU using exclusively unmanned systems.
                    </em>
                  </figcaption>
                </figure>

                <p>
                  The Russian side officially acknowledged damage to the
                  minesweeper Ivan Golubets, but made no statement about a strike
                  on Makarov. OSINT analyst Benjamin Pittet published imagery of
                  Sevastopol Bay showing the frigate under tow in open water.
                  <a className="ref" href="#ref-8">
                    [8]
                  </a>
                </p>

                <div className="satfig">
                  <div
                    className="satfig__cell"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/makarov_buksyr.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      className="blip"
                      style={{
                        left: "55%",
                        top: "50%",
                        borderColor: "#c44a08",
                      }}
                    ></div>
                    <div className="tag is-hit">
                      SEVASTOPOL · 05:35 UTC · FRIGATE UNDER TOW
                    </div>
                  </div>
                  <div
                    className="satfig__cell"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/makarov_sevas.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="tag">
                      SEVASTOPOL · 11:06 UTC · STRILETSKOYE BAY
                    </div>
                  </div>
                  <div className="satfig__cap">
                    Satellite imagery of Sevastopol Bay, 01.11.2022.{" "}
                    <em>
                      Frigate under tow in open water (05:35 UTC) and five hours
                      later — at the quayside. Reconstruction: Benjamin Pittet.
                    </em>
                  </div>
                </div>

                <div className="callout callout--warn">
                  <div className="callout__label">
                    Why 29 October was a turning point
                  </div>
                  Until then, naval unmanned surface vehicles had been an
                  experimental area. The strike on Makarov — a frigate with full
                  radar armament, on the outer roadstead, under cover of
                  shore-based air defences —{" "}
                  <strong>changed that perception</strong>. Eleven months later,
                  the BSF&apos;s surface fleet would begin relocating to
                  Novorossiysk.
                </div>

                <div className="episode">
                  <div className="episode__date">10.2023 · Novorossiysk</div>
                  <h3 className="episode__h">Relocation to Novorossiysk</h3>
                </div>

                <p>
                  Planet Labs imagery from 1–3 October 2023, published by MT
                  Anderson, recorded the arrival of Admiral Makarov and Admiral
                  Essen at Novorossiysk port.
                </p>

                <div className="callout">
                  <div className="callout__label">
                    The Novorossiysk Paradox
                  </div>
                  Unlike Sevastopol Bay, Novorossiysk port is{" "}
                  <strong>more exposed, its approach geometry simpler</strong>.
                  By early 2026 it would become clear that Novorossiysk was
                  equally reachable — and it was here that Makarov would receive
                  the strike it never recovered from.
                </div>

                <div className="episode">
                  <div className="episode__date">
                    02.03.2026 · 06.04.2026 · Novorossiysk
                  </div>
                  <h3 className="episode__h">Strikes at Novorossiysk</h3>
                </div>

                <p>
                  In the night of 2 March 2026, Ukraine&apos;s Security Forces
                  and Defence Forces conducted a combined strike against
                  Novorossiysk. Among the ships struck were Admiral Essen and
                  Admiral Makarov. However, notwithstanding official statements
                  regarding damage to Makarov, corroborating evidence from
                  satellite imagery and other open sources could not be confirmed.
                </p>

                <p>
                  Less than a month later, in the night of 6 April, operators of
                  the 1st Separate Centre of the Unmanned Systems Forces struck
                  the Sheskharis terminal at Novorossiysk. According to
                  Exilenova+ assessment,{" "}
                  <strong>
                    the frigate was struck at least twice
                  </strong>
                  : the first hit — in the area of the UKSK 3S14 vertical launch
                  cells; the second — on port infrastructure nearby. Admiral
                  Makarov attempted to defend itself — Shtil-1 SAM launches were
                  fired from the ship.{" "}
                  <strong>They did not stop the drones.</strong>
                  <a className="ref" href="#ref-9">
                    [9]
                  </a>
                </p>

                <figure className="fig">
                  <img
                    src="/articles/chotyry-roky-v-mori-frehaty/makarov as aim.jpg"
                    alt="FOOTAGE · USV ATTACKS ADMIRAL MAKAROV · 06.04.2026 · 'MAGYAR'"
                    style={{
                      width: "100%",
                      aspectRatio: "21/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <figcaption>
                    Drones closed on the target despite active air defence.{" "}
                    <em>
                      SAM launches were fired directly from the frigate itself.
                    </em>
                  </figcaption>
                </figure>

                <div className="commander">
                  <div
                    className="commander__photo"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/breev.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                  <div>
                    <div className="commander__label">Commanding Officer</div>
                    <div className="commander__name">Hryhoriy Breev</div>
                    <div className="commander__rank">
                      Captain 1st rank, Russian Navy · since 2018 (acceptance
                      crew — from 01.2016)
                    </div>
                    <div className="commander__text">
                      <p>
                        The longest tenure of the three 11356R frigate
                        captains.{" "}
                        <strong>
                          Breev is the only one of the three whose biography
                          before receiving his command passed not through the
                          Russian military system but through the Ukrainian one.
                        </strong>
                      </p>
                      <p>
                        Born in Vinnytsia Oblast. A 1996 graduate of the
                        Nakhimov Sevastopol Naval Institute. In the 2000s he
                        commanded Ukrainian Navy corvettes Lutsk and Ternopil.
                        Until March 2014 — Captain 2nd rank, Ukrainian Navy,
                        commander of the Sevastopol Naval Base.
                      </p>
                      <p>
                        In March 2014 Breev{" "}
                        <strong>
                          refused to follow orders from the Ukrainian command and
                          took an oath to the Russian Armed Forces.
                        </strong>{" "}
                        No public comments on his reasons for this decision are
                        available in open sources.
                      </p>
                      <p>
                        The State Bureau of Investigations of Ukraine filed a
                        notice of suspicion against Breev for high treason —
                        Part 1 of Article 111 of the Criminal Code of Ukraine.
                        On 31 August 2022 the investigation submitted the case
                        to court with an indictment.
                        <a className="ref" href="#ref-10">
                          [10]
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="callout">
                  <div className="callout__label">
                    Not unique, but noteworthy
                  </div>
                  Breev is{" "}
                  <em>
                    one of the few former Ukrainian officers who received
                    command of a new first-rank ship in the Russian Navy
                  </em>
                  . Most defectors remained in staff or shore-based positions.
                </div>
              </div>
            </div>
          </section>

          {/* ===== § 02 — GEPARD ===== */}
          <h2 id="sec-gepard">
            <span className="h2-num">§ 02 · Caspian Flotilla</span>Project
            11661K Gepard-3.9 Frigates
          </h2>

          <p>
            Tatarstan (yard number 951, hull 691) and Dagestan (yard number 952,
            hull 693) — the only two Project 11661K frigates in the Russian Navy.
            Both were laid down at the Zelenodolsk Plant named after A.M. Gorky
            during the Soviet period (1990 and 1991), but due to the USSR&apos;s
            collapse and lack of funding took 10–20 years to complete. Tatarstan
            was commissioned on 31 August 2003, Dagestan on 28 November 2012.
            Both ships are based at Kaspiysk and assigned to the 106th Surface
            Ships Brigade of the Caspian Flotilla. Sharing the same hull and
            propulsion, the ships carry{" "}
            <strong>fundamentally different strike armament</strong> — and it is
            precisely this that makes them two distinct threat categories.
          </p>

          {/* ===== SHIP 4: TATARSTAN ===== */}
          <section className="ship" id="ship-tatarstan">
            <header className="ship__head">
              <div className="ship__num">
                № 02.1<strong>691</strong>
              </div>
              <h2 className="ship__title">
                Tatarstan<em>Flagship Without Calibers</em>
              </h2>
              <div className="ship__chips">
                <span className="chip chip--steel">Caspian</span>
                <span className="chip">Not a Caliber carrier</span>
              </div>
            </header>

            <div className="status-bar">
              <div className="status-bar__cell">
                <div className="status-bar__k">Hull No.</div>
                <div className="status-bar__v">
                  691<em>commissioned 31.08.2003</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Armament</div>
                <div className="status-bar__v">
                  Uran ASuW Kh-35<em>range up to 130 km</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Can reach Ukraine?</div>
                <div className="status-bar__v">
                  No<em>physically impossible</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Status 05.2026</div>
                <div className="status-bar__v">
                  In service<em>A-22 strike 06.11.2024 — non-critical</em>
                </div>
              </div>
            </div>

            <div className="ship-grid">
              <div className="ship-grid__main">
                <p>
                  The lead ship of the series, flagship of the Caspian Flotilla
                  since 2003 — as per official Russian media. <strong>Armament:</strong>{" "}
                  Uran anti-ship system with Kh-35 missiles (two quad-tube KT-184
                  launchers, 8 missiles total; in the Kh-35U variant range
                  increases to 260 km). Kh-35 missiles are{" "}
                  <span className="term">
                    anti-ship missiles with a 145 kg warhead
                  </span>
                  , designed to strike surface targets. They are poorly suited
                  for attacks against land infrastructure, and their range does
                  not allow reaching Ukraine from the Caspian.{" "}
                  <strong>
                    Tatarstan physically cannot be a source of missile strikes
                    against Ukraine.
                  </strong>{" "}
                  RIA Novosti in November 2022 incorrectly referred to Tatarstan
                  as a Caliber carrier — a common misconception in Russian media.
                </p>

                <div className="commander">
                  <div
                    className="commander__photo"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/podeneshnyi.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                  <div>
                    <div className="commander__label">
                      Commanding Officer 2018–10.2025
                    </div>
                    <div className="commander__name">Volodymyr Podenezhnyi</div>
                    <div className="commander__rank">
                      Captain 3rd rank → Captain 2nd rank · from 10.2025 —
                      division commander
                    </div>
                    <div className="commander__text">
                      <p>
                        Born in Kaliningrad Oblast. A fourth-generation naval
                        officer: his father was a Captain 1st rank who commanded
                        a Baltic Fleet surface ships formation. Graduated from
                        the missile-artillery faculty of the Baltic Naval
                        Institute in 2010.
                      </p>
                      <p>
                        His entire career was on Tatarstan: Uran missile battery
                        commander, CO BU-2, executive officer, commanding officer
                        —{" "}
                        <strong>7 years</strong>. During this period he
                        conducted nine live missile firing exercises. In 2023 he
                        participated in an experimental firing exercise jointly
                        with a Buyan-M MRK — effectively taking part in the
                        acceptance trials of the lead Caliber-NK carrier.
                      </p>
                      <p>
                        In October 2025 he was promoted to commander of the
                        Caspian Flotilla&apos;s surface ships and boats division
                        — meaning he continues to oversee Tatarstan from a higher
                        level of the command structure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="episode">
                  <div className="episode__date">06.11.2024 · Kaspiysk</div>
                  <h3 className="episode__h">
                    The First Ukrainian Strike in the Caspian
                  </h3>
                </div>

                <p>
                  The attack was carried out by ultralight{" "}
                  <strong>A-22 Flying Fox</strong> drones that covered
                  approximately{" "}
                  <strong>1,500 kilometres</strong>. According to HUR MO
                  sources, at least two objects in Kaspiysk port were struck,
                  identified as Tatarstan and Dagestan. ISW noted that imagery
                  did not allow unambiguous identification of damage specifically
                  to the frigates — one vessel of the Gepard class was visible,
                  along with three Buyany, two Buyan-Ms and a Tarantul-class
                  boat.
                  <a className="ref" href="#ref-11">
                    [11]
                  </a>{" "}
                  Governor Melikov reported only the &ldquo;destruction of a UAV
                  by air defences&rdquo;; Makhachkala airport was suspended. The
                  fact that within a month Tatarstan had departed on an extended
                  voyage calling at Aktau allows the damage to be assessed as{" "}
                  <strong>non-critical</strong>.
                </p>

                <div className="episode">
                  <div className="episode__date">08.2025 · Caspian</div>
                  <h3 className="episode__h">Preparing for Drones</h3>
                </div>

                <p>
                  As part of a naval strike group, Tatarstan conducted live-fire
                  exercises against surface and air targets. Separately,{" "}
                  <strong>
                    the destruction of unmanned surface boats using
                    heavy-calibre machine guns was practised
                  </strong>{" "}
                  — a direct acknowledgement that the flotilla is deliberately
                  preparing for further Ukrainian naval drone strikes.
                </p>
              </div>
            </div>
          </section>

          {/* ===== SHIP 5: DAGESTAN ===== */}
          <section className="ship" id="ship-dagestan">
            <header className="ship__head">
              <div className="ship__num">
                № 02.2<strong>693</strong>
              </div>
              <h2 className="ship__title">
                Dagestan
                <em>The Only Caliber Carrier Frigate in the Caspian</em>
              </h2>
              <div className="ship__chips">
                <span className="chip chip--red">Caliber carrier</span>
                <span className="chip chip--steel">Caspian · flagship</span>
              </div>
            </header>

            <div className="status-bar">
              <div className="status-bar__cell">
                <div className="status-bar__k">Hull No.</div>
                <div className="status-bar__v">
                  693<em>commissioned 28.11.2012</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Armament</div>
                <div className="status-bar__v">
                  UKSK 3S14<em>8 × Caliber-NK</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">First launch</div>
                <div className="status-bar__v">
                  17.09.2012<em>first in Russian Navy history</em>
                </div>
              </div>
              <div className="status-bar__cell">
                <div className="status-bar__k">Status 05.2026</div>
                <div className="status-bar__v">
                  In service<em>exercises 08.2025</em>
                </div>
              </div>
            </div>

            <div className="ship-grid">
              <div className="ship-grid__main">
                <p>
                  Laid down in 1991, launched on{" "}
                  <strong>1 April 2011</strong>.{" "}
                  <strong>17 September 2012</strong> — a successful test launch
                  of the 3M14 long-range cruise missile from Dagestan:{" "}
                  <strong>
                    the first such launch from a surface ship in Russian Navy
                    history.
                  </strong>
                </p>

                <div className="callout">
                  <div className="callout__label">
                    Storm off Novorossiysk · 01.2012
                  </div>
                  During mooring trials off Novorossiysk the ship was caught in
                  a bora storm. The acceptance crew did not manage to withdraw to
                  a safe distance — Dagestan sustained serious damage. The fleet
                  acceptance was postponed. After repairs in July 2012, the ship
                  proceeded to the second stage of state trials.
                </div>

                <h3>
                  <span className="h3-num">Armament</span>What Makes Dagestan
                  Unique
                </h3>

                <p>
                  Dagestan is{" "}
                  <strong>the first Russian Navy ship</strong> equipped with the
                  UKSK 3S14 vertical launch system for{" "}
                  <strong>8 missiles</strong>. The UKSK can employ:
                </p>
                <ul
                  style={{
                    margin: "14px 0 18px 24px",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  <li>
                    <strong>3M14</strong> — long-range cruise missile for strikes
                    against land targets.{" "}
                    <em>These are the missiles used against Ukraine.</em>
                  </li>
                  <li>
                    <strong>3M54</strong> — anti-ship missile with a supersonic
                    terminal stage.
                  </li>
                  <li>
                    <strong>91R</strong> — anti-submarine rocket-torpedo.
                  </li>
                </ul>

                <div className="episode">
                  <div className="episode__date">
                    07.10.2015 · Caspian → Syria
                  </div>
                  <h3 className="episode__h">&ldquo;Caspian Sword&rdquo;</h3>
                </div>

                <p>
                  Putin&apos;s birthday. That night, Dagestan and three Buyan-Ms
                  fired{" "}
                  <strong>26 Caliber-NK cruise missiles</strong> at 11 ISIS
                  targets in Syria. The missiles flew over 1,500 km above Iran
                  and Iraq.{" "}
                  <strong>
                    This was the first strike in Russian Navy history against a
                    real adversary using surface ship-fired long-range cruise
                    missiles.
                  </strong>
                </p>

                <div className="episode">
                  <div className="episode__date">
                    20.11.2015 · Caspian → Syria
                  </div>
                  <h3 className="episode__h">Second Strike</h3>
                </div>

                <p>
                  Following the terrorist attack against the Russian airliner
                  over Sinai, the same strike group — Dagestan and three
                  Buyan-Ms — fired{" "}
                  <strong>18 Caliber-NK missiles</strong> at 7 targets in the
                  provinces of Raqqa, Idlib, and Aleppo.
                </p>

                <div className="episode">
                  <div className="episode__date">2022–2024 · Caspian</div>
                  <h3 className="episode__h">
                    Likely Participation in Strikes against Ukraine
                  </h3>
                </div>

                <p>
                  British military intelligence and Ukrainian Navy spokesman
                  Dmytro Pletenchuk confirmed the use of the Caspian Flotilla for
                  strikes against Ukraine in 2022 and sporadically in 2023–2024.
                  Defense Express assessed the most likely period of active
                  launches as April–May 2024. The first documented video
                  confirmation of Calibers flying over the Caspian appeared on{" "}
                  <strong>8 July 2024</strong> — the day of the strike on
                  Kyiv&apos;s Okhmatdyt hospital; on the same day a missile that
                  went off course fell and exploded in Kalmykia. Whether Dagestan
                  specifically launched has not been publicly confirmed, but it is{" "}
                  <strong>
                    the only frigate in the flotilla technically capable of doing
                    so
                  </strong>
                  .
                </p>

                <div className="episode">
                  <div className="episode__date">06.11.2024 · Kaspiysk</div>
                  <h3 className="episode__h">
                    A-22 Flying Fox · 1,500 km
                  </h3>
                </div>

                <p>
                  The first and only documented Ukrainian UAV attack in which
                  Dagestan figured among the probable targets. OSINT researcher
                  MT_Anderson published imagery showing the dispersal of the
                  Caspian Flotilla — &ldquo;the surviving ships were scattered
                  across the sea.&rdquo;
                </p>

                <div className="callout">
                  <div className="callout__label">Damage assessment</div>
                  The fact that in August 2025 Dagestan participated in graded
                  tactical exercises of the Caspian Flotilla allows the damage
                  from the 06.11.2024 strike to be assessed as{" "}
                  <strong>non-critical</strong> — or repaired within nine months.
                </div>

                <div className="commander">
                  <div
                    className="commander__photo"
                    style={{
                      backgroundImage:
                        "url('/articles/chotyry-roky-v-mori-frehaty/dadev.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  ></div>
                  <div>
                    <div className="commander__label">
                      Commanding Officer since 2015
                    </div>
                    <div className="commander__name">Ayup Dadaev</div>
                    <div className="commander__rank">
                      Captain 3rd rank · commanding officer of Dagestan since
                      2015
                    </div>
                    <div className="commander__text">
                      <p>
                        Born in the village of Dylim, Kasbukov District,
                        Republic of Dagestan. Graduated from the St. Petersburg
                        Naval Institute and the Advanced Special Officers&apos;
                        Courses of the Russian Navy.
                      </p>
                      <p>
                        Career — a steady ascent from small vessels to the
                        flagship: assistant commander on minesweeper German
                        Ugryumov, commanding officer of minesweeper Magomed
                        Gadzhiyev, commanding officer of missile boat Stupenets
                        (2010–2012), commanding officer of MAK Makhachkala
                        (2013–2015), commanding officer of RK Dagestan —{" "}
                        <strong>since 2015</strong>.
                      </p>
                      <p>
                        Dadaev&apos;s move to Dagestan in 2015 coincided with
                        the pivotal moment when the ship became the Caspian
                        Flotilla&apos;s principal Caliber carrier — he was
                        already the commanding officer at the time of its first
                        combat use in Syria in 2015.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== § 03 OUTRO ===== */}
          <h2 id="sec-next">
            <span className="h2-num">§ 03 · What&apos;s Next</span>MRKs,
            Karakurts, Varshavyankas
          </h2>

          <p>
            The 2024–2025 period, during which Makarov and Essen were on routine
            duty with infrequent launches, was nonetheless not a period of
            silence. The Caliber cycle against Ukraine in those years was
            sustained by{" "}
            <strong>other platforms</strong> — smaller, more numerous, harder to
            detect and harder to strike.
          </p>

          <p>
            These are small missile ships of two projects —{" "}
            <strong>21631 Buyan-M</strong> and{" "}
            <strong>22800 Karakurt</strong>. And also diesel submarines of
            Project{" "}
            <strong>636.3 Varshavyanka</strong>, which throughout the war
            remained the hardest-to-track and hardest-to-strike segment of the
            Russian missile threat.
          </p>

          <p>
            The next instalment covers each hull of both classes in detail:
            Tsiklon, Askold, Grad, Grayvoron, Ingushetiya, Vyshniy Volochek,
            Orekhovo-Zuyevo, Serpukhov; Rostov-on-Don, Novorossiysk, Krasnodar,
            Stary Oskol.
          </p>

          <Link
            href="/en/articles"
            className="next-up"
            style={{ textDecoration: "none", border: "none" }}
          >
            <span className="next-up__label">
              Next article
              <br />
              Vol. 04
            </span>
            <div>
              <div className="next-up__title">
                Four Years at Sea. Part 2 — MRKs and Submarines
              </div>
              <p className="next-up__dek">
                Buyan-M, Karakurt, Varshavyanka: 17 hulls, two destroyed, two
                inter-fleet transfers, and a new norm for Ukrainian intelligence.
              </p>
            </div>
            <span className="btn btn--red">Read →</span>
          </Link>

          {/* ===== REFERENCES ===== */}
          <section className="refs" id="sec-refs">
            <h3>Sources</h3>
            <ol>
              <li id="ref-1">
                HUR MO Ukraine. Statement on Admiral Grigorovich departing Tartus
                · 08.12.2024.
              </li>
              <li id="ref-2">
                The Telegraph. Footage from RFA <em>Tideforce</em> ·
                Grigorovich between Universal and Enigma in the English Channel ·
                08.04.2026.
              </li>
              <li id="ref-3">
                Truth Hounds. Investigation of the strike on the Mykolaiv
                Regional Military Administration · 08.2022.
              </li>
              <li id="ref-4">
                Ukrainska Pravda. Interview with Vice Admiral O. Neizhpapa ·
                11.01.2024.
              </li>
              <li id="ref-5">
                Naval News / H. I. Sutton (covertshores.com). Analysis of 11356R
                deceptive camouflage · 22.06.2023.
              </li>
              <li id="ref-6">
                Defence Express. Assessment of the combined strike on
                Novorossiysk · 03.2026.
              </li>
              <li id="ref-7">
                SBU. Notice of suspicion to Rear Admiral V. Kuzmin · 04.2026.
              </li>
              <li id="ref-8">
                Benjamin Pittet (OSINT). Imagery of Sevastopol Bay ·
                01.11.2022.
              </li>
              <li id="ref-9">
                Unmanned Systems Forces / Exilenova+ / t/k &ldquo;Magyar&rdquo;.
                Strike on Sheskharis · 06.04.2026.
              </li>
              <li id="ref-10">
                State Bureau of Investigations of Ukraine. Notice of suspicion
                for high treason · Art. 111 Part 1 CC · 14.06.2022.
              </li>
              <li id="ref-11">
                ISW / J. Röpcke (BILD) / MT_Anderson. Analysis of A-22 strike on
                Kaspiysk · 06–07.11.2024.
              </li>
              <li>
                Ukrainian Navy, Joint Forces Command South (D. Pletenchuk).
                Regular missile threat warnings · 2024–2026.
              </li>
              <li>
                CyberBoroshno. OSINT analyses of strikes on Novorossiysk ·
                03–04.2026.
              </li>
              <li>
                Planet Labs / MT Anderson. Tartus satellite image sequences ·
                11.2024 – 01.2025.
              </li>
              <li>
                General Staff of the Armed Forces of Ukraine. Official statement
                on damage to Essen and Makarov · 06.03.2026.
              </li>
              <li>
                Dmytro Pletenchuk, Ukrainian Navy spokesman. Comments following
                06.04.2026.
              </li>
              <li>
                Morskoy Sbornik, Voyenno-Promyshlennyy Kuryer, TASS.
                Biographical data on BSF officers.
              </li>
              <li>
                RIA Novosti. Graded exercises of the Caspian Flotilla · 08.2025.
              </li>
              <li id="ref-12">
                1st Separate Centre, Unmanned Systems Forces / Robert
                &ldquo;Magyar&rdquo; Brovdi. Fourth strike on Admiral Essen ·
                Novorossiysk · 23.05.2026.
              </li>
            </ol>
          </section>

          {/* Article footer */}
          <div className="article-foot">
            <div className="article-foot__tags">
              <span className="chip chip--red">BSF</span>
              <span className="chip chip--steel">Caspian</span>
              <span className="chip">11356R</span>
              <span className="chip">Gepard</span>
              <span className="chip">Grigorovich</span>
              <span className="chip">Essen</span>
              <span className="chip">Makarov</span>
              <span className="chip">Tatarstan</span>
              <span className="chip">Dagestan</span>
              <span className="chip">Novorossiysk</span>
              <span className="chip">Truth Hounds</span>
              <span className="chip">USV</span>
            </div>
            <div>
              <span>22 min read</span> · <span>19 sources</span>
            </div>
          </div>
        </article>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">More articles</h2>
              <Link href="/en/articles" className="section__more">
                Archive →
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
                  <div>
                    <span className="card__tag">{a.project}</span>
                  </div>
                  <h3 className="card__title">
                    <Link href={`/en/articles/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="card__dek">{a.dek}</p>
                  <div className="card__meta">
                    <span>{formatDate(a.date, "en")}</span>
                    <span>{a.authors[0].split(" ").at(-1)?.toUpperCase()}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
