import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 90);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const label = language === "fr" ? "DÉFILER" : "SCROLL";

  return (
    <div
      className={cn(
        "absolute left-1/2 bottom-5 md:bottom-7 -translate-x-1/2",
        "flex flex-col items-center gap-2.5",
        "pointer-events-none select-none",
        "transition-opacity duration-250 ease-out",
        "drop-shadow-[0_0_14px_hsl(var(--primary)/0.14)]",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-hidden="true"
    >
      {/* Rail group */}
      <div className="relative w-10 h-[54px] flex items-center justify-center">
        {/* Vertical rail line */}
        <div
          className="absolute w-0.5 h-8 top-4 rounded-full opacity-90"
          style={{
            background: `linear-gradient(180deg, 
              hsl(var(--primary) / 0) 0%, 
              hsl(var(--primary) / 0.55) 50%, 
              hsl(var(--primary) / 0.25) 100%)`
          }}
        />
        {/* Animated dot */}
        <div className="scroll-indicator-dot w-2 h-2 rounded-full bg-primary/90 shadow-[0_0_16px_hsl(var(--primary)/0.35)]" />
      </div>

      {/* Chevron */}
      <svg
        className="scroll-indicator-chevron w-5 h-5 opacity-85"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="hsl(var(--primary) / 0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* HUD label chip */}
      <div className="scroll-indicator-label relative">
        {/* HUD cuts - left */}
        <span
          className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-2.5 h-px bg-primary/30 opacity-80"
          aria-hidden="true"
        />
        {/* HUD cuts - right */}
        <span
          className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2.5 h-px bg-primary/30 opacity-80"
          aria-hidden="true"
        />
        
        {/* Label text */}
        <span className="relative z-10 text-[11px] md:text-[11px] tracking-[0.22em] font-extrabold text-primary/80 uppercase">
          {label}
        </span>

        {/* Shimmer overlay */}
        <span className="scroll-indicator-shimmer absolute inset-[-1px] rounded-full overflow-hidden pointer-events-none mix-blend-screen" />
      </div>
    </div>
  );
}
