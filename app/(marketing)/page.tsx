import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  TrendingUp,
  Users,
  MessageCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Check,
  Link2,
  Zap,
  BrainCircuit,
} from "lucide-react";
import { AnalysisReveal } from "@/components/marketing/analysis-reveal";
import { TestimonialMarquee } from "@/components/marketing/testimonial-marquee";
import { CyclingWord } from "@/components/marketing/cycling-word";
import { ActivityTicker } from "@/components/marketing/activity-ticker";
import { FAQSection } from "@/components/marketing/faq-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { AnimatedCounter, Reveal } from "@/components/marketing/animations";

// ── Feature rows data ──────────────────────────────────────────────────────────

const FEATURE_ROWS = [
  {
    badge: "AI Analysis",
    title: "Let AI read every comment so you don't have to",
    description:
      "YT Insight processes thousands of comments per channel and distills them into clear, structured insights. Understand your audience in minutes, not days.",
    bullets: [
      "Reads up to 6,000 comments per analysis",
      "Generates a structured AI summary automatically",
      "Identifies sentiment: positive, negative, mixed, or neutral",
    ],
    icon: Brain,
    preview: "ai-summary",
  },
  {
    badge: "Topics & Audience",
    title: "Know exactly what your viewers care about",
    description:
      "The AI ranks every topic your audience mentions — from most to least relevant — and tells you exactly who your audience is.",
    bullets: [
      "Topics ranked by AI relevance score",
      "Audience type profiling (age, interest, behavior)",
      "Works for any language and niche",
    ],
    icon: TrendingUp,
    preview: "topics",
  },
  {
    badge: "Growth",
    title: "Get a content strategy built from real data",
    description:
      "Stop guessing what to make next. YT Insight surfaces the questions your viewers ask most and turns them into actionable content ideas.",
    bullets: [
      "AI-generated content suggestions per channel",
      "Top viewer questions, pre-answered by AI",
      "Works on competitor channels too",
    ],
    icon: Lightbulb,
    preview: "suggestions",
  },
];

// ── Feature previews ───────────────────────────────────────────────────────────

function AISummaryPreview() {
  return (
    <div className="rounded-2xl border bg-card shadow-xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/50">
        <div className="size-2.5 rounded-full bg-red-400/80" />
        <div className="size-2.5 rounded-full bg-yellow-400/80" />
        <div className="size-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[11px] text-muted-foreground">
          AI Summary
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-black shrink-0">
            M
          </div>
          <div>
            <p className="font-semibold text-sm">MrBeast</p>
            <p className="text-xs text-muted-foreground">4,821 comments analyzed</p>
          </div>
          <Badge
            variant="outline"
            className="ml-auto text-xs bg-green-500/10 text-green-600 border-green-500/20"
          >
            Positive
          </Badge>
        </div>
        <div className="rounded-xl border bg-primary/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Brain className="size-3.5 text-primary" />
            <p className="text-xs font-semibold text-primary">AI Summary</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            &ldquo;Viewers consistently praise production quality and creative
            challenges. Strong demand for philanthropy content. High emotional
            investment across all age groups.&rdquo;
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground mb-1">Audience type</p>
            <p className="font-medium">Gen Z, 13–28</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground mb-1">Sentiment</p>
            <p className="font-medium text-green-600">98% Positive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicsPreview() {
  const topics = [
    { label: "Challenges & competitions", pct: 94 },
    { label: "Philanthropy", pct: 81 },
    { label: "Production quality", pct: 72 },
    { label: "Creator collabs", pct: 58 },
  ];
  return (
    <div className="rounded-2xl border bg-card shadow-xl p-5 space-y-4">
      <p className="text-sm font-semibold">Top Topics</p>
      <div className="space-y-3">
        {topics.map(({ label, pct }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold">{pct}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuggestionsPreview() {
  const suggestions = [
    "'Viewers choose the challenge' series",
    "Behind-the-scenes charity donation video",
    "Track the same challenge across multiple videos",
    "Collaboration with smaller creators",
  ];
  const questions = [
    "How much does each video cost?",
    "Can I be in a MrBeast video?",
  ];
  return (
    <div className="rounded-2xl border bg-card shadow-xl p-5 space-y-4">
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Lightbulb className="size-3.5 text-primary" />
          <p className="text-sm font-semibold">Content Suggestions</p>
        </div>
        <div className="space-y-2">
          {suggestions.map((s) => (
            <div
              key={s}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="text-primary shrink-0 mt-0.5">→</span>
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center gap-1.5 mb-3">
          <MessageCircle className="size-3.5 text-primary" />
          <p className="text-sm font-semibold">Top Questions</p>
        </div>
        <div className="space-y-2">
          {questions.map((q) => (
            <div
              key={q}
              className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
            >
              &ldquo;{q}&rdquo;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, React.ReactNode> = {
  "ai-summary": <AISummaryPreview />,
  topics: <TopicsPreview />,
  suggestions: <SuggestionsPreview />,
};

// ── Minor features grid ────────────────────────────────────────────────────────

const MINOR_FEATURES = [
  { icon: Users, title: "Audience profiling", description: "Discover who watches — age range, interests, and engagement patterns." },
  { icon: MessageCircle, title: "Viewer Q&A", description: "The top questions your audience asks, already answered by AI." },
  { icon: Sparkles, title: "Competitor analysis", description: "Analyze any public channel — spy on niches before you enter them." },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div>

      {/* ════════════════════════ HERO — dark ════════════════════════ */}
      <section className="relative bg-[#09090b] overflow-hidden">

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #09090b 100%)",
          }}
        />

        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-blob absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.23 25) 0%, transparent 70%)",
            }}
          />
          <div
            className="animate-blob blob-delay-2 absolute top-16 right-0 h-80 w-80 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, oklch(0.75 0.18 50) 0%, transparent 70%)",
            }}
          />
          <div
            className="animate-blob blob-delay-4 absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, oklch(0.6 0.2 15) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-0 text-center">

          {/* Badge */}
          <div className="animate-fade-up">
            <Badge
              variant="outline"
              className="mb-7 gap-1.5 border-white/15 bg-white/6 text-zinc-300 px-3 py-1"
            >
              <Sparkles className="size-3 text-primary" />
              AI-powered YouTube analytics
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.93] mb-7 text-white">
            Know exactly what your{" "}
            <CyclingWord />{" "}
            wants
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 text-lg text-zinc-400 max-w-lg mx-auto mb-9 leading-relaxed">
            Analyze any YouTube channel&apos;s comments with AI. Discover
            audience sentiment, trending topics, and growth opportunities in
            minutes.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-350 flex items-center justify-center gap-3 flex-wrap mb-3">
            <Button
              size="lg"
              className="gap-2 text-base px-7 font-semibold"
              style={{
                boxShadow: "0 0 40px -4px oklch(0.65 0.23 25 / 0.6)",
              }}
              render={<Link href="/register" />}
            >
              Start for free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white text-base px-7"
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </div>

          <p className="animate-fade-up delay-500 text-xs text-zinc-500 mb-8">
            No credit card required · 5 free analyses every month
          </p>

          {/* Activity ticker */}
          <div className="animate-fade-up delay-500 mb-12 max-w-2xl mx-auto">
            <ActivityTicker />
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500 flex items-center justify-center gap-12 flex-wrap mb-16">
            {[
              { n: 12000, suffix: "+", label: "analyses run" },
              { n: 3200, suffix: "+", label: "creators" },
            ].map(({ n, suffix, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter to={n} suffix={suffix} />
                </p>
                <p className="text-xs text-zinc-500 mt-1">{label}</p>
              </div>
            ))}
            <div className="text-center">
              <p className="text-3xl font-black text-white">&lt; 3 min</p>
              <p className="text-xs text-zinc-500 mt-1">average time</p>
            </div>
          </div>

          {/* Product mockup — animated reveal */}
          <div
            className="relative mx-auto max-w-3xl"
            style={{ perspective: "1400px" }}
          >
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl blur-3xl opacity-35"
              style={{ background: "oklch(0.65 0.23 25 / 0.3)" }}
            />
            <div
              style={{
                transform: "rotateX(8deg) scale(0.98)",
                transformOrigin: "top center",
              }}
            >
              <AnalysisReveal />
            </div>
            {/* fade to background */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #09090b)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════ LIGHT SECTIONS ════════════════════════ */}
      <div className="bg-background">

        {/* Social proof bar */}
        <div className="border-b border-t">
          <div className="mx-auto max-w-5xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Trusted by creators worldwide
            </span>
            {[
              "Tech channels",
              "Gaming creators",
              "Finance YouTubers",
              "Agencies",
              "Educators",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <section className="py-20 overflow-hidden">
          <Reveal className="text-center mb-10 px-6">
            <h2 className="text-3xl font-black mb-2">
              Loved by creators
            </h2>
            <p className="text-muted-foreground">
              From solo YouTubers to creator agencies.
            </p>
          </Reveal>
          <TestimonialMarquee />
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-28">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-black mb-3">How it works</h2>
            <p className="text-muted-foreground">
              From URL to insights in under 3 minutes.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div className="space-y-8">
              {[
                {
                  n: "01",
                  icon: Link2,
                  title: "Paste a channel URL",
                  desc: "Any YouTube channel — yours or a competitor's. Public channels only.",
                },
                {
                  n: "02",
                  icon: Zap,
                  title: "We fetch the data",
                  desc: "We pull recent videos and hundreds of comments automatically via the YouTube API.",
                },
                {
                  n: "03",
                  icon: BrainCircuit,
                  title: "AI analysis runs",
                  desc: "DeepSeek AI reads every comment and generates deep insights in minutes.",
                },
              ].map(({ n, icon: StepIcon, title, desc }, i) => (
                <Reveal key={n} delay={i * 0.1}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <StepIcon className="size-5 text-primary" />
                      </div>
                      {i < 2 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-2 min-h-8" />
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-1">
                        Step {n}
                      </p>
                      <h3 className="font-bold mb-1.5">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Demo */}
            <Reveal delay={0.2}>
              <AnalysisReveal />
            </Reveal>
          </div>
        </section>

        {/* Features — alternating rows */}
        <section id="features" className="mx-auto max-w-6xl px-6 pb-28 space-y-24">
          <Reveal className="text-center">
            <h2 className="text-4xl font-black mb-3">Everything you need</h2>
            <p className="text-muted-foreground">
              Deep insights from every comment, surfaced for you.
            </p>
          </Reveal>

          {FEATURE_ROWS.map(
            ({ badge, title, description, bullets, icon: Icon, preview }, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={badge} delay={0.1}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                      !isEven ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Text */}
                    <div className="space-y-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary/80">
                        <Icon className="size-3.5" />
                        {badge}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-black leading-tight">
                        {title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                      <ul className="space-y-2.5">
                        {bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm">
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preview */}
                    <div>{PREVIEW_MAP[preview]}</div>
                  </div>
                </Reveal>
              );
            }
          )}

          {/* Minor features grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MINOR_FEATURES.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="group hover:border-primary/40 hover:shadow-[0_0_24px_-4px_oklch(0.65_0.23_25_/_0.15)] transition-all duration-300"
                >
                  <CardContent className="pt-5 pb-4">
                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-5xl px-6 pb-28">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Simple pricing</h2>
            <p className="text-muted-foreground">
              Start free. Upgrade when you need more.
            </p>
          </Reveal>
          <PricingSection />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-2xl px-6 pb-28">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </Reveal>
          <FAQSection />
        </section>
      </div>

      {/* ════════════════════════ FINAL CTA — dark ════════════════════════ */}
      <section className="relative bg-[#09090b] py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="animate-blob absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, oklch(0.65 0.23 25) 0%, transparent 70%)",
            }}
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
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              size="lg"
              className="gap-2 text-base px-8 font-semibold"
              style={{
                boxShadow: "0 0 40px -4px oklch(0.65 0.23 25 / 0.6)",
              }}
              render={<Link href="/register" />}
            >
              Create free account
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8"
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
