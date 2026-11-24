"use client";

import { useEffect, useState } from "react";
import { Camera, Check, MessageSquare, Sparkles } from "lucide-react";
import type { WorkspaceSettings } from "@/types/pulsa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const FUTURE_INTEGRATIONS = [
  {
    name: "Assistente de IA (Claude)",
    module: "Módulo 3",
    description:
      "Geração automática de ideias, pautas, legendas e roteiros personalizados conforme o perfil da marca.",
    icon: Sparkles,
  },
  {
    name: "Instagram Graph API",
    module: "Módulo 5",
    description:
      "Autorização oficial de contas profissionais para agendamento e publicação direta de Feed, Reels e Stories.",
    icon: Camera,
  },
  {
    name: "Automação & Atende+ (WhatsApp)",
    module: "Módulo 6",
    description:
      "Monitoramento de comentários, respostas em Direct e encaminhamento de leads para o Atende+.",
    icon: MessageSquare,
  },
];

export function SettingsForm({ initial }: { initial: WorkspaceSettings }) {
  const [settings, setSettings] = useState<WorkspaceSettings>(initial);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else if (settings.theme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }, [settings.theme]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2600);
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preferências visuais */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Preferências visuais</CardTitle>
              <CardDescription>
                Personalize a aparência e o ritmo de leitura da interface
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-2 block text-[12px] font-medium text-foreground">
                Tema da interface
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    { id: "light", label: "Claro" },
                    { id: "dark", label: "Escuro" },
                    { id: "system", label: "Sistema" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, theme: opt.id }))}
                    className={`rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                      settings.theme === opt.id
                        ? "border-brand bg-brand-soft/60 text-foreground ring-1 ring-brand/30"
                        : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-medium text-foreground">
                Densidade de layout
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    { id: "comfortable", label: "Confortável" },
                    { id: "compact", label: "Compacto" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, density: opt.id }))}
                    className={`rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                      settings.density === opt.id
                        ? "border-foreground bg-foreground text-surface"
                        : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border/70 pt-4">
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <div className="text-[13px] font-medium text-foreground">
                    Resumo semanal por e-mail
                  </div>
                  <div className="text-[11px] text-foreground-muted">
                    Receba um panorama das publicações planejadas toda segunda-feira
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailDigest}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, emailDigest: e.target.checked }))
                  }
                  className="h-4 w-4 accent-brand"
                />
              </label>

              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <div className="text-[13px] font-medium text-foreground">
                    Lembretes de aprovação
                  </div>
                  <div className="text-[11px] text-foreground-muted">
                    Alertar quando houver conteúdos aguardando revisão
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.approvalReminders}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      approvalReminders: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-brand"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Informações da conta */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Informações básicas da conta</CardTitle>
              <CardDescription>
                Dados do responsável e fuso horário do workspace
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="acc-owner"
                className="mb-1.5 block text-[12px] font-medium text-foreground"
              >
                Responsável pela conta
              </label>
              <input
                id="acc-owner"
                type="text"
                value={settings.ownerName}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, ownerName: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="acc-email"
                className="mb-1.5 block text-[12px] font-medium text-foreground"
              >
                E-mail de contato
              </label>
              <input
                id="acc-email"
                type="email"
                value={settings.ownerEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, ownerEmail: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="acc-tz"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Fuso horário
                </label>
                <select
                  id="acc-tz"
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, timezone: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none"
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="America/Manaus">Manaus (GMT-4)</option>
                  <option value="America/Fortaleza">Fortaleza (GMT-3)</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-foreground">
                  Ambiente atual
                </label>
                <div className="flex h-[38px] items-center rounded-lg border border-border bg-surface-muted/50 px-3 text-[12px] font-medium text-foreground-secondary">
                  Módulo 1 · Fundação (Demo)
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary">
                {savedNotice ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span>Preferências salvas (demo local)</span>
                  </>
                ) : (
                  <span>Salvar preferências</span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estrutura preparada para futuras integrações */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Integrações futuras</CardTitle>
            <CardDescription>
              Conexões planejadas na arquitetura modular do Pulsa (não ativas neste módulo)
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {FUTURE_INTEGRATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex flex-col justify-between rounded-xl border border-border bg-surface-muted/35 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-foreground-secondary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-foreground-muted ring-1 ring-border">
                        {item.module}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[13px] font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-medium text-foreground-muted">
                    Estrutura preparada · Em breve
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
