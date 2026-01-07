import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, LucideIcon } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface SavingGoalCardProps {
  title: string
  percentage: number
  savedAmount: number
  targetAmount: number
  Icon: LucideIcon
  color?: string
}

export default function SavingGoalCard({ title,
  percentage,
  savedAmount,
  targetAmount,
  Icon,
  color
}: SavingGoalCardProps) {
  return (
    <Card className='w-full'>
      <CardContent className='space-y-2'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 text-${color ?? 'blue-500'}`} />
            <span className="font-medium">{title}</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">{percentage}%</span>
        </div>
        <Progress
          value={percentage}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${savedAmount ?? 0} saved</span>
          <span>Target: ${targetAmount ?? 0}</span>
        </div>
      </CardContent>
    </Card>
  )
}
