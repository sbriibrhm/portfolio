"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    // Wait for content to be rendered
    const extractHeadings = () => {
      const article = document.querySelector("article");
      if (!article) return null;

      const headingElements = article.querySelectorAll("h2, h3, h4");
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((heading) => {
        const text = heading.textContent || "";
        if (!text) return;

        // Skip headings that are inside a <header> element (the title)
        const isInHeader = heading.closest("header") !== null;
        if (isInHeader) return;

        // Generate ID from text if not present
        let id = heading.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
          heading.id = id;
        }

        const level = parseInt(heading.tagName.charAt(1));
        extractedHeadings.push({ id, text, level });
      });

      setHeadings(extractedHeadings);
      return headingElements;
    };

    // Try immediately
    let headingElements = extractHeadings();

    let observer: IntersectionObserver | null = null;

    // Also try after a short delay to ensure content is rendered
    const timeoutId = setTimeout(() => {
      headingElements = extractHeadings();
      if (observer) {
        observer.disconnect();
      }
      observer = setupObserver(headingElements);
    }, 100);

    const setupObserver = (elements: NodeListOf<Element> | null) => {
      if (!elements || elements.length === 0) return null;

      const observerOptions = {
        rootMargin: "-100px 0px -66% 0px",
        threshold: 0,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      };

      const newObserver = new IntersectionObserver(observerCallback, observerOptions);

      elements.forEach((heading) => {
        newObserver.observe(heading);
      });

      return newObserver;
    };

    // Set up observer for initial headings
    observer = setupObserver(headingElements);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Hide table of contents when near the bottom (to avoid covering footer)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate distance from bottom
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      
      // Hide when within 400px of the bottom
      setIsNearBottom(distanceFromBottom < 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navBarHeight = 80;
      const targetPosition = element.offsetTop - navBarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  // If there are too many headings, only show H2 headings to avoid overflow
  const MAX_HEADINGS_TO_SHOW_ALL = 10;
  const displayHeadings = headings.length > MAX_HEADINGS_TO_SHOW_ALL
    ? headings.filter((heading) => heading.level === 2)
    : headings;

  if (displayHeadings.length === 0) {
    return null;
  }

  return (
    <aside 
      className={cn(
        "hidden lg:block fixed left-4 top-32 sm:top-40 z-40 w-64 transition-opacity duration-300",
        isNearBottom ? "opacity-0 pointer-events-none" : "opacity-100",
        className
      )}
    >
      <div className="max-h-[calc(100vh-8rem)] pr-4">
        <div className="border-l-2 border-border/40 pl-4">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
            Chapters
          </h2>
          <nav className="space-y-2">
            {displayHeadings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={cn(
                  "block text-sm transition-colors duration-200 hover:text-primary",
                  heading.level === 2 && "font-medium",
                  heading.level === 3 && "ml-4 text-muted-foreground",
                  heading.level === 4 && "ml-8 text-muted-foreground",
                  activeId === heading.id
                    ? "text-primary border-l-2 border-primary pl-2 -ml-4"
                    : "text-muted-foreground"
                )}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

