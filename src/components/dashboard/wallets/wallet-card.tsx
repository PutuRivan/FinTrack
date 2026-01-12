import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WalletCardProps {
  wallet: {
    id: string;
    name: string;
    balance: number;
    type: string;
    icon: string;
  };
}
export default function WalletCard({ wallet }: WalletCardProps) {
  return (
    <Card key={wallet.id} className="flex flex-col justify-between">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-xl">
            <wallet.icon />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 -mr-2 text-muted-foreground"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-base mb-1">{wallet.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{wallet.type}</p>
          <div className="text-2xl font-bold">${wallet.balance}</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {wallet.type}
            </span>
            <Button
              variant="link"
              className="h-auto p-0 text-blue-600 font-medium text-xs hover:no-underline"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
