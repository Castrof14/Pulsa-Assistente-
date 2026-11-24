import {
  DEMO_BRAND,
  DEMO_BUSINESS,
  DEMO_MONTH,
  DEMO_POSTS,
  DEMO_SETTINGS,
} from "@/mocks/pulsaData";
import type {
  BrandProfile,
  BusinessProfile,
  ContentPost,
  DashboardSummary,
  PostFormat,
  PostStatus,
  WorkspaceSettings,
} from "@/types/pulsa";

/**
 * Serviços do Módulo 1 retornam dados demonstrativos locais.
 * Nos próximos módulos, cada função será substituída por chamadas ao `api` (src/services/api).
 */

export function getDashboardSummary(): DashboardSummary {
  const posts = DEMO_POSTS.filter((post) => post.date.startsWith(DEMO_MONTH.prefix));
  const countStatus = (status: PostStatus) =>
    posts.filter((post) => post.status === status).length;

  // Quatro faixas de 7 dias; os dias 29 a 31 entram na última.
  const weeklyActivity = [1, 2, 3, 4].map((week) => {
    const weekPosts = posts.filter(
      (post) => Math.min(Math.ceil(Number(post.date.slice(8)) / 7), 4) === week,
    );
    const countFormat = (format: PostFormat) =>
      weekPosts.filter((post) => post.format === format).length;
    return {
      week: `Sem ${week}`,
      feed: countFormat("feed"),
      carrossel: countFormat("carrossel"),
      reels: countFormat("reels"),
      stories: countFormat("stories"),
      total: weekPosts.length,
    };
  });
  const activeWeeks = weeklyActivity.filter((week) => week.total > 0).length;

  return {
    monthLabel: DEMO_MONTH.label,
    totalPostsMonth: posts.length,
    scheduledCount: countStatus("agendado"),
    pendingApprovalCount: countStatus("aprovacao"),
    publishedCount: countStatus("publicado"),
    draftCount: countStatus("rascunho"),
    consistencyScore: Math.round((activeWeeks / weeklyActivity.length) * 100),
    weeklyActivity,
  };
}

export function getUpcomingPosts(): ContentPost[] {
  return DEMO_POSTS.filter((post) => post.status !== "publicado").sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  );
}

export function getAllPosts(): ContentPost[] {
  return [...DEMO_POSTS].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  );
}

export function getBusinessProfile(): BusinessProfile {
  return DEMO_BUSINESS;
}

export function getBrandProfile(): BrandProfile {
  return DEMO_BRAND;
}

export function getWorkspaceSettings(): WorkspaceSettings {
  return DEMO_SETTINGS;
}
