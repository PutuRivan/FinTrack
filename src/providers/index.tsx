"use client";

import { ThemeProvider } from "next-theme";
import type React from "react";
import { QueryProvider } from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system" attribute="class">
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}