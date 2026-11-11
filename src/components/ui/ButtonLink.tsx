import { ChevronRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { business, telHref } from "@/config/site";
import { cx } from "@/lib/cx";
import { SmartLink } from "./SmartLink";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost-light";
type ButtonSize = "sm" | "md" | "lg";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cx("btn", `btn-${variant}`, `btn-${size}`, className)}
      {...rest}
    >
      {icon}
      {children}
    </SmartLink>
  );
}

/** Primary call-to-call button. Shows the number so it works on desktop too. */
export function CallButton({
  variant = "primary",
  size = "md",
  className,
  label,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}) {
  return (
    <ButtonLink
      href={telHref}
      variant={variant}
      size={size}
      className={className}
      icon={<Phone aria-hidden="true" />}
    >
      {label ?? `Call ${business.phone}`}
    </ButtonLink>
  );
}

/** Inline "Learn more ›" style link. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <SmartLink href={href} className={cx("link", className)}>
      {children}
      <ChevronRight aria-hidden="true" />
    </SmartLink>
  );
}
