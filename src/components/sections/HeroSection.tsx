import { useRef, useEffect, useMemo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import heroBg from "@/assets/herodesktop_bg.webp";

gsap.registerPlugin(ScrollTrigger);

type HeroParticle = {
  delay: number;
  driftX: number;
  driftY: number;
  duration: number;
  id: number;
  left: number;
  size: number;
  tone: "accent" | "primary";
  top: number;
  twinkleDelay: number;
  twinkleDuration: number;
  variant: "base" | "alt";
};

export function HeroSection() {
  const { t, language } = useLanguage();
  const hero = t.home.sections.hero;
  const isMobile = useIsMobile();

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titlePart1Ref = useRef<HTMLSpanElement>(null);
  const titlePart2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const glitchTlRef = useRef<gsap.core.Timeline | null>(null);

  // Memoize particle positions to avoid regeneration on re-renders
  const particleCount = isMobile ? 18 : 44;
  const particles = useMemo<HeroParticle[]>(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: isMobile ? 1.2 + Math.random() * 2 : 1.4 + Math.random() * 3.2,
        delay: Math.random() * 6,
        duration: 4.6 + Math.random() * 5.2,
        driftX: Math.random() * 70 - 35,
        driftY: -(95 + Math.random() * 155),
        twinkleDelay: Math.random() * 2.2,
        twinkleDuration: 1.2 + Math.random() * 1.9,
        // Keep orange dominant so particles align with the hero's warm highlights.
        tone: Math.random() > 0.32 ? "accent" : "primary",
        variant: Math.random() > 0.52 ? "base" : "alt",
      })),
    [isMobile, particleCount]
  );

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      // Show final state without animations
      gsap.set([
        bgRef.current, 
        overlayRef.current, 
        haloRef.current, 
        scanlineRef.current,
        badgeRef.current, 
        titlePart1Ref.current, 
        titlePart2Ref.current, 
        taglineRef.current, 
        ctaContainerRef.current, 
        quoteRef.current
      ], { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state - everything hidden
      gsap.set([badgeRef.current, titlePart1Ref.current, titlePart2Ref.current, taglineRef.current, ctaContainerRef.current, quoteRef.current], {
        opacity: 0,
        y: 60,
      });

      gsap.set(bgRef.current, { scale: 1.15, opacity: 0 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(haloRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(scanlineRef.current, { opacity: 0 });

      // Content elements for will-change cleanup
      const contentElements = [
        badgeRef.current, 
        titlePart1Ref.current, 
        titlePart2Ref.current, 
        taglineRef.current, 
        ctaContainerRef.current, 
        quoteRef.current
      ];

      // Master timeline for entrance animation
      const masterTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Background reveal with zoom
      masterTl
        .to(bgRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 1.2,
        }, "-=1.4")
        .to(haloRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }, "-=1")
        .to(scanlineRef.current, {
          opacity: 0.15,
          duration: 0.5,
        }, "-=0.8");

      // Badge drops in with glitch effect
      masterTl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.6");

      // Title Part 1 - dramatic letter reveal
      masterTl.to(titlePart1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      }, "-=0.3");

      // Title Part 2 - slide in with glow pulse
      masterTl.to(titlePart2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      }, "-=0.5");

      // Tagline fades in
      masterTl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, "-=0.4");

      // CTAs slide up with stagger
      masterTl.to(ctaContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.3");

      // Quote reveal with border animation
      masterTl.to(quoteRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");

      // Remove will-change after entrance animation completes to free GPU memory
      masterTl.eventCallback("onComplete", () => {
        gsap.set(contentElements, { willChange: "auto" });
      });

      // Create optimized setters using gsap.quickTo for scroll updates
      const setBgY = gsap.quickTo(bgRef.current, "y", { duration: 0.1, ease: "none" });
      const setBgScale = gsap.quickTo(bgRef.current, "scale", { duration: 0.1, ease: "none" });
      const setHaloOpacity = gsap.quickTo(haloRef.current, "opacity", { duration: 0.1, ease: "none" });
      const setHaloX = gsap.quickTo(haloRef.current, "x", { duration: 0.1, ease: "none" });
      const setScanlineOpacity = gsap.quickTo(scanlineRef.current, "opacity", { duration: 0.1, ease: "none" });

      // ScrollTrigger parallax effects with optimized setters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Parallax background - moves slower than scroll
          setBgY(progress * 150);
          setBgScale(1 + progress * 0.1);

          // Halo intensifies and shifts
          setHaloOpacity(1 - progress * 0.5);
          setHaloX(progress * 50);

          // Content fades and moves up faster - use gsap.set for batch update
          gsap.set([badgeRef.current, titlePart1Ref.current, titlePart2Ref.current, taglineRef.current, ctaContainerRef.current, quoteRef.current], {
            y: progress * -80,
            opacity: 1 - progress * 1.5,
          });

          // Scanlines intensity increases
          setScanlineOpacity(0.15 + progress * 0.2);
        },
      });

      // Periodic glitch effect on title - stored in ref for pause/resume control
      gsap.set(titlePart2Ref.current, { "--corp-holo-intensity": 0 });
      glitchTlRef.current = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });
      glitchTlRef.current
        .to(titlePart2Ref.current, {
          "--corp-holo-intensity": 1,
          duration: 0.02,
          ease: "none",
        })
        .to(glitchOverlayRef.current, {
          opacity: 0.8,
          duration: 0.04,
        }, "<")
        .to(titlePart2Ref.current, {
          x: -3,
          skewX: -2,
          duration: 0.04,
        })
        .to(glitchOverlayRef.current, {
          opacity: 0,
          duration: 0.04,
        }, "<")
        .to(titlePart2Ref.current, {
          "--corp-holo-intensity": 0.35,
          duration: 0.03,
          ease: "none",
        }, "<")
        .to(titlePart2Ref.current, {
          x: 2,
          skewX: 1,
          duration: 0.04,
        })
        .to(titlePart2Ref.current, {
          x: 0,
          skewX: 0,
          duration: 0.08,
        })
        .to(glitchOverlayRef.current, {
          opacity: 0.5,
          duration: 0.025,
        }, "<")
        .to(titlePart2Ref.current, {
          "--corp-holo-intensity": 0.9,
          duration: 0.015,
          ease: "none",
        }, "<")
        .to(glitchOverlayRef.current, {
          opacity: 0,
          duration: 0.04,
        })
        .to(titlePart2Ref.current, {
          "--corp-holo-intensity": 0,
          duration: 0.06,
          ease: "power1.out",
        }, "<");

      // Pause/resume glitch timeline based on viewport visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          glitchTlRef.current?.pause();
          gsap.set(titlePart2Ref.current, { "--corp-holo-intensity": 0 });
        },
        onEnterBack: () => glitchTlRef.current?.play(),
        onLeaveBack: () => {
          glitchTlRef.current?.pause();
          gsap.set(titlePart2Ref.current, { "--corp-holo-intensity": 0 });
        },
        onEnter: () => glitchTlRef.current?.play(),
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
    >
      {/* Scanline overlay for CRT effect */}
      <div
        ref={scanlineRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          )`,
        }}
      />

      {/* Glitch overlay */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 pointer-events-none z-30 opacity-0"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            hsl(var(--primary) / 0.1) 25%, 
            transparent 50%,
            hsl(var(--accent) / 0.1) 75%,
            transparent 100%
          )`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="
          absolute inset-0 bg-no-repeat
          bg-cover [background-position:70%_center]
          lg:bg-contain lg:bg-right
          will-change-transform
        "
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Overlay gradient */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.75) 35%, rgba(0,0,0,.35) 65%, rgba(0,0,0,.18) 100%)",
        }}
      />

      {/* Animated halo behind soldier */}
      <div
        ref={haloRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background: `
            radial-gradient(800px 600px at 78% 45%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
            radial-gradient(400px 300px at 82% 40%, hsl(var(--primary) / 0.12) 0%, transparent 40%)
          `,
        }}
      />

      {/* Floating particles effect - using memoized positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute hero-particle-container ${
              particle.variant === "base" ? "animate-float-particle" : "animate-float-particle-alt"
            }`}
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                "--drift-x": `${particle.driftX}px`,
                "--drift-y": `${particle.driftY}px`,
                "--particle-delay": `${particle.delay}s`,
                "--particle-duration": `${particle.duration}s`,
                "--twinkle-delay": `${particle.twinkleDelay}s`,
                "--twinkle-duration": `${particle.twinkleDuration}s`,
              } as CSSProperties
            }
          >
            <span
              className={`block h-full w-full rounded-full hero-particle-core animate-particle-twinkle ${
                particle.tone === "accent" ? "hero-particle-accent" : "hero-particle-primary"
              }`}
            />
          </div>
        ))}
      </div>

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge with glassmorphism */}
          <div ref={badgeRef} className="inline-block mb-6 will-change-transform">
            <span className="
              px-4 py-2 text-xs font-semibold tracking-wider uppercase 
              glass-sm text-primary border-primary/30 rounded-full
              shadow-[0_0_15px_hsl(var(--primary)/0.2)]
              inline-flex items-center gap-2
            ">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {hero.badge}
            </span>
          </div>

          {/* Title - spectacular reveal */}
          <h1 className="mb-6 overflow-hidden">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
              <span 
                ref={titlePart1Ref}
                className="inline-block text-foreground will-change-transform"
              >
                {hero.titlePart1}
              </span>
              <span 
                ref={titlePart2Ref}
                className="inline-block text-gradient-accent hero-corp-holo will-change-transform relative"
                data-text={hero.titlePart2}
              >
                {hero.titlePart2}
                {/* Glow effect behind gradient text */}
                <span 
                  className="absolute inset-0 blur-xl bg-accent/20 -z-10"
                  aria-hidden="true"
                />
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p 
            ref={taglineRef}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl will-change-transform"
          >
            {hero.tagline}
          </p>

          {/* CTAs with premium buttons */}
          <div ref={ctaContainerRef} className="flex flex-col sm:flex-row gap-4 mb-10 will-change-transform">
            <Link
              to={`/${language}/auth`}
              className="btn-bc btn-cta-primary btn-bc--md group"
              data-ui-sound="play"
            >
              {hero.cta}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-to-play" className="btn-bc btn-cta-secondary btn-bc--md">
              <Play className="btn-icon h-4 w-4" />
              {hero.ctaSecondary}
            </a>
          </div>

          {/* Quote with premium styling */}
          <blockquote 
            ref={quoteRef}
            className="
              pl-4 border-l-2 border-primary/50
              relative will-change-transform
            "
          >
            <div 
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/30 animate-glow-pulse"
              aria-hidden="true"
            />
            <p className="text-lg italic text-muted-foreground">{hero.quote}</p>
            <cite className="block mt-2 text-sm text-muted-foreground/70 not-italic">{hero.quoteAttribution}</cite>
          </blockquote>

        </div>
      </Container>

      {/* Scroll Indicator */}
      <ScrollIndicator className="z-10" />
    </section>
  );
}
