import type { Metadata } from "next";
import { getWorkspaceSettings } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import { SettingsForm } from "@/components/configuracoes/SettingsForm";

export const metadata: Metadata = { title: "Configurações" };

export default function ConfiguracoesPage() {
  const settings = getWorkspaceSettings();

  return (
    <div>
      <PageHeader
        eyebrow="SISTEMA & CONTA"
        title="Configurações"
        description="Ajuste preferências visuais, dados da conta e acompanhe as integrações previstas nos próximos módulos."
      />
      <SettingsForm initial={settings} />
    </div>
  );
}
