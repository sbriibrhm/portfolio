"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Video Component
interface VideoProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}

export function Video({ src, title, poster, className }: VideoProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-muted", className)}>
      <video
        src={src}
        poster={poster}
        controls
        className="w-full h-auto"
        preload="metadata"
      >
        {title && <track kind="captions" label={title} />}
        Your browser does not support the video tag.
      </video>
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
          {title}
        </div>
      )}
    </div>
  );
}

// Callout Component
interface CalloutProps {
  type?: "info" | "warning" | "success" | "error";
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", icon, children, className }: CalloutProps) {
  const icons = {
    info: "💡",
    warning: "⚠️",
    success: "✅",
    error: "❌",
  };

  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
    success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
    error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
  };

  return (
    <div className={cn("flex gap-3 p-4 rounded-lg border", styles[type], className)}>
      <span className="text-lg flex-shrink-0">{icon || icons[type]}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

// Quote Component
interface QuoteProps {
  author?: string;
  role?: string;
  children: React.ReactNode;
  className?: string;
}

export function Quote({ author, role, children, className }: QuoteProps) {
  return (
    <blockquote className={cn("border-l-4 border-primary pl-6 py-4 italic", className)}>
      <p className="text-lg mb-2">"{children}"</p>
      {(author || role) && (
        <footer className="text-sm text-muted-foreground not-italic">
          — {author}
          {role && <span className="text-muted-foreground/70">, {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// Grid Component
interface GridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Grid({ columns = 2, gap = "md", children, className }: GridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gaps = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div className={cn("grid", gridCols[columns], gaps[gap], className)}>
      {children}
    </div>
  );
}

// Stats Component
interface StatsProps {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function Stats({ value, label, trend, className }: StatsProps) {
  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <div className={cn("text-center p-4 rounded-lg bg-muted/50", className)}>
      <div className="text-2xl font-bold text-primary mb-1">
        {trend && trendIcons[trend]} {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// Timeline Component
interface TimelineItemProps {
  title: string;
  description?: string;
  date?: string;
  children?: React.ReactNode;
}

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function TimelineItem({ title, description, date, children }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
        •
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">{title}</h3>
          {date && <Badge variant="outline" className="text-xs">{date}</Badge>}
        </div>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        {children}
      </div>
    </div>
  );
}

// Divider Component
interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className }: DividerProps) {
  if (text) {
    return (
      <div className={cn("relative flex items-center justify-center my-8", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative bg-background px-4 text-sm text-muted-foreground">
          {text}
        </div>
      </div>
    );
  }

  return <hr className={cn("my-8 border-border", className)} />;
}

// LinkPreview Component
interface LinkPreviewProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
}

export function LinkPreview({ url, title, description, image, className }: LinkPreviewProps) {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      <Link href={url} target="_blank" rel="noopener noreferrer" className="block">
        {image && (
          <div className="aspect-video relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
          )}
          <div className="text-xs text-primary flex items-center gap-1">
            <span>{new URL(url).hostname}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

// Image Component with Caption
interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageWithCaption({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400, 
  className 
}: ImageWithCaptionProps) {
  return (
    <figure className={cn("my-6", className)}>
      <div className="relative rounded-lg overflow-hidden aspect-video">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
