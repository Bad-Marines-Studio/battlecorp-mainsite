import { useState, useRef, useEffect, type ComponentType } from "react";
import { Swords, Users, Crown, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Images
import militaryImg from "@/assets/victory/military.webp";
import influenceImg from "@/assets/victory/influence.webp";
import dominationImg from "@/assets/victory/domination.webp";

// Icon mapping
const pathIcons: Record<string, ComponentType<{ className?: string }>> = {
  military: Swords,
  influence: Users,
  domination: Crown,
};

// Image mapping
const pathImages: Record<string, string> = {
  military: militaryImg,
  influence: influenceImg,
  domination: dominationImg,
};

export function VictorySection() {
  const { t, language } = useLanguage();
  const section = t.home.sections.victory;
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation with split effect
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

      // Cards spectacular 3D entrance animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        // Initial state: cards are flipped, scaled down, and invisible
        gsap.set(cards, { 
          opacity: 0, 
          y: 120,
          rotateX: -45,
          rotateY: -15,
          scale: 0.8,
          transformPerspective: 1000,
          transformOrigin: "center bottom",
        });
        
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            // Spectacular staggered entrance
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1.2,
              stagger: {
                amount: 0.6,
                from: "start",
              },
              ease: "power4.out",
              onComplete: () => {
                // Add a subtle "landing" bounce
                gsap.to(cards, {
                  y: -8,
                  duration: 0.2,
                  stagger: 0.1,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                });
              },
            });

            // Animate corner brackets with delay
            const brackets = cardsRef.current?.querySelectorAll('[class*="border-l-2"], [class*="border-r-2"]');
            if (brackets) {
              gsap.fromTo(brackets, 
                { opacity: 0, scale: 0 },
                { 
                  opacity: 1, 
                  scale: 1, 
                  duration: 0.4, 
                  stagger: 0.02,
                  delay: 0.8,
                  ease: "back.out(2)",
                }
              );
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sync carousel with active card
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setActiveCard(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

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
              {section.paths.map((path) => (
                <CarouselItem key={path.id} className="basis-[90%]">
                  <VictoryCard
                    path={path}
                    isExpanded={expandedPath === path.id}
                    onToggle={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                    translations={{
                      expandPath: section.expandPath,
                      collapsePath: section.collapsePath,
                    }}
                    isMobile={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {section.paths.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => carouselApi?.scrollTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeCard 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={
                  language === "fr"
                    ? `Aller à la voie ${idx + 1}`
                    : `Go to path ${idx + 1}`
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

        {/* Desktop: Victory Paths Grid */}
        <div ref={cardsRef} className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {section.paths.map((path) => (
            <VictoryCard
              key={path.id}
              path={path}
              isExpanded={expandedPath === path.id}
              onToggle={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
              translations={{
                expandPath: section.expandPath,
                collapsePath: section.collapsePath,
              }}
              isMobile={false}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

interface VictoryCardProps {
  path: {
    id: string;
    title: string;
    tag: string;
    category: string;
    description: string;
    steps: string[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  translations: {
    expandPath: string;
    collapsePath: string;
  };
  isMobile?: boolean;
}

function VictoryCard({ path, isExpanded, onToggle, translations, isMobile = false }: VictoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const Icon = pathIcons[path.id] || Swords;
  const image = pathImages[path.id] || militaryImg;

  // GSAP-powered premium tilt effect
  useEffect(() => {
    if (isMobile || !cardRef.current || !cardInnerRef.current) return;

    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    const shine = shineRef.current;
    const icon = iconRef.current;
    const content = contentRef.current;

    let bounds: DOMRect;
    let isHovering = false;

    const updateBounds = () => {
      bounds = card.getBoundingClientRect();
    };

    const handleMouseEnter = () => {
      isHovering = true;
      updateBounds();
      
      // Scale up slightly on hover
      gsap.to(cardInner, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
      
      // Show shine effect
      if (shine) {
        gsap.to(shine, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isHovering || !bounds) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Calculate rotation with smooth clamping
      const percentX = (mouseX - centerX) / centerX;
      const percentY = (mouseY - centerY) / centerY;
      
      const maxTilt = 12;
      const rotateX = -percentY * maxTilt;
      const rotateY = percentX * maxTilt;

      // Smooth tilt animation
      gsap.to(cardInner, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      });

      // Dynamic shadow based on tilt
      const shadowX = percentX * 20;
      const shadowY = percentY * 20;
      gsap.to(cardInner, {
        boxShadow: `
          ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3),
          ${shadowX * 0.5}px ${shadowY * 0.5}px 15px rgba(0, 0, 0, 0.2),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
        duration: 0.3,
      });

      // Shine effect follows cursor
      if (shine) {
        gsap.to(shine, {
          background: `radial-gradient(
            circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 30%,
            transparent 60%
          )`,
          duration: 0.2,
        });
      }

      // Parallax effect on icon (moves opposite to tilt)
      if (icon) {
        gsap.to(icon, {
          x: percentX * -8,
          y: percentY * -8,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Subtle parallax on content
      if (content) {
        gsap.to(content, {
          x: percentX * -4,
          y: percentY * -4,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;

      // Reset all transforms smoothly
      gsap.to(cardInner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });

      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.4,
        });
      }

      if (icon) {
        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (content) {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateBounds);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateBounds);
    };
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      className={cn("group", isMobile ? "mx-2" : "")}
      style={isMobile ? {} : { perspective: "1000px" }}
    >
      <div
        ref={cardInnerRef}
        className="relative bg-card border border-border rounded-lg overflow-hidden will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Shine overlay */}
        {!isMobile && (
          <div
            ref={shineRef}
            className="absolute inset-0 z-20 pointer-events-none opacity-0"
            style={{ mixBlendMode: "overlay" }}
          />
        )}

        {/* Corner brackets with glow */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/50 z-10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/50 z-10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/50 z-10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/50 z-10 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]" />

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={path.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Icon overlay with parallax */}
          <div
            ref={iconRef}
            className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-background/90"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Tag badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/30 group-hover:border-primary/50">
              {path.tag}
            </span>
          </div>
        </div>

        {/* Content with parallax */}
        <div ref={contentRef} className="p-6" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2">{path.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {path.description}
          </p>

          {/* Expand button */}
          <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between p-3 bg-secondary/50 hover:bg-secondary rounded-md transition-all duration-300 hover:shadow-md"
          >
            <span className="text-sm font-medium text-foreground">
              {isExpanded ? translations.collapsePath : translations.expandPath}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-primary transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Expandable steps */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3">
              {path.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold border border-primary/30">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
