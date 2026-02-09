import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { EXTERNAL_LINKS, getWhitepaperUrl } from "@/config/links";
import { LanguageSwitch } from "./LanguageSwitch";
import { HamburgerIcon } from "./HamburgerIcon";
import { Container } from "./Container";
import logo from "@/assets/battlecorp_logo.webp";

export function Header() {
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = (root: HTMLElement): HTMLElement[] => {
    const selector =
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

    return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  };

  // Handle scroll for compact header
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap + Escape handling when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const root = menuRef.current;
      if (!root) return;
      const focusables = getFocusableElements(root);
      (focusables[0] ?? root).focus();
    };

    requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const root = menuRef.current;
      if (!root) return;

      const focusables = getFocusableElements(root);
      if (focusables.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !root.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Restore focus to hamburger when menu closes
  useEffect(() => {
    if (isOpen) return;
    if (!lastFocusedRef.current) return;

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      lastFocusedRef.current = null;
    });
  }, [isOpen]);

  // Close menu on route change (language or path)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const externalLinks = [
    { label: t.nav.whitepaper, href: getWhitepaperUrl(language) },
    { label: t.nav.wiki, href: EXTERNAL_LINKS.wiki },
    { label: t.nav.support, href: EXTERNAL_LINKS.support },
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-background/40 backdrop-blur-xl
          border-b border-primary/20
          transition-all duration-300
          ${isCompact ? "py-2" : "py-4"}
        `}
      >
        {/* Luminous bar at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          aria-hidden="true"
        >
          {/* Base glow layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          {/* Intense center glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
          {/* Outer soft glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-md" />
        </div>

        <Container>
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link
              to={getLocalizedPath("/")}
              className="flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="BattleCorp"
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold tracking-wider text-foreground">
                {t.header.brand}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-sm text-muted-foreground 
                    hover:text-primary transition-colors duration-200
                    relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px
                    after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitch />
              <Link
                to={getLocalizedPath("/auth")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link
                to={getLocalizedPath("/auth")}
                className="btn-bc btn-cta-primary btn-bc--sm"
              >
                {t.nav.signup}
              </Link>
            </div>

            {/* Mobile Menu Button with animated hamburger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="
                md:hidden text-foreground
                transition-colors duration-200
                hover:text-primary
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full
              "
              aria-label={isOpen ? t.common.close : t.header.menuOpen}
              aria-expanded={isOpen}
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu - Outside header for proper fixed positioning */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="
              fixed inset-0 bg-background/60 backdrop-blur-sm 
              md:hidden z-[60]
              animate-fade-in
            "
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel with glassmorphism */}
          <nav
            ref={menuRef}
            tabIndex={-1}
            className="
              fixed right-0 top-0 bottom-0 w-full max-w-sm 
              bg-background/80 backdrop-blur-2xl
              border-l border-primary/20
              md:hidden z-[70] overflow-y-auto
              animate-slide-in-right
            "
            role="dialog"
            aria-modal="true"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-lg pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-lg pointer-events-none" aria-hidden="true" />
            
            {/* Panel header (brand + close) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20">
              <Link
                to={getLocalizedPath("/")}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 group"
              >
                <img 
                  src={logo} 
                  alt="BattleCorp" 
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
                />
                <span className="text-base font-bold tracking-wider text-foreground">
                  {t.header.brand}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  w-10 h-10 rounded-full
                  glass-sm
                  flex items-center justify-center
                  text-foreground hover:text-primary 
                  hover:border-primary/40 hover:glow-primary
                  transition-all duration-300
                "
                aria-label={t.common.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col p-6 gap-6">
              {/* Language Switch */}
              <div className="flex justify-center">
                <LanguageSwitch />
              </div>

              {/* Links Section */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {t.header.links}
                </h3>
                <div className="flex flex-col gap-2">
                  {externalLinks.map((link, index) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        py-2 text-foreground hover:text-primary 
                        transition-all duration-200
                        opacity-0 animate-fade-in
                      "
                      style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "forwards" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Section */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {t.header.social}
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href={EXTERNAL_LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      py-2 text-foreground hover:text-primary 
                      transition-all duration-200
                      opacity-0 animate-fade-in
                    "
                    style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
                  >
                    Discord
                  </a>
                  <a
                    href={EXTERNAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      py-2 text-foreground hover:text-primary 
                      transition-all duration-200
                      opacity-0 animate-fade-in
                    "
                    style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
                  >
                    Facebook
                  </a>
                </div>
              </div>

              {/* Auth Actions */}
              <div 
                className="
                  flex flex-col gap-3 pt-4 border-t border-border/50
                  opacity-0 animate-fade-in
                "
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
              >
                <Link
                  to={getLocalizedPath("/auth")}
                  onClick={() => setIsOpen(false)}
                  className="
                    w-full py-3 text-center text-foreground 
                    glass-sm rounded-md 
                    hover:border-primary/40 
                    transition-all duration-300
                  "
                >
                  {t.nav.login}
                </Link>
                <Link
                  to={getLocalizedPath("/auth")}
                  onClick={() => setIsOpen(false)}
                  className="btn-bc btn-cta-primary btn-bc--sm w-full justify-center"
                >
                  {t.nav.signup}
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
