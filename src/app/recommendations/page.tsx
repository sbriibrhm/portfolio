"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { TestimonialCard } from "@/components/testimonial-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Footer } from "@/components/footer";
import Link from "next/link";

// Extended mock testimonials data
const allTestimonials = [
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
  },
  {
    id: "6",
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "Grab",
    testimonial: "Sabri's design-to-code handoff process is seamless. His attention to detail and clear communication made implementation smooth and efficient. He's a designer who truly understands development constraints.",
    initials: "AJ"
  },
  {
    id: "7",
    name: "Maria Garcia",
    role: "Product Owner",
    company: "Delivery Hero",
    testimonial: "Sabri consistently delivered user-centered solutions that exceeded our business goals. His data-driven approach and creative problem-solving skills made him an invaluable team member.",
    initials: "MG"
  },
  {
    id: "8",
    name: "James Wilson",
    role: "Design Director",
    company: "Zinier",
    testimonial: "Working with Sabri was a game-changer for our design team. His mentorship skills and ability to elevate the entire team's output while maintaining high standards is exceptional.",
    initials: "JW"
  },
  {
    id: "9",
    name: "Anna Lee",
    role: "Marketing Manager",
    company: "Smobble",
    testimonial: "Sabri's designs not only look beautiful but also drive real business results. His understanding of user behavior and conversion optimization helped us achieve our marketing goals.",
    initials: "AL"
  },
  {
    id: "10",
    name: "Robert Chen",
    role: "CTO",
    company: "MyTeksi",
    testimonial: "Sabri's technical understanding combined with his design expertise created solutions that were both innovative and feasible. His ability to bridge design and engineering is rare and valuable.",
    initials: "RC"
  },
  {
    id: "11",
    name: "Sophie Martin",
    role: "UX Designer",
    company: "Grab",
    testimonial: "Sabri is a design leader who inspires creativity while maintaining focus on user needs. His collaborative spirit and willingness to share knowledge made our team stronger.",
    initials: "SM"
  },
  {
    id: "12",
    name: "Michael Brown",
    role: "Product Manager",
    company: "Delivery Hero",
    testimonial: "Sabri's ability to translate complex business requirements into intuitive user experiences is outstanding. His designs consistently improved our user satisfaction scores.",
    initials: "MB"
  }
];

export default function RecommendationsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={30} cellSize={48} />
      
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
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/#about" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/#work" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Projects
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/#resume" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Work
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/recommendations" 
                    className="text-sm font-medium text-primary transition-colors px-3 py-2 rounded-full hover:bg-accent/50"
                  >
                    Recommendations
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="/#contact" 
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
                <Link
                  href="/#about"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/#work"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/#resume"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/recommendations"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-primary hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Recommendations
                </Link>
                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                >
                  Contact
                </Link>
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
        {/* Header Section */}
        <section className="relative flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20 pt-24 sm:pt-28 overflow-hidden">
          <div className="relative z-10 max-w-4xl w-full space-y-4 sm:space-y-6 text-center">
            {/* Badge */}
            <div className="group relative inline-flex items-center px-4 py-2 rounded-full border border-border/50 bg-background/10 backdrop-blur-sm text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-border hover:bg-background/20 hover:shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2)] active:scale-[0.98]">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">
                What people say
              </span>
            </div>

            {/* Headline */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              All Recommendations
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-tight">
              Feedback from colleagues and collaborators across different companies and projects throughout my career.
            </p>
          </div>
        </section>

        {/* Recommendations Grid with Animated Rows */}
        <section className="px-3 sm:px-4 py-16 sm:py-20 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* First Row - Scroll Left */}
            <div className="relative overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
              <div className="flex gap-4 w-max animate-scroll-left">
                {[...allTestimonials, ...allTestimonials].map((testimonial, index) => (
                  <div key={`left-${testimonial.id}-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Scroll Right */}
            <div className="relative overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
              <div className="flex gap-4 w-max animate-scroll-right">
                {[...allTestimonials, ...allTestimonials].map((testimonial, index) => (
                  <div key={`right-${testimonial.id}-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
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
