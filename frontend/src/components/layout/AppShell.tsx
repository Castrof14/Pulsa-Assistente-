"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PenLine, Sparkles, X } from "lucide-react";
import { navigation } from "@/config/navigation";
import type { BusinessProfile } from "@/types/pulsa";
import { PulsaLogo } from "./PulsaLogo";
import { buttonClasses } from "@/components/ui/Button";

interface AppShellProps {
  business: Pick<BusinessProfile, "name" | "instagramHandle">;
  children: ReactNode;
}

export function AppShell({ business, children }: AppShellProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const closeDrawer = () => drawerRef.current?.close();

  const currentItem =
    navigation.find((item) => pathname.startsWith(item.href)) ?? navigation[0];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between px-3 py-4">
      <div>
        <div className="flex items-center justify-between px-2 pb-5">
          <Link href="/dashboard" aria-label="Ir para o Dashboard do Pulsa">
            <PulsaLogo />
          </Link>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-md p-1.5 text-foreground-muted hover:bg-surface-muted hover:text-foreground lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 rounded-lg border border-border bg-surface-muted/60 px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[12px] font-semibold text-foreground">
              {business.name}
            </span>
            <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground-muted ring-1 ring-border">
              Demo
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-foreground-muted">
            {business.instagramHandle} · Instagram
          </p>
        </div>

        <nav aria-label="Navegação principal" className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  active
                    ? "bg-surface text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-border"
                    : "text-foreground-secondary hover:bg-surface-muted/70 hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active
                      ? "text-brand"
                      : "text-foreground-muted group-hover:text-foreground-secondary"
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-4">
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span>Módulo 1 · Fundação</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-foreground-muted">
            Interface navegável com dados demonstrativos locais. Integrações de IA e
            Instagram entram nos próximos módulos.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {/* Sidebar desktop */}
      <aside className="hidden w-[248px] shrink-0 border-r border-border bg-background lg:sticky lg:top-0 lg:block lg:h-screen">
        {sidebarContent}
      </aside>

      {/* Drawer mobile: <dialog> nativo cuida de foco, Escape e inércia do fundo */}
      <dialog
        ref={drawerRef}
        aria-label="Menu de navegação"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        className="m-0 h-dvh max-h-none w-[268px] max-w-none border-r border-border bg-background text-foreground shadow-xl backdrop:bg-black/35"
      >
        {sidebarContent}
      </dialog>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => drawerRef.current?.showModal()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-secondary hover:bg-surface-muted lg:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 text-[13px] min-w-0">
              <span className="hidden text-foreground-muted sm:inline">Pulsa</span>
              <span className="hidden text-foreground-muted sm:inline">/</span>
              <span className="truncate font-medium text-foreground">
                {currentItem.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/criar" className={buttonClasses("primary", "px-3 py-1.5 text-[12px]")}>
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Criar conteúdo</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
