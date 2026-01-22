import { getActiveOrgIdForApi } from "@/lib/orgBridge";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

type JsonObject = Record<string, unknown>;

function extractErrorMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;

  if (
    "message" in data &&
    typeof (data as { message?: unknown }).message === "string"
  ) {
    return (data as { message: string }).message;
  }

  if (
    "error" in data &&
    typeof (data as { error?: unknown }).error === "string"
  ) {
    return (data as { error: string }).error;
  }
  return null;
}

function buildHeaders(init?: RequestInit) {
  const h = new Headers(init?.headers);

  // Always allow callers to override if needed
  if (!h.has("content-type")) {
    // Only set for JSON posts; apiGet doesn't use this.
  }

  const orgId = getActiveOrgIdForApi();
  if (orgId && !h.has("X-Org-Id")) {
    h.set("X-Org-Id", orgId);
  }

  return h;
}

export async function apiPost<T>(
  path: string,
  body: JsonObject,
  init?: RequestInit
): Promise<T> {
  const headers = buildHeaders(init);
  headers.set("content-type", "application/json");

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(body),
    ...init,
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      extractErrorMessage(data) ?? "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = buildHeaders(init);

  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers,
    credentials: "include",
    ...init,
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      extractErrorMessage(data) ?? "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
}
