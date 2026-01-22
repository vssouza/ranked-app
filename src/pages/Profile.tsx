import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/auth/useAuth"
import { useOrg } from "@/org/OrgContext"
import { Avatar } from "@/components/Avatar"

export default function Profile() {
  const navigate = useNavigate()
  const { me, logout } = useAuth()
  const { activeOrg } = useOrg()

  // RequireAuth guarantees this, but keeps TS + runtime safe
  if (!me) return null

  const displayName =
    me.user.displayName || me.user.username || me.user.email

  async function onLogout() {
    await logout()
    navigate("/login", { replace: true })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      {/* Header / Identity */}
      <header className="flex items-center gap-4">
        <Avatar name={displayName} size={72} />

        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight truncate">
            {displayName}
          </h1>
          <p className="text-muted-foreground truncate">
            {me.user.email}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge>User</Badge>
            {me.isSuperAdmin && (
              <Badge variant="destructive">Super admin</Badge>
            )}
            {activeOrg && (
              <Badge variant="outline">
                Active org: {activeOrg.name}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-muted-foreground">Display name</div>
              <div className="font-medium">
                {me.user.displayName}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground">Username</div>
              <div className="font-medium">
                {me.user.username || "—"}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground">Email</div>
              <div className="font-medium">
                {me.user.email}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground">Account type</div>
              <div className="font-medium">
                {me.isSuperAdmin ? "Super admin" : "User"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizations */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          {me.memberships.length === 0 ? (
            <p className="text-muted-foreground">
              You’re not a member of any organizations yet.
            </p>
          ) : (
            me.memberships.map((m) => {
              const isActive = activeOrg?.id === m.org.id

              return (
                <div
                  key={m.org.id}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                    isActive ? "bg-muted" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate flex items-center gap-2">
                      {m.org.name}
                      {isActive && (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {m.org.slug}
                    </div>
                  </div>

                  <Badge variant="outline" className="capitalize">
                    {m.role}
                  </Badge>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="flex flex-col gap-3 pt-6">
          <Separator />

          <Button
            variant="destructive"
            className="self-start"
            onClick={onLogout}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
