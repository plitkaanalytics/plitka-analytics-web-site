'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dict } from '@/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const isEN = pathname.startsWith('/en');
  const base = isEN ? '/en' : '';
  const t = isEN ? dict.en : dict.uk;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = [
    { href: `${base}/`,            label: t.nav.home },
    { href: `${base}/articles`,    label: t.nav.articles },
    { href: `${base}/spivpratsia`, label: t.nav.collab },
    { href: `${base}/pro-nas`,     label: t.nav.about },
  ];

  function otherLocaleHref() {
    if (isEN) {
      const without = pathname.slice(3) || '/';
      return without.match(/^\/articles\/.+/) ? '/articles' : without;
    }
    return pathname.match(/^\/articles\/.+/) ? '/en/articles' : `/en${pathname}`;
  }

  function isActive(href: string) {
    return href === `${base}/`
      ? pathname === `${base}/` || pathname === base
      : pathname.startsWith(href);
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link href={`${base}/`} className="logo">
          <img src="/images/plitka-logo.svg" alt="PLITKA" className="logo__img" />
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={isActive(href) ? 'is-current' : ''}>
              {label}
            </Link>
          ))}
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

        <button
          type="button"
          className={`nav-toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? (isEN ? 'Close menu' : 'Закрити меню') : (isEN ? 'Open menu' : 'Відкрити меню')}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={isActive(href) ? 'is-current' : ''}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__langs">
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
