import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(1).max(255),
});

export const registerRequestSchema = z.object({
  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(30).optional(),
  companyName: z.string().trim().min(1).max(180),
  cnpj: z
    .string()
    .trim()
    .regex(/^\d{14}$/, "CNPJ must contain 14 digits"),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
});

export const signupFormSchema = registerRequestSchema
  .extend({
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const companyIdSchema = z.object({
  companyId: z.uuid(),
});
