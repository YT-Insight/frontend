"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { useCreateAnalysis, useAnalysesList } from "@/hooks/use-analyses";
import { useAuth } from "@/hooks/use-auth";
import { getFieldErrors } from "@/lib/api";
import {
  PlayCircle,
  AlertCircle,
  Loader2,
  Database,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({
  channel_url: z
    .string()
    .min(1, "Channel URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => url.includes("youtube.com") || url.includes("youtu.be"),
      "URL must be a YouTube channel URL"
    ),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { icon: Database, label: "Fetch channel data" },
  { icon: MessageSquare, label: "Collect comments" },
  { icon: Sparkles, label: "AI analysis" },
];

export function AnalysisForm() {
  const { subscription, usage } = useAuth();
  const createAnalysis = useCreateAnalysis();
  const { data: historyData } = useAnalysesList(1);
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const quotaExhausted =
    usage && subscription
      ? usage.video_analyzed >= usage.video_limit && subscription.plan === "free"
      : false;

  const onSubmit = async (data: FormData) => {
    setServerErrors({});
    try {
      await createAnalysis.mutateAsync(data.channel_url);
    } catch (error) {
      setServerErrors(getFieldErrors(error));
    }
  };

  // Recent channels from history
  const recentChannels = historyData?.results
    .filter((a) => a.channel?.title && a.status === "completed")
    .slice(0, 4)
    .map((a) => ({ name: a.channel!.title, url: a.input_url }))
    ?? [];

  const hasError = !!(errors.channel_url || serverErrors.channel_url);

  return (
    <div className="space-y-6">
      {/* Quota alert */}
      {quotaExhausted && (
        <Alert className="border-destructive/50 bg-destructive/5 flex items-start gap-3">
          <AlertCircle className="size-4 text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-sm text-destructive">Monthly limit reached</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You&apos;ve used all {usage?.video_limit} analyses this month.{" "}
              <Link href="/billing" className="text-primary hover:underline">
                Upgrade your plan
              </Link>{" "}
              to continue.
            </p>
          </div>
        </Alert>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="relative">
          <PlayCircle className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="https://youtube.com/@channelname"
            className={cn(
              "pl-11 pr-4 h-13 text-base rounded-xl shadow-sm border-2 transition-colors",
              "focus-visible:border-primary focus-visible:ring-0",
              hasError && "border-destructive"
            )}
            aria-invalid={hasError}
            disabled={createAnalysis.isPending || quotaExhausted}
            {...register("channel_url")}
          />
        </div>

        {hasError && (
          <p className="text-xs text-destructive flex items-center gap-1.5 pl-1">
            <AlertCircle className="size-3.5 shrink-0" />
            {errors.channel_url?.message ?? serverErrors.channel_url}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl h-11 font-semibold text-sm"
          disabled={createAnalysis.isPending || quotaExhausted}
        >
          {createAnalysis.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Starting analysis…
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Analyze Channel
            </>
          )}
        </Button>
      </form>

      {/* Recent channels */}
      {recentChannels.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium px-1">
            Recent channels
          </p>
          <div className="flex flex-wrap gap-2">
            {recentChannels.map((ch) => (
              <button
                key={ch.url}
                type="button"
                onClick={() => setValue("channel_url", ch.url, { shouldValidate: true })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-muted/50 hover:bg-muted text-xs font-medium transition-colors"
              >
                <PlayCircle className="size-3 text-primary" />
                {ch.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="relative pt-2">
        {/* Connector line */}
        <div className="absolute top-[22px] left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-border hidden sm:block" />

        <div className="grid grid-cols-3 gap-3 text-center relative z-10">
          {STEPS.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="size-11 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center shadow-sm">
                <Icon className="size-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground leading-tight px-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
