"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { usePlans } from "@/hooks/use-billing";
import { api, getErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { Check, Crown, Loader2, ExternalLink, AlertCircle } from "lucide-react";
import type { PlanTier } from "@/types/api";

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
    <div className="space-y-6 max-w-2xl">
      {usage && (
        <Card>
          <CardContent className="pt-5 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Monthly usage</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Resets {formatDate(usage.reset_at)}
                </p>
              </div>
              <Badge
                variant={currentPlan === "pro" ? "default" : currentPlan === "basic" ? "secondary" : "outline"}
                className="capitalize"
              >
                {currentPlan}
              </Badge>
            </div>
            <Progress value={usage.percentage_used}>
              <ProgressTrack className="h-2">
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{usage.video_analyzed} analyses used</span>
              <span>{usage.video_limit - usage.video_analyzed} remaining</span>
            </div>
          </CardContent>
        </Card>
      )}

      {subscription?.plan !== "free" && (
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium">Manage subscription</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {subscription?.current_period_end
                  ? `Current period ends ${formatDate(subscription.current_period_end)}`
                  : `${subscription?.status ?? "active"} subscription`}
              </p>
            </div>
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
          </CardContent>
        </Card>
      )}

      <Separator />

      <div>
        <h3 className="text-sm font-semibold mb-4">Plans</h3>

        {plansError && (
          <div className="flex items-center gap-2 text-sm text-destructive py-4">
            <AlertCircle className="size-4 shrink-0" />
            Failed to load plans. Please refresh the page.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <Skeleton className="h-3 w-4/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-8 w-full" />
                  </CardFooter>
                </Card>
              ))
            : plans?.map((plan: PlanTier) => {
                const isCurrent = currentPlan === plan.id;
                return (
                  <Card
                    key={plan.id}
                    className={plan.highlighted ? "border-primary ring-1 ring-primary/20" : ""}
                  >
                    {plan.highlighted && (
                      <div className="flex justify-center -mt-3 mb-0">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5 rounded-full">
                          Most popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        {plan.id === "pro" && <Crown className="size-4 text-primary" />}
                        <CardTitle className="text-base">{plan.name}</CardTitle>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">{plan.price_display}</span>
                        <span className="text-sm text-muted-foreground">{plan.price_period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 space-y-1.5">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm">
                          <Check className="size-3.5 text-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      {isCurrent ? (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          Current plan
                        </Button>
                      ) : plan.id === "free" ? (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          Downgrade
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full"
                          variant={plan.highlighted ? "default" : "outline"}
                          onClick={() => handleCheckout(plan.id as "basic" | "pro")}
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
                );
              })}
        </div>
      </div>
    </div>
  );
}
