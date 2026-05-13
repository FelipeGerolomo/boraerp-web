"use client";

import { AlertCircle, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { isAuthApiError, selectCompanyRequest } from "@/auth/api/client";
import type { CompanySummary } from "@/auth/types/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function SelectCompanyForm({
  companies,
}: {
  companies: CompanySummary[];
}) {
  const router = useRouter();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(selectedCompanyId),
    [selectedCompanyId],
  );

  async function onConfirm() {
    if (!selectedCompanyId) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await selectCompanyRequest({ companyId: selectedCompanyId });
      router.replace("/dashboard");
      router.refresh();
    } catch (requestError) {
      setError(
        isAuthApiError(requestError)
          ? requestError.message
          : "Unable to select company. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select your company</CardTitle>
        <CardDescription>
          Your account belongs to multiple companies. Choose the workspace you
          want to enter.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Could not continue</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          {companies.map((company) => {
            const active = company.id === selectedCompanyId;
            return (
              <button
                key={company.id}
                type="button"
                onClick={() => setSelectedCompanyId(company.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  "hover:border-primary/50 hover:bg-accent/20",
                  active && "border-primary bg-accent/20",
                )}
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {company.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Company workspace
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <Button
          type="button"
          onClick={onConfirm}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting && <Spinner data-icon="inline-start" />}
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
