import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./useAuth" // adjust import if your hook lives elsewhere

export function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  console.log("RequireAuth:", { status, path: location.pathname })

  if (status === "loading") {
    return <div style={{ padding: 24 }}>Loading…</div>
  }

  if (status !== "authed") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
