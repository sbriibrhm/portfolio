"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { WobbleCard } from "@/components/ui/wobble-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { TestimonialCard } from "@/components/testimonial-card";
import Link from "next/link";

// Footnote image data
const footnoteImages = {
  1: { src: "/images/footnote-1.gif", alt: "AI + Design" },
  2: { src: "/images/footnote-2.jpg", alt: "Location" },
  3: { src: "/images/footnote-3.jpeg", alt: "Scattered thoughts" },
  4: { src: "/images/footnote-4.webp", alt: "Sneaker collection" },
  5: { src: "/images/footnote-5.jpg", alt: "Product building" },
  6: { src: "/images/footnote-6.gif", alt: "Hip-hop culture" },
  7: { src: "/images/footnote-7.webp", alt: "AI tools" },
};

// Footnote Image Component
function FootnoteImage({ footnoteId, isVisible }: { footnoteId: number; isVisible: boolean }) {
  const image = footnoteImages[footnoteId as keyof typeof footnoteImages];
  
  if (!image) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute hidden lg:block z-50 top-full left-0 mt-2 w-64 h-48 rounded-lg overflow-hidden border border-border shadow-2xl bg-background"
          style={{ display: 'block' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={256}
            height={192}
            className="w-full h-full object-cover"
            unoptimized
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

const roles = [
  { text: "Product Designer", className: "" },
  { text: "ML enthusiast", className: "" },
  { text: "Prompt Engineer", className: "" },
  { text: "Certified Trainer", className: "" }
];

// Previous employers data
const employerLogos = [
  { name: "Grab", src: "/logos/grab-logo.svg", alt: "Grab", width: 180, height: 100 },
  { name: "Delivery Hero", src: "/logos/delivery-hero-logo.svg", alt: "Delivery Hero", width: 320, height: 140 },
  { name: "MyTeksi", src: "/logos/myteksi-logo.svg", alt: "MyTeksi", width: 220, height: 120 },
  { name: "Foodpanda", src: "/logos/foodpanda-logo.svg", alt: "Foodpanda", width: 220, height: 120 },
  { name: "Smobble", src: "/logos/smobble-logo.svg", alt: "Smobble", width: 220, height: 120 },
  { name: "Zinier", src: "/logos/zinier-logo.svg", alt: "Zinier", width: 220, height: 120 },
];

// Mock testimonials data
const mockTestimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Grab",
    testimonial: "Sabri is an exceptional designer who brings both creativity and strategic thinking to every project. His ability to understand user needs and translate them into beautiful, functional designs is remarkable. Working with him was a pleasure.",
    initials: "SC"
  },
  {
    id: "2", 
    name: "Marcus Rodriguez",
    role: "Engineering Lead",
    company: "Delivery Hero",
    testimonial: "I had the privilege of collaborating with Sabri on several complex projects. His attention to detail and innovative approach to UX challenges consistently impressed our entire team. He's a true professional.",
    initials: "MR"
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "Head of Design",
    company: "Zinier",
    testimonial: "Sabri's design thinking and execution skills are outstanding. He has a unique ability to balance user needs with business objectives, creating solutions that are both beautiful and effective. Highly recommend working with him.",
    initials: "EW"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Product Director",
    company: "Smobble",
    testimonial: "Working with Sabri was transformative for our product. His deep understanding of user psychology and his ability to create intuitive interfaces helped us significantly improve our user engagement metrics.",
    initials: "DK"
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "UX Researcher",
    company: "MyTeksi",
    testimonial: "Sabri's collaborative approach and willingness to dive deep into user research made our design process much more effective. His designs always consider the full user journey and business impact.",
    initials: "LT"
  }
];

function RoleTypewriter() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const displayText = roles[currentRoleIndex].text;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Reset states
    setIsHighlighting(false);
    setIsDeleting(false);

    // Timing breakdown:
    // - Type animation: 0.5s delay + 1.5s duration = 2s total
    // - Pause after typing: 1.5s
    // - Highlight/select: 0.5s
    // - Delete animation: 0.4s
    // Total cycle: ~4.4s

    // Start highlight after typing + pause
    const highlightTimer = setTimeout(() => {
      setIsHighlighting(true);
    }, 3500); // 2s typing + 1.5s pause

    // Start deletion after highlight
    const deleteTimer = setTimeout(() => {
      setIsDeleting(true);
      setIsHighlighting(false);
    }, 4000); // 2s typing + 1.5s pause + 0.5s highlight

    // Move to next role after deletion
    const nextTimer = setTimeout(() => {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4400); // 2s typing + 1.5s pause + 0.5s highlight + 0.4s delete

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(deleteTimer);
      clearTimeout(nextTimer);
    };
  }, [currentRoleIndex]);

  const words = useMemo(() => [
    {
      text: displayText,
      className: roles[currentRoleIndex].className,
    }
  ], [currentRoleIndex, displayText]);

  return (
    <div className="inline-flex items-baseline gap-2 flex-wrap">
      <div className="relative inline-flex items-baseline">
        <motion.div
          animate={{
            width: isDeleting ? "0%" : "fit-content",
          }}
          transition={{
            duration: isDeleting ? 0.4 : 0,
            ease: "easeInOut",
          }}
          style={{
            overflow: "hidden",
            display: "inline-block",
          }}
        >
          <TypewriterEffectSmooth 
            key={`${currentRoleIndex}-type`}
            words={words} 
            className="inline-flex !my-0 !pb-0"
            cursorClassName="bg-primary"
          />
        </motion.div>
        {/* Selection highlight effect */}
        <AnimatePresence>
          {isHighlighting && (
            <motion.div
              className="absolute inset-0 bg-primary/40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
      <span className="inline-block align-baseline w-full sm:w-auto">who ships.</span>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredFootnote, setHoveredFootnote] = useState<number | null>(null);

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
            const navBarHeight = isScrolled ? 60 : 80; // Adjust based on nav state
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
              <a 
                href="#home" 
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
              </a>
            </motion.div>
            
            {/* Center: Desktop Menu */}
            <div className="flex-1 items-center justify-center hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#about" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#work" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/experience" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Experience
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/recommendations" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Recommendations
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#contact" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right: Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
            </div>

            {/* Mobile: Theme Toggle + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {isMobileMenuOpen && <ThemeToggle isMobile={true} onThemeChange={() => setIsMobileMenuOpen(false)} />}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors text-foreground" 
                aria-label="Menu"
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </motion.svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2 space-y-2 border-t border-border/40">
                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  About
                </a>
                <a
                  href="#work"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Projects
                </a>
                <a
                  href="/experience"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Experience
                </a>
                <a
                  href="/recommendations"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Recommendations
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
          <a 
            href="#home" 
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
          </a>
        </motion.div>
      )}

      <main className="w-full">
        {/* Home Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20 pt-32 sm:pt-40 overflow-hidden">
          {/* Background Ripple Effect */}
          <BackgroundRippleEffect rows={8} cols={30} cellSize={48} />
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl w-full space-y-6 sm:space-y-8">
            {/* Badge with hover animations */}
            <div className="group relative inline-flex items-center px-4 py-2 rounded-full border border-border/50 bg-background/10 backdrop-blur-sm text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-border hover:bg-background/20 hover:shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2)] active:scale-[0.98]">
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
              
              <span className="relative z-10">
                Hi, I'm Sabri Ibrahim 👋🏼
              </span>
            </div>

            {/* Headline */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight">
              <RoleTypewriter />
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-tight">
              Product Designer based in Kuala Lumpur—remote-friendly, relocation open.
              <br className="hidden sm:block" />
              <span className="block sm:inline">10+ years building end-to-end products, crafting UX (and prompts) that drive growth. 🚀</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
              <Button
                size="lg"
                variant="gradient"
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                onClick={() => {
                  const target = document.getElementById('work');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                View Case Studies
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                Download Resume (PDF)
              </Button>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-12 sm:py-16 bg-white relative w-full">
          <DottedGlowBackground 
            className="z-0"
            gap={12}
            radius={3.5}
            color="rgba(0,0,0,0.1)"
            darkColor="rgba(255,255,255,0.2)"
            glowColor="rgba(99, 102, 241, 0.6)"
            darkGlowColor="rgba(99, 102, 241, 0.8)"
            opacity={0.4}
            speedScale={0.5}
            backgroundOpacity={0.05}
          />
          <div className="w-full px-3 sm:px-4 relative z-10">
            {/* Badge, Headline, Subheadline, and CTA */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 text-center space-y-6 sm:space-y-8">
              {/* Badge with hover animations - Always light mode */}
              <div className="group relative inline-flex items-center px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50/80 backdrop-blur-sm text-sm font-medium text-zinc-700 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-100 hover:shadow-[0_0_40px_rgba(99,102,241,0.15),0_0_80px_rgba(99,102,241,0.1)] active:scale-[0.98]">
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
                
                <span className="relative z-10">
                  Previous employers
                </span>
              </div>

              {/* Headline */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[0.8] sm:leading-tight">
                Built for scale, shipped at speed
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-tight">
                Flows, design systems, and monetization experiments—in-house at Grab (MyTeksi), Delivery Hero (foodpanda), Zinier, and Smobble.
              </p>

              {/* CTA */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400"
                  asChild
                >
                  <Link href="/experience">
                    View Experience
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden py-8" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
              <div className="flex gap-8 sm:gap-12 w-max animate-scroll">
                {/* First set of logos */}
                {employerLogos.map((logo, index) => (
                  <WobbleCard
                    key={`logo-${index}`}
                    containerClassName={`flex-shrink-0 ${logo.name === "Delivery Hero" ? "w-[280px] sm:w-[380px] h-[120px] sm:h-[160px]" : "w-[200px] sm:w-[280px] h-[100px] sm:h-[140px]"} bg-white`}
                    className="!bg-transparent !shadow-none !p-0"
                  >
                    <div className="flex items-center justify-center h-full w-full p-4 sm:p-8">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className={`object-contain ${logo.name === "Delivery Hero" ? "max-w-[200px] sm:max-w-[320px] max-h-[80px] sm:max-h-[140px]" : logo.name === "Grab" ? "max-w-[120px] sm:max-w-[180px] max-h-[60px] sm:max-h-[100px]" : "max-w-[140px] sm:max-w-[220px] max-h-[80px] sm:max-h-[120px]"}`}
                      />
                    </div>
                  </WobbleCard>
                ))}
                {/* Duplicate set for seamless loop */}
                {employerLogos.map((logo, index) => (
                  <WobbleCard
                    key={`logo-duplicate-${index}`}
                    containerClassName={`flex-shrink-0 ${logo.name === "Delivery Hero" ? "w-[280px] sm:w-[380px] h-[120px] sm:h-[160px]" : "w-[200px] sm:w-[280px] h-[100px] sm:h-[140px]"} bg-white`}
                    className="!bg-transparent !shadow-none !p-0"
                  >
                    <div className="flex items-center justify-center h-full w-full p-4 sm:p-8">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className={`object-contain ${logo.name === "Delivery Hero" ? "max-w-[200px] sm:max-w-[320px] max-h-[80px] sm:max-h-[140px]" : logo.name === "Grab" ? "max-w-[120px] sm:max-w-[180px] max-h-[60px] sm:max-h-[100px]" : "max-w-[140px] sm:max-w-[220px] max-h-[80px] sm:max-h-[120px]"}`}
                      />
                    </div>
                  </WobbleCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen px-3 sm:px-4 py-16 sm:py-20 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/10 backdrop-blur-sm text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-border hover:bg-background/20 hover:shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2)] active:scale-[0.98] mb-8 sm:mb-12">
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
              
              {/* Pulsing green dot */}
              <span className="relative z-10 inline-flex items-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </span>
              
              <span className="relative z-10">
                Available for Work
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight mb-4 sm:mb-6">
              About Me
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 leading-tight">
              Product designer, lifelong learner, and curiosity-junkie who dives into rabbit holes, side projects and an embarrassingly large number of open tabs.
            </p>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Image on the left */}
              <div className="flex-shrink-0 w-full md:w-1/3 flex justify-start">
                <div className="w-full max-w-xs">
                  <Image
                    src="/hellosabri.jpg"
                    alt="Sabri Ibrahim"
                    width={384}
                    height={384}
                    className="w-full h-auto object-cover object-top rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Content on the right */}
              <div className="flex-1">
            <div className="grid md:grid-cols-1 gap-6 sm:gap-8 md:gap-12">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl font-light text-foreground/80 leading-relaxed">
                <p>
                  I'm Sabri — a product designer, lifelong learner, and <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(1)} onMouseLeave={() => setHoveredFootnote(null)}>curiosity-junkie<span className="text-primary/60 text-xs sm:text-sm"> [1]</span><FootnoteImage footnoteId={1} isVisible={hoveredFootnote === 1} /></span> who dives into rabbit holes, side projects and an embarrassingly large number of open tabs.
                </p>
                <p>
                  Based in <del>Sabah</del>, <del>Singapore</del>, <del>Berlin</del>, <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(2)} onMouseLeave={() => setHoveredFootnote(null)}>Kuala Lumpur<span className="text-primary/60 text-xs sm:text-sm"> [2]</span><FootnoteImage footnoteId={2} isVisible={hoveredFootnote === 2} /></span>. Remote-friendly and open to relocating (because the ideas don't always stay in one time-zone).
                </p>
                <p>
                  I speak Bahasa, English and very fluent in Sarawakian (Sabahan by roots, Sarawakian by tongue) — but honestly, inside my head it's mostly sticky notes, <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(3)} onMouseLeave={() => setHoveredFootnote(null)}>scattered thoughts<span className="text-primary/60 text-xs sm:text-sm"> [3]</span><FootnoteImage footnoteId={3} isVisible={hoveredFootnote === 3} /></span>, and the occasional brilliant metaphor.
                </p>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl font-light text-foreground/80 leading-relaxed">
                <p>
                  When I'm not designing, you'll find me chasing <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(4)} onMouseLeave={() => setHoveredFootnote(null)}>sneaker drops<span className="text-primary/60 text-xs sm:text-sm"> [4]</span><FootnoteImage footnoteId={4} isVisible={hoveredFootnote === 4} /></span> (even though I only have two feet), riding my scooter until my mind empties, or winding down with a game.
                </p>
                <p>
                  10+ years <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(5)} onMouseLeave={() => setHoveredFootnote(null)}>building products end-to-end<span className="text-primary/60 text-xs sm:text-sm"> [5]</span><FootnoteImage footnoteId={5} isVisible={hoveredFootnote === 5} /></span>. I craft UX and the prompts that power it. Growth, monetization, and the spots where psychology quietly moves the needle.
                </p>
                <p>
                  <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(6)} onMouseLeave={() => setHoveredFootnote(null)}>Hip-hop<span className="text-primary/60 text-xs sm:text-sm"> [6]</span><FootnoteImage footnoteId={6} isVisible={hoveredFootnote === 6} /></span>'s my go-to soundtrack— Kendrick, Eminem, and anything with a story worth replaying.
                </p>
                <p>
                  Ask me about sneakers, <span className="text-primary cursor-pointer hover:underline font-medium decoration-primary underline-offset-2 relative" onMouseEnter={() => setHoveredFootnote(7)} onMouseLeave={() => setHoveredFootnote(null)}>AI tools<span className="text-primary/60 text-xs sm:text-sm"> [7]</span><FootnoteImage footnoteId={7} isVisible={hoveredFootnote === 7} /></span>—or what the latest NetworkChuck's YouTube videos.
                </p>
              </div>
            </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-start mt-8 sm:mt-12">
              <Button
                size="lg"
                variant="outline"
                className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                onClick={() => {
                  const target = document.getElementById('contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Get in Touch
              </Button>
            </div>

            {/* Divider */}
            <div className="my-12 sm:my-16 border-t border-border" />

            {/* Footnotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column: Footnotes 1-4 */}
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div id="footnote-1" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">1.</span>
                  <span>Currently looking at AI + Design.</span>
                </div>
                <div id="footnote-2" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">2.</span>
                  <span>My hometown is Sabah, Malaysia. Formerly EP Holder in Singapore. Working remotely for Berlin based company.</span>
                </div>
                <div id="footnote-3" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">3.</span>
                  <span>Dream in English, but when frustrated, switch to Filipino 😂</span>
                </div>
                <div id="footnote-4" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">4.</span>
                  <span>Reformed sneaker collector—trying hard to let go of my collection (and the habit).</span>
                </div>
              </div>

              {/* Right Column: Footnotes 5-7 */}
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div id="footnote-5" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">5.</span>
                  <span>Now taking applications for companies who need exactly this.</span>
                </div>
                <div id="footnote-6" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">6.</span>
                  <span>I love the beat, the story, the culture.</span>
                </div>
                <div id="footnote-7" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">7.</span>
                  <span>Claude, Cursor, v0, — Usually hitting the token limit while chasing an idea.</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="min-h-screen px-3 sm:px-4 py-16 sm:py-20 bg-white dark:bg-black overflow-hidden">
          <div className="w-full">
            {/* Section Heading */}
            <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto px-4">
              {/* Badge */}
              <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/10 backdrop-blur-sm text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-border hover:bg-background/20 hover:shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2)] active:scale-[0.98] mb-6 sm:mb-8">
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
                
                <span className="relative z-10">
                  What people say
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight mb-4 sm:mb-6">
                Recommendations
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-tight mb-8 sm:mb-12">
                Feedback from colleagues and collaborators across different companies and projects.
              </p>
              
              {/* View All CTA */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="gradient"
                  className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                  asChild
                >
                  <Link href="/recommendations">
                    View All Recommendations
                  </Link>
                </Button>
              </div>
            </div>

            {/* Testimonials with Animated Rows */}
            <div className="space-y-6">
              {/* First Row - Scroll Left */}
              <div className="relative overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                <div className="flex gap-4 w-max animate-scroll-left">
                  {[...mockTestimonials, ...mockTestimonials].map((testimonial, index) => (
                    <div key={`left-${testimonial.id}-${index}`} className="flex-shrink-0">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Row - Scroll Right */}
              <div className="relative overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                <div className="flex gap-4 w-max animate-scroll-right">
                  {[...mockTestimonials, ...mockTestimonials].map((testimonial, index) => (
                    <div key={`right-${testimonial.id}-${index}`} className="flex-shrink-0">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

