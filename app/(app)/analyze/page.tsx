import type { Metadata } from "next";
import { AnalysisForm } from "@/components/analysis/analysis-form";
import { PlayCircle } from "lucide-react";

export const metadata: Metadata = { title: "New Analysis" };

export default function AnalyzePage() {
  return (
    <div className="flex flex-col items-center pt-8 pb-16 px-4">
      <div className="w-full max-w-2xl space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-400 mx-auto shadow-md">
            <PlayCircle className="size-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              What does your audience really want?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Enter any YouTube channel URL. We&apos;ll fetch recent videos, analyze
              thousands of comments, and surface AI-powered insights about your audience.
            </p>
          </div>
        </div>

        <AnalysisForm />
      </div>
    </div>
  );
}
