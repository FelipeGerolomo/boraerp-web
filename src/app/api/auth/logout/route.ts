import { NextResponse } from "next/server";
import { logoutUser } from "@/auth/server/auth-service";
import { clearAuthCookies, getAccessToken } from "@/lib/session/cookies";

export async function POST() {
  const token = await getAccessToken();

  try {
    if (token) {
      await logoutUser(token);
    }
  } catch {
    // If backend token is already expired/revoked, we still clear local session.
  }

  await clearAuthCookies();

  return NextResponse.json({ message: "Sessão encerrada" });
}
