import { NextResponse } from "next/server";
import { companyIdSchema } from "@/auth/api/schemas";
import { selectCompany } from "@/auth/server/auth-service";
import { handleRouteError } from "@/auth/server/response";
import {
  getPendingCompanySession,
  setAuthenticatedSession,
} from "@/lib/session/cookies";

export async function POST(request: Request) {
  try {
    const body = companyIdSchema.parse(await request.json());
    const pending = await getPendingCompanySession();

    if (!pending) {
      return NextResponse.json(
        { message: "A sessão de seleção de empresa expirou. Faça login novamente." },
        { status: 401 },
      );
    }

    const selected = pending.companies.find(
      (company) => company.id === body.companyId,
    );

    if (!selected) {
      return NextResponse.json(
        { message: "Você não tem acesso à empresa selecionada." },
        { status: 403 },
      );
    }

    const authResponse = await selectCompany({
      sessionToken: pending.sessionToken,
      companyId: body.companyId,
    });

    const session = await setAuthenticatedSession(authResponse, {
      companies: pending.companies,
    });

    return NextResponse.json({ session });
  } catch (error) {
    return handleRouteError(error, "Não foi possível selecionar a empresa");
  }
}
