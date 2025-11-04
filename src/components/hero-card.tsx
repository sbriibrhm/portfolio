"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PaintbrushIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

/**
 * 10 mock images; you can replace these with real URLs or Next.js Image components.
 * Keeping them small (~80×80) and compressing them helps performance.
 */
const mockImages = [
  "/images/footnote-1.gif",
  "/images/footnote-2.jpg",
  "/images/footnote-3.jpeg",
  "/images/footnote-4.webp",
  "/images/footnote-5.jpg",
  "/images/footnote-6.gif",
  "/images/footnote-7.webp",
  "/images/footnote-1.gif",
  "/images/footnote-2.jpg",
  "/images/footnote-3.jpeg",
];

export function HeroCard() {
  // Track if component has mounted on client to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  // Generate random sizes for each image (between 60px and 120px) only on client
  const [imageSizes, setImageSizes] = useState<number[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate random sizes only on client side to avoid hydration mismatch
    setImageSizes(
      mockImages.map(() => {
        // Generate random size between 60 and 120 pixels
        return Math.floor(Math.random() * 60) + 60;
      })
    );
  }, []);

  return (
    <div className="relative flex items-center justify-center overflow-hidden w-full min-h-[40vh]">
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={30} cellSize={48} />

      {/* Floating images wrapper - only render after client hydration */}
      {isMounted && imageSizes.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {mockImages.map((src, i) => {
            const size = imageSizes[i];
            return (
              <div
                key={i}
                className={`
                  absolute
                  opacity-80
                  blur-[1px]
                  animate-float${i % 3}
                `}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${15 + (i * 7) % 60}%`,
                  left: `${10 + (i * 11) % 70}%`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  width={size}
                  height={size}
                  className="w-full h-full object-cover rounded-lg"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Main card */}
      <Card className="relative z-10 w-[90%] max-w-md text-center shadow-xl backdrop-blur-sm border-border/40 bg-background/80">
        <CardHeader className="space-y-4">
          {/* Badge with icon and text */}
          <Badge variant="secondary" className="flex items-center gap-2 px-4 py-1 text-sm w-fit mx-auto">
            <PaintbrushIcon className="h-4 w-4" />
            Design &amp; Development
          </Badge>
          <CardTitle className="text-4xl font-bold">Bringing Creative Ideas to Life</CardTitle>
          <CardDescription className="text-base">
            Award‑winning portfolio of digital experiences that combine aesthetic excellence with functional design,
            creating memorable interactions for brands and users alike.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center gap-4 pt-6">
          <Link href="/blog">
            <InteractiveHoverButton>
              View Blog
            </InteractiveHoverButton>
          </Link>
          <Button variant="outline" asChild>
            <Link href="mailto:sbriibrhm@gmail.com">Contact Me</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
