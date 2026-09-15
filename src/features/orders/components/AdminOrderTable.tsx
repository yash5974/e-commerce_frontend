import { useState } from "react";

import { Button } from "@/ui/button";

import AdminOrderStatusDialog from "./AdminOrderStatusDialog";

import { useNavigate } from "react-router-dom";
import type { AdminOrder } from "../types/order.type";

interface AdminOrderTableProps {
  orders: AdminOrder[];
  isLoading: boolean;
  isFetching: boolean;
}

const formatCurrency = (amountInMinorUnits: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountInMinorUnits / 100);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const getStatusClassName = (status: AdminOrder["status"]) => {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700";

    case "FAILED":
      return "bg-red-100 text-red-700";

    case "SHIPPED":
      return "bg-blue-100 text-blue-700";

    case "PENDING":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const AdminOrderTable = ({
  orders,
  isLoading,
  isFetching,
}: AdminOrderTableProps) => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  if (isLoading) {
    return <div className="rounded-lg border p-6">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <p className="font-medium">No orders found.</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing the current filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border">
        {isFetching && (
          <div className="border-b px-4 py-2 text-xs text-muted-foreground">
            Updating...
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Order
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Items
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Amount
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-medium">
                  Date
                </th>

                <th className="px-4 py-3 text-right text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b last:border-b-0">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">{order._id}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-xs">{order.userId}</span>
                  </td>

                  <td className="px-4 py-3">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {formatCurrency(order.totalAmount)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClassName(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">{formatDate(order.createdAt)}</td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Update Status
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/payments/${order.paymentId}`)
                        }
                      >
                        View Payment
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <AdminOrderStatusDialog
          order={selectedOrder}
          open={Boolean(selectedOrder)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedOrder(null);
            }
          }}
        />
      )}
    </>
  );
};

export default AdminOrderTable;
