import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ThemeCardOptionProps {
  label: string;
  value: "light" | "dark";
  currentTheme: string;
  onSelect: (theme: "light" | "dark") => void;
  preview: React.ReactNode;
}

export function ThemeCardOption({
  label,
  value,
  currentTheme,
  onSelect,
  preview,
}: ThemeCardOptionProps) {
  const isActive = currentTheme === value;

  return (
    <Button
      variant="ghost"
      className={`w-fit h-fit p-1.5 ${isActive ? "hover:bg-transparent" : "hover:bg-accent"
        }`}
      onClick={() => onSelect(value)}
    >
      <Card className="relative w-fit h-fit gap-0 p-2">
        <CardContent className="p-0">{preview}</CardContent>

        <CardFooter className="justify-center">
          {isActive && (
            <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
              <Check className="h-3 w-3" />
            </div>
          )}
          <span className="block text-sm font-medium">{label}</span>
        </CardFooter>
      </Card>
    </Button>
  );
}

export function DarkThemePreview() {
  return (
    <div className="space-y-2 rounded bg-slate-950 p-2">
      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-2 w-20 rounded-lg bg-slate-400" />
        <div className="h-2 w-25 rounded-lg bg-slate-400" />
      </div>

      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-25 rounded-lg bg-slate-400" />
      </div>

      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-25 rounded-lg bg-slate-400" />
      </div>
    </div>
  );
}

export function LightThemePreview() {
  return (
    <div className="space-y-2 rounded bg-[#ecedef] p-2">
      <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-2 w-20 rounded-lg bg-[#ecedef]" />
        <div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
      </div>

      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
      </div>

      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-25 rounded-lg bg-[#ecedef]" />
      </div>
    </div>
  )
}
