"use client";

import {
  ScrollMap,
  type Lang,
  type LegKind,
  type MapCard,
  type MapPoint,
  type MapStep,
} from "./ScrollMap";

/**
 * Карта до § 11 матеріалу «Сирійський експрес змінює курс»: квітневий конвой
 * 2026 року від виходу з трьох портів до повернення. Текст розділу переїхав
 * сюди слово в слово — у статті цих абзаців немає.
 *
 * Рушій — ScrollMap. Тут він веде плавання: позначки суден їдуть своїми
 * дорогами під прокрутку, слід за кожним пофарбований за станом його AIS
 * (синій — працює, сірий — мовчить, іржавий — бреше), а плашка показує дату.
 * Дата йде разом із судном: між двома задокументованими днями тече, а де
 * джерело дає одну дату — застигає. Кадр не рухається: усю дорогу від
 * Заполярʼя до Леванту око тримає разом.
 *
 * Геометрія одна на дві мови, текст — окремо.
 */

const GEO: Record<string, MapPoint> = {
  spb: { n: "Петербург", c: [30.3, 59.93], dy: -6 },
  kgd: { n: "Калінінград", c: [19.9, 54.65], dy: 14 },
  mmk: { n: "Мурманськ", c: [33.08, 68.97], dy: -6 },
  portugal: { n: "захід від Португалії", c: [-10.5, 39.5], side: "left" },
  gib: { n: "Гібралтар", c: [-5.35, 36.0], dy: 15, side: "left" },
  malta: { n: "пд. зх. від Мальти", c: [13.5, 35.0], dy: 15 },
  crete: { n: "південь Криту", c: [24.5, 34.4], dy: -6 },
  tartus: { n: "Тартус", c: [35.87, 34.89], dy: 13 },
  est: { n: "Естонія", c: [24.7, 59.4], dy: -6 },
};

const NAMES_EN: Record<string, string> = {
  spb: "St Petersburg",
  kgd: "Kaliningrad",
  mmk: "Murmansk",
  portugal: "west of Portugal",
  gib: "Gibraltar",
  malta: "SW of Malta",
  crete: "south of Crete",
  tartus: "Tartus",
  est: "Estonia",
};

const POINTS: Record<Lang, Record<string, MapPoint>> = {
  uk: GEO,
  en: Object.fromEntries(
    Object.entries(GEO).map(([k, v]) => [k, { ...v, n: NAMES_EN[k] ?? v.n }]),
  ),
};

const LEGS: Record<string, LegKind> = {
  // Попереду судна не малюємо нічого: дорога зʼявляється тільки як слід за
  // ним. Лінією тут лишається одне — від справжнього місця до того, яке
  // показував AIS. Це не маршрут, а брехня приладу, тож і пунктиром.
  spoofEst: "ghost",
  spoofKgd: "ghost",
};

/** Підписи, які змінюються по кроках. */
const WORDS = {
  uk: {
    spoof: "AIS показує тут",
    skobelev: "«Скобелев»",
    convoy: "конвой",
    sparta: "«Спарта»",
    after: "після 22 травня",
  },
  en: {
    spoof: "AIS says here",
    skobelev: "Skobelev",
    convoy: "the convoy",
    sparta: "Sparta",
    after: "after 22 May",
  },
};

const steps = (lang: Lang): MapStep[] => {
  const w = WORDS[lang];
  return [
    {
      points: ["spb", "kgd", "mmk"],
      legs: [],
      ships: {
        cv: { leg: "spb", f: 0.02 },
        sp: { leg: "sparta", f: 0 },
        pa: { leg: "mmk", f: 0 },
      },
      shipNames: { cv: w.skobelev },
      date: "2026-04-15",
      ais: "on",
    },
    {
      points: ["spb", "kgd", "mmk"],
      legs: [],
      // Тут стани розходяться: два вимкнули прилад, «Спарта» ще передає — і
      // саме це видно за кольором слідів.
      ships: {
        cv: { leg: "spb", f: 0.62, ais: "dark" },
        sp: { leg: "sparta", f: 0.6, ais: "on" },
        pa: { leg: "mmk", f: 0.55, ais: "dark" },
      },
      shipNames: { cv: w.skobelev },
      date: "2026-04-24",
      ais: "dark",
    },
    {
      points: ["portugal", "gib"],
      legs: [],
      // Точка збору. Усі троє доходять до неї, підписи супутників гаснуть —
      // далі це один конвой, і позначка в нього одна.
      ships: {
        cv: { leg: "spb", f: 1 },
        sp: { leg: "sparta", f: 1 },
        pa: { leg: "mmk", f: 1 },
      },
      shipNames: { cv: w.convoy, sp: "", pa: "" },
      date: "2026-04-26",
      ais: "dark",
    },
    {
      points: ["est"],
      legs: ["spoofEst"],
      names: { est: w.spoof },
      ships: { cv: { leg: "med", f: 0.3 } },
      date: "2026-05-01",
      ais: "spoof",
    },
    {
      points: ["kgd"],
      legs: ["spoofKgd"],
      drop: ["spoofEst"],
      names: { kgd: w.spoof },
      ships: { cv: { leg: "med", f: 0.52 } },
      date: "2026-05-08",
      ais: "spoof",
    },
    {
      points: ["malta", "crete"],
      legs: [],
      drop: ["spoofKgd"],
      ships: { cv: { leg: "med", f: 0.62 } },
      date: "2026-05-10",
      ais: "dark",
    },
    {
      points: ["tartus"],
      legs: [],
      ships: { cv: { leg: "med", f: 1 } },
      date: "2026-05-11",
      ais: "dark",
    },
    {
      points: ["gib", "tartus"],
      legs: [],
      // «Скобелев» тут ще в строю з «Спартою», тож окремої позначки не має —
      // але від протоки вже йде своєю дорогою й з вимкненим приладом.
      ships: {
        cv: { leg: "back", f: 0.42 },
        sk: { leg: "skHome", f: 0, ais: "dark", hide: true },
      },
      date: "2026-05-22",
      ais: "on",
    },
    {
      points: ["kgd", "spb"],
      legs: [],
      // За протокою дороги розходяться, і прилади теж: «Спарта» лишила сигнал,
      // «Скобелев» вимкнув його знову.
      ships: {
        cv: { leg: "back", f: 1, ais: "on" },
        sk: { leg: "skHome", f: 1, ais: "dark" },
      },
      shipNames: { cv: w.sparta },
      dateLabel: w.after,
      ais: "on",
    },
    {
      points: ["kgd", "spb", "tartus"],
      legs: [],
      ships: {
        cv: { leg: "back", f: 1 },
        sk: { leg: "skHome", f: 1 },
      },
      shipNames: { cv: w.sparta },
      ais: "on",
    },
  ];
};

const STEPS: Record<Lang, MapStep[]> = { uk: steps("uk"), en: steps("en") };

// Судна карти. Кожне лишає за собою слід зі станом свого приладу; main — те,
// чий стан показує плашка з датою. «Спарта» й «Пашин» ідуть своїми дорогами
// до точки збору, «Скобелев» вертається окремою — у Петербург.
const VOYAGES: Record<
  Lang,
  Record<string, { path: string[]; label: string; main?: boolean }>
> = {
  uk: {
    cv: { path: ["spb", "med", "back"], label: "конвой", main: true },
    sp: { path: ["sparta"], label: "«Спарта»" },
    pa: { path: ["mmk"], label: "«Пашин»" },
    sk: { path: ["skHome"], label: "«Скобелев»" },
  },
  en: {
    cv: { path: ["spb", "med", "back"], label: "the convoy", main: true },
    sp: { path: ["sparta"], label: "Sparta" },
    pa: { path: ["mmk"], label: "Pashin" },
    sk: { path: ["skHome"], label: "Skobelev" },
  },
};

// Текст карток — це текст § 11 без переказу: речення ті самі, що були в
// статті, розрізані по датах. Заголовки — навігаційні мітки, не твердження.
const CARDS: Record<Lang, MapCard[]> = {
  uk: [
    {
      h: "Три порти, три дати",
      p: (
        <>
          У квітні 2026 року з трьох різних портів вийшли три судна: танкер
          нафтопродуктів «Генерал Скобелев» із Петербурга 15 квітня, ролкер
          «Спарта» з Калінінграда 18-го, танкер постачання «Академик Пашин» із
          Мурманська 23-го. Заявлений порт призначення — єгипетський Порт-Саїд.
          У Балтиці конвой вели кораблі НАТО, у Ла-Манші — нідерландський{" "}
          <em>Galatea</em> і британський RFA <em>Tideforce</em>.
        </>
      ),
      refs: [3],
    },
    {
      h: "Приховування маршруту",
      p: (
        <>
          Далі почалося приховування маршруту. «Генерал Скобелев» і «Академик
          Пашин» вимкнули AIS близько 24 квітня, «Спарта» — після 26-го.
        </>
      ),
      refs: [3],
    },
    {
      h: "Захід від Португалії",
      p: (
        <>
          26 квітня супутник зафіксував усі чотири судна на захід від Португалії
          у щільному строю. На проході Гібралтару конвой ненадовго зʼявився на
          трекерах і знову зник. А потім трекери показали те, чого не могло
          бути:
        </>
      ),
      refs: [3],
    },
    {
      h: "Естонія",
      p: (
        <>
          <b>1 травня, 13:36 UTC</b> — AIS «Генерала Скобелева» показує його
          біля Естонії, за тисячі миль від фактичного місця.
        </>
      ),
      refs: [3],
    },
    {
      h: "Калінінград",
      p: (
        <>
          <b>8 травня</b> — AIS «Спарти» показує її в Калінінграді зі швидкістю{" "}
          <b>49,8 вузла</b>. Для судна такого розміру це фізично неможливо.
        </>
      ),
      refs: [3],
    },
    {
      h: "Південний захід від Мальти",
      p: (
        <>
          10 травня супутник зняв усі чотири судна на південний захід від
          Мальти, курсом на схід. Далі — південне узбережжя Криту, а «Касатонов»
          працював на північ від Тартуса.
        </>
      ),
      refs: [3],
    },
    {
      h: "Тартус",
      p: (
        <>
          Перше підтверджене зображення конвою в Тартусі датоване{" "}
          <b>11 травня</b>. На знімках 13 травня біля причалу стоять «Спарта»,
          «Генерал Скобелев», «Академик Пашин», танкер «Ельня» і балкер «Аксон
          Серин». Порт-Саїд у заявці був прикриттям.
        </>
      ),
      refs: [3],
    },
    {
      h: "Назад",
      p: (
        <>
          Через одинадцять днів конвой пішов назад. 22 травня «Спарта» ввімкнула
          AIS о 05:29 UTC, «Генерал Скобелев» — о 05:30; обидва проходили
          Гібралтар на захід під ескортом корвета проєкту 20380 і танкера
          «Ельня».
        </>
      ),
      refs: [3],
    },
    {
      h: "За протокою",
      p: (
        <>
          За протокою «Спарта» лишила сигнал увімкненим і пішла в Калінінград,
          «Генерал Скобелев» вимкнув його знову й пішов у Петербург. Той самий
          західний прохід із Тартуса незалежно зафіксували італійські трекери.
        </>
      ),
      refs: [3, 25],
    },
    {
      h: "Що тут нового",
      p: (
        <>
          Кожен із цих прийомів відомий окремо: мовчання в ефірі, підміна
          координат, часткова зміна маршруту. Разом в одному переході суден
          «сирійського експресу» їх до того не бачили — раніше росіяни
          обмежувалися вимкненням AIS поблизу Тартуса.
        </>
      ),
      refs: [3],
    },
  ],
  en: [
    {
      h: "Three ports, three dates",
      p: (
        <>
          In April 2026 three ships left three different ports: the products
          tanker General Skobelev from St Petersburg on 15 April, the ro-ro
          Sparta from Kaliningrad on the 18th, the replenishment tanker Akademik
          Pashin from Murmansk on the 23rd. The declared destination was Port
          Said in Egypt. NATO ships shadowed the convoy in the Baltic; in the
          Channel it was the Dutch <em>Galatea</em> and the British RFA{" "}
          <em>Tideforce</em>.
        </>
      ),
      refs: [3],
    },
    {
      h: "Hiding the route",
      p: (
        <>
          Then the hiding of the route began. General Skobelev and Akademik
          Pashin switched off AIS around 24 April, Sparta after the 26th.
        </>
      ),
      refs: [3],
    },
    {
      h: "West of Portugal",
      p: (
        <>
          On 26 April a satellite caught all four ships west of Portugal in
          tight formation. Passing Gibraltar the convoy surfaced briefly on the
          trackers and disappeared again. And then the trackers showed something
          that could not be:
        </>
      ),
      refs: [3],
    },
    {
      h: "Estonia",
      p: (
        <>
          <b>1 May, 13:36 UTC</b> — the AIS of General Skobelev puts her off
          Estonia, thousands of miles from where she actually was.
        </>
      ),
      refs: [3],
    },
    {
      h: "Kaliningrad",
      p: (
        <>
          <b>8 May</b> — the AIS of Sparta puts her in Kaliningrad, doing{" "}
          <b>49.8 knots</b>. For a ship that size this is physically impossible.
        </>
      ),
      refs: [3],
    },
    {
      h: "South-west of Malta",
      p: (
        <>
          On 10 May a satellite caught all four ships south-west of Malta,
          heading east. Then the southern coast of Crete, while Kasatonov worked
          north of Tartus.
        </>
      ),
      refs: [3],
    },
    {
      h: "Tartus",
      p: (
        <>
          The first confirmed image of the convoy at Tartus is dated{" "}
          <b>11 May</b>. In imagery from 13 May, Sparta, General Skobelev,
          Akademik Pashin, the tanker Yelnya and the bulk carrier Akson Serin
          stand at the pier. Port Said in the filing was cover.
        </>
      ),
      refs: [3],
    },
    {
      h: "Back",
      p: (
        <>
          Eleven days later the convoy sailed back. On 22 May Sparta switched
          AIS on at 05:29 UTC, General Skobelev at 05:30; both passed Gibraltar
          westbound under escort by a Project 20380 corvette and the tanker
          Yelnya.
        </>
      ),
      refs: [3],
    },
    {
      h: "Past the strait",
      p: (
        <>
          Past the strait Sparta kept the signal on and went to Kaliningrad;
          General Skobelev switched his off again and went to St Petersburg.
          Italian trackers independently recorded the same westbound passage
          from Tartus.
        </>
      ),
      refs: [3, 25],
    },
    {
      h: "What is new here",
      p: (
        <>
          Each of these tricks is known on its own: radio silence, position
          spoofing, a partial change of route. Together, in a single passage by
          Syrian Express ships, they had not been seen before — until then the
          Russians had limited themselves to switching AIS off near Tartus.
        </>
      ),
      refs: [3],
    },
  ],
};

const LABEL: Record<Lang, string> = {
  uk: "Карта квітневого конвою 2026 року: вихід із Петербурга, Калінінграда й Мурманська, спільний перехід у Тартус із вимкненим AIS, дві підміни координат і повернення через Гібралтар",
  en: "Map of the April 2026 convoy: departures from St Petersburg, Kaliningrad and Murmansk, the joint passage to Tartus with AIS switched off, two position spoofs and the return through Gibraltar",
};

export function AisConvoyMap({ lang = "uk" }: { lang?: Lang }) {
  return (
    <ScrollMap
      dataUrl="/articles/syriyskyi-ekspres/ais-convoy-map.json"
      baseBox={[
        [-14, 32],
        [38, 70],
      ]}
      points={POINTS[lang]}
      legs={LEGS}
      steps={STEPS[lang]}
      cards={CARDS[lang]}
      voyages={VOYAGES[lang]}
      fixedFrame
      pinned
      tall
      pad={0.06}
      lang={lang}
      label={LABEL[lang]}
    />
  );
}

export default AisConvoyMap;
