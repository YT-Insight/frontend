import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <PlayCircle className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">YT Insight</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
