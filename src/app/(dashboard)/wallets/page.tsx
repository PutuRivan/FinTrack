"use client";

import { MoveUpRight, PieChart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import InsightCard from "@/components/dashboard/wallets/insight-card";
import WalletCard from "@/components/dashboard/wallets/wallet-card";
import CreateDialogWallet from "@/components/dialog/create/create-dialog-wallet";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";
import { useWallets } from "@/hooks/use-wallet";
import { formatRupiah } from "@/lib/utils";

export default function WalletsPage() {
  const { data: wallets } = useWallets();
  const pathname = usePathname();

  const highestType = useMemo(() => {
    if (!wallets?.data) return "N/A";

    const typeBalances = wallets.data.reduce(
      (acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + curr.balance;
        return acc;
      },
      {} as Record<string, number>,
    );

    let type = "N/A";
    let maxVal = -1;
    for (const [t, val] of Object.entries(typeBalances)) {
      if (val > maxVal) {
        maxVal = val;
        type = t;
      }
    }

    return type;
  }, [wallets]);

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
          value={formatRupiah(wallets?.summary.total_balance)}
          // percentage="2.4%" // TODO: Calculate trend if history available
          // trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="Total Savings"
          value={formatRupiah(wallets?.summary.total_savings)}
          // percentage="12%" // TODO: Calculate trend
          // trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="Total Wallets"
          value={wallets?.summary.total_wallet.toString()}
          // percentage="Wallets used"
          // trend="up"
          variant="content"
          className="uppercase"
        />
      </div>

      {/* Your Wallets Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Wallets</h2>
        </div>

        {!wallets || wallets.data.length === 0 ? (
          <p className="text-center text-muted-foreground">No wallets found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {wallets.data.map((wallet) => (
              <WalletCard
                key={wallet.id}
                id={wallet.id}
                name={wallet.name}
                type={wallet.type}
                balance={wallet.balance}
                icon={wallet.icon}
                rek={wallet.rek}
                pathname={pathname}
              />
            ))}
          </div>
        )}
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
                <span className="font-semibold text-blue-600 capitalize">
                  {highestType}
                </span>
              </>
            }
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
          />
          {/* Placeholder for future implementation */}
          <InsightCard
            icon={MoveUpRight}
            title="Weekly Progress"
            description={
              <>
                Net worth calculation{" "}
                <span className="font-semibold text-green-600">
                  coming soon
                </span>
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
