"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "@/components/layout/user-nav";
import {
  LayoutDashboard,
  Search,
  History,
  Settings,
  CreditCard,
  PlayCircle,
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

const PLAN_BADGE_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

export function AppSidebar() {
  const pathname = usePathname();
  const { subscription, usage } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary shrink-0">
            <PlayCircle className="size-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
            YT Insight
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={
                      pathname === href ||
                      (href !== "/dashboard" && pathname.startsWith(href + "/"))
                    }
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

        <SidebarSeparator />

        <SidebarGroup>
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

      <SidebarFooter className="group-data-[collapsible=icon]:hidden px-3 pb-4 gap-3">
        {usage && subscription && (
          <>
            <SidebarSeparator />
            <div className="px-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Monthly usage</span>
                <Badge
                  variant={PLAN_BADGE_VARIANT[subscription.plan] ?? "outline"}
                  className="text-xs capitalize h-4"
                >
                  {subscription.plan}
                </Badge>
              </div>
              <Progress value={usage.percentage_used} className="gap-1">
                <ProgressTrack className="h-1.5">
                  <ProgressIndicator
                    className={cn(
                      usage.percentage_used >= 90 && "bg-destructive",
                      usage.percentage_used >= 70 &&
                        usage.percentage_used < 90 &&
                        "bg-yellow-500"
                    )}
                  />
                </ProgressTrack>
              </Progress>
              <p className="text-xs text-muted-foreground">
                {usage.video_analyzed} / {usage.video_limit} analyses
              </p>
            </div>
          </>
        )}
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
