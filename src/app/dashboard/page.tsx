import { DashboardShell, SidebarToggle } from "@/components/dashboard-shell"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return (
    <DashboardShell>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarToggle />
        <Separator
          orientation="vertical"
          className="mr-1 data-vertical:h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-semibold">Overview</h1>
        <span className="text-sm text-muted-foreground">/ Home</span>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50" />
      </div>
    </DashboardShell>
  )
}
