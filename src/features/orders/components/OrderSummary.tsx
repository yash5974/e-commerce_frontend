import type { Order } from "../types/order.type";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <aside className="h-fit rounded-xl border p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-muted-foreground">Items</span>

        <span>{itemCount}</span>
      </div>

      <div className="my-6 border-t" />

      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>

        <span className="text-xl font-bold">
          ₹{order.totalAmount.toLocaleString("en-IN")}
        </span>
      </div>
    </aside>
  );
}
