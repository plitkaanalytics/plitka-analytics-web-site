export const metadata = { title: "Співпраця — PLITKA Analytics" };

export default function SpivpratsiaPage() {
  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div>
            <strong>Співпраця</strong> · Партнерства та запити
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: "880px" }}>
          <div className="section__head">
            <h2 className="section__title">Співпраця</h2>
          </div>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            Ми відкриті до співпраці з журналістами, редакціями та
            дослідницькими організаціями.
          </p>

          <div className="grid-2" style={{ marginBottom: "40px" }}>
            <div className="sidecard sidecard--cream">
              <h3>Для журналістів</h3>
              <p>
                Верифікація знімків і геолокації, надання контексту для
                публікацій, спільні розслідування. Звертайтесь на{" "}
                <strong>plitka.analytic@gmail.com</strong>
              </p>
            </div>
            <div className="sidecard sidecard--blue">
              <h3>Для редакцій</h3>
              <p>
                Ліцензування матеріалів, ексклюзивні права на публікацію,
                технічна підтримка при роботі з OSINT-даними. Звертайтесь на{" "}
                <strong>plitka.analytic@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
