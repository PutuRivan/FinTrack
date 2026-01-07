import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, DollarSign, CreditCard, Zap, Coffee } from 'lucide-react'

export default function RecentTransactionContainer() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base">Recent Transactions</CardTitle>
        <Button variant="link" >View All</Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[
          { icon: Music, color: "bg-purple-100 text-purple-600", title: "Spotify Premium", sub: "Subscription", amount: "-$12.99" },
          { icon: DollarSign, color: "bg-green-100 text-green-600", title: "Salary Deposit", sub: "Income", amount: "+$3,000.00", positive: true },
          { icon: CreditCard, color: "bg-orange-100 text-orange-600", title: "Grocery Store", sub: "Food", amount: "-$85.50" },
          { icon: Zap, color: "bg-blue-100 text-blue-600", title: "Electric Bill", sub: "Utilities", amount: "-$115.00" },
          { icon: Coffee, color: "bg-pink-100 text-pink-600", title: "Starbucks", sub: "Coffee", amount: "-$5.40" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${item.positive ? 'text-green-600' : ''}`}>
              {item.amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
