import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/i18n";

type ActiveVersionResponse = {
  version: string;
};

type UnityInstance = {
  SetFullscreen?: (fullscreen: number) => void;
  Quit?: () => Promise<void>;
};

type UnityConfig = {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  productVersion: string;
  unityRootUrl: string;
};

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: Record<string, unknown>,
      onProgress?: (progress: number) => void
    ) => Promise<UnityInstance>;
    unityInstance?: UnityInstance;
  }
}

function getActiveVersionUrl(): string {
  if (import.meta.env.VITE_UNITY_ACTIVE_VERSION_URL) {
    return import.meta.env.VITE_UNITY_ACTIVE_VERSION_URL;
  }

  return import.meta.env.VITE_ENV === "production"
    ? "/uprod/activeVersion.json"
    : "/utest/activeVersion.json";
}

function getUnityBuildSuffix(activeVersionUrl: string): "PROD" | "PREPROD" {
  return activeVersionUrl.includes("/uprod/") ? "PROD" : "PREPROD";
}

function createUnityConfig(activeVersionUrl: string, version: string): UnityConfig {
  const parsed = new URL(activeVersionUrl, window.location.href);
  const rootPath = parsed.pathname.replace(/\/activeVersion\.json$/i, "");
  const unityRootUrl = `${parsed.origin}${rootPath}`;
  const buildSuffix = getUnityBuildSuffix(activeVersionUrl);
  const buildBaseName = `com.badmarinesstudio.bch.${version}_WebGL_${buildSuffix}`;
  const versionRootUrl = `${unityRootUrl}/${version}`;
  const buildRootUrl = `${versionRootUrl}/Build`;

  return {
    loaderUrl: `${buildRootUrl}/${buildBaseName}.loader.js`,
    dataUrl: `${buildRootUrl}/${buildBaseName}.data`,
    frameworkUrl: `${buildRootUrl}/${buildBaseName}.framework.js`,
    codeUrl: `${buildRootUrl}/${buildBaseName}.wasm`,
    streamingAssetsUrl: `${versionRootUrl}/StreamingAssets`,
    productVersion: version,
    unityRootUrl,
  };
}

export default function GamePlayPage() {
  const { language } = useLanguage();
  const [activeVersion, setActiveVersion] = useState<string | null>(null);
  const [loadingVersion, setLoadingVersion] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unityConfig, setUnityConfig] = useState<UnityConfig | null>(null);
  const [unityProgress, setUnityProgress] = useState(0);
  const [unityReady, setUnityReady] = useState(false);
  const [unityWarning, setUnityWarning] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const unityRef = useRef<UnityInstance | null>(null);

  const activeVersionUrl = useMemo(() => getActiveVersionUrl(), []);

  useEffect(() => {
    let cancelled = false;

    const loadActiveVersion = async () => {
      setLoadingVersion(true);
      setError(null);

      try {
        const response = await fetch(activeVersionUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = (await response.json()) as ActiveVersionResponse;
        const version = data?.version?.trim();
        if (!version) throw new Error("Missing version in activeVersion.json");

        if (cancelled) return;
        setActiveVersion(version);
        setUnityConfig(createUnityConfig(activeVersionUrl, version));
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoadingVersion(false);
      }
    };

    void loadActiveVersion();

    return () => {
      cancelled = true;
    };
  }, [activeVersionUrl]);

  useEffect(() => {
    if (!unityConfig || !canvasRef.current) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const vw = container.clientWidth;
      const vh = container.clientHeight;

      const targetMinAspect = 14 / 9;
      const targetMaxAspect = 20 / 9;
      const containerAspect = vw / Math.max(vh, 1);

      let width = vw;
      let height = vh;

      if (containerAspect > targetMaxAspect) {
        width = vh * targetMaxAspect;
      } else if (containerAspect < targetMinAspect) {
        height = vw / targetMinAspect;
      }

      const horizontalMargin = Math.floor(vw * 0.02);
      const verticalMargin = Math.floor(vh * 0.02);

      canvas.style.width = `${Math.max(1, width - horizontalMargin * 2)}px`;
      canvas.style.height = `${Math.max(1, height - verticalMargin * 2)}px`;
      canvas.style.left = `${Math.max(0, (vw - width) / 2 + horizontalMargin)}px`;
      canvas.style.top = `${Math.max(0, (vh - height) / 2 + verticalMargin)}px`;
    };

    const unityRuntimeConfig = {
      dataUrl: unityConfig.dataUrl,
      frameworkUrl: unityConfig.frameworkUrl,
      codeUrl: unityConfig.codeUrl,
      streamingAssetsUrl: unityConfig.streamingAssetsUrl,
      companyName: "BadMarinesStudio",
      productName: "Battlecorp-horizon",
      productVersion: unityConfig.productVersion,
      matchWebGLToCanvasSize: true,
      autoSyncPersistentDataPath: true,
      showBanner: (message: string, type: string) => {
        if (type === "error" || type === "warning") {
          setUnityWarning(message);
        }
      },
    };

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    setUnityReady(false);
    setUnityProgress(0);
    setUnityWarning(null);

    script = document.createElement("script");
    script.src = unityConfig.loaderUrl;
    script.async = true;

    script.onload = async () => {
      if (cancelled || !window.createUnityInstance) return;

      try {
        const instance = await window.createUnityInstance(
          canvas,
          unityRuntimeConfig,
          (progress) => setUnityProgress(progress)
        );

        if (cancelled) {
          await instance.Quit?.();
          return;
        }

        unityRef.current = instance;
        window.unityInstance = instance;
        setUnityReady(true);
        resizeCanvas();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Unity");
      }
    };

    script.onerror = () => {
      setError("Failed to load Unity loader script");
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      script?.remove();

      const instance = unityRef.current;
      unityRef.current = null;
      if (instance?.Quit) {
        void instance.Quit().catch(() => undefined);
      }
    };
  }, [unityConfig]);

  const handleFullscreen = () => {
    const canvas = canvasRef.current;
    const instance = unityRef.current;
    if (!canvas || !instance) return;

    try {
      instance.SetFullscreen?.(1);
    } catch {
      // no-op
    }

    if (canvas.requestFullscreen) {
      void canvas.requestFullscreen();
    }
  };

  return (
    <section className="h-[calc(100vh-56px)] w-full overflow-hidden bg-[#1a1a1a]">
      <div ref={containerRef} className="relative h-full w-full">
        <canvas ref={canvasRef} id="unity-canvas" tabIndex={1} className="absolute block touch-none" />

        {!unityReady && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#1a1a1a]">
            <div className="flex w-[260px] flex-col items-center gap-3">
              <img
                src={`${unityConfig?.unityRootUrl ?? ""}/TemplateData/bch_app_logo.png`}
                alt="Battlecorp Loading"
                className="h-auto max-w-[220px]"
              />
              <div className="h-3 w-[220px] overflow-hidden rounded-full bg-[#555]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#f88400] to-[#ffb86b] transition-all duration-200"
                  style={{ width: `${Math.floor(unityProgress * 100)}%` }}
                />
              </div>
              <p className="text-xs text-[#c8c8c8]">
                {loadingVersion ? "Loading active version..." : `Loading game ${activeVersion ?? ""}`}
              </p>
              <p className="text-[11px] text-[#9aa0a6]">
                {language.toUpperCase()} source: {activeVersionUrl}
              </p>
            </div>
          </div>
        )}

        {unityWarning && (
          <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-md bg-yellow-500 px-3 py-2 text-xs text-black">
            {unityWarning}
          </div>
        )}

        {error && (
          <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-md bg-red-600 px-3 py-2 text-xs text-white">
            Failed to load Unity: {error}
          </div>
        )}

        {unityReady && (
          <div className="absolute bottom-3 right-3 z-30">
            <button
              type="button"
              onClick={handleFullscreen}
              className="rounded border border-white/20 bg-black/60 px-3 py-2 text-xs text-white hover:bg-black/80"
            >
              Fullscreen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

