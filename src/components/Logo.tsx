import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * The Cuzion "C" mark (PRD 4.2). Used wherever the brand logo icon appears —
 * sidebar header, login screen, chatbot avatar — instead of a placeholder
 * letterform or Material Symbol.
 */
export function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Cuzion"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      priority
    />
  );
}
