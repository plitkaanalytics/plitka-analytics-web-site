import { getAllArticles } from '@/lib/articles';

export const metadata = { title: 'Projects — PLITKA Analytics' };

export default function ProjectsPageEN() {
  const articles = getAllArticles('en');

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
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Active projects</h2>
          </div>
          <div className="projects-strip" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {projects.map(({ code, title, count }) => (
              <div key={code} className="ptile ptile--accent">
                <span className="ptile__code">{code}</span>
                <div className="ptile__title">{title}</div>
                <span className="ptile__count">{count} {count === 1 ? 'article' : 'articles'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
