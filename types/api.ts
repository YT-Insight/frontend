/**
 * Public type surface for the YT Insight API.
 * All types are derived from the auto-generated schema in `generated.ts`.
 * Run `npm run gen-types` to regenerate after backend changes.
 */

import type { components } from "./generated";

type S = components["schemas"];

// ── Enums ─────────────────────────────────────────────────────────────────────
export type AnalysisStatus    = S["AnalysisStatusEnum"];
export type SubscriptionPlan  = S["SubscriptionPlanEnum"];
export type SubscriptionStatus = S["SubscriptionStatusEnum"];
export type SentimentType     = S["SentimentEnum"];
export type CategoryType      = S["CategoryEnum"];

// ── Auth ──────────────────────────────────────────────────────────────────────
export type User         = S["UserProfile"];
export type TokenPair    = S["TokenObtainPair"];

// ── Subscription ──────────────────────────────────────────────────────────────
export type Subscription = S["Subscription"];
export type UsageLimit   = S["UsageLimit"];
export type PlanTier     = S["PlanTier"];

// ── Composite responses ───────────────────────────────────────────────────────
export type MeResponse   = S["MeResponse"];

// ── Analysis ──────────────────────────────────────────────────────────────────
export type Channel            = S["Channel"];
export type AnalysisListItem   = S["AnalysisList"];
export type AnalysisResultData = S["AnalysisResult"];
export type AnalysisTopic      = S["AnalysisTopic"];
export type AnalysisQuestion   = S["AnalysisQuestion"];
export type AnalysisSuggestion = S["AnalysisSuggestion"];
export type AnalysisDetail     = S["AnalysisDetail"];
export type AnalysisStatusPoll = S["AnalysisStatus"];

// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ── Error ─────────────────────────────────────────────────────────────────────
export type ApiFieldErrors = Record<string, string[]>;

export interface ApiError {
  detail?: string;
  [key: string]: unknown;
}
