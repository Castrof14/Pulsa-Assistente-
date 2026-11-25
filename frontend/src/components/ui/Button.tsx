import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "pill";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "rounded-[6px] bg-primary text-on-primary hover:opacity-90",
  pill:
    "rounded-full bg-primary text-on-primary hover:opacity-90 px-4",
  secondary:
    "rounded-[6px] border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost:
    "rounded-[6px] text-foreground-secondary hover:bg-surface-muted hover:text-foreground",
};

export function buttonClasses(variant: ButtonVariant = "secondary", className = "") {
  return `inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[13px] font-medium leading-5 transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45 cursor-pointer ${VARIANT_CLASSES[variant]} ${className}`;
}

export function Button({
  variant = "secondary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
}) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}
