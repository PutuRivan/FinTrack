import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
}

export default function InsightCard({
  icon: Icon,
  title,
  description,
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
}: InsightCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconBgColor} ${iconTextColor}`}>
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
            {title}
          </p>
          <p className="text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
