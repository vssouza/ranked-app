import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OrgContext, type ActiveOrg } from "./OrgContext";
import { useAuth } from "@/auth/useAuth";
import { setActiveOrgIdForApi } from "@/lib/orgBridge";
import { apiPost } from "@/lib/api";

function storageKeyForUser(userId: string) {
  return `ranked.activeOrgId.${userId}`;
}

function readStoredOrgId(userId: string): string | null {
  try {
    return localStorage.getItem(storageKeyForUser(userId));
  } catch {
    return null;
  }
}

function writeStoredOrgId(userId: string, orgId: string | null) {
  try {
    const key = storageKeyForUser(userId);
    if (!orgId) localStorage.removeItem(key);
    else localStorage.setItem(key, orgId);
  } catch {
    // ignore storage failures
  }
}

type PersistBody = { organisationId: string | null };
type PersistResp = { ok: true; activeOrganisationId?: string | null };

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const { me } = useAuth();
  const [activeOrg, setActiveOrgState] = useState<ActiveOrg | null>(null);

  // Refs to avoid capturing state in callbacks (React Compiler friendly)
  const activeOrgRef = useRef<ActiveOrg | null>(null);
  const userIdRef = useRef<string | null>(null);

  // Keep refs in sync
  useEffect(() => {
    activeOrgRef.current = activeOrg;
  }, [activeOrg]);

  useEffect(() => {
    userIdRef.current = me?.user.id ?? null;
  }, [me?.user.id]);

  // Prevent overlapping server writes; only latest "wins"
  const persistSeq = useRef(0);

  const persistActiveOrgToServer = useCallback(async (orgId: string | null) => {
    const userId = userIdRef.current;
    if (!userId) return;

    const seq = ++persistSeq.current;

    const r = await apiPost<PersistResp>("/me/active-organisation", {
      organisationId: orgId,
    } satisfies PersistBody);

    // ignore stale responses
    if (seq !== persistSeq.current) return;

    const persisted =
      typeof r.activeOrganisationId === "string" ||
      r.activeOrganisationId === null
        ? r.activeOrganisationId
        : orgId;

    writeStoredOrgId(userId, persisted ?? null);
  }, []);

  const setActiveOrg = useCallback(
    async (org: ActiveOrg | null) => {
      const prev = activeOrgRef.current;
      const userId = userIdRef.current;

      // Optimistic UI + API header
      setActiveOrgState(org);
      setActiveOrgIdForApi(org?.id ?? null);

      if (userId) {
        writeStoredOrgId(userId, org?.id ?? null);
      }

      try {
        await persistActiveOrgToServer(org?.id ?? null);
      } catch {
        // Revert if server rejects (e.g. 403)
        setActiveOrgState(prev ?? null);
        setActiveOrgIdForApi(prev?.id ?? null);

        if (userId) {
          writeStoredOrgId(userId, prev?.id ?? null);
        }
      }
    },
    [persistActiveOrgToServer]
  );

  useEffect(() => {
    let alive = true;

    queueMicrotask(() => {
      if (!alive) return;

      // Logged out → clear
      if (!me) {
        setActiveOrgState(null);
        setActiveOrgIdForApi(null);
        return;
      }

      const userId = me.user.id;

      // No orgs → clear
      if (me.memberships.length === 0) {
        writeStoredOrgId(userId, null);
        setActiveOrgState(null);
        setActiveOrgIdForApi(null);
        // Optional: also persist null server-side if you support it
        return;
      }

      const current = activeOrgRef.current;

      // Keep current if still valid
      if (current && me.memberships.some((m) => m.org.id === current.id)) {
        setActiveOrgIdForApi(current.id); // ensure bridge stays correct
        return;
      }

      // 1) Prefer server-persisted active org id
      const serverId = me.activeOrganisationId ?? null;
      if (serverId) {
        const match = me.memberships.find((m) => m.org.id === serverId);
        if (match) {
          const next: ActiveOrg = {
            id: match.org.id,
            slug: match.org.slug,
            name: match.org.name,
            role: match.role,
          };
          setActiveOrgState(next);
          setActiveOrgIdForApi(next.id);
          writeStoredOrgId(userId, next.id);
          return;
        }
      }

      // 2) Fallback: localStorage
      const storedId = readStoredOrgId(userId);
      if (storedId) {
        const match = me.memberships.find((m) => m.org.id === storedId);
        if (match) {
          const next: ActiveOrg = {
            id: match.org.id,
            slug: match.org.slug,
            name: match.org.name,
            role: match.role,
          };
          setActiveOrgState(next);
          setActiveOrgIdForApi(next.id);
          // Persist to server so new devices restore
          void persistActiveOrgToServer(next.id);
          return;
        }
      }

      // 3) Fallback: first org
      const first = me.memberships[0];
      const next: ActiveOrg = {
        id: first.org.id,
        slug: first.org.slug,
        name: first.org.name,
        role: first.role,
      };
      setActiveOrgState(next);
      setActiveOrgIdForApi(next.id);
      writeStoredOrgId(userId, next.id);
      void persistActiveOrgToServer(next.id);
    });

    return () => {
      alive = false;
    };
  }, [me, persistActiveOrgToServer]);

  const value = useMemo(
    () => ({
      activeOrg,
      setActiveOrg,
    }),
    [activeOrg, setActiveOrg]
  );

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}
