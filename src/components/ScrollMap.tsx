"use client";

import { useEffect, useRef } from "react";

/**
 * Прокрутна карта: полотно прибите до верху екрана, картки з текстом їдуть
 * поверх нього, кадр перелітає до тієї, що зараз проти очей. Дані й картки
 * приходять пропсами — самі карти лежать в обгортках (TartusMap,
 * NorthRoutesMap), тут тільки рушій.
 *
 * Геометрію готує scripts/build-map-region.mjs із Natural Earth 1:50m: лишає
 * той шматок світу, який карта здатна показати, і спрощує його по зонах.
 * Ані d3, ані topojson сторінка не тягне — усе, що звідти потрібно
 * (проєкція Меркатора, підбір кадру, переліт між кадрами), лежить нижче.
 */

export type Pt = [number, number];

export interface MapPoint {
  /** Підпис на карті */
  n: string;
  /** Довгота, широта */
  c: Pt;
  /** Зсув підпису по вертикалі, коли точки стоять поруч */
  dy?: number;
  /** Підпис завжди ліворуч від точки — біля лівого краю кадру */
  side?: "left";
}

export type LegKind = "sea" | "escort" | "air" | "past" | "ghost";

export interface MapStep {
  points: string[];
  legs: string[];
  /** Лінії, які на цьому кроці мають зникнути зовсім, а не притухнути */
  drop?: string[];
  /** Інші підписи для точок на цьому кроці */
  names?: Record<string, string>;
  /** Де на цьому кроці кожне судно. Кого в записі немає — той з карти
   *  зникає: поки конвой не зібрався, суден три, далі одне. */
  ships?: Record<string, ShipAt>;
  /** Дата кроку в ISO. Між двома такими датами плашка тече день за днем,
   *  а там, де джерело дає одну дату на кілька карток, застигає сама собою. */
  date?: string;
  /** Коли точної дати немає: «після 22 травня». Не інтерполюється. */
  dateLabel?: string;
  /** Що робив AIS на відрізку від цього кроку до наступного */
  ais?: AisState;
  /** Інші підписи під позначками на цьому кроці */
  shipNames?: Record<string, string>;
}

export type AisState = "on" | "dark" | "spoof";

/** Де судно на цьому кроці: частка f уздовж лега leg зі шляху voyage.path.
 *  Задавати частку саме лега, а не всієї дороги, — єдиний спосіб писати це
 *  руками: «десь посеред Ла-Маншу» видно, «0.38 усього переходу» — ні. */
export interface ShipAt {
  leg: string;
  f: number;
  /** Що робив прилад саме цього судна на відрізку до наступного кроку. Коли
   *  не задано — беремо стан кроку: «два вимкнули, третє ще передавало» без
   *  цього не намалюєш. */
  ais?: AisState;
  /** Місце задано, а позначки нема: судно ще в тому самому строю, що й
   *  сусіднє, і дві стрілки в одній точці нічого не додають — але слід за
   *  ним звідси вже росте. */
  hide?: boolean;
}

/** Одне судно на карті: своя дорога, свій підпис. Слід за собою лишає кожне,
 *  а main означає лише те, чий стан приладу показує плашка з датою. */
export interface VoyageDef {
  path: string[];
  label: string;
  main?: boolean;
}

export interface MapCard {
  h: string;
  p: React.ReactNode;
  /** Цитата з атрибуцією — коли картка несе пряму мову */
  quote?: { text: React.ReactNode; cite: React.ReactNode };
  /** Подробиці, яких не показати на карті: умови, цифри, дати */
  grid?: { k: string; v: React.ReactNode }[];
  /** Номери зі списку джерел статті */
  refs: number[];
}

export interface ScrollMapProps {
  dataUrl: string;
  /** Прямокутник, у який вписано базовий кадр: [[зх, пд], [сх, пн]] */
  baseBox: [Pt, Pt];
  points: Record<string, MapPoint>;
  legs: Record<string, LegKind>;
  steps: MapStep[];
  cards: MapCard[];
  /** Опис карти для тих, хто не бачить */
  label: string;
  /** Поле навколо вмісту кадру, частка полотна. Менше — для високих
   *  маршрутів, які інакше змушують карту відходити на пів світу. */
  pad?: number;
  /** Вище полотно: те саме, для високих маршрутів. */
  tall?: boolean;
  /** Судна карти. Позначки їдуть своїми дорогами під прокрутку, а слід за
   *  тим, у якого trail, показує, що в цей час робив AIS. */
  voyages?: Record<string, VoyageDef>;
  /** Не рухати кадр між картками: карта стоїть, рухається тільки судно.
   *  Для плавання це читається краще — око тримає всю дорогу разом. */
  fixedFrame?: boolean;
  /** Більше дороги на картку. Коли під прокрутку щось їде, звичайний крок
   *  проскакує надто швидко: пів оберта колесика — і тиждень позаду. */
  slow?: boolean;
  /** Картку не носити повз читача: вона стоїть на місці, а зміст у ній
   *  змінюється, коли доходимо до наступного кроку. Смуга карток при цьому
   *  стає невидимою драбиною — вона лишається тільки щоб дати прокрутці
   *  довжину. */
  pinned?: boolean;
}

interface MapData {
  region: [number, number, number, number];
  quant: number;
  land: number[][][];
  borders: number[][];
  legs: Record<string, number[]>;
  legBox: Record<string, [number, number, number, number]>;
}

/** Частка полотна, що лишається карті на вузькому екрані: решту накриває
 *  картка, коли стає проти очей. */
const MOBILE_BAND = 0.45;

const STROKE: Record<LegKind, { c: string; w: number; d: string | null }> = {
  sea: { c: "#1f4e78", w: 2.2, d: null },
  escort: { c: "#f24c06", w: 3.2, d: null },
  air: { c: "#8c2d04", w: 1.8, d: "6 5" },
  // Маршрут, який більше не працює, і версія, яку джерела спростували.
  past: { c: "#1f4e78", w: 1.8, d: "5 5" },
  ghost: { c: "#898270", w: 1.6, d: "2 6" },
};

/** Слід за судном. Стан AIS показано кольором, а не пунктиром: пунктир тут
 *  зайнятий — ним росте сам слід, поки читач гортає. */
const TRAIL: Record<AisState, { c: string; w: number }> = {
  on: { c: "#1f4e78", w: 3 },
  dark: { c: "#898270", w: 2.4 },
  spoof: { c: "#8c2d04", w: 3 },
};

const MONTHS = [
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

const AIS_WORD: Record<AisState, string> = {
  on: "AIS увімкнено",
  dark: "AIS вимкнено",
  spoof: "AIS показує неправду",
};

/* ── Проєкція ────────────────────────────────────────────────────────────── */

const RAD = Math.PI / 180;
const psi = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

interface Fit {
  k: number;
  t: [number, number];
}

/** Масштаб і зсув, за яких точки вміщаються у прямокутник [x0,y0]-[x1,y1]. */
function fitPoints(
  pts: Pt[],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Fit {
  let lo = Infinity,
    hi = -Infinity,
    plo = Infinity,
    phi = -Infinity;
  for (const p of pts) {
    const l = p[0] * RAD,
      q = psi(p[1]);
    if (l < lo) lo = l;
    if (l > hi) hi = l;
    if (q < plo) plo = q;
    if (q > phi) phi = q;
  }
  const bx0 = 150 * lo,
    bx1 = 150 * hi,
    by0 = -150 * phi,
    by1 = -150 * plo;
  const w = x1 - x0,
    h = y1 - y0;
  const k = Math.min(w / (bx1 - bx0), h / (by1 - by0));
  return {
    k: 150 * k,
    t: [x0 + (w - k * (bx1 + bx0)) / 2, y0 + (h - k * (by1 + by0)) / 2],
  };
}

/**
 * Плавний переліт між двома кадрами за Ван Вейком і Нуєм: камера спершу
 * відходить, тоді наближається — шлях виходить коротким за відчуттям, а не
 * за пікселями. Кадр задано трійкою [центр x, центр y, ширина].
 */
function interpolateZoom(p0: number[], p1: number[]) {
  const rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4;
  const cosh = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
  const sinh = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
  const tanh = (x: number) => (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
  const [ux0, uy0, w0] = p0;
  const [ux1, uy1, w1] = p1;
  const dx = ux1 - ux0,
    dy = uy1 - uy0,
    d2 = dx * dx + dy * dy;
  let at: (t: number) => number[];
  let S: number;
  if (d2 < 1e-12) {
    S = Math.log(w1 / w0) / rho;
    at = (t) => [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
  } else {
    const d1 = Math.sqrt(d2);
    const b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1);
    const b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1);
    const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
    const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    at = (t) => {
      const s = t * S,
        ch = cosh(r0);
      const u = (w0 / (rho2 * d1)) * (ch * tanh(rho * s + r0) - sinh(r0));
      return [ux0 + u * dx, uy0 + u * dy, (w0 * ch) / cosh(rho * s + r0)];
    };
  }
  return { at, duration: (S * 1000 * rho) / Math.SQRT2 };
}

/** Розпаковує різниці між сусідніми точками назад у градуси. */
function decode(flat: number[], region: number[], quant: number): Pt[] {
  const out: Pt[] = new Array(flat.length / 2);
  let x = 0,
    y = 0;
  for (let i = 0, j = 0; i < flat.length; i += 2, j++) {
    x += flat[i];
    y += flat[i + 1];
    out[j] = [region[0] + x * quant, region[1] + y * quant];
  }
  return out;
}

/* ── Компонент ───────────────────────────────────────────────────────────── */

interface Frame {
  k: number;
  tx: number;
  ty: number;
  op: Record<string, number>;
  lop: Record<string, number>;
  names: Record<string, string> | null;
}

interface PointNode {
  node: SVGGElement;
  text: SVGTextElement;
  id: string;
  px: number;
  py: number;
  n: string;
  forced: boolean;
  lastOp: number;
  lastTr: string;
  lastFlip: boolean | null;
  lastName: string;
}

interface ShipState {
  id: string;
  def: VoyageDef;
  trail: TrailNode[];
  g: SVGGElement;
  rot: SVGGElement;
  cap: SVGTextElement;
  pts: Pt[];
  cum: number[];
  span: Record<string, { s: number; e: number }>;
  t: number;
  target: number;
  show: boolean;
  lastOp: number;
  lastName: string;
}

interface TrailNode {
  node: SVGPathElement;
  t0: number;
  t1: number;
  full: boolean;
  lastOp: number;
}

interface LegNode {
  node: SVGPathElement;
  id: string;
  w: number;
  lastOp: number;
  lastW: number;
}

export function ScrollMap({
  dataUrl,
  baseBox,
  points,
  legs,
  steps,
  cards,
  label,
  pad = 0.14,
  tall = false,
  voyages,
  fixedFrame = false,
  slow = false,
  pinned = false,
}: ScrollMapProps) {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLParagraphElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = rootRef.current!;
    const svg = svgRef.current!;
    const mapcol = colRef.current!;
    const rail = railRef.current!;
    const stepEls = Array.from(
      shell.querySelectorAll<HTMLElement>(".smap__step"),
    );
    const cardEls = Array.from(
      shell.querySelectorAll<HTMLElement>(".smap__card"),
    );
    const SVGNS = "http://www.w3.org/2000/svg";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let W = 0,
      H = 0,
      K = 1,
      TX = 0,
      TY = 0;
    let g: SVGGElement | null = null;
    let gGeo!: SVGGElement, gLegs!: SVGGElement, gPts!: SVGGElement;
    let sphere!: SVGPathElement;
    let data: MapData | null = null;
    let land: Pt[][][] | null = null;
    let coast: Pt[][] = [];
    let borders: Pt[][] = [];
    let legPts: Record<string, Pt[]> = {};
    let ptNodes: PointNode[] = [];
    let legNodes: LegNode[] = [];
    let gTrail!: SVGGElement;
    let fleet: ShipState[] = [];
    let mainShip: ShipState | null = null;
    let shipRaf = 0,
      clockStep = -1,
      clockText = "";
    let active = -1,
      usableR = 0;
    let stepMid: number[] = [];
    let railW = 0;
    let cur: Frame | null = null;
    let raf: number | null = null;
    let alive = true;

    const px = (lon: number) => TX + K * lon * RAD;
    const py = (lat: number) => TY - K * psi(lat);

    function el<T extends keyof SVGElementTagNameMap>(
      name: T,
      attrs: Record<string, string | number | null | undefined>,
    ): SVGElementTagNameMap[T] {
      const n = document.createElementNS(SVGNS, name);
      for (const k in attrs) {
        const v = attrs[k];
        if (v != null) n.setAttribute(k, String(v));
      }
      return n;
    }

    /** Ламана в атрибут d. Сотих часток пікселя око не бачить, а рядок
     *  коротшає на третину. */
    function line(pts: Pt[], close: boolean) {
      let d = "";
      for (let i = 0; i < pts.length; i++) {
        d +=
          (i ? "L" : "M") +
          px(pts[i][0]).toFixed(2) +
          "," +
          py(pts[i][1]).toFixed(2);
      }
      return close ? d + "Z" : d;
    }

    /** Складає дорогу судна з легів у порядку path і запамʼятовує, скільки
     *  її припадає на кожен лег. Стик двох легів — та сама точка, тож
     *  дублікат на шві відкидаємо. */
    function buildRoute(s: ShipState) {
      s.pts = [];
      s.cum = [];
      s.span = {};
      let d = 0;
      for (const id of s.def.path) {
        const pts = legPts[id];
        if (!pts || pts.length < 2) continue;
        const from = d;
        for (const pt of pts) {
          const a = s.pts[s.pts.length - 1];
          if (a) {
            if (Math.abs(a[0] - pt[0]) < 0.02 && Math.abs(a[1] - pt[1]) < 0.02)
              continue;
            d += Math.hypot(px(pt[0]) - px(a[0]), py(pt[1]) - py(a[1]));
          }
          s.pts.push(pt);
          s.cum.push(d);
        }
        s.span[id] = { s: from, e: d };
      }
    }

    const routeLen = (s: ShipState) => s.cum[s.cum.length - 1] || 1;

    /** Точка на частці t дороги: індекс відрізка й частка в ньому. */
    function locate(s: ShipState, t: number) {
      const d = Math.max(0, Math.min(1, t)) * routeLen(s);
      let i = 1;
      while (i < s.cum.length - 1 && s.cum[i] < d) i++;
      const span = s.cum[i] - s.cum[i - 1] || 1;
      return { i, f: (d - s.cum[i - 1]) / span };
    }

    /** Ламана від t0 до t1 — з точними кінцями, а не по найближчих вузлах. */
    function slice(s: ShipState, t0: number, t1: number): Pt[] {
      if (s.pts.length < 2) return [];
      const a = locate(s, t0),
        b = locate(s, t1);
      const at = (o: { i: number; f: number }): Pt => {
        const p0 = s.pts[o.i - 1],
          p1 = s.pts[o.i];
        return [p0[0] + (p1[0] - p0[0]) * o.f, p0[1] + (p1[1] - p0[1]) * o.f];
      };
      const out: Pt[] = [at(a)];
      for (let i = a.i; i < b.i; i++) out.push(s.pts[i]);
      out.push(at(b));
      return out;
    }

    /** Позиція, яку крок задає цьому судну, у частках його дороги. */
    function posAt(s: ShipState, i: number): number | null {
      const sh = steps[i]?.ships?.[s.id];
      const sp = sh && s.span[sh.leg];
      if (!sh || !sp) return null;
      return (
        (sp.s + (sp.e - sp.s) * Math.max(0, Math.min(1, sh.f))) / routeLen(s)
      );
    }

    /** Те саме, але з озиранням назад і вперед: слід має межі на кожному
     *  кроці, навіть там, де крок про це судно не згадує. */
    function stepT(s: ShipState, i: number): number {
      for (let j = Math.min(i, steps.length - 1); j >= 0; j--) {
        const v = posAt(s, j);
        if (v != null) return v;
      }
      for (let j = i + 1; j < steps.length; j++) {
        const v = posAt(s, j);
        if (v != null) return v;
      }
      return 0;
    }

    /** Слід ріжемо на відрізки між кроками: у кожного свій стан AIS, і кожен
     *  або вже пройдений, або росте просто зараз, або ще попереду. */
    function buildTrail() {
      if (!gTrail) return;
      gTrail.textContent = "";
      // Головне судно малюємо першим і товщим: там, де дороги збігаються,
      // тонший слід супутника лягає поверх — видно обидва стани приладу.
      const order = [...fleet].sort(
        (a, b) => Number(!!b.def.main) - Number(!!a.def.main),
      );
      let side = 0;
      for (const ship of order) {
        // Дороги суден місцями збігаються точка в точку, а стани приладів на
        // них різні. Тому слід супутника ведемо трохи збоку: інакше синє
        // «передає» накрило б сіре «мовчить» і навпаки. Зсув — три пікселі,
        // на цьому масштабі менший за товщину самої лінії маршруту.
        const off = ship.def.main ? null : side++ % 2 ? [-2.6, -3] : [2.6, 3];
        ship.trail = [];
        if (ship.pts.length < 2) continue;
        for (let i = 0; i + 1 < steps.length; i++) {
          const t0 = stepT(ship, i),
            t1 = stepT(ship, i + 1);
          if (t1 - t0 < 1e-4) continue;
          const state = steps[i].ships?.[ship.id]?.ais ?? steps[i].ais ?? "on";
          const look = TRAIL[state];
          const node = el("path", {
            d: "",
            fill: "none",
            stroke: look.c,
            "stroke-width": ship.def.main ? look.w : look.w * 0.62,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "vector-effect": "non-scaling-stroke",
            transform: off ? `translate(${off[0]},${off[1]})` : null,
            opacity: 0,
          });
          gTrail.append(node);
          ship.trail.push({ node, t0, t1, full: false, lastOp: 0 });
        }
      }
    }

    function paintTrail(ship: ShipState) {
      const t = ship.t;
      for (const s of ship.trail) {
        const op = t <= s.t0 ? 0 : 1;
        if (op !== s.lastOp) {
          s.node.setAttribute("opacity", String(op));
          s.lastOp = op;
        }
        if (!op) continue;
        if (t >= s.t1) {
          if (!s.full) {
            s.node.setAttribute("d", line(slice(ship, s.t0, s.t1), false));
            s.full = true;
          }
        } else {
          s.node.setAttribute("d", line(slice(ship, s.t0, t), false));
          s.full = false;
        }
      }
    }

    const stamp = (s?: string) => (s ? Date.parse(s + "T00:00:00Z") : NaN);

    const human = (ms: number) => {
      const d = new Date(ms);
      return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    };

    /** Дата й стан приладу. Дата йде разом із судном: між двома
     *  задокументованими днями вона тече, на переходах, де джерело дає одну
     *  дату, застигає. Приблизні місця («після 22 травня») стоять підписом і
     *  не інтерполюються. */
    function paintClock(i: number, f: number) {
      const box = clockRef.current;
      if (!box || !voyages) return;
      const a = steps[i],
        b = steps[Math.min(i + 1, steps.length - 1)];
      const ta = stamp(a.date),
        tb = stamp(b.date);
      let text: string | null = null;
      if (!Number.isNaN(ta))
        text = human(Number.isNaN(tb) ? ta : ta + (tb - ta) * f);
      else if (a.dateLabel) text = a.dateLabel;
      else if (f >= 0.5 && !Number.isNaN(tb)) text = human(tb);

      // Картка без дати (підсумок наприкінці) не гасить плашку: дата просто
      // застигає на останній, яку дало джерело.
      if (!text) text = clockText;
      box.hidden = !text;
      if (!text) {
        clockStep = -1;
        return;
      }
      clockText = text;
      const head = box.firstElementChild as HTMLElement;
      if (head.textContent !== text) head.textContent = text;
      const ais =
        (mainShip && a.ships?.[mainShip.id]?.ais) ?? a.ais ?? "on";
      if (clockStep !== i) {
        clockStep = i;
        const tail = box.lastElementChild as HTMLElement;
        tail.textContent = AIS_WORD[ais];
        tail.dataset.ais = ais;
      }
    }

    /** Тримає в шарі рівно стільки вузлів, скільки фігур. */
    function paint(
      parent: SVGGElement,
      cls: string,
      items: Pt[][] | Pt[][][],
      toPath: (item: never) => string,
      attrs: Record<string, string | number | null>,
    ) {
      const have = parent.querySelectorAll<SVGPathElement>("path." + cls);
      for (let i = items.length; i < have.length; i++) have[i].remove();
      for (let i = 0; i < items.length; i++) {
        let node: SVGPathElement | null = have[i] ?? null;
        if (!node) {
          node = el("path", { ...attrs, class: cls });
          parent.append(node);
        }
        node.setAttribute("d", toPath(items[i] as never));
      }
    }

    function fitBox(bbox: [Pt, Pt], pad: number) {
      const [[x0, y0], [x1, y1]] = bbox;
      const pts: Pt[] = [
        [x0, y0],
        [x1, y0],
        [x1, y1],
        [x0, y1],
        [(x0 + x1) / 2, y0],
        [(x0 + x1) / 2, y1],
        [x0, (y0 + y1) / 2],
        [x1, (y0 + y1) / 2],
      ];
      return fitPoints(pts, W * pad, H * pad, W * (1 - pad), H * (1 - pad));
    }

    /**
     * Кадр кроку: рамка його точок, вписана у вільну частину полотна.
     * Рахуємо його для прибитого стану — тобто для всієї висоти полотна, а
     * не для тієї частини, що зараз видна. Інакше кадр перебирав би масштаб
     * ривками, поки врізка виїжджає з-за краю екрана.
     */
    function fitStep(coords: Pt[]) {
      const minSpan = 2.5;
      let x0 = Infinity,
        y0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity;
      for (const c of coords) {
        x0 = Math.min(x0, c[0]);
        x1 = Math.max(x1, c[0]);
        y0 = Math.min(y0, c[1]);
        y1 = Math.max(y1, c[1]);
      }
      if (x1 - x0 < minSpan) {
        const m = (x0 + x1) / 2;
        x0 = m - minSpan / 2;
        x1 = m + minSpan / 2;
      }
      if (y1 - y0 < minSpan) {
        const m = (y0 + y1) / 2;
        y0 = m - minSpan / 2;
        y1 = m + minSpan / 2;
      }
      const corners: Pt[] = [
        [x0, y0],
        [x1, y0],
        [x1, y1],
        [x0, y1],
      ];
      // Картка затуляє частину полотна: на широкому екрані праву, на
      // вузькому — нижню. Кадр підбираємо в те, що лишається.
      const wide = window.innerWidth > 900;
      const right = Math.max(W * 0.5, W - (wide ? railW + 70 : 0));
      usableR = right;
      const band = wide ? H : H * MOBILE_BAND;
      return fitPoints(
        corners,
        W * 0.13,
        band * pad,
        right - W * 0.03,
        band * (1 - pad),
      );
    }

    function stepCoords(st: MapStep): Pt[] {
      const c = st.points.map((id) => points[id].c);
      for (const id of st.legs) {
        const [bx0, by0, bx1, by1] = data!.legBox[id];
        c.push([bx0, by0], [bx1, by1]);
      }
      return c.length ? c : [[30, 35]];
    }

    /** Усі точки й дороги карти разом: кадр, який тримає весь шлях. Дороги
     *  суден беремо теж — намальованих легів під ними може й не бути. */
    function allCoords(): Pt[] {
      const c: Pt[] = [];
      for (const st of steps) c.push(...stepCoords(st));
      for (const id in voyages ?? {})
        for (const leg of voyages![id].path) {
          const b = data?.legBox[leg];
          if (b) c.push([b[0], b[1]], [b[2], b[3]]);
        }
      return c.length ? c : [[30, 35]];
    }

    function setup() {
      const r = mapcol.getBoundingClientRect();
      if (!r.width || !r.height) return;
      W = r.width;
      H = r.height;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      // Після зміни розміру геометрію перераховуємо, але вузли лишаємо на
      // місці: оновити дві тисячі path дешевше, ніж поховати й народити наново.
      if (!g || !g.isConnected) {
        svg.textContent = "";
        g = el("g", { class: "smap__zoom" });
        gGeo = el("g", {});
        gLegs = el("g", {});
        gPts = el("g", {});
        sphere = el("path", { fill: "#f4f2ec" });
        gGeo.append(sphere);
        gTrail = el("g", {});
        g.append(gGeo, gLegs, gTrail);
        svg.append(g, gPts);
        // Судна живуть поза групою зуму: інакше на глибокому кадрі позначки
        // роздулися б разом із картою.
        fleet = [];
        mainShip = null;
        for (const id in voyages ?? {}) {
          const def = voyages![id];
          const g0 = el("g", { class: "smap__ship" });
          const rot = el("g", {});
          rot.append(
            el("path", {
              d: "M11,0 L-7,6.4 L-3.4,0 L-7,-6.4 Z",
              fill: "#8c2d04",
              stroke: "#fff",
              "stroke-width": 1.6,
              "stroke-linejoin": "round",
            }),
          );
          // Підпис — над позначкою: назви точок стоять праворуч від кружка,
          // і знизу вони налазили одна на одну, коли судно приходило в порт.
          const cap = el("text", {
            x: 0,
            y: -14,
            "text-anchor": "middle",
            "font-size": 10.5,
            "font-weight": 700,
            "letter-spacing": ".06em",
            fill: "#2a2a2a",
            "paint-order": "stroke",
            stroke: "#fff",
            "stroke-width": 3.5,
          });
          cap.textContent = def.label;
          g0.append(rot, cap);
          g0.style.opacity = "0";
          svg.append(g0);
          const st: ShipState = {
            id,
            def,
            trail: [],
            g: g0,
            rot,
            cap,
            pts: [],
            cum: [],
            span: {},
            t: 0,
            target: 0,
            show: false,
            lastOp: 0,
            lastName: def.label,
          };
          fleet.push(st);
          if (def.main) mainShip = st;
        }
        if (!mainShip) mainShip = fleet[0] ?? null;
      }
      measure();
      draw();
    }

    function draw() {
      if (!land || !data || !W || !H) return;
      const base = fitBox(baseBox, 0.03);
      K = base.k;
      TX = base.t[0];
      TY = base.t[1];

      // Море — прямокутник у межах даних: далі геометрії просто немає.
      const [r0, r1, r2, r3] = data.region;
      sphere.setAttribute(
        "d",
        line(
          [
            [r0, r3],
            [r2, r3],
            [r2, r1],
            [r0, r1],
          ],
          true,
        ),
      );

      paint(
        gGeo,
        "smap-land",
        land,
        (poly: Pt[][]) => poly.map((ring) => line(ring, true)).join(""),
        { fill: "#dcd6cd", stroke: "none" },
      );
      paint(gGeo, "smap-coast", coast, (l: Pt[]) => line(l, false), {
        fill: "none",
        stroke: "#fff",
        "stroke-width": 0.7,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
      });
      paint(gGeo, "smap-border", borders, (l: Pt[]) => line(l, false), {
        fill: "none",
        stroke: "#c9c1b5",
        "stroke-width": 0.8,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        "vector-effect": "non-scaling-stroke",
      });

      legNodes = [];
      gLegs.textContent = "";
      for (const id in legs) {
        const s = STROKE[legs[id]];
        const node = el("path", {
          d: line(legPts[id], false),
          fill: "none",
          opacity: 0,
          stroke: s.c,
          "stroke-width": s.w,
          "stroke-dasharray": s.d,
          "stroke-linecap": "round",
          "vector-effect": "non-scaling-stroke",
        });
        gLegs.append(node);
        legNodes.push({ node, id, w: s.w, lastOp: 0, lastW: s.w });
      }

      if (!gPts.childNodes.length) {
        for (const id in points) {
          const p = points[id];
          const gg = el("g", { class: "smap__point" });
          gg.append(
            el("circle", {
              r: 4.2,
              fill: "#fff",
              stroke: "#2a2a2a",
              "stroke-width": 1.8,
            }),
          );
          const t = el("text", {
            x: 8,
            y: p.dy ?? 4,
            "font-size": 11,
            "font-weight": 700,
            "letter-spacing": ".02em",
            fill: "#2a2a2a",
            "paint-order": "stroke",
            stroke: "#fff",
            "stroke-width": 3.5,
          });
          t.textContent = p.n;
          gg.append(t);
          gPts.append(gg);
        }
      }
      ptNodes = [];
      let i = 0;
      for (const id in points) {
        const p = points[id];
        const node = gPts.childNodes[i++] as SVGGElement;
        node.style.opacity = "0";
        ptNodes.push({
          node,
          text: node.lastChild as SVGTextElement,
          id,
          px: px(p.c[0]),
          py: py(p.c[1]),
          n: p.n,
          forced: p.side === "left",
          lastOp: 0,
          lastTr: "",
          lastFlip: null,
          lastName: p.n,
        });
      }

      for (const s of fleet) buildRoute(s);
      buildTrail();
      for (const s of fleet) paintTrail(s);

      cur = null;
      applyStep(Math.max(active, 0), true);
    }

    /** Підписи, що налізли один на одного, ховаємо — лишається важливіший. */
    function declutter() {
      const vis = ptNodes
        .filter((o) => (+o.node.style.opacity || 0) > 0.05)
        .sort(
          (a, b) => (+b.node.style.opacity || 0) - (+a.node.style.opacity || 0),
        );
      vis.forEach((o) => {
        o.text.style.opacity = "1";
      });
      const kept: DOMRect[] = [];
      vis.forEach((o) => {
        const r = o.text.getBoundingClientRect();
        const clash = kept.some(
          (k) =>
            r.left < k.right + 3 &&
            k.left < r.right + 3 &&
            r.top < k.bottom + 2 &&
            k.top < r.bottom + 2,
        );
        if (clash) o.text.style.opacity = "0";
        else kept.push(r);
      });
    }

    // Кадр анімації чіпає лише те, що справді змінилося: зайвий запис
    // в атрибут коштує браузеру перемальовування.
    function render(s: Frame) {
      g!.style.transform = `translate(${s.tx}px,${s.ty}px) scale(${s.k})`;
      const lim = (usableR || W) - 96;
      for (const o of ptNodes) {
        const x = s.tx + s.k * o.px,
          y = s.ty + s.k * o.py;
        const op =
          x < 6 || y < 6 || x > W - 6 || y > H - 6 ? 0 : (s.op[o.id] ?? 0);
        if (op !== o.lastOp) {
          o.node.style.opacity = String(op);
          o.lastOp = op;
        }
        if (op === 0) continue;
        const tr = `translate(${x}px,${y}px)`;
        if (tr !== o.lastTr) {
          o.node.style.transform = tr;
          o.lastTr = tr;
        }
        const flip = o.forced || x > lim;
        if (flip !== o.lastFlip) {
          o.text.setAttribute("x", flip ? "-8" : "8");
          o.text.setAttribute("text-anchor", flip ? "end" : "start");
          o.lastFlip = flip;
        }
        const nm = (s.names && s.names[o.id]) ?? o.n;
        if (nm !== o.lastName) {
          o.text.textContent = nm;
          o.lastName = nm;
        }
      }
      for (const l of legNodes) {
        const op = s.lop[l.id] ?? 0;
        if (op !== l.lastOp) {
          l.node.setAttribute("opacity", String(op));
          l.lastOp = op;
        }
        const w = op > 0.6 ? l.w : l.w * 0.75;
        if (w !== l.lastW) {
          l.node.setAttribute("stroke-width", String(w));
          l.lastW = w;
        }
      }
      for (const sh of fleet) {
        if (sh.pts.length < 2) continue;
        const pos = locate(sh, sh.t);
        const p0 = sh.pts[pos.i - 1],
          p1 = sh.pts[pos.i];
        const ax = px(p0[0]),
          ay = py(p0[1]),
          bx = px(p1[0]),
          by = py(p1[1]);
        const x = s.tx + s.k * (ax + (bx - ax) * pos.f),
          y = s.ty + s.k * (ay + (by - ay) * pos.f);
        const op =
          sh.show && x > 6 && y > 6 && x < W - 6 && y < H - 6 ? 1 : 0;
        if (op) {
          sh.g.style.transform = `translate(${x}px,${y}px)`;
          sh.rot.style.transform = `rotate(${(Math.atan2(by - ay, bx - ax) * 180) / Math.PI}deg)`;
        }
        if (op !== sh.lastOp) {
          sh.g.style.opacity = String(op);
          sh.lastOp = op;
        }
      }
    }

    const view = (s: Frame) => [
      (W / 2 - s.tx) / s.k,
      (H / 2 - s.ty) / s.k,
      W / s.k,
    ];
    const fromView = (
      v: number[],
      op: Record<string, number>,
      lop: Record<string, number>,
    ): Frame => {
      const k = W / v[2];
      return {
        k,
        tx: W / 2 - k * v[0],
        ty: H / 2 - k * v[1],
        op,
        lop,
        names: null,
      };
    };

    function goTo(target: Frame, instant: boolean) {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      if (instant || !cur || reduced.matches) {
        cur = target;
        render(cur);
        declutter();
        shell.classList.remove("is-moving");
        return;
      }
      shell.classList.add("is-moving");
      const iz = interpolateZoom(view(cur), view(target));
      const from = cur;
      const dur = Math.min(1400, 700 + iz.duration * 0.35);
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const keys = [
        ...new Set([...Object.keys(from.op), ...Object.keys(target.op)]),
      ];
      const lkeys = [
        ...new Set([...Object.keys(from.lop), ...Object.keys(target.lop)]),
      ];
      let t0: number | null = null;
      // requestAnimationFrame, а не таймер: кадри йдуть у такт з екраном.
      raf = requestAnimationFrame(function tick(now) {
        if (t0 === null) t0 = now;
        const e = ease(Math.min(1, (now - t0) / dur));
        if (e >= 1) {
          raf = null;
          cur = target;
          render(target);
          declutter();
          shell.classList.remove("is-moving");
          return;
        }
        const op: Record<string, number> = {},
          lop: Record<string, number> = {};
        keys.forEach((id) => {
          const a = from.op[id] ?? 0,
            b = target.op[id] ?? 0;
          op[id] = a + (b - a) * e;
        });
        lkeys.forEach((id) => {
          const a = from.lop[id] ?? 0,
            b = target.lop[id] ?? 0;
          lop[id] = a + (b - a) * e;
        });
        cur = fromView(iz.at(e), op, lop);
        cur.names = target.names;
        render(cur);
        raf = requestAnimationFrame(tick);
      });
    }

    function applyStep(i: number, instant: boolean) {
      if (!land || !W || !H || !steps[i]) return;
      active = i;
      const st = steps[i];
      const f = fitStep(fixedFrame ? allCoords() : stepCoords(st));
      const k = f.k / K;
      const target: Frame = {
        k,
        tx: f.t[0] - TX * k,
        ty: f.t[1] - TY * k,
        op: {},
        lop: {},
        names: st.names ?? null,
      };

      // Показане на попередніх кроках не зникає, а притухає: читач бачить,
      // як картина набирається. Виняток — те, що крок прямо прибирає.
      const cumL = new Set<string>(),
        cumP = new Set<string>();
      for (let j = 0; j <= i; j++) {
        steps[j].legs.forEach((v) => cumL.add(v));
        steps[j].points.forEach((v) => cumP.add(v));
        steps[j].drop?.forEach((v) => {
          cumL.delete(v);
          cumP.delete(v);
        });
      }
      const DIM = 0.26;
      const dropped = new Set(st.drop ?? []);
      for (const id in points)
        target.op[id] = dropped.has(id)
          ? 0
          : st.points.includes(id)
            ? 1
            : cumP.has(id)
              ? DIM + 0.14
              : 0;
      for (const id in legs)
        target.lop[id] = dropped.has(id)
          ? 0
          : st.legs.includes(id)
            ? 1
            : cumL.has(id)
              ? DIM
              : 0;

      for (const s of fleet) {
        const nm = st.shipNames?.[s.id] ?? s.def.label;
        if (nm !== s.lastName) {
          s.cap.textContent = nm;
          s.lastName = nm;
        }
      }

      goTo(target, instant);
      stepEls.forEach((e, idx) => e.classList.toggle("is-active", idx === i));
      cardEls.forEach((e, idx) => {
        const on = idx === i;
        e.classList.toggle("is-on", on);
        e.setAttribute("aria-hidden", on ? "false" : "true");
      });
    }

    /* ── Дані ─────────────────────────────────────────────────────────── */

    fetch(dataUrl)
      .then((r) => r.json())
      .then((d: MapData) => {
        if (!alive) return;
        data = d;
        land = d.land.map((poly) =>
          poly.map((ring) => decode(ring, d.region, d.quant)),
        );
        borders = d.borders.map((l) => decode(l, d.region, d.quant));
        legPts = {};
        for (const id in d.legs)
          legPts[id] = decode(d.legs[id], d.region, d.quant);
        // Берег — це край того самого кільця, тож окремих даних не потребує.
        // Заливка малюється одним махом, а обведення шматками: у кожного
        // шматка своя рамка, і те, що поза кадром, браузер пропускає —
        // не обводячи всю Євразію заради Кіпру.
        coast = [];
        for (const poly of land)
          for (const ring of poly)
            for (let i = 0; i < ring.length - 1; i += 95)
              coast.push(ring.slice(i, Math.min(ring.length, i + 96)));
        draw();
      })
      .catch(() => {
        if (failRef.current) failRef.current.hidden = false;
      });

    /* ── Життєвий цикл ────────────────────────────────────────────────── */

    let tries = 0,
      bootTmr = 0;
    (function boot() {
      if (mapcol.clientWidth && mapcol.clientHeight) setup();
      else if (tries++ < 120) bootTmr = window.setTimeout(boot, 50);
    })();

    let resizeTmr = 0;
    function relayout() {
      clearTimeout(resizeTmr);
      resizeTmr = window.setTimeout(() => setup(), 120);
    }
    const ro = new ResizeObserver(() => {
      if (
        mapcol.clientWidth &&
        mapcol.clientHeight &&
        (Math.abs(mapcol.clientWidth - W) > 1 ||
          Math.abs(mapcol.clientHeight - H) > 1)
      )
        relayout();
    });
    ro.observe(mapcol);
    const pageRo = new ResizeObserver(() => measure());
    pageRo.observe(document.documentElement);
    window.addEventListener("load", measure);

    /**
     * Положення карток у координатах сторінки. Читаємо їх, коли верстка
     * змінилася, а не на кожен кадр прокрутки: у такому довгому тексті
     * кожне звіряння з розкладкою примушує браузер перерахувати всю сторінку.
     */
    function measure() {
      railW = rail.getBoundingClientRect().width;
      stepMid = stepEls.map((e) => {
        const r = e.getBoundingClientRect();
        return r.top + r.height / 2 + window.scrollY;
      });
    }

    function pickStep() {
      if (!stepMid.length) return;
      const mid = window.scrollY + window.innerHeight / 2;
      let best = 0;
      if (pinned) {
        // Картка міняється на межі щабля, а не на півдорозі до наступної:
        // інакше вона розповідала б про 1 травня, коли плашка ще на 28 квітня.
        while (best + 1 < stepMid.length && stepMid[best + 1] <= mid) best++;
      } else {
        let bestD = Infinity;
        for (let i = 0; i < stepMid.length; i++) {
          const d = Math.abs(stepMid[i] - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
      }
      if (best !== active) applyStep(best, false);
    }

    let scrollRaf = 0,
      idleTmr = 0,
      pickTmr = 0;
    /** Судно між двома картками йде плавно: беремо частку відстані між
     *  їхніми серединами. Камера тим часом лишається на своїй картці. */
    function voyageFrame() {
      if (!fleet.length || stepMid.length < 2) return;
      const mid = window.scrollY + window.innerHeight / 2;
      let i = 0;
      while (i + 1 < stepMid.length && stepMid[i + 1] < mid) i++;
      const a = stepMid[i],
        b = stepMid[i + 1] ?? a + 1;
      const f = Math.max(0, Math.min(1, (mid - a) / (b - a)));
      const j = Math.min(i + 1, steps.length - 1);
      let work = false;
      for (const s of fleet) {
        const p0 = posAt(s, i),
          p1 = posAt(s, j);
        // Поки судно є на наступній картці — воно на карті: так встигає
        // доїхати до місця, а не зникає посеред моря. А коли наступна про
        // нього вже не згадує, воно гасне відразу, як конвой рушив далі, і
        // не стоїть посеред океану.
        const h0 = steps[i]?.ships?.[s.id]?.hide,
          h1 = steps[j]?.ships?.[s.id]?.hide;
        s.show =
          p1 != null
            ? (p0 != null && !h0) || (f > 0.5 && !h1)
            : p0 != null && !h0 && f < 0.2;
        if (p0 != null && p1 != null) s.target = p0 + (p1 - p0) * f;
        else if (p0 != null) s.target = p0;
        else if (p1 != null) s.target = p1;
        if (Math.abs(s.target - s.t) > 2e-4) work = true;
      }
      paintClock(i, f);
      if (work && !shipRaf) shipRaf = requestAnimationFrame(shipTick);
      else if (!work && cur) render(cur);
    }

    /** Судно не стрибає слідом за колесиком, а доганяє його за кілька кадрів:
     *  одне клацання прокрутки — це сотня пікселів разом, і без згладжування
     *  позначка телепортується. */
    function shipTick() {
      shipRaf = 0;
      let done = true;
      for (const s of fleet) {
        const d = s.target - s.t;
        if (Math.abs(d) < 2e-4 || reduced.matches) {
          s.t = s.target;
          continue;
        }
        s.t += d * 0.11;
        done = false;
      }
      for (const s of fleet) paintTrail(s);
      if (cur) render(cur);
      if (!done) shipRaf = requestAnimationFrame(shipTick);
    }

    function scrollWork() {
      scrollRaf = 0;
      voyageFrame();
      if (!pickTmr)
        pickTmr = window.setTimeout(() => {
          pickTmr = 0;
          pickStep();
        }, 70);
    }
    function onScroll() {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(scrollWork);
      if (!shell.classList.contains("is-scrolling"))
        shell.classList.add("is-scrolling");
      clearTimeout(idleTmr);
      idleTmr = window.setTimeout(
        () => shell.classList.remove("is-scrolling"),
        160,
      );
    }
    const hovers = stepEls.map((e, i) => {
      const h = () => applyStep(i, false);
      e.addEventListener("mouseenter", h);
      return h;
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", relayout);
    scrollWork();

    return () => {
      alive = false;
      ro.disconnect();
      pageRo.disconnect();
      window.removeEventListener("load", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", relayout);
      stepEls.forEach((e, i) => e.removeEventListener("mouseenter", hovers[i]));
      [bootTmr, resizeTmr, idleTmr, pickTmr].forEach(clearTimeout);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (shipRaf) cancelAnimationFrame(shipRaf);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [
    dataUrl,
    baseBox,
    points,
    legs,
    steps,
    cards,
    label,
    pad,
    tall,
    voyages,
    fixedFrame,
    slow,
    pinned,
  ]);

  return (
    <figure
      className={
        "fig smap" +
        (tall ? " smap--tall" : "") +
        (slow ? " smap--slow" : "") +
        (pinned ? " smap--pinned" : "")
      }
      ref={rootRef as React.Ref<HTMLElement>}
    >
      <div className="smap__body">
        <div className="smap__mapcol" ref={colRef}>
          <svg
            className="smap__svg"
            ref={svgRef}
            role="img"
            aria-label={label}
          />
          <p className="smap__fail" ref={failRef} hidden>
            Карту не завантажено — перевірте зʼєднання
          </p>
          {voyages && (
            <div className="smap__clock" ref={clockRef} hidden>
              <span className="smap__clock-date" />
              <span className="smap__clock-ais" />
            </div>
          )}

          {pinned && (
            <div className="smap__panel">
              {cards.map((c, i) => (
                <section
                  className={"smap__card" + (i ? "" : " is-on")}
                  key={i}
                  aria-hidden={i !== 0}
                >
                  <CardBody card={c} />
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="smap__rail" ref={railRef}>
          {cards.map((c, i) =>
            pinned ? (
              // Невидима драбина: дає прокрутці довжину, а текст живе в панелі.
              <div className="smap__step" key={i} data-step={i} aria-hidden />
            ) : (
              <section className="smap__step" key={i} data-step={i}>
                <CardBody card={c} />
              </section>
            ),
          )}
        </div>
      </div>
    </figure>
  );
}

function CardBody({ card }: { card: MapCard }) {
  return (
    <>
      <h4 className="smap__steph">{card.h}</h4>
      <p className="smap__stepp">{card.p}</p>
      {card.quote && (
        <>
          <p className="smap__quote">{card.quote.text}</p>
          <p className="smap__cite">{card.quote.cite}</p>
        </>
      )}
      {card.grid && (
        <div className="smap__grid">
          {card.grid.map((cell) => (
            <div className="smap__cell" key={cell.k}>
              <div className="smap__k">{cell.k}</div>
              <div className="smap__v">{cell.v}</div>
            </div>
          ))}
        </div>
      )}
      <Refs ids={card.refs} />
    </>
  );
}

function Refs({ ids }: { ids: number[] }) {
  return (
    <div className="smap__ref">
      {ids.length > 1 ? "джерела " : "джерело "}
      {ids.map((n, i) => (
        <span key={n}>
          {i ? " " : ""}
          <a href={`#ref-${n}`}>[{n}]</a>
        </span>
      ))}
    </div>
  );
}

export default ScrollMap;
