import { NextResponse } from "next/server"
import { isApiClientError } from "@/lib/api/http"
import { getAccessToken, getAuthenticatedSession } from "@/lib/session/cookies"

export async function getLookupApiContext() {
  const token = await getAccessToken()
  const session = await getAuthenticatedSession()

  if (!token || !session) {
    return null
  }

  return { token }
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Sua sessão expirou. Faça login novamente." },
    { status: 401 },
  )
}

export function handleLookupRouteError(error: unknown, fallback: string) {
  if (isApiClientError(error)) {
    return NextResponse.json(
      {
        message: error.message,
        problem: error.problem,
      },
      { status: error.status },
    )
  }

  return NextResponse.json({ message: fallback }, { status: 500 })
}
