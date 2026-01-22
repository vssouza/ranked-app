const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""

export type ApiError = { error?: string; message?: string } | null

export type ApiOk<T> = { ok: true; data: T }
export type ApiErr = { ok: false; status: number; error: ApiError }

function parseApiError(data: unknown): ApiError {
  if (!data || typeof data !== "object") return null
  const o = data as Record<string, unknown>
  return {
    error: typeof o.error === "string" ? o.error : undefined,
    message: typeof o.message === "string" ? o.message : undefined,
  }
}

export async function api<T>(
  path: string,
  init: RequestInit = {}
): Promise<ApiOk<T> | ApiErr> {
  const url = `${API_BASE}${path}`

  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    ...init,
    headers: {
      ...(init.headers ?? {}),
      // Only set content-type if caller provided a body (prevents odd GET behavior)
      ...(init.body ? { "content-type": "application/json" } : {}),
    },
  })

  const data: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    return { ok: false, status: res.status, error: parseApiError(data) }
  }

  return { ok: true, data: data as T }
}
