import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';
import NewsletterForm from '@/components/NewsletterForm';

export default function HomePage() {
  const articles = getAllArticles();
  const [hero, ...rest] = articles;

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
                <div className="ph ph__cross" style={{ aspectRatio: '16/9', marginBottom: '24px' }}>
                  <span className="ph__corners" />
                  <div className="ph__label">РОЗСЛІДУВАННЯ · {hero.projectCode}</div>
                </div>
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
                  <span>· {hero.sources} джерел</span>
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
      <section className="section" style={{ paddingTop: '48px' }}>
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Активні напрямки</h2>
            <Link href="/proekty" className="section__more">Усі проєкти →</Link>
          </div>
          <div className="projects-strip">
            {[
              { code: 'P-01 · РАКЕТИ', title: 'Ракетна загроза ЧФ', count: '68 матеріалів', cls: 'ptile--accent' },
              { code: 'P-02 · ФРЕГАТИ', title: 'Переміщення кораблів', count: '142 матеріали', cls: '' },
              { code: 'P-03 · ПОРТИ', title: 'Супутникові знімки баз', count: '94 матеріали', cls: 'ptile--blue' },
              { code: 'P-04 · ДРОНИ', title: 'Ударні БпЛА', count: '53 матеріали', cls: '' },
              { code: 'P-05 · АВІАЦІЯ', title: 'Тактична авіація РФ', count: '31 матеріал', cls: '' },
            ].map(({ code, title, count, cls }) => (
              <Link key={code} href="/proekty" className={`ptile ${cls}`}>
                <span className="ptile__code">{code}</span>
                <div className="ptile__title">{title}</div>
                <span className="ptile__count">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                <div className="ph ph__cross card__img">
                  <span className="ph__corners" />
                  <div className="ph__label">{a.projectCode}</div>
                </div>
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

      {/* Stats */}
      <section className="section" style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="stats">
            <div className="stat">
              <div className="stat__num">418</div>
              <div className="stat__lbl">Розслідувань опубліковано</div>
            </div>
            <div className="stat">
              <div className="stat__num">73<small> ТБ</small></div>
              <div className="stat__lbl">Супутникових знімків оброблено</div>
            </div>
            <div className="stat">
              <div className="stat__num">12</div>
              <div className="stat__lbl">Активних проєктів</div>
            </div>
            <div className="stat">
              <div className="stat__num" style={{ fontSize: '32px', lineHeight: '1.1' }}>2022—<br />2026</div>
              <div className="stat__lbl">Безперервної роботи</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter__grid">
            <div>
              <span className="eyebrow eyebrow--rust">ЩОТИЖНЕВИЙ БРИФІНГ</span>
              <h2 style={{ marginTop: '8px' }}>Дайджест PLITKA — щочетверга, 09:00</h2>
              <p>Топ-розслідування тижня, нові набори даних, джерела що відкрилися. Без шуму, без реклами. 4 200 підписників.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
