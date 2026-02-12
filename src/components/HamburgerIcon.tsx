import { cn } from "@/lib/utils";

interface HamburgerIconProps {
  isOpen: boolean;
  className?: string;
}

/**
 * Premium animated hamburger icon that morphs into an X when open.
 * Features glassmorphism background, glowing bars, and smooth CSS animations.
 */
export function HamburgerIcon({ isOpen, className }: HamburgerIconProps) {
  const smoothEase = "cubic-bezier(0.4,0,0.2,1)";

  return (
    <div
      className={cn(
        // Container with glassmorphism circle
        "relative w-10 h-10 rounded-full",
        "glass-sm",
        "flex items-center justify-center",
        "transition-all duration-300",
        "hover:border-primary/40",
        isOpen && "border-primary/50 glow-primary",
        className
      )}
      aria-hidden="true"
    >
      {/* Inner bars container */}
      <div className="relative w-5 h-4 flex flex-col justify-between">
        {/* Top bar */}
        <span
          className={cn(
            "block h-0.5 rounded-full",
            "bg-current",
            "transition-all duration-300",
            "origin-center",
            // Width animation for style
            isOpen ? "w-full" : "w-full",
            isOpen && "translate-y-[7px] rotate-45",
            // Glow effect when open
            isOpen && "shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
          )}
          style={{ transitionTimingFunction: smoothEase }}
        />
        
        {/* Middle bar */}
        <span
          className={cn(
            "block h-0.5 rounded-full",
            "bg-current",
            "transition-all duration-300",
            // Shrink from center and fade
            isOpen ? "w-0 opacity-0" : "w-3/4 opacity-100 ml-auto"
          )}
          style={{ transitionTimingFunction: smoothEase }}
        />
        
        {/* Bottom bar */}
        <span
          className={cn(
            "block h-0.5 rounded-full",
            "bg-current",
            "transition-all duration-300",
            "origin-center",
            isOpen ? "w-full" : "w-1/2",
            isOpen && "-translate-y-[7px] -rotate-45",
            // Glow effect when open
            isOpen && "shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
          )}
          style={{ transitionTimingFunction: smoothEase }}
        />
      </div>

      {/* Subtle rotating ring when open */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "border border-primary/0",
          "transition-all duration-500",
          isOpen && "border-primary/30 animate-[spin_8s_linear_infinite]"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
