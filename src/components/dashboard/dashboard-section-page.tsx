/**
 * Placeholder body rendered by every generated dashboard route page.
 *
 * The route-specific chrome (active rail item, contextual sidebar, breadcrumb)
 * is supplied by `DashboardShell` / the dashboard layout, so individual pages
 * only own their content area. Replace this per route as features land.
 */
export default function DashboardSectionPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50" />
    </>
  )
}
