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
const read = (f: string) =>
  readFileSync(join(process.cwd(), "public/articles/rezervne-more", f), "utf8");

const SVG: Record<"uk" | "en", string> = {
  uk: read("route-shift.svg"),
  en: read("route-shift-en.svg"),
};

export default function RouteShiftMap({ lang = "uk" }: { lang?: "uk" | "en" }) {
  return <div dangerouslySetInnerHTML={{ __html: SVG[lang] }} />;
}
