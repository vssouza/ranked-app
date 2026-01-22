import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { Membership } from "./types"

type GuardOptions = {
  /**
   * Where to send guests. Defaults to /login.
   * We'll include ?next=<currentPath> so you can redirect back after login.
   */
  loginPath?: string

  /**
   * If set, requires the user to have at least one membership with one of these roles.
   * Super admins always pass.
   */
  requireOrgRole?: Array<Membership["role"]>

  /**
   * If set, require the user to have ANY membership.
   */
  requireMembership?: boolean
}

function hasAnyRole(
  memberships: Membership[] | undefined,
  roles: Array<Membership["role"]>
) {
  if (!memberships || memberships.length === 0) return false
  return memberships.some((m) => roles.includes(m.role))
}

export function useAuthGuard(options: GuardOptions = {}) {
  const { status, me } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const loginPath = options.loginPath ?? "/login"
  const next = `${location.pathname}${location.search}${location.hash}`

  const check = useCallback((): {
    ok: boolean
    reason?: "loading" | "guest" | "forbidden"
  } => {
    if (status === "loading") return { ok: false, reason: "loading" }
    if (status !== "authed" || !me) return { ok: false, reason: "guest" }

    // Super admin bypass
    if (me.isSuperAdmin) return { ok: true }

    if (options.requireMembership) {
      if (!me.memberships || me.memberships.length === 0) {
        return { ok: false, reason: "forbidden" }
      }
    }

    if (options.requireOrgRole && options.requireOrgRole.length > 0) {
      if (!hasAnyRole(me.memberships, options.requireOrgRole)) {
        return { ok: false, reason: "forbidden" }
      }
    }

    return { ok: true }
  }, [status, me, options.requireMembership, options.requireOrgRole])

  const ensure = useCallback(
    (onAuthed?: () => void) => {
      const res = check()

      if (res.ok) {
        onAuthed?.()
        return true
      }

      if (res.reason === "loading") {
        // Don’t redirect while booting; just block the action.
        return false
      }

      if (res.reason === "guest") {
        navigate(`${loginPath}?next=${encodeURIComponent(next)}`, { replace: true })
        return false
      }

      // forbidden (authed but lacks role)
      // For now we just block; you can toast here if you want.
      return false
    },
    [check, navigate, loginPath, next]
  )

  return {
    status,
    me,
    can: check,     // use to disable buttons or show tooltips
    ensure,         // call in click handlers
  }
}
