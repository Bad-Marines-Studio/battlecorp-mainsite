import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { GameHeader } from "./GameHeader";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { LanguageProvider } from "@/i18n";
import { useUiButtonSounds } from "@/hooks/useUiButtonSounds";
import { AuthModal } from "@/components/auth/AuthModal";

export function Layout() {
  useUiButtonSounds();
  const location = useLocation();
  const isGamePlayRoute = /^\/[^/]+\/game\/play(\/|$)/.test(location.pathname);

  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        {isGamePlayRoute ? <GameHeader /> : <Header />}
        <main role="main" className={`flex-1 ${isGamePlayRoute ? "pt-14" : "pt-16"}`}>
          <Outlet />
        </main>
        {!isGamePlayRoute && <Footer />}
        <AuthModal />
      </div>
    </LanguageProvider>
  );
}
