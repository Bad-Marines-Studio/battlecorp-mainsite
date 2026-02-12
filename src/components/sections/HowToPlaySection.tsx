import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";

// Step images - unique for each step
import stepBase from "@/assets/howto/step-base.jpg";
import stepTerritories from "@/assets/howto/step-territories.jpg";
import stepProduction from "@/assets/howto/step-production.jpg";
import stepForce from "@/assets/howto/step-force.jpg";

gsap.registerPlugin(ScrollTrigger);

const stepImages = [stepBase, stepTerritories, stepProduction, stepForce];

export function HowToPlaySection() {
  const { t } = useLanguage();
  const section = t.home.sections.howToPlay;
  const isMobile = useIsMobile();
  
  const [activeStep, setActiveStepState] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const inactiveCardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tacticalAdviceRef = useRef<HTMLParagraphElement>(null);
  const isAnimating = useRef(false);

  // ScrollTrigger entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation with scale
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 60, scale: 0.95 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(headerRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }

      // Navigation animation with slide
      if (navRef.current) {
        gsap.set(navRef.current, { opacity: 0, y: 40, scale: 0.9 });
        ScrollTrigger.create({
          trigger: navRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(navRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "back.out(1.5)",
            });
          },
        });
      }

      // Grid spectacular 3D entrance animation
      if (gridRef.current) {
        const gridChildren = gridRef.current.children;
        
        gsap.set(gridChildren, { 
          opacity: 0, 
          y: 80,
          rotateX: -25,
          rotateY: 10,
          scale: 0.85,
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
        
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(gridChildren, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.1,
              stagger: {
                amount: 0.5,
                from: "center",
              },
              ease: "power4.out",
              onComplete: () => {
                // Landing bounce
                gsap.to(gridChildren, {
                  y: -5,
                  duration: 0.15,
                  stagger: 0.05,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                });
              },
            });

            // Animate HUD decorations
            const hudElements = gridRef.current?.querySelectorAll('[class*="border-l-2"], [class*="border-r-2"], [class*="border-t-2"]');
            if (hudElements) {
              gsap.fromTo(hudElements, 
                { opacity: 0, scale: 0 },
                { 
                  opacity: 1, 
                  scale: 1, 
                  duration: 0.3, 
                  stagger: 0.02,
                  delay: 0.7,
                  ease: "back.out(2)",
                }
              );
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const setActiveStep = useCallback((newIndex: number) => {
    if (newIndex === activeStep || newIndex < 0 || newIndex >= section.steps.length || isAnimating.current) return;
    
    isAnimating.current = true;

    // Animate out current content
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });
    
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in",
      });
    }

    if (imageRef.current) {
      tl.to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      }, "<");
    }

    // Animate tactical advice out
    if (tacticalAdviceRef.current) {
      tl.to(tacticalAdviceRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: "power2.in",
      }, "<");
    }

    // Update state and animate cards
    tl.call(() => {
      setActiveStepState(newIndex);
      
      inactiveCardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isActive = i === newIndex;
        
        gsap.to(card, {
          scale: isActive ? 1.02 : 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Animate in new content
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (imageRef.current) {
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
      }, "<0.1");
    }

    // Animate tactical advice in
    if (tacticalAdviceRef.current) {
      tl.to(tacticalAdviceRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      }, "<0.1");
    }
  }, [activeStep, section.steps.length]);

  const handlePrev = useCallback(() => {
    const newIndex = activeStep > 0 
      ? activeStep - 1 
      : section.steps.length - 1;
    setActiveStep(newIndex);
  }, [activeStep, section.steps.length, setActiveStep]);

  const handleNext = useCallback(() => {
    const newIndex = activeStep < section.steps.length - 1 
      ? activeStep + 1 
      : 0;
    setActiveStep(newIndex);
  }, [activeStep, section.steps.length, setActiveStep]);

  // Get grid area based on step index
  const getGridArea = (index: number): string | null => {
    if (index === activeStep) return null; // Active card is rendered separately
    
    // Position mapping for inactive cards based on their index relative to active
    // We want: tl, tr, br positions for the 3 inactive cards
    // bl is always the tactical advice tile
    const inactiveIndices = [0, 1, 2, 3].filter(i => i !== activeStep);
    const position = inactiveIndices.indexOf(index);
    
    const areas = ['tl', 'tr', 'br'];
    return areas[position] || null;
  };

  if (isMobile) {
    return <MobileHowToPlay section={section} />;
  }

  const currentStep = section.steps[activeStep];

  return (
    <Container>
      <div ref={sectionRef}>
        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            accent={section.accentWord}
            subtitle={section.subtitle}
            tone="cta"
          />
        </div>

        {/* Navigation */}
        <div ref={navRef} className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-border hidden sm:block" />
            <button
              onClick={handlePrev}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={section.navigation.previous}
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <span className="text-lg font-bold text-primary min-w-[3ch] text-center">
              0{activeStep + 1}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">0{section.steps.length}</span>
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={section.navigation.next}
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-border to-border hidden sm:block" />
          </div>
        </div>

        {/* Grid Layout */}
        <div 
          ref={gridRef}
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'minmax(200px, 1fr) minmax(400px, 2fr) minmax(200px, 1fr)',
            gridTemplateRows: 'auto auto',
            gridTemplateAreas: `
              "tl center tr"
              "bl center br"
            `,
          }}
        >
          {/* Inactive Cards */}
          {section.steps.map((step, index) => {
            const gridArea = getGridArea(index);
            if (!gridArea) return null;
            
            const isNext = (index === activeStep + 1) || (activeStep === section.steps.length - 1 && index === 0);
            
            return (
              <button
                key={index}
                ref={(el) => { inactiveCardsRef.current[index] = el; }}
                onClick={() => setActiveStep(index)}
                className={`
                  text-left p-5 rounded-lg border transition-all duration-300
                  ${isNext ? 'border-primary/50' : 'border-border'} 
                  bg-card hover:border-primary/70 hover:bg-primary/5 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)] hover:-translate-y-0.5
                  relative overflow-hidden group
                `}
                style={{ gridArea }}
              >
                {/* HUD corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary/30 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary/30 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold border bg-secondary text-muted-foreground border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    0{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base leading-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Active Card (Center) */}
          <div
            ref={activeCardRef}
            className="rounded-lg border border-primary bg-card overflow-hidden shadow-lg shadow-primary/10"
            style={{ gridArea: 'center' }}
          >
            {/* Content */}
            <div ref={contentRef} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-base font-bold border-2 border-primary shadow-lg shadow-primary/30">
                  0{activeStep + 1}
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  {currentStep.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-5 text-base leading-relaxed">
                {currentStep.description}
              </p>

              {/* Image */}
              <div className="aspect-video rounded-lg overflow-hidden mb-5 border border-border relative">
                <img
                  ref={imageRef}
                  src={stepImages[activeStep]}
                  alt={section.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>

              {/* Bullet points */}
              <ul className="space-y-3">
                {currentStep.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tactical Advice Tile (Bottom Left) */}
          <div 
            className="
              rounded-lg border border-accent/35
              bg-gradient-to-br from-accent/18 via-card/88 to-card/72
              p-5 flex flex-col justify-center relative overflow-hidden cursor-default
              shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.16)]
            "
            style={{ gridArea: 'bl' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,hsl(var(--accent)/0.2),transparent_46%)] pointer-events-none" />
            {/* HUD decoration */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent/70 via-accent/40 to-transparent" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-accent/70 via-accent/40 to-transparent" />
            
            <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-3 relative z-10">
              {section.tacticalAdvice.label}
            </p>
            <p 
              ref={tacticalAdviceRef}
              className="text-sm italic text-foreground/80 leading-relaxed relative z-10"
            >
              {section.tacticalAdvice.quotes[activeStep]}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

// Mobile version with swipe carousel
function MobileHowToPlay({ section }: { section: ReturnType<typeof useLanguage>['t']['home']['sections']['howToPlay'] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger entrance animations for mobile
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.animate-scroll');
      if (elements) {
        gsap.set(elements, { opacity: 0, y: 40 });
        
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCard = useCallback((index: number) => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({ 
        behavior: 'smooth', 
        inline: 'center',
        block: 'nearest'
      });
    }
    setActiveIndex(index);
  }, []);

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : section.steps.length - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < section.steps.length - 1 ? activeIndex + 1 : 0;
    scrollToCard(newIndex);
  };

  // Handle scroll to update active index
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.clientWidth || 300;
      const gap = 16; // gap-4 = 16px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      if (index !== activeIndex && index >= 0 && index < section.steps.length) {
        setActiveIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, section.steps.length]);

  return (
    <Container>
      <div ref={sectionRef}>
        {/* Header */}
        <div className="animate-scroll">
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            accent={section.accentWord}
            subtitle={section.subtitle}
            tone="cta"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-scroll">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            aria-label={section.navigation.previous}
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="text-lg font-bold text-primary">
            0{activeIndex + 1}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">0{section.steps.length}</span>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            aria-label={section.navigation.next}
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-4 animate-scroll">
          {section.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipeable Cards */}
        <div 
          ref={cardsRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 animate-scroll"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {section.steps.map((step, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-[85vw] max-w-sm snap-center rounded-lg border p-5 transition-all ${
                index === activeIndex ? 'border-primary bg-card shadow-lg shadow-primary/10' : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                  index === activeIndex 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  0{index + 1}
                </span>
                <h3 className="font-bold text-foreground">{step.title}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {step.description}
              </p>

              <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-border">
                <img
                  src={stepImages[index]}
                  alt={section.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tactical Advice */}
        <div className="mt-6 p-4 rounded-lg border border-accent/35 bg-gradient-to-br from-accent/18 via-card/88 to-card/72 relative overflow-hidden animate-scroll shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,hsl(var(--accent)/0.2),transparent_46%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent/70 via-accent/40 to-transparent" />
          <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-2 relative z-10">
            {section.tacticalAdvice.label}
          </p>
          <p className="text-sm italic text-foreground/80 relative z-10">
            {section.tacticalAdvice.quotes[activeIndex]}
          </p>
        </div>
      </div>
    </Container>
  );
}
