import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable corner brackets decoration */
  corners?: boolean;
  /** Enable hover glow effect */
  glow?: boolean;
  /** Enable shine sweep animation on hover */
  shine?: boolean;
  /** Intensity of glass blur: sm, md, lg */
  blur?: "sm" | "md" | "lg";
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
};

/**
 * Premium glassmorphism card with optional decorative effects.
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      corners = false,
      glow = false,
      shine = false,
      blur = "md",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass styles
          "relative overflow-hidden rounded-lg",
          "bg-card/40 border border-border/50",
          blurMap[blur],
          // Subtle inner shadow for depth
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
          // Hover elevation
          "transition-all duration-300 ease-out",
          glow && [
            "hover:border-primary/40",
            "hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]",
          ],
          className
        )}
        {...props}
      >
        {/* Shine sweep effect on hover */}
        {shine && (
          <div
            className="
              absolute inset-0 -translate-x-full
              bg-gradient-to-r from-transparent via-white/10 to-transparent
              group-hover:translate-x-full
              transition-transform duration-700 ease-out
              pointer-events-none
            "
            aria-hidden="true"
          />
        )}

        {/* Corner brackets */}
        {corners && (
          <>
            {/* Top-left corner */}
            <div
              className="
                absolute top-0 left-0 w-4 h-4
                border-t-2 border-l-2 border-primary/50
                transition-all duration-300
                group-hover:w-5 group-hover:h-5 group-hover:border-primary
              "
              aria-hidden="true"
            />
            {/* Top-right corner */}
            <div
              className="
                absolute top-0 right-0 w-4 h-4
                border-t-2 border-r-2 border-primary/50
                transition-all duration-300
                group-hover:w-5 group-hover:h-5 group-hover:border-primary
              "
              aria-hidden="true"
            />
            {/* Bottom-left corner */}
            <div
              className="
                absolute bottom-0 left-0 w-4 h-4
                border-b-2 border-l-2 border-primary/50
                transition-all duration-300
                group-hover:w-5 group-hover:h-5 group-hover:border-primary
              "
              aria-hidden="true"
            />
            {/* Bottom-right corner */}
            <div
              className="
                absolute bottom-0 right-0 w-4 h-4
                border-b-2 border-r-2 border-primary/50
                transition-all duration-300
                group-hover:w-5 group-hover:h-5 group-hover:border-primary
              "
              aria-hidden="true"
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
