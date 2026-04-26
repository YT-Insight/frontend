"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useAnalysesList } from "@/hooks/use-analyses";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { formatDate } from "@/lib/format";
import {
  Search,
  History,
  Video,
  Crown,
  ArrowRight,
} from "lucide-react";

const PLAN_BADGE: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

export default function DashboardPage() {
  const { user, subscription, usage } = useAuth();
  const { data: analysesData, isLoading } = useAnalysesList(1);

  const recentAnalyses = analysesData?.results.slice(0, 3) ?? [];
  const totalAnalyses = analysesData?.count ?? 0;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-semibold">
          {user?.first_name ? `Welcome back, ${user.first_name}` : "Welcome back"}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Here&apos;s an overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Plan</p>
              {subscription && (
                <Badge
                  variant={PLAN_BADGE[subscription.plan] ?? "outline"}
                  className="capitalize"
                >
                  {subscription.plan}
                </Badge>
              )}
            </div>
            {subscription?.plan === "free" ? (
              <Button variant="outline" size="sm" className="w-full" render={<Link href="/billing" />}>
                <Crown className="size-3.5" />
                Upgrade plan
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground">
                {subscription?.current_period_end
                  ? `Renews ${formatDate(subscription.current_period_end)}`
                  : "Active subscription"}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-muted-foreground mb-1">Monthly usage</p>
            {usage ? (
              <>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold">{usage.video_analyzed}</span>
                  <span className="text-sm text-muted-foreground">/ {usage.video_limit}</span>
                </div>
                <Progress value={usage.percentage_used}>
                  <ProgressTrack className="h-1.5">
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Resets {formatDate(usage.reset_at)}
                </p>
              </>
            ) : (
              <Skeleton className="h-8 w-24 mt-1" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-muted-foreground mb-1">Total analyses</p>
            {!isLoading ? (
              <span className="text-2xl font-bold">{totalAnalyses}</span>
            ) : (
              <Skeleton className="h-8 w-16 mt-1" />
            )}
            <p className="text-xs text-muted-foreground mt-1.5">All time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/analyze">
          <Card className="hover:bg-muted/30 transition-colors cursor-pointer group h-full">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Search className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">New Analysis</p>
                <p className="text-xs text-muted-foreground">
                  Analyze a YouTube channel
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/analyses">
          <Card className="hover:bg-muted/30 transition-colors cursor-pointer group h-full">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <History className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">View History</p>
                <p className="text-xs text-muted-foreground">
                  Browse past analyses
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {(recentAnalyses.length > 0 || isLoading) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Recent analyses</h3>
            {totalAnalyses > 3 && (
              <Button variant="ghost" size="sm" render={<Link href="/analyses" />}>
                View all
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[72px] rounded-lg" />
                ))
              : recentAnalyses.map((a) => (
                  <AnalysisCard key={a.id} analysis={a} />
                ))}
          </div>
        </div>
      )}

      {!isLoading && recentAnalyses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Video className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">No analyses yet</p>
            <p className="text-sm text-muted-foreground">
              Analyze your first YouTube channel to get started.
            </p>
          </div>
          <Button render={<Link href="/analyze" />}>Start now</Button>
        </div>
      )}
    </div>
  );
}
