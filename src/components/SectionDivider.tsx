import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  /** Enable scroll-triggered animation */
  animated?: boolean;
  /** Color tone: primary (cyan) or accent (orange) */
  tone?: "primary" | "accent";
  className?: string;
}

/**
 * Premium section divider with cyberpunk aesthetics and scroll animation.
 */
export function SectionDivider({
  animated = false,
  tone = "primary",
  className,
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const dotGlowRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    if (!animated) return;

    const container = containerRef.current;
    const dot = dotRef.current;
    const dotInner = dotInnerRef.current;
    const dotGlow = dotGlowRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!container || !dot || !dotInner || !dotGlow || !leftLine || !rightLine) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(dot, { scale: 1, opacity: 1 });
      gsap.set([leftLine, rightLine], { scaleX: 1 });
      gsap.set(dotGlow, { opacity: 0.6 });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.set([leftLine, rightLine], { scaleX: 0, opacity: 0 });
      gsap.set(dotGlow, { scale: 0.5, opacity: 0 });

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // Step 1: Dot appears with bounce
          tl.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
          });

          // Step 2: Glow pulses in
          tl.to(dotGlow, {
            scale: 1,
            opacity: 0.7,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.3");

          // Step 3: Lines expand outward (slow, progressive)
          tl.to([leftLine, rightLine], {
            scaleX: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power1.out",
          }, "-=0.3");

          // Step 4: Subtle glow pulse after lines complete
          tl.to(dotGlow, {
            scale: 1.2,
            opacity: 0.5,
            duration: 0.8,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          }, "-=0.3");
        },
      });
    }, container);

    return () => ctx.revert();
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={cn("relative py-16 flex items-center justify-center", className)}
      aria-hidden="true"
    >
      {/* Left fading line */}
      <div
        ref={leftLineRef}
        className={cn(
          "h-[2px] flex-1 rounded-full mr-4",
          tone === "primary"
            ? "bg-gradient-to-r from-transparent via-primary/20 to-primary/60"
            : "bg-gradient-to-r from-transparent via-accent/20 to-accent/60"
        )}
        style={{ transformOrigin: "right center" }}
      />

      {/* Center decorative element with glow */}
      <div ref={dotRef} className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          ref={dotGlowRef}
          className={cn(
            "absolute w-10 h-10 rounded-full blur-md",
            tone === "primary" ? "bg-primary/40" : "bg-accent/40"
          )}
        />
        
        {/* Outer ring */}
        <div
          className={cn(
            "absolute w-6 h-6 rounded-full border",
            tone === "primary" 
              ? "border-primary/40" 
              : "border-accent/40"
          )}
        />
        
        {/* Inner glowing dot */}
        <div
          ref={dotInnerRef}
          className={cn(
            "w-3 h-3 rounded-full relative z-10",
            tone === "primary" 
              ? "bg-primary shadow-[0_0_12px_4px_hsl(var(--primary)/0.5),0_0_20px_8px_hsl(var(--primary)/0.25)]" 
              : "bg-accent shadow-[0_0_12px_4px_hsl(var(--accent)/0.5),0_0_20px_8px_hsl(var(--accent)/0.25)]"
          )}
        />
      </div>

      {/* Right fading line */}
      <div
        ref={rightLineRef}
        className={cn(
          "h-[2px] flex-1 rounded-full ml-4",
          tone === "primary"
            ? "bg-gradient-to-l from-transparent via-primary/20 to-primary/60"
            : "bg-gradient-to-l from-transparent via-accent/20 to-accent/60"
        )}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
