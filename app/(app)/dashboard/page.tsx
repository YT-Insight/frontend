"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useAnalysesList } from "@/hooks/use-analyses";
import { StatusBadge } from "@/components/analysis/status-badge";
import { formatDistanceToNow, formatDate } from "@/lib/format";
import {
  Search,
  History,
  Video,
  Crown,
  ArrowRight,
  BarChart2,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PLAN_BADGE: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function UsageBar({ value }: { value: number }) {
  const color =
    value >= 90 ? "bg-destructive" : value >= 70 ? "bg-yellow-500" : "bg-primary";
  return (
    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const { user, subscription, usage } = useAuth();
  const { data: analysesData, isLoading } = useAnalysesList(1);

  const recentAnalyses = analysesData?.results.slice(0, 5) ?? [];
  const totalAnalyses = analysesData?.count ?? 0;

  return (
    <div className="space-y-6 max-w-4xl">

      {/* ── Hero strip ── */}
      <div className="rounded-xl border overflow-hidden">
        <div className="bg-gradient-to-br from-primary/12 via-primary/4 to-transparent px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-1">
            {getGreeting()}
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            {user?.first_name ? user.first_name : "Welcome back"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s an overview of your account activity.
          </p>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Plan */}
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <Crown className="size-4 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Current plan</p>
                {subscription ? (
                  <>
                    <Badge
                      variant={PLAN_BADGE[subscription.plan] ?? "outline"}
                      className="capitalize mb-2"
                    >
                      {subscription.plan}
                    </Badge>
                    {subscription.plan === "free" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-7"
                        render={<Link href="/billing" />}
                      >
                        <TrendingUp className="size-3" />
                        Upgrade
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {subscription.current_period_end
                          ? `Renews ${formatDate(subscription.current_period_end)}`
                          : "Active"}
                      </p>
                    )}
                  </>
                ) : (
                  <Skeleton className="h-5 w-16" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage */}
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <BarChart2 className="size-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Monthly usage</p>
                {usage ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-xl font-bold">{usage.video_analyzed}</span>
                      <span className="text-xs text-muted-foreground">
                        / {usage.video_limit}
                      </span>
                    </div>
                    <UsageBar value={usage.percentage_used} />
                  </>
                ) : (
                  <Skeleton className="h-8 w-24 mt-1" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total */}
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Video className="size-4 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Total analyses</p>
                {!isLoading ? (
                  <>
                    <span className="text-xl font-bold">{totalAnalyses}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">All time</p>
                  </>
                ) : (
                  <Skeleton className="h-8 w-16 mt-1" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/analyze">
          <Card className="hover:bg-muted/30 transition-colors cursor-pointer group h-full">
            <CardContent className="flex flex-col justify-between min-h-28 p-5">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Search className="size-5 text-primary" />
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="font-semibold text-sm">New Analysis</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Analyze up to 300 comments per video
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 mb-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analyses">
          <Card className="hover:bg-muted/30 transition-colors cursor-pointer group h-full">
            <CardContent className="flex flex-col justify-between min-h-28 p-5">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <History className="size-5 text-primary" />
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="font-semibold text-sm">View History</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Browse and revisit past analyses
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 mb-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* ── Activity timeline ── */}
      {(recentAnalyses.length > 0 || isLoading) && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent activity</h3>
            {totalAnalyses > 5 && (
              <Button variant="ghost" size="sm" render={<Link href="/analyses" />}>
                View all
                <ArrowRight className="size-3" />
              </Button>
            )}
          </div>

          <div className="space-y-0">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4 pb-4">
                    <Skeleton className="size-9 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-1">
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))
              : recentAnalyses.map((a, i) => {
                  const channelName =
                    a.channel?.title ??
                    (() => {
                      try {
                        return new URL(a.input_url).hostname;
                      } catch {
                        return a.input_url;
                      }
                    })();

                  return (
                    <Link key={a.id} href={`/analyses/${a.id}`}>
                      <div className="flex gap-4 pb-4 relative group">
                        {/* Timeline line */}
                        {i < recentAnalyses.length - 1 && (
                          <div className="absolute left-[17px] top-9 bottom-0 w-px bg-border" />
                        )}

                        {/* Channel avatar */}
                        {a.channel?.thumbnail_url ? (
                          <img
                            src={a.channel.thumbnail_url}
                            alt={channelName}
                            className="size-9 rounded-full object-cover shrink-0 ring-2 ring-background z-10"
                          />
                        ) : (
                          <div className="size-9 rounded-full bg-muted border-2 border-background flex items-center justify-center shrink-0 z-10">
                            <PlayCircle className="size-4 text-muted-foreground" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {channelName}
                            </span>
                            <StatusBadge status={a.status} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {a.videos_analyzed} videos &middot;{" "}
                            {a.comments_analyzed.toLocaleString()} comments &middot;{" "}
                            {formatDistanceToNow(a.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && recentAnalyses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Video className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No analyses yet</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Analyze your first YouTube channel to get started.
            </p>
          </div>
          <Button render={<Link href="/analyze" />}>
            <Search className="size-4" />
            Start now
          </Button>
        </div>
      )}
    </div>
  );
}
