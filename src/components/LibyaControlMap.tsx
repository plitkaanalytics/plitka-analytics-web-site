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
 * Полотен два, по одному на мову: геометрія в них спільна, різняться лише
 * текстові вузли. Обидва читаються на збірці, не в запиті: компонент
 * серверний, клієнтського коду в ньому немає зовсім.
 */
const SVG: Record<"uk" | "en", string> = {
  uk: readFileSync(
    join(
      process.cwd(),
      "public/articles/afrykanska-kampaniia/libya-control.svg",
    ),
    "utf8",
  ),
  en: readFileSync(
    join(
      process.cwd(),
      "public/articles/afrykanska-kampaniia/libya-control-en.svg",
    ),
    "utf8",
  ),
};

export function LibyaControlMap({ lang = "uk" }: { lang?: "uk" | "en" }) {
  return (
    <figure className="fig lcfig">
      <div
        className="lcfig__canvas"
        dangerouslySetInnerHTML={{ __html: SVG[lang] }}
      />
    </figure>
  );
}

export default LibyaControlMap;
