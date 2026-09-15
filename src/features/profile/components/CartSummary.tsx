import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "@/features/cart/hooks/useCart";
import { Button } from "@/ui/button";
import { useEffect } from "react";

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export default function CartSummary() {
  const { itemCount, subtotal, isLoading, error, fetchCart, dismissError } =
    useCart();

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  if (isLoading && itemCount === 0) {
    return (
      <section className="rounded-xl border bg-background p-5">
        <div
          className="flex min-h-28 items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm text-muted-foreground">Loading cart...</p>
        </div>
      </section>
    );
  }

  if (error && itemCount === 0) {
    return (
      <section className="rounded-xl border bg-background p-5">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Unable to load cart</h2>

          <p className="mt-1 text-sm text-muted-foreground">{error}</p>

          <div className="mt-4 flex justify-center gap-3">
            <Button
              type="button"
              size="sm"
              onClick={() => {
                dismissError();
                void fetchCart();
              }}
            >
              Try Again
            </Button>

            <Button variant="outline" size="sm">
              <Link to="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="rounded-xl border bg-background p-5">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <ShoppingCart className="mb-3 size-8 text-muted-foreground" />

          <h2 className="text-lg font-semibold">Your cart is empty</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add products to your cart to see them here.
          </p>

          <Button className="mt-4" size="sm">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-background p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Your Cart</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <ShoppingCart className="size-5 text-muted-foreground" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Items</span>

          <span className="font-medium">{itemCount}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-medium">Subtotal</span>

          <span className="font-semibold">{formatAmount(subtotal)}</span>
        </div>
      </div>

      {error && (
        <div
          className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3"
          role="alert"
        >
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button className="mt-5 w-full">
        <Link to="/cart">View Cart</Link>
      </Button>
    </section>
  );
}
