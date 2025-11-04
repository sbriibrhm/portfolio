import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageBadgeProps {
  children: ReactNode;
  showAvailableDot?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export function PageBadge({ children, showAvailableDot = false, className = "", variant = "outline" }: PageBadgeProps) {
  return (
    <Badge 
      variant={variant} 
      className={cn("gap-2 px-4 py-2 text-sm font-medium", className)}
    >
      {/* Pulsing green dot (optional) */}
      {showAvailableDot && (
        <span className="inline-flex items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </span>
      )}
      
      {children}
    </Badge>
  );
}

