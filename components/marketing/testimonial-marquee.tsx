import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote: "YT Insight changed how I plan content. I used to spend Sunday afternoons reading comments — now I get a complete picture in 3 minutes.",
    author: "Alex R.",
    role: "340K tech creator",
    avatar: "A",
    color: "from-blue-500 to-cyan-400",
  },
  {
    quote: "I discovered my audience cared way more about budgeting than investing. Shifted my content strategy — my views literally doubled.",
    author: "Priya M.",
    role: "120K finance creator",
    avatar: "P",
    color: "from-purple-500 to-pink-400",
  },
  {
    quote: "I use it to spy on competitor channels before deciding what to create. It's like having a research team for $10/month.",
    author: "Marcus K.",
    role: "Content strategist",
    avatar: "M",
    color: "from-green-500 to-emerald-400",
  },
  {
    quote: "The sentiment analysis alone is worth the subscription. I caught a PR issue brewing in my comments 2 weeks before it became a problem.",
    author: "Jordan L.",
    role: "280K gaming creator",
    avatar: "J",
    color: "from-orange-500 to-red-400",
  },
  {
    quote: "Analyzed 12 competitor channels in an afternoon. Found 3 topic gaps — my first video on that topic hit 500K views.",
    author: "Chris B.",
    role: "450K travel creator",
    avatar: "C",
    color: "from-yellow-500 to-orange-400",
  },
  {
    quote: "Every content decision I make is now backed by data. I finally know exactly what my audience wants before I even start filming.",
    author: "Sofia H.",
    role: "85K lifestyle creator",
    avatar: "S",
    color: "from-pink-500 to-rose-400",
  },
  {
    quote: "As a creator agency, we run YT Insight on every channel before onboarding. It gives us insights that would take days to compile manually.",
    author: "Daniel W.",
    role: "Creator agency founder",
    avatar: "D",
    color: "from-indigo-500 to-blue-400",
  },
  {
    quote: "The Q&A feature is underrated. My audience asks the same 10 questions. Now I make videos that answer them directly — retention went through the roof.",
    author: "Nadia K.",
    role: "190K education creator",
    avatar: "N",
    color: "from-teal-500 to-green-400",
  },
];

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 rounded-xl border bg-card p-5 space-y-4 mx-3 hover:border-primary/30 transition-colors">
      <p className="text-sm text-muted-foreground leading-relaxed">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0",
            t.color
          )}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.author}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex animate-marquee">
        {doubled.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
