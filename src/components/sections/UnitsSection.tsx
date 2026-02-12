import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Swords, Target, Shield, Heart, Factory, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

// Import unit images
import unitMarine from "@/assets/unit-marine.jpg";
import unitCommando from "@/assets/unit-commando.jpg";
import unitCyborg from "@/assets/unit-cyborg.jpg";
import unitTank from "@/assets/unit-tank.jpg";
import unitArtillery from "@/assets/unit-artillery.jpg";
import unitBomber from "@/assets/unit-bomber.jpg";
import unitFighter from "@/assets/unit-fighter.jpg";

const unitImages: Record<string, string> = {
  marine: unitMarine,
  commando: unitCommando,
  cyborg: unitCyborg,
  tank: unitTank,
  artillery: unitArtillery,
  bomber: unitBomber,
  fighter: unitFighter,
};

// Stat bar component
function StatBar({
  label,
  value,
  maxValue = 20,
  icon: Icon,
  naLabel,
}: {
  label: string;
  value: number | null;
  maxValue?: number;
  icon: React.ElementType;
  naLabel: string;
}) {
  const isNA = value === null;
  const percentage = isNA ? 0 : (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        {!isNA && (
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      <span className="text-sm font-medium w-8 text-right text-foreground">
        {isNA ? naLabel : value}
      </span>
    </div>
  );
}

// Cost item display
function CostItem({
  resources,
  costs,
}: {
  resources: Record<string, string>;
  costs: { resource: string; amount: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {costs.map((cost, idx) => (
        <span
          key={idx}
          className="text-sm text-foreground"
        >
          {cost.amount} {resources[cost.resource as keyof typeof resources]}
          {idx < costs.length - 1 && " +"}
        </span>
      ))}
    </div>
  );
}

export function UnitsSection() {
  const { t, language } = useLanguage();
  const section = t.home.sections.units;
  const [activeUnit, setActiveUnit] = useState(0);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const currentUnit = section.list[activeUnit];
  const currentImage = unitImages[currentUnit.id] || unitMarine;

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

      // Grid columns spectacular 3D entrance
      if (gridRef.current) {
        const columns = gridRef.current.children;
        
        gsap.set(columns, { 
          opacity: 0, 
          y: 100,
          rotateY: -20,
          rotateX: -15,
          scale: 0.85,
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
        
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(columns, {
              opacity: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.1,
              stagger: {
                amount: 0.4,
                from: "start",
              },
              ease: "power4.out",
              onComplete: () => {
                // Landing bounce
                gsap.to(columns, {
                  y: -6,
                  duration: 0.15,
                  stagger: 0.08,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                });
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Ref to track unit change animation for cleanup
  const detailsTweenRef = useRef<gsap.core.Tween | null>(null);

  // Animate unit change with proper cleanup
  useEffect(() => {
    if (!detailsRef.current) return;

    // Kill previous tween to prevent accumulation on rapid clicks
    detailsTweenRef.current?.kill();

    detailsTweenRef.current = gsap.fromTo(detailsRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeUnit]);

  // Sync carousel with activeUnit state with proper cleanup
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const selectedIndex = carouselApi.selectedScrollSnap();
      setActiveUnit(selectedIndex);
      // Reset expanded state when changing slides
      setExpandedCard(null);
    };

    carouselApi.on("select", onSelect);
    
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const toggleExpand = useCallback((index: number) => {
    setExpandedCard(prev => prev === index ? null : index);
  }, []);

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

        {/* Mobile: Swipeable Cards Carousel */}
        <div className="md:hidden">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "center", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {section.list.map((unit, index) => {
                const unitImage = unitImages[unit.id] || unitMarine;
                const isExpanded = expandedCard === index;
                
                return (
                  <CarouselItem key={unit.id} className="pl-2 basis-[90%]">
                    <div className="bg-card border border-border rounded-xl overflow-hidden mx-1">
                      {/* Unit Image */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={unitImage}
                          alt={unit.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                      </div>

                      {/* Main Content (always visible) */}
                      <div className="p-4 -mt-8 relative z-10">
                        {/* Header: Name + Badges */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {unit.name}
                          </h3>
                          <Badge variant="outline" className="text-xs shrink-0 bg-card/80">
                            {section.categories[unit.category]}
                          </Badge>
                        </div>
                        
                        <Badge
                          variant={unit.role === "terrestrial" ? "secondary" : "default"}
                          className="text-xs mb-3"
                        >
                          {section.roles[unit.role]}
                        </Badge>
                        
                        {/* Slogan */}
                        <p className="text-sm text-primary italic mb-4">
                          "{unit.slogan}"
                        </p>

                        {/* Compact Stats */}
                        <div className="space-y-2 mb-4">
                          <StatBar label={section.labels.melee} value={unit.stats.melee} icon={Swords} naLabel={section.labels.na} />
                          <StatBar label={section.labels.ranged} value={unit.stats.ranged} icon={Target} naLabel={section.labels.na} />
                          <StatBar label={section.labels.defense} value={unit.stats.defense} icon={Shield} naLabel={section.labels.na} />
                          <StatBar label={section.labels.resistance} value={unit.stats.resistance} icon={Heart} naLabel={section.labels.na} />
                        </div>

                        {/* Expand/Collapse Button */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(index)}
                          className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              {section.mobile.collapse}
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              {section.mobile.expand}
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Expanded Content (conditional) */}
                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
                          {/* Production */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Factory className="w-4 h-4 text-primary" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                {section.sections.production}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">{section.production.label}</span>
                                <span className="font-medium text-foreground">{section.buildingNames[unit.building]}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {section.production.unit}
                                </span>
                                <span className="font-medium text-foreground">{unit.production}</span>
                              </div>
                            </div>
                          </div>

                          {/* Costs */}
                          <div className="mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
                              {section.sections.costs}
                            </span>
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs text-muted-foreground block mb-0.5">{section.costs.fabrication}</span>
                                <CostItem resources={section.resources} costs={unit.fabrication} />
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground block mb-0.5">{section.costs.maintenance}</span>
                                <CostItem resources={section.resources} costs={unit.maintenance} />
                              </div>
                            </div>
                          </div>

                          {/* Special Ability */}
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">
                              {section.sections.specialAbility}
                            </span>
                            <span className="text-sm text-foreground">
                              {unit.ability
                                ? section.abilities[unit.ability as keyof typeof section.abilities]
                                : section.sections.none}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {section.list.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => carouselApi?.scrollTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeUnit 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                )}
                aria-label={
                  language === "fr"
                    ? `Aller à l'unité ${idx + 1}`
                    : `Go to unit ${idx + 1}`
                }
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{section.mobile.swipeHint}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </p>
        </div>

        {/* Desktop: 3-Column Layout */}
        <div ref={gridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr] gap-6">
          {/* Column 1: Unit List */}
          <div ref={listRef} className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-col gap-3">
              {section.list.map((unit, index) => (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setActiveUnit(index)}
                  className={cn(
                    "w-full p-3 rounded-lg border text-left transition-all",
                    activeUnit === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full overflow-hidden border-2 shrink-0",
                        activeUnit === index ? "border-primary" : "border-border"
                      )}
                    >
                      <img
                        src={unitImages[unit.id] || unitMarine}
                        alt={unit.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          "font-medium truncate",
                          activeUnit === index ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {unit.name}
                        </span>
                        <Badge
                          variant={unit.role === "terrestrial" ? "secondary" : "default"}
                          className="text-[10px] px-1.5 py-0 shrink-0"
                        >
                          {section.roles[unit.role]}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {section.buildingNames[unit.building]}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Image + Production + Costs */}
          <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
            {/* Unit Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={currentImage}
                alt={currentUnit.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Production */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {section.sections.production}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{section.production.label}</span>
                  <span className="text-sm font-medium text-foreground">
                    {section.buildingNames[currentUnit.building]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {section.production.unit}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {currentUnit.production}
                  </span>
                </div>
              </div>
            </div>

            {/* Costs */}
            <div className="p-4 border-t border-border flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
                {section.sections.costs}
              </span>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">
                    {section.costs.fabrication}
                  </span>
                  <CostItem resources={section.resources} costs={currentUnit.fabrication} />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">
                    {section.costs.maintenance}
                  </span>
                  <CostItem resources={section.resources} costs={currentUnit.maintenance} />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Details + Stats + Ability */}
          <div ref={detailsRef} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
            {/* Header with name and category */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-foreground">
                  {currentUnit.name}
                </h3>
                <Badge variant="outline" className="text-xs shrink-0">
                  {section.categories[currentUnit.category]}
                </Badge>
              </div>
              <Badge
                variant={currentUnit.role === "terrestrial" ? "secondary" : "default"}
                className="text-xs mb-3"
              >
                {section.roles[currentUnit.role]}
              </Badge>
              <p className="text-sm text-primary italic">
                "{currentUnit.slogan}"
              </p>
            </div>

            {/* Stats */}
            <div className="p-4 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
                {section.sections.characteristics}
              </span>
              <div className="space-y-3">
                <StatBar label={section.labels.melee} value={currentUnit.stats.melee} icon={Swords} naLabel={section.labels.na} />
                <StatBar label={section.labels.ranged} value={currentUnit.stats.ranged} icon={Target} naLabel={section.labels.na} />
                <StatBar label={section.labels.defense} value={currentUnit.stats.defense} icon={Shield} naLabel={section.labels.na} />
                <StatBar label={section.labels.resistance} value={currentUnit.stats.resistance} icon={Heart} naLabel={section.labels.na} />
              </div>
            </div>

            {/* Special Ability */}
            <div className="p-4 flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
                {section.sections.specialAbility}
              </span>
              <p className="text-sm text-foreground">
                {currentUnit.ability
                  ? section.abilities[currentUnit.ability as keyof typeof section.abilities]
                  : section.sections.none}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
