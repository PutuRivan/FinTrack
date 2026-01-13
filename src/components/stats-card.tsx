import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | undefined;
  percentage?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
  variant?: "header" | "content";
  className?: string;
  iconClassName?: string;
}

export default function StatsCard({
  title,
  value,
  percentage,
  trend = "up",
  icon: Icon,
  variant = "header",
  className,
  iconClassName,
}: StatsCardProps) {
  const isUp = trend === "up";

  return (
    <Card>
      {variant === "header" && (
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          {Icon && (
            <div className={cn("p-2 rounded-full", className)}>
              <Icon className={cn("h-6 w-6", iconClassName)} />
            </div>
          )}
          {percentage && (
            <Badge variant={isUp ? "up" : "down"}>
              {isUp ? "↗" : "↘"} {percentage}
            </Badge>
          )}
        </CardHeader>
      )}

      <CardContent className={variant === "content" ? "p-6" : ""}>
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {title}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{value}</span>

          {variant === "content" && percentage && (
            <Badge variant={isUp ? "up" : "down"}>{percentage}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
