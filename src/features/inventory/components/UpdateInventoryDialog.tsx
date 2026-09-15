import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/ui/button";

import {
  updateInventorySchema,
  type UpdateInventoryFormValues,
} from "../schemas/inventory.schema";

import { useUpdateInventory } from "../hooks/useUpdateInventory";

interface UpdateInventoryDialogProps {
  productId: string;
  productName: string;
  currentStock: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateInventoryDialog = ({
  productId,
  productName,
  currentStock,
  open,
  onOpenChange,
}: UpdateInventoryDialogProps) => {
  const { submit, isUpdating, error, clearError } = useUpdateInventory();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateInventoryFormValues>({
    resolver: zodResolver(updateInventorySchema),
    defaultValues: {
      quantity: 1,
      type: "RESTOCK",
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (!open) {
      reset({
        quantity: 1,
        type: "RESTOCK",
      });

      clearError();
    }
  }, [open, reset, clearError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!open) {
    return null;
  }

  const onSubmit = async (values: UpdateInventoryFormValues) => {
    try {
      const result = await submit(productId, values.quantity, values.type);

      toast.success(
        values.type === "RESTOCK"
          ? "Inventory restocked successfully."
          : "Inventory reduced successfully.",
      );

      toast.success(`Current stock: ${result.stock}`);

      onOpenChange(false);
    } catch {
      // Error is handled by the hook.
    }
  };

  const previewStock =
    selectedType === "RESTOCK"
      ? currentStock + (Number(watch("quantity")) || 0)
      : currentStock - (Number(watch("quantity")) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-dialog-title"
        className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg"
      >
        <div className="space-y-2">
          <h2 id="inventory-dialog-title" className="text-lg font-semibold">
            Update Inventory
          </h2>

          <p className="text-sm text-muted-foreground">
            Update stock for{" "}
            <span className="font-medium text-foreground">{productName}</span>
          </p>
        </div>

        <div className="mt-5 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current stock</span>

            <span className="font-semibold">{currentStock}</span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Preview stock</span>

            <span
              className={
                previewStock < 0
                  ? "font-semibold text-destructive"
                  : "font-semibold"
              }
            >
              {previewStock}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="inventory-type" className="text-sm font-medium">
              Operation
            </label>

            <select
              id="inventory-type"
              {...register("type")}
              disabled={isUpdating}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="RESTOCK">Restock</option>

              <option value="ORDER">Reduce for Order</option>
            </select>

            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="inventory-quantity" className="text-sm font-medium">
              Quantity
            </label>

            <input
              id="inventory-quantity"
              type="number"
              min={1}
              step={1}
              {...register("quantity", {
                valueAsNumber: true,
              })}
              disabled={isUpdating}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            />

            {errors.quantity && (
              <p className="text-sm text-destructive">
                {errors.quantity.message}
              </p>
            )}

            {selectedType === "ORDER" && previewStock < 0 && (
              <p className="text-sm text-destructive">
                Quantity cannot exceed current stock.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isUpdating}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isUpdating || (selectedType === "ORDER" && previewStock < 0)
              }
            >
              {isUpdating ? "Updating..." : "Update Inventory"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInventoryDialog;
