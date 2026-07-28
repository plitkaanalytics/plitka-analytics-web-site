import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export const metadata = { title: 'PLITKA Analytics — OSINT analysis of the war in Ukraine' };

export default function HomePageEN() {
  const articles = getAllArticles('en');
  const [hero, ...rest] = articles;

  return (
    <>
      {hero && (
        <section className="hero">
          {hero.leadImage && (
            <div className="hero__media">
              <img src={hero.leadImage} alt="" />
            </div>
          )}
          <div className="hero__content">
            <span className="eyebrow">{hero.category}</span>
            <h1><Link href={`/en/articles/${hero.slug}`}>{hero.title}</Link></h1>
            <Link href={`/en/articles/${hero.slug}`} className="hero__btn">
              Read
            </Link>
          </div>
        </section>
      )}

      <section className="section-investigations">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">More investigations</span>
          </div>
          <div className="cards">
            {rest.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                className={`card${a.leadImage ? ' card--photo' : ''}`}
                href={`/en/articles/${a.slug}`}
              >
                {a.leadImage && (
                  <img src={a.leadImage} alt="" className="card__media" />
                )}
                <span className="card__date">{formatDate(a.date, 'en', 'short')}</span>
                <span className="card__title">{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-about">
        <div className="wrap">
          <span className="eyebrow">About us</span>
          <div className="about-grid">
            <div className="about-text">
              <p className="is-lead">PLITKA Analytics is an independent OSINT team documenting Russia's naval infrastructure and logistics using open-source data.</p>
              <p>We work with satellite imagery, ship registries, AIS data and public procurement records. Every conclusion in our materials is sourced and independently verifiable.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
