"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { isCollapsible, type NavItem } from "@/config/navigation"
import { cn } from "@/lib/utils"
import type { NavNodeId } from "./use-sidebar-section"

const rowClass =
  "group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
const activeRowClass =
  "bg-accent/12 font-medium text-foreground hover:bg-accent/12"

function NavBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-medium tabular-nums text-muted-foreground">
      {children}
    </span>
  )
}

type NavItemProps = {
  item: NavItem
  /** Position-based id of this entry — see {@link NavNodeId}. */
  id: NavNodeId
  pathname: string
  isExpanded: (id: NavNodeId) => boolean
  onToggle: (id: NavNodeId) => void
}

/** A single sidebar entry — renders as a route link or an expandable group. */
export function NavItemRow({
  item,
  id,
  pathname,
  isExpanded,
  onToggle,
}: NavItemProps) {
  const Icon = item.icon

  if (!isCollapsible(item)) {
    const active = pathname === item.url
    return (
      <Link
        href={item.url ?? "#"}
        aria-current={active ? "page" : undefined}
        className={cn(rowClass, active && activeRowClass)}
      >
        {Icon && (
          <Icon
            className={cn(
              "size-4 shrink-0 transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground",
            )}
          />
        )}
        <span className="flex-1 truncate text-left">{item.title}</span>
        {item.badge != null && <NavBadge>{item.badge}</NavBadge>}
      </Link>
    )
  }

  const expanded = isExpanded(id)
  const childActive = item.items.some((child) => child.url === pathname)

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={expanded}
        className={cn(rowClass, childActive && "text-foreground")}
      >
        {Icon && (
          <Icon
            className={cn(
              "size-4 shrink-0 transition-colors",
              childActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground",
            )}
          />
        )}
        <span className="flex-1 truncate text-left">{item.title}</span>
        {item.badge != null && <NavBadge>{item.badge}</NavBadge>}
        <ChevronRight
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-90",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="ml-[1.0625rem] mt-0.5 flex flex-col gap-0.5 border-l pl-3">
            {item.items.map((child, i) => {
              const active = pathname === child.url
              return (
                <Link
                  key={child.url ?? `${id}/${i}`}
                  href={child.url ?? "#"}
                  aria-current={active ? "page" : undefined}
                  style={{
                    transitionDelay: expanded ? `${i * 25}ms` : "0ms",
                  }}
                  className={cn(
                    rowClass,
                    "py-1 transition-all",
                    expanded
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0",
                    active && activeRowClass,
                  )}
                >
                  <span className="flex-1 truncate text-left">
                    {child.title}
                  </span>
                  {child.badge != null && <NavBadge>{child.badge}</NavBadge>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
