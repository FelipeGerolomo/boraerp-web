"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { isAuthApiError, signupRequest } from "@/auth/api/client";
import { signupFormSchema } from "@/auth/api/schemas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type SignupValues = {
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  cnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCnpj(value: string) {
  const digits = onlyDigits(value).slice(0, 14);

  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function toFieldErrors(
  error: unknown,
): Partial<Record<keyof SignupValues, string>> {
  if (error && typeof error === "object" && "issues" in error) {
    const issues = (
      error as { issues: Array<{ path: string[]; message: string }> }
    ).issues;
    return issues.reduce<Partial<Record<keyof SignupValues, string>>>(
      (acc, issue) => {
        const key = issue.path[0] as keyof SignupValues;
        acc[key] = issue.message;
        return acc;
      },
      {},
    );
  }

  return {};
}

export function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignupValues>({
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    cnpj: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignupValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      values.firstName.trim().length > 0 &&
      values.lastName.trim().length > 0 &&
      values.companyName.trim().length > 0 &&
      values.email.trim().length > 0 &&
      values.password.length >= 8 &&
      values.confirmPassword.length >= 8 &&
      onlyDigits(values.cnpj).length === 14
    );
  }, [values]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const payload = {
      ...values,
      cnpj: onlyDigits(values.cnpj),
    };

    const parsed = signupFormSchema.safeParse(payload);

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await signupRequest({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        companyName: parsed.data.companyName,
        cnpj: parsed.data.cnpj,
        email: parsed.data.email,
        password: parsed.data.password,
      });

      setSuccessMessage(response.message || "Conta criada com sucesso.");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setFormError(
        isAuthApiError(error)
          ? error.message
          : "Não foi possível criar a conta agora. Tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      <FieldGroup>
        {formError && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Falha no cadastro</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert>
            <CheckCircle2 />
            <AlertTitle>Conta criada</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Field data-invalid={Boolean(fieldErrors.firstName)}>
          <FieldLabel htmlFor="firstName">Nome</FieldLabel>
          <Input
            id="firstName"
            value={values.firstName}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                firstName: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.firstName)}
            autoComplete="given-name"
            required
          />
          <FieldError>{fieldErrors.firstName}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.lastName)}>
          <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
          <Input
            id="lastName"
            value={values.lastName}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                lastName: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.lastName)}
            autoComplete="family-name"
            required
          />
          <FieldError>{fieldErrors.lastName}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.phone)}>
          <FieldLabel htmlFor="phone">Telefone</FieldLabel>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
            autoComplete="tel"
            placeholder="(11) 99999-9999"
          />
          <FieldError>{fieldErrors.phone}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.companyName)}>
          <FieldLabel htmlFor="companyName">Nome da empresa</FieldLabel>
          <Input
            id="companyName"
            value={values.companyName}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                companyName: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.companyName)}
            placeholder="Bora Comércio LTDA"
            required
          />
          <FieldError>{fieldErrors.companyName}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.cnpj)}>
          <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>
          <Input
            id="cnpj"
            value={values.cnpj}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                cnpj: formatCnpj(event.target.value),
              }))
            }
            aria-invalid={Boolean(fieldErrors.cnpj)}
            placeholder="00.000.000/0000-00"
            required
          />
          <FieldDescription>
            Informe o CNPJ de 14 dígitos da sua empresa.
          </FieldDescription>
          <FieldError>{fieldErrors.cnpj}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.email)}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            placeholder="nome@empresa.com"
            required
          />
          <FieldError>{fieldErrors.email}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.password)}>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.password)}
            autoComplete="new-password"
            required
          />
          <FieldDescription>Mínimo de 8 caracteres.</FieldDescription>
          <FieldError>{fieldErrors.password}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.confirmPassword)}>
          <FieldLabel htmlFor="confirmPassword">Confirme a senha</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            autoComplete="new-password"
            required
          />
          <FieldError>{fieldErrors.confirmPassword}</FieldError>
        </Field>

        <Field>
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Criar conta
          </Button>
          <FieldDescription className="text-center">
            Já tem uma conta? <Link href="/login">Entrar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
