import "server-only";

import { cookies } from "next/headers";
import type { AuthTokenResponse, CompanySummary } from "@/auth/types/auth";
import type {
  AuthenticatedSession,
  PendingCompanySession,
  PublicSession,
} from "@/auth/types/session";
import {
  ACCESS_TOKEN_COOKIE,
  AUTH_SESSION_COOKIE,
  PENDING_COMPANY_COOKIE,
} from "@/lib/session/constants";

const isSecure = process.env.NODE_ENV === "production";

function baseCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isSecure,
    path: "/",
  };
}

function parseJsonCookie<T>(value?: string): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function secondsUntil(dateIso: string) {
  const millis = new Date(dateIso).getTime() - Date.now();
  return Math.max(0, Math.floor(millis / 1000));
}

function normalizeCompanies(
  company: CompanySummary,
  companies: CompanySummary[] | undefined,
) {
  if (!companies?.length) {
    return [company];
  }

  const map = new Map<string, CompanySummary>(
    companies.map((item) => [item.id, item]),
  );

  map.set(company.id, company);
  return [...map.values()];
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getAuthenticatedSession() {
  const cookieStore = await cookies();
  const payload = parseJsonCookie<AuthenticatedSession>(
    cookieStore.get(AUTH_SESSION_COOKIE)?.value,
  );

  if (!payload?.user || !payload.company || !payload.expiresAt) {
    return null;
  }

  return payload;
}

export async function getPendingCompanySession() {
  const payload = parseJsonCookie<PendingCompanySession>(
    (await cookies()).get(PENDING_COMPANY_COOKIE)?.value,
  );

  if (!payload?.sessionToken || !payload?.companies?.length) {
    return null;
  }

  return payload;
}

export async function getPublicSession(): Promise<PublicSession> {
  const authenticatedSession = await getAuthenticatedSession();
  if (authenticatedSession) {
    return { state: "authenticated", session: authenticatedSession };
  }

  const pendingSession = await getPendingCompanySession();
  if (pendingSession) {
    return { state: "pending-company", pending: pendingSession };
  }

  return { state: "anonymous" };
}

export async function setAuthenticatedSession(
  payload: AuthTokenResponse,
  options?: { companies?: CompanySummary[] },
) {
  const cookieStore = await cookies();
  const maxAge = secondsUntil(payload.expiresAt);

  const sessionData: AuthenticatedSession = {
    expiresAt: payload.expiresAt,
    user: payload.user,
    company: payload.company,
    companies: normalizeCompanies(payload.company, options?.companies),
  };

  cookieStore.set(ACCESS_TOKEN_COOKIE, payload.accessToken, {
    ...baseCookieOptions(),
    maxAge,
  });

  cookieStore.set(AUTH_SESSION_COOKIE, JSON.stringify(sessionData), {
    ...baseCookieOptions(),
    maxAge,
  });

  cookieStore.delete(PENDING_COMPANY_COOKIE);

  return sessionData;
}

export async function setPendingCompanySession(payload: PendingCompanySession) {
  const cookieStore = await cookies();

  cookieStore.set(PENDING_COMPANY_COOKIE, JSON.stringify(payload), {
    ...baseCookieOptions(),
    maxAge: 60 * 10,
  });

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(AUTH_SESSION_COOKIE);
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(AUTH_SESSION_COOKIE);
  cookieStore.delete(PENDING_COMPANY_COOKIE);
}
