import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/analysis/status-badge";
import type { AnalysisListItem } from "@/types/api";
import { formatDistanceToNow } from "@/lib/format";
import { PlayCircle, Video, MessageCircle } from "lucide-react";

interface AnalysisCardProps {
  analysis: AnalysisListItem;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { id, channel, input_url, status, videos_analyzed, comments_analyzed, created_at } =
    analysis;

  const channelName = channel?.title ?? (() => {
    try { return new URL(input_url).hostname; } catch { return input_url; }
  })();

  return (
    <Link href={`/analyses/${id}`}>
      <Card className="hover:bg-muted/30 transition-colors cursor-pointer group">
        <CardContent className="flex items-center gap-4 p-4">
          {channel?.thumbnail_url ? (
            <img
              src={channel.thumbnail_url}
              alt={channel.title}
              className="size-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <PlayCircle className="size-5 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-sm truncate">{channelName}</span>
              <StatusBadge status={status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Video className="size-3" />
                {videos_analyzed} videos
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="size-3" />
                {comments_analyzed.toLocaleString()} comments
              </span>
              <span>{formatDistanceToNow(created_at)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
