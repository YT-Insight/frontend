"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateAnalysis } from "@/hooks/use-analyses";
import { useAuth } from "@/hooks/use-auth";
import { getFieldErrors } from "@/lib/api";
import { PlayCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

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

export function AnalysisForm() {
  const { subscription, usage } = useAuth();
  const createAnalysis = useCreateAnalysis();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
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

  return (
    <div className="max-w-xl space-y-4">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analyze a YouTube Channel</CardTitle>
          <CardDescription className="text-sm">
            Paste any YouTube channel URL. We&apos;ll fetch recent videos, analyze the
            comments, and surface AI insights about the audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="channel_url">Channel URL</Label>
              <div className="relative">
                <PlayCircle className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="channel_url"
                  placeholder="https://youtube.com/@channelname"
                  className="pl-9"
                  aria-invalid={!!(errors.channel_url || serverErrors.channel_url)}
                  disabled={createAnalysis.isPending || quotaExhausted}
                  {...register("channel_url")}
                />
              </div>
              {(errors.channel_url || serverErrors.channel_url) && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3 shrink-0" />
                  {errors.channel_url?.message ?? serverErrors.channel_url}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createAnalysis.isPending || quotaExhausted}
            >
              {createAnalysis.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              {createAnalysis.isPending ? "Starting analysis…" : "Start Analysis"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { step: "1", label: "Fetch channel data" },
          { step: "2", label: "Collect comments" },
          { step: "3", label: "AI analysis" },
        ].map(({ step, label }) => (
          <div key={step} className="rounded-lg border bg-card p-3">
            <div className="size-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mx-auto mb-1.5">
              {step}
            </div>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
