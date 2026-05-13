"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthSession } from "@/auth/hooks/use-auth-session";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  defaultRouteForSection,
  isSectionActive,
  type Permission,
  type RailItem,
  sidebarConfig,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

function RailButton({ item, active }: { item: RailItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={defaultRouteForSection(item.section)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex w-full flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-muted-foreground transition-colors",
        "hover:bg-accent/10 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-accent/12 text-foreground",
      )}
    >
      <span
        className={cn(
          "relative flex size-9 items-center justify-center rounded-xl transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-transparent group-hover:bg-background group-hover:shadow-sm",
        )}
      >
        {Icon && <Icon className="size-[18px]" strokeWidth={2} />}
        {item.badge != null && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold tabular-nums text-primary-foreground ring-2 ring-sidebar">
            {item.badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium leading-none tracking-tight">
        {item.title}
      </span>
    </Link>
  );
}

/**
 * Primary navigation rail — icon destinations driven by `sidebarConfig.rail`
 * and `sidebarConfig.railUtilities`. Each item links to its section's first
 * route; the active item is derived from the current pathname.
 */
export function NavRail({
  can = () => true,
}: {
  can?: (permission: Permission) => boolean;
}) {
  const pathname = usePathname();
  const { session, logout, isLoggingOut } = useAuthSession();
  const Brand = sidebarConfig.brand.icon;
  const isVisible = (item: RailItem) =>
    !item.permission || can(item.permission);
  const initials =
    `${session.user.firstName[0] ?? ""}${session.user.lastName[0] ?? ""}`.toUpperCase();

  const renderItem = (item: RailItem) => (
    <RailButton
      key={item.section}
      item={item}
      active={isSectionActive(pathname, item.section)}
    />
  );

  const utilities = sidebarConfig.railUtilities.filter(isVisible);

  return (
    <aside className="sticky top-0 z-20 flex h-svh w-[88px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center justify-center px-3 pb-2 pt-4">
        <div
          title={sidebarConfig.brand.title}
          className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background"
        >
          <Brand className="size-5" strokeWidth={2.25} />
        </div>
      </div>

      {/* Primary destinations */}
      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-2.5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sidebarConfig.rail.map((group, groupIndex) => {
          const items = group.filter(isVisible);
          if (items.length === 0) return null;
          return (
            <div key={items[0].section} className="flex flex-col gap-1">
              {groupIndex > 0 && (
                <div className="mx-3 mb-2 h-px bg-sidebar-border" />
              )}
              {items.map(renderItem)}
            </div>
          );
        })}
      </nav>

      {/* Utilities + user */}
      <div className="flex flex-col gap-1 px-2.5 pb-3">
        <div className="mx-3 mb-2 h-px bg-sidebar-border" />
        {utilities.map(renderItem)}
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-2 flex items-center justify-center rounded-xl p-1.5 transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent/10">
            <Avatar className="size-9 rounded-xl">
              <AvatarFallback className="rounded-xl">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="end"
            sideOffset={12}
            className="w-56"
          >
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="truncate text-sm font-medium">
                {session.user.firstName} {session.user.lastName}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {session.user.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isLoggingOut}
              onClick={logout}
              variant="destructive"
            >
              <LogOut />
              {isLoggingOut ? "Saindo..." : "Sair"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
