import type { PostFormat, PostStatus } from "@/types/pulsa";
import { Film, GalleryHorizontalEnd, Image as ImageIcon, Sparkles } from "lucide-react";

const STATUS_CONFIG: Record<
  PostStatus,
  { label: string; dot: string; classes: string }
> = {
  agendado: {
    label: "Agendado",
    dot: "bg-emerald-500",
    classes:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  },
  aprovacao: {
    label: "Aguardando aprovação",
    dot: "bg-amber-500",
    classes:
      "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
  },
  rascunho: {
    label: "Rascunho",
    dot: "bg-zinc-400",
    classes:
      "bg-zinc-100 text-zinc-700 ring-1 ring-inset ring-zinc-500/15 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-600/30",
  },
  publicado: {
    label: "Publicado",
    dot: "bg-sky-500",
    classes:
      "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/15 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
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
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-foreground-secondary whitespace-nowrap">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

export function DemoBadge({ label = "Dados demonstrativos" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-foreground-secondary">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
      {label}
    </span>
  );
}
