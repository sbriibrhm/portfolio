import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com";
  const blog = getAllContent("blog").map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: (p.updated || p.date) as string }));
  const projects = getAllContent("projects").map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: (p.updated || p.date) as string }));
  const staticRoutes = [{ url: base, lastModified: new Date().toISOString() }];

  return [...staticRoutes, ...blog, ...projects];
}


