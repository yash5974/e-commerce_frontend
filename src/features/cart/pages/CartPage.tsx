import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    isLoading,
    error,
    fetchCart,
    dismissError,
    isClearing,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  if (isLoading && items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </main>
    );
  }

  if (error && items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-xl font-semibold">Unable to load cart</h1>

          <p className="mt-2 text-sm text-muted-foreground">{error}</p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                dismissError();
                void fetchCart();
              }}
            >
              Try Again
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/")}
              variant="outline"
            >
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border p-10 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="mt-2 text-muted-foreground">
            Add some products to your cart to continue shopping.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-6"
          >
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isClearing}
          onClick={async () => {
            try {
              await clearCart();
            } catch {
              // Error is handled by Redux state
            }
          }}
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-destructive">{error}</p>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={dismissError}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.productId._id} item={item} />
          ))}
        </section>

        <aside className="h-fit rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>

            <span className="font-semibold">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-muted-foreground">Items</span>

            <span>{itemCount}</span>
          </div>

          <div className="my-6 border-t" />

          <Button type="button" className="w-full">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
