import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { api } from "./authApi";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue, MePayload } from "./types";

function isValidMePayload(x: unknown): x is MePayload {
  if (typeof x !== "object" || x === null) return false;

  const o = x as Partial<MePayload>;

  return (
    typeof o.user === "object" &&
    o.user !== null &&
    typeof o.user.id === "string" &&
    typeof o.user.email === "string" &&
    typeof o.user.username === "string" &&
    typeof o.user.displayName === "string" &&
    typeof o.isSuperAdmin === "boolean" &&
    Array.isArray(o.memberships) &&
    typeof o.hasAddresses === "boolean"
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const [me, setMe] = useState<MePayload | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Prevent double-boot in dev/StrictMode or re-entrant calls
  const bootInFlight = useRef<Promise<void> | null>(null);

  const setSessionFromAuthResponse = useCallback(
    (data: MePayload & { csrfToken?: string }) => {
      // Be strict: only accept session hydration if payload looks valid
      if (!isValidMePayload(data)) {
        setMe(null);
        setCsrfToken(null);
        setStatus("guest");
        return;
      }

      setMe({
        user: data.user,
        isSuperAdmin: data.isSuperAdmin,
        memberships: data.memberships,
        hasAddresses: data.hasAddresses,
      });
      setCsrfToken(data.csrfToken ?? null);
      setStatus("authed");
    },
    []
  );

  const boot = useCallback(async () => {
    if (bootInFlight.current) return bootInFlight.current;

    const p = (async () => {
      setStatus("loading");

      const r = await api<MePayload>("/me");

      if (r.ok && isValidMePayload(r.data)) {
        setMe(r.data);
        setStatus("authed");
        return;
      }

      // r is the error branch here
      if (!r.ok && r.status === 401) {
        setMe(null);
        setCsrfToken(null);
        setStatus("guest");
        return;
      }

      setMe(null);
      setCsrfToken(null);
      setStatus("guest");
    })().finally(() => {
      bootInFlight.current = null;
    });

    bootInFlight.current = p;
    return p;
  }, []);

  const refreshSession = useCallback(async () => {
    const r = await api<MePayload & { csrfToken: string }>(
      "/auth/refresh-session"
    );

    if (r.ok && isValidMePayload(r.data)) {
      setSessionFromAuthResponse(r.data);
      return;
    }

    if (!r.ok && r.status === 401) {
      setMe(null);
      setCsrfToken(null);
      setStatus("guest");
      return;
    }

    setMe(null);
    setCsrfToken(null);
    setStatus("guest");
  }, [setSessionFromAuthResponse]);

  const logout = useCallback(async () => {
    try {
      await api<{ ok: true }>("/auth/logout", {
        method: "POST",
        headers: csrfToken ? { "X-CSRF-Token": csrfToken } : undefined,
      });
    } finally {
      // Always clear client state even if request fails
      setMe(null);
      setCsrfToken(null);
      setStatus("guest");
    }
  }, [csrfToken]);

  useEffect(() => {
    let alive = true;

    queueMicrotask(() => {
      if (!alive) return;
      void boot();
    });

    return () => {
      alive = false;
    };
  }, [boot]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      status,
      me,
      csrfToken,
      boot,
      refreshSession,
      logout,
      setSessionFromAuthResponse,
    };
  }, [
    status,
    me,
    csrfToken,
    boot,
    refreshSession,
    logout,
    setSessionFromAuthResponse,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
