import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { isApiClientError } from "@/lib/api/http"
import { getAccessToken, getAuthenticatedSession } from "@/lib/session/cookies"

type ProductApiContext = {
  token: string
  companyId: string
}

export async function getProductApiContext() {
  const token = await getAccessToken()
  const session = await getAuthenticatedSession()

  if (!token || !session) {
    return null
  }

  return {
    token,
    companyId: session.company.id,
  } satisfies ProductApiContext
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Sua sessão expirou. Faça login novamente." },
    { status: 401 },
  )
}

export function handleProductRouteError(error: unknown, fallback: string) {
  if (isApiClientError(error)) {
    return NextResponse.json(
      {
        message: error.message,
        problem: error.problem,
      },
      { status: error.status },
    )
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        message: "Dados da requisição inválidos",
        errors: error.flatten(),
      },
      { status: 400 },
    )
  }

  return NextResponse.json({ message: fallback }, { status: 500 })
}
