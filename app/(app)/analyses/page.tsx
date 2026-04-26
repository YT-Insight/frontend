"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { useAnalysesList } from "@/hooks/use-analyses";
import { Search, ChevronLeft, ChevronRight, Video } from "lucide-react";

export default function AnalysesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAnalysesList(page);

  const totalPages = data ? Math.ceil(data.count / 10) : 1;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Analysis history</h2>
          {data && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {data.count} total {data.count === 1 ? "analysis" : "analyses"}
            </p>
          )}
        </div>
        <Button size="sm" render={<Link href="/analyze" />}>
          <Search className="size-3.5" />
          New
        </Button>
      </div>

      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[72px] rounded-lg" />
            ))
          : data?.results.map((a) => <AnalysisCard key={a.id} analysis={a} />)}
      </div>

      {!isLoading && data?.results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Video className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">No analyses yet</p>
            <p className="text-sm text-muted-foreground">
              Start by analyzing a YouTube channel.
            </p>
          </div>
          <Button render={<Link href="/analyze" />}>Start analysis</Button>
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
