export type OrgRef = { id: string; slug: string; name: string }

export type Membership = {
  org: OrgRef
  role: "owner" | "admin" | "organiser" | "member"
}

export type MePayload = {
  user: {
    id: string
    email: string
    username: string
    displayName: string
  }
  isSuperAdmin: boolean
  memberships: Membership[]
  hasAddresses: boolean
}

export type AuthStatus = "loading" | "authed" | "guest"

export type AuthContextValue = {
  status: AuthStatus
  me: MePayload | null
  csrfToken: string | null

  boot: () => Promise<void>
  refreshSession: () => Promise<void>
  logout: () => Promise<void>

  /**
   * Use after /auth/register or /auth/exchange to hydrate state immediately
   * (no extra /me call needed).
   */
  setSessionFromAuthResponse: (data: MePayload & { csrfToken?: string }) => void
}
