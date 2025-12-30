import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left side: branding (clickable) */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <span className="font-semibold">rankEd</span>
          <span className="text-sm text-muted-foreground">
            rankings playground
          </span>
        </Link>

        {/* Right side: actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/login" aria-label="Login">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
