"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { BrandProfile, BusinessProfile, TonePreset } from "@/types/pulsa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const TONE_OPTIONS: { id: TonePreset; title: string; desc: string }[] = [
  {
    id: "acolhedor",
    title: "Acolhedor & Profissional",
    desc: "Próximo, humano e confiável. Ideal para clínicas e atendimento consultivo.",
  },
  {
    id: "direto",
    title: "Direto & Moderno",
    desc: "Frases curtas, objetivas e com foco em clareza e ação.",
  },
  {
    id: "sofisticado",
    title: "Sofisticado & Editorial",
    desc: "Vocabulário refinado, ritmo calmo e estética premium.",
  },
  {
    id: "descontraido",
    title: "Descontraído & Próximo",
    desc: "Leve, conversacional e espontâneo para gerar conexão rápida.",
  },
];

export function BrandForm({
  initial,
  business,
}: {
  initial: BrandProfile;
  business: Pick<BusinessProfile, "name" | "instagramHandle">;
}) {
  const [brand, setBrand] = useState<BrandProfile>(initial);
  const [savedNotice, setSavedNotice] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2600);
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                01 / VOZ DA MARCA
              </span>
              <CardTitle className="mt-1">Tom de comunicação</CardTitle>
              <CardDescription>
                Define como o Pulsa escreve legendas, ganchos e chamadas para ação
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TONE_OPTIONS.map((opt) => {
                const active = brand.tone === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBrand((b) => ({ ...b, tone: opt.id }))}
                    className={`rounded-[6px] border p-4 text-left transition-colors cursor-pointer ${
                      active
                        ? "border-foreground bg-surface-muted"
                        : "border-border bg-surface hover:bg-surface-muted/50"
                    }`}
                  >
                    <div className="text-[13px] font-semibold text-foreground">
                      {opt.title}
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground-secondary">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                  Uso de emojis
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["nenhum", "moderado", "expressivo"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setBrand((b) => ({ ...b, emojiUsage: level }))}
                      className={`rounded-[6px] border px-2.5 py-1.5 text-[12px] font-medium capitalize cursor-pointer ${
                        brand.emojiUsage === level
                          ? "border-primary bg-primary text-on-primary"
                          : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                  Nível de formalidade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["formal", "equilibrado", "informal"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setBrand((b) => ({ ...b, formality: level }))}
                      className={`rounded-[6px] border px-2.5 py-1.5 text-[12px] font-medium capitalize cursor-pointer ${
                        brand.formality === level
                          ? "border-primary bg-primary text-on-primary"
                          : "border-border bg-surface text-foreground-secondary hover:bg-surface-muted"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                02 / SISTEMA VISUAL
              </span>
              <CardTitle className="mt-1">Paleta de cores e logotipo</CardTitle>
              <CardDescription>
                Cores e assinatura visual aplicadas nas prévias e modelos de publicação
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(
                [
                  { key: "primary", label: "Primária" },
                  { key: "secondary", label: "Secundária" },
                  { key: "accent", label: "Destaque" },
                  { key: "surface", label: "Fundo" },
                ] as const
              ).map((swatch) => (
                <div
                  key={swatch.key}
                  className="rounded-[6px] border border-border bg-surface p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-foreground-secondary">
                      {swatch.label}
                    </span>
                    <input
                      type="color"
                      aria-label={`Selecionar cor ${swatch.label}`}
                      value={brand.colors[swatch.key]}
                      onChange={(e) =>
                        setBrand((b) => ({
                          ...b,
                          colors: { ...b.colors, [swatch.key]: e.target.value },
                        }))
                      }
                      className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                    />
                  </div>
                  <div
                    className="mt-2.5 h-9 w-full rounded-[4px] border border-black/10"
                    style={{ backgroundColor: brand.colors[swatch.key] }}
                  />
                  <input
                    type="text"
                    value={brand.colors[swatch.key]}
                    onChange={(e) =>
                      setBrand((b) => ({
                        ...b,
                        colors: { ...b.colors, [swatch.key]: e.target.value },
                      }))
                    }
                    className="mt-2 w-full bg-transparent font-mono text-[11px] text-foreground focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="logo-initials"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  Iniciais / Monograma do logotipo
                </label>
                <input
                  id="logo-initials"
                  type="text"
                  maxLength={4}
                  value={brand.logoInitials}
                  onChange={(e) =>
                    setBrand((b) => ({
                      ...b,
                      logoInitials: e.target.value.toUpperCase(),
                    }))
                  }
                  className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 font-mono text-[14px] font-semibold text-foreground focus:border-foreground focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="logo-style"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  Estilo do emblema
                </label>
                <select
                  id="logo-style"
                  value={brand.logoStyle}
                  onChange={(e) =>
                    setBrand((b) => ({
                      ...b,
                      logoStyle: e.target.value as BrandProfile["logoStyle"],
                    }))
                  }
                  className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value="monogram">Monograma circular</option>
                  <option value="minimal">Minimalista quadrado</option>
                  <option value="badge">Selo editorial</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="visual-notes"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
              >
                Direção de identidade visual
              </label>
              <textarea
                id="visual-notes"
                rows={2}
                value={brand.visualStyleNotes}
                onChange={(e) =>
                  setBrand((b) => ({ ...b, visualStyleNotes: e.target.value }))
                }
                className="w-full resize-none rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                03 / DIRETRIZES DE IA
              </span>
              <CardTitle className="mt-1">Orientações para a IA</CardTitle>
              <CardDescription>
                Regras editoriais aplicadas ao assistente nos próximos módulos
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[6px] border border-border bg-surface-muted/40 p-3.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground">
                  Expressões recomendadas
                </span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {brand.aiGuidelines.doUse.map((term) => (
                    <span
                      key={term}
                      className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[12px] text-foreground"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[6px] border border-border bg-surface-muted/40 p-3.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                  Evitar nos textos
                </span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {brand.aiGuidelines.avoid.map((term) => (
                    <span
                      key={term}
                      className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[12px] text-foreground-secondary"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="ai-extra"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
              >
                Instruções adicionais
              </label>
              <textarea
                id="ai-extra"
                rows={3}
                value={brand.aiGuidelines.extraInstructions}
                onChange={(e) =>
                  setBrand((b) => ({
                    ...b,
                    aiGuidelines: {
                      ...b.aiGuidelines,
                      extraInstructions: e.target.value,
                    },
                  }))
                }
                className="w-full resize-none rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] leading-relaxed text-foreground focus:border-foreground focus:outline-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4">
        <Card className="sticky top-20">
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                PRÉVIA AO VIVO
              </span>
              <CardTitle className="mt-1">Cartão de identidade</CardTitle>
              <CardDescription>Perfil visual da marca</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="rounded-[8px] border border-border p-5"
              style={{
                backgroundColor: brand.colors.surface,
                color: brand.colors.secondary,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center text-[14px] font-bold text-white ${
                    brand.logoStyle === "monogram"
                      ? "rounded-full"
                      : brand.logoStyle === "minimal"
                        ? "rounded-[6px]"
                        : "rounded-[4px] rotate-3"
                  }`}
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  {brand.logoInitials || "PA"}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-zinc-900">
                    {business.name}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-600">
                    {business.instagramHandle}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-1.5">
                {Object.values(brand.colors).map((hex, idx) => (
                  <span
                    key={`${hex}-${idx}`}
                    className="h-2.5 flex-1 rounded-full border border-black/10"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-zinc-700">
                Tom <strong>{brand.tone}</strong>, emojis{" "}
                <strong>{brand.emojiUsage}</strong> e comunicação{" "}
                <strong>{brand.formality}</strong>.
              </p>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {savedNotice ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Perfil salvo (demo)</span>
                </>
              ) : (
                <span>Salvar perfil da marca</span>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
