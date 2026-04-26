"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";
import { tokenStorage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { MeResponse } from "@/types/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const token = tokenStorage.getAccess();
    if (!token) {
      clearAuth();
      return;
    }

    api
      .get<MeResponse>("/api/auth/me/")
      .then((data) => setAuth(data.user, data.subscription, data.usage))
      .catch(() => {
        tokenStorage.clear();
        clearAuth();
      });
  }, [setAuth, clearAuth]);

  return <>{children}</>;
}
