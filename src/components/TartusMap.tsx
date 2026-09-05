"use client";

import { useEffect, useRef } from "react";

/**
 * Карта до § 00 матеріалу «Сирійський експрес змінює курс»: морський маршрут
 * Новоросійськ — Тартус, ділянка під ескортом і повітряне плече з Хмейміма
 * в Африку. Полотно прибите до верху, картки їдуть поверх нього, кадр
 * перелітає до тієї, що зараз проти очей. Текст розділу живе на картках —
 * у статті цих абзаців більше немає.
 *
 * Геометрія лежить у public/articles/syriyskyi-ekspres/tartus-map.json —
 * її готує scripts/build-map-tartus.mjs із Natural Earth 1:50m. Ані d3, ані
 * topojson сторінка не тягне: усе, що звідти потрібно — проєкція Меркатора,
 * підбір кадру й переліт між кадрами — лежить нижче, разом із поясненнями.
 */

type Pt = [number, number];

interface MapData {
  region: [number, number, number, number];
  quant: number;
  land: number[][][];
  borders: number[][];
  legs: Record<string, number[]>;
  legBox: Record<string, [number, number, number, number]>;
}

interface Port {
  n: string;
  c: Pt;
  dy?: number;
  side?: "left";
}

const DATA_URL = "/articles/syriyskyi-ekspres/tartus-map.json";

const PORTS: Record<string, Port> = {
  novoros: { n: "Новоросійськ", c: [37.77, 44.72] },
  bosph: { n: "Босфор", c: [29.05, 41.15], dy: -6 },
  dard: { n: "Дарданелли", c: [26.25, 40.15], dy: 13 },
  tartus: { n: "Тартус", c: [35.87, 34.89], dy: 13 },
  khmeimim: { n: "Хмеймім", c: [35.95, 35.42], dy: -6 },
  tobruk: { n: "Тобрук", c: [23.96, 32.08] },
  jufra: { n: "Ель-Джуфра", c: [15.96, 29.2] },
  khartoum: { n: "Хартум", c: [32.53, 15.59] },
  bangui: { n: "Бангі", c: [18.56, 4.36] },
  bamako: { n: "Бамако · 2021", c: [-8.0, 12.65], dy: 4, side: "left" },
  ouaga: { n: "Уагадугу · 2022", c: [-1.53, 12.37], dy: 20 },
  niamey: { n: "Ніамей · 2023", c: [2.11, 13.51], dy: -12 },
};

const LEGS: Record<string, "sea" | "escort" | "air"> = {
  sea: "sea",
  escort: "escort",
  airLibya: "air",
  airTobruk: "air",
  airSudan: "air",
  airCar: "air",
  airMali: "air",
  airOuaga: "air",
  airNiamey: "air",
};

const STROKE = {
  sea: { c: "#1f4e78", w: 2.2, d: null as string | null },
  escort: { c: "#f24c06", w: 3.2, d: null as string | null },
  air: { c: "#8c2d04", w: 1.8, d: "6 5" as string | null },
};

const SHORT = { bamako: "Бамако", ouaga: "Уагадугу", niamey: "Ніамей" };

interface Step {
  ports: string[];
  legs: string[];
  names?: Record<string, string>;
}

const STEPS: Step[] = [
  { ports: ["novoros", "bosph", "dard", "tartus"], legs: ["sea"] },
  { ports: ["tartus", "dard", "bosph"], legs: ["escort"] },
  { ports: ["tartus", "khmeimim"], legs: [] },
  {
    ports: ["khmeimim", "tobruk", "jufra", "khartoum", "bangui"],
    legs: ["airLibya", "airTobruk", "airSudan", "airCar"],
  },
  {
    ports: ["bamako", "ouaga", "niamey"],
    legs: ["airMali", "airOuaga", "airNiamey"],
  },
  {
    ports: ["khmeimim", "bamako", "ouaga", "niamey"],
    legs: ["airMali", "airOuaga", "airNiamey"],
  },
  {
    ports: ["tartus", "novoros", "bamako", "jufra", "bangui"],
    legs: [
      "sea",
      "escort",
      "airLibya",
      "airTobruk",
      "airSudan",
      "airCar",
      "airMali",
      "airOuaga",
      "airNiamey",
    ],
    names: SHORT,
  },
];

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

interface PortNode {
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

interface LegNode {
  node: SVGPathElement;
  id: string;
  w: number;
  lastOp: number;
  lastW: number;
}

export function TartusMap() {
  const rootRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const shell = rootRef.current!;
    const svg = svgRef.current!;
    const mapcol = colRef.current!;
    const rail = railRef.current!;
    const stepEls = Array.from(
      shell.querySelectorAll<HTMLElement>(".tmap__step"),
    );
    const SVGNS = "http://www.w3.org/2000/svg";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let W = 0,
      H = 0,
      K = 1,
      TX = 0,
      TY = 0;
    let g: SVGGElement | null = null;
    let gGeo!: SVGGElement, gLegs!: SVGGElement, gPorts!: SVGGElement;
    let sphere!: SVGPathElement;
    let data: MapData | null = null;
    let land: Pt[][][] | null = null;
    let coast: Pt[][] = [];
    let borders: Pt[][] = [];
    let legPts: Record<string, Pt[]> = {};
    let portNodes: PortNode[] = [];
    let legNodes: LegNode[] = [];
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
      const pad = 0.14,
        minSpan = 2.5;
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
      const band = wide ? H : H * 0.56;
      return fitPoints(
        corners,
        W * 0.13,
        band * pad,
        right - W * 0.03,
        band * (1 - pad),
      );
    }

    function stepCoords(st: Step): Pt[] {
      const c = st.ports.map((id) => PORTS[id].c);
      for (const id of st.legs) {
        const [bx0, by0, bx1, by1] = data!.legBox[id];
        c.push([bx0, by0], [bx1, by1]);
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
        g = el("g", { class: "tmap__zoom" });
        gGeo = el("g", {});
        gLegs = el("g", {});
        gPorts = el("g", {});
        sphere = el("path", { fill: "#f4f2ec" });
        gGeo.append(sphere);
        g.append(gGeo, gLegs);
        svg.append(g, gPorts);
      }
      measure();
      draw();
    }

    function draw() {
      if (!land || !data || !W || !H) return;
      const base = fitBox(
        [
          [-16, -2],
          [44, 48],
        ],
        0.03,
      );
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
        "tmap-land",
        land,
        (poly: Pt[][]) => poly.map((ring) => line(ring, true)).join(""),
        { fill: "#dcd6cd", stroke: "none" },
      );
      paint(gGeo, "tmap-coast", coast, (l: Pt[]) => line(l, false), {
        fill: "none",
        stroke: "#fff",
        "stroke-width": 0.7,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
      });
      paint(gGeo, "tmap-border", borders, (l: Pt[]) => line(l, false), {
        fill: "none",
        stroke: "#c9c1b5",
        "stroke-width": 0.8,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        "vector-effect": "non-scaling-stroke",
      });

      legNodes = [];
      gLegs.textContent = "";
      for (const id in LEGS) {
        const s = STROKE[LEGS[id]];
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

      if (!gPorts.childNodes.length) {
        for (const id in PORTS) {
          const p = PORTS[id];
          const gg = el("g", { class: "tmap__port" });
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
          gPorts.append(gg);
        }
      }
      portNodes = [];
      let i = 0;
      for (const id in PORTS) {
        const p = PORTS[id];
        const node = gPorts.childNodes[i++] as SVGGElement;
        node.style.opacity = "0";
        portNodes.push({
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

      cur = null;
      applyStep(Math.max(active, 0), true);
    }

    /** Підписи, що налізли один на одного, ховаємо — лишається важливіший. */
    function declutter() {
      const vis = portNodes
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
      for (const o of portNodes) {
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
      if (!land || !W || !H || !STEPS[i]) return;
      active = i;
      const st = STEPS[i];
      const f = fitStep(stepCoords(st));
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
      // як картина набирається.
      const cumL = new Set<string>(),
        cumP = new Set<string>();
      for (let j = 0; j <= i; j++) {
        STEPS[j].legs.forEach((v) => cumL.add(v));
        STEPS[j].ports.forEach((v) => cumP.add(v));
      }
      const DIM = 0.26;
      for (const id in PORTS)
        target.op[id] = st.ports.includes(id)
          ? 1
          : cumP.has(id)
            ? DIM + 0.14
            : 0;
      for (const id in LEGS)
        target.lop[id] = st.legs.includes(id) ? 1 : cumL.has(id) ? DIM : 0;

      goTo(target, instant);
      stepEls.forEach((e, idx) => e.classList.toggle("is-active", idx === i));
    }

    /* ── Дані ─────────────────────────────────────────────────────────── */

    fetch(DATA_URL)
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
      let best = 0,
        bestD = Infinity;
      for (let i = 0; i < stepMid.length; i++) {
        const d = Math.abs(stepMid[i] - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best !== active) applyStep(best, false);
    }

    let scrollRaf = 0,
      idleTmr = 0,
      pickTmr = 0;
    function scrollWork() {
      scrollRaf = 0;
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure className="fig tmap" ref={rootRef as React.Ref<HTMLElement>}>
      <div className="tmap__body">
        <div className="tmap__mapcol" ref={colRef}>
          <svg
            className="tmap__svg"
            ref={svgRef}
            role="img"
            aria-label="Карта: морський маршрут Новоросійськ — Босфор — Дарданелли — Тартус, ділянка під ескортом в Егейському морі та повітряні маршрути з авіабази Хмеймім до Лівії, Судану, ЦАР, Малі, Буркіна-Фасо й Нігеру"
          />
          <p className="tmap__fail" ref={failRef} hidden>
            Карту не завантажено — перевірте зʼєднання
          </p>
        </div>

        <div className="tmap__rail" ref={railRef}>
          {STEP_TEXT.map((s, i) => (
            <section className="tmap__step" key={i} data-step={i}>
              <h4 className="tmap__steph">{s.h}</h4>
              <p className="tmap__stepp">{s.p}</p>
              {s.grid && (
                <div className="tmap__grid">
                  {s.grid.map((c) => (
                    <div className="tmap__cell" key={c.k}>
                      <div className="tmap__k">{c.k}</div>
                      <div className="tmap__v">{c.v}</div>
                    </div>
                  ))}
                </div>
              )}
              <Refs ids={s.refs} />
            </section>
          ))}
        </div>
      </div>
    </figure>
  );
}

function Refs({ ids }: { ids: number[] }) {
  return (
    <div className="tmap__ref">
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

interface Card {
  h: string;
  p: React.ReactNode;
  grid?: { k: string; v: React.ReactNode }[];
  refs: number[];
}

const STEP_TEXT: Card[] = [
  {
    h: "Сирійський експрес",
    p: (
      <>
        Постачали цю ескадру не разовими рейсами, а постійним маршрутом — за
        розкладом і під охороною. У ЗМІ ці конвої прозвали{" "}
        <b>«сирійський експрес»</b>: суховантажі й ролкери курсували між
        Новоросійськом і Тартусом. Синім — їхній шлях: Чорне море, Босфор,
        Дарданелли, Егейське море. Обидва вузькі місця на ньому контролює
        Туреччина.
      </>
    ),
    refs: [19],
  },
  {
    h: "Ділянка під ескортом",
    p: (
      <>
        Помаранчевим — та частина шляху, яку конвої проходили не самі: фрегати й
        корвети вели їх від Тартуса до турецьких проток, щоб{" "}
        <b>у Егейському морі ніхто не спробував їх оглянути чи затримати</b>.
      </>
    ),
    refs: [19],
  },
  {
    h: "Порт і аеродром",
    p: (
      <>
        Сирія була потрібна Москві не лише заради Середземного моря. За{" "}
        <b>35 миль</b> на північ від Тартуса стоїть авіабаза <b>Хмеймім</b> — і
        саме там дозаправлялися літаки, що везли техніку, людей і вантажі в
        Африку.
      </>
    ),
    grid: [
      {
        k: "Оренда 2017 року",
        v: (
          <>
            49 років з опціями продовження по 25, правовий імунітет для
            російського персоналу, дозвіл поглибити дно й поставити плавучі
            причали під більші кораблі — з розрахунком приймати до одинадцяти
            суден одночасно, включно з атомними
          </>
        ),
      },
      {
        k: "Частка в прибутку порту",
        v: (
          <>
            65 відсотків — за повідомленням сирійських медіа, яке переказала
            «Москоу Таймс»
          </>
        ),
      },
    ],
    refs: [18, 12, 13, 14],
  },
  {
    h: "Плече в Африку",
    p: (
      <>
        Африканська присутність будувалася окремо і пов&apos;язувалася з Сирією{" "}
        <b>виключно інфраструктурою</b>. З кінця 2021 року в Малі працювали
        бійці «Вагнера» — приватної структури Євгена Пригожина, яка у ролі
        найманців воювала за місцеві уряди в обмін на доступ до ресурсів. Схема
        повторювалася в Центральноафриканській Республіці, Лівії, Судані.
        Пунктиром — напрямки, а не конкретні коридори.
      </>
    ),
    refs: [22],
  },
  {
    h: "Сахель",
    p: (
      <>
        Паралельно Москва підтримувала перевороти, після яких із країн ішли
        французи й американці: <b>Малі 2021 року</b>,{" "}
        <b>Буркіна-Фасо 2022-го</b>, <b>Нігер 2023-го</b>. Дата біля столиці —
        рік перевороту.
      </>
    ),
    refs: [22],
  },
  {
    h: "Держава замість «Вагнера»",
    p: (
      <>
        У грудні 2023 року заступник міністра оборони РФ Юнус-Бек Євкуров
        заснував <b>«Африканський корпус»</b> — державну заміну «Вагнеру»,
        підпорядковану Міноборони й ГРУ. У Малі корпус розгорнувся наприкінці
        2024-го, а влітку 2025 року «Вагнер» офіційно передав йому операції й
        пішов. Змінилася не лише вивіска: приватну компанію, яка сама шукала
        собі заробіток, замінила державна структура, яку треба постачати{" "}
        <b>з державного бюджету та силами державного флоту</b>.
      </>
    ),
    refs: [21, 1],
  },
  {
    h: "Трималося на одній людині",
    p: (
      <>
        Уся ця конструкція трималася на Асаді. Він платив за інтервенцію 2015
        року, яка врятувала його режим, і платив щедро: ремонтна база для флоту,
        аеродром для африканських рейсів і правовий імунітет для військових —
        усе це давав один гарант.
      </>
    ),
    refs: [13],
  },
];

export default TartusMap;
