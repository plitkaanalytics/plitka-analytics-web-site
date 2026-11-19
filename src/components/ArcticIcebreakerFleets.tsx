/**
 * Криголамні флоти Росії, США й Китаю: що є зараз і що прийде до 2034 року.
 * Розкладка — варіант редактора з Claude Design (19.11.2026), перенесений як є,
 * шрифт замінено на шрифт сайту.
 *
 * Суцільна фігура — у строю, контур — будується або замовлений, бліда
 * перекреслена — спишуть, пунктир — строк, який обіцяли раніше.
 *
 * Числа — docs/dossiers/arktychnyi-korydor/notes.md:
 * Росія 45, з них 8 атомних, Китай 3 [134]; «Чукотка» 2027 [6];
 * «Лідер» 2027 за планом 2020 року [31] → 2030 [32]; списання «Таймира» 2030,
 * «Вайгача» 2031, «Ямала» 2033 [29]; США 3 полярні, Rauma до 2, перший 2028,
 * Bollinger до 4, перший 2029 [37] (строків для решти немає, тому «без дати»);
 * Davie 5 у 2032–2034, разом 11 [38]; китайський атомний без строку [38].
 */

const ARIA_UK =
  "Криголамні флоти. Росія: 45 криголамів, з них 8 атомних; у 2027 році додасться «Чукотка»; «Лідер», якого обіцяли на 2027 рік, тепер обіцяють на 2030-й; «Таймир», «Вайгач» і «Ямал» спишуть у 2030, 2031 і 2033 роках. США: 3 полярні криголами; перший від Rauma у 2028 році, перший від Bollinger у 2029-му, п'ять від Davie у 2032–2034 роках, ще один Rauma і три Bollinger без дати, разом 11 нових. Китай: 3 полярні криголами, атомний будується, строку немає.";

const ARIA_EN =
  "Icebreaker fleets. Russia: 45 icebreakers, 8 of them nuclear; Chukotka joins in 2027; Lider, promised for 2027, is now promised for 2030; Taymyr, Vaygach and Yamal are to be retired in 2030, 2031 and 2033. US: 3 polar icebreakers; the first from Rauma in 2028, the first from Bollinger in 2029, five from Davie in 2032–2034, one more Rauma and three more Bollinger with no date, 11 new ones in total. China: 3 polar icebreakers, a nuclear one is under construction with no date.";

const T = {
  uk: {
    active: "у строю",
    building: "будується або замовлений",
    retiring: "спишуть",
    promised: "обіцяний раніше строк",
    now: "зараз",
    nodate: "без дати",
    ru: "Росія",
    ruSub: "45 криголамів, з них 8 атомних",
    us: "США",
    usSub: "Берегова охорона: 3 полярні криголами, разом 11 нових",
    cn: "Китай",
    cnSub: "3 полярні криголами",
    nonNuclear: "і 37 неатомних",
    chukotka: "«Чукотка»",
    taymyr: "«Таймир»",
    vaygach: "«Вайгач»",
    yamal: "«Ямал»",
    promised2027: "обіцяли на 2027",
    lider: "«Лідер»",
    ps1: "Polar Star —",
    ps2: "у строю з 1976",
    of2: "1-й із 2",
    of4: "1-й із 4",
    davie: "Davie: 5 у 2032–2034",
    moreRauma: "ще 1 Rauma",
    moreBoll: "ще 3 Bollinger",
    nuclear: "атомний",
  },
  en: {
    active: "in service",
    building: "building or ordered",
    retiring: "retiring",
    promised: "earlier promise",
    now: "now",
    nodate: "no date",
    ru: "Russia",
    ruSub: "45 icebreakers, 8 of them nuclear",
    us: "US",
    usSub: "Coast Guard: 3 polar icebreakers, 11 new ones planned",
    cn: "China",
    cnSub: "3 polar icebreakers",
    nonNuclear: "plus 37 non-nuclear",
    chukotka: "Chukotka",
    taymyr: "Taymyr",
    vaygach: "Vaygach",
    yamal: "Yamal",
    promised2027: "promised for 2027",
    lider: "Lider",
    ps1: "Polar Star,",
    ps2: "in service since 1976",
    of2: "1st of 2",
    of4: "1st of 4",
    davie: "Davie: 5 in 2032–2034",
    moreRauma: "1 more Rauma",
    moreBoll: "3 more Bollinger",
    nuclear: "nuclear",
  },
};

export default function ArcticIcebreakerFleets({
  lang = "uk",
}: {
  lang?: "uk" | "en";
}) {
  const t = T[lang];
  return (
    <svg
      viewBox="0 0 680 425"
      width="100%"
      role="img"
      aria-label={lang === "en" ? ARIA_EN : ARIA_UK}
      style={{ display: "block", fontFamily: "var(--sans)" }}
    >
      <g style={{ stroke: "#d7dee5", strokeWidth: "1px" }}>
        <line x1="116" y1="54" x2="116" y2="410" />
        <line x1="175" y1="54" x2="175" y2="410" />
        <line x1="234" y1="54" x2="234" y2="410" />
        <line x1="293" y1="54" x2="293" y2="410" />
        <line x1="352" y1="54" x2="352" y2="410" />
        <line x1="411" y1="54" x2="411" y2="410" />
        <line x1="470" y1="54" x2="470" y2="410" />
        <line x1="529" y1="54" x2="529" y2="410" />
        <line x1="588" y1="54" x2="588" y2="410" />
        <line x1="12" y1="82" x2="668" y2="82" />
        <line x1="12" y1="212" x2="668" y2="212" />
        <line x1="12" y1="322" x2="668" y2="322" />
      </g>

      <g style={{ fontSize: "13px", fill: "#585858" }}>
        <svg width="23" height="14" x="12" y="17" style={{ fill: "#2a2a2a" }}>
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <text x="40" y="28">
          {t.active}
        </text>
        <svg
          width="23"
          height="14"
          x="112"
          y="17"
          style={{ fill: "none", stroke: "#2a2a2a", strokeWidth: "1.5px" }}
        >
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <text x="140" y="28">
          {t.building}
        </text>
        <svg
          width="23"
          height="14"
          x="325"
          y="17"
          style={{ fill: "#2a2a2a", fillOpacity: "0.3" }}
        >
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <line
          x1="324"
          y1="31"
          x2="348"
          y2="16"
          style={{ stroke: "#2a2a2a", strokeWidth: "1.5px" }}
        />
        <text x="353" y="28">
          {t.retiring}
        </text>
        <svg
          width="23"
          height="14"
          x="428"
          y="17"
          style={{
            fill: "none",
            stroke: "#2a2a2a",
            strokeWidth: "1.5px",
            strokeDasharray: "2.5 2",
          }}
        >
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <text x="456" y="28">
          {t.promised}
        </text>
      </g>

      <g style={{ fontSize: "13px", fill: "#585858", textAnchor: "middle" }}>
        <text
          x="14"
          y="72"
          style={{ textAnchor: "start", fontWeight: "600", fill: "#2a2a2a" }}
        >
          {t.now}
        </text>
        <text x="145.5" y="72">
          2027
        </text>
        <text x="204.5" y="72">
          2028
        </text>
        <text x="263.5" y="72">
          2029
        </text>
        <text x="322.5" y="72">
          2030
        </text>
        <text x="381.5" y="72">
          2031
        </text>
        <text x="440.5" y="72">
          2032
        </text>
        <text x="499.5" y="72">
          2033
        </text>
        <text x="558.5" y="72">
          2034
        </text>
        <text x="628" y="72">
          {t.nodate}
        </text>
      </g>

      <g
        style={{
          stroke: "#fafaf7",
          strokeWidth: "4px",
          strokeLinejoin: "round",
          paintOrder: "stroke",
          fontSize: "13px",
          fill: "#2a2a2a",
        }}
      >
        <text x="12" y="108">
          <tspan
            style={{ fontSize: "15px", fontWeight: "700", fill: "#f24c06" }}
          >
            {t.ru}
          </tspan>
          <tspan dx="8" style={{ fill: "#585858" }}>
            {t.ruSub}
          </tspan>
        </text>
        <text x="12" y="236">
          <tspan
            style={{ fontSize: "15px", fontWeight: "700", fill: "#1680e2" }}
          >
            {t.us}
          </tspan>
          <tspan dx="8" style={{ fill: "#585858" }}>
            {t.usSub}
          </tspan>
        </text>
        <text x="12" y="346">
          <tspan
            style={{ fontSize: "15px", fontWeight: "700", fill: "#898270" }}
          >
            {t.cn}
          </tspan>
          <tspan dx="8" style={{ fill: "#585858" }}>
            {t.cnSub}
          </tspan>
        </text>
      </g>

      <g style={{ fill: "#f24c06" }}>
        <svg width="23" height="14" x="14" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="38" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="62" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="86" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="14" y="140">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="38" y="140">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="62" y="140">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="86" y="140">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
      </g>
      <svg
        width="23"
        height="14"
        x="134.5"
        y="122"
        style={{ fill: "#fafaf7", stroke: "#f24c06", strokeWidth: "1.5px" }}
      >
        <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
      </svg>
      <g style={{ fill: "#f24c06", fillOpacity: "0.3" }}>
        <svg width="23" height="14" x="311.5" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="370.5" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="488.5" y="122">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
      </g>
      <g style={{ stroke: "#f24c06", strokeWidth: "1.5px" }}>
        <line x1="310.5" y1="136" x2="334.5" y2="121" />
        <line x1="369.5" y1="136" x2="393.5" y2="121" />
        <line x1="487.5" y1="136" x2="511.5" y2="121" />
      </g>
      <svg
        width="23"
        height="14"
        x="134.5"
        y="170"
        style={{
          fill: "none",
          stroke: "#f24c06",
          strokeWidth: "1.5px",
          strokeDasharray: "2.5 2",
        }}
      >
        <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
      </svg>
      <line
        x1="161"
        y1="176.5"
        x2="301"
        y2="176.5"
        style={{ stroke: "#f24c06", strokeWidth: "1.5px" }}
      />
      <polygon points="308,176.5 300,172 300,181" style={{ fill: "#f24c06" }} />
      <svg
        width="23"
        height="14"
        x="311.5"
        y="170"
        style={{ fill: "#fafaf7", stroke: "#f24c06", strokeWidth: "1.5px" }}
      >
        <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
      </svg>

      <g style={{ fill: "#1680e2" }}>
        <svg width="23" height="14" x="14" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="38" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="62" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
      </g>
      <g style={{ fill: "#fafaf7", stroke: "#1680e2", strokeWidth: "1.5px" }}>
        <svg width="23" height="14" x="193.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="252.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="428.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="458.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="488.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="518.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="548.5" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="603" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="629" y="250">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="603" y="267">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="629" y="267">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
      </g>
      <path
        d="M416 266 V271 H583 V266"
        style={{ fill: "none", stroke: "#1680e2", strokeWidth: "1px" }}
      />

      <g style={{ fill: "#898270" }}>
        <svg width="23" height="14" x="14" y="360">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="38" y="360">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
        <svg width="23" height="14" x="62" y="360">
          <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
        </svg>
      </g>
      <svg
        width="23"
        height="14"
        x="617"
        y="360"
        style={{ fill: "#fafaf7", stroke: "#898270", strokeWidth: "1.5px" }}
      >
        <path d="M0.75 6.5 H7 V1 H13 V6.5 H21.25 L18 12.25 H2 Z" />
      </svg>

      <g
        style={{
          stroke: "#fafaf7",
          strokeWidth: "4px",
          strokeLinejoin: "round",
          paintOrder: "stroke",
          fontSize: "13px",
          fill: "#2a2a2a",
          textAnchor: "middle",
        }}
      >
        <text x="14" y="172" style={{ textAnchor: "start", fill: "#585858" }}>
          {t.nonNuclear}
        </text>
        <text x="145.5" y="151" style={{ letterSpacing: "-0.3px" }}>
          {t.chukotka}
        </text>
        <text x="322.5" y="151" style={{ fill: "#585858" }}>
          {t.taymyr}
        </text>
        <text x="381.5" y="167" style={{ fill: "#585858" }}>
          {t.vaygach}
        </text>
        <text x="499.5" y="151" style={{ fill: "#585858" }}>
          {t.yamal}
        </text>
        <text x="234" y="166" style={{ fill: "#585858" }}>
          {t.promised2027}
        </text>
        <text x="322.5" y="199" style={{ fontWeight: "600" }}>
          {t.lider}
        </text>

        <text x="14" y="285" style={{ textAnchor: "start", fill: "#585858" }}>
          {t.ps1}
        </text>
        <text x="14" y="301" style={{ textAnchor: "start", fill: "#585858" }}>
          {t.ps2}
        </text>
        <text x="204.5" y="285">
          Rauma
        </text>
        <text x="204.5" y="301" style={{ fill: "#585858" }}>
          {t.of2}
        </text>
        <text x="263.5" y="285">
          Bollinger
        </text>
        <text x="263.5" y="301" style={{ fill: "#585858" }}>
          {t.of4}
        </text>
        <text x="499.5" y="289">
          {t.davie}
        </text>
        <text x="668" y="299" style={{ textAnchor: "end", fill: "#585858" }}>
          {t.moreRauma}
        </text>
        <text x="668" y="315" style={{ textAnchor: "end", fill: "#585858" }}>
          {t.moreBoll}
        </text>

        <text x="628" y="389" style={{ fill: "#585858" }}>
          {t.nuclear}
        </text>
      </g>
    </svg>
  );
}
