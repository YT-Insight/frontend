import type { ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

let _getToken: (() => Promise<string | null>) | null = null;

export function initApiAuth(getter: () => Promise<string | null>) {
  _getToken = getter;
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

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = _getToken ? await _getToken() : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

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
