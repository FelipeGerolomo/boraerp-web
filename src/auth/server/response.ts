import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isApiClientError } from "@/lib/api/http";

export function handleRouteError(
  error: unknown,
  fallback = "Erro inesperado",
) {
  if (isApiClientError(error)) {
    return NextResponse.json(
      {
        message: error.message,
        problem: error.problem,
      },
      { status: error.status },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        message: "Dados da requisição inválidos",
        errors: error.flatten(),
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: fallback }, { status: 500 });
}
