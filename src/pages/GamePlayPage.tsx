import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n";

type ActiveVersionResponse = {
  version: string;
};

function getActiveVersionUrl(): string {
  return import.meta.env.VITE_ENV === "production"
    ? "/uprod/activeVersion.json"
    : "/utest/activeVersion.json";
}

export default function GamePlayPage() {
  const { language } = useLanguage();
  const [activeVersion, setActiveVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(!import.meta.env.DEV);
  const [error, setError] = useState<string | null>(null);

  const devIframeUrl = import.meta.env.VITE_GAME_DEV_IFRAME_URL || "/game-dev-placeholder.html";
  const activeVersionUrl = useMemo(() => getActiveVersionUrl(), []);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    let cancelled = false;

    const loadActiveVersion = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(activeVersionUrl, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as ActiveVersionResponse;
        const version = data?.version?.trim();

        if (!version) {
          throw new Error("Missing version in activeVersion.json");
        }

        if (!cancelled) {
          setActiveVersion(version);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadActiveVersion();

    return () => {
      cancelled = true;
    };
  }, [activeVersionUrl]);

  if (import.meta.env.DEV) {
    return (
      <section className="h-[calc(100vh-56px)] w-full overflow-hidden p-2 md:p-3">
        <div className="mb-2 text-xs text-muted-foreground">
          Dev mode iframe placeholder ({language.toUpperCase()})
        </div>
        <iframe
          title="Battlecorp Game Dev Placeholder"
          src={devIframeUrl}
          className="h-[calc(100%-1.5rem)] w-full rounded-lg border border-border bg-card"
        />
      </section>
    );
  }

  return (
    <section className="h-[calc(100vh-56px)] w-full overflow-hidden p-2 md:p-3">
      <div className="h-full w-full rounded-lg border border-border bg-card p-6">
        <h1 className="mb-3 text-xl font-semibold">Game Runtime Config</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Active version source: <code>{activeVersionUrl}</code>
        </p>

        {loading && <p className="text-sm">Loading active Unity version...</p>}

        {!loading && error && (
          <p className="text-sm text-destructive">
            Failed to load active version: {error}
          </p>
        )}

        {!loading && !error && activeVersion && (
          <p className="text-sm">
            Active Unity version: <strong>{activeVersion}</strong>
          </p>
        )}
      </div>
    </section>
  );
}
