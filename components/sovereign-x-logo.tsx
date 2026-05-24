import type { CSSProperties } from "react";

type SovereignXLogoProps = {
  size?: number;
  color?: string;
  label?: string;
  className?: string;
};

export function SovereignXLogo({
  size = 48,
  color = "#C8A96E",
  label = "Sovereign X Audits",
  className = ""
}: SovereignXLogoProps) {
  return (
    <span
      aria-label={label}
      className={`sovereign-x-logo ${className}`.trim()}
      role="img"
      style={{
        "--sx-logo-color": color,
        "--sx-logo-size": `${size}px`
      } as CSSProperties}
    />
  );
}
