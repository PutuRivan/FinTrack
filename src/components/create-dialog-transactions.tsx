import { Plus } from "lucide-react";
import TransactionsForm from "./forms/transactions-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";

export default function CreateDialogTransactions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <TransactionsForm />
      </DialogContent>
    </Dialog>
  );
}
