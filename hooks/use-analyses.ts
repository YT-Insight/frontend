"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";
import type {
  PaginatedResponse,
  AnalysisListItem,
  AnalysisDetail,
  AnalysisStatusPoll,
} from "@/types/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAnalysesList(page = 1) {
  return useQuery({
    queryKey: ["analyses", page],
    queryFn: () =>
      api.get<PaginatedResponse<AnalysisListItem>>(
        `/api/analyses/?page=${page}`
      ),
  });
}

export function useAnalysisDetail(id: string) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: () => api.get<AnalysisDetail>(`/api/analyses/${id}/`),
    staleTime: 0,
  });
}

export function useAnalysisStatus(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["analysis-status", id],
    queryFn: () => api.get<AnalysisStatusPoll>(`/api/analyses/${id}/status/`),
    enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "failed") return false;
      return 3_000;
    },
    staleTime: 0,
  });
}

export function useCreateAnalysis() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channel_url: string) =>
      api.post<AnalysisStatusPoll>("/api/analyses/create/", { channel_url }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
      router.push(`/analyses/${data.id}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
