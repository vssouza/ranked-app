import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Loader2} from "lucide-react";

export default function AppBootstrap() {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function bootstrap() {
      /**
       * TODO (next steps):
       * 1. Fetch identity (/me)
       * 2. Determine:
       *    - isSuperAdmin
       *    - org memberships
       *    - last active org
       * 3. Redirect accordingly
       *
       * Examples:
       * - no orgs → /onboarding
       * - one org → /org/:slug
       * - many orgs → /dashboard
       * - super admin → /admin
       */
      navigate("/dashboard", {replace: true});
    }

    bootstrap();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Setting things up…</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading your account and organizations.</span>
        </CardContent>
      </Card>
    </div>
  );
}
