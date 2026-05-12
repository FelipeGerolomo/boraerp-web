import { redirect } from "next/navigation"
import { defaultDashboardRoute } from "@/config/navigation"

export default function DashboardIndexPage() {
  redirect(defaultDashboardRoute())
}
