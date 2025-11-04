import { ReactNode } from "react";
import { PageBadge } from "./page-badge";

interface PageHeaderProps {
  badge?: string;
  showAvailableDot?: boolean;
  headline: string;
  subheadline?: string;
  className?: string;
  badgeBelowHeadline?: boolean;
}

export function PageHeader({ 
  badge, 
  showAvailableDot = false, 
  headline, 
  subheadline,
  className = "",
  badgeBelowHeadline = false
}: PageHeaderProps) {
  return (
    <div className={className}>
      {/* Badge Above (default) */}
      {badge && !badgeBelowHeadline && (
        <PageBadge showAvailableDot={showAvailableDot} className="mb-8 sm:mb-12">
          {badge}
        </PageBadge>
      )}

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight mb-4 sm:mb-6">
        {headline}
      </h1>

      {/* Badge Below */}
      {badge && badgeBelowHeadline && (
        <PageBadge showAvailableDot={showAvailableDot} className="mb-8 sm:mb-12">
          {badge}
        </PageBadge>
      )}

      {/* Subheadline */}
      {subheadline && (
        <p className="prose prose-sm max-w-none font-mono text-foreground max-w-2xl mb-8 sm:mb-12 text-lg sm:text-xl md:text-2xl leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}




