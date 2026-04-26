"use client";

const ITEMS = [
  { handle: "@TechReviewPro", action: "analysis completed", badge: "98% positive", color: "bg-green-500" },
  { handle: "@FinanceGuru", action: "analyzed", badge: "4,200 comments", color: "bg-blue-500" },
  { handle: "@GamingChannel", action: "analysis completed", badge: "Mixed sentiment", color: "bg-yellow-500" },
  { handle: "@FitnessCreator", action: "analyzed", badge: "12 topics found", color: "bg-purple-500" },
  { handle: "@TravelVlog", action: "analysis completed", badge: "95% positive", color: "bg-emerald-500" },
  { handle: "@CodingChannel", action: "analyzed", badge: "3,800 comments", color: "bg-cyan-500" },
  { handle: "@BeautyCreator", action: "analysis completed", badge: "89% positive", color: "bg-pink-500" },
];

export function ActivityTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className="flex gap-3 animate-marquee"
        style={{ animationDuration: "22s" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 shrink-0 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs"
          >
            <span className={`size-1.5 rounded-full shrink-0 ${item.color}`} />
            <span className="text-zinc-300 font-semibold">{item.handle}</span>
            <span className="text-zinc-500">{item.action}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400">{item.badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
