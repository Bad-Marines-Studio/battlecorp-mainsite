import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Alignment: center (default) or left */
  align?: "left" | "center";
  /** Eyebrow text (uppercase capsule) */
  eyebrow: string;
  /** Full title sentence - the accent word will be highlighted within */
  title: string;
  /** Accent word - will be found and highlighted within title (case-insensitive match) */
  accent: string;
  /** Subtitle - clamped to 2 lines */
  subtitle: string;
  /** Tone: default (cyan) or cta (orange) - default is always cyan */
  tone?: "default" | "cta";
}

/**
 * Renders the title with the accent word highlighted.
 * Finds the first occurrence of `accent` in `title` (case-insensitive)
 * and wraps it in a styled span.
 */
function renderTitleWithAccent(title: string, accent: string, isCta: boolean) {
  // Case-insensitive search for the accent word
  const lowerTitle = title.toLowerCase();
  const lowerAccent = accent.toLowerCase();
  const matchIndex = lowerTitle.indexOf(lowerAccent);

  // Fail-safe: if accent not found, return title as-is
  if (matchIndex === -1) {
    if (import.meta.env.DEV) {
      console.warn(
        `[SectionHeader] Accent word "${accent}" not found in title "${title}"`
      );
    }
    return <>{title}</>;
  }

  // Split title into before / match / after
  const before = title.slice(0, matchIndex);
  const match = title.slice(matchIndex, matchIndex + accent.length);
  const after = title.slice(matchIndex + accent.length);

  return (
    <>
      {before}
      <span
        className={cn(
          "bc-accent relative inline-block",
          isCta ? "text-accent" : "text-primary"
        )}
        style={{
          textShadow: isCta
            ? "0 0 20px hsl(var(--accent) / 0.4), 0 0 40px hsl(var(--accent) / 0.2)"
            : "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)",
        }}
      >
        {match}
        {/* Gradient underline via pseudo-element */}
        <span
          className={cn(
            "absolute left-0 right-0 h-[2px]",
            "bg-gradient-to-r",
            isCta
              ? "from-accent via-accent/70 to-accent/30"
              : "from-primary via-primary/70 to-primary/30"
          )}
          style={{ bottom: "-4px" }}
          aria-hidden="true"
        />
      </span>
      {after}
    </>
  );
}

export function SectionHeader({
  align = "center",
  eyebrow,
  title,
  accent,
  subtitle,
  tone = "default",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isCta = tone === "cta";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        isCenter ? "text-center" : "text-left"
      )}
    >
      {/* Eyebrow capsule with glassmorphism */}
      <div
        className={cn(
          "inline-flex items-center gap-2 mb-4",
          isCenter && "justify-center w-full"
        )}
      >
        <span
          className={cn(
            "px-3 py-1 text-xs font-semibold tracking-[0.15em] uppercase",
            "rounded-sm backdrop-blur-md",
            "transition-all duration-300",
            isCta
              ? "bg-accent/10 text-accent border border-accent/30 shadow-[0_0_15px_hsl(var(--accent)/0.2)]"
              : "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
          )}
        >
          {eyebrow}
        </span>
      </div>

      {/* Title with accent word highlighted within */}
      <h2
        className={cn(
          "text-3xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-4"
        )}
      >
        {renderTitleWithAccent(title, accent, isCta)}
      </h2>

      {/* Subtitle - clamped to 2 lines */}
      <p
        className={cn(
          "text-lg text-muted-foreground",
          isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
        )}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
