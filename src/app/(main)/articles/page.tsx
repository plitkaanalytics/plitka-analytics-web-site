import Link from 'next/link';
import { getAllArticles, formatDate, groupByProject } from '@/lib/articles';

export const metadata = {
  title: 'Розслідування — PLITKA Analytics',
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project: projectFilter } = await searchParams;

  const all = getAllArticles();
  const groups = groupByProject(all).filter(
    (g) => !projectFilter || g.code === projectFilter,
  );

  return (
    <>
      {groups.map(({ code, title, articles }) => (
        <section className="section" key={code} id={`project-${code}`}>
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">{title}</h2>
              <span className="section__more">{code}</span>
            </div>
            <div className="articles-grid">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className={`card${a.leadImage ? ' card--photo' : ''}`}
                >
                  {a.leadImage && (
                    <img src={a.leadImage} alt="" className="card__media" />
                  )}
                  <span className="card__date">{formatDate(a.date)}</span>
                  <span className="card__title">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <section className="section">
          <div className="container">
            <p style={{ color: 'var(--slate)' }}>Матеріалів не знайдено.</p>
          </div>
        </section>
      )}
    </>
  );
}
