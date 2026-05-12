"use client"

import {
  BarChart3,
  CircleUser,
  Home,
  LifeBuoy,
  Link2,
  type LucideIcon,
  PieChart,
  Scan,
  ScatterChart,
  Settings,
  TrendingUp,
} from "lucide-react"
import { CompanySwitcher } from "@/components/company-switcher"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  icon: LucideIcon
}

const navGroups: NavItem[][] = [
  [{ title: "Home", icon: Home }],
  [
    { title: "Portfolio", icon: CircleUser },
    { title: "Market", icon: PieChart },
    { title: "Trading", icon: TrendingUp },
  ],
  [
    { title: "Stocks", icon: ScatterChart },
    { title: "Scanner", icon: Scan },
    { title: "Analytics", icon: BarChart3 },
  ],
]

const utilityItems: NavItem[] = [
  { title: "Settings", icon: Settings },
  { title: "Invite", icon: Link2 },
  { title: "Support", icon: LifeBuoy },
]

function RailButton({
  item,
  active,
  onClick,
}: {
  item: NavItem
  active?: boolean
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex w-full flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-muted-foreground transition-colors",
        "hover:bg-accent/10 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-accent/12 text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-transparent group-hover:bg-background group-hover:shadow-sm",
        )}
      >
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
      <span className="text-[10px] font-medium leading-none tracking-tight">
        {item.title}
      </span>
    </button>
  )
}

export function NavRail({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const active = value
  const setActive = onValueChange

  return (
    <aside className="sticky top-0 z-20 flex h-svh w-[88px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Company switcher */}
      <div className="flex items-center justify-center px-3 pb-2 pt-4">
        <CompanySwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-2.5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navGroups.map((group, i) => (
          <div key={group[0].title} className="flex flex-col gap-1">
            {i > 0 && <div className="mx-3 mb-2 h-px bg-sidebar-border" />}
            {group.map((item) => (
              <RailButton
                key={item.title}
                item={item}
                active={active === item.title}
                onClick={() => setActive(item.title)}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom utilities */}
      <div className="flex flex-col gap-1 px-2.5 pb-3">
        <div className="mx-3 mb-2 h-px bg-sidebar-border" />
        {utilityItems.map((item) => (
          <RailButton
            key={item.title}
            item={item}
            active={active === item.title}
            onClick={() => setActive(item.title)}
          />
        ))}
        <button
          type="button"
          className="mt-2 flex items-center justify-center rounded-xl p-1.5 transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-9 rounded-xl">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="rounded-xl">FG</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </aside>
  )
}
