import Link from 'next/link';
import { dict, type Locale } from '@/lib/i18n';

export default function Footer({ locale = 'uk' }: { locale?: Locale }) {
  const t = dict[locale];
  const base = locale === 'en' ? '/en' : '';
  const fl = t.footerLinks;

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href={`${base}/`} className="footer__logo logo" style={{ marginBottom: '16px' }}>
            <div className="logo__sq" />
            <div className="logo__stack">
              <div className="logo__word">PLITKA</div>
              <div className="logo__sub">ANALYTICS</div>
            </div>
          </Link>
          <p>{t.footerDesc}</p>
        </div>
        <div>
          <h4>{t.footerSections}</h4>
          <ul>
            <li><Link href={`${base}/`}>{fl.home}</Link></li>
            <li><Link href={`${base}/proekty`}>{fl.projects}</Link></li>
            <li><Link href={`${base}/articles`}>{fl.articles}</Link></li>
            <li><Link href="#">{fl.archive}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t.footerTeam}</h4>
          <ul>
            <li><Link href={`${base}/pro-nas`}>{fl.about}</Link></li>
            <li><Link href={`${base}/spivpratsia`}>{fl.collab}</Link></li>
            <li><Link href="#">{fl.methodology}</Link></li>
            <li><Link href="#">{fl.contacts}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t.footerContact}</h4>
          <ul>
            <li>plitka.analytic@gmail.com</li>
            <li>Signal · @plitka</li>
            <li>SecureDrop</li>
            <li>PGP key</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__tag">{t.footerTagline}</span>
        <span>© PLITKA Analytics · CC BY-NC 4.0</span>
      </div>
    </footer>
  );
}
