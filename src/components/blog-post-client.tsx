"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { MainNavigation } from "@/components/main-navigation";
import { TableOfContents } from "@/components/table-of-contents";

interface BlogPostClientProps {
  slug: string;
  post: any;
  mdxContent: React.ReactNode;
}

export function BlogPostClient({ slug, post, mdxContent }: BlogPostClientProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MainNavigation />

      {/* Table of Contents Sidebar - Fixed on Left Side, Outside Content */}
      <TableOfContents />
      
      <main className="w-full">
        <article className="max-w-prose mx-auto px-4 py-16 sm:py-20 pt-32 sm:pt-40">
          {/* Back Button */}
          <div className="mb-8">
            <button onClick={() => router.back()} className="inline-flex items-center justify-center cursor-pointer">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="mt-2 flex items-center gap-4">
              <div className="prose prose-sm max-w-none font-mono text-foreground">
                {post.date}
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="text-sm text-muted-foreground">
                {post.readingTime}
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="mb-8">
            <h2 className="text-3xl font-semibold text-foreground leading-tight mb-5 mt-7 first:mt-0">
              {post.title}
            </h2>
            {post.description && (
              <p className="text-base text-muted-foreground leading-6 mb-8 max-w-2xl">
                {post.description}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.cover && (
            <div className="relative mb-8 rounded-lg overflow-hidden aspect-video">
              <Image
                src={post.cover}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          {mdxContent}
        </article>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
