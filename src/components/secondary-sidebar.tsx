"use client"

import {
  Activity,
  Bell,
  Bookmark,
  Briefcase,
  CandlestickChart,
  ChevronRight,
  CreditCard,
  Filter,
  Gauge,
  History,
  type LucideIcon,
  Newspaper,
  PieChart,
  Plus,
  Send,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react"
import { useState } from "react"
import { CompanyProfile } from "@/components/company-profile"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SubItem = { title: string; icon: LucideIcon; badge?: string }
type SubGroup = { label?: string; items: SubItem[] }
type Section = {
  title: string
  description: string
  groups: SubGroup[]
}

const sections: Record<string, Section> = {
  Home: {
    title: "Home",
    description: "Your workspace at a glance",
    groups: [
      {
        items: [
          { title: "Overview", icon: Gauge },
          { title: "Activity", icon: Activity },
          { title: "Notifications", icon: Bell, badge: "3" },
        ],
      },
      {
        label: "Shortcuts",
        items: [
          { title: "Watchlist", icon: Star },
          { title: "Saved views", icon: Bookmark },
        ],
      },
    ],
  },
  Portfolio: {
    title: "Portfolio",
    description: "Holdings, performance & accounts",
    groups: [
      {
        items: [
          { title: "Holdings", icon: Briefcase },
          { title: "Performance", icon: TrendingUp },
          { title: "Allocation", icon: PieChart },
        ],
      },
      {
        label: "Accounts",
        items: [
          { title: "Cash & balances", icon: Wallet },
          { title: "Transactions", icon: CreditCard },
          { title: "Statements", icon: History },
        ],
      },
    ],
  },
  Market: {
    title: "Market",
    description: "Live quotes, news & movers",
    groups: [
      {
        items: [
          { title: "Overview", icon: Gauge },
          { title: "Movers", icon: TrendingUp },
          { title: "Sectors", icon: PieChart },
        ],
      },
      {
        label: "Discover",
        items: [
          { title: "News", icon: Newspaper },
          { title: "Watchlist", icon: Star },
        ],
      },
    ],
  },
  Trading: {
    title: "Trading",
    description: "Orders, positions & execution",
    groups: [
      {
        items: [
          { title: "Order ticket", icon: Send },
          { title: "Open positions", icon: CandlestickChart },
          { title: "Order history", icon: History },
        ],
      },
      {
        label: "Strategy",
        items: [
          { title: "Targets", icon: Target },
          { title: "Risk limits", icon: Shield },
        ],
      },
    ],
  },
  Stocks: {
    title: "Stocks",
    description: "Screened symbols & lists",
    groups: [
      {
        items: [
          { title: "All stocks", icon: CandlestickChart },
          { title: "Watchlist", icon: Star },
          { title: "Saved screens", icon: Bookmark },
        ],
      },
    ],
  },
  Scanner: {
    title: "Scanner",
    description: "Build and run market scans",
    groups: [
      {
        items: [
          { title: "New scan", icon: Plus },
          { title: "Filters", icon: Filter },
          { title: "Recent scans", icon: History },
        ],
      },
    ],
  },
  Analytics: {
    title: "Analytics",
    description: "Reports, metrics & insights",
    groups: [
      {
        items: [
          { title: "Dashboards", icon: Gauge },
          { title: "Performance", icon: TrendingUp },
          { title: "Breakdown", icon: PieChart },
        ],
      },
      {
        label: "Reports",
        items: [
          { title: "Saved reports", icon: Bookmark },
          { title: "Scheduled", icon: History },
        ],
      },
    ],
  },
  Settings: {
    title: "Settings",
    description: "Account & workspace preferences",
    groups: [
      {
        items: [
          { title: "Profile", icon: User },
          { title: "Notifications", icon: Bell },
          { title: "Security", icon: Shield },
        ],
      },
      {
        label: "Workspace",
        items: [
          { title: "Members", icon: Users },
          { title: "Billing", icon: CreditCard },
        ],
      },
    ],
  },
  Invite: {
    title: "Invite",
    description: "Grow your team",
    groups: [
      {
        items: [
          { title: "Invite people", icon: Send },
          { title: "Pending invites", icon: History, badge: "2" },
          { title: "Members", icon: Users },
        ],
      },
    ],
  },
  Support: {
    title: "Support",
    description: "Help, docs & contact",
    groups: [
      {
        items: [
          { title: "Help center", icon: Bookmark },
          { title: "Contact us", icon: Send },
          { title: "What's new", icon: Newspaper },
        ],
      },
    ],
  },
}

export function SecondarySidebar({
  section,
  open,
}: {
  section: string
  open: boolean
}) {
  const data = sections[section] ?? sections.Home
  const [active, setActive] = useState(data.groups[0]?.items[0]?.title ?? "")

  return (
    <aside
      data-state={open ? "open" : "closed"}
      className={cn(
        "sticky top-0 z-10 hidden h-svh shrink-0 self-start overflow-hidden bg-background transition-[width] duration-300 ease-in-out md:block",
        open ? "w-64 border-r border-sidebar-border" : "w-0",
      )}
    >
      <div className="flex h-svh w-64 flex-col">
        <div className="border-b p-2">
          <CompanyProfile />
        </div>
        <div className="min-w-0 border-b px-4 pb-4 pt-4">
          <h2 className="truncate text-sm font-semibold leading-tight">
            {data.title}
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            {data.description}
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
        {data.groups.map((group, gi) => (
          <div key={group.label ?? `g-${gi}`} className="flex flex-col gap-1">
            {group.label && (
              <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.title
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(item.title)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                    "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive &&
                      "bg-accent/12 font-medium text-foreground hover:bg-accent/12",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="flex-1 truncate text-left">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={cn(
                      "size-3.5 shrink-0 text-muted-foreground/50 opacity-0 transition-opacity",
                      "group-hover:opacity-100",
                      isActive && "opacity-100",
                    )}
                  />
                </button>
              )
            })}
          </div>
        ))}
      </nav>

        <div className="border-t p-3">
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-xs font-medium">Free plan</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              7 days left in trial
            </p>
            <Button size="sm" className="mt-2.5 h-7 w-full text-xs">
              Upgrade plan
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
