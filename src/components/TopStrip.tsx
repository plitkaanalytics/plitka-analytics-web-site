'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TopStrip() {
  const [dateStr, setDateStr] = useState('');
  const pathname = usePathname();
  const isEN = pathname.startsWith('/en');

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString(isEN ? 'en-US' : 'uk-UA', {
        weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
      }).toUpperCase()
    );
  }, [isEN]);

  function otherLocaleHref() {
    if (isEN) {
      const without = pathname.slice(3) || '/';
      return without.match(/^\/articles\/.+/) ? '/articles' : without;
    }
    return pathname.match(/^\/articles\/.+/) ? '/en/articles' : `/en${pathname}`;
  }

  return (
    <div className="topstrip">
      <div className="topstrip__inner">
        <div>PLITKA Analytics</div>
        <div>
          {dateStr && <span style={{ marginRight: '20px' }}>{dateStr}</span>}
          <Link href={isEN ? otherLocaleHref() : pathname} style={isEN ? { opacity: 0.5 } : {}}>UA</Link>
          {' · '}
          <Link href={isEN ? pathname : otherLocaleHref()} style={isEN ? {} : { opacity: 0.5 }}>EN</Link>
        </div>
      </div>
    </div>
  );
}
