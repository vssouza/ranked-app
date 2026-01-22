type AvatarProps = {
  name: string
  size?: number
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?"
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function stringToHue(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % 360
}

export function Avatar({ name, size = 64 }: AvatarProps) {
  const initials = getInitials(name)
  const hue = stringToHue(name)

  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: `hsl(${hue}, 70%, 45%)`,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  )
}
