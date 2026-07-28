import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";

export default function Footer({ locale = "uk" }: { locale?: Locale }) {
  const base = locale === "en" ? "/en" : "";
  const t = locale === "en" ? dict.en : dict.uk;

  const navItems = [
    { href: `${base}/`,            label: t.nav.home },
    { href: `${base}/proekty`,     label: t.nav.projects },
    { href: `${base}/articles`,    label: t.nav.articles },
    { href: `${base}/spivpratsia`, label: t.nav.collab },
    { href: `${base}/pro-nas`,     label: t.nav.about },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <Link href={`${base}/`} className="logo">
            <img src="/images/plitka-logo.svg" alt="PLITKA" className="logo__img" />
          </Link>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <p className="footer__mission">
          Незалежна OSINT-аналітика війни в Україні. Працюємо з відкритими даними — супутниковими знімками, AIS, ADS-B, портовими реєстрами та геолокацією фото- й відеоматеріалів.
        </p>
        <p className="footer__meta">© 2026 PLITKA Analytics · Матеріали поширюються за ліцензією CC BY-NC 4.0</p>
      </div>
    </footer>
  );
}
