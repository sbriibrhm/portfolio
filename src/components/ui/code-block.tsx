"use client";

import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  className,
  language = "javascript",
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50 border-b border-border rounded-t-lg">
          <span>{title}</span>
          <span className="text-xs uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative">
        <Highlight
          theme={themes.vsDark}
          code={children.trim()}
          language={language}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                "relative overflow-x-auto p-4 text-sm font-mono leading-relaxed",
                title ? "rounded-b-lg" : "rounded-lg",
                "bg-[#1e1e1e] border border-border",
                highlightClassName
              )}
              style={style}
            >
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                title="Copy code"
              >
                {copied ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {showLineNumbers && (
                      <span className="inline-block w-8 text-muted-foreground/50 select-none mr-4">
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        "text-muted-foreground",
        className
      )}
    >
      {children}
    </code>
  );
}
