"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { isAuthApiError, loginRequest } from "@/auth/api/client";
import { loginSchema } from "@/auth/api/schemas";
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

type LoginValues = {
  email: string;
  password: string;
};

function toFieldErrors(
  error: unknown,
): Partial<Record<keyof LoginValues, string>> {
  if (error && typeof error === "object" && "issues" in error) {
    const issues = (
      error as { issues: Array<{ path: string[]; message: string }> }
    ).issues;
    return issues.reduce<Partial<Record<keyof LoginValues, string>>>(
      (acc, issue) => {
        const key = issue.path[0] as keyof LoginValues;
        acc[key] = issue.message;
        return acc;
      },
      {},
    );
  }

  return {};
}

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginValues, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => values.email.trim().length > 0 && values.password.length > 0,
    [values],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error));
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await loginRequest(parsed.data);

      if (result.requiresCompanySelection) {
        router.replace("/select-company");
      } else {
        router.replace("/dashboard");
      }

      router.refresh();
    } catch (error) {
      const isUnauthorized = isAuthApiError(error) && error.status === 401;

      setFormError(
        isAuthApiError(error)
          ? error.message
          : "Unable to login right now. Please try again.",
      );

      if (isUnauthorized) {
        setValues((current) => ({ ...current, password: "" }));
      }
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
            <AlertTitle>Login failed</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <Field data-invalid={Boolean(fieldErrors.email)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="name@company.com"
            required
          />
          <FieldError>{fieldErrors.email}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.password)}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(fieldErrors.password)}
            value={values.password}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            required
          />
          <FieldDescription>
            Use the password created when you registered your account.
          </FieldDescription>
          <FieldError>{fieldErrors.password}</FieldError>
        </Field>

        <Field>
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Login
          </Button>
          <FieldDescription className="text-center">
            New to Bora ERP? <Link href="/signup">Create your account</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
