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

const INPUT_CLASS =
  "w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-[14px] text-foreground placeholder:text-foreground-muted focus:border-foreground focus:outline-none";

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
        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                01 / DADOS DO NEGÓCIO
              </span>
              <CardTitle className="mt-1">Informações básicas</CardTitle>
              <CardDescription>
                Contexto principal utilizado para estruturar legendas e roteiros
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="biz-name"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="biz-handle"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="biz-segment"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
                >
                  Segmento
                </label>
                <select
                  id="biz-segment"
                  value={profile.segment}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, segment: e.target.value }))
                  }
                  className={INPUT_CLASS}
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
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="biz-desc"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                className={`${INPUT_CLASS} resize-none leading-relaxed`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                02 / CATÁLOGO
              </span>
              <CardTitle className="mt-1">Produtos e serviços</CardTitle>
              <CardDescription>
                Principais ofertas que devem aparecer no planejamento de conteúdo
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="divide-y divide-border rounded-[6px] border border-border">
              {profile.products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="rounded-[4px] border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] uppercase text-foreground-secondary">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-foreground-secondary">
                      {item.highlight}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    className="rounded-[6px] p-1.5 text-foreground-muted hover:bg-surface-muted hover:text-foreground cursor-pointer"
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2.5 rounded-[6px] border border-dashed border-border-strong bg-surface-muted/40 p-3 sm:grid-cols-12">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Nome do produto ou serviço"
                className="rounded-[6px] border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-4 focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
                placeholder="Categoria"
                className="rounded-[6px] border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-3 focus:border-foreground focus:outline-none"
              />
              <input
                type="text"
                value={newProductHighlight}
                onChange={(e) => setNewProductHighlight(e.target.value)}
                placeholder="Diferencial"
                className="rounded-[6px] border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground sm:col-span-3 focus:border-foreground focus:outline-none"
              />
              <Button
                variant="secondary"
                onClick={addProduct}
                className="sm:col-span-2"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Adicionar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-foreground-muted">
                03 / AUDIÊNCIA
              </span>
              <CardTitle className="mt-1">Público-alvo</CardTitle>
              <CardDescription>
                Perfil do público que o conteúdo precisa atrair no Instagram
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="aud-age"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="aud-interests"
                  className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="aud-pains"
                className="mb-1.5 block text-[13px] font-medium text-foreground"
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
                className={`${INPUT_CLASS} resize-none leading-relaxed`}
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
                RESUMO ATIVO
              </span>
              <CardTitle className="mt-1">Contexto da empresa</CardTitle>
              <CardDescription>Base para geração de pautas</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[6px] border border-border bg-surface-muted/50 p-3.5 text-[13px] leading-relaxed text-foreground-secondary">
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="font-mono text-[11px] text-foreground-muted">
                {profile.segment} · {profile.city}
              </p>
              <p className="mt-2">{profile.description}</p>
            </div>

            <div className="space-y-2 border-t border-border pt-3 text-[13px]">
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Ofertas cadastradas</span>
                <span className="font-mono font-medium text-foreground tabular-nums">
                  {profile.products.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Público</span>
                <span className="font-mono text-[12px] text-foreground">
                  {profile.targetAudience.ageRange}
                </span>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {savedNotice ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Alterações salvas (demo)</span>
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
