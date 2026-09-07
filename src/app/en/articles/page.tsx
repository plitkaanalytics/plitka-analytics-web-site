import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

export const metadata = { title: 'Investigations — PLITKA Analytics' };

export default async function ArticlesPageEN({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project: projectFilter } = await searchParams;

  const all = getAllArticles('en');
  const filtered = projectFilter
    ? all.filter((a) => a.projectCode === projectFilter)
    : all;

  const groups = new Map<string, { code: string; title: string; articles: typeof filtered }>();
  filtered.forEach((a) => {
    const g = groups.get(a.projectCode);
    if (g) {
      g.articles.push(a);
    } else {
      groups.set(a.projectCode, { code: a.projectCode, title: a.project, articles: [a] });
    }
  });

  return (
    <>
      {Array.from(groups.values()).map(({ code, title, articles }) => (
        <section className="section" key={code} id={`project-${code}`}>
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">{title}</h2>
              <span className="section__more">{code}</span>
            </div>

            <div className="articles-grid">
              {articles.map((a) => (
                <article className="card" key={a.slug}>
                  {a.leadImage && (
                    <img src={a.leadImage} alt={a.title} className="card__img card__img--photo" />
                  )}
                  <div><span className="card__tag">{a.project}</span></div>
                  <h3 className="card__title">
                    <Link href={`/en/articles/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="card__dek">{a.dek}</p>
                  <div className="card__meta">
                    <span>{formatDate(a.date, 'en')}</span>
                    <span>{a.authors.map((n) => n.split(' ').at(-1)?.toUpperCase()).join(' · ')}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <section className="section">
          <div className="container">
            <p style={{ color: 'var(--slate)' }}>No materials found.</p>
          </div>
        </section>
      )}
    </>
  );
}
