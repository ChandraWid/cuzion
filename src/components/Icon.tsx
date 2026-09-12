interface IconProps {
  name: string;
  className?: string;
}

/**
 * Renders a Google Material Symbol by ligature name (PRD 4.3 — all app
 * iconography except the brand logo uses Material Symbols for consistency).
 * Example: <Icon name="dashboard" />
 */
export function Icon({ name, className = "" }: IconProps) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}
