"use client";

import { useState } from "react";
import { Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DarkThemePreview,
  LightThemePreview,
  ThemeCardOption,
} from "./theme-card-option";

export default function ThemeCardContainer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how FinTrack looks on your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center md:justify-start gap-6">
        <ThemeCardOption
          label="Light"
          value="light"
          currentTheme={theme}
          onSelect={setTheme}
          preview={<LightThemePreview />}
        />

        <ThemeCardOption
          label="Dark"
          value="dark"
          currentTheme={theme}
          onSelect={setTheme}
          preview={<DarkThemePreview />}
        />
      </CardContent>
    </Card>
  );
}
