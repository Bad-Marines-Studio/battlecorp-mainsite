import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { AuthProvider } from "@/context/AuthContext";
import { VALID_LANGUAGES, defaultLanguage, type Language } from "@/i18n";
import Home from "@/pages/Home";
import AppPlaceholder from "@/pages/AppPlaceholder";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/NotFound";
import { APP_SEARCH_PARAM_HOME_ACTIONS, APP_SEARCH_PARAM_HOME_KEYS, APP_SEARCH_PARAM_TOKEN } from "@/constants/auth";

// Language guard component - preserves sub-path, search, and hash on redirect
function LanguageGuard({ children }: { children: ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  // If lang is not valid, redirect to default language while preserving the rest of the path
  if (!lang || !VALID_LANGUAGES.includes(lang as Language)) {
    // Extract sub-path after the invalid language segment
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const subPath = pathSegments.slice(1).join("/");
    const redirectPath = subPath 
      ? `/${defaultLanguage}/${subPath}${location.search}${location.hash}`
      : `/${defaultLanguage}${location.search}${location.hash}`;
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

function AuthRouteRedirect() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get(APP_SEARCH_PARAM_HOME_KEYS.ACTION) ?? APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN;
  const token = searchParams.get(APP_SEARCH_PARAM_TOKEN);
  const nextParams = new URLSearchParams();
  nextParams.set(APP_SEARCH_PARAM_HOME_KEYS.ACTION, action);
  if (token) {
    nextParams.set(APP_SEARCH_PARAM_TOKEN, token);
  }

  return <Navigate to={`..?${nextParams.toString()}`} replace />;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to={`/${defaultLanguage}`} replace />} />

            {/* Language-prefixed routes */}
            <Route
              path="/:lang"
              element={
                <LanguageGuard>
                  <Layout />
                </LanguageGuard>
              }
            >
              {/* Home */}
              <Route index element={<Home />} />

              {/* Auth */}
              <Route
                path="auth"
                element={
                  <PublicRoute>
                    <AuthRouteRedirect />
                  </PublicRoute>
                }
              />

              {/* Legacy auth redirects */}
              <Route path="login" element={<Navigate to={`../?${APP_SEARCH_PARAM_HOME_KEYS.ACTION}=${APP_SEARCH_PARAM_HOME_ACTIONS.LOGIN}`} replace />} />
              <Route path="signup" element={<Navigate to={`../?${APP_SEARCH_PARAM_HOME_KEYS.ACTION}=${APP_SEARCH_PARAM_HOME_ACTIONS.REGISTER}`} replace />} />
              <Route path="forgot-password" element={<Navigate to={`../?${APP_SEARCH_PARAM_HOME_KEYS.ACTION}=${APP_SEARCH_PARAM_HOME_ACTIONS.PASSWORD_RESET}`} replace />} />

              {/* App placeholder - Protected */}
              <Route
                path="app"
                element={
                  <PrivateRoute>
                    <AppPlaceholder />
                  </PrivateRoute>
                }
              />
              <Route path="dashboard" element={<Navigate to="../app" replace />} />

              {/* Legal pages */}
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="cookies" element={<Cookies />} />

              {/* 404 within language scope */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Global 404 - outside language scope */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
