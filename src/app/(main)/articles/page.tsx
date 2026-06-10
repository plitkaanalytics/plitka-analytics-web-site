import Link from 'next/link';
import { getAllArticles, formatDate } from '@/lib/articles';

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

  const activeProjectTitle = projectFilter
    ? groups.get(projectFilter)?.title ?? 'Невідомий проєкт'
    : null;

  return (
    <>
      <div className="substrip">
        <div className="substrip__inner">
          <div>
            <strong>Розслідування</strong>
            {activeProjectTitle ? (
              <> · {activeProjectTitle}</>
            ) : (
              <> · Усі матеріали</>
            )}
          </div>
          <div className="substrip__actions">
            {projectFilter && (
              <Link href="/articles" className="substrip__clear">← Усі проєкти</Link>
            )}
            <span>{filtered.length} {filtered.length === 1 ? 'матеріал' : 'матеріалів'}</span>
          </div>
        </div>
      </div>

      {Array.from(groups.values()).map(({ code, title, articles }) => (
        <section className="section" key={code} id={`project-${code}`}>
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">{title}</h2>
              <span className="section__more">{code}</span>
            </div>
            <div className="articles-grid">
              {articles.map((a) => (
                <article className="card card--link" key={a.slug}>
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
                    <Link href={`/articles/${a.slug}`} className="stretched-link">{a.title}</Link>
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
      ))}

      {filtered.length === 0 && (
        <section className="section">
          <div className="container">
            <p style={{ color: 'var(--slate)' }}>Матеріалів не знайдено.</p>
          </div>
        </section>
      )}
    </>
  );
}
