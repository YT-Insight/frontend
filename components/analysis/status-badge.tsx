import { Badge } from "@/components/ui/badge";
import type { AnalysisStatus } from "@/types/api";
import { cn } from "@/lib/utils";

const CONFIG: Record<
  AnalysisStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
  },
};

interface StatusBadgeProps {
  status: AnalysisStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: colorClass } = CONFIG[status];
  return (
    <Badge
      variant="outline"
      className={cn(colorClass, className)}
    >
      {status === "processing" && (
        <span className="mr-1 inline-block size-1.5 rounded-full bg-blue-500 animate-pulse" />
      )}
      {label}
    </Badge>
  );
}
