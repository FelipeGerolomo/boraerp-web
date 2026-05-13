import type {
  CompanySummary,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "@/auth/types/auth";
import type { AuthenticatedSession } from "@/auth/types/session";

export class AuthApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
  }
}

type AuthResponseBody = {
  message?: string;
  problem?: {
    detail?: string;
    title?: string;
  };
};

async function parseError(response: Response): Promise<never> {
  let payload: AuthResponseBody | null = null;

  try {
    payload = (await response.json()) as AuthResponseBody;
  } catch {
    payload = null;
  }

  const message =
    payload?.problem?.detail ??
    payload?.problem?.title ??
    payload?.message ??
    "Não foi possível concluir a solicitação.";

  throw new AuthApiError(response.status, message);
}

async function postJson<TResponse>(
  path: string,
  body?: unknown,
): Promise<TResponse> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    await parseError(response);
  }

  return (await response.json()) as TResponse;
}

export type LoginResult =
  | {
      requiresCompanySelection: true;
      companies: CompanySummary[];
    }
  | {
      requiresCompanySelection: false;
      session: AuthenticatedSession;
    };

export function signupRequest(input: RegisterRequest) {
  return postJson<RegisterResponse>("/api/auth/signup", input);
}

export function loginRequest(input: LoginRequest) {
  return postJson<LoginResult>("/api/auth/login", input);
}

export function selectCompanyRequest(input: { companyId: string }) {
  return postJson<{ session: AuthenticatedSession }>(
    "/api/auth/select-company",
    input,
  );
}

export function switchCompanyRequest(input: { companyId: string }) {
  return postJson<{ session: AuthenticatedSession }>(
    "/api/auth/switch-company",
    input,
  );
}

export function logoutRequest() {
  return postJson<{ message: string }>("/api/auth/logout");
}

export function isAuthApiError(error: unknown): error is AuthApiError {
  return error instanceof AuthApiError;
}
