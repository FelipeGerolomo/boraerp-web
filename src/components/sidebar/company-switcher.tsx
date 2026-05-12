"use client"

import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useState } from "react"
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

const companies: Company[] = [
  { name: "Acme Inc", role: "Administrator" },
  { name: "Monsters Corp", role: "Member" },
  { name: "Bodega 24h", role: "Owner" },
]

function getInitials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  const letters =
    parts.length > 1 ? [parts[0][0], parts[1][0]] : [name.slice(0, 2)]
  return letters.join("").toUpperCase()
}

function CompanyBadge({ name, className }: { name: string; className?: string }) {
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
  )
}

function CompanyIdentity({ company }: { company: Company }) {
  return (
    <div className="grid min-w-0 flex-1 leading-tight">
      <span className="truncate text-sm font-medium">{company.name}</span>
      <span className="truncate text-xs font-normal text-muted-foreground">
        {company.role}
      </span>
    </div>
  )
}

/** Active-company indicator + switcher, shown at the top of the contextual sidebar. */
export function CompanySwitcher() {
  const [active, setActive] = useState<Company>(companies[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${active.name} — ${active.role}. Switch company`}
        className="flex w-full items-center gap-2 rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent/10"
      >
        <CompanyBadge name={active.name} />
        <CompanyIdentity company={active} />
        <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={12}
        className="w-60"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch company</DropdownMenuLabel>
          {companies.map((company) => {
            const isActive = company.name === active.name
            return (
              <DropdownMenuItem
                key={company.name}
                onClick={() => setActive(company)}
                className={cn("gap-2.5", isActive && "bg-accent/10")}
              >
                <CompanyBadge
                  name={company.name}
                  className="size-7 rounded-md text-[10px]"
                />
                <CompanyIdentity company={company} />
                {isActive && <Check className="ml-auto size-4 shrink-0" />}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 text-muted-foreground">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-dashed">
            <Plus className="size-3.5" />
          </span>
          <span className="font-medium">Add company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
