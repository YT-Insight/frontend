"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/analysis/status-badge";
import { AnalysisResults } from "@/components/analysis/analysis-results";
import { useAnalysisDetail, useAnalysisStatus } from "@/hooks/use-analyses";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate, formatNumber } from "@/lib/format";
import {
  PlayCircle,
  Users,
  Video,
  MessageCircle,
  ExternalLink,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function AnalysisDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: analysis, isLoading } = useAnalysisDetail(id);

  const isPolling =
    analysis?.status === "pending" || analysis?.status === "processing";

  const { data: statusPoll } = useAnalysisStatus(id, isPolling);

  useEffect(() => {
    if (
      statusPoll?.status === "completed" ||
      statusPoll?.status === "failed"
    ) {
      queryClient.invalidateQueries({ queryKey: ["analysis", id] });
    }
  }, [statusPoll?.status, id, queryClient]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <AlertCircle className="size-8 text-muted-foreground" />
        <p className="font-medium">Analysis not found</p>
        <Button variant="outline" size="sm" render={<Link href="/analyses" />}>
          <ArrowLeft className="size-4" />
          Back to history
        </Button>
      </div>
    );
  }

  const activeStatus = statusPoll?.status ?? analysis.status;
  const activeVideos = statusPoll?.videos_analyzed ?? analysis.videos_analyzed;
  const activeComments = statusPoll?.comments_analyzed ?? analysis.comments_analyzed;

  return (
    <div className="space-y-5 max-w-3xl">
      <Button variant="ghost" size="sm" className="-ml-2" render={<Link href="/analyses" />}>
        <ArrowLeft className="size-4" />
        History
      </Button>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {analysis.channel?.thumbnail_url ? (
              <img
                src={analysis.channel.thumbnail_url}
                alt={analysis.channel.title}
                className="size-14 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="size-14 rounded-full bg-muted flex items-center justify-center shrink-0">
                <PlayCircle className="size-7 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-base truncate">
                  {analysis.channel?.title ?? analysis.input_url}
                </h2>
                <StatusBadge status={activeStatus} />
              </div>
              {analysis.channel && (
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {formatNumber(analysis.channel.subscriber_count)} subscribers
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="size-3" />
                    {analysis.channel.video_count} videos
                  </span>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Video className="size-3" />
                  {activeVideos} analyzed
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="size-3" />
                  {activeComments.toLocaleString()} comments
                </span>
                <span>{formatDate(analysis.created_at)}</span>
                <a
                  href={analysis.input_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  View channel
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(activeStatus === "pending" || activeStatus === "processing") && (
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Loader2 className="size-5 text-primary animate-spin shrink-0" />
            <div>
              <p className="font-medium text-sm">
                {activeStatus === "pending"
                  ? "Analysis queued"
                  : "Analyzing comments…"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This typically takes 1–3 minutes. This page updates automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeStatus === "failed" && analysis.error_message && (
        <Card className="border-destructive/50">
          <CardContent className="flex items-start gap-3 p-5">
            <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-destructive">Analysis failed</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {analysis.error_message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeStatus === "completed" && <AnalysisResults analysis={analysis} />}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-5 max-w-3xl">
      <Skeleton className="h-8 w-24" />
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Skeleton className="size-14 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}
