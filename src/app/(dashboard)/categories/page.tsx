import {
  Briefcase,
  Bus,
  Film,
  Home,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  Utensils,
  Wallet,
} from "lucide-react";
import SidebarHeaderContent from "@/components/layout/sidebar-header-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define Types
type CategoryType = "Income" | "Expense";

interface Category {
  id: string;
  name: string;
  type: CategoryType;
  transactions: number;
  icon: React.ElementType;
  color: string; // Tailwind class for icon background
  iconColor: string; // Tailwind class for icon color
}

// Mock Data
const categories: Category[] = [
  {
    id: "1",
    name: "Salary",
    type: "Income",
    transactions: 24,
    icon: Wallet,
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "2",
    name: "Food & Dining",
    type: "Expense",
    transactions: 142,
    icon: Utensils,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "3",
    name: "Transportation",
    type: "Expense",
    transactions: 58,
    icon: Bus,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "4",
    name: "Freelance",
    type: "Income",
    transactions: 12,
    icon: Briefcase,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "5",
    name: "Housing",
    type: "Expense",
    transactions: 12,
    icon: Home,
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    id: "6",
    name: "Entertainment",
    type: "Expense",
    transactions: 34,
    icon: Film,
    color: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-muted/20">
      <SidebarHeaderContent
        title="Categories"
        description="Manage your income and expense categories."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
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
            <div className="text-3xl font-bold text-foreground">12</div>
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
            <div className="text-3xl font-bold text-foreground">3</div>
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
            <div className="text-3xl font-bold text-foreground">9</div>
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

      {/* Categories List */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px]">Category Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${category.color} ${category.iconColor}`}
                      >
                        <category.icon className="h-4 w-4" />
                      </div>
                      <span>{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.type === "Income" ? "up" : "down"}>
                      {category.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{category.transactions} Transactions</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Category</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
