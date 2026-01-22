import { useNavigate } from "react-router-dom"
import { Building2, ChevronsUpDown, Plus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from "@/auth/useAuth"

export function OrgSwitcher() {
  const navigate = useNavigate()
  const { me } = useAuth()

  const memberships = me?.memberships ?? []
  const hasOrgs = memberships.length > 0

  // Temporary selection logic (replace later with org context)
  const selectedOrgId = memberships[0]?.org.id
  const selectedOrgName =
    memberships.find((m) => m.org.id === selectedOrgId)?.org.name ??
    "Select organization"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 max-w-60 justify-between"
          aria-label="Select organization"
        >
          {/* Left icon */}
          <Building2 className="h-4 w-4 shrink-0" />

          {/* Org name */}
          <span className="truncate flex-1 text-left">
            {selectedOrgName}
          </span>

          {/* Right chevron */}
          <ChevronsUpDown className="h-4 w-4 opacity-60 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-60">
        {hasOrgs ? (
          memberships.map((m) => (
            <DropdownMenuItem
              key={m.org.id}
              onClick={() => {
                // TODO: persist selected org
                console.log("select org", m.org.id)
              }}
              className="flex items-center gap-2"
            >
              <span className="flex-1 truncate">{m.org.name}</span>
              {m.org.id === selectedOrgId && (
                <Check className="h-4 w-4 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            No organizations yet
          </div>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate("/onboarding")}
          className="flex items-center gap-2 font-medium"
        >
          <Plus className="h-4 w-4" />
          Create organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
