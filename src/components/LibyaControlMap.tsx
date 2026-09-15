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
    </figure>
  );
}

export default LibyaControlMap;
