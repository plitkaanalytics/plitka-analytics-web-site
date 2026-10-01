import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Карта до § 02: порти Росії та Ірану на Каспії й морські шляхи між ними.
 *
 * Полотно малює scripts/build-caspian-routes-map.mjs — тут готовий SVG
 * вклеюється в розмітку. Геометрія з Natural Earth, порти на власних
 * координатах, тож по карті можна міряти.
 *
 * Море витягнуте з півночі на південь, тож карта висока. Ширину обмежуємо
 * тут, а не в полотні: у самому SVG лишається повна роздільність, а на
 * сторінці він займає рівно стільки, скільки треба, щоб підписи читалися.
 *
 * Читається на збірці, не в запиті: компонент серверний, клієнтського коду
 * в ньому немає.
 */
const SVG = readFileSync(
  join(process.cwd(), "public/articles/rezervne-more/caspian-routes.svg"),
  "utf8",
);

export default function CaspianRoutesMap() {
  return (
    <div
      style={{ maxWidth: 420, margin: "0 auto" }}
      dangerouslySetInnerHTML={{ __html: SVG }}
    />
  );
}
