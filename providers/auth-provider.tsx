"use client";

import { useEffect } from "react";
import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { api, initApiAuth } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { MeResponse } from "@/types/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useClerkAuth();
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    initApiAuth(() => getToken({ template: "default" }));
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      clearAuth();
      return;
    }

    api
      .get<MeResponse>("/api/auth/me/")
      .then((data) => setAuth(data.user, data.subscription, data.usage))
      .catch(() => clearAuth());
  }, [isSignedIn, isLoaded, setAuth, clearAuth]);

  return <>{children}</>;
}
