"use client"

import {
  Building2,
  type LucideIcon,
  Plus,
  Rocket,
  Store,
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Company = { name: string; plan: string; icon: LucideIcon }

const companies: Company[] = [
  { name: "Acme Inc", plan: "Enterprise", icon: Building2 },
  { name: "Monsters Corp", plan: "Startup", icon: Rocket },
  { name: "Bodega 24h", plan: "Free", icon: Store },
]

export function CompanySwitcher() {
  const [active, setActive] = useState<Company>(companies[0])
  const ActiveIcon = active.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Current company: ${active.name}. Switch company`}
        className="group/company flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring data-popup-open:ring-2 data-popup-open:ring-ring"
      >
        <ActiveIcon className="size-5" strokeWidth={2.25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        sideOffset={10}
        className="w-60"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Companies</DropdownMenuLabel>
          {companies.map((company, i) => {
            const Icon = company.icon
            const isActive = company.name === active.name
            return (
              <DropdownMenuItem
                key={company.name}
                onClick={() => setActive(company)}
                className={cn("gap-2.5", isActive && "bg-accent/10")}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg border",
                    isActive
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "bg-background text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-medium leading-tight">
                    {company.name}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {company.plan}
                  </span>
                </span>
                <DropdownMenuShortcut>⌘{i + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 text-muted-foreground">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-dashed">
            <Plus className="size-3.5" />
          </span>
          <span className="font-medium">Add company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
