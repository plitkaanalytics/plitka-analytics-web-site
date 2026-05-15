'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Головна' },
  { href: '/proekty', label: 'Проєкти' },
  { href: '/articles', label: 'Розслідування' },
  { href: '/pro-nas', label: 'Про нас' },
  { href: '/spivpratsia', label: 'Співпраця' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header__inner">
        <nav className="nav" aria-label="Головна навігація">
          {navItems.map(({ href, label }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={isActive ? 'is-current' : ''}>
                {label}
              </Link>
            );
          })}
        </nav>
        <Link href="/" className="logo" aria-label="PLITKA Analytics — на головну">
          <div className="logo__sq" />
          <div className="logo__stack">
            <div className="logo__word">PLITKA</div>
            <div className="logo__sub">ANALYTICS</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
