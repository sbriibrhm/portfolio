"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/ui/page-layout";
import { PageSection } from "@/components/ui/page-section";
import { PageHeader } from "@/components/ui/page-header";

interface ContentItem {
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

interface BlogIndexClientProps {
  posts: ContentItem[];
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  return (
    <PageLayout>
      <PageSection className="relative flex items-center justify-center overflow-hidden">
        <PageHeader 
          badge="Articles & Notes"
          headline="Blog"
          subheadline="Thoughts on design, development, and the intersection of AI and creativity."
        />

            {/* Posts Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <Card key={post.slug} className="group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative overflow-hidden rounded-t-xl">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <Link href={`/blog/${post.slug}`} className="block">
                      <CardTitle className="hover:text-primary transition-colors">{post.title}</CardTitle>
                    </Link>
                    <CardDescription>
                      {post.date} · {post.readingTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{post.description}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">Add files to <code className="font-mono bg-muted px-2 py-1 rounded">content/blog</code> to get started.</p>
              </div>
            )}
      </PageSection>
    </PageLayout>
  );
}
