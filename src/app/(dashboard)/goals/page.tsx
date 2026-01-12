"use client";

import { LayoutGrid } from "lucide-react";
import CreateDialogGoal from "@/components/create-dialog-goal";
import GoalCard from "@/components/dashboard/goal/goal-card";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useGoals } from "@/hooks/use-goals";

export default function page() {
  const { data: goals } = useGoals();

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <SidebarHeaderContent title="Goals" description="Manage your goals">
        <CreateDialogGoal />
      </SidebarHeaderContent>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Total Savings
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">10000</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Total Goals
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">10</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Active Goals
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">10</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Goals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals?.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
}
