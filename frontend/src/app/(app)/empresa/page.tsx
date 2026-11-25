import type { Metadata } from "next";
import { getBusinessProfile } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import { BusinessForm } from "@/components/empresa/BusinessForm";

export const metadata: Metadata = { title: "Minha empresa" };

export default function EmpresaPage() {
  const business = getBusinessProfile();

  return (
    <div>
      <PageHeader
        eyebrow="CONFIGURAÇÃO DE NEGÓCIO"
        title="Minha empresa"
        description="Mantenha os dados do seu negócio atualizados para que cada publicação reflita sua oferta e público."
      />
      <BusinessForm initial={business} />
    </div>
  );
}
