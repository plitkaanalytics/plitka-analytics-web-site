import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Карта до § 03 матеріалу «Україна проти „Африканського корпусу“».
 *
 * Полотно малює scripts/build-libya-control-map.mjs — тут готовий SVG
 * вклеюється в розмітку. Переліку збоку немає навмисно: усі девʼять обʼєктів
 * підписані на самій карті разом із родом, а решта — політика, чисельність,
 * цитати — живе абзацами поруч і читається без карти.
 *
 * Читається на збірці, не в запиті: компонент серверний, клієнтського коду в
 * ньому немає зовсім.
 */
const SVG = readFileSync(
  join(process.cwd(), "public/articles/afrykanska-kampaniia/libya-control.svg"),
  "utf8",
);

export function LibyaControlMap() {
  return (
    <figure className="fig lcfig">
      <div
        className="lcfig__canvas"
        dangerouslySetInnerHTML={{ __html: SVG }}
      />
      <figcaption>
        Дві присутності в одній країні. Зона Хафтара більша не тому, що він
        сильніший: схід і південь — це пустеля, а майже все населення живе на
        північному заході, який тримає уряд у Триполі. Межа показана смугою, а
        не лінією: наші джерела описують контроль лише напрямками — «Триполі й
        західна Лівія» проти «східної й південної»
        <a className="ref" href="#ref-52">
          [52]
        </a>
        <a className="ref" href="#ref-16">
          [16]
        </a>
        , — тож різка лінія була б вигаданою точністю. Українські майданчики —
        за розслідуванням RFI, підтвердженим AP
        <a className="ref" href="#ref-15">
          [15]
        </a>
        <a className="ref" href="#ref-16">
          [16]
        </a>
        ; російські обʼєкти — за супутниковим аналізом Tearline
        <a className="ref" href="#ref-53">
          [53]
        </a>
        , який рахує шість авіабаз, хоча поіменно джерела дають пʼять.
      </figcaption>
    </figure>
  );
}

export default LibyaControlMap;
