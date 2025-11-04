import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

export async function GET() {
  const latestBlog = getAllContent("blog")
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title, description: p.description, date: p.date, readingTime: p.readingTime, cover: p.cover }));

  const latestProjects = getAllContent("projects")
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title, description: p.description, date: p.date, readingTime: p.readingTime, cover: p.cover }));

  return NextResponse.json({ blog: latestBlog, projects: latestProjects });
}


