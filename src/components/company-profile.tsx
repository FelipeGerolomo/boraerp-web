"use client"

import {
  ArrowLeftRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings2,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Company = { name: string; role: string }

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  const letters = parts.length > 1 ? [parts[0][0], parts[1][0]] : [name.slice(0, 2)]
  return letters.join("").toUpperCase()
}

function CompanyBadge({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold tracking-tight text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  )
}

function CompanyIdentity({ company }: { company: Company }) {
  return (
    <>
      <CompanyBadge name={company.name} />
      <div className="grid min-w-0 flex-1 leading-tight">
        <span className="truncate text-sm font-medium">{company.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {company.role}
        </span>
      </div>
    </>
  )
}

export function CompanyProfile({ company }: { company: Company }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${company.name} — ${company.role}`}
        className="flex w-full items-center gap-2 rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent/10"
      >
        <CompanyIdentity company={company} />
        <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={12}
        className="w-60"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <CompanyIdentity company={company} />
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings2 />
            Company settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users />
            Members
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArrowLeftRight />
          Switch company
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
