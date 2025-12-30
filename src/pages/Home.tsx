import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, BarChart3, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <section className="py-16">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to RankEd!
          </h1>

          <p className="text-lg text-muted-foreground">
            Rankings and pairings for TCG and tabletop tournaments.
          </p>

          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link to="/login">Get started</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/demo">View demo</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
            <p className="text-muted-foreground">
              Everything you need to run tournaments smoothly.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Card>
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-5">
                  <Shuffle className="h-6 w-6 text-muted-foreground" />
                  <CardTitle>Create Pairings</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Generate round pairings quickly and keep the event moving.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-5">
                  <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  <CardTitle>Generate Standings</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Generate round pairings quickly and keep the event moving.
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 sm:mx-auto sm:max-w-sm md:max-w-md lg:col-span-1 lg:max-w-none">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-5">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                  <CardTitle>Track Skills</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Generate round pairings quickly and keep the event moving.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
