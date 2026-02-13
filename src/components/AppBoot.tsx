import { useEffect, useRef, useState } from "react";
import logo from "@/assets/battlecorp_logo.webp";

interface AppBootProps {
  children: React.ReactNode;
}

const MIN_LOADER_MS = 400;

export function AppBoot({ children }: AppBootProps) {
  const [ready, setReady] = useState(false);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const finish = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(MIN_LOADER_MS - elapsed, 0);
      window.setTimeout(() => setReady(true), remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    const onLoad = () => finish();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <>
      {!ready && (
        <div className="app-loader">
          <div className="app-loader__content">
            <img src={logo} alt="BattleCorp" className="app-loader__logo" />
            <div className="app-loader__bar">
              <div className="app-loader__bar-fill" />
            </div>
            <div className="app-loader__glow" aria-hidden="true" />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
