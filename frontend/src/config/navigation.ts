import type { Route } from "next";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  Palette,
  PenLine,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  href: Route;
  label: string;
  icon: LucideIcon;
}

/** Fonte única das rotas exibidas no menu (sidebar, drawer mobile, atalhos). */
export const navigation: readonly NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/empresa", label: "Minha empresa", icon: Building2 },
  { href: "/marca", label: "Perfil da marca", icon: Palette },
  { href: "/criar", label: "Criar conteúdo", icon: PenLine },
  { href: "/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];
