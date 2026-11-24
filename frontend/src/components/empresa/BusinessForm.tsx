"use client";

import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import type { BusinessProfile, ProductServiceItem } from "@/types/pulsa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SEGMENTS = [
  "Clínica & Bem-estar",
  "Moda & Vestuário",
  "Gastronomia & Alimentação",
  "Comércio Local",
  "Serviços Profissionais",
];

export function BusinessForm({ initial }: { initial: BusinessProfile }) {
  const [profile, setProfile] = useState<BusinessProfile>(initial);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductHighlight, setNewProductHighlight] = useState("");
  const [savedNotice, setSavedNotice] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2600);
  }

  function addProduct() {
    if (!newProductName.trim()) return;
    const item: ProductServiceItem = {
      id: crypto.randomUUID(),
      name: newProductName.trim(),
      category: newProductCategory.trim() || "Serviço",
      highlight: newProductHighlight.trim() || "Atendimento personalizado",
    };
    setProfile((prev) => ({
      ...prev,
      products: [...prev.products, item],
    }));
    setNewProductName("");
    setNewProductCategory("");
    setNewProductHighlight("");
  }

  function removeProduct(id: string) {
    setProfile((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        {/* Informações básicas */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Informações básicas do negócio</CardTitle>
              <CardDescription>
                Dados principais utilizados para contextualizar legendas e roteiros
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="biz-name"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Nome da empresa
                </label>
                <input
                  id="biz-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label
                  htmlFor="biz-handle"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Perfil do Instagram
                </label>
                <input
                  id="biz-handle"
                  type="text"
                  value={profile.instagramHandle}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, instagramHandle: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="biz-segment"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Segmento
                </label>
                <select
                  id="biz-segment"
                  value={profile.segment}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, segment: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  {SEGMENTS.map((seg) => (
                    <option key={seg} value={seg}>
                      {seg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="biz-city"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Cidade / Região
                </label>
                <input
                  id="biz-city"
                  type="text"
                  value={profile.city}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="biz-desc"
                className="mb-1.5 block text-[12px] font-medium text-foreground"
              >
                Descrição do negócio
              </label>
              <textarea
                id="biz-desc"
                rows={3}
                value={profile.description}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, description: e.target.value }))
                }
                className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-[13px] leading-relaxed text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Produtos e serviços */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Produtos e serviços</CardTitle>
              <CardDescription>
                Principais ofertas que devem aparecer no planejamento de conteúdo
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="divide-y divide-border/70 rounded-xl border border-border">
              {profile.products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="rounded bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-foreground-secondary">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-foreground-muted">
                      {item.highlight}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    className="rounded-md p-1.5 text-foreground-muted hover:bg-surface-muted hover:text-brand cursor-pointer"
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2.5 rounded-xl border border-dashed border-border-strong bg-surface-muted/40 p-3.5 sm:grid-cols-12">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Nome do produto ou serviço"
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-4 focus:border-brand focus:outline-none"
              />
              <input
                type="text"
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
                placeholder="Categoria"
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-3 focus:border-brand focus:outline-none"
              />
              <input
                type="text"
                value={newProductHighlight}
                onChange={(e) => setNewProductHighlight(e.target.value)}
                placeholder="Diferencial"
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-3 focus:border-brand focus:outline-none"
              />
              <Button
                variant="secondary"
                onClick={addProduct}
                className="sm:col-span-2 px-2.5 py-1.5"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Adicionar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Público-alvo */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Público-alvo</CardTitle>
              <CardDescription>
                Quem o seu conteúdo precisa atrair e convencer no Instagram
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="aud-age"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Faixa etária principal
                </label>
                <input
                  id="aud-age"
                  type="text"
                  value={profile.targetAudience.ageRange}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      targetAudience: { ...p.targetAudience, ageRange: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label
                  htmlFor="aud-interests"
                  className="mb-1.5 block text-[12px] font-medium text-foreground"
                >
                  Interesses
                </label>
                <input
                  id="aud-interests"
                  type="text"
                  value={profile.targetAudience.interests}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      targetAudience: { ...p.targetAudience, interests: e.target.value },
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="aud-pains"
                className="mb-1.5 block text-[12px] font-medium text-foreground"
              >
                Dores, dúvidas e objetivos
              </label>
              <textarea
                id="aud-pains"
                rows={3}
                value={profile.targetAudience.painPoints}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    targetAudience: { ...p.targetAudience, painPoints: e.target.value },
                  }))
                }
                className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-[13px] leading-relaxed text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo lateral */}
      <div className="lg:col-span-4">
        <Card className="sticky top-20">
          <CardHeader>
            <div>
              <CardTitle>Resumo do negócio</CardTitle>
              <CardDescription>Contexto ativo para geração de pautas</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-surface-muted/50 p-3.5 text-[12px] leading-relaxed text-foreground-secondary">
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="text-foreground-muted">
                {profile.segment} · {profile.city}
              </p>
              <p className="mt-2">{profile.description}</p>
            </div>

            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-foreground-muted">Ofertas cadastradas</span>
                <span className="font-semibold text-foreground tabular-nums">
                  {profile.products.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Público</span>
                <span className="font-medium text-foreground">
                  {profile.targetAudience.ageRange}
                </span>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {savedNotice ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>Alterações salvas (demo local)</span>
                </>
              ) : (
                <span>Salvar informações</span>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
