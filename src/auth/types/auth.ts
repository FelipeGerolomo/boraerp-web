export type UserSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type CompanySummary = {
  id: string;
  name: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  phone?: string;
  companyName: string;
  cnpj: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  userId: string;
  companyId: string;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  requiresCompanySelection: boolean;
  accessToken?: string;
  expiresAt?: string;
  sessionToken?: string;
  user?: UserSummary;
  company?: CompanySummary;
  companies?: CompanySummary[];
};

export type SelectCompanyRequest = {
  sessionToken: string;
  companyId: string;
};

export type SwitchCompanyRequest = {
  companyId: string;
};

export type AuthTokenResponse = {
  accessToken: string;
  expiresAt: string;
  user: UserSummary;
  company: CompanySummary;
};

export type LogoutResponse = {
  message: string;
};
