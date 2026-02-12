import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { setDocumentMeta } from "@/lib/seo";
import { Section } from "@/components/Section";
import { SectionDivider } from "@/components/SectionDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowToPlaySection } from "@/components/sections/HowToPlaySection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { UnitsSection } from "@/components/sections/UnitsSection";
import { VictorySection } from "@/components/sections/VictorySection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import howToBg from "@/assets/howto/step-territories.jpg";
import pillarsBg from "@/assets/pillars/conquete_planetaire.webp";
import unitsBg from "@/assets/unit-tank.jpg";
import victoryBg from "@/assets/victory/military.webp";
import communityBg from "@/assets/hero-bg.jpg";

export default function Home() {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setDocumentMeta({
      title: t.meta.title,
      description: t.meta.description,
      path: location.pathname,
      language,
    });
  }, [t.meta.title, t.meta.description, location.pathname, language]);

  return (
    <div key={language}>
      {/* Hero - no Section wrapper, handles its own spacing */}
      <HeroSection />

      <SectionDivider animated className="py-8 md:py-12" />

      {/* How To Play */}
      <Section
        id="how-to-play"
        className="pt-0"
        backgroundImage={howToBg}
        backgroundPosition="center 28%"
      >
        <HowToPlaySection />
      </Section>

      <SectionDivider animated />

      {/* Pillars */}
      <Section
        id="pillars"
        backgroundImage={pillarsBg}
        backgroundPosition="center 25%"
      >
        <PillarsSection />
      </Section>

      <SectionDivider animated />

      {/* Units */}
      <Section
        id="units"
        backgroundImage={unitsBg}
        backgroundPosition="center 22%"
      >
        <UnitsSection />
      </Section>

      <SectionDivider animated />

      {/* Victory */}
      <Section
        id="victory"
        backgroundImage={victoryBg}
        backgroundPosition="center 20%"
      >
        <VictorySection />
      </Section>

      <SectionDivider animated />

      {/* Community */}
      <Section
        id="community"
        backgroundImage={communityBg}
        backgroundPosition="center 30%"
      >
        <CommunitySection />
      </Section>

      <SectionDivider animated />

      {/* Final CTA - no Section wrapper */}
      <section id="cta-final" className="scroll-mt-24">
        <FinalCTASection />
      </section>
    </div>
  );
}
