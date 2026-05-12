"use client"

import {
  Activity,
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  CandlestickChart,
  ChevronRight,
  CreditCard,
  Filter,
  Gauge,
  History,
  Inbox,
  ListTodo,
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

type SubChild = { title: string }
type SubItem = {
  title: string
  icon: LucideIcon
  children?: SubChild[]
}
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
          {
            title: "Overview",
            icon: Gauge,
            children: [
              { title: "Summary" },
              { title: "Performance" },
              { title: "Recent activity" },
            ],
          },
          {
            title: "Activity",
            icon: Activity,
            children: [
              { title: "Timeline" },
              { title: "Mentions" },
              { title: "Audit log" },
            ],
          },
          {
            title: "Notifications",
            icon: Bell,
            children: [
              { title: "Unread" },
              { title: "All" },
              { title: "Preferences" },
            ],
          },
        ],
      },
      {
        label: "Shortcuts",
        items: [
          {
            title: "Watchlist",
            icon: Star,
            children: [
              { title: "Default" },
              { title: "Tech picks" },
              { title: "Dividends" },
            ],
          },
          {
            title: "Saved views",
            icon: Bookmark,
            children: [{ title: "My views" }, { title: "Shared with me" }],
          },
        ],
      },
      {
        label: "Quick links",
        items: [
          { title: "Calendar", icon: CalendarDays },
          { title: "Tasks", icon: ListTodo },
          { title: "Inbox", icon: Inbox },
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
          {
            title: "Holdings",
            icon: Briefcase,
            children: [
              { title: "By account" },
              { title: "By asset class" },
              { title: "By sector" },
            ],
          },
          {
            title: "Performance",
            icon: TrendingUp,
            children: [
              { title: "Returns" },
              { title: "Benchmarks" },
              { title: "Attribution" },
            ],
          },
          {
            title: "Allocation",
            icon: PieChart,
            children: [
              { title: "By asset class" },
              { title: "By sector" },
              { title: "By geography" },
            ],
          },
        ],
      },
      {
        label: "Accounts",
        items: [
          {
            title: "Cash & balances",
            icon: Wallet,
            children: [
              { title: "Available cash" },
              { title: "Pending" },
              { title: "Margin" },
            ],
          },
          {
            title: "Transactions",
            icon: CreditCard,
            children: [
              { title: "Deposits" },
              { title: "Withdrawals" },
              { title: "Trades" },
            ],
          },
          {
            title: "Statements",
            icon: History,
            children: [
              { title: "Monthly" },
              { title: "Annual" },
              { title: "Tax documents" },
            ],
          },
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
          {
            title: "Overview",
            icon: Gauge,
            children: [
              { title: "Indices" },
              { title: "Currencies" },
              { title: "Commodities" },
            ],
          },
          {
            title: "Movers",
            icon: TrendingUp,
            children: [
              { title: "Top gainers" },
              { title: "Top losers" },
              { title: "Most active" },
            ],
          },
          {
            title: "Sectors",
            icon: PieChart,
            children: [
              { title: "Technology" },
              { title: "Healthcare" },
              { title: "Financials" },
              { title: "Energy" },
            ],
          },
        ],
      },
      {
        label: "Discover",
        items: [
          {
            title: "News",
            icon: Newspaper,
            children: [
              { title: "Top stories" },
              { title: "By symbol" },
              { title: "Earnings" },
            ],
          },
          {
            title: "Watchlist",
            icon: Star,
            children: [{ title: "Default" }, { title: "Custom lists" }],
          },
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
          {
            title: "Order ticket",
            icon: Send,
            children: [
              { title: "Buy" },
              { title: "Sell" },
              { title: "Advanced" },
            ],
          },
          {
            title: "Open positions",
            icon: CandlestickChart,
            children: [
              { title: "By symbol" },
              { title: "By strategy" },
              { title: "Closed today" },
            ],
          },
          {
            title: "Order history",
            icon: History,
            children: [
              { title: "Filled" },
              { title: "Working" },
              { title: "Cancelled" },
            ],
          },
        ],
      },
      {
        label: "Strategy",
        items: [
          {
            title: "Targets",
            icon: Target,
            children: [{ title: "Price targets" }, { title: "Stop losses" }],
          },
          {
            title: "Risk limits",
            icon: Shield,
            children: [{ title: "Per position" }, { title: "Per account" }],
          },
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
          {
            title: "All stocks",
            icon: CandlestickChart,
            children: [
              { title: "By exchange" },
              { title: "By sector" },
              { title: "By market cap" },
            ],
          },
          {
            title: "Watchlist",
            icon: Star,
            children: [{ title: "Default" }, { title: "Custom" }],
          },
          {
            title: "Saved screens",
            icon: Bookmark,
            children: [{ title: "My screens" }, { title: "Templates" }],
          },
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
          {
            title: "Filters",
            icon: Filter,
            children: [
              { title: "Price & volume" },
              { title: "Fundamentals" },
              { title: "Technicals" },
            ],
          },
          {
            title: "Recent scans",
            icon: History,
            children: [
              { title: "Today" },
              { title: "This week" },
              { title: "Saved" },
            ],
          },
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
          {
            title: "Dashboards",
            icon: Gauge,
            children: [
              { title: "Sales" },
              { title: "Operations" },
              { title: "Finance" },
            ],
          },
          {
            title: "Performance",
            icon: TrendingUp,
            children: [
              { title: "Trends" },
              { title: "Comparisons" },
              { title: "Forecasts" },
            ],
          },
          {
            title: "Breakdown",
            icon: PieChart,
            children: [
              { title: "By product" },
              { title: "By region" },
              { title: "By channel" },
            ],
          },
        ],
      },
      {
        label: "Reports",
        items: [
          {
            title: "Saved reports",
            icon: Bookmark,
            children: [{ title: "My reports" }, { title: "Shared" }],
          },
          {
            title: "Scheduled",
            icon: History,
            children: [
              { title: "Daily" },
              { title: "Weekly" },
              { title: "Monthly" },
            ],
          },
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
          {
            title: "Profile",
            icon: User,
            children: [
              { title: "Personal info" },
              { title: "Preferences" },
              { title: "Sessions" },
            ],
          },
          {
            title: "Notifications",
            icon: Bell,
            children: [
              { title: "Email" },
              { title: "Push" },
              { title: "In-app" },
            ],
          },
          {
            title: "Security",
            icon: Shield,
            children: [
              { title: "Password" },
              { title: "Two-factor auth" },
              { title: "API keys" },
            ],
          },
        ],
      },
      {
        label: "Workspace",
        items: [
          {
            title: "Members",
            icon: Users,
            children: [
              { title: "Active" },
              { title: "Invited" },
              { title: "Roles" },
            ],
          },
          {
            title: "Billing",
            icon: CreditCard,
            children: [
              { title: "Plan" },
              { title: "Invoices" },
              { title: "Payment methods" },
            ],
          },
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
          {
            title: "Invite people",
            icon: Send,
            children: [
              { title: "By email" },
              { title: "Invite link" },
              { title: "Bulk import" },
            ],
          },
          {
            title: "Pending invites",
            icon: History,
            children: [{ title: "Sent" }, { title: "Expired" }],
          },
          {
            title: "Members",
            icon: Users,
            children: [{ title: "Active" }, { title: "Roles" }],
          },
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
          {
            title: "Help center",
            icon: Bookmark,
            children: [
              { title: "Getting started" },
              { title: "Guides" },
              { title: "FAQ" },
            ],
          },
          {
            title: "Contact us",
            icon: Send,
            children: [
              { title: "Email" },
              { title: "Live chat" },
              { title: "Phone" },
            ],
          },
          {
            title: "What's new",
            icon: Newspaper,
            children: [{ title: "Releases" }, { title: "Roadmap" }],
          },
        ],
      },
    ],
  },
}

const leafRowClass =
  "group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
const activeRowClass = "bg-accent/12 font-medium text-foreground hover:bg-accent/12"

function NavItem({
  item,
  active,
  expanded,
  onSelect,
  onToggle,
}: {
  item: SubItem
  active: string
  expanded: boolean
  onSelect: (title: string) => void
  onToggle: (title: string) => void
}) {
  const Icon = item.icon
  const children = item.children ?? []
  const hasChildren = children.length > 0
  const childActive = children.some((c) => c.title === active)
  const isActive = active === item.title || childActive

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() =>
          hasChildren ? onToggle(item.title) : onSelect(item.title)
        }
        aria-current={active === item.title ? "page" : undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        className={cn(
          leafRowClass,
          isActive && !hasChildren && activeRowClass,
          isActive && hasChildren && "text-foreground",
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
        <span className="flex-1 truncate text-left">{item.title}</span>
        {hasChildren && (
          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        )}
      </button>

      {hasChildren && (
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-[1.0625rem] mt-0.5 flex flex-col gap-0.5 border-l pl-3">
              {children.map((child, i) => {
                const isChildActive = active === child.title
                return (
                  <button
                    key={child.title}
                    type="button"
                    onClick={() => onSelect(child.title)}
                    aria-current={isChildActive ? "page" : undefined}
                    style={{ transitionDelay: expanded ? `${i * 25}ms` : "0ms" }}
                    className={cn(
                      leafRowClass,
                      "py-1 transition-all",
                      expanded
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0",
                      isChildActive && activeRowClass,
                    )}
                  >
                    <span className="flex-1 truncate text-left">
                      {child.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function firstLeaf(data: Section) {
  const first = data.groups[0]?.items[0]
  if (!first) return ""
  return first.children?.length ? first.children[0].title : first.title
}

function defaultExpanded(data: Section) {
  const set = new Set<string>()
  for (const group of data.groups) {
    for (const item of group.items) {
      if (item.children?.length) {
        set.add(item.title)
        return set
      }
    }
  }
  return set
}

export function SecondarySidebar({
  section,
  open,
}: {
  section: string
  open: boolean
}) {
  const data = sections[section] ?? sections.Home
  const [active, setActive] = useState(() => firstLeaf(data))
  const [expanded, setExpanded] = useState(() => defaultExpanded(data))

  const toggleExpanded = (title: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })

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
              {group.items.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  active={active}
                  expanded={expanded.has(item.title)}
                  onSelect={setActive}
                  onToggle={toggleExpanded}
                />
              ))}
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
