"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api, tokenStorage, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { MeResponse, TokenPair } from "@/types/api";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const { user, subscription, usage, isLoaded, setAuth, clearAuth } = useAuthStore();

  const login = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const tokens = await api.post<TokenPair>("/api/auth/token/", credentials);
      tokenStorage.set(tokens.access, tokens.refresh);
      const me = await api.get<MeResponse>("/api/auth/me/");
      return me;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.subscription, data.usage);
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(next ?? "/dashboard");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const register = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      first_name?: string;
      last_name?: string;
    }) => {
      await api.post("/api/auth/register/", data);
    },
    onSuccess: () => {
      toast.success("Account created! Please sign in.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const logout = async () => {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      try {
        await api.post("/api/auth/logout/", { refresh });
      } catch {
        // Always clear local state even if server-side blacklisting fails
      }
    }
    tokenStorage.clear();
    clearAuth();
    router.push("/login");
  };

  const updateProfile = useMutation({
    mutationFn: async (data: { first_name: string; last_name: string }) => {
      return api.patch<MeResponse["user"]>("/api/auth/me/", data);
    },
    onSuccess: (updated) => {
      useAuthStore.getState().updateUser(updated);
      toast.success("Profile updated.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const changePassword = useMutation({
    mutationFn: async (data: { old_password: string; new_password: string }) => {
      await api.post("/api/auth/change-password/", data);
    },
    onSuccess: async () => {
      toast.success("Password changed. Please sign in again.");
      await logout();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return {
    user,
    subscription,
    usage,
    isLoaded,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };
}
