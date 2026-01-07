import type React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import SidebarLayoutClient from "./sidebar-layout-client";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayoutClient>
      {children}
    </SidebarLayoutClient>
  );
}
