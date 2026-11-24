import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  PenLine,
  TrendingUp,
} from "lucide-react";
import { getBusinessProfile, getDashboardSummary, getUpcomingPosts } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { PostFormatBadge, PostStatusBadge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { ActivityChart } from "@/components/dashboard/ActivityChart";

export const metadata: Metadata = { title: "Dashboard" };

function formatShortDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}

export default function DashboardPage() {
  const summary = getDashboardSummary();
  const upcoming = getUpcomingPosts();
  const business = getBusinessProfile();

  const statusBreakdown = [
    {
      label: "Agendadas",
      count: summary.scheduledCount,
      bar: "bg-emerald-500",
    },
    {
      label: "Aguardando aprovação",
      count: summary.pendingApprovalCount,
      bar: "bg-amber-500",
    },
    {
      label: "Publicadas",
      count: summary.publishedCount,
      bar: "bg-sky-500",
    },
    {
      label: "Rascunhos",
      count: summary.draftCount,
      bar: "bg-zinc-400",
    },
  ];

  const kpis = [
    {
      label: "Publicações no mês",
      value: summary.totalPostsMonth,
      helper: summary.monthLabel,
      icon: Layers,
    },
    {
      label: "Agendadas",
      value: summary.scheduledCount,
      helper: "Prontas para ir ao ar",
      icon: CalendarDays,
    },
    {
      label: "Aguardando aprovação",
      value: summary.pendingApprovalCount,
      helper: "Revisão pendente",
      icon: Clock,
    },
    {
      label: "Consistência",
      value: `${summary.consistencyScore}%`,
      helper: "Semanas com publicação",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão geral"
        description={`Acompanhe o ritmo editorial de ${business.name} em ${summary.monthLabel}.`}
        actions={
          <>
            <Link href="/calendario" className={buttonClasses("secondary")}>
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span>Ver calendário</span>
            </Link>
            <Link href="/criar" className={buttonClasses("brand")}>
              <PenLine className="h-4 w-4" aria-hidden="true" />
              <span>Novo conteúdo</span>
            </Link>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-foreground-secondary">
                  {kpi.label}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-muted text-foreground-muted">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-semibold tracking-[-0.02em] text-foreground tabular-nums">
                  {kpi.value}
                </span>
                <span className="text-[11px] text-foreground-muted">{kpi.helper}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Atividade + Status */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Ritmo de produção por formato</CardTitle>
              <CardDescription>
                Distribuição semanal entre Feed, Carrossel, Reels e Stories
              </CardDescription>
            </div>
            <span className="text-[11px] font-medium text-foreground-muted">
              {summary.monthLabel}
            </span>
          </CardHeader>
          <CardContent>
            <ActivityChart data={summary.weeklyActivity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Status das publicações</CardTitle>
              <CardDescription>Pipeline editorial do mês</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
              {statusBreakdown.map((item) => {
                const pct = (item.count / Math.max(summary.totalPostsMonth, 1)) * 100;
                return (
                  <div
                    key={item.label}
                    className={item.bar}
                    style={{ width: `${pct}%` }}
                    title={`${item.label}: ${item.count}`}
                  />
                );
              })}
            </div>

            <div className="space-y-3">
              {statusBreakdown.map((item) => {
                const pct = Math.round(
                  (item.count / Math.max(summary.totalPostsMonth, 1)) * 100,
                );
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-[13px]"
                  >
                    <div className="flex items-center gap-2 text-foreground-secondary">
                      <span
                        className={`h-2 w-2 rounded-full ${item.bar}`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2 tabular-nums">
                      <span className="font-semibold text-foreground">{item.count}</span>
                      <span className="w-8 text-right text-[11px] text-foreground-muted">
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-border bg-surface-muted/50 p-3">
              <div className="flex items-center gap-2 text-[12px] font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                <span>Aguardando sua revisão: {summary.pendingApprovalCount}</span>
              </div>
              <p className="mt-1 text-[11px] text-foreground-secondary">
                Confira horários e legendas no calendário antes da publicação.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximos conteúdos */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Próximos conteúdos</CardTitle>
            <CardDescription>
              Publicações planejadas e rascunhos em ordem cronológica
            </CardDescription>
          </div>
          <Link
            href="/calendario"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-foreground-secondary hover:text-foreground"
          >
            <span>Abrir calendário</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </CardHeader>
        <div className="divide-y divide-border/70">
          {upcoming.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-surface-muted/35 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <PostFormatBadge format={post.format} />
                  <span className="text-[12px] font-medium text-foreground-muted tabular-nums">
                    {formatShortDate(post.date)} · {post.time}
                  </span>
                </div>
                <p className="truncate text-[14px] font-medium text-foreground">
                  {post.title}
                </p>
                <p className="line-clamp-1 text-[12px] text-foreground-secondary">
                  {post.objective}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <PostStatusBadge status={post.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
