"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { usePlans } from "@/hooks/use-billing";
import { api, getErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { Check, Crown, Loader2, ExternalLink, AlertCircle, X } from "lucide-react";
import type { PlanTier } from "@/types/api";
import { cn } from "@/lib/utils";

// ── Usage ring ─────────────────────────────────────────────────────────────────

function UsageRing({
  value,
  used,
  total,
}: {
  value: number;
  used: number;
  total: number;
}) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  const color =
    value >= 90 ? "text-destructive" : value >= 70 ? "text-yellow-500" : "text-primary";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle
          cx="48" cy="48" r={r}
          fill="none" stroke="currentColor"
          strokeWidth="8"
          className="text-muted/40"
        />
        <circle
          cx="48" cy="48" r={r}
          fill="none" stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={cn("transition-all duration-500", color)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold leading-none">{used}</span>
        <span className="text-[10px] text-muted-foreground">/ {total}</span>
      </div>
    </div>
  );
}

// ── Feature comparison table ───────────────────────────────────────────────────

const COMPARISON = [
  { feature: "Analyses per month", free: "5", basic: "100", pro: "Unlimited" },
  { feature: "AI summary & sentiment", free: true, basic: true, pro: true },
  { feature: "Topics & suggestions", free: true, basic: true, pro: true },
  { feature: "Priority processing", free: false, basic: true, pro: true },
  { feature: "API access", free: false, basic: false, pro: "Soon" },
];

function CompCell({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="size-4 text-primary mx-auto" />;
  if (val === false) return <X className="size-4 text-muted-foreground/40 mx-auto" />;
  return (
    <span className="text-xs font-medium text-muted-foreground">{val}</span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const PLAN_BADGE: Record<string, "default" | "secondary" | "outline"> = {
  free: "outline",
  basic: "secondary",
  pro: "default",
};

export default function BillingPage() {
  const { subscription, usage } = useAuth();
  const { data: plans, isLoading: plansLoading, isError: plansError } = usePlans();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleCheckout = async (plan: "basic" | "pro") => {
    setLoadingPlan(plan);
    try {
      const { checkout_url } = await api.post<{ checkout_url: string }>(
        "/api/subscriptions/checkout/",
        { plan }
      );
      window.location.href = checkout_url;
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const { portal_url } = await api.post<{ portal_url: string }>(
        "/api/subscriptions/portal/"
      );
      window.open(portal_url, "_blank");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPortalLoading(false);
    }
  };

  const currentPlan = subscription?.plan ?? "free";

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ��─ Current plan hero ── */}
      {usage && subscription && (
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 via-primary/4 to-transparent p-6">
            <div className="flex items-center gap-6 flex-wrap">
              {/* Ring gauge */}
              <UsageRing
                value={usage.percentage_used}
                used={usage.video_analyzed}
                total={usage.video_limit}
              />

              {/* Plan info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-base">
                    You&apos;re on the{" "}
                    <span className="capitalize">{currentPlan}</span> plan
                  </span>
                  <Badge
                    variant={PLAN_BADGE[currentPlan] ?? "outline"}
                    className="capitalize"
                  >
                    {currentPlan}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {usage.video_limit - usage.video_analyzed} analyses remaining
                  {usage.reset_at && (
                    <> &middot; resets {formatDate(usage.reset_at)}</>
                  )}
                </p>
                {currentPlan === "free" && (
                  <p className="text-xs text-primary font-medium mt-1">
                    Upgrade to analyze more channels every month.
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 flex-wrap">
                {currentPlan !== "free" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePortal}
                    disabled={portalLoading}
                  >
                    {portalLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ExternalLink className="size-4" />
                    )}
                    Billing portal
                  </Button>
                )}
                {currentPlan === "free" && (
                  <Button size="sm" onClick={() => handleCheckout("basic")}>
                    <Crown className="size-4" />
                    Upgrade now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Plans grid ── */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Choose a plan</h3>

        {plansError && (
          <div className="flex items-center gap-2 text-sm text-destructive py-4">
            <AlertCircle className="size-4 shrink-0" />
            Failed to load plans. Please refresh the page.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          {plansLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-3 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-7 w-24" />
                  </CardHeader>
                  <CardContent className="pb-4 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-8 w-full" />
                  </CardFooter>
                </Card>
              ))
            : plans?.map((plan: PlanTier) => {
                const isCurrent = currentPlan === plan.id;
                const isHighlighted = plan.highlighted;
                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "transition-transform",
                      isHighlighted && "sm:-translate-y-2"
                    )}
                  >
                    <Card
                      className={cn(
                        "relative",
                        isHighlighted &&
                          "border-primary ring-2 ring-primary/20 shadow-lg"
                      )}
                    >
                      {isHighlighted && (
                        <div className="flex justify-center -mt-3.5 mb-0">
                          <span className="bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-sm">
                            Most popular
                          </span>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          {plan.id === "pro" && (
                            <Crown className="size-4 text-amber-500" />
                          )}
                          <CardTitle
                            className={cn(
                              isHighlighted ? "text-lg" : "text-base"
                            )}
                          >
                            {plan.name}
                          </CardTitle>
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span
                            className={cn(
                              "font-bold",
                              isHighlighted ? "text-3xl" : "text-2xl"
                            )}
                          >
                            {plan.price_display}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {plan.price_period}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-4 space-y-1.5">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-start gap-2 text-sm">
                            <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                            {f}
                          </div>
                        ))}
                      </CardContent>

                      <CardFooter>
                        {isCurrent ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            disabled
                          >
                            Current plan
                          </Button>
                        ) : plan.id === "free" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            disabled
                          >
                            Downgrade
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full"
                            variant={isHighlighted ? "default" : "outline"}
                            onClick={() =>
                              handleCheckout(plan.id as "basic" | "pro")
                            }
                            disabled={!!loadingPlan}
                          >
                            {loadingPlan === plan.id && (
                              <Loader2 className="size-4 animate-spin" />
                            )}
                            Upgrade to {plan.name}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
        </div>
      </div>

      {/* ── Comparison table ── */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Plan comparison</h3>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-1/2">
                  Feature
                </th>
                {["Free", "Basic", "Pro"].map((p) => (
                  <th
                    key={p}
                    className={cn(
                      "px-4 py-3 font-semibold text-center",
                      p === currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1) &&
                        "text-primary"
                    )}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(({ feature, free, basic, pro }, i) => (
                <tr
                  key={feature}
                  className={cn(
                    i < COMPARISON.length - 1 && "border-b",
                    "hover:bg-muted/20 transition-colors"
                  )}
                >
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {feature}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CompCell val={free} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CompCell val={basic} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CompCell val={pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
