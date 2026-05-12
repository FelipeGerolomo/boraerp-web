"use client"

import { PanelLeft } from "lucide-react"
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { NavRail } from "@/components/nav-rail"
import { SecondarySidebar } from "@/components/secondary-sidebar"
import { Button } from "@/components/ui/button"
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
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      aria-pressed={open}
      className={cn("text-muted-foreground", className)}
    >
      <PanelLeft />
    </Button>
  )
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [section, setSection] = useState("Home")
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen((o) => !o)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <SidebarCtx.Provider value={{ open, toggle, setOpen }}>
      <div className="flex h-svh overflow-hidden bg-sidebar">
        <NavRail value={section} onValueChange={setSection} />
        <SecondarySidebar section={section} open={open} onToggle={toggle} />
        <main className="m-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
          {children}
        </main>
      </div>
    </SidebarCtx.Provider>
  )
}
