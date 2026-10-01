import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Карта до § 03: розвилка на Волзі під Волгоградом.
 *
 * Полотно малює scripts/build-route-shift-map.mjs. Там же лежить перевірка,
 * яка не дає морським ділянкам вилізти на суходіл: обидва плеча проходять її
 * чисто, тож по карті можна міряти.
 *
 * Кадр широкий — від Керченської протоки до туркменського берега, — тому
 * вставка йде на всю ширину смуги (fig--bleed у самій статті), а ширину тут
 * не ріжемо.
 *
 * Читається на збірці, не в запиті: компонент серверний.
 */
const SVG = readFileSync(
  join(process.cwd(), "public/articles/rezervne-more/route-shift.svg"),
  "utf8",
);

export default function RouteShiftMap() {
  return <div dangerouslySetInnerHTML={{ __html: SVG }} />;
}
