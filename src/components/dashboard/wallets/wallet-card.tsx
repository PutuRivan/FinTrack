
"use client";

import { MoreVertical } from "lucide-react";
import DeleteAlertWallet from "@/components/dialog/delete/delete-alert-wallet";
import EditDialogWallet from "@/components/dialog/edit/edit-dialog-wallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { walletIconMap } from "@/lib/types/map";
import { formatRupiah } from "@/lib/utils";

interface WalletCardProps {
  id: string;
  name: string;
  balance: number;
  icon: string;
  type: string;
  rek: string;
  pathname: string;
}

export default function WalletCard({
  id,
  name,
  balance,
  icon,
  type,
  rek,
  pathname,
}: WalletCardProps) {
  const IconComponent =
    icon && walletIconMap[icon] ? walletIconMap[icon].icon : null;

  return (
    <Card>
      <CardContent className="p-6 relative">
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <EditDialogWallet
                  wallet={{ id, name, balance, icon, type, rek }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DeleteAlertWallet id={id} pathname={pathname} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div className="">
            {IconComponent && (
              <IconComponent size={50} style={{ color: "white" }} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base">{name}</h3>
          <p className="text-sm text-muted-foreground">{rek}</p>
          <div className="text-2xl font-bold">{formatRupiah(balance)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
