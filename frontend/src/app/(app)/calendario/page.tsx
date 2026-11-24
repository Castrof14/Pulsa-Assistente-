import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { getAllPosts } from "@/services/pulsa";
import { PageHeader } from "@/components/ui/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { CalendarBoard } from "@/components/calendario/CalendarBoard";

export const metadata: Metadata = { title: "Calendário" };

export default function CalendarioPage() {
  const posts = getAllPosts();

  return (
    <div>
      <PageHeader
        title="Calendário editorial"
        description="Visualize a distribuição mensal das publicações, horários e status de aprovação."
        actions={
          <Link href="/criar" className={buttonClasses("brand")}>
            <PenLine className="h-4 w-4" aria-hidden="true" />
            <span>Novo conteúdo</span>
          </Link>
        }
      />
      <CalendarBoard posts={posts} />
    </div>
  );
}
