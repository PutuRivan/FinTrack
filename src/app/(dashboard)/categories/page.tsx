"use client";

import { LayoutGrid, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import CreateDialogCategory from "@/components/create-dialog-category";
import CategoriesTable from "@/components/dashboard/categories/categories-table";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/use-category";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  // Calculate stats from fetched data
  const stats = useMemo(() => {
    if (!categories) return { total: 0, income: 0, expense: 0 };

    return {
      total: categories.length,
      income: categories.filter((cat) => cat.type === "income").length,
      expense: categories.filter((cat) => cat.type === "expense").length,
    };
  }, [categories]);

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      <SidebarHeaderContent
        title="Categories"
        description="Manage your income and expense categories."
      >
        <CreateDialogCategory />
      </SidebarHeaderContent>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-none ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Total Categories
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Income Types
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.income}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none ring-1 ring-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <TrendingDown className="h-4 w-4" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Expense Types
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.expense}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-2 rounded-xl border shadow-sm">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9 border-none bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList className="w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Categories Table */}
      <CategoriesTable data={categories || []} isLoading={isLoading} />
    </div>
  );
}
