"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Search,
  History,
  Settings,
  CreditCard,
  PlayCircle,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyze", label: "New Analysis", icon: Search },
  { href: "/analyses", label: "History", icon: History },
];

const SECONDARY_ITEMS = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

const PLAN_BADGE: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

const USAGE_COLOR = (pct: number) =>
  pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-yellow-500" : "bg-primary";

export function AppSidebar() {
  const pathname = usePathname();
  const { subscription, usage } = useAuth();

  return (
    <Sidebar collapsible="icon">
      {/* ── Logo ── */}
      <SidebarHeader className="px-3 py-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-orange-400 shrink-0 shadow-sm">
            <PlayCircle className="size-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden">
            YT Insight
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* ── Main nav ── */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/50 group-data-[collapsible=icon]:hidden">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href + "/"));
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={isActive}
                      tooltip={label}
                    >
                      <Icon />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* ── Account nav ── */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/50 group-data-[collapsible=icon]:hidden">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECONDARY_ITEMS.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={pathname === href}
                    tooltip={label}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      {usage && subscription && (
        <SidebarFooter className="group-data-[collapsible=icon]:hidden px-3 pb-4 gap-3">
          <SidebarSeparator />
          <div className="px-1 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Flame className="size-3 text-primary" />
                <span className="text-xs font-semibold">
                  {usage.video_analyzed}
                  <span className="font-normal text-muted-foreground">
                    {" "}/ {usage.video_limit}
                  </span>
                </span>
              </div>
              <Badge
                variant={PLAN_BADGE[subscription.plan] ?? "outline"}
                className="text-[10px] capitalize h-4 px-1.5"
              >
                {subscription.plan}
              </Badge>
            </div>

            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  USAGE_COLOR(usage.percentage_used)
                )}
                style={{ width: `${usage.percentage_used}%` }}
              />
            </div>

            <p className="text-[10px] text-muted-foreground">
              {Math.round(usage.percentage_used)}% used this month
            </p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
