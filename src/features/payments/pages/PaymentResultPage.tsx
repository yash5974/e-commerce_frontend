import { Link, useParams } from "react-router-dom";

import { Button } from "@/ui/button";

import PaymentStatus from "../components/PaymentStatus";

import { useGetPayment } from "../hooks/useGetPayment";
import { usePaymentStatus } from "../hooks/usePaymentStatus";

export default function PaymentResultPage() {
  const { paymentId } = useParams<{
    paymentId: string;
  }>();

  const {
    payment,
    isLoading: isPaymentLoading,
    error: paymentError,
    refetch: refetchPayment,
  } = useGetPayment(paymentId);

  const { data: paymentStatus, isFetching: isStatusFetching } =
    usePaymentStatus(
      paymentId,
      Boolean(payment && payment.status === "CREATED"),
    );

  const currentStatus = paymentStatus?.data.status ?? payment?.status;

  if (!paymentId) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Invalid payment request</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            No payment ID was provided.
          </p>

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
            {paymentError ?? "Payment details could not be found."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              onClick={() => {
                void refetchPayment();
              }}
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Retrying..." : "Try Again"}
            </Button>

            <Button variant="outline">
              <Link to="/orders">My Orders</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (!currentStatus) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border p-6 text-center">
          <h1 className="text-xl font-semibold">Payment status unavailable</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not determine the current status of this payment.
          </p>

          <Button
            className="mt-6"
            type="button"
            onClick={() => {
              void refetchPayment();
            }}
          >
            Refresh Payment
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payment Result</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here are the latest details for your payment.
          </p>
        </div>

        <div className="space-y-6">
          <PaymentStatus status={currentStatus} />

          {currentStatus === "CREATED" && isStatusFetching && (
            <p
              className="text-center text-sm text-muted-foreground"
              aria-live="polite"
            >
              Waiting for payment confirmation...
            </p>
          )}

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Payment Details</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Payment ID</span>

                <span className="max-w-[60%] truncate font-mono">
                  {payment.paymentId}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Order ID</span>

                <span className="max-w-[60%] truncate font-mono">
                  {payment.orderId}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Provider</span>

                <span className="font-medium capitalize">
                  {payment.provider}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Amount</span>

                <span className="font-semibold">
                  ₹
                  {payment.amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Status</span>

                <span className="font-semibold">{currentStatus}</span>
              </div>
            </div>
          </div>

          {currentStatus === "SUCCESS" && (
            <Button className="w-full">
              <Link to={`/orders/${payment.orderId}`}>View Order</Link>
            </Button>
          )}

          {currentStatus === "FAILED" && (
            <Button className="w-full">
              <Link to={`/payments/${payment.paymentId}/retry`}>
                Retry Payment
              </Link>
            </Button>
          )}

          {currentStatus === "CREATED" && (
            <div className="rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Your payment is still being processed.
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                We&apos;ll update this page automatically once the payment is
                confirmed.
              </p>
            </div>
          )}

          <Button variant="outline" className="w-full">
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
