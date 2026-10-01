import Publications, { PartnerGrid } from '@/components/Publications';

export const metadata = { title: 'Partner with us — PLITKA Analytics' };

export default function PartnerPageEN() {
  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="section__head">
            <h2 className="section__title">Partner with us</h2>
          </div>
          <p
            style={{
              fontSize: '20px',
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: '32px',
            }}
          >
            Our material runs in partner outlets, and our analysts comment for
            the media.
          </p>
          <PartnerGrid locale="en" />
        </div>
      </section>

      <Publications locale="en" />

      <section className="section">
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="section__head">
            <h2 className="section__title">Get in touch</h2>
          </div>
          <p style={{ marginBottom: '28px' }}>
            We are open to collaboration with journalists, editorial teams, and
            research organisations.
          </p>
          <div className="grid-2">
            <div className="sidecard sidecard--cream">
              <h3>For journalists</h3>
              <p>
                Verification of imagery and geolocation, contextual support for
                publications, joint investigations. Contact us at{' '}
                <strong>plitka.analytic@gmail.com</strong>
              </p>
            </div>
            <div className="sidecard sidecard--blue">
              <h3>For editorial teams</h3>
              <p>
                Material licensing, exclusive publication rights, technical
                support for OSINT data work. Contact us at{' '}
                <strong>plitka.analytic@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
