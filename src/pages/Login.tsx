import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { apiPost } from "@/lib/api"
import { useAuth } from "@/auth/useAuth"
import type { MePayload } from "@/auth/types"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// Backend returns: { ...payload, ok: true, csrfToken }
type LoginResponse = MePayload & { ok: true; csrfToken: string }

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setSessionFromAuthResponse, status } = useAuth()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (status === "authed") {
      navigate("/app", { replace: true })
    }
  }, [status, navigate])

  const emailOk = isValidEmail(email)
  const passwordOk = password.trim().length > 0
  const canSubmit = emailOk && passwordOk && !submitting

  function getNextPath() {
    const params = new URLSearchParams(location.search)
    const next = params.get("next")
    if (next && next.startsWith("/")) return next
    return "/app"
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!emailOk) return setError("Please enter a valid email.")
    if (!passwordOk) return setError("Please enter your password.")

    try {
      setSubmitting(true)

      const data = await apiPost<LoginResponse>("/auth/login", { email, password })

      // Hydrate auth immediately (no extra /me call)
      setSessionFromAuthResponse(data)

      // Return to where the user wanted to go
      navigate(getNextPath(), { replace: true })
    } catch (err) {
      // apiPost throws Error(message). Backend includes message for INVALID_CREDENTIALS.
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your email and password to access your organizations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Couldn’t sign in</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button asChild variant="link" className="h-auto p-0 text-sm">
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-foreground underline underline-offset-4"
            >
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
