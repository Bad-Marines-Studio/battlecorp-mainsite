import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { EXTERNAL_LINKS, getWhitepaperUrl } from "@/config/links";
import { Container } from "./Container";
import logo from "@/assets/battlecorp_logo.webp";

export function Footer() {
  const { t, language, getLocalizedPath } = useLanguage();
  const currentYear = new Date().getFullYear();

  const externalLinks = [
    { label: t.footer.links.whitepaper, href: getWhitepaperUrl(language) },
    { label: t.footer.links.wiki, href: EXTERNAL_LINKS.wiki },
    { label: t.footer.links.support, href: EXTERNAL_LINKS.support },
  ];

  const socialLinks = [
    { label: t.footer.links.discord, href: EXTERNAL_LINKS.discord },
    { label: t.footer.links.facebook, href: EXTERNAL_LINKS.facebook },
  ];

  const legalLinks = [
    { label: t.footer.legal.terms, path: "/terms" },
    { label: t.footer.legal.cookies, path: "/cookies" },
    { label: t.footer.legal.privacy, path: "/privacy" },
  ];

  return (
    <footer className="relative border-t border-border bg-secondary/30">
      {/* Luminous bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        aria-hidden="true"
      >
        {/* Base glow layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        {/* Intense center glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        {/* Outer soft glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-md" />
      </div>
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              to={getLocalizedPath("/")}
              className="flex items-center gap-3 group mb-4"
            >
              <img
                src={logo}
                alt="BattleCorp"
                className="h-10 w-10 transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-bold tracking-wider">
                {t.header.brand}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.meta.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t.footer.sections.links}
            </h3>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t.footer.sections.social}
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              {t.footer.sections.legal}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} BattleCorp. {t.footer.rights}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
