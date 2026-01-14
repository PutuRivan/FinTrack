"use client";

import { Briefcase, Film, Music, ShoppingCart, Zap } from "lucide-react";
import TransactionFilterContainer from "@/components/dashboard/transactions/transactions-filter-container";
import TransactionTableContainer from "@/components/dashboard/transactions/transactions-table-container";
import CreateDialogTransactions from "@/components/dialog/create/create-dialog-transactions";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";
import { useTransactions } from "@/hooks/use-transactions";

export default function TransactionsPage() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <SidebarHeaderContent
        title="Transactions"
        description="View and manage your financial history"
      >
        <CreateDialogTransactions />
      </SidebarHeaderContent>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value="$12,450.00"
          percentage="+2.5%"
          trend="up"
          variant="content"
        />
        <StatsCard
          title="Income (This Month)"
          value="$5,400.00"
          percentage="+10%"
          trend="up"
          variant="content"
        />
        <StatsCard
          title="Expenses (This Month)"
          value="$2,150.00"
          percentage="-10%"
          trend="down"
          variant="content"
        />
      </div>

      {/* Filter Bar */}
      <TransactionFilterContainer />

      {/* Transactions Table */}
      <TransactionTableContainer data={data || []} />
    </div>
  );
}
