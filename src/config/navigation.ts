import {
  Activity,
  Aperture,
  BarChart3,
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  CandlestickChart,
  CircleUser,
  CreditCard,
  Filter,
  Gauge,
  History,
  Home,
  Inbox,
  LifeBuoy,
  Link2,
  ListTodo,
  type LucideIcon,
  Newspaper,
  PieChart,
  Plus,
  Package,
  Scan,
  ScatterChart,
  Send,
  Settings,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react"

/**
 * Sidebar navigation schema + configuration.
 *
 * Everything the two-level dashboard sidebar renders is described by `sidebarConfig`
 * below. To add, remove, or reorder navigation, edit the data in this file only —
 * the rendering components (`src/components/sidebar/*`) consume it generically.
 */

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

/** A permission key gating visibility of a nav entry. Wire to your auth layer. */
export type Permission = string

type NavEntryBase = {
  /** Text shown to the user. */
  title: string
  /** Optional leading icon. */
  icon?: LucideIcon
  /** Optional trailing badge (count or short label). */
  badge?: string | number
  /** When set, the entry renders only if the viewer holds this permission. */
  permission?: Permission
}

/**
 * A leaf entry — selecting it navigates to a route.
 *
 * `url` is auto-derived from the entry's position in the tree (see the
 * normalization pass at the bottom of this file), so you never write it by
 * hand. It is always present on leaves after the module loads.
 */
export type NavLink = NavEntryBase & {
  url?: string
}

/** A parent entry that expands to reveal child links. */
export type NavCollapsible = NavEntryBase & {
  /** Child links. The presence of this array is what makes an entry collapsible. */
  items: NavLink[]
  /** Force the group open on first render. Defaults to the first collapsible per section. */
  defaultOpen?: boolean
}

export type NavItem = NavLink | NavCollapsible

/** A labelled (or anonymous) cluster of items inside a section. */
export type NavGroup = {
  label?: string
  items: NavItem[]
}

/** The contextual second-level panel shown for one rail destination. */
export type NavSection = {
  title: string
  description: string
  groups: NavGroup[]
}

/** A first-level destination shown as an icon in the rail. */
export type RailItem = NavEntryBase & {
  /** Key into `sidebarConfig.sections` — the panel this rail item opens. */
  section: string
}

export type SidebarConfig = {
  /** Brand mark pinned to the top of the rail. */
  brand: { icon: LucideIcon; title: string }
  /** Primary destinations. Each inner array renders as a divider-separated cluster. */
  rail: RailItem[][]
  /** Utility destinations pinned to the bottom of the rail. */
  railUtilities: RailItem[]
  /** Second-level panels, keyed by `RailItem.section`. */
  sections: Record<string, NavSection>
}

/** Type guard: is this nav item an expandable parent? */
export function isCollapsible(item: NavItem): item is NavCollapsible {
  return "items" in item && Array.isArray(item.items)
}

/** Look up a section by key, falling back to the first configured section. */
export function getSection(key: string): NavSection {
  return sidebarConfig.sections[key] ?? Object.values(sidebarConfig.sections)[0]
}

/**
 * Drop entries the viewer lacks permission for, and remove groups left empty.
 * Pass-through when no `can` predicate is supplied.
 */
export function filterSection(
  section: NavSection,
  can: (permission: Permission) => boolean = () => true,
): NavSection {
  const allowed = (e: NavEntryBase) => !e.permission || can(e.permission)
  const groups = section.groups
    .map((group) => ({
      ...group,
      items: group.items
        .filter(allowed)
        .map((item) =>
          isCollapsible(item)
            ? { ...item, items: item.items.filter(allowed) }
            : item,
        ),
    }))
    .filter((group) => group.items.length > 0)
  return { ...section, groups }
}

/* -------------------------------------------------------------------------- */
/*                               Configuration                                */
/* -------------------------------------------------------------------------- */

export const sidebarConfig: SidebarConfig = {
  brand: { icon: Aperture, title: "BoraERP" },

  rail: [
    [{ title: "Home", icon: Home, section: "home" }],
    [{ title: "Cadastros", icon: Package, section: "cadastros" }],
    [
      { title: "Portfolio", icon: CircleUser, section: "portfolio" },
      { title: "Market", icon: PieChart, section: "market" },
      { title: "Trading", icon: TrendingUp, section: "trading" },
    ],
    [
      { title: "Stocks", icon: ScatterChart, section: "stocks" },
      { title: "Scanner", icon: Scan, section: "scanner" },
      { title: "Analytics", icon: BarChart3, section: "analytics" },
    ],
  ],

  railUtilities: [
    { title: "Settings", icon: Settings, section: "settings" },
    { title: "Invite", icon: Link2, section: "invite" },
    { title: "Support", icon: LifeBuoy, section: "support" },
  ],

  sections: {
    cadastros: {
      title: "Cadastros",
      description: "Gestão de entidades e produtos",
      groups: [
        {
          items: [{ title: "Produtos", icon: Package }],
        },
      ],
    },

    home: {
      title: "Home",
      description: "Your workspace at a glance",
      groups: [
        {
          items: [
            {
              title: "Overview",
              icon: Gauge,
              items: [
                { title: "Summary" },
                { title: "Performance" },
                { title: "Recent activity" },
              ],
            },
            {
              title: "Activity",
              icon: Activity,
              items: [
                { title: "Timeline" },
                { title: "Mentions" },
                { title: "Audit log" },
              ],
            },
            {
              title: "Notifications",
              icon: Bell,
              items: [
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
              items: [
                { title: "Default" },
                { title: "Tech picks" },
                { title: "Dividends" },
              ],
            },
            {
              title: "Saved views",
              icon: Bookmark,
              items: [{ title: "My views" }, { title: "Shared with me" }],
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

    portfolio: {
      title: "Portfolio",
      description: "Holdings, performance & accounts",
      groups: [
        {
          items: [
            {
              title: "Holdings",
              icon: Briefcase,
              items: [
                { title: "By account" },
                { title: "By asset class" },
                { title: "By sector" },
              ],
            },
            {
              title: "Performance",
              icon: TrendingUp,
              items: [
                { title: "Returns" },
                { title: "Benchmarks" },
                { title: "Attribution" },
              ],
            },
            {
              title: "Allocation",
              icon: PieChart,
              items: [
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
              items: [
                { title: "Available cash" },
                { title: "Pending" },
                { title: "Margin" },
              ],
            },
            {
              title: "Transactions",
              icon: CreditCard,
              items: [
                { title: "Deposits" },
                { title: "Withdrawals" },
                { title: "Trades" },
              ],
            },
            {
              title: "Statements",
              icon: History,
              items: [
                { title: "Monthly" },
                { title: "Annual" },
                { title: "Tax documents" },
              ],
            },
          ],
        },
      ],
    },

    market: {
      title: "Market",
      description: "Live quotes, news & movers",
      groups: [
        {
          items: [
            {
              title: "Overview",
              icon: Gauge,
              items: [
                { title: "Indices" },
                { title: "Currencies" },
                { title: "Commodities" },
              ],
            },
            {
              title: "Movers",
              icon: TrendingUp,
              items: [
                { title: "Top gainers" },
                { title: "Top losers" },
                { title: "Most active" },
              ],
            },
            {
              title: "Sectors",
              icon: PieChart,
              items: [
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
              items: [
                { title: "Top stories" },
                { title: "By symbol" },
                { title: "Earnings" },
              ],
            },
            {
              title: "Watchlist",
              icon: Star,
              items: [{ title: "Default" }, { title: "Custom lists" }],
            },
          ],
        },
      ],
    },

    trading: {
      title: "Trading",
      description: "Orders, positions & execution",
      groups: [
        {
          items: [
            {
              title: "Order ticket",
              icon: Send,
              items: [
                { title: "Buy" },
                { title: "Sell" },
                { title: "Advanced" },
              ],
            },
            {
              title: "Open positions",
              icon: CandlestickChart,
              items: [
                { title: "By symbol" },
                { title: "By strategy" },
                { title: "Closed today" },
              ],
            },
            {
              title: "Order history",
              icon: History,
              items: [
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
              items: [{ title: "Price targets" }, { title: "Stop losses" }],
            },
            {
              title: "Risk limits",
              icon: Shield,
              items: [{ title: "Per position" }, { title: "Per account" }],
            },
          ],
        },
      ],
    },

    stocks: {
      title: "Stocks",
      description: "Screened symbols & lists",
      groups: [
        {
          items: [
            {
              title: "All stocks",
              icon: CandlestickChart,
              items: [
                { title: "By exchange" },
                { title: "By sector" },
                { title: "By market cap" },
              ],
            },
            {
              title: "Watchlist",
              icon: Star,
              items: [{ title: "Default" }, { title: "Custom" }],
            },
            {
              title: "Saved screens",
              icon: Bookmark,
              items: [{ title: "My screens" }, { title: "Templates" }],
            },
          ],
        },
      ],
    },

    scanner: {
      title: "Scanner",
      description: "Build and run market scans",
      groups: [
        {
          items: [
            { title: "New scan", icon: Plus },
            {
              title: "Filters",
              icon: Filter,
              items: [
                { title: "Price & volume" },
                { title: "Fundamentals" },
                { title: "Technicals" },
              ],
            },
            {
              title: "Recent scans",
              icon: History,
              items: [
                { title: "Today" },
                { title: "This week" },
                { title: "Saved" },
              ],
            },
          ],
        },
      ],
    },

    analytics: {
      title: "Analytics",
      description: "Reports, metrics & insights",
      groups: [
        {
          items: [
            {
              title: "Dashboards",
              icon: Gauge,
              items: [
                { title: "Sales" },
                { title: "Operations" },
                { title: "Finance" },
              ],
            },
            {
              title: "Performance",
              icon: TrendingUp,
              items: [
                { title: "Trends" },
                { title: "Comparisons" },
                { title: "Forecasts" },
              ],
            },
            {
              title: "Breakdown",
              icon: PieChart,
              items: [
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
              items: [{ title: "My reports" }, { title: "Shared" }],
            },
            {
              title: "Scheduled",
              icon: History,
              items: [
                { title: "Daily" },
                { title: "Weekly" },
                { title: "Monthly" },
              ],
            },
          ],
        },
      ],
    },

    settings: {
      title: "Settings",
      description: "Account & workspace preferences",
      groups: [
        {
          items: [
            {
              title: "Profile",
              icon: User,
              items: [
                { title: "Personal info" },
                { title: "Preferences" },
                { title: "Sessions" },
              ],
            },
            {
              title: "Notifications",
              icon: Bell,
              items: [
                { title: "Email" },
                { title: "Push" },
                { title: "In-app" },
              ],
            },
            {
              title: "Security",
              icon: Shield,
              items: [
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
              items: [
                { title: "Active" },
                { title: "Invited" },
                { title: "Roles" },
              ],
            },
            {
              title: "Billing",
              icon: CreditCard,
              items: [
                { title: "Plan" },
                { title: "Invoices" },
                { title: "Payment methods" },
              ],
            },
          ],
        },
      ],
    },

    invite: {
      title: "Invite",
      description: "Grow your team",
      groups: [
        {
          items: [
            {
              title: "Invite people",
              icon: Send,
              items: [
                { title: "By email" },
                { title: "Invite link" },
                { title: "Bulk import" },
              ],
            },
            {
              title: "Pending invites",
              icon: History,
              items: [{ title: "Sent" }, { title: "Expired" }],
            },
            {
              title: "Members",
              icon: Users,
              items: [{ title: "Active" }, { title: "Roles" }],
            },
          ],
        },
      ],
    },

    support: {
      title: "Support",
      description: "Help, docs & contact",
      groups: [
        {
          items: [
            {
              title: "Help center",
              icon: Bookmark,
              items: [
                { title: "Getting started" },
                { title: "Guides" },
                { title: "FAQ" },
              ],
            },
            {
              title: "Contact us",
              icon: Send,
              items: [
                { title: "Email" },
                { title: "Live chat" },
                { title: "Phone" },
              ],
            },
            {
              title: "What's new",
              icon: Newspaper,
              items: [{ title: "Releases" }, { title: "Roadmap" }],
            },
          ],
        },
      ],
    },
  },
}

/* -------------------------------------------------------------------------- */
/*                          Route derivation (URLs)                           */
/* -------------------------------------------------------------------------- */

/** Where `/dashboard` itself should land. */
export const DASHBOARD_ROOT = "/dashboard"

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function dashboardPath(...parts: string[]): string {
  return [DASHBOARD_ROOT, ...parts.map(slugify)].join("/")
}

/**
 * A concrete, navigable dashboard route. One per leaf entry across every
 * section. Drives `<Link>` targets, active-state detection, breadcrumbs, and
 * the route-page generator (`scripts/generate-dashboard-routes.ts`).
 */
export type DashboardRoute = {
  /** e.g. `/dashboard/portfolio/holdings/by-account` */
  url: string
  /** Section key, e.g. `portfolio`. */
  sectionKey: string
  /** Section display title, e.g. `Portfolio`. */
  sectionTitle: string
  /** Human-readable trail within the section, e.g. `["Holdings", "By account"]`. */
  trail: string[]
}

function buildRoutes(): DashboardRoute[] {
  const routes: DashboardRoute[] = []
  for (const [sectionKey, section] of Object.entries(sidebarConfig.sections)) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (isCollapsible(item)) {
          for (const child of item.items) {
            child.url = dashboardPath(sectionKey, item.title, child.title)
            routes.push({
              url: child.url,
              sectionKey,
              sectionTitle: section.title,
              trail: [item.title, child.title],
            })
          }
        } else {
          item.url = dashboardPath(sectionKey, item.title)
          routes.push({
            url: item.url,
            sectionKey,
            sectionTitle: section.title,
            trail: [item.title],
          })
        }
      }
    }
  }
  return routes
}

/** Every navigable dashboard route, in config order. URLs are filled by this pass. */
export const dashboardRoutes: DashboardRoute[] = buildRoutes()

const routesByUrl = new Map(dashboardRoutes.map((r) => [r.url, r]))

/** Look up route metadata for a pathname (exact match). */
export function findDashboardRoute(pathname: string): DashboardRoute | undefined {
  return routesByUrl.get(pathname)
}

/** The landing route for a rail destination — its first leaf. */
export function defaultRouteForSection(sectionKey: string): string {
  const section = sidebarConfig.sections[sectionKey]
  if (section) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (isCollapsible(item)) {
          if (item.items[0]?.url) return item.items[0].url
        } else if (item.url) {
          return item.url
        }
      }
    }
  }
  return `${DASHBOARD_ROOT}/${sectionKey}`
}

/** The default landing route for the dashboard as a whole. */
export function defaultDashboardRoute(): string {
  const first = sidebarConfig.rail[0]?.[0]?.section
  return first ? defaultRouteForSection(first) : DASHBOARD_ROOT
}

/** Is `pathname` inside the given rail destination? */
export function isSectionActive(pathname: string, sectionKey: string): boolean {
  const base = `${DASHBOARD_ROOT}/${sectionKey}`
  return pathname === base || pathname.startsWith(`${base}/`)
}

/** Resolve the active section key from the current pathname. */
export function sectionKeyFromPath(pathname: string): string {
  const segment = pathname.split("/")[2]
  return segment && sidebarConfig.sections[segment]
    ? segment
    : (sidebarConfig.rail[0]?.[0]?.section ??
        Object.keys(sidebarConfig.sections)[0])
}
