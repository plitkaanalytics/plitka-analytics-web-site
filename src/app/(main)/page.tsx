import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export default function HomePage() {
  const articles = getAllArticles();
  const [hero, ...rest] = articles;

  // Derive unique projects from actual articles
  const projectMap = new Map<string, { code: string; title: string; count: number }>();
  articles.forEach((a) => {
    const existing = projectMap.get(a.project);
    if (existing) {
      existing.count++;
    } else {
      projectMap.set(a.project, { code: a.projectCode, title: a.project, count: 1 });
    }
  });
  const projects = Array.from(projectMap.values());

  return (
    <>
      {/* Sub strip */}
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>OSINT-моніторинг</strong> · Війна в Україні · Чорноморський регіон</div>
          <div>Оновлено: <strong>{hero ? formatDate(hero.date) : ''}</strong></div>
        </div>
      </div>

      {/* Hero */}
      {hero && (
        <section className="hero">
          <div className="container">
            <div className="hero__grid">
              <article className="hero__lead">
                {hero.leadMapUrl ? (
                  <>
                    <div className="lead-map" style={{
                      marginBottom: '24px',
                      borderTop: '3px solid var(--navy)',
                      overflow: 'hidden',
                    }}>
                      <iframe
                        src={hero.leadMapUrl}
                        title={hero.title}
                        style={{ width: '100%', height: '447px', display: 'block', border: 'none' }}
                        scrolling="no"
                      />
                    </div>
                    {hero.leadImage && (
                      <div className="lead-map-mobile" style={{ marginBottom: '24px' }}>
                        <img src={hero.leadImage} alt={hero.title} style={{ width: '100%', display: 'block' }} />
                        <p className="lead-map-mobile__note">Інтерактивна хронологія доступна лише на десктопі</p>
                      </div>
                    )}
                  </>
                ) : hero.leadImage ? (
                  <img src={hero.leadImage} alt={hero.title} style={{ width: '100%', display: 'block', marginBottom: '24px' }} />
                ) : (
                  <div className="ph ph__cross" style={{ aspectRatio: '16/9', marginBottom: '24px' }}>
                    <span className="ph__corners" />
                    <div className="ph__label">РОЗСЛІДУВАННЯ · {hero.projectCode}</div>
                  </div>
                )}
                <div className="hero__eyebrow">
                  <span className="chip chip--red">{hero.category}</span>
                  <span className="mono">{hero.projectCode}</span>
                  <span className="mono">{formatDate(hero.date)}</span>
                </div>
                <h1 className="hero__title">
                  <Link href={`/articles/${hero.slug}`}>{hero.title}</Link>
                </h1>
                <p className="hero__dek">{hero.dek}</p>
                <div className="hero__byline">
                  <span>
                    <strong>{hero.authors[0]}</strong>
                    {hero.authors[1] ? `, ${hero.authors[1]}` : ''}
                  </span>
                  <span>· {hero.readingTime} хв читання</span>
                </div>
              </article>

              <aside className="hero__side" aria-label="Останні матеріали">
                <div className="hero__sidehead">
                  <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--red)', marginRight: 8, verticalAlign: 'middle' }} />
                  НОВІ МАТЕРІАЛИ
                </div>
                {rest.slice(0, 4).map((a) => (
                  <div className="briefitem" key={a.slug}>
                    <div className="briefitem__meta">
                      <span className="tag">{a.tags[0]}</span>
                      <span>{formatDate(a.date)}</span>
                    </div>
                    <h3 className="briefitem__title">
                      <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <div className="briefitem__loc">{a.projectCode}</div>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Active projects strip */}
      {projects.length > 0 && (
        <section className="section" style={{ paddingTop: '48px' }}>
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Активні напрямки</h2>
              <Link href="/proekty" className="section__more">Усі проєкти →</Link>
            </div>
            <div className="projects-strip">
              {projects.map(({ code, title, count }) => (
                <Link key={code} href="/proekty" className="ptile ptile--accent">
                  <span className="ptile__code">{code}</span>
                  <div className="ptile__title">{title}</div>
                  <span className="ptile__count">{count} {count === 1 ? 'матеріал' : 'матеріали'}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest articles grid */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Останні матеріали</h2>
            <Link href="/articles" className="section__more">Архів →</Link>
          </div>
          <div className="grid-3">
            {articles.slice(0, 6).map((a) => (
              <article className="card" key={a.slug}>
                {a.leadImage ? (
                  <img src={a.leadImage} alt={a.title} className="card__img card__img--photo" />
                ) : (
                  <div className="ph ph__cross card__img">
                    <span className="ph__corners" />
                    <div className="ph__label">{a.projectCode}</div>
                  </div>
                )}
                <div>
                  <span className="card__tag">{a.project}</span>
                </div>
                <h3 className="card__title">
                  <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                </h3>
                <p className="card__dek">{a.dek}</p>
                <div className="card__meta">
                  <span>{formatDate(a.date)}</span>
                  <span>{a.authors[0].split(' ').at(-1)?.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
