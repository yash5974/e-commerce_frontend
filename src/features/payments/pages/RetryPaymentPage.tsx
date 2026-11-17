import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/ui/button";

import PaymentError from "../components/PaymentError";
import PaymentGateway from "../components/PaymentGateway";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import PaymentSummary from "../components/PaymentSummary";

import { useGetPayment } from "../hooks/useGetPayment";
import { useRetryPayment } from "../hooks/useRetryPayment";

import { PaymentProvider, PaymentStatus } from "../types/payment.type";

export default function RetryPaymentPage() {
  const { paymentId } = useParams<{
    paymentId: string;
  }>();

  const [provider, setProvider] = useState<PaymentProvider | null>(null);

  const {
    payment,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useGetPayment(paymentId);

  const {
    payment: retryPayment,
    isRetrying,
    error: retryError,
    retryPayment: executeRetry,
    dismissError,
    setPaymentError,
  } = useRetryPayment();

  if (!paymentId) {
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

  if (isPaymentLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </main>
    );
  }

  if (paymentError || !payment) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border p-6 text-center">
          <h1 className="text-xl font-semibold">Unable to load payment</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {paymentError ?? "Payment not found."}
          </p>

          <Button className="mt-6">
            <Link to="/orders">My Orders</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (payment.status !== PaymentStatus.FAILED) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border p-6 text-center">
          <h1 className="text-xl font-semibold">Payment cannot be retried</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This payment is no longer in a retryable state.
          </p>

          <Button className="mt-6">
            <Link to={`/payments/${payment.paymentId}`}>View Payment</Link>
          </Button>
        </div>
      </main>
    );
  }

  const handleRetry = () => {
    if (!provider || !paymentId) {
      return;
    }

    dismissError();

    void executeRetry(paymentId, provider);
  };

  if (retryPayment) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Complete Retry Payment</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete your new payment attempt securely.
            </p>
          </div>

          <div className="space-y-6">
            <PaymentSummary intent={retryPayment} />

            <div className="rounded-xl border p-6">
              <h2 className="text-lg font-semibold">Secure Payment</h2>

              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                Complete your payment securely using{" "}
                {retryPayment.provider === "stripe" ? "Stripe" : "Razorpay"}.
              </p>

              <PaymentGateway
                intent={
                  retryPayment.provider === "stripe"
                    ? {
                        paymentId: retryPayment.paymentId,
                        orderId: retryPayment.orderId,
                        provider: "stripe",
                        amount: retryPayment.amount,
                        currency: "INR",
                        providerClientSecret:
                          retryPayment.providerClientSecret ?? "",
                      }
                    : {
                        paymentId: retryPayment.paymentId,
                        orderId: retryPayment.orderId,
                        provider: "razorpay",
                        amount: retryPayment.amount,
                        currency: "INR",
                        providerOrderId: retryPayment.providerOrderId ?? "",
                      }
                }
                onPaymentError={setPaymentError}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Retry Payment</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your previous payment failed. Start a new payment attempt.
          </p>
        </div>

        {retryError && (
          <div className="mb-6">
            <PaymentError
              message={retryError}
              onRetry={handleRetry}
              onDismiss={dismissError}
              isRetrying={isRetrying}
            />
          </div>
        )}

        <div className="space-y-6">
          <PaymentSummary intent={payment} />

          <div>
            <h2 className="mb-3 text-lg font-semibold">
              Choose payment method
            </h2>

            <PaymentMethodSelector
              value={provider}
              onChange={setProvider}
              disabled={isRetrying}
            />
          </div>

          <div className="rounded-xl border p-6">
            <Button
              type="button"
              className="w-full"
              disabled={!provider || isRetrying}
              onClick={handleRetry}
            >
              {isRetrying ? "Creating new payment..." : "Retry Payment"}
            </Button>
          </div>

          <Button variant="outline" className="w-full">
            <Link to={`/payments/${payment.paymentId}`}>Back to Payment</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
