const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""

type JsonObject = Record<string, unknown>

function extractErrorMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null

  if ("message" in data && typeof (data as { message?: unknown }).message === "string") {
    return (data as { message: string }).message
  }

  if ("error" in data && typeof (data as { error?: unknown }).error === "string") {
    return (data as { error: string }).error
  }
  return null
}

export async function apiPost<T>(
  path: string,
  body: JsonObject,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include", // IMPORTANT: cookie auth
    body: JSON.stringify(body),
    ...init,
  })

  const data: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const message =
      extractErrorMessage(data) ?? "Request failed. Please try again."
    throw new Error(message)
  }

  return data as T
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  })

  const data: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const message =
      extractErrorMessage(data) ?? "Request failed. Please try again."
    throw new Error(message)
  }

  return data as T
}
