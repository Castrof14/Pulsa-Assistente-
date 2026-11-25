import type { PostFormat, PostStatus } from "@/types/pulsa";
import { Film, GalleryHorizontalEnd, Image as ImageIcon, Sparkles } from "lucide-react";

const STATUS_CONFIG: Record<
  PostStatus,
  { label: string; dot: string; classes: string }
> = {
  agendado: {
    label: "Agendado",
    dot: "bg-[var(--link)]",
    classes:
      "bg-[var(--link-soft)] text-[var(--link-deep)] dark:text-[var(--link)] border border-[var(--link)]/20",
  },
  aprovacao: {
    label: "Aguardando aprovação",
    dot: "bg-[var(--warning)]",
    classes:
      "bg-[var(--warning-soft)] text-[var(--warning-deep)] border border-[var(--warning)]/25",
  },
  rascunho: {
    label: "Rascunho",
    dot: "bg-foreground-muted",
    classes:
      "bg-surface-muted text-foreground-secondary border border-border",
  },
  publicado: {
    label: "Publicado",
    dot: "bg-foreground",
    classes:
      "bg-surface text-foreground border border-border-strong",
  },
};

const FORMAT_CONFIG: Record<
  PostFormat,
  { label: string; icon: typeof ImageIcon }
> = {
  feed: { label: "Feed", icon: ImageIcon },
  carrossel: { label: "Carrossel", icon: GalleryHorizontalEnd },
  reels: { label: "Reels", icon: Film },
  stories: { label: "Stories", icon: Sparkles },
};

export function PostStatusBadge({ status }: { status: PostStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${cfg.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

export function PostFormatBadge({ format }: { format: PostFormat }) {
  const cfg = FORMAT_CONFIG[format];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-surface px-2 py-0.5 font-mono text-[11px] font-medium text-foreground-secondary whitespace-nowrap">
      <Icon className="h-3 w-3 text-foreground-muted" aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

export function DemoBadge({ label = "DADOS DEMONSTRATIVOS" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-surface px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.02em] text-foreground-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--link)]" aria-hidden="true" />
      {label}
    </span>
  );
}
