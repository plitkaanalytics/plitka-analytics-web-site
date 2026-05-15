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
  sources: number;
  category: string;
}

export interface ArticleListItem extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleListItem {
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): ArticleListItem[] {
  const files = fs.readdirSync(articlesDir);
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...(data as ArticleFrontmatter) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article {
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, ...(data as ArticleFrontmatter), content };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
