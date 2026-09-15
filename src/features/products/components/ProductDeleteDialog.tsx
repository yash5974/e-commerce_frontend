import { useEffect } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog";

import { useDeleteProduct } from "../hooks/useDeleteProduct";
import type { Product } from "../types/product.type";

interface ProductDeleteDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDeleteDialog = ({
  product,
  open,
  onOpenChange,
}: ProductDeleteDialogProps) => {
  const { submit, isDeleting, error } = useDeleteProduct();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleConfirm = async () => {
    if (!product || isDeleting) {
      return;
    }

    try {
      await submit(product._id);

      toast.success("Product deactivated successfully.");

      onOpenChange(false);
    } catch {
      // Error is handled through the hook.
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isDeleting) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate product?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to deactivate{" "}
            <span className="font-medium text-foreground">{product?.name}</span>
            ?
            <br />
            <br />
            This product will no longer be available to customers. Existing
            order records will not be affected.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm();
            }}
          >
            {isDeleting ? "Deactivating..." : "Deactivate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDeleteDialog;
