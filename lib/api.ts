import type { ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const ACCESS_KEY = "yt_access";
const REFRESH_KEY = "yt_refresh";
const AUTH_COOKIE = "yt_auth";

export const tokenStorage = {
  getAccess(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
  },
  getRefresh(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
  },
  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
  },
};

let isRefreshing = false;
let pendingRefresh: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) {
    tokenStorage.clear();
    throw new Error("No refresh token");
  }

  const res = await fetch(`${API_BASE}/api/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    tokenStorage.clear();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  const data = await res.json();
  // ROTATE_REFRESH_TOKENS=True — Django returns both tokens
  tokenStorage.set(data.access, data.refresh ?? refresh);
  return data.access;
}

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError
  ) {
    super(body.detail ?? `Request failed with status ${status}`);
    this.name = "ApiRequestError";
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const token = tokenStorage.getAccess();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && !isRetry) {
    if (!isRefreshing) {
      isRefreshing = true;
      pendingRefresh = refreshAccessToken().finally(() => {
        isRefreshing = false;
        pendingRefresh = null;
      });
    }

    const newToken = await pendingRefresh!;
    return apiFetch<T>(
      path,
      {
        ...options,
        headers: { ...headers, Authorization: `Bearer ${newToken}` },
      },
      true
    );
  }

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => ({ detail: "An unexpected error occurred." }));

  if (!res.ok) {
    throw new ApiRequestError(res.status, data as ApiError);
  }

  return data as T;
}

export const api = {
  get<T>(path: string): Promise<T> {
    return apiFetch<T>(path);
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return apiFetch<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },
  patch<T>(path: string, body: unknown): Promise<T> {
    return apiFetch<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  delete<T = void>(path: string): Promise<T> {
    return apiFetch<T>(path, { method: "DELETE" });
  },
};

/** Extract a human-readable message from an API error for display in toasts. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    const { body } = error;
    if (body.detail) return body.detail;
    const firstField = Object.keys(body).find((k) => Array.isArray(body[k]));
    if (firstField) {
      const msgs = body[firstField] as string[];
      return `${firstField}: ${msgs[0]}`;
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

/** Extract per-field errors from DRF validation errors for use with react-hook-form. */
export function getFieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiRequestError)) return {};
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(error.body)) {
    if (Array.isArray(val) && val.length > 0) {
      result[key] = val[0] as string;
    }
  }
  return result;
}
