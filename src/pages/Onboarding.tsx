import {Link} from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to RankEd</CardTitle>
          <CardDescription>
            Create an organization to start running tournaments.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button className="w-full" disabled>
            Create organization (coming soon)
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link to="/">Back to home</Link>
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Got an invite? Invite links are coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
