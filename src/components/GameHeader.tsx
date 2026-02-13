import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS } from "@/constants/auth";
import { LanguageSwitch } from "./LanguageSwitch";
import { AccountManager } from "./account/AccountManager";
import logo from "@/assets/battlecorp_logo.webp";

export function GameHeader() {
  const { getLocalizedPath } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const getAuthModalLink = (action: string) => {
    const params = new URLSearchParams(location.search);
    params.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, action);
    return `${location.pathname}?${params.toString()}${location.hash}`;
  };

  const handleAuthAction = (action: string) => {
    navigate(getAuthModalLink(action));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/55 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-3 md:px-5">
        <Link to={getLocalizedPath("/")} className="flex items-center gap-2">
          <img src={logo} alt="BattleCorp" className="h-8 w-8" />
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <AccountManager
            onLoginClick={() => handleAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN)}
            onRegisterClick={() => handleAuthAction(APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER)}
          />
        </div>
      </div>
    </header>
  );
}

