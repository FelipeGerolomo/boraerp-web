"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useAuthSession } from "@/auth/hooks/use-auth-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const letters =
    parts.length > 1 ? [parts[0]?.[0], parts[1]?.[0]] : [name.slice(0, 2)];
  return letters.join("").toUpperCase();
}

function CompanyBadge({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold tracking-tight text-primary-foreground",
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}

export function CompanySwitcher() {
  const { session, switchCompany, isSwitchingCompany, switchCompanyError } =
    useAuthSession();

  const active = session.company;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${active.name}. Trocar de empresa`}
        className="flex w-full items-center gap-2 rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent/10"
      >
        <CompanyBadge name={active.name} />
        <div className="grid min-w-0 flex-1 leading-tight">
          <span className="truncate text-sm font-medium">{active.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            Empresa ativa
          </span>
        </div>
        <ChevronsUpDown className="ml-auto shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={12}
        className="w-64"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Trocar de empresa</DropdownMenuLabel>
          {session.companies.map((company) => {
            const isActive = company.id === active.id;
            return (
              <DropdownMenuItem
                key={company.id}
                onClick={() => switchCompany(company.id)}
                disabled={isSwitchingCompany || isActive}
                className={cn("gap-2.5", isActive && "bg-accent/10")}
              >
                <CompanyBadge
                  name={company.name}
                  className="size-7 rounded-md text-[10px]"
                />
                <div className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate text-sm font-medium">
                    {company.name}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {isActive ? "Atual" : "Mudar para este ambiente"}
                  </span>
                </div>
                {isActive && <Check className="ml-auto shrink-0" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        {switchCompanyError && (
          <>
            <DropdownMenuSeparator />
            <p className="px-2 py-1.5 text-xs text-destructive">
              {switchCompanyError}
            </p>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
