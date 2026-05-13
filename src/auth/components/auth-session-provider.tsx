"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  isAuthApiError,
  logoutRequest,
  switchCompanyRequest,
} from "@/auth/api/client";
import type { AuthenticatedSession } from "@/auth/types/session";

type AuthSessionContextValue = {
  session: AuthenticatedSession;
  isSwitchingCompany: boolean;
  isLoggingOut: boolean;
  switchCompanyError: string | null;
  logoutError: string | null;
  switchCompany: (companyId: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

function getErrorMessage(error: unknown, fallback: string) {
  if (isAuthApiError(error)) {
    return error.message;
  }

  return fallback;
}

export function AuthSessionProvider({
  initialSession,
  children,
}: {
  initialSession: AuthenticatedSession;
  children: ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [isSwitchingCompany, setIsSwitchingCompany] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [switchCompanyError, setSwitchCompanyError] = useState<string | null>(
    null,
  );
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const switchCompany = useCallback(
    async (companyId: string) => {
      if (companyId === session.company.id) {
        return;
      }

      setSwitchCompanyError(null);
      setIsSwitchingCompany(true);

      try {
        const response = await switchCompanyRequest({ companyId });
        setSession(response.session);
        router.refresh();
      } catch (error) {
        const isUnauthorized = isAuthApiError(error) && error.status === 401;

        setSwitchCompanyError(
          getErrorMessage(error, "Could not switch company. Try again."),
        );

        if (isUnauthorized) {
          router.replace("/login");
          router.refresh();
        }
      } finally {
        setIsSwitchingCompany(false);
      }
    },
    [router, session.company.id],
  );

  const logout = useCallback(async () => {
    setLogoutError(null);
    setIsLoggingOut(true);

    try {
      await logoutRequest();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setLogoutError(getErrorMessage(error, "Could not logout. Try again."));
    } finally {
      setIsLoggingOut(false);
    }
  }, [router]);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      session,
      isSwitchingCompany,
      isLoggingOut,
      switchCompanyError,
      logoutError,
      switchCompany,
      logout,
    }),
    [
      session,
      isSwitchingCompany,
      isLoggingOut,
      switchCompanyError,
      logoutError,
      switchCompany,
      logout,
    ],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession must be used within AuthSessionProvider");
  }

  return context;
}
