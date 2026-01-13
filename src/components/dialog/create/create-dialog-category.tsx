import { Plus } from "lucide-react";
import CategoryForm from "../../forms/category-form";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../ui/dialog";

export default function CreateDialogCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Category</DialogTitle>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
}
