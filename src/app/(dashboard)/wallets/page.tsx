"use client"

import { MoveUpRight, PieChart } from "lucide-react";
import CreateDialogWallet from "@/components/create-dialog-wallet";
import InsightCard from "@/components/dashboard/wallets/insight-card";
import WalletCard from "@/components/dashboard/wallets/wallet-card";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";
import { useWallets } from "@/hooks/use-wallet";

export default function WalletsPage() {
  const { data: wallets } = useWallets();

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <SidebarHeaderContent
        title="Wallets"
        description="Manage your accounts and liquid assets"
      >
        <CreateDialogWallet />
      </SidebarHeaderContent>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value="$58,655.50"
          percentage="2.4%"
          trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="Total Savings"
          value="$3,420.00"
          percentage="12%"
          trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="Total Investments"
          value="6"
          percentage="Wallets used"
          trend="up"
          variant="content"
          className="uppercase"
        />
      </div>

      {/* Your Wallets Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Wallets</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wallets?.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
            />
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Quick Insights</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <InsightCard
            icon={PieChart}
            title="Asset Allocation"
            description={
              <>
                Your assets are mostly in{" "}
                <span className="font-semibold text-blue-600">Savings</span>
              </>
            }
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
          />
          <InsightCard
            icon={MoveUpRight}
            title="Weekly Progress"
            description={
              <>
                Net worth increased by{" "}
                <span className="font-semibold text-green-600">$1,240</span>{" "}
                this week
              </>
            }
            iconBgColor="bg-green-100"
            iconTextColor="text-green-600"
          />
        </div>
      </div>
    </div>
  );
}
