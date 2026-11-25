"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PenLine, X } from "lucide-react";
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
            className="rounded-[6px] p-1.5 text-foreground-muted hover:bg-surface-muted hover:text-foreground lg:hidden cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 rounded-[8px] border border-border bg-surface px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[13px] font-medium tracking-[-0.01em] text-foreground">
              {business.name}
            </span>
            <span className="rounded-[4px] border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground-muted">
              DEMO
            </span>
          </div>
          <p className="mt-0.5 truncate font-mono text-[11px] text-foreground-muted">
            {business.instagramHandle}
          </p>
        </div>

        <div className="mb-2 px-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-foreground-muted">
          Plataforma
        </div>

        <nav aria-label="Navegação principal" className="space-y-0.5">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  active
                    ? "bg-surface text-foreground border border-border shadow-[0_1px_1px_rgba(0,0,0,0.03)]"
                    : "border border-transparent text-foreground-secondary hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-foreground-muted group-hover:text-foreground"
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border px-2 pt-3">
        <div className="flex items-center justify-between font-mono text-[11px] text-foreground-muted">
          <span>PULSA</span>
          <span>v0.1 · MÓDULO 1</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {/* Sidebar desktop */}
      <aside className="hidden w-[240px] shrink-0 border-r border-border bg-background lg:sticky lg:top-0 lg:block lg:h-screen">
        {sidebarContent}
      </aside>

      {/* Drawer mobile */}
      <dialog
        ref={drawerRef}
        aria-label="Menu de navegação"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        className="m-0 h-dvh max-h-none w-[264px] max-w-none border-r border-border bg-background text-foreground shadow-xl backdrop:bg-black/35"
      >
        {sidebarContent}
      </dialog>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => drawerRef.current?.showModal()}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-border bg-surface text-foreground-secondary hover:bg-surface-muted lg:hidden cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex min-w-0 items-center gap-2 font-mono text-[12px]">
              <span className="hidden text-foreground-muted sm:inline">PULSA</span>
              <span className="hidden text-faint sm:inline">/</span>
              <span className="truncate font-medium uppercase tracking-[0.02em] text-foreground">
                {currentItem.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/criar" className={buttonClasses("primary", "text-[12px]")}>
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Criar conteúdo</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
