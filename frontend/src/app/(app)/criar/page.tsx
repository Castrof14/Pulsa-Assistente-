import type { Metadata } from "next";
import { getBrandProfile, getBusinessProfile } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentStudio } from "@/components/criar/ContentStudio";

export const metadata: Metadata = { title: "Criar conteúdo" };

export default function CriarPage() {
  const business = getBusinessProfile();
  const brand = getBrandProfile();

  return (
    <div>
      <PageHeader
        title="Criar conteúdo"
        description="Estruture uma nova publicação para o Instagram e visualize a prévia demonstrativa."
      />
      <ContentStudio business={business} brand={brand} />
    </div>
  );
}
