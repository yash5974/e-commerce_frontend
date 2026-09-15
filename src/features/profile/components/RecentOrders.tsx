import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useOrders } from "@/features/orders/hooks/useOrders";
import type { Order } from "@/features/orders/types/order.type";
import { PaymentStatus } from "@/features/payments";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

const RECENT_ORDER_LIMIT = 5;

const statusLabels: Record<Order["status"], string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  SHIPPED: "Shipped",
};

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN");
}

export default function RecentOrders() {
  // const { orders, isLoading, error, fetchOrders, dismissError } = useOrders();
  const { orders, isLoading, error, requestStatus, fetchOrders, dismissError } =
    useOrders();

  useEffect(() => {
    if (requestStatus !== "idle") {
      return;
    }

    void fetchOrders();
  }, [fetchOrders, requestStatus]);

  const recentOrders = orders.slice(0, RECENT_ORDER_LIMIT);

  return (
    <section className="rounded-xl border bg-background">
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your latest orders and their current status.
          </p>
        </div>

        <Button variant="outline" size="sm">
          <Link to="/orders">View All Orders</Link>
        </Button>
      </div>

      <div className="p-5">
        {isLoading && orders.length === 0 && (
          <div
            className="rounded-lg border border-dashed p-6 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm text-muted-foreground">
              Loading recent orders...
            </p>
          </div>
        )}

        {!isLoading && error && orders.length === 0 && (
          <div
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center"
            role="alert"
          >
            <h3 className="font-medium text-destructive">
              Unable to load recent orders
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">{error}</p>

            <Button
              type="button"
              size="sm"
              className="mt-4"
              onClick={() => {
                dismissError();
                void fetchOrders();
              }}
            >
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && recentOrders.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="font-medium">No orders yet</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your orders will appear here after checkout.
            </p>

            <Button className="mt-4">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}

        {recentOrders.length > 0 && (
          <div className="divide-y rounded-lg border">
            {recentOrders.map((order) => (
              <article
                key={order._id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">Order #{order._id}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span>{formatAmount(order.totalAmount)}</span>

                    {order.createdAt && (
                      <span>{formatDate(order.createdAt)}</span>
                    )}
                  </div>

                  {order.paymentId && order.paymentId.status ? (
                    <div className="mt-3">
                      <PaymentStatus status={order.paymentId.status} />
                    </div>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Badge
                    variant={
                      order.status === "FAILED" ? "destructive" : "secondary"
                    }
                  >
                    {statusLabels[order.status]}
                  </Badge>

                  <Button variant="outline" size="sm">
                    <Link to={`/orders/${order._id}`}>View</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
