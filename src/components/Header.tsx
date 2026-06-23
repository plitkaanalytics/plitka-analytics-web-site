'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dict } from '@/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const isEN = pathname.startsWith('/en');
  const base = isEN ? '/en' : '';
  const t = isEN ? dict.en : dict.uk;

  const navItems = [
    { href: `${base}/`,            label: t.nav.home },
    { href: `${base}/proekty`,     label: t.nav.projects },
    { href: `${base}/articles`,    label: t.nav.articles },
    { href: `${base}/pro-nas`,     label: t.nav.about },
    { href: `${base}/spivpratsia`, label: t.nav.collab },
  ];

  function otherLocaleHref() {
    if (isEN) {
      const without = pathname.slice(3) || '/';
      return without.match(/^\/articles\/.+/) ? '/articles' : without;
    }
    return pathname.match(/^\/articles\/.+/) ? '/en/articles' : `/en${pathname}`;
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link href={`${base}/`} className="logo">
          PLITKA
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map(({ href, label }) => {
            const isActive = href === `${base}/`
              ? pathname === `${base}/` || pathname === base
              : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={isActive ? 'is-current' : ''}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="lang-switch">
          <Link
            href={isEN ? otherLocaleHref() : pathname}
            className={`lang-pill${!isEN ? ' is-active' : ''}`}
          >
            UA
          </Link>
          <Link
            href={isEN ? pathname : otherLocaleHref()}
            className={`lang-pill${isEN ? ' is-active' : ''}`}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}
