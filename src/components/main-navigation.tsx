"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface MainNavigationProps {
  showAvatarOnTop?: boolean;
}

export function MainNavigation({ showAvatarOnTop = true }: MainNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const pathname = usePathname();

  // Preload avatar image and track loading state
  useEffect(() => {
    const img = new Image();
    img.src = "/avatar.jpg";
    
    const handleLoad = () => {
      setAvatarLoaded(true);
    };
    
    const handleError = () => {
      setAvatarLoaded(false);
    };
    
    // If already cached/loaded, set loaded immediately
    if (img.complete && img.naturalHeight !== 0) {
      setAvatarLoaded(true);
    } else {
      img.onload = handleLoad;
      img.onerror = handleError;
    }
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  // Smooth scroll handler for anchor links
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
            const targetPosition = targetElement.offsetTop - 80;
            
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
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Determine active link based on pathname
  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      // For anchor links, check if we're on homepage
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navLinks = [
    { href: '/about', label: 'About', isAnchor: false },
    { href: '/experience', label: 'Experience', isAnchor: false },
    { href: '/blog', label: 'Blog', isAnchor: false },
  ];

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav className="fixed z-50 top-0 left-0 right-0 md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:rounded-full max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-3 py-2 border-b md:border border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-lg">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between w-full">
            {/* Mobile: Avatar on Left */}
            {showAvatarOnTop && (
              <div className="md:hidden">
                <Link href="/" className="flex items-center">
                  <Avatar className="size-8">
                    <AvatarImage 
                      src="/avatar.jpg" 
                      alt="Sabri Ibrahim"
                      onLoad={() => setAvatarLoaded(true)}
                      onError={() => setAvatarLoaded(false)}
                      className={avatarLoaded ? 'opacity-100' : 'opacity-0'}
                    />
                    <AvatarFallback 
                      className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm transition-opacity duration-200 ${
                        avatarLoaded ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      SI
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )}

            {/* Center: Desktop Menu */}
            <div className="flex-1 items-center justify-center hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink 
                        href={link.href}
                        className={`text-sm font-medium font-mono transition-colors px-3 py-2 rounded-full hover:bg-accent/50 ${
                          isActive(link.href)
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile: Theme Toggle + Menu Button on Right */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full"
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
              </Button>
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent/50 ${
                      isActive(link.href)
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Avatar Section - Floating on the left */}
      {showAvatarOnTop && (
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
          className="hidden md:flex fixed z-[60] top-4 left-4 w-auto items-center h-[60px]"
        >
          <Link 
            href="/" 
            className="flex items-center group cursor-pointer w-fit"
          >
            <Avatar className="size-8 sm:size-10">
              <AvatarImage 
                src="/avatar.jpg" 
                alt="Sabri Ibrahim"
                onLoad={() => setAvatarLoaded(true)}
                onError={() => setAvatarLoaded(false)}
                className={avatarLoaded ? 'opacity-100' : 'opacity-0'}
              />
              <AvatarFallback 
                className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm sm:text-lg transition-opacity duration-200 ${
                  avatarLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                SI
              </AvatarFallback>
            </Avatar>
          </Link>
        </motion.div>
      )}

      {/* Theme Toggle - Floating on top right (Desktop only) */}
      <div className="hidden md:flex fixed z-[60] top-4 right-4 items-center gap-1 rounded-full px-3 py-2 border border-border/30 bg-background/95 backdrop-blur-sm shadow-sm">
        <ThemeToggle />
      </div>
    </>
  );
}


