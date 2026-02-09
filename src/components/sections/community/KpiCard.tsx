import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

interface KpiCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  index: number;
}

export function KpiCard({ value, label, icon, index }: KpiCardProps) {
  const { value: animatedValue, ref: countRef } = useCountUp(value);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (!cardRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Set initial state - 3D flip from bottom
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 80,
      rotateX: -60,
      rotateY: index % 2 === 0 ? -15 : 15,
      scale: 0.7,
      transformPerspective: 1000,
      transformOrigin: "center bottom",
    });

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        // Main entrance animation
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "back.out(1.4)",
          onComplete: () => {
            // Landing bounce
            gsap.to(cardRef.current, {
              y: -6,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            });
            
            // Icon pulse
            if (iconContainerRef.current) {
              gsap.fromTo(iconContainerRef.current, 
                { scale: 1 },
                { 
                  scale: 1.2, 
                  duration: 0.3, 
                  yoyo: true, 
                  repeat: 1,
                  ease: "elastic.out(1, 0.5)"
                }
              );
            }
          }
        });
      },
    });
  }, [index]);

  // Tilt effect on hover
  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    const shine = shineRef.current;
    const iconContainer = iconContainerRef.current;
    
    if (!card || !inner || !glow || !shine || !iconContainer) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -12;
      const rotateY = (mouseX / (rect.width / 2)) * 12;

      gsap.to(inner, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
      });

      // Glow follows cursor
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(glow, {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--primary) / 0.4) 0%, transparent 60%)`,
        duration: 0.3,
      });

      // Shine effect
      gsap.to(shine, {
        background: `radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--primary) / 0.15) 0%, transparent 50%)`,
        opacity: 1,
        duration: 0.3,
      });

      // Icon floats with parallax
      gsap.to(iconContainer, {
        x: mouseX * 0.1,
        y: mouseY * 0.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(inner, {
        scale: 1.05,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
      gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(glow, { opacity: 0, duration: 0.3 });
      gsap.to(shine, { opacity: 0, duration: 0.3 });
      gsap.to(iconContainer, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={innerRef}
        className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 md:p-6 overflow-hidden transition-colors hover:border-primary/50"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated glow background */}
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-0 pointer-events-none transition-opacity"
          style={{ zIndex: 0 }}
        />

        {/* Shine overlay */}
        <div
          ref={shineRef}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-3" style={{ transform: "translateZ(20px)" }}>
          {/* Icon with glow */}
          <div
            ref={iconContainerRef}
            className="relative"
          >
            <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-primary p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors">
              {icon}
            </div>
          </div>

          {/* Value */}
          <div ref={countRef}>
            <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              {animatedValue.toLocaleString("fr-FR")}
            </span>
          </div>

          {/* Label */}
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
            {label}
          </span>
        </div>

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent 50%, hsl(var(--primary) / 0.1))",
          }}
        />
      </div>
    </div>
  );
}
