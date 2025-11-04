import { ReactNode } from "react";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function PageSection({ 
  children, 
  className = "",
  containerClassName = "max-w-prose mx-auto px-4"
}: PageSectionProps) {
  return (
    <section className={`min-h-screen px-3 sm:px-4 py-16 sm:py-20 bg-background pt-32 sm:pt-40 ${className}`}>
      <div className={containerClassName}>
        {children}
      </div>
    </section>
  );
}

