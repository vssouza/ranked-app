import * as React from "react"
import { apiGet } from "@/lib/api"

type Me = {
  user: {
    id: string
    email: string
    username: string
    displayName: string
  }
  isSuperAdmin: boolean
  memberships: unknown[]
  hasAddresses: boolean
}

export function useMe() {
  const [me, setMe] = React.useState<Me | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const data = await apiGet<Me>("/me")
        if (mounted) setMe(data)
      } catch {
        if (mounted) setMe(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return { me, loading, setMe }
}
