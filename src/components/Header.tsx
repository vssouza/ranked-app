import {Link} from "react-router-dom";
import {Home, LogIn} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ModeToggle";
import {RankEdIcon} from "@/components/icons/RankEdIcon";
import {OrgSwitcher} from "./OrgSwitcher";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Branding */}
        <Link
          to="/"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <RankEdIcon className="h-6 w-6" />
          <span className="font-semibold">RankEd</span>
        </Link>

        {/* Organization Switcher */}
        <OrgSwitcher />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/login" aria-label="Login">
              <LogIn className="h-5 w-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
