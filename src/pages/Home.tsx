import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shuffle, BarChart3, TrendingUp } from "lucide-react";
import { InfoCard } from "@/components/InfoCards";

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
            <InfoCard
              top={<Shuffle className="h-6 w-6 text-muted-foreground" />}
              title="Create Pairings"
              description="Create fair Swiss, Round Robin, and Single Elimination pairings each round while avoiding repeat matchups."
              className="h-full"
            />

            <InfoCard
              top={<BarChart3 className="h-6 w-6 text-muted-foreground" />}
              title="Generate Standings"
              description="Generate accurate standings for Swiss, Round Robin, and Single Elimination formats with proper tie resolution."
              className="h-full"
            />

            <InfoCard
              top={<TrendingUp className="h-6 w-6 text-muted-foreground" />}
              title="Track Skills"
              description="Track player skills and performance over time using ELO-based ratings."
              className="sm:col-span-2 sm:mx-auto sm:max-w-sm md:max-w-md lg:col-span-1 lg:max-w-none h-full"
            />
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
            <InfoCard
              top={<Badge variant="secondary">Step 1</Badge>}
              title="Create a tournament"
              description="Choose the format, rounds, and scoring rules."
              className="h-full"
            />

            <InfoCard
              top={<Badge variant="secondary">Step 2</Badge>}
              title="Add players & results"
              description="Register players and submit match results each round."
              className="h-full"
            />

            <InfoCard
              top={<Badge variant="secondary">Step 3</Badge>}
              title="Generate pairings & standings"
              description="RankEd updates pairings and standings instantly for you."
              className="sm:col-span-2 sm:mx-auto sm:max-w-sm md:max-w-md lg:col-span-1 lg:max-w-none h-full"
            />
          </div>
        </div>
      </section>
      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-4 text-center space-y-6">
          <p className="text-lg font-medium">
            Ready to run your next tournament?
          </p>

          <Button asChild>
            <Link to="/login">Get started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
