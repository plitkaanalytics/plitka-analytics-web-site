export const metadata = { title: "Про нас — PLITKA Analytics" };

export default function ProNasPage() {
  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div>
            <strong>Про нас</strong> · PLITKA Analytics
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: "880px" }}>
          <div className="section__head">
            <h2 className="section__title">Про PLITKA Analytics</h2>
          </div>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              lineHeight: 1.5,
              marginBottom: "32px",
              color: "var(--navy)",
            }}
          >
            PLITKA Analytics - це спільнота OSINT-аналітиків та журналістів, що
            була утворилася на волонтерських засадах з єдиною метою - спротиву
            російської агресії.
          </p>
          <p>
            Ми допомагаємо Силами Оборони України з 2022 року та працюємо
            виключно з відкритими джерелами: супутниковими знімками Sentinel-2 і
            Planet Labs, даними AIS і ADS-B, реєстрами, відкритими тендерами та
            фотоматеріалами з відкритих джерел.
          </p>
          <div
            className="sidecard sidecard--blue"
            style={{ marginTop: "40px" }}
          >
            <h3>Зв&apos;яжіться з нами</h3>
            <p>
              Для передачі матеріалів або запиту на верифікацію:{" "}
              <strong>plitka.analytic@gmail.com</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
