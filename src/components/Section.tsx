import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundOpacity?: number;
}

export function Section({
  id,
  children,
  className,
  backgroundImage,
  backgroundPosition = "center",
  backgroundOpacity = 0.22,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section-py scroll-mt-24 relative overflow-hidden isolate", className)}
    >
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition,
              opacity: backgroundOpacity,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/88 to-background/94" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.12),transparent_45%)]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
