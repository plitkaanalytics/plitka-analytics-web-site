import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href="/" className="footer__logo logo" style={{ marginBottom: '16px' }}>
            <div className="logo__sq" />
            <div className="logo__stack">
              <div className="logo__word">PLITKA</div>
              <div className="logo__sub">ANALYTICS</div>
            </div>
          </Link>
          <p>
            Незалежна OSINT-аналітика війни в Україні. Працюємо з відкритими даними —
            супутниковими знімками, AIS, ADS-B, портовими реєстрами та геолокацією
            фото- й відеоматеріалів.
          </p>
        </div>
        <div>
          <h4>Розділи</h4>
          <ul>
            <li><Link href="/">Головна</Link></li>
            <li><Link href="/proekty">Проєкти</Link></li>
            <li><Link href="/articles">Розслідування</Link></li>
            <li><Link href="#">Архів</Link></li>
          </ul>
        </div>
        <div>
          <h4>Команда</h4>
          <ul>
            <li><Link href="/pro-nas">Про нас</Link></li>
            <li><Link href="/spivpratsia">Співпраця</Link></li>
            <li><Link href="#">Методологія</Link></li>
            <li><Link href="#">Контакти</Link></li>
          </ul>
        </div>
        <div>
          <h4>Зв&apos;язок</h4>
          <ul>
            <li>tip@plitka.analytics</li>
            <li>Signal · @plitka</li>
            <li>SecureDrop</li>
            <li>PGP-ключ</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__tag">Ракетоносці Чорного моря і Каспію · 2022–2026</span>
        <span>© PLITKA Analytics · CC BY-NC 4.0</span>
      </div>
    </footer>
  );
}
