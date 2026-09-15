import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "@/features/cart/hooks/useCart";
import { Button } from "@/ui/button";

import { useCreateOrder } from "../hooks/useCreateOrder";
import { createOrderSchema } from "../schemas/order.schema";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    cart,
    items,
    itemCount,
    isLoading: isCartLoading,
    error: cartError,
    fetchCart,
    dismissError: dismissCartError,
  } = useCart();

  const {
    isCreating,
    error: orderError,
    submitOrder,
    dismissError: dismissOrderError,
  } = useCreateOrder();

  useEffect(() => {
    if (cart) {
      return;
    }

    void fetchCart();
  }, [cart, fetchCart]);

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
    [items],
  );

  const validationError = useMemo(() => {
    if (items.length === 0) {
      return "Your cart is empty.";
    }

    const schemaResult = createOrderSchema.safeParse({
      items: orderItems,
    });

    if (!schemaResult.success) {
      return schemaResult.error.issues[0]?.message ?? "Invalid cart items.";
    }

    for (const item of items) {
      const product = item.productId;

      if (product.stock < 1) {
        return `${product.name} is currently out of stock.`;
      }

      if (item.quantity > product.stock) {
        return `Only ${product.stock} unit${
          product.stock === 1 ? "" : "s"
        } of ${product.name} ${product.stock === 1 ? "is" : "are"} available.`;
      }
    }

    return null;
  }, [items, orderItems]);

  const handlePlaceOrder = async () => {
    if (isCreating || validationError) {
      return;
    }

    dismissOrderError();

    try {
      const order = await submitOrder({
        items: orderItems,
      });

      navigate(`/payment/${order._id}`, {
        replace: true,
      });
    } catch {
      // The existing Order store owns the create-order error.
    }
  };

  if (isCartLoading && !cart) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Loading checkout...</p>
      </main>
    );
  }

  if (cartError && !cart) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Unable to load your cart</h1>

          <p className="mt-2 text-sm text-destructive">{cartError}</p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                dismissCartError();
                void fetchCart();
              }}
            >
              Try Again
            </Button>

            <Button variant="outline">
              <Link to="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
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

  const displayError = validationError ?? orderError;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review your items before placing the order.
        </p>
      </div>

      {displayError && (
        <div
          className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
          role="alert"
        >
          <p className="text-sm text-destructive">{displayError}</p>

          {!validationError && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={dismissOrderError}
            >
              Dismiss
            </Button>
          )}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Your Items</h2>

          <div className="divide-y rounded-xl border">
            {items.map((item) => {
              const product = item.productId;

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

                    {item.quantity > product.stock && (
                      <p className="mt-1 text-sm text-destructive">
                        Only {product.stock} available.
                      </p>
                    )}
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

          <div className="my-6 border-t" />

          <p className="text-sm text-muted-foreground">
            The final order amount, prices, product data, and stock will be
            validated by the server.
          </p>

          <Button
            type="button"
            className="mt-6 w-full"
            disabled={isCreating || Boolean(validationError)}
            onClick={() => {
              void handlePlaceOrder();
            }}
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
