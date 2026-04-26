import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  Users,
  MessageCircle,
  Lightbulb,
  Check,
  ArrowRight,
  Sparkles,
  Tag,
  HelpCircle,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-powered analysis",
    description:
      "DeepSeek AI reads thousands of comments and surfaces what viewers actually think and want.",
  },
  {
    icon: TrendingUp,
    title: "Audience sentiment",
    description:
      "Understand the emotional tone of your audience — positive, negative, mixed, or neutral.",
  },
  {
    icon: Users,
    title: "Audience profiling",
    description:
      "Discover who your audience is — their interests, demographics, and engagement patterns.",
  },
  {
    icon: MessageCircle,
    title: "Top topics",
    description:
      "See which subjects your viewers care most about, ranked by relevance score.",
  },
  {
    icon: Lightbulb,
    title: "Growth suggestions",
    description:
      "Get actionable content and engagement recommendations based on real audience data.",
  },
  {
    icon: Sparkles,
    title: "Q&A insights",
    description:
      "Discover the most common questions your viewers ask, already answered by AI.",
  },
];

const STEPS = [
  { n: "01", title: "Paste a channel URL", desc: "Any YouTube channel — yours or a competitor's." },
  { n: "02", title: "We fetch the data", desc: "We pull recent videos and hundreds of comments automatically." },
  { n: "03", title: "AI analysis runs", desc: "Our AI reads the comments and generates deep insights in minutes." },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Great for trying it out",
    analyses: "5 analyses / month",
    cta: "Get started",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$9.99",
    description: "For serious creators",
    analyses: "100 analyses / month",
    cta: "Start for $9.99/mo",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$24.99",
    description: "For agencies & power users",
    analyses: "Unlimited analyses",
    cta: "Go Pro",
    href: "/register",
    highlighted: false,
  },
];

const MOCK_TOPICS = [
  { topic: "Challenges & competitions", pct: 92 },
  { topic: "Philanthropy & giving back", pct: 78 },
  { topic: "Production quality", pct: 65 },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-6xl px-4 pt-24 pb-8 text-center">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-orange-500/10 blur-[80px]" />
          <div className="absolute left-0 top-48 h-56 w-56 rounded-full bg-red-500/10 blur-[60px]" />
        </div>

        <Badge
          variant="outline"
          className="mb-6 gap-1.5 border-primary/30 bg-primary/5 text-primary px-3 py-1"
        >
          <Sparkles className="size-3" />
          AI-powered YouTube analytics
        </Badge>

        <h1 className="mx-auto max-w-3xl text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Know exactly what your{" "}
          <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            YouTube audience
          </span>{" "}
          wants
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Analyze any YouTube channel&apos;s comments with AI. Discover audience
          sentiment, trending topics, and growth opportunities — in minutes.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
          <Button
            size="lg"
            className="gap-2 shadow-lg"
            style={{ boxShadow: "0 8px 32px -4px oklch(0.65 0.23 25 / 0.45)" }}
            render={<Link href="/register" />}
          >
            Start for free
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/login" />}>
            Sign in
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-12">
          No credit card required · 5 free analyses / month
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 flex-wrap mb-16">
          {[
            { n: "12,000+", label: "analyses run" },
            { n: "3,200+", label: "creators" },
            { n: "< 3 min", label: "average time" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold">{n}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Product mockup */}
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-primary/15 blur-2xl scale-95" />
          <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/60">
              <div className="size-2.5 rounded-full bg-red-400" />
              <div className="size-2.5 rounded-full bg-yellow-400" />
              <div className="size-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-5 rounded-md bg-background/70 text-[11px] flex items-center justify-center text-muted-foreground">
                yt-insight.ai/analyses/mrbeast
              </div>
            </div>
            {/* Mock content */}
            <div className="p-5 space-y-4 text-left">
              {/* Channel header */}
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">MrBeast</p>
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                    >
                      Completed
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    320M subscribers · 800 videos · 4,821 comments analyzed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground mb-1.5">Sentiment</p>
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                  >
                    Positive
                  </Badge>
                </div>
                <div className="rounded-lg border p-3 col-span-2">
                  <p className="text-xs text-muted-foreground mb-1.5">Audience Type</p>
                  <p className="text-xs font-medium">Gen Z entertainment fans, 13–28</p>
                </div>
              </div>

              {/* Topics */}
              <div className="rounded-lg border p-3 space-y-2.5">
                <p className="text-xs font-semibold">Top Topics</p>
                {MOCK_TOPICS.map(({ topic, pct }) => (
                  <div key={topic}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{topic}</span>
                      <span className="font-medium">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI summary snippet */}
              <div className="rounded-lg border bg-primary/5 p-3">
                <p className="text-xs font-semibold text-primary mb-1.5">AI Summary</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  &quot;Viewers consistently praise the production quality and creative challenges.
                  Strong demand for behind-the-scenes content and collaborations with other
                  creators...&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-muted-foreground">From URL to insights in under 3 minutes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          <div className="hidden sm:block absolute top-7 left-[38%] right-[38%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="size-14 rounded-2xl bg-primary/10 text-primary font-bold text-base flex items-center justify-center mx-auto mb-5 border border-primary/20">
                {n}
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features bento ── */}
      <section className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
          <p className="text-muted-foreground">Deep insights from every comment, surfaced for you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {/* Large featured card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 group">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                <Brain className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-2">AI-powered analysis</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                DeepSeek AI reads thousands of comments and surfaces what viewers actually think
                and want. No manual reading required.
              </p>
              <div className="mt-auto rounded-lg bg-background/70 border p-3 text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">AI Summary: </span>
                &quot;Viewers consistently praise the production quality and creative challenges.
                There&apos;s strong demand for behind-the-scenes content and collaboration videos...&quot;
              </div>
            </CardContent>
          </Card>

          {/* Regular feature cards */}
          {FEATURES.slice(1).map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group hover:border-primary/40 transition-colors">
              <CardContent className="pt-5 pb-4">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Simple pricing</h2>
          <p className="text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlighted ? "border-primary relative" : ""}
              style={
                plan.highlighted
                  ? { boxShadow: "0 0 48px -8px oklch(0.65 0.23 25 / 0.45)" }
                  : undefined
              }
            >
              {plan.highlighted && (
                <div className="flex justify-center -mt-3.5 mb-1">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5 rounded-full">
                    Most popular
                  </span>
                </div>
              )}
              <CardContent className="pt-5 pb-5 space-y-4">
                <div>
                  <p className="font-semibold text-base">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && (
                      <span className="text-xs text-muted-foreground">/mo</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="size-3.5 text-primary shrink-0" />
                  {plan.analyses}
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  render={<Link href={plan.href} />}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[500px] rounded-full blur-3xl"
            style={{ background: "oklch(0.65 0.23 25 / 0.12)" }}
          />
        </div>
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Start understanding your audience today
          </h2>
          <p className="text-muted-foreground mb-8">
            5 free analyses every month. No credit card required.
          </p>
          <Button
            size="lg"
            className="gap-2"
            style={{ boxShadow: "0 8px 32px -4px oklch(0.65 0.23 25 / 0.45)" }}
            render={<Link href="/register" />}
          >
            Create free account
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
