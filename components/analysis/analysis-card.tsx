import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/analysis/status-badge";
import type { AnalysisListItem } from "@/types/api";
import { formatDistanceToNow } from "@/lib/format";
import { PlayCircle, Video, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
  analysis: AnalysisListItem;
}

const STATUS_BORDER: Record<string, string> = {
  pending: "border-l-yellow-400",
  processing: "border-l-blue-400",
  completed: "border-l-emerald-500",
  failed: "border-l-red-400",
};

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { id, channel, input_url, status, videos_analyzed, comments_analyzed, created_at } =
    analysis;

  const channelName =
    channel?.title ??
    (() => {
      try {
        return new URL(input_url).hostname;
      } catch {
        return input_url;
      }
    })();

  return (
    <Link href={`/analyses/${id}`}>
      <Card
        className={cn(
          "hover:bg-muted/30 transition-colors cursor-pointer group border-l-[3px]",
          STATUS_BORDER[status] ?? "border-l-border"
        )}
      >
        <CardContent className="flex items-center gap-4 p-4">
          {/* Thumbnail */}
          {channel?.thumbnail_url ? (
            <img
              src={channel.thumbnail_url}
              alt={channelName}
              className="size-11 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="size-11 rounded-full bg-muted flex items-center justify-center shrink-0">
              <PlayCircle className="size-5 text-muted-foreground" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                {channelName}
              </span>
              <StatusBadge status={status} />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(created_at)}
            </p>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Video className="size-3" />
              {videos_analyzed} videos
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-3" />
              {comments_analyzed.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
