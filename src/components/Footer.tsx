import Link from "next/link";
import { type Locale } from "@/lib/i18n";

export default function Footer({ locale = "uk" }: { locale?: Locale }) {
  const base = locale === "en" ? "/en" : "";

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <span className="footer__fish" />
          <Link href={`${base}/`} className="logo">PLITKA</Link>
        </div>
        <p className="footer__mission">
          Незалежна OSINT-аналітика війни в Україні. Працюємо з відкритими даними — супутниковими знімками, AIS, ADS-B, портовими реєстрами та геолокацією фото- й відеоматеріалів.
        </p>
        <p className="footer__meta">© 2026 PLITKA Analytics · Матеріали поширюються за ліцензією CC BY-NC 4.0</p>
      </div>
    </footer>
  );
}
