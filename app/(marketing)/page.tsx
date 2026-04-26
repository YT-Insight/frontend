import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, TrendingUp, Users, MessageCircle, Lightbulb, Check,
  ArrowRight, Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-powered analysis",
    description: "DeepSeek AI reads thousands of comments and surfaces what viewers actually think and want.",
  },
  {
    icon: TrendingUp,
    title: "Audience sentiment",
    description: "Understand the emotional tone of your audience — positive, negative, mixed, or neutral.",
  },
  {
    icon: Users,
    title: "Audience profiling",
    description: "Discover who your audience is — their interests, demographics, and engagement patterns.",
  },
  {
    icon: MessageCircle,
    title: "Top topics",
    description: "See which subjects your viewers care most about, ranked by relevance score.",
  },
  {
    icon: Lightbulb,
    title: "Growth suggestions",
    description: "Get actionable content and engagement recommendations based on real audience data.",
  },
  {
    icon: Sparkles,
    title: "Q&A insights",
    description: "Discover the most common questions your viewers ask, already answered by AI.",
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
    <div>

      {/* ══════════════ HERO — always dark ══════════════ */}
      <section className="relative bg-[#09090b] overflow-hidden">

        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Radial mask so dots fade out toward edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #09090b 100%)",
          }}
        />

        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-blob absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, oklch(0.65 0.23 25) 0%, transparent 70%)" }}
          />
          <div
            className="animate-blob blob-delay-2 absolute top-16 right-0 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.18 50) 0%, transparent 70%)" }}
          />
          <div
            className="animate-blob blob-delay-4 absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.2 15) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-0 text-center">

          {/* Badge */}
          <div className="animate-fade-up">
            <Badge
              variant="outline"
              className="mb-8 gap-1.5 border-white/15 bg-white/6 text-zinc-300 px-3 py-1"
            >
              <Sparkles className="size-3 text-primary" />
              AI-powered YouTube analytics
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 mx-auto max-w-4xl text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] mb-7 text-white">
            Know exactly what your{" "}
            <span className="animate-gradient-x bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
              YouTube audience
            </span>{" "}
            wants
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-lg text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Analyze any YouTube channel&apos;s comments with AI. Discover audience
            sentiment, trending topics, and growth opportunities in minutes.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-350 flex items-center justify-center gap-3 flex-wrap mb-4">
            <Button
              size="lg"
              className="gap-2 text-base px-6"
              style={{ boxShadow: "0 0 40px -4px oklch(0.65 0.23 25 / 0.6)" }}
              render={<Link href="/register" />}
            >
              Start for free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white text-base px-6"
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </div>

          <p className="animate-fade-up delay-500 text-xs text-zinc-500 mb-14">
            No credit card required · 5 free analyses / month
          </p>

          {/* Stats */}
          <div className="animate-fade-up delay-500 flex items-center justify-center gap-12 flex-wrap mb-20">
            {[
              { n: "12,000+", label: "analyses run" },
              { n: "3,200+", label: "creators" },
              { n: "< 3 min", label: "average time" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white">{n}</p>
                <p className="text-xs text-zinc-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Perspective-tilted product mockup ── */}
          {/* To use a real screenshot: replace the inner div with <Image src="/mockup.png" ... /> */}
          <div
            className="relative mx-auto max-w-4xl"
            style={{ perspective: "1400px" }}
          >
            {/* Glow underneath */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-3xl opacity-40"
              style={{ background: "oklch(0.65 0.23 25 / 0.35)" }}
            />

            <div
              className="rounded-xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden"
              style={{
                transform: "rotateX(10deg) scale(0.97)",
                transformOrigin: "top center",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-800/80">
                <div className="size-3 rounded-full bg-red-500/70" />
                <div className="size-3 rounded-full bg-yellow-500/70" />
                <div className="size-3 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-5 h-6 rounded-md bg-zinc-700/60 text-[11px] flex items-center justify-center text-zinc-400">
                  yt-insight.ai/analyses/mrbeast
                </div>
              </div>

              {/* Mock content */}
              <div className="p-6 space-y-5 text-left">
                {/* Channel header */}
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-black text-xl shrink-0">
                    M
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-white">MrBeast</p>
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-500/10 text-green-400 border-green-500/20"
                      >
                        Completed
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      320M subscribers · 800 videos · 4,821 comments analyzed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-white/8 bg-zinc-800/60 p-3">
                    <p className="text-xs text-zinc-400 mb-1.5">Sentiment</p>
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-500/10 text-green-400 border-green-500/20"
                    >
                      Positive
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-white/8 bg-zinc-800/60 p-3 col-span-2">
                    <p className="text-xs text-zinc-400 mb-1.5">Audience Type</p>
                    <p className="text-xs font-medium text-zinc-200">Gen Z entertainment fans, 13–28</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Topics */}
                  <div className="rounded-lg border border-white/8 bg-zinc-800/60 p-4 space-y-3">
                    <p className="text-xs font-semibold text-zinc-200">Top Topics</p>
                    {MOCK_TOPICS.map(({ topic, pct }) => (
                      <div key={topic}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-400">{topic}</span>
                          <span className="font-medium text-zinc-200">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Summary */}
                  <div className="rounded-lg border border-primary/25 bg-primary/8 p-4">
                    <p className="text-xs font-semibold text-primary mb-2">AI Summary</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      &quot;Viewers consistently praise the production quality and creative challenges. Strong demand for behind-the-scenes content and collaborations with other creators. Audience shows high emotional investment in philanthropy-themed videos.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom fade — creates the "floating above the fold" effect */}
              <div
                className="h-16 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, #09090b)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ REST — normal background ══════════════ */}
      <div className="bg-background">

        {/* Social proof bar */}
        <div className="border-b border-t">
          <div className="mx-auto max-w-5xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Trusted by creators worldwide</span>
            {["Tech channels", "Gaming creators", "Finance YouTubers", "Agencies", "Educators"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* How it works */}
        <section className="mx-auto max-w-5xl px-6 py-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-3">How it works</h2>
            <p className="text-muted-foreground">From URL to insights in under 3 minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            <div className="hidden sm:block absolute top-8 left-[36%] right-[36%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="size-16 rounded-2xl bg-primary/10 text-primary font-black text-lg flex items-center justify-center mx-auto mb-5 border border-primary/20">
                  {n}
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features bento */}
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-3">Everything you need</h2>
            <p className="text-muted-foreground">Deep insights from every comment, surfaced for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {/* Large featured card */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <Brain className="size-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">AI-powered analysis</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  DeepSeek AI reads thousands of comments and surfaces what viewers actually think and want. No manual reading required.
                </p>
                <div className="mt-auto rounded-lg bg-background/70 border p-3 text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary font-semibold">AI Summary: </span>
                  &quot;Viewers consistently praise the production quality and creative challenges. There&apos;s strong demand for behind-the-scenes content...&quot;
                </div>
              </CardContent>
            </Card>

            {FEATURES.slice(1).map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="group hover:border-primary/50 hover:shadow-[0_0_24px_-4px_oklch(0.65_0.23_25_/_0.2)] transition-all duration-300"
              >
                <CardContent className="pt-5 pb-4">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-200">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-3">Simple pricing</h2>
            <p className="text-muted-foreground">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "border-primary relative" : ""}
                style={
                  plan.highlighted
                    ? { boxShadow: "0 0 50px -8px oklch(0.65 0.23 25 / 0.5)" }
                    : undefined
                }
              >
                {plan.highlighted && (
                  <div className="flex justify-center -mt-3.5 mb-1">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-0.5 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}
                <CardContent className="pt-5 pb-5 space-y-4">
                  <div>
                    <p className="font-bold text-base">{plan.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black">{plan.price}</span>
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

      </div>

      {/* ══════════════ FINAL CTA — dark again ══════════════ */}
      <section className="relative bg-[#09090b] py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="animate-blob absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, oklch(0.65 0.23 25) 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-xl px-6 text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25 mb-7">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Start understanding your audience today
          </h2>
          <p className="text-zinc-400 mb-9 leading-relaxed">
            5 free analyses every month. No credit card required.
          </p>
          <Button
            size="lg"
            className="gap-2 text-base px-7"
            style={{ boxShadow: "0 0 40px -4px oklch(0.65 0.23 25 / 0.6)" }}
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
