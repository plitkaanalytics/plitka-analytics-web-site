/**
 * Ловить у JSX два дефекти, від яких у браузері злипаються слова.
 *
 *   node scripts/check-jsx-text.mjs          — показати
 *   node scripts/check-jsx-text.mjs --fix    — виправити
 *
 * 1. HTML-сутність у тексті. Компілятор Next (SWC) розкодовує &apos; чи
 *    &nbsp; — і заразом зрізає пробіл на початку того самого текстового
 *    вузла. Тобто ось таке:
 *
 *        Знімок від <strong>27 січня</strong> фіксує, що техніка
 *        накопичувалася, а потім зʼявилася маса контейнерів
 *
 *    у браузері дає «27 січняфіксує». У файлі все виглядає правильно, тому
 *    дефект живе роками. Лікується заміною сутності на живий символ:
 *    ʼ замість &apos;, нерозривний пробіл замість &nbsp;. Prettier живі
 *    символи не чіпає, а {" "} на цьому місці — навпаки, прибирає назад.
 *
 * 2. Перенос рядка на межі тексту й тега. Це вже за стандартом JSX: пробіл
 *    зникає разом із переносом. Тут правильна форма — явний {" "}.
 *
 * Покликання на джерела (<a className="ref">[19]</a> одразу після слова)
 * навмисно йдуть без пробілу, їх не чіпаємо.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ʼ (U+02BC) — той самий апостроф, що вже стоїть у решті тексту; ESLint не
// вимагає його екранувати, на відміну від прямого '.
const ENTITIES = {
  "&apos;": "ʼ",
  "&nbsp;": " ",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&laquo;": "«",
  "&raquo;": "»",
  "&copy;": "©",
};

const TAGS = "strong|b|em|i|a|span";
const WORD = "[А-Яа-яЇїІіЄєҐґA-Za-z0-9»”„]";
const AFTER = new RegExp(`(</(?:${TAGS})>)(\\n\\s*)(?=${WORD}|«)`, "g");
const BEFORE = new RegExp(`(${WORD}|[,.;:!?»])(\\n\\s*)(?=<(?:${TAGS})[ >])`, "g");
const SKIP_TAG = /^<[a-z]+[^>]*className="ref"|^<[a-z]+[^>]*>\s/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const fix = process.argv.includes("--fix");
let entities = 0;
let breaks = 0;

for (const file of walk("src")) {
  const src = readFileSync(file, "utf8");
  let out = src;

  // 1. Сутності — рахуємо; міняти будемо в кінці, бо заміна зсуває позиції.
  const found = {};
  for (const [ent] of Object.entries(ENTITIES)) {
    const n = (src.match(new RegExp(ent, "g")) || []).length;
    if (!n) continue;
    found[ent] = n;
    entities += n;
  }

  // 2. Переноси на межі тексту й тега.
  const hits = [];
  for (const [re, where] of [
    [AFTER, "текст із нового рядка після тега"],
    [BEFORE, "тег із нового рядка після слова"],
  ]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      const tail = src.slice(m.index + m[0].length, m.index + m[0].length + 80);
      if (where.startsWith("тег") && SKIP_TAG.test(tail)) continue;
      hits.push({
        at: m.index + m[1].length,
        line: src.slice(0, m.index).split("\n").length,
        where,
        // Текст із нового рядка після тега — це завжди суцільна проза, там
        // пробіл ставимо самі. А от тег із нового рядка після слова — то
        // здебільшого розмітка: «IMO» над номером, назва над підзаголовком.
        // Тег там блоковий, пробіл не потрібен, тож такі місця лише показуємо.
        auto: where.startsWith("текст"),
      });
    }
  }
  breaks += hits.filter((h) => h.auto).length;
  if (fix) {
    // Спершу вставки за позиціями з кінця, і аж потім заміна сутностей:
    // вона коротша за оригінал і зсунула б усі позиції нижче.
    for (const h of [...hits].filter((h) => h.auto).sort((a, b) => b.at - a.at))
      out = out.slice(0, h.at) + '{" "}' + out.slice(h.at);
    for (const [ent, ch] of Object.entries(ENTITIES)) out = out.split(ent).join(ch);
  }

  if (!Object.keys(found).length && !hits.length) continue;
  console.log(`\n${file}`);
  for (const [ent, n] of Object.entries(found)) console.log(`   ${ent} — ${n}`);
  for (const h of hits)
    console.log(`   рядок ${h.line}: ${h.where}${h.auto ? "" : " — перевірте очима"}`);
  if (fix && out !== src) writeFileSync(file, out);
}

const total = entities + breaks;
console.log(
  total
    ? `\nсутностей у тексті: ${entities} · переносів на межі тега: ${breaks}` +
        (fix ? "\nвиправлено — лишилося прогнати prettier і збірку" : "\nзапустіть із --fix")
    : "\nтекст чистий",
);
process.exit(total && !fix ? 1 : 0);
