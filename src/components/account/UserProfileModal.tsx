import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { AccountDetails } from "./profile/AccountDetails";
import { EmailChange } from "./profile/EmailChange";
import { PasswordChange } from "./profile/PasswordChange";
import { AccountDeletion } from "./profile/AccountDeletion";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function UserProfileModal({ open, onClose }: UserProfileModalProps) {
  const { t } = useLanguage();
  const accountText = (t.auth as any).account ?? {};

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[130] flex items-stretch justify-center overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label={t.common.close}
      />

      <div className="relative z-10 w-full sm:flex sm:items-center sm:justify-center sm:p-6">
        <div
          className="
            w-full
            min-h-[100dvh]
            max-w-3xl
            bg-background/85
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            sm:min-h-0
            sm:max-h-[85vh]
            sm:rounded-2xl
            sm:border sm:border-primary/20
            sm:overflow-hidden
          "
          role="dialog"
          aria-modal="true"
          aria-label={accountText.title ?? "Profile"}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative border-b border-primary/20 px-6 py-4 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {accountText.title ?? "Profile"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label={t.common.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="scrollbar-bc max-h-[calc(100dvh-6rem)] space-y-6 overflow-y-auto px-6 py-6 sm:max-h-[70vh]">
            <section className="space-y-4 border-b border-white/5 pb-6">
              <AccountDetails />
            </section>
            <section className="space-y-4 border-b border-white/5 pb-6">
              <EmailChange />
            </section>
            <section className="space-y-4 border-b border-white/5 pb-6">
              <PasswordChange />
            </section>
            <section className="space-y-4">
              <AccountDeletion />
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
