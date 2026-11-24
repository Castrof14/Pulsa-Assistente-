import type { ReactNode } from "react";
import { DemoBadge } from "./Badge";

export function PageHeader({
  title,
  description,
  actions,
  showDemoBadge = true,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  showDemoBadge?: boolean;
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">
            {title}
          </h1>
          {showDemoBadge && <DemoBadge />}
        </div>
        <p className="mt-1 text-[13px] text-foreground-secondary">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
