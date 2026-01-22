import { Navigate } from "react-router-dom"
import { useAuth } from "@/auth/useAuth"
import HomePage from "@/pages/Home"

export default function HomeGate() {
  const { status } = useAuth()

  if (status === "loading") return null
  if (status === "authed") return <Navigate to="/dashboard" replace />
  return <HomePage />
}
