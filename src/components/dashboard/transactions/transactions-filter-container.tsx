import { Search } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// use-mobile probably doesn't have debounce. I'll implement local debounce.

import type { TransactionParams } from "@/hooks/use-transactions";
import type { TCategoriesResponse } from "@/lib/types/response";

interface TransactionFilterContainerProps {
  categories: TCategoriesResponse[];
  onFilterChange: (key: keyof TransactionParams, value: string | number) => void;
}

export default function TransactionFilterContainer({
  categories,
  onFilterChange,
}: TransactionFilterContainerProps) {
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) onFilterChange("search", searchValue);
      else onFilterChange("search", "");
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border">
      <div className="relative w-full md:w-[350px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by merchant, note or amount"
          className="pl-9 bg-muted/50 border-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <Select
          defaultValue="30days"
          onValueChange={(value) => onFilterChange("period", value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-none">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue="all"
          onValueChange={(value) => onFilterChange("category", value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-none">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category: All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue="all-type"
          onValueChange={(value) => onFilterChange("type", value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-none">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-type">Type: All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
