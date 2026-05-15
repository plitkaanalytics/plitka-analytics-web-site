export const metadata = { title: 'Про нас — PLITKA Analytics' };

export default function ProNasPage() {
  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>Про нас</strong> · PLITKA Analytics</div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="section__head">
            <h2 className="section__title">Про PLITKA Analytics</h2>
          </div>
          <p style={{ fontSize: '20px', fontFamily: 'var(--serif)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '32px', color: 'var(--navy)' }}>
            Незалежна група OSINT-аналітиків, що спеціалізується на моніторингу Чорноморського флоту РФ та суміжних загроз з 2022 року.
          </p>
          <p>Ми працюємо виключно з відкритими джерелами: супутниковими знімками Sentinel-2 і Planet Labs, даними AIS і ADS-B, портовими реєстрами, відкритими тендерами та фотоматеріалами з відкритих джерел.</p>
          <p>Наші матеріали цитували Reuters, BBC, Der Spiegel, Kyiv Independent та інші видання. Ми є членами мережі перевірених OSINT-партнерів EU DisinfoLab.</p>
          <div className="sidecard sidecard--blue" style={{ marginTop: '40px' }}>
            <h3>Зв&apos;яжіться з нами</h3>
            <p>Для передачі матеріалів або запиту на верифікацію: <strong>tip@plitka.analytics</strong></p>
            <p>Захищений канал: Signal <strong>@plitka</strong> · SecureDrop · PGP-ключ на сайті</p>
          </div>
        </div>
      </section>
    </>
  );
}
