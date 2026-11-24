import { getBusinessProfile } from "@/services/pulsa";
import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({ children }: LayoutProps<"/">) {
  const { name, instagramHandle } = getBusinessProfile();

  return <AppShell business={{ name, instagramHandle }}>{children}</AppShell>;
}
