"use client";

import { useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Film,
  GalleryHorizontalEnd,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import type { BrandProfile, BusinessProfile, PostFormat } from "@/types/pulsa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const FORMATS: {
  id: PostFormat;
  label: string;
  hint: string;
  aspect: string;
  icon: typeof ImageIcon;
}[] = [
  { id: "feed", label: "Feed", hint: "1:1 · Imagem única", aspect: "aspect-square", icon: ImageIcon },
  {
    id: "carrossel",
    label: "Carrossel",
    hint: "4:5 · Até 10 lâminas",
    aspect: "aspect-[4/5]",
    icon: GalleryHorizontalEnd,
  },
  { id: "reels", label: "Reels", hint: "9:16 · Vídeo curto", aspect: "aspect-[9/14]", icon: Film },
  { id: "stories", label: "Stories", hint: "9:16 · Interação rápida", aspect: "aspect-[9/14]", icon: Sparkles },
];

const QUICK_IDEAS = [
  {
    label: "Dica educativa",
    format: "carrossel" as PostFormat,
    objective: "Educar sobre os 3 sinais de desidratação da pele e gerar salvamentos.",
    cta: "Salve este post para consultar na sua rotina",
  },
  {
    label: "Bastidores",
    format: "reels" as PostFormat,
    objective: "Mostrar a suavidade da Limpeza de Pele Botânica e reduzir receio de dor.",
    cta: "Comente AURA para receber os horários da semana",
  },
  {
    label: "Agenda aberta",
    format: "feed" as PostFormat,
    objective: "Divulgar os últimos horários de novembro para avaliação facial.",
    cta: "Toque no link da bio e reserve seu horário",
  },
  {
    label: "Enquete rápida",
    format: "stories" as PostFormat,
    objective: "Engajar seguidoras perguntando qual passo de skincare mais têm dúvida.",
    cta: "Vote na enquete abaixo",
  },
];

export function ContentStudio({
  business,
  brand,
}: {
  business: BusinessProfile;
  brand: BrandProfile;
}) {
  const [format, setFormat] = useState<PostFormat>("carrossel");
  const [topic, setTopic] = useState("Hidratação profunda e barreira cutânea");
  const [objective, setObjective] = useState(
    "Educar seguidoras sobre sinais de pele desidratada e convidar para avaliação.",
  );
  const [cta, setCta] = useState("Salve este post e agende sua avaliação no link da bio");
  const [slideIndex, setSlideIndex] = useState(1);
  const [generatedCount, setGeneratedCount] = useState(0);

  const selectedFormat = FORMATS.find((f) => f.id === format) ?? FORMATS[0];
  const totalSlides = format === "carrossel" ? 5 : 1;

  const previewHeadline =
    topic.trim() || "Cuidado contínuo com resultados naturais";

  const previewCaption =
    generatedCount === 0
      ? `${objective}\n\nNa ${business.name}, cada protocolo é pensado para respeitar o ritmo da sua pele — sem exageros, com orientação simples e acompanhamento próximo.\n\n${cta}.`
      : `${previewHeadline}\n\n${objective}\n\nCom nosso atendimento em ${business.city}, você descobre o que realmente funciona para a sua rotina.\n\n${cta}.`;

  const previewHashtags = [
    "#clinicaaura",
    "#skincare",
    "#belezanatural",
    format === "reels" ? "#reelsbrasil" : "#autocuidado",
  ];

  function applyQuickIdea(idea: (typeof QUICK_IDEAS)[number]) {
    setFormat(idea.format);
    setTopic(idea.label);
    setObjective(idea.objective);
    setCta(idea.cta);
    setSlideIndex(1);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Coluna de briefing */}
      <div className="space-y-6 lg:col-span-7">
        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                01 / FORMATO
              </span>
              <CardTitle className="mt-1">Formato da publicação</CardTitle>
              <CardDescription>
                Escolha o formato para ajustar a proporção e a prévia visual
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FORMATS.map((item) => {
                const Icon = item.icon;
                const active = format === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFormat(item.id);
                      setSlideIndex(1);
                    }}
                    className={`flex flex-col items-start gap-2 rounded-[6px] border p-3.5 text-left transition-colors cursor-pointer ${
                      active
                        ? "border-foreground bg-surface-muted"
                        : "border-border bg-surface hover:bg-surface-muted/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${active ? "text-foreground" : "text-foreground-muted"}`}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[13px] font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-foreground-muted">
                        {item.hint}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                02 / BRIEFING
              </span>
              <CardTitle className="mt-1">Objetivo e direcionamento</CardTitle>
              <CardDescription>
                Descreva o que deseja comunicar. A prévia ao lado reflete o conteúdo em tempo real.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                Sugestões rápidas
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_IDEAS.map((idea) => (
                  <button
                    key={idea.label}
                    type="button"
                    onClick={() => applyQuickIdea(idea)}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-medium text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground cursor-pointer"
                  >
                    {idea.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="post-topic"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
              >
                Tema ou título principal
              </label>
              <input
                id="post-topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex.: 3 passos para manter a pele hidratada no verão"
                className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="post-objective"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
              >
                Objetivo da publicação
              </label>
              <textarea
                id="post-objective"
                rows={4}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Descreva o que o seguidor deve entender, sentir ou fazer após ver este conteúdo..."
                className="w-full resize-none rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] leading-relaxed text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="post-cta"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
              >
                Chamada para ação (CTA)
              </label>
              <input
                id="post-cta"
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="Ex.: Comente AURA ou agende pelo link da bio"
                className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <p className="font-mono text-[11px] text-foreground-muted">
                TOM ATIVO: <span className="text-foreground uppercase">{brand.tone}</span>
              </p>
              <Button
                variant="primary"
                onClick={() => setGeneratedCount((c) => c + 1)}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Atualizar prévia</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coluna de prévia */}
      <div className="lg:col-span-5">
        <Card className="sticky top-20 overflow-hidden">
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                03 / PRÉVIA DEMONSTRATIVA
              </span>
              <CardTitle className="mt-1">Simulação local</CardTitle>
              <CardDescription>
                {selectedFormat.label} ({selectedFormat.hint})
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="bg-surface-muted/50">
            <div className="mx-auto max-w-[340px] overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                    style={{ backgroundColor: brand.colors.primary }}
                  >
                    {brand.logoInitials}
                  </div>
                  <div className="leading-tight">
                    <div className="text-[12px] font-semibold text-foreground">
                      {business.instagramHandle.replace("@", "")}
                    </div>
                    <div className="text-[10px] text-foreground-muted">{business.city}</div>
                  </div>
                </div>
                <span className="rounded-[4px] border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-foreground-secondary">
                  {selectedFormat.label}
                </span>
              </div>

              <div
                className={`relative flex w-full flex-col justify-between p-5 ${selectedFormat.aspect}`}
                style={{
                  backgroundColor: brand.colors.surface,
                  color: brand.colors.secondary,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white"
                    style={{ backgroundColor: brand.colors.primary }}
                  >
                    {business.segment}
                  </span>
                  {format === "carrossel" && (
                    <span className="rounded-full bg-black/75 px-2 py-0.5 font-mono text-[10px] text-white tabular-nums">
                      {slideIndex}/{totalSlides}
                    </span>
                  )}
                </div>

                <div className="my-auto space-y-2 py-4">
                  <p className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-zinc-900">
                    {format === "carrossel" && slideIndex > 1
                      ? `Lâmina ${slideIndex}: passo prático para sua rotina`
                      : previewHeadline}
                  </p>
                  <p className="line-clamp-3 text-[12px] leading-relaxed text-zinc-600">
                    {objective}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-2.5 text-[11px] font-medium text-zinc-700">
                  <span className="font-mono">{business.instagramHandle}</span>
                  {format === "carrossel" && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSlideIndex((i) => Math.max(1, i - 1))}
                        disabled={slideIndex === 1}
                        className="rounded-[4px] p-1 hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                        aria-label="Lâmina anterior"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlideIndex((i) => Math.min(totalSlides, i + 1))}
                        disabled={slideIndex === totalSlides}
                        className="rounded-[4px] p-1 hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                        aria-label="Próxima lâmina"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {format !== "stories" && (
                <div className="space-y-2.5 border-t border-border px-3.5 py-3">
                  <div className="flex items-center justify-between text-foreground-secondary">
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4" aria-hidden="true" />
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="text-[12px] leading-relaxed text-foreground">
                    <span className="mr-1.5 font-semibold">
                      {business.instagramHandle.replace("@", "")}
                    </span>
                    <span className="whitespace-pre-line text-foreground-secondary">
                      {previewCaption}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[var(--link)]">
                    {previewHashtags.join(" ")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
