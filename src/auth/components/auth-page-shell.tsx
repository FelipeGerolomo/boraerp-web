import { Building2 } from "lucide-react";
import Link from "next/link";

export function AuthPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 />
            </span>
            Bora ERP
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <header className="mb-7 flex flex-col gap-1 text-center md:text-left">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </header>
            {children}
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-sidebar lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.93_0.04_240),transparent_42%),radial-gradient(circle_at_80%_30%,oklch(0.95_0.04_120),transparent_35%),radial-gradient(circle_at_50%_80%,oklch(0.9_0.05_20),transparent_45%)]" />
        <div className="absolute inset-8 rounded-3xl border bg-background/70 p-8 shadow-sm backdrop-blur">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Bora ERP
              </p>
              <h2 className="max-w-sm text-3xl font-semibold leading-tight">
                Financial operations in one secure workspace.
              </h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Manage invoices, receivables, and company cashflow across all
                your entities with confidence.
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl border bg-background p-4">
              <p className="text-sm font-medium">
                Trusted by growing businesses
              </p>
              <p className="text-sm text-muted-foreground">
                Sign in once and switch companies safely whenever needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
