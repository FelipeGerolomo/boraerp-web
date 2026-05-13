import { NextResponse } from "next/server";
import { registerRequestSchema } from "@/auth/api/schemas";
import { registerUser } from "@/auth/server/auth-service";
import { handleRouteError } from "@/auth/server/response";

export async function POST(request: Request) {
  try {
    const body = registerRequestSchema.parse(await request.json());

    const response = await registerUser({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      companyName: body.companyName,
      cnpj: body.cnpj,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json(response);
  } catch (error) {
    return handleRouteError(error, "Não foi possível criar a conta");
  }
}
