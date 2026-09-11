import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, formatDate, requireVisibleArticle } from "@/lib/articles";

const metadata: Metadata = {
  title: "A National Future (With Putin?) — PLITKA Analytics",
  description:
    "Part 1 of a series on pro-Russian influence in European politics. Who funds General Roberto Vannacci, what Russian connections trail his inner circle, and how it threatens military aid to Ukraine.",
  openGraph: {
    images: ["/articles/natsionalne-maibutnie-z-putinym/cover.webp"],
  },
};

const SLUG = "national-future-with-putin";

export async function generateMetadata(): Promise<Metadata> {
  requireVisibleArticle(SLUG, "en");
  return metadata;
}

export default function Page() {
  requireVisibleArticle(SLUG, "en");
  const all = getAllArticles("en");
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);

  return (
    <main>
      {/* ============ ARTICLE HEAD ============ */}
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Investigation</span>
        <h1>“A National Future (With Putin?)”</h1>
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
          transformation. While Giorgia Meloniʼs government remains one of
          Ukraineʼs key partners in Southern Europe, a force is taking shape
          inside the Italian right that is capable of swinging Romeʼs foreign
          policy sharply towards the Kremlin.
        </p>

        <p>
          The chief destabiliser of the centre-right camp is General Roberto
          Vannacci — formerly Italyʼs military attaché in Moscow, now the leader
          of the newly founded party Futuro Nazionale (<em>National Future</em>
          )
          <a className="ref" href="#ref1">
            [1]
          </a>
          . Already polling at around 7% on ultra-conservative, anti-migrant
          rhetoric, Vannacci is not merely launching another populist movement:
          because of the way the new electoral system works, he becomes the
          golden share without which the current coalition cannot be held
          together.
        </p>

        {/* ===================== SECTION 1 ===================== */}
        <h2>
          <span className="h2-num">Section 1</span>The political landscape and
          the “Stabilicum trap”
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
                  <span>Fratelli dʼItalia</span>
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
          2022 figures are the official results of the Italian Interior Ministry
          (Viminale) and the Camera dei Deputati. 2026 figures come from a Lab21
          poll for Affaritaliani.it, 12.08.2026. “Total” is the sum of the
          parties listed for that bloc (minor forces excluded, so it may differ
          from official coalition figures).
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
          the idea of “remigration” into public discourse — the party has won
          the support of roughly 6.5–7% of the electorate.
        </p>

        <p>
          The reason is that the Chamber of Deputies has voted for a bill
          changing the electoral system, one Meloni herself is actively pushing
          <a className="ref" href="#ref2">
            [2]
          </a>
          . The current system is mixed: roughly 37–38% of parliamentary seats
          are elected on a first-past-the-post basis, the rest proportionally.
          In traditionally polarised Italian politics — a left camp and a right
          camp — parties did not fight for new voters but mobilised as large a
          share of their own electorate as possible, in order to secure the
          necessary parliamentary majority and place their people in ministerial
          chairs. Although the approach remains broadly the same, the emergence
          of new and, crucially, more radical forces could substantially reshape
          coalitions and electoral results. In 2013 the arrival of the Five Star
          Movement was an “earthquake”: absorbing both right-wing and left-wing
          voters, the party took a full 25% — and entered “big” politics, where
          it remains to this day.
        </p>

        <p>
          The reform is meant to guarantee greater governability, which is why
          journalists nicknamed it the “Stabilicum”. It proposes granting the
          coalition (or party) that wins at least 42% of the vote an additional
          70 (out of 400) seats in the Chamber of Deputies and 35 (out of 200)
          in the Senate; the finer technical details are beyond the scope of
          this article.
        </p>

        <div className="stat-card">
          <p className="stat-card__title">The “Stabilicum” math</p>
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
          a pivotal position: Meloniʼs coalition risks falling short of the
          required threshold without the junior partner. According to a forecast
          by the research firm YouTrend
          <a className="ref" href="#ref3">
            [3]
          </a>
          , without Vannacci the right can count on 42% of the vote — exactly
          the Stabilicum threshold; with him, on 48%, meaning a stable majority.
          That is below the 50% Futuro Nazionale and the rest of the right camp
          show in the latest Lab21 poll (see the chart above): the YouTrend
          forecast and the raw polling data are calculated differently, but the
          conclusion is the same — without the young party Meloni and her
          partners may lack the votes for a confident majority. That position
          gives Vannacci powerful leverage he can use to dictate terms to the
          other players, Meloni and Tajani included; there is hardly any point
          for the general in joining forces without concessions on remigration
          or Ukraine. Proud solitude may in this case work well for the Futuro
          Nazionale brand and its party organisation — allowing it not only to
          cannibalise the voters of other right-wing parties, but also to
          mobilise a share of politically passive young people.
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
              . Overall the party treasury has something to show off: voluntary
              donations alone come to €338,418.52
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
              political project, which raises the question: will those investors
              push for the partial or complete lifting of sanctions on Russia?
            </p>
          </div>
        </details>

        <p>
          Another problem is the programmatic crisis of the Italian right. If in
          2022 the mediator between the liberal Forza Italia and Meloniʼs
          right-conservative Fratelli dʼItalia was Silvio Berlusconi, with his
          prestige and media capital, today there is hardly a figure capable of
          playing that same role of go-between and unifier. Especially given
          that Forza Italia is drifting gradually towards even greater
          liberalism, particularly on social issues, while Futuro Nazionale
          stands openly on traditionalist ground.
        </p>

        <p style={{ fontStyle: "italic", color: "var(--slate)" }}>
          These considerations are, of course, still speculation and simple
          arithmetic — but they are necessary to build the context.
        </p>

        <p>
          Before turning to the general himself, it is worth understanding where
          the other right-wing forces stand on the war.
        </p>

        {/* ===================== SECTION 2 ===================== */}
        <h2>
          <span className="h2-num">Section 2</span>Three parties, three
          positions on the Kremlin
        </h2>

        <p>
          Since 2022 the ruling coalition has consisted of Ms Meloniʼs Fratelli
          dʼItalia, Forza Italia under Foreign Minister Antonio Tajani
          <a className="ref" href="#ref4">
            [4]
          </a>
          , and Matteo Salviniʼs Lega. There are smaller forces too, but there is no
          point discussing them here.
        </p>

        <p>
          Meloniʼs position is, I assume, more or less familiar to the Ukrainian
          reader. Still in opposition in February 2022, Meloni condemned Russian
          aggression and supported military aid to Ukraine, seeing in it an
          opportunity to increase the Italian defence budget as well. As
          President of the Council of Ministers she continued providing military
          aid to Ukraine while also backing the diplomatic initiatives of the
          Trump administration. It is worth noting, however, that the full
          volume of Italian military aid is unknown. According to the Kiel
          Instituteʼs Ukraine Support Tracker, Italy has allocated €3 billion in
          purely military aid
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
                <strong>Fratelli dʼItalia</strong>
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
                Russia are barred; Berlusconiʼs Kremlin trail
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
          until June 2023 the party was effectively Silvio Berlusconiʼs private
          property. There is little need to recall how warmly Berlusconi felt
          about Russia and Putin; a certain loyalty to the Russian president
          survived into 2022 as well. That year LaPresse published an audio
          recording in which Berlusconi repeated the Russian narrative that
          Ukraine had “torn up” the Minsk agreements and committed aggression
          against the Donbas “republics”
          <a className="ref" href="#ref9">
            [9]
          </a>
          . But after the death of the <em>cavaliere</em>, leadership of the
          party passed to Antonio Tajani, who by then already headed the Foreign
          Ministry. In that post Tajani has generally supported aid to Ukraine,
          though he did prohibit the use of Italian weapons during the Kursk
          operation.
        </p>

        <p>
          Salviniʼs Lega held distinctly pro-Russian positions even before the
          full-scale war. That includes anti-sanctions rhetoric, Russian money —
          notably from Konstantin Malofeev, who financed right-conservative
          events and congresses in Europe — and an agreement on “coordination
          and cooperation” with United Russia, in force since 2017 and never
          once terminated. Not to mention that it was Lega politicians in
          Veneto, Lombardy and Liguria who pushed for recognition of the
          annexation of Crimea and organised business delegations to the
          occupied peninsula. In 2022 Salvini publicly opposed transferring
          weapons, although he voted in favour in parliament.
        </p>

        <p>
          To sum up: the foreign policy course of the right camp has so far been
          set by whoever won the election, with the others following along,
          largely out of party discipline. That trend now looks set to change
          substantially.
        </p>

        {/* ===================== SECTION 3 ===================== */}
        <h2>
          <span className="h2-num">Section 3</span>Reporting for duty, General!
        </h2>

        <p>
          There is no point within this article in dissecting Vannacciʼs
          military and institutional career — it is rich enough and connected to
          the overwhelming majority of Italian foreign military missions. What
          interests us above all is his political career, which began with the
          publication of his autobiography <em>Il mondo al contrario</em>
          <a className="ref" href="#ref10">
            [10]
          </a>{" "}
          in 2023; the bookʼs central message is a critique of modernity, the
          need to return to traditional values, the defence of national identity
          against multiculturalism, and a revival of patriotism.
        </p>

        <figure className="fig">
          <img
            src="/articles/natsionalne-maibutnie-z-putinym/vannacci-portrait.webp"
            alt="General Roberto Vannacci presenting his autobiography Il mondo al contrario"
          />
          <figcaption>
            <strong>2023.</strong>{" "}
            <em>
              The publication of the autobiography “Il mondo al contrario” was
              the starting point of Vannacciʼs political career.
            </em>
          </figcaption>
        </figure>

        <p>
          The autobiographyʼs unexpected popularity and the loud scandals around
          its content gave the general a certain media capital, which attracted
          the attention of Matteo Salvini — who at that moment was holding more
          radical positions himself, particularly on migrants. So in the 2024
          European elections Lega put Vannacci forward as its candidate. After a
          campaign that openly appealed to fascist symbolism — notably through
          the use of the insignia of the Decima Flottiglia MAS — Vannacci became
          a member of the European Parliament.
        </p>

        <p>
          Already in that post the general openly declared his sympathies for
          the Russian Federation and its leadership: choosing between “a
          comedian and a politician with twenty years of experience”, he would
          pick the politician who “brought prosperity to his country”
          <a className="ref" href="#ref11">
            [11]
          </a>
          .
        </p>

        <blockquote className="pullquote">
          “Between a comedian and a politician with twenty years of experience,
          I would choose the politician who brought prosperity to his country”
          <cite className="pullquote__cite">
            Roberto Vannacci · on Putin, on air
          </cite>
        </blockquote>

        <p>
          Nor should it be forgotten that from 2020 to 2022 Vannacci was Italyʼs
          military attaché in Russia, with additional accreditation in Belarus,
          Armenia and Uzbekistan; he has kept friends there ever since,
          something he does not hide
          <a className="ref" href="#ref12">
            [12]
          </a>
          . Quite recently, on one television broadcast, Vannacci declared
          himself open to Russian funding — provided it was “legal”
          <a className="ref" href="#ref13">
            [13]
          </a>
          .
        </p>

        <p>
          Among the generalʼs associates is the “black baron” Roberto Jonghi
          Lavarini, long tied to far-right movements both in Italy and abroad.
          His pro-Russian stance is well known: years of contacts with Alexander
          Dugin and the popularisation of his geopolitical ideas. Jonghi
          Lavarini recently stated that Futuro Nazionale is actively building an
          international network of contacts — including with Russian circles
          close to Dugin and with the MAGA milieu
          <a className="ref" href="#ref14">
            [14]
          </a>
          . Another example is Trieste city councillor Ugo Rossi, who joined the
          party already carrying no-vax and pro-Putin positions from before his
          entry into Futuro Nazionale.
        </p>

        <p>
          But there are at least two more interesting figures among the
          “futurists”.
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
              <td>Associate, the “black baron”</td>
              <td>
                Years of contacts with Dugin, a network spanning Russian circles
                and the MAGA sphere
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
              <td>The “count”, head of the Milan branch</td>
              <td>
                Lives in Russia, works for the Russian oil sector, founder of
                “Friends of Russia”
              </td>
            </tr>
            <tr>
              <td>
                <strong>Larisa Yudina</strong>
              </td>
              <td>Delegate to the founding congress</td>
              <td>
                Born in Russia, publicly called Ukrainian cities “Russian
                cities”
              </td>
            </tr>
          </tbody>
        </table>

        <h3>The “count” Pietro Stramezzi</h3>

        <p>
          One of them is the “count” Pietro Stramezzi, also known as Pyotr
          Venyaminovich Stramezzi — judging by certain certificates the nobleman
          has published on social media himself.
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
          employs 20 people, while the companyʼs net assets as of 31.12.2025
          stand at minus 200 million roubles
          <a className="ref" href="#ref17">
            [17]
          </a>
          .
        </p>

        <p>
          The “count” Stramezzi is an active and regular participant in various
          forums held in Russia. Judging by his Telegram channel, one can
          compile an entire list of conferences he has taken part in; the most
          interesting are “Back to the Future” run by the Sorok Sorokov movement
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
          . Worth singling out separately is a conference in the building of the
          Russian Senate on “developing” soft power for the struggle against the
          “American-Zionist deep state”
          <a className="ref" href="#ref22">
            [22]
          </a>
          .
        </p>

        <p>
          Mr Stramezzi is also the founder and head of the association “Friends
          of Russia” (<em>Druzya Rossii</em>), whose only known public event was
          a congress in Moscow in September 2025. Among the participants were
          Fabrice Sorlin (a former member of Rassemblement National and head of
          the sanctioned International Russophile Movement), Andrea Palmieri (a
          former leader of the Lucca Calcio ultras and a separatist volunteer
          convicted of recruitment in 2024
          <a className="ref" href="#ref23">
            [23]
          </a>
          ), the Duceʼs great-grandson Caio Giulio Cesare Mussolini, and Italyʼs
          honorary consul in Yekaterinburg, Roberto DʼAgostino
          <a className="ref" href="#ref24">
            [24]
          </a>
          . Stramezziʼs network of contacts does not end there: one might also
          mention the Italian propagandist Andrea Lucidi and Viktor Bout.
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
              June 2026, Italy. The “count” Stramezzi meets Gianni Alemanno and
              General Vannacci shortly after Alemannoʼs release from prison.
            </em>
          </figcaption>
        </figure>

        <p>
          In Italy the “count” has managed to get acquainted with Gianni
          Alemanno and with General Vannacci himself, with whom he dined at the
          end of June
          <a className="ref" href="#ref25">
            [25]
          </a>{" "}
          — right after Alemannoʼs release from prison. Alemanno was
          historically a member of the Movimento Sociale Italiano, mayor of Rome
          from 2008 to 2013, and from 2019 to 2022 a member of Meloniʼs Fratelli
          dʼItalia. He also went on to head the committee{" "}
          <em>Fermare la Guerra</em> (“Stop the War”)
          <a className="ref" href="#ref26">
            [26]
          </a>
          , where Stramezzi was “president” of the Milan branch
          <a className="ref" href="#ref27">
            [27]
          </a>
          , and is now an associate of General Vannacci.
        </p>

        <h3>Larisa Yudina</h3>

        <p>
          Besides Italian nobility, Futuro Nazionale also includes a
          Russian-born member. Among the heads of one of the partyʼs Milan
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
              “Vannacciana” soprano Larisa Yudina, “who sings the Russian
              anthem”.
            </em>
          </figcaption>
        </figure>

        <p>
          In March 2022 Ms Yudina and her cultural and musical association
          Stravinsky Russkie Motivi staged a charity concert in Milan “to help”
          Ukrainian refugees
          <a className="ref" href="#ref30">
            [30]
          </a>
          . On Facebook, however, Ms Yudina calmly referred to Dnipro, Kharkiv,
          Kherson, Sumy and Luhansk as “Russian cities”, asking “and what does
          Ukraine have to do with it?”. In her subsequent public statements
          Yudina has not commented on the war, and her public role in the party
          is so far limited to performing the Italian anthem at various events
          <a className="ref" href="#ref31">
            [31]
          </a>
          . That may be merely a matter of time — especially given Mr Vannacciʼs
          own general position on the war.
        </p>

        {/* ===================== SECTION 5 ===================== */}
        <h2>
          <span className="h2-num">Section 5</span>A new right?
        </h2>

        <p>
          The emergence of Futuro Nazionale on the political scene has been
          something of a shock both for society and for the political space. It
          can already be said that Vannacci is actively stealing voters from
          other right-wing parties — above all from Salviniʼs Lega — and will
          most likely be able to dictate terms to his political partners, for
          the reasons we have already examined.
        </p>

        <p>
          Under the new electoral system a party on 6.5–7%, which is what Futuro
          Nazionale is, will play a key role in the new parliament and in the
          formation of the new Council of Ministers. The general himself has
          already stated that he will join a right-wing coalition only on the
          condition of a written agreement setting out, among other things, an
          end to military support for Ukraine
          <a className="ref" href="#ref32">
            [32]
          </a>{" "}
          and the development of a “peace strategy”. Against the backdrop of the
          Trump administrationʼs unstable approach to Ukraine and Italyʼs desire
          to maintain good relations with Washington, this risk is becoming ever
          more concrete.
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
          Russia is “being turned into a threat”
          <a className="ref" href="#ref33">
            [33]
          </a>
          , and his call to sit Zelensky and Putin down at the negotiating table
          <a className="ref" href="#ref34">
            [34]
          </a>
          .
        </p>

        <div className="aside-note">
          <div className="aside-note__lbl">
            ANPI: inconsistency within its own camp
          </div>
          The Associazione Nazionale Partigiani dʼItalia is an organisation
          created by Italian partisans to take part in public life on
          anti-fascist principles. On 22 February 2022, chaired by Gianfranco
          Pagliarulo, ANPI came out against recognition of the separatist
          “republics” — justifying this, however, by “NATO expansion eastwards”
          <a className="ref" href="#ref35">
            [35]
          </a>
          , and after the invasion it condemned the provision of military aid to
          Ukraine
          <a className="ref" href="#ref36">
            [36]
          </a>
          . At local level the organisation has also turned a blind eye to
          conferences with openly pro-Russian speakers.
        </div>

        <p>
          In the near future it will become clear what General Vannacciʼs
          aggressive, populist rhetoric actually translates into, and how it
          will affect Italyʼs role in supporting Ukraine.
        </p>

        {/* ===================== SOURCES ===================== */}
        <div className="refs">
          <h3>Sources</h3>
          <ol>
            <li id="ref1">
              Here and below: Futuro Nazionale translates as “National Future”.
            </li>
            <li id="ref2">
              Corriere della Sera, 16.07.2026 — what the electoral-system bill
              passed by the Chamber of Deputies (“Stabilicum”) actually provides
              for.{" "}
              <a href="https://www.corriere.it/politica/26_luglio_16/stabilicum-cosa-prevede-la-legge-elettorale-tutti-i-punti-fondamentali-c73ba09b-f599-41e7-a69b-22aca5114xlk.shtml">
                corriere.it
              </a>
            </li>
            <li id="ref3">
              YouTrend — dossier on the electoral reform, July 2026: projected
              distribution of seats under the new system.{" "}
              <a href="https://www.youtrend.it/wp-content/uploads/2026/07/DOSSIER-LEGGE-ELETTORALE.pdf">
                youtrend.it (PDF)
              </a>
            </li>
            <li id="ref4">
              Antonio Tajani — leader of Forza Italia after Berlusconiʼs death,
              currently Italyʼs foreign minister.
            </li>
            <li id="ref5">
              Linkiesta, July 2026 — who funds Futuro Nazionale: the sectors and
              companies among the partyʼs donors.{" "}
              <a href="https://www.linkiesta.it/2026/07/chi-sono-i-finanziatori-di-futuro-nazionale/">
                linkiesta.it
              </a>
            </li>
            <li id="ref6">
              Futuro Nazionale — the partyʼs own funding-transparency report as
              of 23.06.2026: the total of voluntary donations. The partyʼs
              figures about itself.{" "}
              <a href="https://futuronazionale.it/wp-content/uploads/2026/06/Futuro-Naziona-Trasparenza_agg_23_giugno2026.pdf">
                futuronazionale.it (PDF)
              </a>
            </li>
            <li id="ref7">
              For comparison: Meloniʼs party had roughly 204,000 members and a
              budget of €10.8 million in 2022; Forza Italia — 250,000 members
              and €7.2 million for 2025.
            </li>
            <li id="ref8">
              Ukraine Support Tracker, Kiel Institute for the World Economy —
              the volume of Italian military aid to Ukraine.{" "}
              <a href="https://www.kielinstitut.de/topics/war-against-ukraine/ukraine-support-tracker">
                kielinstitut.de
              </a>
            </li>
            <li id="ref9">
              Today.it — the Berlusconi audio recording published by LaPresse on
              the “rupture” of the Minsk agreements and on Donbas, 2022.{" "}
              <a href="https://www.today.it/politica/berlusconi-nuovo-audio-putin-zelensky.html">
                today.it
              </a>
            </li>
            <li id="ref10">
              “Il mondo al contrario” translates as “The World Upside Down”.
            </li>
            <li id="ref11">
              ANSA, 09.09.2025 — Vannacci on choosing between Zelensky and
              Putin: he picks Putin, “with him there was prosperity”.{" "}
              <a href="https://www.ansa.it/sito/notizie/topnews/2025/09/09/vannacci-zelensky-o-putin-scelgo-putincon-lui-benessere_7e4a238d-796b-4de4-bd52-bf21f08d982d.html">
                ansa.it
              </a>
            </li>
            <li id="ref12">
              Il Messaggero — video: Vannacciʼs slip about Crimea and a “villa
              in Russia”, and his correction at the press conference.{" "}
              <a href="https://www.ilmessaggero.it/video/politica/vannacci_gaffe_crimea_villa_russia_correzione_conferenza_stampa-9592073.html">
                ilmessaggero.it
              </a>
            </li>
            <li id="ref13">
              Adnkronos — Vannacci says he is open to Russian funding for the
              party, “provided it is legal”.{" "}
              <a href="https://www.adnkronos.com/politica/vannacci-partito-finanziamenti-russia_5kcbbLhQh5eTPXZ50eRr1M">
                adnkronos.com
              </a>
            </li>
            <li id="ref14">
              Open, 17.03.2026 — interview with Roberto Jonghi Lavarini: Futuro
              Nazionaleʼs international network, contacts with Dugin-adjacent
              circles and the MAGA orbit, and the meeting with Peter Thiel.{" "}
              <a href="https://www.open.online/2026/03/17/peter-thiel-incontro-roberto-jonghi-lavarini-roberto-vannacci-intervista/">
                open.online
              </a>
            </li>
            <li id="ref15">
              YouTube — interview with Pietro Stramezzi (from 05:04): born in
              Milan, moved to Russia in 2024 and works in the oil sector, in his
              own account.{" "}
              <a href="https://www.youtube.com/watch?v=vam42AVkJDk">
                youtube.com
              </a>
            </li>
            <li id="ref16">
              Valigia Blu — analysis of the Russian propaganda network around
              “remigration” and Vannacci: Stramezziʼs work in the Russian oil
              sector.{" "}
              <a href="https://www.valigiablu.it/remigrazione-russia-rete-propaganda-vannacci/">
                valigiablu.it
              </a>
            </li>
            <li id="ref17">
              Audit-it — registry data on OOO 1oyl Management: year of
              registration, headcount, net assets as of 31.12.2025.{" "}
              <a href="https://www.audit-it.ru/contragent/1147748022542_ooo-1oyl-menedzhment">
                audit-it.ru
              </a>
            </li>
            <li id="ref18">
              The Telegram channels Sorok Sorokov <a
              href="https://t.me/sorok40russia/81494">t.me/sorok40russia</a> and
              Italia — Russia <a
              href="https://t.me/italianrussia/865">t.me/italianrussia</a> —
              Stramezziʼs attendance at the “Back to the Future” forum. Telegram
              channel content is presented as those channelsʼ own claims.
            </li>
            <li id="ref19">
              Telegram channel Italia — Russia — attendance at the All-Russian
              Patriotic Forum.{" "}
              <a href="https://t.me/italianrussia/818">
                t.me/italianrussia
              </a>
            </li>
            <li id="ref20">
              Telegram channel Italia — Russia — attendance at the 13th Moscow
              International Engineering Forum.{" "}
              <a href="https://t.me/italianrussia/729">
                t.me/italianrussia
              </a>
            </li>
            <li id="ref21">
              Pietro Stramezzi on X — post about the international youth forum
              in Sochi.{" "}
              <a href="https://x.com/PStramezzi/status/1766056705673072722">
                x.com/PStramezzi
              </a>
            </li>
            <li id="ref22">
              Telegram channel Italia — Russia — the conference in the Russian
              Senate building on “soft power”.{" "}
              <a href="https://t.me/italianrussia/180">
                t.me/italianrussia
              </a>
            </li>
            <li id="ref23">
              ANSA, 14.03.2024 — the Court of Cassation upholds a five-year
              sentence for the pro-Russian volunteer fighter Andrea Palmieri
              over recruitment.{" "}
              <a href="https://www.ansa.it/sito/notizie/cronaca/2024/03/14/cassazione-conferma-5-anni-per-mercenario-filo-russo-palmeri_727e22dc-50e2-4f18-8397-d19f6f899eeb.html">
                ansa.it
              </a>
            </li>
            <li id="ref24">
              Telegram channel Italia — Russia — the roster of participants at
              the Moscow gathering in September 2025.{" "}
              <a href="https://t.me/italianrussia/681">
                t.me/italianrussia
              </a>
            </li>
            <li id="ref25">
              Pietro Stramezzi on X — posts about the dinner with Gianni
              Alemanno and General Vannacci, June 2026: <a
              href="https://x.com/PStramezzi/status/2070249582525661400">first</a>
              and <a
              href="https://x.com/PStramezzi/status/2066269783524360293">second</a>.
            </li>
            <li id="ref26">
              “Fermare la Guerra” translates as “Stop the War”.
            </li>
            <li id="ref27">
              Telegram channel Italia — Russia — Stramezzi as “president” of the
              Milan branch of the Fermare la Guerra committee.{" "}
              <a href="https://t.me/italianrussia/156">
                t.me/italianrussia
              </a>
            </li>
            <li id="ref28">
              Arte Viva association — biographical profile of the singer Larissa
              Yudina: Maykop, Kaliningrad, the move to Italy.{" "}
              <a href="https://www.associazionearteviva.com/musicista/larissa-yudina/">
                associazionearteviva.com
              </a>
            </li>
            <li id="ref29">
              YouTube — interview with Larissa Yudina (from 05:23): studies at
              the Giuseppe Verdi conservatory in Milan and Italian citizenship.{" "}
              <a href="https://www.youtube.com/watch?v=gy-j87iIpas">
                youtube.com
              </a>
            </li>
            <li id="ref30">
              MilanoToday — the Milan charity concert “to help” Ukrainian
              refugees and the objections to its content.{" "}
              <a href="https://www.milanotoday.it/attualita/concerto-ucraina-propaganda.html">
                milanotoday.it
              </a>
            </li>
            <li id="ref31">
              Larissa Yudina on Facebook — post about performing the Italian
              anthem alongside General Vannacci in Imperia.{" "}
              <a href="https://www.facebook.com/larisa.yudina.58/posts/linno-ditalia-con-generale-vannacci-oggi-ad-imperia-il-microfono-non-era-perfett/2561554204298957/">
                facebook.com
              </a>
            </li>
            <li id="ref32">
              Corriere dellʼUmbria — Vannacci on his terms for joining a
              coalition with Meloni: a written agreement and a new line on
              Ukraine.{" "}
              <a href="https://www.corrieredellumbria.it/news/attualita/458774/vannacci-con-giorgia-meloni-solo-con-accordo-scritto-e-nuova-linea-sull-ucraina.html">
                corrieredellumbria.it
              </a>
            </li>
            <li id="ref33">
              Il Post, 10.07.2026 — Giuseppe Conteʼs position, and that of the
              “broad field”, on the Russian threat.{" "}
              <a href="https://www.ilpost.it/2026/07/10/giuseppe-conte-campo-largo-russia-minaccia/">
                ilpost.it
              </a>
            </li>
            <li id="ref34">
              YouTube — recording of Giuseppe Conte calling for Zelensky and
              Putin to be brought to the negotiating table.{" "}
              <a href="https://www.youtube.com/watch?v=PZ_5sMDGMfk">
                youtube.com
              </a>
            </li>
            <li id="ref35">
              ANPI — the organisationʼs position on Ukraine and on recognition
              of the separatist “republics”.{" "}
              <a href="https://www.anpi.it/ucraina-torni-un-grande-movimento-la-pace">
                anpi.it
              </a>
            </li>
            <li id="ref36">
              ANPI — statement by Gianfranco Pagliarulo: the organisation
              condemns the invasion of Ukraine, and he offers no self-criticism
              of its own line.{" "}
              <a href="https://www.anpi.it/pagliarulo-lanpi-condanna-fermamente-linvasione-dellucraina-e-non-faccio-alcuna-autocritica">
                anpi.it
              </a>
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
