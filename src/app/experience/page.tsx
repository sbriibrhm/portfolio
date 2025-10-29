"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Experience() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const navBarHeight = isScrolled ? 60 : 80;
            const targetPosition = targetElement.offsetTop - navBarHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isScrolled]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Floating Navigation Bar */}
      <motion.nav
        initial={false}
        animate={{
          scale: isScrolled ? 1 : 0.95,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className={`fixed z-50 ${!isScrolled ? 'top-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto' : 'top-0 left-0 right-0'} w-auto ${isScrolled ? '!top-0 !left-0 !right-0 !-translate-x-0 rounded-none border-x-0 border-t-0' : 'rounded-full'} ${isScrolled ? 'max-w-full' : 'max-w-[calc(100%-2rem)] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl'} px-3 sm:px-6 border border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-lg transition-all duration-300`}
      >
        <div className={`mx-auto py-3 sm:py-3.5 flex items-center ${isScrolled ? 'max-w-6xl px-3 sm:px-6' : 'w-full px-3 sm:px-8'}`}>
          <div className="flex items-center justify-between w-full">
            {/* Left: Avatar + Name (shown when scrolled) */}
            <motion.div 
              initial={false}
              animate={{
                opacity: isScrolled ? 1 : 0,
                width: isScrolled ? 'auto' : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className={`overflow-hidden ${isScrolled ? 'flex' : 'hidden'} items-center gap-3 mr-4`}
            >
              <Link 
                href="/" 
                className="flex items-center gap-3 group cursor-pointer"
              >
                <Avatar className="size-8">
                  <AvatarImage src="/avatar.jpg" alt="Sabri Ibrahim" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                    SI
                  </AvatarFallback>
                </Avatar>
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 whitespace-nowrap">
                  Sabri Ibrahim
                </span>
              </Link>
            </motion.div>
            
            {/* Center: Desktop Menu */}
            <div className="flex-1 items-center justify-center hidden md:flex">
              <div className="flex items-center gap-6">
                <Link 
                  href="/" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  Home
                </Link>
                <Link 
                  href="/#about" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  About
                </Link>
                <Link 
                  href="/#work" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  Projects
                </Link>
                <Link 
                  href="/experience" 
                  className="text-sm font-medium text-primary hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  Experience
                </Link>
                <Link 
                  href="/recommendations" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  Recommendations
                </Link>
                <Link 
                  href="/#contact" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right: Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Avatar + Name Section - Floating on the left when not scrolled */}
      {!isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="fixed z-[60] top-4 left-4 w-auto px-3 sm:px-6 flex items-center h-[60px]"
        >
          <Link 
            href="/" 
            className="flex items-center gap-3 group cursor-pointer w-fit"
          >
            <Avatar className="size-8 sm:size-10">
              <AvatarImage src="/avatar.jpg" alt="Sabri Ibrahim" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm sm:text-lg">
                SI
              </AvatarFallback>
            </Avatar>
            <span className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              Sabri Ibrahim
            </span>
          </Link>
        </motion.div>
      )}

      <main className="w-full">
        {/* Experience Section */}
        <section className="min-h-screen px-3 sm:px-4 py-16 sm:py-20 bg-background pt-32 sm:pt-40">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="group relative inline-flex items-center px-4 py-2 rounded-full border border-border/50 bg-background/10 backdrop-blur-sm text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-border hover:bg-background/20 hover:shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2)] active:scale-[0.98] mb-8 sm:mb-12">
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
              
              <span className="relative z-10">
                Experience & Education
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight mb-4 sm:mb-6">Work Experience</h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 leading-tight">
              10+ years of building products end-to-end, crafting UX and prompts that drive growth.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Experience 1 */}
              <div className="border-l-2 border-primary pl-4 sm:pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Senior Frontend Developer</h3>
                  <span className="text-sm sm:text-base text-muted-foreground">2021 - Present</span>
                </div>
                <p className="text-primary font-medium mb-2 text-sm sm:text-base">Tech Solutions Inc.</p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Led a team of 5 developers to build and maintain large-scale React applications. 
                  Implemented CI/CD pipelines, improved performance by 40%, and mentored junior developers.
                </p>
              </div>

              {/* Experience 2 */}
              <div className="border-l-2 border-primary pl-4 sm:pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Full-Stack Developer</h3>
                  <span className="text-sm sm:text-base text-muted-foreground">2019 - 2021</span>
                </div>
                <p className="text-primary font-medium mb-2 text-sm sm:text-base">Digital Agency</p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Developed custom web applications using React, Node.js, and MongoDB. 
                  Worked closely with design teams to create pixel-perfect, responsive interfaces.
                </p>
              </div>

              {/* Experience 3 */}
              <div className="border-l-2 border-primary pl-4 sm:pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Junior Web Developer</h3>
                  <span className="text-sm sm:text-base text-muted-foreground">2018 - 2019</span>
                </div>
                <p className="text-primary font-medium mb-2 text-sm sm:text-base">Startup Co.</p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Built responsive web pages and maintained existing WordPress sites. 
                  Learned modern JavaScript frameworks and contributed to team projects.
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-12 mb-6 sm:mb-8">Education</h3>
            <div className="border-l-2 border-primary pl-4 sm:pl-6">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold">Bachelor of Computer Science</h3>
                <span className="text-sm sm:text-base text-muted-foreground">2014 - 2018</span>
              </div>
              <p className="text-primary font-medium text-sm sm:text-base">University Name</p>
            </div>

            {/* CTA */}
            <div className="flex justify-start mt-8 sm:mt-12">
              <Button
                size="lg"
                variant="gradient"
                className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume (PDF)
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

