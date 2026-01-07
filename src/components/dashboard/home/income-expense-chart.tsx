"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

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
]

export function IncomeExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          cursor={{ fill: "transparent" }}
        />
        <Bar
          dataKey="income"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
        <Bar
          dataKey="expense"
          fill="#e5e7eb"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
