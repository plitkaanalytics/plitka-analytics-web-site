import "./kalibre-z-morya.css";
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug, getArticleData, formatDate } from '@/lib/articles';
import VideoCarousel from '@/components/VideoCarousel';
import ShipChronology, { type ChronologyData } from '@/components/ShipChronology';

const SLUG = 'kalibre-z-morya';

function Methodology({ children }: { children: ReactNode }) {
  return <div className="methodology">{children}</div>;
}

function StatGrid({ v1, l1, d1, v2, l2, d2, v3, l3, d3, v4, l4, d4 }: {
  v1: string; l1: string; d1: string;
  v2: string; l2: string; d2: string;
  v3: string; l3: string; d3: string;
  v4: string; l4: string; d4: string;
}) {
  return (
    <div className="stat-2col">
      {[
        { v: v1, l: l1, d: d1 },
        { v: v2, l: l2, d: d2 },
        { v: v3, l: l3, d: d3 },
        { v: v4, l: l4, d: d4 },
      ].map(({ v, l, d }) => (
        <div className="stat-2col__cell" key={l}>
          <div className="stat-2col__num">{v}</div>
          <div className="stat-2col__lbl">{l}</div>
          <p className="stat-2col__dek">{d}</p>
        </div>
      ))}
    </div>
  );
}

function Pullquote({ children, cite }: { children: ReactNode; cite: string }) {
  return (
    <blockquote className="pullquote">
      {children}
      <cite className="pullquote__cite">{cite}</cite>
    </blockquote>
  );
}

function Figure({ url, label, cap, src, dark }: {
  url?: string | null;
  label: string;
  cap: string;
  src?: string;
  dark?: boolean;
}) {
  return (
    <div className="figure">
      {url ? (
        <img src={url} alt={cap} loading="lazy" style={{ width: '100%', display: 'block' }} />
      ) : (
        <div className={`ph ph__cross${dark ? ' ph--dark' : ''}`} style={{ aspectRatio: '16/9' }}>
          <span className="ph__corners" />
          <div className="ph__label">{label}</div>
        </div>
      )}
      <div className="figure__cap">
        <span>{cap}</span>
        {src && <span>{src}</span>}
      </div>
    </div>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="callout">
      {title && <div className="callout__title">{title}</div>}
      {children}
    </div>
  );
}

function Barchart({ title, sub, data }: { title: string; sub: string; data: string }) {
  const bars = data.split(',').map((entry) => {
    const [lbl, pct, color] = entry.split('|');
    return { lbl: lbl.trim(), pct: Number(pct.trim()), color: (color ?? '').trim() };
  });
  return (
    <div className="barchart">
      <div className="barchart__title">{title}</div>
      <div className="barchart__sub">{sub}</div>
      {bars.map(({ lbl, pct, color }) => (
        <div className="bar" key={lbl}>
          <span className="bar__lbl">{lbl}</span>
          <div className="bar__bg">
            <div className={`bar__fill${color ? ` bar__fill--${color}` : ''}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="bar__val">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

const mdxComponents = { Methodology, StatGrid, Pullquote, Figure, Barchart, Callout, VideoCarousel };

export async function generateMetadata(): Promise<Metadata> {
  const article = getArticleBySlug(SLUG);
  return { title: `${article.title} — PLITKA Analytics` };
}

export default async function KalibreZMoryaPage() {
  const article = getArticleBySlug(SLUG);
  const all = getAllArticles();
  const related = all.filter((a) => a.slug !== SLUG).slice(0, 3);
  const articleData = getArticleData(SLUG);

  const ReadingTime = () => <span>{article.readingTime} хв читання</span>;
  const BoundShipChronology = articleData
    ? () => <ShipChronology data={articleData as ChronologyData} />
    : () => null;
  const components = { ...mdxComponents, ReadingTime, ShipChronology: BoundShipChronology };

  return (
    <main>
      <div className="article-head">
        <span className="eyebrow article-head__eyebrow">Розслідування</span>
        <h1>{article.title}</h1>
        <p className="article-head__metaline">
          Час читання {article.readingTime} хв
        </p>
        <p className="article-head__dek">{article.dek}</p>
      </div>

      <div className="lead-img">
        {article.leadMapUrl ? (
          <iframe
            src={article.leadMapUrl}
            style={{ width: '100%', height: '520px', display: 'block', border: 'none' }}
            title={article.title}
          />
        ) : article.leadImage ? (
          <img src={article.leadImage} alt={article.title} style={{ width: '100%', display: 'block' }} />
        ) : (
          <div className="ph ph__cross ph--dark">
            <span className="ph__corners" />
            <div className="ph__label">СУПУТНИКОВИЙ ЗНІМОК · {article.projectCode}</div>
          </div>
        )}
      </div>

      <article className="article-body">
        <MDXRemote source={article.content} components={components} />
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">Інші матеріали</h2>
              <Link href="/articles" className="section__more">Архів →</Link>
            </div>
            <div className="grid-3">
              {related.map((a) => (
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
      )}
    </main>
  );
}

