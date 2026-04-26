import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-20 px-4 pt-3.5 pb-3.5">
        <div className="mx-auto max-w-5xl">
          <div className="flex h-11 items-center justify-between gap-4 rounded-full border border-white/10 bg-[#111113]/85 backdrop-blur-xl px-2 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 pl-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-400 shadow-sm">
                <PlayCircle className="size-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                YT Insight
              </span>
            </Link>

            {/* Center nav */}
            <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white rounded-full hover:bg-white/8 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-1 shrink-0 pr-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-white/8 rounded-full h-8 text-xs px-3.5"
                render={<Link href="/login" />}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="font-semibold rounded-full h-8 text-xs px-4"
                style={{ boxShadow: "0 0 20px -4px oklch(0.65 0.23 25 / 0.7)" }}
                render={<Link href="/register" />}
              >
                Get started free
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/8 bg-[#0c0c0f] py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-orange-400">
                  <PlayCircle className="size-4 text-white" />
                </div>
                <span className="font-bold text-white">YT Insight</span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-52">
                AI-powered YouTube audience analytics for creators and agencies.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Product
              </p>
              <div className="space-y-2.5">
                {[
                  { href: "#features", label: "Features" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "#how-it-works", label: "How it works" },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Company
              </p>
              <div className="space-y-2.5">
                {[
                  { href: "#", label: "About" },
                  { href: "#", label: "Blog" },
                  { href: "#", label: "Careers" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Legal & Support
              </p>
              <div className="space-y-2.5">
                {[
                  { href: "#", label: "Privacy policy" },
                  { href: "#", label: "Terms of service" },
                  { href: "#", label: "Contact us" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} YT Insight. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
              Built for creators worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
