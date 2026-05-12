"use client"

import { useState } from "react"
import { isCollapsible, type NavSection } from "@/config/navigation"

/**
 * A collapsible parent is addressed by its position: `"<groupIndex>/<itemIndex>"`.
 * Positions are stable for a given config and free of the title collisions a
 * name-keyed scheme would hit.
 */
export type NavNodeId = string

function initialExpanded(section: NavSection, pathname: string): Set<NavNodeId> {
  const expanded = new Set<NavNodeId>()
  let sawActive = false
  let sawAny = false

  // Honor explicit `defaultOpen`, and open the parent that owns the active route.
  section.groups.forEach((group, g) => {
    group.items.forEach((item, i) => {
      if (!isCollapsible(item)) return
      const id: NavNodeId = `${g}/${i}`
      if (item.defaultOpen) expanded.add(id)
      if (item.items.some((child) => child.url === pathname)) {
        expanded.add(id)
        sawActive = true
      }
    })
  })

  // Fallback: nothing active and nothing pre-opened — open the first collapsible.
  if (!sawActive && expanded.size === 0) {
    section.groups.forEach((group, g) => {
      group.items.forEach((item, i) => {
        if (!isCollapsible(item) || sawAny) return
        expanded.add(`${g}/${i}`)
        sawAny = true
      })
    })
  }

  return expanded
}

/**
 * Expand/collapse state for one section's nav tree, seeded from the current
 * pathname. Render the owning component with `key={sectionKey}` so the state
 * re-seeds when the active rail destination changes.
 */
export function useSidebarSection(section: NavSection, pathname: string) {
  const [expandedIds, setExpandedIds] = useState<Set<NavNodeId>>(() =>
    initialExpanded(section, pathname),
  )

  return {
    isExpanded: (id: NavNodeId) => expandedIds.has(id),
    toggle: (id: NavNodeId) =>
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
  }
}
