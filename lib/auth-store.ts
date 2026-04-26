import { create } from "zustand";
import type { User, Subscription, UsageLimit } from "@/types/api";

interface AuthStore {
  user: User | null;
  subscription: Subscription | null;
  usage: UsageLimit | null;
  isLoaded: boolean;
  setAuth(user: User, subscription: Subscription, usage: UsageLimit): void;
  updateUser(partial: Partial<User>): void;
  updateSubscription(sub: Subscription): void;
  updateUsage(usage: UsageLimit): void;
  clearAuth(): void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  subscription: null,
  usage: null,
  isLoaded: false,

  setAuth: (user, subscription, usage) =>
    set({ user, subscription, usage, isLoaded: true }),

  updateUser: (partial) =>
    set((s) => ({ user: s.user ? { ...s.user, ...partial } : null })),

  updateSubscription: (subscription) => set({ subscription }),

  updateUsage: (usage) => set({ usage }),

  clearAuth: () =>
    set({ user: null, subscription: null, usage: null, isLoaded: true }),
}));
