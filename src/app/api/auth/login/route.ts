import { NextResponse } from "next/server";
import { loginSchema } from "@/auth/api/schemas";
import { loginUser } from "@/auth/server/auth-service";
import { handleRouteError } from "@/auth/server/response";
import {
  setAuthenticatedSession,
  setPendingCompanySession,
} from "@/lib/session/cookies";

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    const response = await loginUser(body);

    if (response.requiresCompanySelection) {
      if (
        !response.sessionToken ||
        !response.user ||
        !response.companies?.length
      ) {
        return NextResponse.json(
          { message: "Dados de seleção de empresa ausentes na resposta de login." },
          { status: 502 },
        );
      }

      await setPendingCompanySession({
        sessionToken: response.sessionToken,
        user: response.user,
        companies: response.companies,
      });

      return NextResponse.json({
        requiresCompanySelection: true,
        companies: response.companies,
      });
    }

    if (
      !response.accessToken ||
      !response.expiresAt ||
      !response.user ||
      !response.company
    ) {
      return NextResponse.json(
        { message: "Dados de sessão autenticada ausentes na resposta de login." },
        { status: 502 },
      );
    }

    const session = await setAuthenticatedSession(
      {
        accessToken: response.accessToken,
        expiresAt: response.expiresAt,
        user: response.user,
        company: response.company,
      },
      { companies: response.companies },
    );

    return NextResponse.json({
      requiresCompanySelection: false,
      session,
    });
  } catch (error) {
    return handleRouteError(error, "Não foi possível entrar");
  }
}
