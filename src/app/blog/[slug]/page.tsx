import fs from "node:fs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { getAllContent, getBySlug } from "@/lib/content";
import { BlogPostClient } from "@/components/blog-post-client";
import Image from "next/image";
import { CodeBlock, InlineCode } from "@/components/ui/code-block";
import {
  Video,
  Callout,
  Quote,
  Grid,
  Stats,
  Timeline,
  TimelineItem,
  Divider,
  LinkPreview,
  ImageWithCaption
} from "@/components/ui/mdx-components";

const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold text-foreground leading-tight mb-6 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-semibold text-foreground leading-tight mb-5 mt-7 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4 mt-6 first:mt-0" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-semibold text-foreground leading-tight mb-3 mt-5 first:mt-0" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: any) => (
    <h5 className="text-lg font-semibold text-foreground leading-tight mb-3 mt-4 first:mt-0" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: any) => (
    <h6 className="text-base font-semibold text-foreground leading-tight mb-2 mt-4 first:mt-0" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }: any) => (
    <div className="text-base text-muted-foreground leading-6 mb-6" {...props}>
      {children}
    </div>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="text-base text-foreground leading-relaxed mb-4 list-disc list-inside" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="text-base text-foreground leading-relaxed mb-4 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => {
    // Extract text content from React children
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (node?.props?.children) return extractText(node.props.children);
      return '';
    };
    
    const text = extractText(children).trim();
    
    // Check if quote ends with " - Author Name" pattern
    const authorMatch = text.match(/^(.+?)\s*-\s*(.+)$/);
    
    if (authorMatch) {
      const [, quoteText, author] = authorMatch;
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6" {...props}>
          <p className="mb-2">{quoteText.trim()}</p>
          <footer className="text-sm text-muted-foreground not-italic mt-2">
            — {author.trim()}
          </footer>
        </blockquote>
      );
    }
    
    return (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6" {...props}>
        {children}
      </blockquote>
    );
  },
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary/80 underline underline-offset-4" 
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
  pre: ({ children, ...props }: any) => {
    const codeProps = children?.props || {};
    const { className, children: codeChildren } = codeProps;
    const language = className?.replace(/language-/, "") || "javascript";
    
    return (
      <CodeBlock
        language={language}
        showLineNumbers={true}
        {...props}
      >
        {codeChildren}
      </CodeBlock>
    );
  },
  code: ({ children, className, ...props }: any) => {
    if (className) {
      // This is a code block, handled by pre
      return <code className={className} {...props}>{children}</code>;
    }
    // This is inline code
    return <InlineCode {...props}>{children}</InlineCode>;
  },
  table: ({ children, ...props }: any) => (
    <table className="w-full border-collapse border border-border my-6" {...props}>
      {children}
    </table>
  ),
  th: ({ children, ...props }: any) => (
    <th className="border border-border px-4 py-2 text-left bg-muted font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-border px-4 py-2 text-left" {...props}>
      {children}
    </td>
  ),
  hr: ({ ...props }: any) => (
    <hr className="border-border my-8" {...props} />
  ),
  img: ({ src, alt, ...props }: any) => {
    if (!src) return null;
    
    // Check if it's a YouTube URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = src.match(youtubeRegex);
    
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={alt || "YouTube video"}
            width="100%"
            height="400"
            className="w-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
    // Regular image
    return (
      <div className="relative my-6 rounded-lg overflow-hidden aspect-video">
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={400}
          className="w-full h-full object-cover rounded-lg"
          {...props}
        />
      </div>
    );
  },
  // Custom MDX components
  Video,
  Callout,
  Quote,
  Grid,
  Stats,
  Timeline,
  TimelineItem,
  Divider,
  LinkPreview,
  ImageWithCaption,
};


export async function generateStaticParams() {
  return getAllContent("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBySlug("blog", slug);
  if (!post) return {};
  const url = `https://your-domain.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBySlug("blog", slug);
  if (!post) return notFound();

  const rawSource = fs.readFileSync(post.filepath, "utf8");
  const { content: source } = matter(rawSource);

  // Render MDX content on the server
  const mdxContent = (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
            development: process.env.NODE_ENV === 'development',
          },
        }}
      />
    </div>
  );

  return (
    <BlogPostClient slug={slug} post={post} mdxContent={mdxContent} />
  );
}


