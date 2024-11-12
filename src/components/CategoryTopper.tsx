import { Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";

export const CategoryTopper = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show the dialog when component mounts
    setOpen(true);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-destructive/50 bg-destructive/10">
        <AlertDialogHeader className="flex gap-2">
          <Shield className="h-5 w-5 text-destructive" />
          <AlertDialogTitle className="text-destructive">Important Notice</AlertDialogTitle>
          <AlertDialogDescription className="text-destructive/90">
            We exclusively support and verify mentors in Men's and Women's categories. All other categories are considered potential spam and are not endorsed by our platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};