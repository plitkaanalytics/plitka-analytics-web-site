export const metadata = { title: 'About Us — PLITKA Analytics' };

export default function AboutPageEN() {
  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div>
            <strong>About us</strong> · PLITKA Analytics
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="section__head">
            <h2 className="section__title">About PLITKA Analytics</h2>
          </div>
          <p
            style={{
              fontSize: '20px',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: '32px',
              color: 'var(--navy)',
            }}
          >
            PLITKA Analytics is a volunteer community of OSINT analysts and journalists
            formed with a single purpose — resisting Russian aggression.
          </p>
          <p>
            We have supported Ukraine&apos;s Defence Forces since 2022, working exclusively
            with open sources: Sentinel-2 and Planet Labs satellite imagery, AIS and
            ADS-B data, registries, public procurement records, and open-source photography.
          </p>
          <div
            className="sidecard sidecard--blue"
            style={{ marginTop: '40px' }}
          >
            <h3>Contact us</h3>
            <p>
              To submit materials or request verification:{' '}
              <strong>plitka.analytic@gmail.com</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
