import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n";

export function AccountDetails() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const accountText = (t.auth as any).account ?? {};
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">
        {accountText.detailsTitle ?? "Account details"}
      </h3>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.username ?? "Username"}
        </label>
        <input
          value={user?.username ?? ""}
          readOnly
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {accountText.email ?? "Email"}
        </label>
        <div className="relative">
          <input
            type={showEmail ? "text" : "password"}
            value={user?.email ?? ""}
            readOnly
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground"
          />
          <button
            type="button"
            onClick={() => setShowEmail((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showEmail ? "Hide email" : "Show email"}
          >
            {showEmail ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
