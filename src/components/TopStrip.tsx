'use client';

import { useEffect, useState } from 'react';

export default function TopStrip() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('uk-UA', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).toUpperCase()
    );
  }, []);

  return (
    <div className="topstrip">
      <div className="topstrip__inner">
        <div>
          <span className="topstrip__dot" />
          В ефірі — оперативний моніторинг подій
        </div>
        <div>
          {dateStr && <span style={{ marginRight: '20px' }}>{dateStr}</span>}
          <a href="#">UA</a> · <a href="#" style={{ opacity: 0.5 }}>EN</a>
        </div>
      </div>
    </div>
  );
}
