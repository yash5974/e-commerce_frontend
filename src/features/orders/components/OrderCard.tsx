import { Link } from "react-router-dom";

import OrderStatusBadge from "./OrderStatusBadge";

import type { Order } from "../types/order.type";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Link
      to={`/orders/${order._id}`}
      className="block rounded-xl border p-5 transition hover:bg-muted/40"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold">Order #{order._id}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>

        <span className="font-semibold">
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </span>
      </div>
    </Link>
  );
}
