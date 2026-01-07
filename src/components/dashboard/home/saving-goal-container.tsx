import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, Laptop, MoreHorizontal, Plane } from 'lucide-react'
import SavingGoalCard from './saving-goals-card'

export default function SavingGoalContainer() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Savings Goals</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <SavingGoalCard
          title="New Car"
          percentage={65}
          savedAmount={13000}
          targetAmount={20000}
          Icon={Car}
          color="blue-500"
        />
        <SavingGoalCard
          title="Japan Trip"
          percentage={25}
          savedAmount={1250}
          targetAmount={5000}
          Icon={Plane}
          color="green-500"
        />
        <SavingGoalCard
          title="Macbook Pro"
          percentage={90}
          savedAmount={2700}
          targetAmount={3000}
          Icon={Laptop}
          color="red-500"
        />
      </CardContent>
    </Card>
  )
}
