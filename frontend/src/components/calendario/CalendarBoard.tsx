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

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const STATUS_DOT: Record<PostStatus, string> = {
  agendado: "bg-[var(--link)]",
  aprovacao: "bg-[var(--warning)]",
  rascunho: "bg-foreground-muted",
  publicado: "bg-foreground",
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
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(10);
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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-border bg-surface text-foreground-secondary hover:bg-surface-muted cursor-pointer"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[160px] text-center text-[14px] font-semibold tracking-[-0.02em] text-foreground">
            {MONTH_NAMES[month]} {year}
          </div>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-border bg-surface text-foreground-secondary hover:bg-surface-muted cursor-pointer"
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
                className={`rounded-[6px] px-3 py-1 text-[12px] font-medium transition-colors cursor-pointer ${
                  active
                    ? "bg-primary text-on-primary"
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
              className="px-3 py-2.5 font-mono text-[11px] font-medium tracking-[0.04em] text-foreground-muted"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-y divide-border">
          {cells.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[112px] bg-surface-muted/30"
                />
              );
            }
            const iso = `${monthPrefix}-${pad2(day)}`;
            const dayPosts = postsByDate.get(iso) ?? [];

            return (
              <div key={iso} className="min-h-[112px] p-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium text-foreground-muted tabular-nums">
                    {pad2(day)}
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
                        className={`w-full rounded-[6px] border px-2 py-1.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "border-foreground bg-surface-muted"
                            : "border-border bg-surface hover:bg-surface-muted/60"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[post.status]}`}
                            aria-hidden="true"
                          />
                          <span className="font-mono text-[10px] text-foreground-muted tabular-nums">
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
                  selectedPost?.id === post.id ? "border-foreground" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <PostFormatBadge format={post.format} />
                    <span className="font-mono text-[11px] text-foreground-muted tabular-nums">
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

      {/* Painel de detalhes */}
      {selectedPost && (
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <PostFormatBadge format={selectedPost.format} />
                <PostStatusBadge status={selectedPost.status} />
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-foreground-muted tabular-nums">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDatePt(selectedPost.date)} · {selectedPost.time}
                </span>
              </div>
              <CardTitle className="pt-1 text-[16px]">{selectedPost.title}</CardTitle>
              <CardDescription>{selectedPost.objective}</CardDescription>
            </div>
            <Link href="/criar" className={buttonClasses("secondary")}>
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Criar variação</span>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-[6px] border border-border bg-surface-muted/40 p-4 text-[13px] leading-relaxed text-foreground-secondary whitespace-pre-line">
              {selectedPost.caption}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
              <span className="font-mono text-[11px] text-[var(--link)]">
                {selectedPost.hashtags.join(" ")}
              </span>
              {selectedPost.estimatedReach && (
                <span className="font-mono text-[11px] text-foreground-muted tabular-nums">
                  ALCANCE ESTIMADO (DEMO): {selectedPost.estimatedReach}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
