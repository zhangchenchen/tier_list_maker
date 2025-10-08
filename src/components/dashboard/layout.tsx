import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import DashboardSidebar from "./sidebar";

export default function DashboardLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: SidebarType;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar
        variant={sidebar.variant || "sidebar"}
        sidebar={sidebar}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
