"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { AnalysisDetail, SentimentType, CategoryType } from "@/types/api";
import { cn } from "@/lib/utils";
import {
  Brain,
  Lightbulb,
  HelpCircle,
  Tag,
  TrendingUp,
  Users,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const SENTIMENT_CONFIG: Record<SentimentType, { label: string; className: string }> = {
  positive: { label: "Positive", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  negative: { label: "Negative", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  mixed: { label: "Mixed", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  neutral: { label: "Neutral", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" },
};

const CATEGORY_ICONS: Record<CategoryType, React.ElementType> = {
  content: MessageSquare,
  engagement: TrendingUp,
  growth: Sparkles,
  monetization: Tag,
  audience: Users,
  custom: Lightbulb,
};

interface AnalysisResultsProps {
  analysis: AnalysisDetail;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { result, topics, questions, suggestions } = analysis;

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="summary" className="flex items-center gap-1.5">
          <Brain className="size-3.5" />
          Summary
        </TabsTrigger>
        <TabsTrigger value="topics" className="flex items-center gap-1.5">
          <Tag className="size-3.5" />
          Topics
          {topics.length > 0 && (
            <span className="ml-0.5 text-xs text-muted-foreground">({topics.length})</span>
          )}
        </TabsTrigger>
        <TabsTrigger value="questions" className="flex items-center gap-1.5">
          <HelpCircle className="size-3.5" />
          Q&amp;A
          {questions.length > 0 && (
            <span className="ml-0.5 text-xs text-muted-foreground">({questions.length})</span>
          )}
        </TabsTrigger>
        <TabsTrigger value="suggestions" className="flex items-center gap-1.5">
          <Lightbulb className="size-3.5" />
          Suggestions
          {suggestions.length > 0 && (
            <span className="ml-0.5 text-xs text-muted-foreground">({suggestions.length})</span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="mt-4 space-y-4">
        {result ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card>
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground mb-1">Audience Sentiment</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      SENTIMENT_CONFIG[result.sentiment].className
                    )}
                  >
                    {result.sentiment}
                  </Badge>
                </CardContent>
              </Card>
              <Card className="col-span-2 sm:col-span-2">
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-muted-foreground mb-1">Audience Type</p>
                  <p className="text-sm font-medium">
                    {result.audience_type || "—"}
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.summary || "No summary available."}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <EmptyState message="Summary not available yet." />
        )}
      </TabsContent>

      <TabsContent value="topics" className="mt-4">
        {topics.length > 0 ? (
          <Card>
            <CardContent className="pt-4 divide-y divide-border">
              {topics.map((t, i) => {
                const pct = Math.round(parseFloat(t.relevance_score) * 100);
                return (
                  <div key={i} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{t.topic}</span>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ) : (
          <EmptyState message="No topics extracted yet." />
        )}
      </TabsContent>

      <TabsContent value="questions" className="mt-4 space-y-3">
        {questions.length > 0 ? (
          questions.map((q, i) => (
            <Card key={i}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2 mb-2">
                  <HelpCircle className="size-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm font-medium">{q.question}</p>
                </div>
                {q.answer && (
                  <>
                    <Separator className="my-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                      {q.answer}
                    </p>
                  </>
                )}
                <div className="mt-2 pl-6">
                  <Badge variant="outline" className="text-xs capitalize">
                    {q.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <EmptyState message="No Q&A data available yet." />
        )}
      </TabsContent>

      <TabsContent value="suggestions" className="mt-4 space-y-3">
        {suggestions.length > 0 ? (
          (() => {
            const grouped = suggestions.reduce(
              (acc, s) => {
                const cat = s.category;
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(s);
                return acc;
              },
              {} as Record<CategoryType, typeof suggestions>
            );

            return Object.entries(grouped).map(([category, items]) => {
              const Icon = CATEGORY_ICONS[category as CategoryType] ?? Lightbulb;
              return (
                <Card key={category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon className="size-4 text-primary" />
                      <span className="capitalize">{category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {items.map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                        <p className="text-sm text-muted-foreground">{s.suggestion}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            });
          })()
        ) : (
          <EmptyState message="No suggestions available yet." />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
      {message}
    </div>
  );
}
