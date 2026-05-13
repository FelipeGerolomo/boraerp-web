import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido").max(255, "E-mail muito longo"),
  password: z.string().min(1, "Informe sua senha").max(255, "Senha muito longa"),
});

export const registerRequestSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Informe seu nome")
    .max(120, "Nome muito longo"),
  lastName: z
    .string()
    .trim()
    .min(1, "Informe seu sobrenome")
    .max(120, "Sobrenome muito longo"),
  phone: z.string().trim().max(30, "Telefone muito longo").optional(),
  companyName: z
    .string()
    .trim()
    .min(1, "Informe o nome da empresa")
    .max(180, "Nome da empresa muito longo"),
  cnpj: z
    .string()
    .trim()
    .regex(/^\d{14}$/, "O CNPJ deve conter 14 dígitos"),
  email: z.email("Informe um e-mail válido").max(255, "E-mail muito longo"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(255, "Senha muito longa"),
});

export const signupFormSchema = registerRequestSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(255, "Senha muito longa"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export const companyIdSchema = z.object({
  companyId: z.uuid(),
});
