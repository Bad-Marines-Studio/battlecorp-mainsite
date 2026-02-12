import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { LanguageProvider } from "@/i18n";
import { useUiButtonSounds } from "@/hooks/useUiButtonSounds";

export function Layout() {
  useUiButtonSounds();

  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main role="main" className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
