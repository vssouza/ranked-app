import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to RankEd</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Your ranking UI will live here.
        </CardContent>
      </Card>
    </main>
  );
}
