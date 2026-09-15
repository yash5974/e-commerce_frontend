import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/ui/button";

import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import type { AdminOrder, OrderStatus } from "../types/order.type";

interface AdminOrderStatusDialogProps {
  order: AdminOrder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getAllowedNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  switch (currentStatus) {
    case "PENDING":
      return ["PAID", "FAILED"];

    case "PAID":
      return ["SHIPPED"];

    case "FAILED":
    case "SHIPPED":
      return [];

    default:
      return [];
  }
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  SHIPPED: "Shipped",
};

const AdminOrderStatusDialog = ({
  order,
  open,
  onOpenChange,
}: AdminOrderStatusDialogProps) => {
  const { submit, isUpdating, error, clearError } = useUpdateOrderStatus();

  const allowedStatuses = useMemo(
    () => getAllowedNextStatuses(order.status),
    [order.status],
  );

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");

  useEffect(() => {
    if (!open) {
      setSelectedStatus("");
      clearError();
    }
  }, [open, clearError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error("Please select a new order status.");
      return;
    }

    try {
      await submit(order._id, selectedStatus);

      toast.success("Order status updated successfully.");

      onOpenChange(false);
    } catch {
      // Error is already stored/displayed by the hook.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-status-dialog-title"
        className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg"
      >
        <div className="space-y-2">
          <h2 id="order-status-dialog-title" className="text-lg font-semibold">
            Update Order Status
          </h2>

          <p className="text-sm text-muted-foreground">
            Current status:{" "}
            <span className="font-medium text-foreground">
              {statusLabels[order.status]}
            </span>
          </p>
        </div>

        {allowedStatuses.length === 0 ? (
          <div className="mt-6 rounded-md border p-4">
            <p className="text-sm text-muted-foreground">
              This order has no available status transitions.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-2">
            <label htmlFor="new-order-status" className="text-sm font-medium">
              New status
            </label>

            <select
              id="new-order-status"
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value as OrderStatus);
              }}
              disabled={isUpdating}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">Select status</option>

              {allowedStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isUpdating}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          {allowedStatuses.length > 0 && (
            <Button
              type="button"
              disabled={!selectedStatus || isUpdating}
              onClick={handleSubmit}
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderStatusDialog;
