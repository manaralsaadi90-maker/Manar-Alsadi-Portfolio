import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CASE_DIR = path.join(process.cwd(), 'src/content/case-studies');

export type CaseStudyMeta = {
  slug: string;
  title: string;
};

/** Returns the raw MDX (with frontmatter stripped) for a project slug, or null. */
export function getCaseStudySource(slug: string): { content: string; data: Record<string, unknown> } | null {
  const file = path.join(CASE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { content, data } = matter(raw);
  return { content, data };
}

/** All case-study slugs that have an MDX file (used for static generation). */
export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_DIR)) return [];
  return fs
    .readdirSync(CASE_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
