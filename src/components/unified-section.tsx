"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LetterGlitch from "./LetterGlitch";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";

export function UnifiedSection() {
  // Theme-aware glitch colors - adjust based on light/dark mode
  const lightGlitchColors = ['#2b4539', '#61dca3', '#61b3dc', '#a855f7', '#ec4899'];
  const darkGlitchColors = ['#61dca3', '#9247e5', '#ec4899', '#3b82f6', '#f59e0b'];
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Check on mount
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const glitchColors = isDark ? darkGlitchColors : lightGlitchColors;

  return (
    <section className="relative w-full h-[20vh] flex items-center justify-center overflow-hidden bg-background">
      {/* LetterGlitch Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/70 dark:bg-background/85 backdrop-blur-sm" />
        <LetterGlitch
          glitchColors={glitchColors}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          backgroundColor="transparent"
          className="w-full h-full opacity-40 dark:opacity-50"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          {/* CTAs */}
          <Link href="mailto:sbriibrhm@gmail.com">
            <InteractiveHoverButton
              className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
            >
              Contact Me
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

