"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  initials: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[400px] group relative rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50 flex-shrink-0">
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border">
        <svg
          className="h-5 w-5 text-primary"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Testimonial Text */}
        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed pt-4">
          {testimonial.testimonial}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-t border-border/50 pt-4">
          <Avatar className="size-10 sm:size-12">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
