import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  date: string;
  dek: string;
  authors: string[];
  project: string;
  projectCode: string;
  tags: string[];
  readingTime: number;
  category: string;
  leadImage?: string;
  leadMapUrl?: string;
}

export interface ArticleListItem extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleListItem {
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');
const articlesEnDir = path.join(process.cwd(), 'content/articles/en');

function dirForLocale(locale: 'uk' | 'en') {
  return locale === 'en' ? articlesEnDir : articlesDir;
}

function calcReadingTime(content: string): number {
  const text = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllArticles(locale: 'uk' | 'en' = 'uk'): ArticleListItem[] {
  const dir = dirForLocale(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      const readingTime = (data.readingTime as number | undefined) ?? calcReadingTime(content);
      return { slug, ...(data as ArticleFrontmatter), readingTime };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string, locale: 'uk' | 'en' = 'uk'): Article {
  const filePath = path.join(dirForLocale(locale), `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const readingTime = (data.readingTime as number | undefined) ?? calcReadingTime(content);
  return { slug, ...(data as ArticleFrontmatter), readingTime, content };
}

export function formatDate(dateStr: string, locale: 'uk' | 'en' = 'uk'): string {
  return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
