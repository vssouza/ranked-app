import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Building2, ChevronsUpDown, Plus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from "@/auth/useAuth"
import { useOrg } from "@/org/OrgContext"

function titleCaseRole(role: string) {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

export function OrgSwitcher() {
  const navigate = useNavigate()
  const { me } = useAuth()
  const { activeOrg, setActiveOrg } = useOrg()

  const hasOrgs = !!me && me.memberships.length > 0

  const activeMembership = useMemo(() => {
    if (!me || !activeOrg) return null
    return me.memberships.find((m) => m.org.id === activeOrg.id) ?? null
  }, [me, activeOrg])

  if (!me) return null

  const buttonLabel = hasOrgs
    ? activeOrg?.name ?? "Select organisation"
    : "Create organisation"

  function goToOnboarding() {
    navigate("/onboarding")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 max-w-60">
          <Building2 className="h-4 w-4 shrink-0" />

          <span className="truncate">{buttonLabel}</span>

          {activeMembership && (
            <Badge variant="secondary" className="hidden sm:inline-flex capitalize">
              {titleCaseRole(activeMembership.role)}
            </Badge>
          )}

          <ChevronsUpDown className="h-4 w-4 opacity-60 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        {!hasOrgs ? (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organisations
            </DropdownMenuLabel>

            <DropdownMenuItem disabled className="text-muted-foreground">
              No organisations yet
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={goToOnboarding}>
              <Plus className="mr-2 h-4 w-4" />
              Create organisation
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organisations
            </DropdownMenuLabel>

            {me.memberships.map((m) => {
              const isActive = activeOrg?.id === m.org.id

              return (
                <DropdownMenuItem
                  key={m.org.id}
                  onClick={() => {
                    // Async-safe; we don't need to await for UI
                    void setActiveOrg({
                      id: m.org.id,
                      slug: m.org.slug,
                      name: m.org.name,
                      role: m.role,
                    })
                  }}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{m.org.name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {m.org.slug}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="capitalize">
                      {m.role}
                    </Badge>
                    {isActive && <Check className="h-4 w-4 opacity-70" />}
                  </div>
                </DropdownMenuItem>
              )
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={goToOnboarding}>
              <Plus className="mr-2 h-4 w-4" />
              Create organisation
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
