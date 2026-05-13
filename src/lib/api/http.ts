import "server-only";

import type { ProblemDetail } from "@/auth/types/problem-detail";
import { API_BASE_URL } from "@/lib/api/config";

export class ApiClientError extends Error {
  status: number;
  problem?: ProblemDetail;

  constructor(status: number, message: string, problem?: ProblemDetail) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.problem = problem;
  }
}

type ApiRequestInit = {
  token?: string;
  body?: unknown;
  headers?: HeadersInit;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

async function parseJsonBody(response: Response) {
  const contentType = response.headers.get("content-type");
  const isJson =
    contentType?.includes("application/json") ||
    contentType?.includes("+json");

  if (!isJson) {
    return null;
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

function toApiError(status: number, payload: unknown) {
  const problem = (payload ?? undefined) as ProblemDetail | undefined;

  const message =
    problem?.detail ??
    problem?.title ??
    problem?.message ??
    "Request could not be completed.";

  return new ApiClientError(status, message, problem);
}

export async function apiRequest<TResponse>(
  path: string,
  init: ApiRequestInit = {},
): Promise<TResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: init.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
        ...init.headers,
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiClientError(
      503,
      "Unable to reach the backend service. Please try again.",
    );
  }

  const parsed = await parseJsonBody(response);

  if (!response.ok) {
    throw toApiError(response.status, parsed);
  }

  return (parsed ?? ({} as TResponse)) as TResponse;
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}
