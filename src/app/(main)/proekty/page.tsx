import Link from 'next/link';
import { getAllArticles, groupByProject } from '@/lib/articles';

export const metadata = { title: 'Проєкти — PLITKA Analytics' };

export default function ProektyPage() {
  const articles = getAllArticles();

  const projects = groupByProject(articles).map(({ code, title, articles: list }) => ({
    code,
    title,
    count: list.length,
  }));

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Активні проєкти</h2>
          </div>
          <div className="projects-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {projects.map(({ code, title, count }) => (
              <Link key={code} href={`/articles?project=${encodeURIComponent(code)}`} className="ptile ptile--accent ptile--link">
                <span className="ptile__code">{code}</span>
                <div className="ptile__title">{title}</div>
                <span className="ptile__count">{count} {count === 1 ? 'матеріал' : 'матеріали'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
