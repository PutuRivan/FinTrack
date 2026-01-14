"use client";

import * as React from "react";
import TransactionFilterContainer from "@/components/dashboard/transactions/transactions-filter-container";
import TransactionTableContainer from "@/components/dashboard/transactions/transactions-table-container";
import CreateDialogTransactions from "@/components/dialog/create/create-dialog-transactions";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";
import { useCategories } from "@/hooks/use-category";
import {
  type TransactionParams,
  useTransactions,
} from "@/hooks/use-transactions";

export default function TransactionsPage() {
  const [params, setParams] = React.useState<TransactionParams>({
    page: 1,
    limit: 10,
    period: "30days",
  });

  const { data: transactionData, isLoading: isTransactionsLoading } =
    useTransactions(params);
  const { data: matchCategories } = useCategories();

  const handleFilterChange = React.useCallback((
    key: keyof TransactionParams,
    value: string | number,
  ) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page on filter change
    }));
  }, []);

  const handlePageChange = React.useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  if (isTransactionsLoading) {
    return <div>Loading...</div>;
  }

  const transactions = transactionData?.transactions || [];
  const meta = transactionData?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen overflow-y-auto">
      <SidebarHeaderContent
        title="Transactions"
        description="View and manage your financial history"
      >
        <CreateDialogTransactions />
      </SidebarHeaderContent>
      
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Placeholder cards */}
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
      <TransactionFilterContainer
        categories={matchCategories || []}
        onFilterChange={handleFilterChange}
      />

      {/* Transactions Table */}
      <TransactionTableContainer
        data={transactions}
        meta={meta}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
