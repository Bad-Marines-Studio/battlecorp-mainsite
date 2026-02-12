import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();

  const isFr = language === "fr";
  const springEase = "cubic-bezier(0.34,1.56,0.64,1)";

  return (
    <div
      className="
        relative flex items-center
        bg-background/60 backdrop-blur-md
        rounded-full
        p-1
        border border-border/50
        shadow-[inset_0_1px_0_0_hsl(var(--foreground)/0.05)]
      "
    >
      {/* Sliding pill indicator */}
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)]",
          "bg-primary rounded-full",
          "shadow-[0_0_12px_hsl(var(--primary)/0.5),0_0_24px_hsl(var(--primary)/0.3)]",
          "transition-all duration-300",
          isFr ? "left-1" : "left-[calc(50%+2px)]"
        )}
        style={{ transitionTimingFunction: springEase }}
        aria-hidden="true"
      />

      {/* FR Button */}
      <button
        onClick={() => setLanguage("fr")}
        className={cn(
          "relative z-10 px-4 py-1.5 text-sm font-semibold rounded-full",
          "transition-all duration-300",
          isFr
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={isFr}
      >
        {t.ui.languageSwitch.fr}
      </button>

      {/* EN Button */}
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "relative z-10 px-4 py-1.5 text-sm font-semibold rounded-full",
          "transition-all duration-300",
          !isFr
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={!isFr}
      >
        {t.ui.languageSwitch.en}
      </button>
    </div>
  );
}
