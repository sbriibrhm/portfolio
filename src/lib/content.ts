import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
  readingTime: string;
  filepath: string;
}

const projectRoot = process.cwd();

function readDirectory(kind: "blog" | "projects"): string[] {
  const baseDir = path.join(projectRoot, "content", kind);
  if (!fs.existsSync(baseDir)) return [];
  return fs
    .readdirSync(baseDir)
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => path.join(baseDir, filename));
}

function parseFile(filepath: string): ContentItem {
  const source = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(source);
  const stats = readingTime(content);
  const slug = path.basename(filepath).replace(/\.mdx?$/, "");

  return {
    slug,
    title: (data as any).title || slug,
    description: (data as any).description || "",
    date: (data as any).date || "",
    updated: (data as any).updated || undefined,
    author: (data as any).author || undefined,
    tags: (data as any).tags || [],
    cover: (data as any).cover || undefined,
    draft: Boolean((data as any).draft),
    readingTime: stats.text,
    filepath,
  };
}

export function getAllContent(kind: "blog" | "projects"): ContentItem[] {
  return readDirectory(kind)
    .map(parseFile)
    .filter((item) => !item.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBySlug(kind: "blog" | "projects", slug: string): ContentItem | undefined {
  const items = getAllContent(kind);
  return items.find((item) => item.slug === slug);
}


