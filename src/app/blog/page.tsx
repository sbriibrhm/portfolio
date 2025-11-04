import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogIndexClient } from "@/components/blog-index-client";

export default function BlogIndexPage() {
  const posts = getAllContent("blog");

  return (
    <BlogIndexClient posts={posts} />
  );
}


