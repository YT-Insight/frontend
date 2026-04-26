"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analyze": "New Analysis",
  "/analyses": "History",
  "/settings": "Settings",
  "/billing": "Billing",
};

function getTitle(pathname: string): string {
  if (pathname.startsWith("/analyses/")) return "Analysis Results";
  return PAGE_TITLES[pathname] ?? "YT Insight";
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <span className="text-sm font-semibold flex-1">{getTitle(pathname)}</span>

      <div className="flex items-center gap-2">
        {pathname !== "/analyze" && (
          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium"
            onClick={() => router.push("/analyze")}
          >
            <Plus className="size-3.5" />
            <span className="hidden sm:inline">New Analysis</span>
          </Button>
        )}
        <UserNav />
      </div>
    </header>
  );
}
