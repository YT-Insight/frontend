import Link from "next/link";
import { PlayCircle, Check } from "lucide-react";

const BENEFITS = [
  "Audience sentiment analysis",
  "Top topics & trending themes",
  "AI-generated growth suggestions",
  "Common Q&A extraction",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left dark panel ── */}
      <div className="hidden lg:flex w-[460px] shrink-0 bg-[#09090b] flex-col justify-between p-12 border-r border-white/8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <PlayCircle className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-white">YT Insight</span>
        </Link>

        {/* Value prop */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Understand your YouTube audience in minutes
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              AI reads thousands of comments so you don&apos;t have to.
            </p>
          </div>

          <ul className="space-y-3">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 shrink-0">
                  <Check className="size-3 text-primary" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="rounded-xl border border-white/8 bg-white/4 p-5 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            &ldquo;Before YT Insight, I spent hours reading comments. Now I get the full picture in 3 minutes. It&apos;s completely changed how I plan content.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-white">Sarah K.</p>
              <p className="text-xs text-zinc-500">240K subscriber YouTube creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        {/* Mobile-only logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <PlayCircle className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold">YT Insight</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
