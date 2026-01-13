import { Plus } from "lucide-react";
import GoalForm from "../../forms/goal-form";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

export default function CreateDialogGoal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Goal</DialogTitle>
        <GoalForm />
      </DialogContent>
    </Dialog>
  );
}
