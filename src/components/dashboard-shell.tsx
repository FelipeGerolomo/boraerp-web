"use client"

import { PanelLeft } from "lucide-react"
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb"
import { NavRail, SecondarySidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type SidebarContext = {
  open: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

const SidebarCtx = createContext<SidebarContext | null>(null)

export function useDashboardSidebar() {
  const ctx = useContext(SidebarCtx)
  if (!ctx) {
    throw new Error("useDashboardSidebar must be used within <DashboardShell>")
  }
  return ctx
}

export function SidebarToggle({ className }: { className?: string }) {
  const { open, toggle } = useDashboardSidebar()
  return (
    <Button
      type="button"
      size="icon-sm"
      variant="ghost"
      onClick={toggle}
      aria-label={open ? "Recolher barra lateral" : "Expandir barra lateral"}
      aria-pressed={open}
      className={cn("text-muted-foreground", className)}
    >
      <PanelLeft />
    </Button>
  )
}

/**
 * Dashboard layout: navigation rail + contextual sidebar + content surface
 * (sticky header with breadcrumb, scrollable body). Mount it from the dashboard
 * route layout; pages render only their content into `children`.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen((o) => !o)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <SidebarCtx.Provider value={{ open, toggle, setOpen }}>
      <div className="flex h-svh overflow-hidden bg-sidebar">
        <NavRail />
        <SecondarySidebar open={open} />
        <main className="m-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarToggle />
            <Separator
              orientation="vertical"
              className="mr-1 data-vertical:h-4 data-vertical:self-auto"
            />
            <DashboardBreadcrumb />
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarCtx.Provider>
  )
}
