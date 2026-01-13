
import { Edit } from "lucide-react";
import WalletForm from "../../forms/wallet-form";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

interface EditDialogWalletProps {
  wallet: {
    id: string;
    name: string;
    type: string;
    icon: string;
    rek: string;
    balance: number;
  };
}

export default function EditDialogWallet({ wallet }: EditDialogWalletProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Wallet</DialogTitle>
        <WalletForm wallet={wallet} />
      </DialogContent>
    </Dialog>
  );
}
