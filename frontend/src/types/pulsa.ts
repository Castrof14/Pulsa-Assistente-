export type PostFormat = "feed" | "carrossel" | "reels" | "stories";

export type PostStatus = "agendado" | "aprovacao" | "rascunho" | "publicado";

export interface ContentPost {
  id: string;
  title: string;
  format: PostFormat;
  status: PostStatus;
  /** ISO date YYYY-MM-DD (data fixa para compatibilidade com cacheComponents) */
  date: string;
  /** HH:mm */
  time: string;
  objective: string;
  caption: string;
  hashtags: string[];
  cta: string;
  slidesCount?: number;
  estimatedReach?: string;
}

export interface ProductServiceItem {
  id: string;
  name: string;
  category: string;
  highlight: string;
}

export interface BusinessProfile {
  name: string;
  instagramHandle: string;
  segment: string;
  city: string;
  description: string;
  targetAudience: {
    ageRange: string;
    interests: string;
    painPoints: string;
  };
  products: ProductServiceItem[];
}

export type TonePreset =
  | "acolhedor"
  | "direto"
  | "sofisticado"
  | "descontraido";

export interface BrandProfile {
  tone: TonePreset;
  emojiUsage: "nenhum" | "moderado" | "expressivo";
  formality: "formal" | "equilibrado" | "informal";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
  };
  logoInitials: string;
  logoStyle: "minimal" | "monogram" | "badge";
  visualStyleNotes: string;
  aiGuidelines: {
    doUse: string[];
    avoid: string[];
    extraInstructions: string;
  };
}

export interface WeeklyActivityPoint {
  week: string;
  feed: number;
  carrossel: number;
  reels: number;
  stories: number;
}

export interface DashboardSummary {
  monthLabel: string;
  totalPostsMonth: number;
  scheduledCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  draftCount: number;
  consistencyScore: number;
  weeklyActivity: WeeklyActivityPoint[];
}

export interface WorkspaceSettings {
  ownerName: string;
  ownerEmail: string;
  workspaceName: string;
  timezone: string;
  language: string;
  theme: "light" | "system" | "dark";
  density: "comfortable" | "compact";
  emailDigest: boolean;
  approvalReminders: boolean;
}
