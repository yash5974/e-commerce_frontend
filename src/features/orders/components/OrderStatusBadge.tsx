import { Badge } from "@/ui/badge";

import type { OrderStatus } from "../types/order.type";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  SHIPPED: "Shipped",
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant={status === "FAILED" ? "destructive" : "secondary"}>
      {statusLabels[status]}
    </Badge>
  );
}
