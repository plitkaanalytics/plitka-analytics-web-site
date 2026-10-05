"use client";

import "./InterdictionsMap.css";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Карта затримань суден тіньового флоту 2025–2026 для статті peremykach-ais.
 *
 * Два постійні вікна, Кариби ліворуч і Європа праворуч, бо світ цілком у
 * колонку не влазить, а перелітати кадром між ними під прокрутку гірше:
 * події в різних морях ідуть упереміш, і кадр метався б туди-сюди. Ісландія
 * й Індійський океан спливають маленькими вікнами в кутах європейського,
 * коли там стається перша подія: випадків там кілька, постійне місце їм ні
 * до чого. Прокрутка гортає час: точка з'являється, коли дата доходить до
 * затримання.
 *
 * Рядка з подробицями під картою свідомо немає: він змінювався на кожну
 * подію й мерехтів. Подробиці є в підказці на точці й у таблиці.
 *
 * Суходіл готує scripts/build-interdictions-map.mjs. Координати тут
 * приблизні — «десь у цьому морі», так і задумано: джерела здебільшого
 * точного місця не дають. Де місця немає зовсім, це сказано в підказці.
 *
 * Джерела даних стоять у підписі під картою на сторінці статті, а не тут:
 * перенумерація покликань компонентів не бачить.
 */

type Win = "eu" | "car" | "isl" | "ind";
type Actor = "us" | "eu" | "mission" | "in";
type Kind = "seized" | "boarded" | "attempt";

interface Ev {
  date: string;
  name: string;
  actor: Actor;
  who: string;
  kind: Kind;
  where: string;
  win: Win;
  /** Довгота, широта — приблизно */
  c: [number, number];
  note?: string;
  /** Місця в джерелах немає, точка стоїть умовно */
  approx?: boolean;
}

const RAW: Ev[] = [
  {
    date: "2025-03-21",
    name: "Eventin",
    actor: "eu",
    who: "Німеччина",
    kind: "seized",
    where: "Балтійське море, біля Рюгена",
    win: "eu",
    c: [13.8, 54.7],
    note: "Втратив хід і дрейфував у німецькі води; митниця конфіскувала вантаж",
  },
  {
    date: "2025-04-11",
    name: "Kiwala",
    actor: "eu",
    who: "Естонія",
    kind: "seized",
    where: "Фінська затока",
    win: "eu",
    c: [24.2, 59.7],
    note: "Без дійсного прапора; відпущений 28 квітня",
  },
  {
    date: "2025-05-13",
    name: "Jaguar",
    actor: "eu",
    who: "Естонія",
    kind: "attempt",
    where: "Фінська затока",
    win: "eu",
    c: [25.6, 59.9],
    note: "Відмовився змінити курс; поруч з'явився російський винищувач, танкер вивели з естонських вод",
  },
  {
    date: "2025-09-27",
    name: "Boracay",
    actor: "eu",
    who: "Франція",
    kind: "seized",
    where: "Атлантика, біля Уессана",
    win: "eu",
    c: [-5.6, 48.3],
    note: "Капітан відмовився пустити на огляд; на борту охорона Moran Security Group",
  },
  {
    date: "2025-11-20",
    name: "Seahorse",
    actor: "us",
    who: "США",
    kind: "attempt",
    where: "Карибське море",
    win: "car",
    c: [-73.0, 17.2],
    note: "Есмінець перехопив танкер, і той розвернувся на Кубу",
    approx: true,
  },
  {
    date: "2025-12-10",
    name: "Skipper",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "між Гренадою й Тринідадом",
    win: "car",
    c: [-61.9, 11.7],
    note: "Перше затримання кампанії",
  },
  {
    date: "2025-12-20",
    name: "Centuries",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "біля Венесуели",
    win: "car",
    c: [-65.5, 12.4],
  },
  {
    date: "2025-12-20",
    name: "Bella 1",
    actor: "us",
    who: "США",
    kind: "attempt",
    where: "біля Венесуели",
    win: "car",
    c: [-67.8, 12.9],
    note: "Екіпаж не пустив на борт, танкер утік в Атлантику",
  },
  {
    date: "2025-12-31",
    name: "Fitburg",
    actor: "eu",
    who: "Фінляндія",
    kind: "seized",
    where: "Фінська затока",
    win: "eu",
    c: [25.9, 60.05],
    note: "Вантажне судно; підозра в пошкодженні кабелів, санкційна сталь",
  },
  {
    date: "2026-01-07",
    name: "Marinera (Bella 1)",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Атлантика, на південь від Ісландії",
    win: "isl",
    c: [-19.5, 60.6],
    note: "Під заявленим російським прапором",
  },
  {
    date: "2026-01-07",
    name: "M Sophia",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Карибське море",
    win: "car",
    c: [-70.2, 14.6],
    approx: true,
  },
  {
    date: "2026-01-09",
    name: "Olina",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Карибське море",
    win: "car",
    c: [-63.6, 13.6],
    approx: true,
  },
  {
    date: "2026-01-15",
    name: "Veronica",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Карибське море",
    win: "car",
    c: [-66.6, 14.3],
    approx: true,
  },
  {
    date: "2026-01-20",
    name: "Sagitta",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Карибське море",
    win: "car",
    c: [-68.6, 15.4],
    approx: true,
  },
  {
    date: "2026-01-22",
    name: "Grinch",
    actor: "eu",
    who: "Франція",
    kind: "seized",
    where: "море Альборан",
    win: "eu",
    c: [-3.8, 35.9],
    note: "Відпущений 17 лютого після штрафу",
  },
  {
    date: "2026-02-06",
    name: "Al Jafzia, Asphalt Star, Stellar Ruby",
    actor: "in",
    who: "Індія",
    kind: "seized",
    where: "100 миль на захід від Мумбаї",
    win: "ind",
    c: [71.2, 19.0],
    note: "Три танкери, пов'язані з Іраном",
  },
  {
    date: "2026-02-09",
    name: "Aquila II",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Індійський океан",
    win: "ind",
    c: [63.5, 6.5],
    approx: true,
  },
  {
    date: "2026-02-14",
    name: "Veronica III",
    actor: "us",
    who: "США",
    kind: "boarded",
    where: "Індійський океан",
    win: "ind",
    c: [68.5, 4.0],
    approx: true,
  },
  {
    date: "2026-02-24",
    name: "Bertha",
    actor: "us",
    who: "США",
    kind: "seized",
    where: "Індійський океан",
    win: "ind",
    c: [74.0, 6.0],
    approx: true,
  },
  {
    date: "2026-02-28",
    name: "Ethera",
    actor: "eu",
    who: "Бельгія",
    kind: "seized",
    where: "Північне море, економічна зона Бельгії",
    win: "eu",
    c: [2.6, 51.6],
    note: "Фальшивий гвінейський прапор, підроблені документи",
  },
  {
    date: "2026-03-06",
    name: "Caffa",
    actor: "eu",
    who: "Швеція",
    kind: "seized",
    where: "біля півдня Швеції",
    win: "eu",
    c: [14.4, 55.4],
    note: "Вантажне судно; фальшивий прапор, підроблений документ",
    approx: true,
  },
  {
    date: "2026-03-12",
    name: "Sea Owl I",
    actor: "eu",
    who: "Швеція",
    kind: "seized",
    where: "біля Треллеборга",
    win: "eu",
    c: [13.1, 55.25],
  },
  {
    date: "2026-03-20",
    name: "Deyna",
    actor: "eu",
    who: "Франція",
    kind: "seized",
    where: "Середземне море",
    win: "eu",
    c: [4.5, 38.0],
    note: "Фальшивий прапор Мозамбіку; відпущений 16 квітня після штрафу",
    approx: true,
  },
  {
    date: "2026-05-05",
    name: "назва не розкрита",
    actor: "mission",
    who: "місія ЄС IRINI",
    kind: "boarded",
    where: "Середземне море",
    win: "eu",
    c: [15.6, 35.3],
    note: "Перша перевірка прапора місією ЄС; дата приблизна",
    approx: true,
  },
  {
    date: "2026-05-03",
    name: "Jin Hui",
    actor: "eu",
    who: "Швеція",
    kind: "seized",
    where: "на південь від Треллеборга",
    win: "eu",
    c: [13.3, 55.05],
    note: "Фальшивий сирійський прапор",
  },
  {
    date: "2026-06-01",
    name: "Tagor",
    actor: "eu",
    who: "Франція",
    kind: "seized",
    where: "Атлантика, 740 км на захід від Бретані",
    win: "eu",
    c: [-14.0, 48.0],
  },
  {
    date: "2026-06-14",
    name: "Smyrtos",
    actor: "eu",
    who: "Велика Британія",
    kind: "seized",
    where: "Ла-Манш",
    win: "eu",
    c: [-1.2, 50.2],
    note: "Перше британське затримання",
  },
  {
    date: "2026-07-20",
    name: "South Star",
    actor: "mission",
    who: "місія ЄС IRINI",
    kind: "boarded",
    where: "захід Середземного моря",
    win: "eu",
    c: [6.0, 37.6],
    note: "Перевірка прапора",
  },
  {
    date: "2026-08-02",
    name: "Toa Payoh",
    actor: "mission",
    who: "місія ЄС IRINI, Італія",
    kind: "boarded",
    where: "на захід від Пантеллерії",
    win: "eu",
    c: [11.0, 36.95],
    note: "Перевірка прапора",
  },
  {
    date: "2026-08-30",
    name: "Sun",
    actor: "mission",
    who: "місія ЄС IRINI, Італія",
    kind: "boarded",
    where: "на захід від Пантеллерії",
    win: "eu",
    c: [11.5, 36.6],
    note: "Перевірка прапора",
  },
];
const EVENTS = [...RAW].sort((a, b) => a.date.localeCompare(b.date));

const START = Date.parse("2025-01-01");
const END = Date.parse("2026-09-30");

const ACTORS: { key: Actor; label: string; color: string }[] = [
  { key: "us", label: "США", color: "#2a6db0" },
  { key: "eu", label: "Європейські держави", color: "#f24c06" },
  { key: "mission", label: "Місія ЄС", color: "#8c2d04" },
  { key: "in", label: "Індія", color: "#2f8f6f" },
];
const COLOR = Object.fromEntries(ACTORS.map((a) => [a.key, a.color])) as Record<
  Actor,
  string
>;

const KIND: Record<Kind, string> = {
  seized: "затримання",
  boarded: "огляд на борту",
  attempt: "невдала спроба",
};

const MAIN: { key: Win; title: string }[] = [
  { key: "car", title: "Карибське море" },
  { key: "eu", title: "Європа" },
];
/** Спливні вікна в кутах європейського */
const POPUPS: { key: Win; title: string; corner: "tl" | "br" }[] = [
  { key: "isl", title: "Біля Ісландії", corner: "tl" },
  { key: "ind", title: "Індійський океан", corner: "br" },
];
/** Коли у вікні стається перша подія — тоді воно й спливає */
const FIRST = {} as Record<Win, number>;
for (const e of RAW) {
  const d = Date.parse(e.date);
  if (!(e.win in FIRST) || d < FIRST[e.win]) FIRST[e.win] = d;
}

const MONTHS_NOM = [
  "січень",
  "лютий",
  "березень",
  "квітень",
  "травень",
  "червень",
  "липень",
  "серпень",
  "вересень",
  "жовтень",
  "листопад",
  "грудень",
];
const MONTHS_GEN = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

/** 1 затримання, 2 затримання, 5 затримань */
function plural(n: number, one: string, few: string, many: string) {
  const d = n % 10,
    h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
}

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_GEN[m - 1]} ${y}`;
}

interface Inset {
  box: [number, number, number, number];
  w: number;
  h: number;
  d: string;
}

const RAD = Math.PI / 180;
const psi = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));
function project(inset: Inset, [lon, lat]: [number, number]) {
  const [west, south, east, north] = inset.box;
  return [
    ((lon - west) / (east - west)) * inset.w,
    ((psi(north) - psi(lat)) / (psi(north) - psi(south))) * inset.h,
  ];
}

export default function InterdictionsMap({
  caption,
}: {
  caption?: React.ReactNode;
}) {
  const [insets, setInsets] = useState<Record<Win, Inset> | null>(null);
  const [failed, setFailed] = useState(false);
  // До гідратації й без JS показуємо все: кінцевий стан і є змістом карти.
  const [t, setT] = useState(END);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/maps/peremykach-ais/insets.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setInsets)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 1;
      setT(START + p * (END - START));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shown = useMemo(
    () => EVENTS.filter((e) => Date.parse(e.date) <= t),
    [t],
  );
  const now = new Date(t);
  const count = (y: string) =>
    shown.filter((e) => e.date.startsWith(y) && e.kind !== "attempt").length;
  const attempts = shown.filter((e) => e.kind === "attempt").length;

  const map = (key: Win, title: string, k = 1) => {
    const inset = insets?.[key];
    if (!inset)
      return (
        <div className="imap__ph">{failed ? "Карту не завантажено" : ""}</div>
      );
    return (
      <svg viewBox={`0 0 ${inset.w} ${inset.h}`} role="img" aria-label={title}>
        <path d={inset.d} className="imap__land" />
        {EVENTS.map((e, i) => {
          if (e.win !== key) return null;
          const on = Date.parse(e.date) <= t;
          const [x, y] = project(inset, e.c);
          const col = COLOR[e.actor];
          const label = `${fmtDate(e.date)} · ${e.name} · ${e.who} · ${KIND[e.kind]} · ${e.where}`;
          return (
            <g
              key={i}
              className={`imap__pt${on ? " is-on" : ""}${e.date.startsWith("2025") ? " is-old" : ""}`}
              transform={`translate(${x} ${y})`}
              tabIndex={on ? 0 : -1}
              aria-label={label}
            >
              <title>{label}</title>
              <circle r={12 * k} className="imap__hit" />
              {e.kind === "attempt" ? (
                <circle
                  r={5.5 * k}
                  fill="var(--paper)"
                  stroke={col}
                  strokeWidth={2.4 * k}
                />
              ) : (
                <circle
                  r={6 * k}
                  fill={col}
                  stroke="var(--paper)"
                  strokeWidth={2 * k}
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <figure
      className="imap fig--bleed"
      aria-label="Карта затримань і спроб затримання суден тіньового флоту у 2025–2026 роках"
    >
      <div className="imap__track" ref={track}>
        <div className="imap__sticky">
          <div className="imap__head">
            <div className="imap__date" aria-live="polite">
              {MONTHS_NOM[now.getMonth()]}
            </div>
            <div className="imap__counts">
              <span>
                <b>{count("2025")}</b>
                {plural(
                  count("2025"),
                  "затримання",
                  "затримання",
                  "затримань",
                )}{" "}
                у 2025
              </span>
              <span>
                <b>{count("2026")}</b>
                {plural(
                  count("2026"),
                  "затримання",
                  "затримання",
                  "затримань",
                )}{" "}
                у 2026
              </span>
              <span>
                <b>{attempts}</b>
                {plural(
                  attempts,
                  "невдала спроба",
                  "невдалі спроби",
                  "невдалих спроб",
                )}
              </span>
            </div>
          </div>

          <div className="imap__grid">
            {MAIN.map(({ key, title }) => (
              <div className={`imap__win imap__win--${key}`} key={key}>
                <div className="imap__wtitle">{title}</div>
                {map(key, title)}
                {key === "eu" &&
                  POPUPS.map((pop) => (
                    <div
                      key={pop.key}
                      className={`imap__pop imap__pop--${pop.corner}${t >= FIRST[pop.key] ? " is-on" : ""}`}
                    >
                      <div className="imap__wtitle">{pop.title}</div>
                      {map(pop.key, pop.title, 1.7)}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <ul className="imap__legend">
            {ACTORS.map((a) => (
              <li key={a.key}>
                <svg width="14" height="14" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" fill={a.color} />
                </svg>
                {a.label}
              </li>
            ))}
            <li>
              <svg width="14" height="14" aria-hidden="true">
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
              </svg>
              невдала спроба
            </li>
            <li>
              <svg width="14" height="14" aria-hidden="true">
                <circle cx="7" cy="7" r="6" fill="var(--ink)" opacity="0.4" />
              </svg>
              2025 рік
            </li>
          </ul>
        </div>
      </div>

      {caption && <figcaption>{caption}</figcaption>}

      <details className="imap__table">
        <summary>Усі випадки таблицею</summary>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Судно</th>
              <th>Хто</th>
              <th>Що сталося</th>
              <th>Де</th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((e, i) => (
              <tr key={i}>
                <td>{fmtDate(e.date)}</td>
                <td>{e.name}</td>
                <td>{e.who}</td>
                <td>
                  {KIND[e.kind]}
                  {e.note ? `. ${e.note}` : ""}
                </td>
                <td>
                  {e.where}
                  {e.approx ? " (місце приблизне)" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
