import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TFinancialGoal } from "@/lib/types/schema";
import { formatDate, formatRupiah } from "@/lib/utils";

interface GoalCardProps {
  goal: TFinancialGoal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {goal.name}
        </CardTitle>
        <CardDescription>Target: {formatDate(goal.target_date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2 text-muted-foreground mb-2">
          <span className="">
            {formatRupiah(goal.current_amount)}/{formatRupiah(goal.target_amount)}
          </span>
          <span className="">{66}%</span>
        </div>
        <Progress value={66} />
      </CardContent>
    </Card>
  );
}
