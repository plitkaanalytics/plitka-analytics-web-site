import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Карта до § 02: порти Росії та Ірану на Каспії й морські шляхи між ними.
 *
 * Полотно малює scripts/build-caspian-routes-map.mjs — тут готовий SVG
 * вклеюється в розмітку. Геометрія з Natural Earth, порти на власних
 * координатах, тож по карті можна міряти. Стрілок і дат немає: вантаж ходить
 * в обидва боки, а моменту розвороту потоку джерела не називають.
 *
 * Читається на збірці, не в запиті: компонент серверний, клієнтського коду
 * в ньому немає.
 */
const SVG = readFileSync(
  join(process.cwd(), "public/articles/rezervne-more/caspian-routes.svg"),
  "utf8",
);

export default function CaspianRoutesMap() {
  return <div dangerouslySetInnerHTML={{ __html: SVG }} />;
}
