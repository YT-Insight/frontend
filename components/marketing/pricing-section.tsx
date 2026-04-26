"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Free",
    monthly: "$0",
    annual: "$0",
    annualNote: "forever free",
    description: "Perfect for trying it out",
    highlighted: false,
    icon: null,
    features: [
      "5 analyses / month",
      "AI summary & sentiment",
      "Top topics & suggestions",
      "Viewer Q&A insights",
      "Up to 300 comments / video",
    ],
    cta: "Get started free",
    href: "/register",
  },
  {
    id: "basic",
    name: "Basic",
    monthly: "$9.99",
    annual: "$7.99",
    annualNote: "billed $95.88 / yr",
    description: "For serious creators",
    highlighted: true,
    icon: Zap,
    features: [
      "100 analyses / month",
      "Everything in Free",
      "Priority processing",
      "Email support",
      "Export results",
    ],
    cta: "Start for $9.99 / mo",
    ctaAnnual: "Start for $7.99 / mo",
    href: "/register",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: "$24.99",
    annual: "$19.99",
    annualNote: "billed $239.88 / yr",
    description: "For agencies & power users",
    highlighted: false,
    icon: Crown,
    features: [
      "Unlimited analyses",
      "Everything in Basic",
      "API access (coming soon)",
      "Team workspaces (coming soon)",
      "Dedicated support",
    ],
    cta: "Go Pro",
    href: "/register",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm", !annual ? "text-foreground font-medium" : "text-muted-foreground")}>
          Monthly
        </span>
        <button
          onClick={() => setAnnual((a) => !a)}
          className={cn(
            "relative w-11 h-6 rounded-full transition-colors",
            annual ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200",
              annual ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
        <span className={cn("text-sm flex items-center gap-1.5", annual ? "text-foreground font-medium" : "text-muted-foreground")}>
          Annual
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold">
            Save 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto items-end">
        {PLANS.map((plan) => {
          const PlanIcon = plan.icon;
          const price = annual ? plan.annual : plan.monthly;
          const ctaLabel =
            annual && plan.ctaAnnual ? plan.ctaAnnual : plan.cta;

          return (
            <div
              key={plan.id}
              className={cn(
                "transition-transform duration-300",
                plan.highlighted && "sm:-translate-y-3"
              )}
            >
              <Card
                className={cn(
                  "relative overflow-visible",
                  plan.highlighted &&
                    "border-primary ring-2 ring-primary/25 shadow-[0_0_50px_-8px_oklch(0.65_0.23_25_/_0.4)]"
                )}
              >
                {plan.highlighted && (
                  <div className="flex justify-center -mt-4 mb-0">
                    <span className="bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      Most popular
                    </span>
                  </div>
                )}

                <CardContent className="pt-5 pb-6 space-y-5">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      {PlanIcon && (
                        <PlanIcon
                          className={cn(
                            "size-4",
                            plan.id === "pro" ? "text-amber-500" : "text-primary"
                          )}
                        />
                      )}
                      <p className="font-bold">{plan.name}</p>
                    </div>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span
                        className={cn(
                          "font-black",
                          plan.highlighted ? "text-4xl" : "text-3xl"
                        )}
                      >
                        {price}
                      </span>
                      {plan.id !== "free" && (
                        <span className="text-xs text-muted-foreground">/mo</span>
                      )}
                    </div>
                    {annual && plan.id !== "free" && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {plan.annualNote}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    size="sm"
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    render={<Link href={plan.href} />}
                  >
                    {ctaLabel}
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Trust note */}
      <p className="text-center text-xs text-muted-foreground">
        Cancel anytime · No contracts · Instant access · No credit card for free plan
      </p>
    </div>
  );
}
