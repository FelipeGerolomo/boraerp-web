"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"
import {
  defaultRouteForSection,
  findDashboardRoute,
  getSection,
  sectionKeyFromPath,
} from "@/config/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/** Breadcrumb trail for the current dashboard route: Section › …parents › Page. */
export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const sectionKey = sectionKeyFromPath(pathname)
  const section = getSection(sectionKey)
  const route = findDashboardRoute(pathname)

  const trail = route?.trail ?? []
  const leading = [section.title, ...trail.slice(0, -1)]
  const current = trail.at(-1) ?? section.title

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {leading.map((title, index) => {
          const hideOnMobile = index === 0 ? "hidden md:block" : undefined
          return (
            <Fragment key={title}>
              <BreadcrumbItem className={hideOnMobile}>
                {index === 0 ? (
                  <BreadcrumbLink href={defaultRouteForSection(sectionKey)}>
                    {title}
                  </BreadcrumbLink>
                ) : (
                  title
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className={hideOnMobile} />
            </Fragment>
          )
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
