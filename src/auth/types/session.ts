import type { CompanySummary, UserSummary } from "@/auth/types/auth";

export type AuthenticatedSession = {
  expiresAt: string;
  user: UserSummary;
  company: CompanySummary;
  companies: CompanySummary[];
};

export type PendingCompanySession = {
  sessionToken: string;
  user: UserSummary;
  companies: CompanySummary[];
};

export type PublicSession =
  | { state: "authenticated"; session: AuthenticatedSession }
  | { state: "pending-company"; pending: PendingCompanySession }
  | { state: "anonymous" };
