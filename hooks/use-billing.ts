"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PlanTier } from "@/types/api";

export function usePlans() {
  return useQuery<PlanTier[]>({
    queryKey: ["plans"],
    queryFn: () => api.get<PlanTier[]>("/api/subscriptions/plans/"),
    staleTime: 1000 * 60 * 60, // plan data rarely changes — cache for 1 hour
  });
}
