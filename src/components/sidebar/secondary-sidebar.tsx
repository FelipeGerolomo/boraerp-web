"use client"

import { usePathname } from "next/navigation"
import {
  filterSection,
  getSection,
  type NavSection,
  type Permission,
  sectionKeyFromPath,
} from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CompanySwitcher } from "./company-switcher"
import { NavItemRow } from "./nav-item"
import { useSidebarSection } from "./use-sidebar-section"

function TrialCard() {
  return (
    <div className="border-t p-3">
      <div className="rounded-xl bg-muted/40 p-3">
        <p className="text-xs font-medium">Plano gratuito</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Faltam 7 dias de teste
        </p>
        <Button size="sm" className="mt-2.5 h-7 w-full text-xs">
          Fazer upgrade do plano
        </Button>
      </div>
    </div>
  )
}

/** Inner panel for a single section — owns expand/collapse state. */
function SectionPanel({
  section,
  pathname,
}: {
  section: NavSection
  pathname: string
}) {
  const { isExpanded, toggle } = useSidebarSection(section, pathname)

  return (
    <div className="flex h-svh w-64 flex-col">
      <div className="border-b p-2">
        <CompanySwitcher />
      </div>

      <div className="min-w-0 border-b px-4 pb-4 pt-4">
        <h2 className="truncate text-sm font-semibold leading-tight">
          {section.title}
        </h2>
        <p className="truncate text-xs text-muted-foreground">
          {section.description}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
        {section.groups.map((group, groupIndex) => (
          <div
            key={group.label ?? `group-${groupIndex}`}
            className="flex flex-col gap-1"
          >
            {group.label && (
              <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
            )}
            {group.items.map((item, itemIndex) => {
              const id = `${groupIndex}/${itemIndex}`
              return (
                <NavItemRow
                  key={id}
                  id={id}
                  item={item}
                  pathname={pathname}
                  isExpanded={isExpanded}
                  onToggle={toggle}
                />
              )
            })}
          </div>
        ))}
      </nav>

      <TrialCard />
    </div>
  )
}

/**
 * Contextual second-level sidebar. Animates its width on open/close and renders
 * the {@link SectionPanel} for the section the current route lives in. The panel
 * is keyed by section key so expand state re-seeds when the destination changes.
 */
export function SecondarySidebar({
  open,
  can = () => true,
}: {
  open: boolean
  can?: (permission: Permission) => boolean
}) {
  const pathname = usePathname()
  const sectionKey = sectionKeyFromPath(pathname)
  const section = filterSection(getSection(sectionKey), can)

  return (
    <aside
      data-state={open ? "open" : "closed"}
      className={cn(
        "sticky top-0 z-10 hidden h-svh shrink-0 self-start overflow-hidden bg-background transition-[width] duration-300 ease-in-out md:block",
        open ? "w-64 border-r border-sidebar-border" : "w-0",
      )}
    >
      <SectionPanel key={sectionKey} section={section} pathname={pathname} />
    </aside>
  )
}
