"use client";

import { ReactNode } from "react";
import { MainNavigation } from "@/components/main-navigation";
import { Footer } from "@/components/footer";
import { HeroCard } from "@/components/hero-card";

interface PageLayoutProps {
  children: ReactNode;
  showHeroCard?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function PageLayout({ 
  children, 
  showHeroCard = false, 
  showFooter = true,
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ${className}`}>
      <MainNavigation />

      <main className="w-full">
        {children}

        {/* Hero Card Section */}
        {showHeroCard && (
          <section className="w-full bg-background">
            <HeroCard />
          </section>
        )}

        {/* Footer */}
        {showFooter && <Footer />}
      </main>
    </div>
  );
}

