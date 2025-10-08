"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Nav from "./nav";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import SidebarUser from "./user";
import Footer from "./footer";
import { Library } from "./library";
import { BottomNav } from "./bottom_nav";
import Header from "./header";

export default function DashboardSidebar({
  sidebar,
  ...props
}: React.ComponentProps<typeof Sidebar> & { sidebar: SidebarType }) {
  return (
    <Sidebar collapsible={sidebar.collapsible || "icon"} {...props}>
      {sidebar.brand && <Header brand={sidebar.brand} />}
      <SidebarContent>
        {sidebar.nav && <Nav nav={sidebar.nav} />}
        {sidebar.library && <Library library={sidebar.library} />}
        {sidebar.bottomNav && (
          <BottomNav nav={sidebar.bottomNav} className="mt-auto" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser account={sidebar.account} />
        {sidebar?.social && <Footer social={sidebar.social} />}
      </SidebarFooter>
    </Sidebar>
  );
}
