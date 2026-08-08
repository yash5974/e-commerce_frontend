import type { OrderItem } from "../types/order.type";

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Order Items</h2>

      <div className="divide-y rounded-xl border">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <div
              key={item.productId}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                </p>
              </div>

              <p className="shrink-0 font-semibold">
                ₹{lineTotal.toLocaleString("en-IN")}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
