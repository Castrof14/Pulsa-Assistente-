"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, PenLine } from "lucide-react";
import type { ContentPost, PostStatus } from "@/types/pulsa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PostFormatBadge, PostStatusBadge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const STATUS_DOT: Record<PostStatus, string> = {
  agendado: "bg-emerald-500",
  aprovacao: "bg-amber-500",
  rascunho: "bg-zinc-400",
  publicado: "bg-sky-500",
};

const FILTERS: { id: "todos" | PostStatus; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "agendado", label: "Agendados" },
  { id: "aprovacao", label: "Aguardando aprovação" },
  { id: "rascunho", label: "Rascunhos" },
  { id: "publicado", label: "Publicados" },
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDatePt(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function CalendarBoard({ posts }: { posts: ContentPost[] }) {
  // Mês inicial fixo (Novembro 2026) para compatibilidade com cacheComponents (SSR determinístico)
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10); // 0-indexed: 10 = Novembro
  const [statusFilter, setStatusFilter] = useState<"todos" | PostStatus>("todos");
  const [selectedPost, setSelectedPost] = useState<ContentPost | null>(
    posts[0] ?? null,
  );

  const filteredPosts = useMemo(() => {
    if (statusFilter === "todos") return posts;
    return posts.filter((p) => p.status === statusFilter);
  }, [posts, statusFilter]);

  const monthPrefix = `${year}-${pad2(month + 1)}`;

  const monthPosts = useMemo(
    () => filteredPosts.filter((p) => p.date.startsWith(monthPrefix)),
    [filteredPosts, monthPrefix],
  );

  const postsByDate = useMemo(() => {
    const map = new Map<string, ContentPost[]>();
    for (const post of monthPosts) {
      const list = map.get(post.date) ?? [];
      list.push(post);
      map.set(post.date, list);
    }
    return map;
  }, [monthPosts]);

  // Cálculos de calendário puramente numéricos (sem new Date() no SSR)
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <div className="space-y-5">
      {/* Barra de controles */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-secondary hover:bg-surface-muted cursor-pointer"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[160px] text-center text-[14px] font-semibold text-foreground">
            {MONTH_NAMES[month]} {year}
          </div>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-secondary hover:bg-surface-muted cursor-pointer"
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => {
            const active = statusFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors cursor-pointer ${
                  active
                    ? "bg-foreground text-surface"
                    : "border border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Desktop */}
      <Card className="hidden overflow-hidden md:block">
        <div className="grid grid-cols-7 border-b border-border bg-surface-muted/50">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-y divide-border/70">
          {cells.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[112px] bg-surface-muted/20"
                />
              );
            }
            const iso = `${monthPrefix}-${pad2(day)}`;
            const dayPosts = postsByDate.get(iso) ?? [];

            return (
              <div key={iso} className="min-h-[112px] p-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-foreground-secondary tabular-nums">
                    {day}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {dayPosts.map((post) => {
                    const isSelected = selectedPost?.id === post.id;
                    return (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => setSelectedPost(post)}
                        className={`w-full rounded-md border px-2 py-1.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-brand bg-brand-soft/60"
                            : "border-border bg-surface hover:bg-surface-muted/70"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[post.status]}`}
                            aria-hidden="true"
                          />
                          <span className="text-[10px] font-medium text-foreground-muted tabular-nums">
                            {post.time}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-foreground">
                          {post.title}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Lista Mobile */}
      <div className="space-y-3 md:hidden">
        {monthPosts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-[13px] text-foreground-muted">
              Nenhuma publicação encontrada para este mês com o filtro selecionado.
            </CardContent>
          </Card>
        ) : (
          monthPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPost(post)}
              className="w-full text-left cursor-pointer"
            >
              <Card
                className={`p-4 transition-colors ${
                  selectedPost?.id === post.id ? "ring-1 ring-brand" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <PostFormatBadge format={post.format} />
                    <span className="text-[12px] font-medium text-foreground-muted tabular-nums">
                      {formatDatePt(post.date)} · {post.time}
                    </span>
                  </div>
                  <PostStatusBadge status={post.status} />
                </div>
                <p className="mt-2 text-[14px] font-medium text-foreground">
                  {post.title}
                </p>
              </Card>
            </button>
          ))
        )}
      </div>

      {/* Painel de detalhes da publicação selecionada */}
      {selectedPost && (
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <PostFormatBadge format={selectedPost.format} />
                <PostStatusBadge status={selectedPost.status} />
                <span className="inline-flex items-center gap-1 text-[12px] text-foreground-muted tabular-nums">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDatePt(selectedPost.date)} às {selectedPost.time}
                </span>
              </div>
              <CardTitle className="pt-1 text-[15px]">{selectedPost.title}</CardTitle>
              <CardDescription>{selectedPost.objective}</CardDescription>
            </div>
            <Link href="/criar" className={buttonClasses("secondary")}>
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Criar variação</span>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border bg-surface-muted/40 p-4 text-[13px] leading-relaxed text-foreground-secondary whitespace-pre-line">
              {selectedPost.caption}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
              <span className="font-medium text-brand">
                {selectedPost.hashtags.join(" ")}
              </span>
              {selectedPost.estimatedReach && (
                <span className="text-foreground-muted tabular-nums">
                  Alcance estimado (demo): {selectedPost.estimatedReach}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
