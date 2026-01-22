import { createContext, useContext } from "react";

export type ActiveOrg = {
  id: string;
  slug: string;
  name: string;
  role: "owner" | "admin" | "organiser" | "member";
};

export type OrgContextValue = {
  activeOrg: ActiveOrg | null;
  /**
   * Sets active org optimistically and persists server-side.
   * Most callers can ignore the Promise (use `void setActiveOrg(...)`).
   */
  setActiveOrg: (org: ActiveOrg | null) => Promise<void>;
};

export const OrgContext = createContext<OrgContextValue | null>(null);

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrg must be used within OrgProvider");
  return ctx;
}
