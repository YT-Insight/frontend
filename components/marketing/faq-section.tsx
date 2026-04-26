"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How many comments does it analyze?",
    a: "We analyze up to 300 comments per video across the last 20 videos — up to 6,000 comments per channel per analysis. This gives the AI enough signal to surface meaningful patterns.",
  },
  {
    q: "Can I analyze competitor channels?",
    a: "Yes. Any public YouTube channel URL works — your own channels, competitors, or any channel in your niche. This is one of the most popular use cases.",
  },
  {
    q: "What AI model powers the analysis?",
    a: "YT Insight uses DeepSeek AI to read and interpret comments. It generates structured summaries, identifies topics, rates sentiment, surfaces viewer questions, and produces growth suggestions.",
  },
  {
    q: "How long does an analysis take?",
    a: "Most analyses complete in 2–4 minutes depending on the channel size and comment volume. You'll be redirected to a live status page while it runs.",
  },
  {
    q: "Is my data private?",
    a: "We only process publicly available YouTube comment data. Your account information is never shared or sold. Analyses are private to your account only.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-ins. Cancel or downgrade your plan at any time from the billing portal with one click.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "rounded-xl border overflow-hidden transition-colors",
              isOpen ? "border-primary/30 bg-primary/3" : "hover:border-border/80"
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isOpen ? "text-foreground" : "text-foreground/80"
                )}
              >
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-40" : "max-h-0"
              )}
            >
              <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
