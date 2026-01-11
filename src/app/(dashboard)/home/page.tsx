import { CreditCard, DollarSign, Wallet } from "lucide-react";
import ChartContainer from "@/components/dashboard/home/chart-container";
import RecentTransactionContainer from "@/components/dashboard/home/recent-transaction-container";
import SavingGoalContainer from "@/components/dashboard/home/saving-goal-container";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <SidebarHeaderContent
        title="Welcome back, Alex"
        description="Here is your financial overview for today."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value="$24,500.00"
          percentage="+12%"
          trend="up"
          icon={Wallet}
          variant="header"
          iconClassName="text-blue-500"
          className="bg-blue-100"
        />
        <StatsCard
          title="Total Income"
          value="$4,200.00"
          percentage="+5%"
          trend="up"
          icon={DollarSign}
          variant="header"
          iconClassName="text-green-500"
          className="bg-green-100"
        />
        <StatsCard
          title="Total Expense"
          value="$1,850.00"
          percentage="-2%"
          trend="down"
          icon={CreditCard}
          variant="header"
          iconClassName="text-red-500"
          className="bg-red-100"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ChartContainer />
        <RecentTransactionContainer />
      </div>

      <SavingGoalContainer />
    </div>
  );
}
