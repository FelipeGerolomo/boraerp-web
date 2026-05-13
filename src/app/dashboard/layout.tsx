import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AuthSessionProvider } from "@/auth/components/auth-session-provider";
import { DashboardShell } from "@/components/dashboard-shell";
import { QueryProvider } from "@/components/providers/query-provider";
import { getAuthenticatedSession } from "@/lib/session/cookies";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthenticatedSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <QueryProvider>
      <AuthSessionProvider initialSession={session}>
        <DashboardShell>{children}</DashboardShell>
      </AuthSessionProvider>
    </QueryProvider>
  );
}
