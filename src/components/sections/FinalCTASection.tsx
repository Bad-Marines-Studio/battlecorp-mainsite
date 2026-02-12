import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTASection() {
  const { t, language } = useLanguage();
  const section = t.home.sections.cta;

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const proofsRef = useRef<HTMLDivElement>(null);

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
              duration: 0.9,
              ease: "power3.out",
            });
          },
        });
      }

      // CTAs animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        gsap.set(buttons, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(buttons, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.4)",
            });
          },
        });
      }

      // Proofs stagger animation
      if (proofsRef.current) {
        const proofItems = proofsRef.current.children;
        gsap.set(proofItems, { opacity: 0, scale: 0.9 });
        
        ScrollTrigger.create({
          trigger: proofsRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(proofItems, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.2)",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, hsl(var(--primary) / 0.08) 0%, transparent 60%)
          `,
        }}
      />
      
      <Container className="py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto">
          <div ref={headerRef}>
            <SectionHeader
              align="center"
              eyebrow={section.eyebrow}
              title={section.title}
              accent={section.accentWord}
              subtitle={section.subtitle}
              tone="cta"
            />
          </div>

          {/* CTAs with premium buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to={`/${language}/auth`}
              className="btn-bc btn-cta-primary btn-bc--lg"
              data-ui-sound="play"
            >
              {section.ctaPrimary}
            </Link>
            <a href="#how-to-play" className="btn-bc btn-cta-secondary btn-bc--lg">
              <Play className="btn-icon h-4 w-4" />
              {section.ctaSecondary}
            </a>
          </div>

          {/* Proofs with premium styling */}
          <div ref={proofsRef} className="flex flex-wrap justify-center gap-6">
            {section.proofs.map((proof) => (
              <div
                key={proof}
                className="
                  flex items-center gap-2 text-sm text-muted-foreground
                  px-3 py-1.5 rounded-full
                  glass-sm
                "
              >
                <Check className="h-4 w-4 text-primary" />
                {proof}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
