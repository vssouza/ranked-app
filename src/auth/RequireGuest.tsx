import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export function RequireGuest() {
  const { status } = useAuth();

  if (status === "loading") {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  if (status === "authed") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
