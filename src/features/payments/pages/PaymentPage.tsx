import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/ui/button";

import PaymentError from "../components/PaymentError";
import PaymentSummary from "../components/PaymentSummary";
import { useCreatePaymentIntent } from "../hooks/useCreatePaymentIntent";

export default function PaymentPage() {
  const { orderId } = useParams<{
    orderId: string;
  }>();

  const { intent, isCreatingIntent, error, createIntent, dismissError } =
    useCreatePaymentIntent();

  useEffect(() => {
    if (!orderId || intent) {
      return;
    }

    void createIntent(orderId);
  }, [orderId, intent, createIntent]);

  const handleRetry = () => {
    if (!orderId) {
      return;
    }

    dismissError();

    void createIntent(orderId);
  };

  if (!orderId) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Invalid payment request</h1>

          <Button className="mt-6">
            <Link to="/orders">My Orders</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (isCreatingIntent && !intent) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <p>Initializing secure payment...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payment</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete payment for your order.
          </p>
        </div>

        {error && (
          <PaymentError
            message={error}
            onRetry={handleRetry}
            onDismiss={dismissError}
            isRetrying={isCreatingIntent}
          />
        )}

        {intent && (
          <div className="space-y-6">
            <PaymentSummary intent={intent} />

            <div className="rounded-xl border p-6">
              <h2 className="text-lg font-semibold">Secure Payment</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Your payment gateway integration will appear here.
              </p>

              {/*
                IMPORTANT:

                The actual Stripe/Razorpay SDK should
                be mounted here.

                Do NOT call /payment from this page.

                The payment provider will call your
                backend webhook after payment.
              */}

              <Button
                type="button"
                className="mt-6 w-full"
                onClick={() => {
                  // Replace with the actual gateway SDK.
                }}
              >
                Pay ₹{intent.amount.toLocaleString("en-IN")}
              </Button>
            </div>

            <Button variant="outline" className="w-full">
              <Link to={`/orders/${orderId}`}>Back to Order</Link>
            </Button>
          </div>
        )}

        {!intent && !error && (
          <div className="rounded-xl border p-6 text-center">
            <p className="text-muted-foreground">
              Unable to initialize payment.
            </p>

            <Button type="button" className="mt-4" onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
