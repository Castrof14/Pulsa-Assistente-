import type { ReactNode } from "react";
import { DemoBadge } from "./Badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  showDemoBadge = true,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  showDemoBadge?: boolean;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2.5">
          {eyebrow ? (
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
              {eyebrow}
            </span>
          ) : null}
          {showDemoBadge && <DemoBadge />}
        </div>
        <h1 className="text-[28px] font-semibold leading-[34px] tracking-[-0.04em] text-foreground sm:text-[32px] sm:leading-[40px]">
          {title}
        </h1>
        <p className="mt-1.5 text-[14px] leading-5 text-foreground-secondary">
          {description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
