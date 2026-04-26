"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { useAnalysesList } from "@/hooks/use-analyses";
import { Search, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalysisStatus } from "@/types/api";

type FilterStatus = "all" | AnalysisStatus;

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "processing", label: "Processing" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const FILTER_ACTIVE: Record<FilterStatus, string> = {
  all: "bg-foreground text-background",
  completed: "bg-emerald-500 text-white border-emerald-500",
  processing: "bg-blue-500 text-white border-blue-500",
  pending: "bg-yellow-500 text-white border-yellow-500",
  failed: "bg-red-500 text-white border-red-500",
};

export default function AnalysesPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const { data, isLoading } = useAnalysesList(page);

  const filtered =
    filter === "all"
      ? (data?.results ?? [])
      : (data?.results ?? []).filter((a) => a.status === filter);

  const totalPages = data ? Math.ceil(data.count / 10) : 1;
  const totalCount = data?.count ?? 0;

  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Analysis history</h2>
          {data && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalCount} {totalCount === 1 ? "analysis" : "analyses"} total
            </p>
          )}
        </div>
        <Button size="sm" render={<Link href="/analyze" />}>
          <Search className="size-3.5" />
          New
        </Button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {FILTERS.map(({ value, label }) => {
          const isActive = filter === value;
          return (
            <button
              key={value}
              onClick={() => {
                setFilter(value);
                setPage(1);
              }}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                isActive
                  ? FILTER_ACTIVE[value]
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))
          : filtered.map((a) => <AnalysisCard key={a.id} analysis={a} />)}
      </div>

      {/* Empty — filtered */}
      {!isLoading && data && filtered.length === 0 && totalCount > 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <p className="font-medium text-sm">No {filter} analyses</p>
          <p className="text-xs text-muted-foreground">
            Try a different filter.
          </p>
        </div>
      )}

      {/* Empty — no data at all */}
      {!isLoading && totalCount === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Video className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No analyses yet</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Start by analyzing a YouTube channel.
            </p>
          </div>
          <Button render={<Link href="/analyze" />}>Start analysis</Button>
        </div>
      )}

      {/* Pagination */}
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
