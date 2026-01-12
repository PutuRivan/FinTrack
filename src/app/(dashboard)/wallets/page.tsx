import { MoveUpRight, PieChart } from "lucide-react";
import CreateDialogWallet from "@/components/create-dialog-wallet";
import InsightCard from "@/components/dashboard/wallets/insight-card";
import WalletCard from "@/components/dashboard/wallets/wallet-card";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";

const wallets = [
  {
    id: "1",
    name: "Cash Wallet",
    balance: 1250,
    type: "cash",
    icon: "Wallet",
  },
  {
    id: "2",
    name: "Main Bank Account",
    balance: 12405.5,
    type: "bank",
    icon: "Landmark",
  },
  {
    id: "3",
    name: "HY Savings",
    balance: 45000,
    type: "bank",
    icon: "PiggyBank",
  },
  {
    id: "4",
    name: "Crypto Wallet",
    balance: 8210.45,
    type: "e-wallet",
    icon: "Bitcoin",
  },
];

export default function WalletsPage() {
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
          title="TOTAL NET WORTH"
          value="$58,655.50"
          percentage="2.4%"
          trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="MONTHLY SAVINGS"
          value="$3,420.00"
          percentage="12%"
          trend="up"
          variant="content"
          className="uppercase"
        />
        <StatsCard
          title="ACTIVE BUDGETS"
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
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
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
