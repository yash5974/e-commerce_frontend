import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/ui/button";

import OrderItems from "../components/OrderItems";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderSummary from "../components/OrderSummary";
import { useOrder } from "../hooks/useOrder";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { order, isLoading, error, fetchOrder, dismissError } = useOrder(
    id ?? "",
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    void fetchOrder();
  }, [fetchOrder, id]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Loading order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Order not found</h1>

          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                dismissError();
                void fetchOrder();
              }}
            >
              Try Again
            </Button>

            <Button variant="outline">
              <Link to="/orders">My Orders</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order Details</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Order #{order._id}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <OrderItems items={order.items} />

        <div className="space-y-4">
          <OrderSummary order={order} />

          {order.status === "PENDING" && (
            <Button className="w-full">
              <Link to={`/payment/${order._id}`}>Continue to Payment</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
