import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, formatDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "A National Future (With Putin?) — PLITKA Analytics",
  description:
    "Part 1 of a series on pro-Russian influence in European politics. Who funds General Roberto Vannacci, what Russian connections trail his inner circle, and how it threatens military aid to Ukraine.",
  openGraph: {
    images: ["/articles/natsionalne-maibutnie-z-putinym/cover.webp"],
  },
};

const SLUG = "national-future-with-putin";

export default function Page() {
  const all = getAllArticles("en");
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);

  return (
    <main>
      {/* ============ ARTICLE HEAD ============ */}
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Investigation</span>
        <h1>&ldquo;A National Future (With Putin?)&rdquo;</h1>
        <p className="article-head__metaline">16 min read</p>
        <p className="article-head__dek">
          Who funds the general, what Russian connections trail his inner
          circle, and how it threatens military aid to Ukraine — an analytical
          breakdown.
        </p>
      </div>

      {/* ============ LEAD PHOTO ============ */}
      <div className="lead-img">
        <img
          src="/articles/natsionalne-maibutnie-z-putinym/cover.webp"
          alt="Roberto Vannacci at the Futuro Nazionale party congress"
        />
      </div>

      {/* ============ ARTICLE BODY ============ */}
      <div className="article-body">
        <p className="lede">
          Italy is entering a period of quiet but tectonic political
          transformation. While Giorgia Meloni&apos;s government remains one of
          Ukraine&apos;s key partners in Southern Europe, a force is taking
          shape inside the Italian right that is capable of swinging
          Rome&apos;s foreign policy sharply towards the Kremlin.
        </p>

        <p>
          The chief destabiliser of the centre-right camp is General Roberto
          Vannacci — formerly Italy&apos;s military attaché in Moscow, now the
          leader of the newly founded party Futuro Nazionale (
          <em>National Future</em>). Already polling at around 7% on
          ultra-conservative, anti-migrant rhetoric, Vannacci is not merely
          launching another populist movement: because of the way the new
          electoral system works, he becomes the golden share without which the
          current coalition cannot be held together.
        </p>

        {/* ===================== SECTION 1 ===================== */}
        <h2>
          <span className="h2-num">Section 1</span>The political landscape and
          the &ldquo;Stabilicum trap&rdquo;
        </h2>

        <p>
          Italy is due to hold general elections in 2027, for both the Senate
          and the Chamber of Deputies. After almost five uninterrupted years of
          the Meloni government, this electoral season promises to be tense and
          unpredictable, not least because of possible changes to the electoral
          system. Two large blocs are already taking shape: a centre-left one
          (most likely built around the Democratic Party and the Five Star
          Movement) and a centre-right one.
        </p>

        <div className="vote-bars">
          <div className="vote-bars__panel vote-bars__panel--accent">
            <p className="vote-bars__title">Right bloc</p>
            <div className="vote-bars__rows">
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Fratelli d&apos;Italia</span>
                  <span>26.0% → 29.6%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "80.6%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--right"
                    style={{ width: "91.8%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Lega</span>
                  <span>8.8% → 5.3%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "27.3%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--right"
                    style={{ width: "16.4%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Forza Italia</span>
                  <span>8.1% → 8.0%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "25.1%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--right"
                    style={{ width: "24.8%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Futuro Nazionale</span>
                  <span>did not exist → 7.1%</span>
                </div>
                <div className="vote-bars__track">
                  <span className="vote-bars__fill vote-bars__fill--prev" />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--right"
                    style={{ width: "22.0%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row vote-bars__row--total">
                <div className="vote-bars__head">
                  <span>Total (right bloc)</span>
                  <span>42.9% → 50.0%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "85.8%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--right"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="vote-bars__panel vote-bars__panel--plain">
            <p className="vote-bars__title">Left and centrist bloc</p>
            <div className="vote-bars__rows">
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Democratic Party</span>
                  <span>19.1% → 20.1%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "59.2%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--left"
                    style={{ width: "62.3%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Five Star Movement</span>
                  <span>15.4% → 13.7%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "47.7%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--left"
                    style={{ width: "42.5%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row">
                <div className="vote-bars__head">
                  <span>Alleanza Verdi e Sinistra</span>
                  <span>3.6% → 5.9%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "11.2%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--left"
                    style={{ width: "18.3%" }}
                  />
                </div>
              </div>
              <div className="vote-bars__row vote-bars__row--total">
                <div className="vote-bars__head">
                  <span>Total (left/centrist bloc)</span>
                  <span>38.1% → 39.7%</span>
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--prev"
                    style={{ width: "76.2%" }}
                  />
                </div>
                <div className="vote-bars__track">
                  <span
                    className="vote-bars__fill vote-bars__fill--left"
                    style={{ width: "79.4%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="vote-bars__legend">
            <span className="vote-bars__legend-item">
              <i className="vote-bars__swatch vote-bars__swatch--prev" />
              September 2022 (election)
            </span>
            <span className="vote-bars__legend-item">
              <i className="vote-bars__swatch vote-bars__swatch--right" />
              August 2026, right bloc
            </span>
            <span className="vote-bars__legend-item">
              <i className="vote-bars__swatch vote-bars__swatch--left" />
              August 2026, left bloc
            </span>
          </div>
        </div>

        <p style={{ color: "var(--slate)", fontSize: "14px" }}>
          2022 figures are the official results of the Italian Interior
          Ministry (Viminale) and the Camera dei Deputati. 2026 figures come
          from a Lab21 poll for Affaritaliani.it, 12.08.2026.
          &ldquo;Total&rdquo; is the sum of the parties listed for that bloc
          (minor forces excluded, so it may differ from official coalition
          figures).
        </p>

        <p>
          Despite the confident first place held by Meloni and her party — on
          average around 27% of the electorate — inter-party competition inside
          the centre-right camp is intensifying, which puts another Meloni term
          in doubt, and with it her foreign policy course and support for
          Ukraine. The main destabiliser of the right camp can safely be called
          General Roberto Vannacci and his young party Futuro Nazionale, whose
          creation he announced in February 2026. In that time — above all
          thanks to radical and aggressive rhetoric, such as actively pushing
          the idea of &ldquo;remigration&rdquo; into public discourse — the
          party has won the support of roughly 6.5–7% of the electorate.
        </p>

        <p>
          The reason is that the Chamber of Deputies has voted for a bill
          changing the electoral system, one Meloni herself is actively pushing
          <a className="ref" href="#ref2">
            [2]
          </a>
          . The current system is mixed: roughly 37–38% of parliamentary seats
          are elected on a first-past-the-post basis, the rest
          proportionally. In traditionally polarised Italian politics — a left
          camp and a right camp — parties did not fight for new voters but
          mobilised as large a share of their own electorate as possible, in
          order to secure the necessary parliamentary majority and place their
          people in ministerial chairs. Although the approach remains broadly
          the same, the emergence of new and, crucially, more radical forces
          could substantially reshape coalitions and electoral results. In 2013
          the arrival of the Five Star Movement was an &ldquo;earthquake&rdquo;:
          absorbing both right-wing and left-wing voters, the party took a full
          25% — and entered &ldquo;big&rdquo; politics, where it remains to this
          day.
        </p>

        <p>
          The reform is meant to guarantee greater governability, which is why
          journalists nicknamed it the &ldquo;Stabilicum&rdquo;. It proposes
          granting the coalition (or party) that wins at least 42% of the vote
          an additional 70 (out of 400) seats in the Chamber of Deputies and 35
          (out of 200) in the Senate; the finer technical details are beyond
          the scope of this article.
        </p>

        <div className="stat-card">
          <p className="stat-card__title">The &ldquo;Stabilicum&rdquo; math</p>
          <div className="stat-flow">
            <div className="stat-flow__cell">
              <div className="stat-flow__v">42%</div>
              <div className="stat-flow__k">of the coalition vote</div>
            </div>
            <div className="stat-flow__arrow">→</div>
            <div className="stat-flow__cell">
              <div className="stat-flow__v">57%</div>
              <div className="stat-flow__k">of parliamentary seats</div>
            </div>
          </div>
          <p className="stat-card__note">
            +70 of 400 seats in the Chamber of Deputies and +35 of 200 in the
            Senate — a bonus large enough for an unobstructed legislative
            process
            <a className="ref" href="#ref2">
              [2]
            </a>
            .
          </p>
        </div>

        <p>
          In this context Futuro Nazionale, with its 6.5–7% in the polls, holds
          a pivotal position: Meloni&apos;s coalition risks falling short of
          the required threshold without the junior partner. According to a
          forecast by the research firm YouTrend
          <a className="ref" href="#ref3">
            [3]
          </a>
          , without Vannacci the right can count on 42% of the vote — exactly
          the Stabilicum threshold; with him, on 48%, meaning a stable
          majority. That is below the 50% Futuro Nazionale and the rest of the
          right camp show in the latest Lab21 poll (see the chart above): the
          YouTrend forecast and the raw polling data are calculated
          differently, but the conclusion is the same — without the young party
          Meloni and her partners may lack the votes for a confident majority.
          That position gives Vannacci powerful leverage he can use to dictate
          terms to the other players, Meloni and Tajani included; there is
          hardly any point for the general in joining forces without
          concessions on remigration or Ukraine. Proud solitude may in this
          case work well for the Futuro Nazionale brand and its party
          organisation — allowing it not only to cannibalise the voters of
          other right-wing parties, but also to mobilise a share of politically
          passive young people.
        </p>

        <details className="expander">
          <summary>Where Futuro Nazionale gets its money</summary>
          <div className="expander__body">
            <p>
              The party has already found backing among parts of the Italian
              economy: fuel distributors, agronomists, construction firms,
              logistics operators
              <a className="ref" href="#ref5">
                [5]
              </a>
              . Overall the party treasury has something to show off:
              voluntary donations alone come to €338,418.52
              <a className="ref" href="#ref6">
                [6]
              </a>
              , and that is before membership dues.
            </p>
            <p>
              If Vannacci himself is to be believed, the party has around
              120,000 members, with a minimum contribution of €10 each. That
              means it could have a budget of at least one million euros — no
              small sum for a newly created party that is not yet a year old
              <a className="ref" href="#ref7">
                [7]
              </a>
              . So there are people and organisations willing to invest in this
              political project, which raises the question: will those
              investors push for the partial or complete lifting of sanctions
              on Russia?
            </p>
          </div>
        </details>

        <p>
          Another problem is the programmatic crisis of the Italian right. If
          in 2022 the mediator between the liberal Forza Italia and Meloni&apos;s
          right-conservative Fratelli d&apos;Italia was Silvio Berlusconi, with
          his prestige and media capital, today there is hardly a figure
          capable of playing that same role of go-between and unifier.
          Especially given that Forza Italia is drifting gradually towards even
          greater liberalism, particularly on social issues, while Futuro
          Nazionale stands openly on traditionalist ground.
        </p>

        <p style={{ fontStyle: "italic", color: "var(--slate)" }}>
          These considerations are, of course, still speculation and simple
          arithmetic — but they are necessary to build the context.
        </p>

        <p>
          Before turning to the general himself, it is worth understanding
          where the other right-wing forces stand on the war.
        </p>

        {/* ===================== SECTION 2 ===================== */}
        <h2>
          <span className="h2-num">Section 2</span>Three parties, three
          positions on the Kremlin
        </h2>

        <p>
          Since 2022 the ruling coalition has consisted of Ms
          Meloni&apos;s Fratelli d&apos;Italia, Forza Italia under Foreign
          Minister Antonio Tajani, and Matteo Salvini&apos;s Lega. There are
          smaller forces too, but there is no point discussing them here.
        </p>

        <p>
          Meloni&apos;s position is, I assume, more or less familiar to the
          Ukrainian reader. Still in opposition in February 2022, Meloni
          condemned Russian aggression and supported military aid to Ukraine,
          seeing in it an opportunity to increase the Italian defence budget as
          well. As President of the Council of Ministers she continued
          providing military aid to Ukraine while also backing the diplomatic
          initiatives of the Trump administration. It is worth noting, however,
          that the full volume of Italian military aid is unknown. According to
          the Kiel Institute&apos;s Ukraine Support Tracker, Italy has
          allocated €3 billion in purely military aid
          <a className="ref" href="#ref8">
            [8]
          </a>
          . For comparison: Poland has allocated almost 4.5 billion, France
          slightly more than 6, and Germany over 24. Official figures are
          classified, so the aid can only be inventoried through OSINT.
        </p>

        <table>
          <thead>
            <tr>
              <th>Party</th>
              <th>Leader</th>
              <th>Position on the war</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Fratelli d&apos;Italia</strong>
              </td>
              <td>Giorgia Meloni</td>
              <td>
                <strong>Pro-Ukrainian</strong> — military aid, support for US
                diplomacy
              </td>
            </tr>
            <tr>
              <td>
                <strong>Forza Italia</strong>
              </td>
              <td>Antonio Tajani</td>
              <td>
                <strong>Reserved</strong> — aid is provided, but strikes on
                Russia are barred; Berlusconi&apos;s Kremlin trail
              </td>
            </tr>
            <tr>
              <td>
                <strong>Lega</strong>
              </td>
              <td>Matteo Salvini</td>
              <td>
                <strong>Pro-Russian</strong> — anti-sanctions rhetoric, a
                standing agreement with United Russia
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Forza Italia deserves a separate remark. From its founding in 1994
          until June 2023 the party was effectively Silvio Berlusconi&apos;s
          private property. There is little need to recall how warmly
          Berlusconi felt about Russia and Putin; a certain loyalty to the
          Russian president survived into 2022 as well. That year LaPresse
          published an audio recording in which Berlusconi repeated the Russian
          narrative that Ukraine had &ldquo;torn up&rdquo; the Minsk agreements
          and committed aggression against the Donbas
          &ldquo;republics&rdquo;
          <a className="ref" href="#ref9">
            [9]
          </a>
          . But after the death of the <em>cavaliere</em>, leadership of the
          party passed to Antonio Tajani, who by then already headed the
          Foreign Ministry. In that post Tajani has generally supported aid to
          Ukraine, though he did prohibit the use of Italian weapons during the
          Kursk operation.
        </p>

        <p>
          Salvini&apos;s Lega held distinctly pro-Russian positions even before
          the full-scale war. That includes anti-sanctions rhetoric, Russian
          money — notably from Konstantin Malofeev, who financed
          right-conservative events and congresses in Europe — and an agreement
          on &ldquo;coordination and cooperation&rdquo; with United Russia, in
          force since 2017 and never once terminated. Not to mention that it
          was Lega politicians in Veneto, Lombardy and Liguria who pushed for
          recognition of the annexation of Crimea and organised business
          delegations to the occupied peninsula. In 2022 Salvini publicly
          opposed transferring weapons, although he voted in favour in
          parliament.
        </p>

        <p>
          To sum up: the foreign policy course of the right camp has so far
          been set by whoever won the election, with the others following
          along, largely out of party discipline. That trend now looks set to
          change substantially.
        </p>

        {/* ===================== SECTION 3 ===================== */}
        <h2>
          <span className="h2-num">Section 3</span>Reporting for duty, General!
        </h2>

        <p>
          There is no point within this article in dissecting Vannacci&apos;s
          military and institutional career — it is rich enough and connected
          to the overwhelming majority of Italian foreign military missions.
          What interests us above all is his political career, which began with
          the publication of his autobiography <em>Il mondo al contrario</em>
          <a className="ref" href="#ref10">
            [10]
          </a>{" "}
          in 2023; the book&apos;s central message is a critique of modernity,
          the need to return to traditional values, the defence of national
          identity against multiculturalism, and a revival of patriotism.
        </p>

        <figure className="fig">
          <img
            src="/articles/natsionalne-maibutnie-z-putinym/vannacci-portrait.webp"
            alt="General Roberto Vannacci presenting his autobiography Il mondo al contrario"
          />
          <figcaption>
            <strong>2023.</strong>{" "}
            <em>
              The publication of the autobiography &ldquo;Il mondo al
              contrario&rdquo; was the starting point of Vannacci&apos;s
              political career.
            </em>
          </figcaption>
        </figure>

        <p>
          The autobiography&apos;s unexpected popularity and the loud scandals
          around its content gave the general a certain media capital, which
          attracted the attention of Matteo Salvini — who at that moment was
          holding more radical positions himself, particularly on migrants. So
          in the 2024 European elections Lega put Vannacci forward as its
          candidate. After a campaign that openly appealed to fascist symbolism
          — notably through the use of the insignia of the Decima Flottiglia
          MAS — Vannacci became a member of the European Parliament.
        </p>

        <p>
          Already in that post the general openly declared his sympathies for
          the Russian Federation and its leadership: choosing between &ldquo;a
          comedian and a politician with twenty years of experience&rdquo;, he
          would pick the politician who &ldquo;brought prosperity to his
          country&rdquo;
          <a className="ref" href="#ref11">
            [11]
          </a>
          .
        </p>

        <blockquote className="pullquote">
          &ldquo;Between a comedian and a politician with twenty years of
          experience, I would choose the politician who brought prosperity to
          his country&rdquo;
          <cite className="pullquote__cite">
            Roberto Vannacci · on Putin, on air
          </cite>
        </blockquote>

        <p>
          Nor should it be forgotten that from 2020 to 2022 Vannacci was
          Italy&apos;s military attaché in Russia, with additional
          accreditation in Belarus, Armenia and Uzbekistan; he has kept friends
          there ever since, something he does not hide
          <a className="ref" href="#ref12">
            [12]
          </a>
          . Quite recently, on one television broadcast, Vannacci declared
          himself open to Russian funding — provided it was
          &ldquo;legal&rdquo;
          <a className="ref" href="#ref13">
            [13]
          </a>
          .
        </p>

        <p>
          Among the general&apos;s associates is the &ldquo;black baron&rdquo;
          Roberto Jonghi Lavarini, long tied to far-right movements both in
          Italy and abroad. His pro-Russian stance is well known: years of
          contacts with Alexander Dugin and the popularisation of his
          geopolitical ideas. Jonghi Lavarini recently stated that Futuro
          Nazionale is actively building an international network of
          contacts — including with Russian circles close to Dugin and with the
          MAGA milieu
          <a className="ref" href="#ref14">
            [14]
          </a>
          . Another example is Trieste city councillor Ugo Rossi, who joined
          the party already carrying no-vax and pro-Putin positions from before
          his entry into Futuro Nazionale.
        </p>

        <p>
          But there are at least two more interesting figures among the
          &ldquo;futurists&rdquo;.
        </p>

        {/* ===================== SECTION 4 ===================== */}
        <h2>
          <span className="h2-num">Section 4</span>Russians among the futurists
        </h2>

        <p>
          Five figures around the general — from party co-founders to recent
          arrivals — and what is known about their ties to Russia:
        </p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role in the party</th>
              <th>Pro-Russian trail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Roberto Vannacci</strong>
              </td>
              <td>Leader</td>
              <td>
                Attaché in Moscow 2020–2022, public sympathies for Putin,
                openness to Russian funding
              </td>
            </tr>
            <tr>
              <td>
                <strong>Roberto Jonghi Lavarini</strong>
              </td>
              <td>Associate, the &ldquo;black baron&rdquo;</td>
              <td>
                Years of contacts with Dugin, a network spanning Russian
                circles and the MAGA sphere
              </td>
            </tr>
            <tr>
              <td>
                <strong>Ugo Rossi</strong>
              </td>
              <td>Trieste city councillor</td>
              <td>No-vax and pro-Putin positions before joining the party</td>
            </tr>
            <tr>
              <td>
                <strong>Pietro Stramezzi</strong>
              </td>
              <td>The &ldquo;count&rdquo;, head of the Milan branch</td>
              <td>
                Lives in Russia, works for the Russian oil sector, founder of
                &ldquo;Friends of Russia&rdquo;
              </td>
            </tr>
            <tr>
              <td>
                <strong>Larisa Yudina</strong>
              </td>
              <td>Delegate to the founding congress</td>
              <td>
                Born in Russia, publicly called Ukrainian cities
                &ldquo;Russian cities&rdquo;
              </td>
            </tr>
          </tbody>
        </table>

        <h3>The &ldquo;count&rdquo; Pietro Stramezzi</h3>

        <p>
          One of them is the &ldquo;count&rdquo; Pietro Stramezzi, also known
          as Pyotr Venyaminovich Stramezzi — judging by certain certificates
          the nobleman has published on social media himself.
        </p>

        <p>
          The aristocrat was born in Milan in 2001, the son of Dr Andrea
          Stramezzi — in his time a candidate for the micro-party Italexit and
          an opponent of coronavirus vaccination. Since 2024 he has lived in
          Russia, where, by his own account, he moved after receiving a job
          offer in the oil sector
          <a className="ref" href="#ref15">
            [15]
          </a>
          . To get ahead of ourselves: he does indeed work for the Russian oil
          sector, specifically at 1oil Management
          <a className="ref" href="#ref16">
            [16]
          </a>
          , a consulting company registered in 2014 where, by some accounts,
          Stramezzi heads the foreign projects department. Officially 1oil
          employs 20 people, while the company&apos;s net assets as of
          31.12.2025 stand at minus 200 million roubles
          <a className="ref" href="#ref17">
            [17]
          </a>
          .
        </p>

        <p>
          The &ldquo;count&rdquo; Stramezzi is an active and regular
          participant in various forums held in Russia. Judging by his Telegram
          channel, one can compile an entire list of conferences he has taken
          part in; the most interesting are &ldquo;Back to the Future&rdquo;
          run by the Sorok Sorokov movement
          <a className="ref" href="#ref18">
            [18]
          </a>
          , the All-Russian Patriotic Forum
          <a className="ref" href="#ref19">
            [19]
          </a>
          , the 13th Moscow International Engineering Forum
          <a className="ref" href="#ref20">
            [20]
          </a>{" "}
          and the international youth forum in Sochi
          <a className="ref" href="#ref21">
            [21]
          </a>
          . Worth singling out separately is a conference in the building of
          the Russian Senate on &ldquo;developing&rdquo; soft power for the
          struggle against the &ldquo;American-Zionist deep state&rdquo;
          <a className="ref" href="#ref22">
            [22]
          </a>
          .
        </p>

        <p>
          Mr Stramezzi is also the founder and head of the association
          &ldquo;Friends of Russia&rdquo; (<em>Druzya Rossii</em>), whose only
          known public event was a congress in Moscow in September 2025. Among
          the participants were Fabrice Sorlin (a former member of Rassemblement
          National and head of the sanctioned International Russophile
          Movement), Andrea Palmieri (a former leader of the Lucca Calcio
          ultras and a separatist volunteer convicted of recruitment in 2024
          <a className="ref" href="#ref23">
            [23]
          </a>
          ), the Duce&apos;s great-grandson Caio Giulio Cesare Mussolini, and
          Italy&apos;s honorary consul in Yekaterinburg, Roberto D&apos;Agostino
          <a className="ref" href="#ref24">
            [24]
          </a>
          . Stramezzi&apos;s network of contacts does not end there: one might
          also mention the Italian propagandist Andrea Lucidi and Viktor Bout.
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">A note on method</div>
          Photographs with one figure or another do not by themselves prove
          active contacts or relationships. But such information should not be
          ignored either — all the more so when Stramezzi himself voluntarily
          flaunts it on his own social media.
        </div>

        <figure className="fig">
          <img
            src="/articles/natsionalne-maibutnie-z-putinym/stramezzi-alemanno.webp"
            alt="Stramezzi, Alemanno and Vannacci at dinner"
          />
          <figcaption>
            <em>
              June 2026, Italy. The &ldquo;count&rdquo; Stramezzi meets Gianni
              Alemanno and General Vannacci shortly after Alemanno&apos;s
              release from prison.
            </em>
          </figcaption>
        </figure>

        <p>
          In Italy the &ldquo;count&rdquo; has managed to get acquainted with
          Gianni Alemanno and with General Vannacci himself, with whom he dined
          at the end of June
          <a className="ref" href="#ref25">
            [25]
          </a>{" "}
          — right after Alemanno&apos;s release from prison. Alemanno was
          historically a member of the Movimento Sociale Italiano, mayor of
          Rome from 2008 to 2013, and from 2019 to 2022 a member of
          Meloni&apos;s Fratelli d&apos;Italia. He also went on to head the
          committee <em>Fermare la Guerra</em> (&ldquo;Stop the War&rdquo;)
          <a className="ref" href="#ref26">
            [26]
          </a>
          , where Stramezzi was &ldquo;president&rdquo; of the Milan branch
          <a className="ref" href="#ref27">
            [27]
          </a>
          , and is now an associate of General Vannacci.
        </p>

        <h3>Larisa Yudina</h3>

        <p>
          Besides Italian nobility, Futuro Nazionale also includes a
          Russian-born member. Among the heads of one of the party&apos;s Milan
          branches and the delegates to the founding congress held this June is
          the lyric singer Larisa Yudina.
        </p>

        <p>
          Ms Yudina was born in Maykop and began her singing career in
          Kaliningrad, but by the early 2000s had tied it to Italy
          <a className="ref" href="#ref28">
            [28]
          </a>
          , where she studied at the Giuseppe Verdi Conservatory in Milan. In
          2005 she received Italian citizenship
          <a className="ref" href="#ref29">
            [29]
          </a>
          . Her undeniably impressive musical career gave her little particular
          occasion to comment on the full-scale war in Ukraine — but there is
          one episode.
        </p>

        <figure className="fig">
          <img
            src="/articles/natsionalne-maibutnie-z-putinym/yudina.webp"
            alt="Italian radio programme La Zanzara covering Larisa Yudina"
          />
          <figcaption>
            <em>
              04.06.2026 · a segment on the Italian radio show La Zanzara: the
              &ldquo;Vannacciana&rdquo; soprano Larisa Yudina, &ldquo;who sings
              the Russian anthem&rdquo;.
            </em>
          </figcaption>
        </figure>

        <p>
          In March 2022 Ms Yudina and her cultural and musical association
          Stravinsky Russkie Motivi staged a charity concert in Milan &ldquo;to
          help&rdquo; Ukrainian refugees
          <a className="ref" href="#ref30">
            [30]
          </a>
          . On Facebook, however, Ms Yudina calmly referred to Dnipro, Kharkiv,
          Kherson, Sumy and Luhansk as &ldquo;Russian cities&rdquo;, asking
          &ldquo;and what does Ukraine have to do with it?&rdquo;. In her
          subsequent public statements Yudina has not commented on the war, and
          her public role in the party is so far limited to performing the
          Italian anthem at various events
          <a className="ref" href="#ref31">
            [31]
          </a>
          . That may be merely a matter of time — especially given Mr
          Vannacci&apos;s own general position on the war.
        </p>

        {/* ===================== SECTION 5 ===================== */}
        <h2>
          <span className="h2-num">Section 5</span>A new right?
        </h2>

        <p>
          The emergence of Futuro Nazionale on the political scene has been
          something of a shock both for society and for the political space. It
          can already be said that Vannacci is actively stealing voters from
          other right-wing parties — above all from Salvini&apos;s Lega — and
          will most likely be able to dictate terms to his political partners,
          for the reasons we have already examined.
        </p>

        <p>
          Under the new electoral system a party on 6.5–7%, which is what
          Futuro Nazionale is, will play a key role in the new parliament and
          in the formation of the new Council of Ministers. The general himself
          has already stated that he will join a right-wing coalition only on
          the condition of a written agreement setting out, among other things,
          an end to military support for Ukraine
          <a className="ref" href="#ref32">
            [32]
          </a>{" "}
          and the development of a &ldquo;peace strategy&rdquo;. Against the
          backdrop of the Trump administration&apos;s unstable approach to
          Ukraine and Italy&apos;s desire to maintain good relations with
          Washington, this risk is becoming ever more concrete.
        </p>

        <p>
          To sum up: Ukraine has few friends in Italy, especially among
          influential people and large political coalitions. In the left camp
          the Democratic Party has still failed to work out a clear and unified
          position on the war, promoting a general rhetoric of peace and
          pacifism. The Five Star Movement, for its part, is rather pro-Russian
          — especially its current leader Giuseppe Conte. One might recall the
          tour of Russian CBRN troops across Italy in 2021, when he headed the
          Council of Ministers. Or one might recall his very recent words that
          Russia is &ldquo;being turned into a threat&rdquo;
          <a className="ref" href="#ref33">
            [33]
          </a>
          , and his call to sit Zelensky and Putin down at the negotiating
          table
          <a className="ref" href="#ref34">
            [34]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">
            ANPI: inconsistency within its own camp
          </div>
          The Associazione Nazionale Partigiani d&apos;Italia is an
          organisation created by Italian partisans to take part in public life
          on anti-fascist principles. On 22 February 2022, chaired by
          Gianfranco Pagliarulo, ANPI came out against recognition of the
          separatist &ldquo;republics&rdquo; — justifying this, however, by
          &ldquo;NATO expansion eastwards&rdquo;
          <a className="ref" href="#ref35">
            [35]
          </a>
          , and after the invasion it condemned the provision of military aid
          to Ukraine
          <a className="ref" href="#ref36">
            [36]
          </a>
          . At local level the organisation has also turned a blind eye to
          conferences with openly pro-Russian speakers.
        </div>

        <p>
          In the near future it will become clear what General Vannacci&apos;s
          aggressive, populist rhetoric actually translates into, and how it
          will affect Italy&apos;s role in supporting Ukraine.
        </p>

        {/* ===================== SOURCES ===================== */}
        <div className="refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref1">
              Here and below: Futuro Nazionale translates as &ldquo;National
              Future&rdquo;.
            </li>
            <li id="ref2">
              https://www.corriere.it/politica/26_luglio_16/stabilicum-cosa-prevede-la-legge-elettorale-tutti-i-punti-fondamentali-c73ba09b-f599-41e7-a69b-22aca5114xlk.shtml
            </li>
            <li id="ref3">
              https://www.youtrend.it/wp-content/uploads/2026/07/DOSSIER-LEGGE-ELETTORALE.pdf
            </li>
            <li id="ref4">
              Antonio Tajani — leader of Forza Italia after Berlusconi&apos;s
              death, currently Italy&apos;s foreign minister.
            </li>
            <li id="ref5">
              https://www.linkiesta.it/2026/07/chi-sono-i-finanziatori-di-futuro-nazionale/
            </li>
            <li id="ref6">
              https://futuronazionale.it/wp-content/uploads/2026/06/Futuro-Naziona-Trasparenza_agg_23_giugno2026.pdf
            </li>
            <li id="ref7">
              For comparison: Meloni&apos;s party had roughly 204,000 members
              and a budget of €10.8 million in 2022; Forza Italia had 250,000
              members and €7.2 million for 2025.
            </li>
            <li id="ref8">
              https://www.kielinstitut.de/topics/war-against-ukraine/ukraine-support-tracker
            </li>
            <li id="ref9">
              https://www.today.it/politica/berlusconi-nuovo-audio-putin-zelensky.html
            </li>
            <li id="ref10">
              &ldquo;Il mondo al contrario&rdquo; translates as &ldquo;The
              World Upside Down&rdquo;.
            </li>
            <li id="ref11">
              https://www.ansa.it/sito/notizie/topnews/2025/09/09/vannacci-zelensky-o-putin-scelgo-putincon-lui-benessere_7e4a238d-796b-4de4-bd52-bf21f08d982d.html
            </li>
            <li id="ref12">
              https://www.ilmessaggero.it/video/politica/vannacci_gaffe_crimea_villa_russia_correzione_conferenza_stampa-9592073.html
            </li>
            <li id="ref13">
              https://www.adnkronos.com/politica/vannacci-partito-finanziamenti-russia_5kcbbLhQh5eTPXZ50eRr1M
            </li>
            <li id="ref14">
              https://www.open.online/2026/03/17/peter-thiel-incontro-roberto-jonghi-lavarini-roberto-vannacci-intervista/
            </li>
            <li id="ref15">
              https://www.youtube.com/watch?v=vam42AVkJDk (05:04)
            </li>
            <li id="ref16">
              https://www.valigiablu.it/remigrazione-russia-rete-propaganda-vannacci/
            </li>
            <li id="ref17">
              https://www.audit-it.ru/contragent/1147748022542_ooo-1oyl-menedzhment
            </li>
            <li id="ref18">
              https://t.me/sorok40russia/81494 ; https://t.me/italianrussia/865
            </li>
            <li id="ref19">https://t.me/italianrussia/818</li>
            <li id="ref20">https://t.me/italianrussia/729</li>
            <li id="ref21">
              https://x.com/PStramezzi/status/1766056705673072722
            </li>
            <li id="ref22">https://t.me/italianrussia/180</li>
            <li id="ref23">
              https://www.ansa.it/sito/notizie/cronaca/2024/03/14/cassazione-conferma-5-anni-per-mercenario-filo-russo-palmeri_727e22dc-50e2-4f18-8397-d19f6f899eeb.html
            </li>
            <li id="ref24">https://t.me/italianrussia/681</li>
            <li id="ref25">
              https://x.com/PStramezzi/status/2070249582525661400 ;
              https://x.com/PStramezzi/status/2066269783524360293
            </li>
            <li id="ref26">
              &ldquo;Fermare la Guerra&rdquo; translates as &ldquo;Stop the
              War&rdquo;.
            </li>
            <li id="ref27">https://t.me/italianrussia/156</li>
            <li id="ref28">
              https://www.associazionearteviva.com/musicista/larissa-yudina/
            </li>
            <li id="ref29">
              https://www.youtube.com/watch?v=gy-j87iIpas (05:23)
            </li>
            <li id="ref30">
              https://www.milanotoday.it/attualita/concerto-ucraina-propaganda.html
            </li>
            <li id="ref31">
              https://www.facebook.com/larisa.yudina.58/posts/linno-ditalia-con-generale-vannacci-oggi-ad-imperia-il-microfono-non-era-perfett/2561554204298957/
            </li>
            <li id="ref32">
              https://www.corrieredellumbria.it/news/attualita/458774/vannacci-con-giorgia-meloni-solo-con-accordo-scritto-e-nuova-linea-sull-ucraina.html
            </li>
            <li id="ref33">
              https://www.ilpost.it/2026/07/10/giuseppe-conte-campo-largo-russia-minaccia/
            </li>
            <li id="ref34">https://www.youtube.com/watch?v=PZ_5sMDGMfk</li>
            <li id="ref35">
              https://www.anpi.it/ucraina-torni-un-grande-movimento-la-pace
            </li>
            <li id="ref36">
              https://www.anpi.it/pagliarulo-lanpi-condanna-fermamente-linvasione-dellucraina-e-non-faccio-alcuna-autocritica
            </li>
          </ol>
        </div>

        {/* ===================== ARTICLE FOOT ===================== */}
        <div className="article-foot">
          <div className="article-foot__tags">
            <span className="chip">Italy</span>
            <span className="chip">Vannacci</span>
            <span className="chip chip--rust">Futuro Nazionale</span>
            <span className="chip chip--steel">Kremlin</span>
            <span className="chip">electoral reform</span>
            <span className="chip">OSINT</span>
          </div>
          <div>CC BY-NC 4.0 · 20.08.2026</div>
        </div>
      </div>
      {/* /article-body */}

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
