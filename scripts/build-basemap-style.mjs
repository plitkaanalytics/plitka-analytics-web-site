/**
 * Готує стиль підкладки для флотських карт.
 *
 *   node scripts/build-basemap-style.mjs
 *
 * Пише public/embeds/basemap-style.json (українська) і
 * public/embeds/basemap-style-en.json (англійська).
 *
 * Навіщо це взагалі. Раніше карти тягнули растрові тайли
 * tile.openstreetmap.org. OSM малює кордони за фактичним контролем: суцільна
 * лінія державного рівня через Перекоп, а південніше за неї підписи
 * перемикаються на російські. Растровий шар не має ні ключа, ні мовного
 * параметра — картинка приходить уже намальована, правити нічого.
 *
 * Векторні тайли дають обидва важелі, тому підкладка тепер векторна:
 *
 *  1. Кордони. У схемі OpenMapTiles шар boundary несе ознаки disputed і
 *     claimed_by. Перевірка на тайлі над Перекопом: справжній кордон
 *     материкової України — disputed=0, adm0_l=UKR; усі лінії навколо Криму —
 *     disputed=1, claimed_by=RU/UA. Тому шар спірних кордонів ми не малюємо:
 *     анексію ми не показуємо (те саме правило, що й у
 *     scripts/build-map-region.mjs). Звичайні boundary_2 і boundary_3 спірні
 *     лінії й так відкидають, тож жоден реальний кордон не постраждає.
 *     Межі самої АР Крим при цьому не лишається — чому так, див. нижче.
 *
 *  2. Підписи. Кожен шар з text-field переписуємо на потрібну мову з
 *     відкатом: name:<мова> → name:latin → name. Для Криму це має значення —
 *     у тайлах є name:uk на всі міста, включно з «Яни Капу» замість
 *     «Красноперекопск».
 *
 * Тайли, спрайт і шрифти лишаються за OpenFreeMap: безкоштовно, без ключа.
 * Стиль зберігаємо в репозиторії, щоб сторінка не залежала від того, чи
 * віддається зараз їхній ендпойнт стилю.
 *
 * Заразом скрипт розкладає в public/embeds/ саму бібліотеку MapLibre і
 * плагін до Leaflet — так само, як там лежить leaflet.js. Вбудови статичні й
 * тягнуть їх звичайним <script src>, тому версія в package.json і версія на
 * диску мають збігатися: після оновлення пакета треба перезапустити цей
 * скрипт.
 */

import { writeFileSync, copyFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = new URL("..", import.meta.url);
const UPSTREAM = "https://tiles.openfreemap.org/styles/liberty";

// Шар, яким Liberty малює спірні кордони, — у нас його не буде взагалі.
// Тримаємо переліком, щоб зміна вихідного стилю не пройшла непоміченою.
const DISPUTED_LAYERS = ["boundary_disputed"];

// Разом з російською лінією зникає й українська: над Перекопом у тайлах лежать
// обидві претензії одна на одній, і обидві позначені disputed. Тобто межі АР
// Крим на карті не буде взагалі.
//
// Так і лишаємо — свідомо. Спроба домалювати її окремим шаром (геометрія в
// Natural Earth є, суцільним сегментом від Арабатської стрілки до Перекопу)
// показала, що виходить гірше: більша частина лінії йде Сивашем, на сірій воді
// звичайний блідий обласний пунктир не читається, а щоб читався — його треба
// затемнити, і тоді Крим єдиний на карті обведений жирніше за інші області.
// Виділяти його ми не хочемо.
//
// Якщо колись знадобиться повернути: рамка півострова — [31.4, 43.9, 37.0,
// 46.6], та сама, що в scripts/build-map-region.mjs.

// Найменування окупаційних адміністрацій. Кордони — це ще не все: у шарі place
// над Кримом лежать дві області одна на одній, «Автономна Республіка Крим» і
// «Республика Крым». Другу створила окупаційна влада, і на карті її не буде.
// Звіряємось із власною назвою обʼєкта (name), а не з перекладом: переклад
// у тайлах є на всі мови, а власна назва одна.
//
// Окуповані області материка такої пари не мають — Донецька, Луганська,
// Запорізька й Херсонська йдуть в OSM тільки під українськими назвами.
const OCCUPATION_PLACES = ["Республика Крым"];

const TARGETS = [
  { lang: "uk", out: "public/embeds/basemap-style.json", name: "PLITKA fleet · uk" },
  { lang: "en", out: "public/embeds/basemap-style-en.json", name: "PLITKA fleet · en" },
];

/** Підпис потрібною мовою з відкатом на латиницю й на локальну назву. */
function labelExpr(lang) {
  return [
    "coalesce",
    ["get", `name:${lang}`],
    ["get", "name:latin"],
    ["get", "name"],
  ];
}

/** Чи фільтр шару вибирає саме спірні лінії. */
function selectsDisputed(filter) {
  return JSON.stringify(filter ?? []).includes('"disputed"');
}

// ── Бібліотеки поруч зі стилем ─────────────────────────────────────────────

const VENDOR = [
  ["node_modules/maplibre-gl/dist/maplibre-gl.js", "public/embeds/maplibre-gl.js"],
  ["node_modules/maplibre-gl/dist/maplibre-gl.css", "public/embeds/maplibre-gl.css"],
  [
    "node_modules/@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl.js",
    "public/embeds/leaflet-maplibre-gl.js",
  ],
];

for (const [from, to] of VENDOR) {
  const src = fileURLToPath(new URL(from, ROOT));
  const dst = fileURLToPath(new URL(to, ROOT));
  copyFileSync(src, dst);
  console.log(`${to}  ${(statSync(dst).size / 1024).toFixed(0)} КБ`);
}

// ── Стиль ──────────────────────────────────────────────────────────────────

const res = await fetch(UPSTREAM);
if (!res.ok) throw new Error(`${UPSTREAM} → HTTP ${res.status}`);
const upstream = await res.json();

for (const { lang, out, name } of TARGETS) {
  const style = structuredClone(upstream);
  style.name = name;

  const dropped = [];
  style.layers = style.layers.filter((l) => {
    const drop =
      DISPUTED_LAYERS.includes(l.id) ||
      (l.id.startsWith("boundary") &&
        selectsDisputed(l.filter) &&
        !JSON.stringify(l.filter).includes('"!="'));
    if (drop) dropped.push(l.id);
    return !drop;
  });

  let relabelled = 0;
  for (const l of style.layers) {
    const tf = l.layout?.["text-field"];
    if (!tf) continue;
    // Щити доріг підписують номер маршруту, а не назву — їх не чіпаємо.
    if (JSON.stringify(tf).includes('"ref"')) continue;
    l.layout["text-field"] = labelExpr(lang);
    relabelled++;
  }

  let filtered = 0;
  for (const l of style.layers) {
    if (l["source-layer"] !== "place") continue;
    const skip = ["!", ["in", ["get", "name"], ["literal", OCCUPATION_PLACES]]];
    l.filter = l.filter ? ["all", l.filter, skip] : skip;
    filtered++;
  }

  if (!dropped.length) {
    throw new Error(
      "жодного шару спірних кордонів не знайдено — вихідний стиль змінився, перевірити DISPUTED_LAYERS",
    );
  }

  const path = fileURLToPath(new URL(out, ROOT));
  writeFileSync(path, JSON.stringify(style, null, 1) + "\n");
  console.log(
    `${out}\n   шарів ${style.layers.length}` +
      ` · прибрано: ${dropped.join(", ")}` +
      `` +
      `\n   підписів переведено на ${lang}: ${relabelled}` +
      ` · шарів place із відсіяною окупаційною назвою: ${filtered}`,
  );
}
