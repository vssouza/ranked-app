import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          A summary of your organizations, tournaments, and recent activity.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your organizations</CardTitle>
            <CardDescription>Organizations you’re a member of.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Organization list coming soon.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent tournaments</CardTitle>
            <CardDescription>Across all organizations.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Tournament activity coming soon.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>
              Common things you might want to do.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" disabled>
              Create organization
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Create tournament
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
