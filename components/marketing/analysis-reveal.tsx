"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TOPICS = [
  { topic: "Challenges & competitions", pct: 94 },
  { topic: "Philanthropy & giving back", pct: 81 },
  { topic: "Production quality", pct: 72 },
  { topic: "Creator collaborations", pct: 58 },
];

const SUGGESTIONS = [
  "'Viewers choose my challenge' series",
  "Behind-the-scenes of a charity donation",
  "Track same challenge over multiple videos",
];

export function AnalysisReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 250, 500, 900, 1300, 1700, 2000].forEach((delay, i) => {
            setTimeout(() => setPhase(i + 1), delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const show = (p: number) =>
    phase >= p
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5";

  return (
    <div ref={ref} className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/50">
        <div className="size-3 rounded-full bg-red-400/80" />
        <div className="size-3 rounded-full bg-yellow-400/80" />
        <div className="size-3 rounded-full bg-green-400/80" />
        <div className="flex-1 mx-5 h-6 rounded-md bg-background/60 text-[11px] flex items-center justify-center text-muted-foreground">
          yt-insight.ai/analyses/mrbeast
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Channel */}
        <div className={cn("flex items-center gap-4 transition-all duration-500", show(1))}>
          <div className="size-14 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-black text-xl shrink-0">
            M
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base">MrBeast</span>
              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                Completed
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              320M subscribers · 800 videos · 4,821 comments analyzed
            </p>
          </div>
        </div>

        {/* Sentiment grid */}
        <div className={cn("grid grid-cols-3 gap-3 transition-all duration-500", show(2))}>
          <div className="rounded-xl border p-3">
            <p className="text-[10px] text-muted-foreground mb-1.5">Sentiment</p>
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
              Positive
            </Badge>
          </div>
          <div className="rounded-xl border p-3 col-span-2">
            <p className="text-[10px] text-muted-foreground mb-1.5">Audience Type</p>
            <p className="text-xs font-medium">Gen Z entertainment fans, 13–28</p>
          </div>
        </div>

        {/* Topics */}
        <div className={cn("rounded-xl border p-4 space-y-3 transition-all duration-500", show(3))}>
          <p className="text-xs font-semibold">Top Topics</p>
          {TOPICS.map(({ topic, pct }, i) => (
            <div key={topic}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{topic}</span>
                <span className="font-semibold">{pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: phase >= 4 ? `${pct}%` : "0%",
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* AI Summary */}
          <div className={cn("rounded-xl border bg-primary/5 p-4 transition-all duration-500", show(5))}>
            <div className="flex items-center gap-1.5 mb-2">
              <Brain className="size-3.5 text-primary" />
              <p className="text-xs font-semibold text-primary">AI Summary</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Viewers praise production quality and creative challenges. Strong demand for philanthropy content and collaborations. High emotional engagement across all ages.
            </p>
          </div>

          {/* Suggestions */}
          <div className={cn("rounded-xl border p-4 transition-all duration-500", show(6))}>
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb className="size-3.5 text-primary" />
              <p className="text-xs font-semibold">Suggestions</p>
            </div>
            <div className="space-y-1.5">
              {SUGGESTIONS.map((s) => (
                <p key={s} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary shrink-0 mt-0.5">→</span>
                  {s}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
