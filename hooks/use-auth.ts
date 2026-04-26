"use client";

import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, subscription, usage, isLoaded, setAuth } = useAuthStore();

  const logout = async () => {
    await signOut();
    useAuthStore.getState().clearAuth();
    router.push("/login");
  };

  const updateProfile = useMutation({
    mutationFn: async (data: { first_name: string; last_name: string }) => {
      return api.patch<{ first_name: string; last_name: string }>("/api/auth/me/", data);
    },
    onSuccess: (updated) => {
      useAuthStore.getState().updateUser(updated);
      toast.success("Profile updated.");
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
    logout,
    updateProfile,
  };
}
