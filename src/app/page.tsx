"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { WobbleCard } from "@/components/ui/wobble-card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { MainNavigation } from "@/components/main-navigation";
import { Highlighter } from "@/components/ui/highlighter";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { AudioLines } from "lucide-react";

// Custom Verified Icon Component
function VerifiedIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      className={className}
    >
      <path 
        fill="currentColor" 
        d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
      />
    </svg>
  );
}

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute hidden lg:block z-50 top-full left-0 mt-2 w-64 rounded-lg overflow-hidden border border-border shadow-2xl bg-background p-0"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-contain block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const roles = [
  { text: "Product Designer", className: "" },
  { text: "UX Engineer", className: "" },
  { text: "Creative Technologist", className: "" },
  { text: "Educator", className: "" }
];

// Previous employers data
const employerLogos = [
  { name: "Grab", src: "/logos/grab-logo.svg", alt: "Grab", width: 180, height: 100 },
  { name: "Delivery Hero", src: "/logos/delivery-hero-logo.svg", alt: "Delivery Hero", width: 320, height: 140 },
  { name: "MyTeksi", src: "/logos/myteksi-logo.svg", alt: "MyTeksi", width: 220, height: 120, darkSrc: "/logos/myteksi-logo-dark.svg" },
  { name: "Foodpanda", src: "/logos/foodpanda-logo.svg", alt: "Foodpanda", width: 220, height: 120 },
  { name: "Talabat", src: "/logos/talabat_logo.svg", alt: "Talabat", width: 220, height: 120 },
  { name: "Hunger Station", src: "/logos/hunger_station_logo.svg", alt: "Hunger Station", width: 220, height: 120 },
  { name: "PedidosYa", src: "/logos/pedidosYa.svg", alt: "PedidosYa", width: 220, height: 120 },
  { name: "Smobble", src: "/logos/smobble-logo.svg", alt: "Smobble", width: 220, height: 120, darkSrc: "/logos/smobble-logo-dark.svg" },
  { name: "Zinier", src: "/logos/zinier-logo.svg", alt: "Zinier", width: 220, height: 120, darkSrc: "/logos/zinier-logo-dark.svg" },
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
    <div className="inline-flex items-baseline gap-2 flex-wrap text-4xl">
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
      <span className="inline-block align-baseline w-full sm:w-auto">who crafts end-to-end digital experiences that actually work.</span>
    </div>
  );
}

export default function Home() {
  const [hoveredFootnote, setHoveredFootnote] = useState<number | null>(null);
  const [latestBlog, setLatestBlog] = useState<Array<{ slug: string; title: string; description: string; date: string; readingTime: string; cover?: string }>>([]);

  // Audio pronunciation handler
  const playNamePronunciation = () => {
    const audio = new Audio('/audio/sabri-ibrahim.mp3');
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  // Fetch latest blog posts for homepage section
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/content/latest');
        if (!res.ok) return;
        const data = await res.json();
        setLatestBlog(data.blog || []);
      } catch (err) {
        // no-op: keep sections hidden on error
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MainNavigation showAvatarOnTop={true} />

      <main className="w-full">
        {/* Home Section with integrated Marquee */}
        <section id="home" className="relative min-h-screen flex flex-col px-3 sm:px-4 overflow-hidden">
          {/* Background Ripple Effect */}
          <BackgroundRippleEffect rows={8} cols={30} cellSize={48} />
          
          {/* Hero Content - 70% */}
          <div className="relative z-10 flex-[0.7] flex items-center justify-center py-16 sm:py-20 pt-32 sm:pt-40 pointer-events-none">
            <div className="max-w-4xl w-full pointer-events-auto">
              <div className="space-y-2">
                {/* Badge */}
                <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={playNamePronunciation}
                        className="inline-flex items-center cursor-pointer hover:scale-110 transition-transform"
                        aria-label="Play name pronunciation"
                      >
                        <AudioLines className="size-4 text-primary" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hear pronunciation</p>
                    </TooltipContent>
                  </Tooltip>
                  Hi, I'm Sabri Ibrahim 👋🏼
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex cursor-help">
                        <VerifiedIcon className="size-4 text-[#1D9BF0]" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified</p>
                    </TooltipContent>
                  </Tooltip>
                </Badge>

                {/* Headline */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight">
                  <RoleTypewriter />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                {/* Subheadline */}
                <p className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-base sm:text-lg">
                I specialize in UX, AI prompt craft, and designing where technology meets human behavior for business growth. 10+ years building products that drive growth 🚀. 
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <RainbowButton
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto"
                  onClick={() => {
                    const target = document.getElementById('blog');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Lessons from Failure
                </RainbowButton>
              </div>
              </div>
            </div>
          </div>

          {/* Marquee Section - 30% */}
          <div className="relative z-10 flex-[0.3] flex flex-col justify-center py-6 sm:py-8">
            {/* Divider */}
            <div className="w-full max-w-6xl mx-auto px-4 mb-6 sm:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Headline */}
            <div className="text-center mb-4 sm:mb-6 px-4">
              <p className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base max-w-3xl mx-auto">
                Driving UX for <span className="text-primary font-medium"><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>millions of users</Highlighter></span> across global markets, specializing in Southeast Asia.
              </p>
            </div>

            {/* Marquee Logos */}
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeContent speed={40} pauseOnHover>
                {employerLogos.map((logo, index) => (
                  <MarqueeItem
                    key={`marquee-logo-${index}`}
                    className="flex items-center justify-center px-4 sm:px-6"
                  >
                    {/* Light mode logo */}
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className={`object-contain h-[32px] w-auto ${logo.darkSrc ? "dark:hidden" : ""}`}
                    />
                    {/* Dark mode logo */}
                    {logo.darkSrc && (
                      <Image
                        src={logo.darkSrc}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="hidden object-contain h-[32px] w-auto dark:block"
                      />
                    )}
                  </MarqueeItem>
                ))}
              </MarqueeContent>
              <MarqueeFade side="right" />
            </Marquee>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen px-3 sm:px-4 py-16 sm:py-20 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            {/* Headline with Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                About Me
              </h2>
              <Badge variant="outline" className="gap-2 px-4 py-2 text-sm font-medium w-fit">
                {/* Pulsing green dot */}
                <span className="inline-flex items-center">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </span>
                Available for Work
              </Badge>
            </div>

            {/* Subheadline */}
            

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  I'm Sabri — a product designer, lifelong learner, and <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(1)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>curiosity-junkie</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [1]</span><FootnoteImage footnoteId={1} isVisible={hoveredFootnote === 1} /></span> who dives into rabbit holes, side projects and an embarrassingly large number of open tabs.
                </div>
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  Based in <del>Sabah</del>, <del>Singapore</del>, <del>Berlin</del>, <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(2)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>Kuala Lumpur</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [2]</span><FootnoteImage footnoteId={2} isVisible={hoveredFootnote === 2} /></span>. Remote-friendly and open to relocating (because the ideas don't always stay in one time-zone).
                </div>
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  I speak Bahasa, English and very fluent in Sarawakian (Sabahan by roots, Sarawakian by tongue) — but honestly, inside my head it's mostly sticky notes, <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(3)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>scattered thoughts</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [3]</span><FootnoteImage footnoteId={3} isVisible={hoveredFootnote === 3} /></span>, and the occasional brilliant metaphor.
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  When I'm not designing, you'll find me chasing <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(4)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>sneaker drops</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [4]</span><FootnoteImage footnoteId={4} isVisible={hoveredFootnote === 4} /></span> (even though I only have two feet), riding my scooter until my mind empties, or winding down with a game.
                </div>
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  10+ years <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(5)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>building products end-to-end</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [5]</span><FootnoteImage footnoteId={5} isVisible={hoveredFootnote === 5} /></span>. I craft UX and the prompts that power it. Growth, monetization, and the spots where psychology quietly moves the needle.
                </div>
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(6)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>Hip-hop</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [6]</span><FootnoteImage footnoteId={6} isVisible={hoveredFootnote === 6} /></span>'s my go-to soundtrack— Kendrick, Eminem, and anything with a story worth replaying.
                </div>
                <div className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-sm sm:text-base">
                  Ask me about sneakers, <span className="text-primary cursor-pointer font-medium relative" onMouseEnter={() => setHoveredFootnote(7)} onMouseLeave={() => setHoveredFootnote(null)}><Highlighter action="highlight" color="var(--primary)" strokeWidth={3} animationDuration={800} padding={5}>AI tools</Highlighter><span className="text-primary/60 text-xs sm:text-sm"> [7]</span><FootnoteImage footnoteId={7} isVisible={hoveredFootnote === 7} /></span>—or what the latest NetworkChuck's YouTube videos.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full mx-auto my-8 sm:my-10">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Footnotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column: Footnotes 1-4 */}
              <div className="space-y-3 sm:space-y-4">
                <div id="footnote-1" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">1.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">Currently looking at AI + Design.</span>
                </div>
                <div id="footnote-2" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">2.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">My hometown is Sabah, Malaysia. Formerly EP Holder in Singapore. Working remotely for Berlin based company.</span>
                </div>
                <div id="footnote-3" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">3.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">Dream in English, but when frustrated, switch to Filipino 😂</span>
                </div>
                <div id="footnote-4" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">4.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">Reformed sneaker collector—trying hard to let go of my collection (and the habit).</span>
                </div>
              </div>

              {/* Right Column: Footnotes 5-7 */}
              <div className="space-y-3 sm:space-y-4">
                <div id="footnote-5" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">5.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">Now taking applications for companies who need exactly this.</span>
                </div>
                <div id="footnote-6" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">6.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">I love the beat, the story, the culture.</span>
                </div>
                <div id="footnote-7" className="flex gap-3 sm:gap-4">
                  <span className="font-medium text-primary flex-shrink-0">7.</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">Claude, Cursor, v0, — Usually hitting the token limit while chasing an idea.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="relative min-h-screen flex flex-col px-3 sm:px-4 pb-16 sm:pb-20 bg-white dark:bg-black overflow-hidden">
          {/* Section Header */}
          <div className="relative z-10 flex items-center justify-center py-16 sm:py-20">
            <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8">
              {/* Badge */}
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                Lessons from Failure
              </Badge>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.8] sm:leading-tight">
                <span className="inline-block align-baseline w-full sm:w-auto">Thoughts & Insights</span>
              </h2>

              {/* Subheadline */}
              <p className="prose prose-sm max-w-none font-mono text-foreground leading-relaxed text-base sm:text-lg">
                Sharing experiences, learnings, and perspectives from my journey in product design and technology.
              </p>

              {/* View All CTA */}
              <div className="flex justify-center">
                <Link href="/blog">
                  <InteractiveHoverButton className="px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base font-medium h-auto">
                    View All Posts
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestBlog.map((post) => (
                <Card key={post.slug} className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={post.cover || "/images/default-blog-thumbnail.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  <CardHeader className="space-y-3">
                    {/* Title */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      <CardTitle className="text-lg sm:text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </Link>
                    
                    {/* Subtitle/Description */}
                    <CardDescription className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Date and Reading Time */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    
                    {/* CTA Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read Post
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {latestBlog.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-sm text-muted-foreground">
                    No posts yet. Add files to <code className="font-mono bg-muted px-2 py-1 rounded">content/blog</code>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

