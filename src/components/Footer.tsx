import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";

export default function Footer({ locale = "uk" }: { locale?: Locale }) {
  const base = locale === "en" ? "/en" : "";
  const t = locale === "en" ? dict.en : dict.uk;

  const navItems = [
    { href: `${base}/`,            label: t.nav.home },
    { href: `${base}/articles`,    label: t.nav.articles },
    { href: `${base}/spivpratsia`, label: t.nav.collab },
    { href: `${base}/pro-nas`,     label: t.nav.about },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__main">
          <div className="footer__logo">
            <Link href={`${base}/`} className="logo">
              <img src="/images/plitka-logo.svg" alt="PLITKA" className="logo__img" />
            </Link>
          </div>
          <p className="footer__mission">{t.footerDesc}</p>
          <p className="footer__meta">{t.footerMeta}</p>
        </div>
        <div className="footer__divider" />
        <nav className="footer__nav" aria-label="Footer navigation">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
