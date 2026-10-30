import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  links?: string[];
};

const dir = path.join(process.cwd(), "content", "posts");

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(/\.md$/, ""), ...(data as Omit<PostMeta, "slug">) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const toc: { id: string; text: string }[] = [];
  const html = (marked.parse(content) as string).replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugify(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { meta: { slug, ...(data as Omit<PostMeta, "slug">) }, html, toc, words: content.split(/\s+/).length };
}

export function getCategories() {
  const m = new Map<string, number>();
  getAllPosts().forEach((p) => m.set(p.category, (m.get(p.category) || 0) + 1));
  return Array.from(m, ([name, count]) => ({ name, count, slug: slugify(name) }));
}
