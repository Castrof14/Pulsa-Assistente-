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
    module: "MÓDULO 03",
    description:
      "Geração automática de ideias, pautas, legendas e roteiros personalizados conforme o perfil da marca.",
    icon: Sparkles,
  },
  {
    name: "Instagram Graph API",
    module: "MÓDULO 05",
    description:
      "Autorização oficial de contas profissionais para agendamento e publicação direta de Feed, Reels e Stories.",
    icon: Camera,
  },
  {
    name: "Automação & Atende+ (WhatsApp)",
    module: "MÓDULO 06",
    description:
      "Monitoramento de comentários, respostas em Direct e encaminhamento de leads para o Atende+.",
    icon: MessageSquare,
  },
];

const INPUT_CLASS =
  "w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground focus:border-foreground focus:outline-none";

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
        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                01 / INTERFACE
              </span>
              <CardTitle className="mt-1">Preferências visuais</CardTitle>
              <CardDescription>
                Personalize a aparência e o ritmo de leitura da interface
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="mb-2 block text-[13px] font-medium text-foreground">
                Tema da interface
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                    className={`rounded-[6px] border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                      settings.theme === opt.id
                        ? "border-primary bg-primary text-on-primary"
                        : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-medium text-foreground">
                Densidade de layout
              </label>
              <div className="grid grid-cols-2 gap-2">
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
                    className={`rounded-[6px] border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                      settings.density === opt.id
                        ? "border-primary bg-primary text-on-primary"
                        : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <div className="text-[13px] font-medium text-foreground">
                    Resumo semanal por e-mail
                  </div>
                  <div className="text-[12px] text-foreground-secondary">
                    Panorama das publicações planejadas toda segunda-feira
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailDigest}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, emailDigest: e.target.checked }))
                  }
                  className="h-4 w-4 accent-foreground"
                />
              </label>

              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <div className="text-[13px] font-medium text-foreground">
                    Lembretes de aprovação
                  </div>
                  <div className="text-[12px] text-foreground-secondary">
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
                  className="h-4 w-4 accent-foreground"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                02 / CONTA
              </span>
              <CardTitle className="mt-1">Informações básicas da conta</CardTitle>
              <CardDescription>
                Dados do responsável e fuso horário do workspace
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="acc-owner"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="acc-email"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                className={INPUT_CLASS}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="acc-tz"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  Fuso horário
                </label>
                <select
                  id="acc-tz"
                  value={settings.timezone}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, timezone: e.target.value }))
                  }
                  className={INPUT_CLASS}
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="America/Manaus">Manaus (GMT-4)</option>
                  <option value="America/Fortaleza">Fortaleza (GMT-3)</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                  Ambiente atual
                </label>
                <div className="flex h-[38px] items-center rounded-[6px] border border-border bg-surface-muted/50 px-3 font-mono text-[11px] text-foreground-secondary">
                  MÓDULO 01 · DEMO
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary">
                {savedNotice ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Preferências salvas (demo)</span>
                  </>
                ) : (
                  <span>Salvar preferências</span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
              03 / ROADMAP DE INTEGRAÇÕES
            </span>
            <CardTitle className="mt-1">Integrações futuras</CardTitle>
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
                  className="flex flex-col justify-between rounded-[6px] border border-border bg-surface p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-border bg-surface-muted text-foreground">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="rounded-[4px] border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] font-medium text-foreground-muted">
                        {item.module}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-border pt-3 font-mono text-[11px] text-foreground-muted">
                    ESTRUTURA PREPARADA · EM BREVE
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
