"use client";

import { Briefcase, Film, Music, Plus, ShoppingCart, Zap } from "lucide-react";
import TransactionFilterContainer from "@/components/dashboard/transactions/transactions-filter-container";
import TransactionTableContainer, {
  type Transaction,
} from "@/components/dashboard/transactions/transactions-table-container";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";

const data: Transaction[] = [
  {
    id: "1",
    date: "Oct 24, 2023",
    merchant: "Spotify",
    description: "Monthly Subscription",
    category: "Entertainment",
    amount: 10.99,
    type: "Expense",
    icon: Music,
    iconColor: "bg-green-100 text-green-600",
  },
  {
    id: "2",
    date: "Oct 23, 2023",
    merchant: "Upwork Inc.",
    description: "Freelance Payment",
    category: "Income",
    amount: 1200.0,
    type: "Income",
    icon: Briefcase,
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "3",
    date: "Oct 22, 2023",
    merchant: "Whole Foods Market",
    description: "Weekly Groceries",
    category: "Food & Drink",
    amount: 85.5,
    type: "Expense",
    icon: ShoppingCart,
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    id: "4",
    date: "Oct 20, 2023",
    merchant: "City Power & Light",
    description: "Utility Bill",
    category: "Utilities",
    amount: 124.0,
    type: "Expense",
    icon: Zap,
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "5",
    date: "Oct 18, 2023",
    merchant: "Netflix",
    description: "Standard Plan",
    category: "Entertainment",
    amount: 15.49,
    type: "Expense",
    icon: Film,
    iconColor: "bg-black text-white",
  },
];

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <SidebarHeaderContent
        title="Transactions"
        description="View and manage your financial history"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
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
      <TransactionTableContainer data={data} />
    </div>
  );
}
