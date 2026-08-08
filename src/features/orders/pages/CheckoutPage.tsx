import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

import { useCart } from "@/features/cart/hooks/useCart";

import { useCreateOrder } from "../hooks/useCreateOrder";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, itemCount, subtotal, isLoading } = useCart();

  const { isCreating, error, submitOrder, dismissError } = useCreateOrder();

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
    [items],
  );

  const handlePlaceOrder = async () => {
    if (orderItems.length === 0 || isCreating) {
      return;
    }

    try {
      const order = await submitOrder({
        items: orderItems,
      });

      navigate(`/orders/${order._id}`, {
        replace: true,
      });
    } catch {
      // Error is stored in Redux state.
    }
  };

  if (isLoading && items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Loading checkout...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>

          <p className="mt-2 text-muted-foreground">
            Add products before proceeding to checkout.
          </p>

          <Button className="mt-6">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review your order before placing it.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
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
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Items</h2>

          <div className="divide-y rounded-xl border">
            {items.map((item) => {
              const product = item.productId;

              const unitPrice =
                product.discountPrice > 0
                  ? product.discountPrice
                  : product.price;

              return (
                <div key={product._id} className="flex gap-4 p-4">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{product.name}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-semibold">
                      ₹{(unitPrice * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="h-fit rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-muted-foreground">Items</span>

            <span>{itemCount}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>

            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="my-6 border-t" />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>

            <span className="text-xl font-bold">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <Button
            type="button"
            className="mt-6 w-full"
            disabled={isCreating}
            onClick={handlePlaceOrder}
          >
            {isCreating ? "Creating Order..." : "Place Order"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full"
            disabled={isCreating}
          >
            <Link to="/cart">Back to Cart</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
