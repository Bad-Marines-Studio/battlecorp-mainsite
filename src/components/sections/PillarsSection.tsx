import { useState, useEffect, useRef, type ComponentType } from "react";
import { Map, Coins, Timer, Shield, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import pillarConquest from "@/assets/pillars/conquete_planetaire.webp";
import pillarEconomy from "@/assets/pillars/economy.webp";
import pillarCycles from "@/assets/pillars/cycles.webp";
import pillarHq from "@/assets/pillars/hq.webp";

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for pillars
const pillarIcons: Record<string, ComponentType<{ className?: string }>> = {
  conquest: Map,
  economy: Coins,
  cycles: Timer,
  hq: Shield,
};

// Image mapping - all pillars now have images
const pillarImages: Record<string, string> = {
  conquest: pillarConquest,
  economy: pillarEconomy,
  cycles: pillarCycles,
  hq: pillarHq,
};

interface PillarItem {
  id: string;
  title: string;
  category: string;
  bullets: string[];
  takeaway: string;
}

interface PillarCardProps {
  pillar: PillarItem;
  expanded: boolean;
  onToggle: () => void;
  takeawayLabel: string;
  mobileLabels: {
    expand: string;
    collapse: string;
  };
}

function PillarCard({ pillar, expanded, onToggle, takeawayLabel, mobileLabels }: PillarCardProps) {
  const Icon = pillarIcons[pillar.id] || Map;
  const image = pillarImages[pillar.id] || pillarConquest;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mx-2">
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={image} 
          alt={pillar.title} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        {/* Badge categorie en overlay */}
        <span className="absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold uppercase bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
          {pillar.category}
        </span>
      </div>
      
      {/* Contenu */}
      <div className="p-4">
        {/* Icone + Titre */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded border border-primary/50 bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{pillar.title}</h3>
        </div>
        
        {/* Bullets compacts */}
        <ul className="space-y-2 mb-4">
          {pillar.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span className="line-clamp-2">{bullet}</span>
            </li>
          ))}
        </ul>
        
        {/* Bouton expand */}
        <button 
          type="button"
          onClick={onToggle} 
          className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
        >
          <span className="text-sm font-medium text-foreground">
            {expanded ? mobileLabels.collapse : mobileLabels.expand}
          </span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary" />
          )}
        </button>
        
        {/* Takeaway (expanded) */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300",
            expanded ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-secondary/50 border-l-4 border-primary p-3 rounded-r">
            <span className="text-xs font-semibold uppercase text-primary">{takeawayLabel}</span>
            <p className="text-sm text-foreground mt-1">{pillar.takeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PillarsSection() {
  const { t, language } = useLanguage();
  const section = t.home.sections.pillars;
  const [activePillar, setActivePillar] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Panel spectacular 3D entrance animation
      if (panelRef.current) {
        gsap.set(panelRef.current, { 
          opacity: 0, 
          y: 100,
          rotateX: -30,
          scale: 0.85,
          transformPerspective: 1000,
          transformOrigin: "center top",
        });
        
        ScrollTrigger.create({
          trigger: panelRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(panelRef.current, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              onComplete: () => {
                // Subtle bounce landing
                gsap.to(panelRef.current, {
                  y: -6,
                  duration: 0.15,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                });
              },
            });

            // Animate corner brackets
            const brackets = panelRef.current?.querySelectorAll('[class*="border-l-2"], [class*="border-r-2"]');
            if (brackets) {
              gsap.fromTo(brackets, 
                { opacity: 0, scale: 0 },
                { 
                  opacity: 1, 
                  scale: 1, 
                  duration: 0.4, 
                  stagger: 0.05,
                  delay: 0.6,
                  ease: "back.out(2)",
                }
              );
            }

            // Animate tabs with stagger
            if (tabsRef.current) {
              const tabs = tabsRef.current.querySelectorAll('button');
              gsap.fromTo(tabs,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.1,
                  delay: 0.4,
                  ease: "power3.out",
                }
              );
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ref to track content change animation for cleanup
  const contentTweenRef = useRef<gsap.core.Timeline | null>(null);

  // Animate content change with proper cleanup
  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;

    // Kill previous tween to prevent accumulation on rapid clicks
    contentTweenRef.current?.kill();

    const tl = gsap.timeline();
    contentTweenRef.current = tl;
    
    tl.fromTo(contentRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
    
    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, [activePillar]);

  // Sync carousel with active pillar
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setActivePillar(carouselApi.selectedScrollSnap());
      setExpandedCard(null); // Reset expanded state when swiping
    };
    
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const currentPillar = section.items[activePillar] || section.items[0];
  if (!currentPillar) return null;
  const currentImage = pillarImages[currentPillar.id] || pillarConquest;
  const PillarIcon = pillarIcons[currentPillar.id] || Map;

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

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel 
            setApi={setCarouselApi} 
            opts={{ align: "center", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {section.items.map((pillar, index) => (
                <CarouselItem key={pillar.id} className="basis-[90%]">
                  <PillarCard
                    pillar={pillar}
                    expanded={expandedCard === index}
                    onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                    takeawayLabel={section.takeawayLabel}
                    mobileLabels={section.mobile}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {section.items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => carouselApi?.scrollTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activePillar 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={
                  language === "fr"
                    ? `Aller au pilier ${idx + 1}`
                    : `Go to pillar ${idx + 1}`
                }
              />
            ))}
          </div>

          {/* Swipe hint */}
          <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <ChevronLeft className="w-3 h-3" />
            <span>{section.mobile.swipeHint}</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        {/* Desktop: HUD Panel with corner brackets */}
        <div ref={panelRef} className="hidden md:block relative">
          {/* Corner brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary/60" />

          {/* Tabs navigation */}
          <div ref={tabsRef} className="border-b border-border bg-card/50">
            <div className="grid grid-cols-2 md:grid-cols-4" role="tablist">
              {section.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activePillar === index}
                  onClick={() => setActivePillar(index)}
                  className={cn(
                    "relative px-6 py-5 text-left transition-all duration-200 cursor-pointer",
                    "min-h-[52px] flex items-center",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                    activePillar === index
                      ? "bg-card text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/40 border-b-2 border-transparent"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-sm font-mono font-bold",
                      activePillar === index ? "text-primary" : "text-muted-foreground"
                    )}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium truncate">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic status */}
          <div className="text-center py-3 border-b border-border/50">
            <p className="text-xs font-mono tracking-widest text-muted-foreground">
              <span className="text-primary">{section.statusLabel}</span>
              {` ${String(activePillar + 1).padStart(2, "0")}/${String(section.items.length).padStart(2, "0")} `}
              <span className="text-primary">—</span>
              {` ${currentPillar.title.toUpperCase()}`}
            </p>
          </div>

          {/* Content area */}
          <div className="bg-card/30 border border-border border-t-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Text content */}
              <div ref={contentRef} className="p-6 md:p-10 lg:border-r border-border">
                {/* Category badge */}
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 mb-6">
                  {currentPillar.category}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded border border-primary/50 bg-primary/10 flex items-center justify-center">
                    <PillarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {currentPillar.title}
                  </h3>
                </div>

                {/* Bullets */}
                <ul className="space-y-4 mb-8">
                  {currentPillar.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Takeaway box */}
                <div className="bg-secondary/50 border-l-4 border-primary p-4 rounded-r">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    {section.takeawayLabel}
                  </span>
                  <p className="text-foreground font-medium">
                    {currentPillar.takeaway}
                  </p>
                </div>
              </div>

              {/* Right: Visual preview */}
              <div ref={imageRef} className="relative bg-secondary/20 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                <img
                  src={currentImage}
                  alt={currentPillar.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
