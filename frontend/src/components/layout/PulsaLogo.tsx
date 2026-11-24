export function PulsaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-[0_2px_8px_rgba(224,62,82,0.28)]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 12.5H7.2L9.6 6.5L13.4 17.5L16.2 10.5L18.1 12.5H21"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            Pulsa
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground-muted">
            Marketing IA
          </span>
        </div>
      )}
    </div>
  );
}
