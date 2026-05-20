import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export const metadata = {
  title: 'Розслідування — PLITKA Analytics',
};

const PER_PAGE = 12;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? '1') || 1);

  const all = getAllArticles();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const articles = all.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div><strong>Розслідування</strong> · Усі матеріали</div>
          <div>{all.length} матеріалів</div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Всі розслідування</h2>
            {totalPages > 1 && (
              <span className="section__more">
                Сторінка {safePage} з {totalPages}
              </span>
            )}
          </div>

          <div className="articles-grid">
            {articles.map((a) => (
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
                  <span>{a.authors.map((n) => n.split(' ').at(-1)?.toUpperCase()).join(' · ')}</span>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {safePage > 1 ? (
                <Link href={`/articles?page=${safePage - 1}`} className="pagination__btn">
                  ← Попередня
                </Link>
              ) : (
                <span className="pagination__btn pagination__btn--disabled">← Попередня</span>
              )}

              <div className="pagination__pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/articles?page=${p}`}
                    className={`pagination__num${p === safePage ? ' pagination__num--active' : ''}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              {safePage < totalPages ? (
                <Link href={`/articles?page=${safePage + 1}`} className="pagination__btn">
                  Наступна →
                </Link>
              ) : (
                <span className="pagination__btn pagination__btn--disabled">Наступна →</span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
