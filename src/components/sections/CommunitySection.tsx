import { useRef, useEffect } from "react";
import { ExternalLink, Users, Gamepad2, Map, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/section/SectionHeader";
import { EXTERNAL_LINKS } from "@/config/links";
import { KpiCard } from "./community/KpiCard";

export function CommunitySection() {
  const { t } = useLanguage();
  const section = t.home.sections.community;

  // Refs for ScrollTrigger animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const discordRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(headerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      }

      // Discord card animation
      if (discordRef.current) {
        gsap.set(discordRef.current, { opacity: 0, y: 60, scale: 0.98 });
        ScrollTrigger.create({
          trigger: discordRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(discordRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const kpiItems = [
    { value: parseInt(section.kpi.players.value), label: section.kpi.players.label, icon: <Users className="h-8 w-8" />, key: "players" },
    { value: parseInt(section.kpi.games.value), label: section.kpi.games.label, icon: <Gamepad2 className="h-8 w-8" />, key: "games" },
    { value: parseInt(section.kpi.territories.value), label: section.kpi.territories.label, icon: <Map className="h-8 w-8" />, key: "territories" },
    { value: parseInt(section.kpi.betaDays.value), label: section.kpi.betaDays.label, icon: <Calendar className="h-8 w-8" />, key: "betaDays" },
  ];

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

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {kpiItems.map((item, index) => (
            <KpiCard
              key={item.key}
              value={item.value}
              label={item.label}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

        {/* Discord Card */}
        <div ref={discordRef} className="bg-card border border-border rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Discord Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-foreground">
                  {section.discord.title}
                </h3>
                <span className="px-2 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded">
                  {section.discord.live}
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                {section.discord.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {section.discord.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={EXTERNAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                {section.discord.cta}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Channels */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {section.channelsTitle}
              </h4>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {section.discord.channels.map((channel) => (
                  <span
                    key={channel}
                    className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md font-mono"
                  >
                    {channel}
                  </span>
                ))}
              </div>

              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {section.resourcesTitle}
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {section.discord.resources.map((resource) => (
                  <span
                    key={resource}
                    className="px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md"
                  >
                    {resource}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {section.discord.moderation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
