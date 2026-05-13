import "server-only";

import type {
  AuthTokenResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  SelectCompanyRequest,
  SwitchCompanyRequest,
} from "@/auth/types/auth";
import { apiRequest } from "@/lib/api/http";

const AUTH_BASE_PATH = "/api/v1/auth";

export function registerUser(input: RegisterRequest) {
  return apiRequest<RegisterResponse>(`${AUTH_BASE_PATH}/register`, {
    method: "POST",
    body: input,
  });
}

export function loginUser(input: LoginRequest) {
  return apiRequest<LoginResponse>(`${AUTH_BASE_PATH}/login`, {
    method: "POST",
    body: input,
  });
}

export function selectCompany(input: SelectCompanyRequest) {
  return apiRequest<AuthTokenResponse>(`${AUTH_BASE_PATH}/select-company`, {
    method: "POST",
    body: input,
  });
}

export function switchCompany(input: SwitchCompanyRequest, token: string) {
  return apiRequest<AuthTokenResponse>(`${AUTH_BASE_PATH}/switch-company`, {
    method: "POST",
    body: input,
    token,
  });
}

export function logoutUser(token: string) {
  return apiRequest<LogoutResponse>(`${AUTH_BASE_PATH}/logout`, {
    method: "POST",
    token,
  });
}
