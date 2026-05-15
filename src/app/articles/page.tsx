import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export const metadata = {
  title: 'Розслідування — PLITKA Analytics',
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>Розслідування</strong> · Усі матеріали</div>
          <div>{articles.length} матеріалів</div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Всі розслідування</h2>
          </div>
          <div className="articles-grid">
            {articles.map((a) => (
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
                  <span>{a.authors.map((n) => n.split(' ').at(-1)?.toUpperCase()).join(' · ')}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
