import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IncomeExpenseChart } from './income-expense-chart'

export default function ChartContainer() {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Income vs Expense</CardTitle>
          <CardDescription>Monthly overview for last 6 months</CardDescription>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-1" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span>Expense</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <IncomeExpenseChart />
      </CardContent>
    </Card>
  )
}
