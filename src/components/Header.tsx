import { Link, useNavigate } from "react-router-dom";
import { Home, LogIn, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { RankEdIcon } from "@/components/icons/RankEdIcon";
import { OrgSwitcher } from "./OrgSwitcher";
import { useMe } from "@/lib/useMe";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiPost } from "@/lib/api";

export function Header() {
  const { me, loading, setMe } = useMe();
  const navigate = useNavigate();

  function truncate(value: string, max = 15) {
    if (value.length <= max) return value;
    return value.slice(0, max - 1) + "…";
  }

  async function onLogout() {
    try {
      await apiPost("/auth/logout", {});
    } finally {
      setMe(null);
      navigate("/login");
    }
  }

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

          {loading ? null : me ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {/* User identity */}
                <div className="px-3 py-2 text-center">
                  <div
                    className="mx-auto max-w-[15ch] truncate text-sm font-medium leading-none"
                    title={me.user.displayName || me.user.username}
                  >
                    {truncate(me.user.displayName || me.user.username, 15)}
                  </div>

                  {me.user.username && (
                    <div
                      className="mx-auto mt-0.5 max-w-[15ch] truncate text-xs text-muted-foreground"
                      title={`@${me.user.username}`}
                    >
                      @{truncate(me.user.username, 15)}
                    </div>
                  )}
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login" aria-label="Login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
