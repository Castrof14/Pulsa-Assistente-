export function PulsaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary text-on-primary">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 12.5H7.2L9.6 6.5L13.4 17.5L16.2 10.5L18.1 12.5H21"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {!compact && (
        <span className="text-[15px] font-semibold tracking-[-0.03em] text-foreground">
          Pulsa
        </span>
      )}
    </div>
  );
}
