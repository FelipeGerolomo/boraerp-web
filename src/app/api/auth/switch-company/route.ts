import { NextResponse } from "next/server";
import { companyIdSchema } from "@/auth/api/schemas";
import { switchCompany } from "@/auth/server/auth-service";
import { handleRouteError } from "@/auth/server/response";
import {
  clearAuthCookies,
  getAccessToken,
  getAuthenticatedSession,
  setAuthenticatedSession,
} from "@/lib/session/cookies";

export async function POST(request: Request) {
  try {
    const body = companyIdSchema.parse(await request.json());
    const token = await getAccessToken();
    const session = await getAuthenticatedSession();

    if (!token || !session) {
      await clearAuthCookies();
      return NextResponse.json(
        { message: "Sua sessão expirou. Faça login novamente." },
        { status: 401 },
      );
    }

    const response = await switchCompany({ companyId: body.companyId }, token);

    const nextSession = await setAuthenticatedSession(response, {
      companies: session.companies,
    });

    return NextResponse.json({ session: nextSession });
  } catch (error) {
    return handleRouteError(error, "Não foi possível trocar de empresa");
  }
}
