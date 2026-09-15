import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/ui/button";

import OrderCard from "../components/OrderCard";
import { useOrders } from "../hooks/useOrders";

export default function OrdersPage() {
  const { orders, requestStatus, isLoading, error, fetchOrders, dismissError } =
    useOrders();

  useEffect(() => {
    if (requestStatus !== "idle") {
      return;
    }

    void fetchOrders();
  }, [fetchOrders, requestStatus]);

  if (isLoading && orders.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Loading orders...</p>
      </main>
    );
  }

  if (error && orders.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Unable to load orders</h1>

          <p className="mt-2 text-sm text-destructive">{error}</p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                dismissError();
                void fetchOrders();
              }}
            >
              Try Again
            </Button>

            <Button variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View your orders and their current status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No orders yet</h2>

          <p className="mt-2 text-muted-foreground">
            Your orders will appear here after checkout.
          </p>

          <Button className="mt-6">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
