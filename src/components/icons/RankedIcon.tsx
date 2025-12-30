import * as React from "react";

type RankedIconProps = React.SVGProps<SVGSVGElement>;

export function RankEdIcon(props: RankedIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Background follows theme */}
      <rect
        width="100"
        height="100"
        rx="20"
        className="fill-background"
      />

      {/* Ranked rows (foreground hierarchy) */}
      <rect
        x="24"
        y="28"
        width="52"
        height="10"
        rx="5"
        className="fill-foreground"
      />
      <rect
        x="24"
        y="45"
        width="44"
        height="10"
        rx="5"
        className="fill-foreground/80"
      />
      <rect
        x="24"
        y="62"
        width="36"
        height="10"
        rx="5"
        className="fill-foreground/60"
      />
    </svg>
  );
}
