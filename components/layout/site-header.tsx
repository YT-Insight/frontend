"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

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

  return (
    <header className="flex h-14 items-center gap-3 border-b px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <h1 className="text-sm font-semibold">{getTitle(pathname)}</h1>
    </header>
  );
}
