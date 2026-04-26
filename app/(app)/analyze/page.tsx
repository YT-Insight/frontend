import type { Metadata } from "next";
import { AnalysisForm } from "@/components/analysis/analysis-form";

export const metadata: Metadata = { title: "New Analysis" };

export default function AnalyzePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Start a new analysis</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enter a YouTube channel URL to begin AI-powered audience analysis.
        </p>
      </div>
      <AnalysisForm />
    </div>
  );
}
