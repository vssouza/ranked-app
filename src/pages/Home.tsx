import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, BarChart3, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <section className="py-16" id="hero">
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
      <section className="py-16" id="features">
        <div className="mx-auto max-w-6xl px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
            <p className="text-muted-foreground">
              Everything you need to run tournaments smoothly.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <Card className="h-full">
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

            <Card className="h-full">
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

            <Card className="sm:col-span-2 sm:mx-auto sm:max-w-sm md:max-w-md lg:col-span-1 lg:max-w-none h-full">
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
      <section className="py-16" id="how-it-works">
        <div className="mx-auto max-w-6xl px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              How it works
            </h2>
            <p className="text-muted-foreground">
              From setup to standings in minutes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="secondary">Step 1</Badge>
                  <CardTitle>Create a tournament</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Choose the format, rounds, and scoring rules.
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="secondary">Step 2</Badge>
                  <CardTitle>Add players & results</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Register players and submit match results each round.
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 sm:mx-auto sm:max-w-sm md:max-w-md lg:col-span-1 lg:max-w-none h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <Badge variant="secondary">Step 3</Badge>
                  <CardTitle>Generate pairings & standings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                RankEd updates pairings and standings instantly for you.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
