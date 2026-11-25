import type { Metadata } from "next";
import { getBrandProfile, getBusinessProfile } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import { BrandForm } from "@/components/marca/BrandForm";

export const metadata: Metadata = { title: "Perfil da marca" };

export default function MarcaPage() {
  const brand = getBrandProfile();
  const { name, instagramHandle } = getBusinessProfile();

  return (
    <div>
      <PageHeader
        eyebrow="IDENTIDADE & TOM"
        title="Perfil da marca"
        description="Configure o tom de voz, a paleta de cores e as diretrizes que guiam a identidade do seu conteúdo."
      />
      <BrandForm initial={brand} business={{ name, instagramHandle }} />
    </div>
  );
}
