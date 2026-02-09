import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  /** Animation variant */
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "stagger";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Distance for translate animations (pixels) */
  distance?: number;
  /** Stagger delay for child elements (seconds) */
  stagger?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Enable parallax effect */
  parallax?: boolean;
  /** Parallax intensity (0-1) */
  parallaxIntensity?: number;
}

const defaultOptions: ScrollRevealOptions = {
  variant: "fade-up",
  delay: 0,
  duration: 0.8,
  distance: 60,
  stagger: 0.1,
  start: "top 85%",
  parallax: false,
  parallaxIntensity: 0.2,
};

/**
 * Hook for scroll-triggered reveal animations using GSAP ScrollTrigger
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const opts = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial state based on variant
      const initialState: gsap.TweenVars = { opacity: 0 };
      const animateState: gsap.TweenVars = { 
        opacity: 1,
        duration: opts.duration,
        delay: opts.delay,
        ease: "power3.out",
      };

      switch (opts.variant) {
        case "fade-up":
          initialState.y = opts.distance;
          animateState.y = 0;
          break;
        case "fade-left":
          initialState.x = opts.distance;
          animateState.x = 0;
          break;
        case "fade-right":
          initialState.x = -opts.distance!;
          animateState.x = 0;
          break;
        case "scale":
          initialState.scale = 0.9;
          animateState.scale = 1;
          break;
        case "stagger":
          // For stagger, we animate children
          break;
      }

      if (opts.variant === "stagger") {
        // Animate all direct children with stagger
        const children = element.children;
        gsap.set(children, { opacity: 0, y: opts.distance });
        
        ScrollTrigger.create({
          trigger: element,
          start: opts.start,
          once: true,
          onEnter: () => {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: opts.duration,
              stagger: opts.stagger,
              ease: "power3.out",
              delay: opts.delay,
            });
          },
        });
      } else {
        gsap.set(element, initialState);

        ScrollTrigger.create({
          trigger: element,
          start: opts.start,
          once: true,
          onEnter: () => {
            gsap.to(element, animateState);
          },
        });
      }

      // Parallax effect
      if (opts.parallax) {
        ScrollTrigger.create({
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const yOffset = self.progress * 100 * opts.parallaxIntensity!;
            gsap.set(element, { y: -yOffset });
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [opts.variant, opts.delay, opts.duration, opts.distance, opts.stagger, opts.start, opts.parallax, opts.parallaxIntensity]);

  return ref as RefObject<T>;
}

/**
 * Hook for section header animations
 */
export function useSectionHeader(): {
  containerRef: RefObject<HTMLDivElement>;
  eyebrowRef: RefObject<HTMLSpanElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  subtitleRef: RefObject<HTMLParagraphElement>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = [eyebrowRef.current, titleRef.current, subtitleRef.current].filter(Boolean);
      
      gsap.set(elements, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef, eyebrowRef, titleRef, subtitleRef };
}

/**
 * Hook for card grid stagger animations
 */
export function useCardStagger<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: { delay?: number; stagger?: number } = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const { delay = 0, stagger = 0.1 } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const children = container.children;
      
      gsap.set(children, { opacity: 0, y: 50, scale: 0.95 });

      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: stagger,
            delay: delay,
            ease: "back.out(1.2)",
          });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [itemCount, delay, stagger]);

  return ref as RefObject<T>;
}

/**
 * Hook for parallax background effect
 */
export function useParallaxBackground<T extends HTMLElement = HTMLDivElement>(
  intensity: number = 0.3
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const yOffset = (self.progress - 0.5) * 100 * intensity;
          gsap.set(element, { y: yOffset });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [intensity]);

  return ref as RefObject<T>;
}
