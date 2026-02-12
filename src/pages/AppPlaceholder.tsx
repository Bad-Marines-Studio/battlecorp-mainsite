import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Shield,
  Globe,
  BarChart3,
  TriangleAlert,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage, type Language, type TranslationKeys } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionDivider } from "@/components/SectionDivider";
import { SectionHeader } from "@/components/section/SectionHeader";
import howToBg from "@/assets/howto/step-territories.jpg";
import rankingsBg from "@/assets/pillars/conquete_planetaire.webp";
import disclaimerBg from "@/assets/victory/military.webp";
import heroBg from "@/assets/herodesktop_bg.webp";

gsap.registerPlugin(ScrollTrigger);

type ConnectedContent = TranslationKeys["appConnected"];

const rankingIcons = [Trophy, Shield, Globe, BarChart3] as const;

function ConnectedHero({
  content,
  language,
}: {
  content: ConnectedContent["hero"];
  language: Language;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 50 });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(contentRef.current, {
            y: self.progress * -80,
            opacity: 1 - self.progress * 1.3,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-right"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/86 to-background/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,hsl(var(--primary)/0.18),transparent_45%)]" />

      <Container className="relative z-10 py-16 md:py-24">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <span className="inline-flex mb-6 px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase glass-sm text-primary border-primary/30 rounded-full">
            {content.badge}
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5">
            {content.title.split(content.titleAccent)[0]}
            <span
              className="bc-accent relative inline-block text-accent"
              style={{
                textShadow:
                  "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.2)",
              }}
            >
              {content.titleAccent}
              <span
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/70 to-accent/30"
                style={{ bottom: "-4px" }}
                aria-hidden="true"
              />
            </span>
          </h1>

          <div className="flex justify-center mb-6">
            <Link
              to={`/${language}/app#how-to-play`}
              className="btn-bc btn-cta-primary btn-bc--lg"
              data-ui-sound="play"
            >
              <Play className="h-4 w-4 btn-icon" />
              {content.cta}
            </Link>
          </div>

          <p className="text-lg md:text-xl italic text-muted-foreground mb-8">
            "{content.quote}"
          </p>

          <div className="text-left space-y-4 glass-md border border-border/70 rounded-xl p-5 md:p-8">
            {content.lore.map((paragraph) => (
              <p key={paragraph} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ConnectedHowTo({ content }: { content: ConnectedContent["howTo"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 70, rotateX: -18, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = content.items[activeIndex] ?? content.items[0];
  if (!current) return null;

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : content.items.length - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev < content.items.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <Container>
      <div ref={sectionRef}>
        <div ref={headerRef}>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            accent={content.accent}
            subtitle={content.subtitle}
            tone="cta"
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={goPrev}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            aria-label={content.previous}
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="text-primary font-mono font-bold">
            {String(activeIndex + 1).padStart(2, "0")} / {String(content.items.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
            aria-label={content.next}
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div
          ref={panelRef}
          className="bg-card/40 border border-border rounded-xl overflow-hidden shadow-lg shadow-primary/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <aside className="lg:border-r border-border p-4 space-y-3">
              {content.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    activeIndex === index
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                  </div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                </button>
              ))}
            </aside>

            <div className="lg:col-span-2 p-5 md:p-7">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{current.title}</h3>
              <p className="text-muted-foreground mb-5">{current.description}</p>

              <div className="aspect-video rounded-xl border border-primary/30 bg-gradient-to-br from-card via-secondary/60 to-card flex items-center justify-center mb-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
                <div className="relative z-10 text-center">
                  <div className="mx-auto mb-3 w-14 h-14 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary ml-0.5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.12em] text-primary font-semibold">
                    {content.placeholderLabel}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{current.duration}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {current.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ConnectedRankings({
  content,
}: {
  content: ConnectedContent["rankings"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 80, rotateX: -20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeItem = content.items[activeIndex] ?? content.items[0];
  if (!activeItem) return null;

  const Icon = rankingIcons[activeIndex] ?? Trophy;

  return (
    <Container>
      <div ref={sectionRef}>
        <div ref={headerRef}>
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            accent={content.accent}
            subtitle={content.subtitle}
            tone="cta"
          />
        </div>

        <div ref={panelRef} className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary/60" />

          <div className="border-b border-border bg-card/60">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {content.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 py-4 text-left border-b-2 transition-colors ${
                    index === activeIndex
                      ? "border-primary bg-card text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <span className="block text-xs font-mono text-primary mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center py-3 border-b border-border/60 bg-card/30">
            <p className="text-xs font-mono tracking-[0.14em] text-muted-foreground">
              <span className="text-primary">{content.statusLabel}</span>
              {` ${String(activeIndex + 1).padStart(2, "0")}/${String(content.items.length).padStart(2, "0")} `}
              <span className="text-primary">-</span>
              {` ${activeItem.title.toUpperCase()}`}
            </p>
          </div>

          <div className="bg-card/30 border border-border border-t-0 rounded-b-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-8 lg:border-r border-border">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase bg-primary/20 text-primary border border-primary/30 mb-5">
                  {activeItem.category}
                </span>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded border border-primary/40 bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{activeItem.title}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{activeItem.tagline}</p>

                <ul className="space-y-3">
                  {activeItem.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-8 bg-secondary/20">
                <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary mb-4">
                  {content.previewTitle}
                </h4>
                <div className="space-y-3">
                  {content.previewRows.map((player, index) => (
                    <div
                      key={player}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        index === 0
                          ? "border-primary/30 bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <span className="font-semibold">{content.rankPrefix}{index + 1}</span>
                      <span className="text-muted-foreground">{player}</span>
                      <span className="text-primary font-mono">{content.valuePlaceholder}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ConnectedDisclaimer({
  content,
  backHomeLabel,
  homePath,
}: {
  content: ConnectedContent["disclaimer"];
  backHomeLabel: string;
  homePath: string;
}) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        blockRef.current,
        { opacity: 0, y: 70, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "top 84%",
            once: true,
          },
        }
      );
    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container>
      <div ref={blockRef}>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          accent={content.accent}
          subtitle={content.subtitle}
          tone="cta"
        />

        <div className="max-w-4xl mx-auto border border-accent/35 bg-card/75 rounded-xl p-5 md:p-8 shadow-[0_0_30px_hsl(var(--accent)/0.1)]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-semibold tracking-[0.12em] uppercase mb-5">
            <TriangleAlert className="w-4 h-4" />
            {content.badgeLabel}
          </div>

          <div className="space-y-4 mb-8">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <Link to={homePath} className="btn-bc btn-cta-secondary btn-bc--md">
            {backHomeLabel}
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default function AppPlaceholder() {
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const content = t.appConnected;

  useEffect(() => {
    setDocumentMeta({
      title: content.meta.title,
      description: content.meta.description,
      path: location.pathname,
      language,
    });
  }, [content.meta.description, content.meta.title, location.pathname, language]);

  return (
    <div key={language}>
      <ConnectedHero content={content.hero} language={language} />

      <SectionDivider animated className="py-8 md:py-12" />

      <Section id="how-to-play" className="pt-0" backgroundImage={howToBg} backgroundPosition="center 30%">
        <ConnectedHowTo content={content.howTo} />
      </Section>

      <SectionDivider animated />

      <Section id="leaderboards" backgroundImage={rankingsBg} backgroundPosition="center 24%">
        <ConnectedRankings content={content.rankings} />
      </Section>

      <SectionDivider animated tone="accent" />

      <Section id="beta-warning" backgroundImage={disclaimerBg} backgroundPosition="center 20%" backgroundOpacity={0.18}>
        <ConnectedDisclaimer
          content={content.disclaimer}
          backHomeLabel={content.common.backHome}
          homePath={getLocalizedPath("/")}
        />
      </Section>
    </div>
  );
}
