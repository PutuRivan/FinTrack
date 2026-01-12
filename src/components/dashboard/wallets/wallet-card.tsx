import { Card, CardContent } from "@/components/ui/card";
import { walletIconMap } from "@/lib/types/map";
import { formatRupiah } from "@/lib/utils";

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
  const IconComponent =
    wallet.icon && walletIconMap[wallet.icon]
      ? walletIconMap[wallet.icon].icon
      : null;

  return (
    <Card key={wallet.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="">
            {IconComponent && (
              <IconComponent size={50} style={{ color: "white" }} />
            )}
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold text-base">{wallet.name}</h3>
          <p className="text-sm text-muted-foreground">{wallet.type}</p>
          <div className="text-2xl font-bold">{formatRupiah(wallet.balance)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
