"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", income: 2500, expense: 1200 },
  { month: "February", income: 3800, expense: 2100 },
  { month: "March", income: 4200, expense: 1800 },
  { month: "April", income: 3900, expense: 2400 },
  { month: "May", income: 5100, expense: 2300 },
  { month: "June", income: 4600, expense: 2000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const data = [
  {
    name: "Jan",
    income: 2500,
    expense: 1200,
  },
  {
    name: "Feb",
    income: 3800,
    expense: 2100,
  },
  {
    name: "Mar",
    income: 4200,
    expense: 1800,
  },
  {
    name: "Apr",
    income: 3900,
    expense: 2400,
  },
  {
    name: "May",
    income: 5100,
    expense: 2300,
  },
  {
    name: "Jun",
    income: 4600,
    expense: 2000,
  },
];

export function IncomeExpenseChart() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Bar dataKey="income" fill="var(--chart-1)" radius={4} />
        <Bar dataKey="expense" fill="var(--chart-2)" radius={4} />
      </BarChart>
    </ChartContainer>

  );
}
