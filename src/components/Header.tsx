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
    { href: `${base}/`,           label: t.nav.home },
    { href: `${base}/proekty`,    label: t.nav.projects },
    { href: `${base}/articles`,   label: t.nav.articles },
    { href: `${base}/pro-nas`,    label: t.nav.about },
    { href: `${base}/spivpratsia`,label: t.nav.collab },
  ];

  return (
    <header className="header">
      <div className="header__inner">
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
        <Link href={`${base}/`} className="logo" aria-label="PLITKA Analytics">
          <img src="/images/logo-navy.svg" alt="PLITKA Analytics" className="logo__img" />
        </Link>
      </div>
    </header>
  );
}
