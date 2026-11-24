import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "brand";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-surface hover:opacity-90 shadow-[0_1px_2px_rgba(16,24,40,0.08)]",
  brand:
    "bg-brand text-brand-foreground hover:opacity-92 shadow-[0_1px_2px_rgba(224,62,82,0.22)]",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-foreground-secondary hover:bg-surface-muted hover:text-foreground",
};

export function buttonClasses(variant: ButtonVariant = "secondary", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${VARIANT_CLASSES[variant]} ${className}`;
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
