import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Simple username rule: letters/numbers/underscore, 3-20 chars
function isValidUsername(username: string) {
  const u = username.trim();
  return u.length >= 3 && u.length <= 32 && /^[a-zA-Z0-9_]+$/.test(u);
}

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error) return err.message;
  return fallback;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const emailOk = isValidEmail(email);
  const usernameOk = isValidUsername(username);
  const isValidDisplayName =
    displayName.trim().length >= 2 && displayName.trim().length <= 64;
  const passwordOk = password.length >= 8;
  const confirmOk = confirmPassword === password && confirmPassword.length > 0;

  const canSubmit =
    emailOk &&
    usernameOk &&
    isValidDisplayName &&
    passwordOk &&
    confirmOk &&
    !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Form validation (keep it explicit and readable)
    if (!emailOk) return setError("Please enter a valid email.");
    if (!usernameOk)
      return setError(
        "Username must be 3–20 characters (letters, numbers, underscore)."
      );
    if (!isValidDisplayName)
      return setError("Display name must be at least 2 characters.");
    if (!passwordOk) return setError("Password must be at least 8 characters.");
    if (!confirmOk) return setError("Passwords do not match.");

    try {
      setSubmitting(true);

      /**
       * TODO: replace with your real auth + member creation flow.
       *
       * Suggested approach:
       * 1) Supabase auth sign up
       * 2) Call backend endpoint to create member row (or DB insert if you do it client-side safely)
       *
       * Example placeholders:
       * await supabase.auth.signUp({ email, password })
       * await api.post("/members/register", { email, username, display_name: displayName })
       */

      // TEMP: simulate success
      await new Promise((r) => setTimeout(r, 400));

      navigate("/app");
    } catch (err) {
      setError(
        getErrorMessage(err, "Account creation failed. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Set up your profile. You can join or create an organization next.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Couldn’t create account</AlertTitle>
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. vini_souza"
                maxLength={32}
              />
              <p className="text-xs text-muted-foreground">
                3–32 characters: letters, numbers, underscore.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                autoComplete="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Vini"
                maxLength={64}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {submitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-foreground underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
