import { Link, useParams } from "react-router-dom";

import { Button } from "@/ui/button";

import { useGetPayment } from "../hooks/useGetPayment";
import AdminPaymentDetails from "./AdminPaymentDetails";

export default function AdminPaymentDetailsPage() {
  const { paymentId } = useParams<{
    paymentId: string;
  }>();

  const { payment, isLoading, error, refetch } = useGetPayment(paymentId);

  if (!paymentId) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-semibold">Invalid payment request</h1>

          <Button className="mt-6">
            <Link to="/admin/orders">Back to Orders</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </main>
    );
  }

  if (error || !payment) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border p-6 text-center">
          <h1 className="text-xl font-semibold">Unable to load payment</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error ?? "Payment details could not be found."}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                void refetch();
              }}
            >
              Try Again
            </Button>

            <Button variant="outline">
              <Link to="/admin/orders">Back to Orders</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payment Details</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View payment information and manage refunds.
          </p>
        </div>

        <AdminPaymentDetails payment={payment} />

        <Button variant="outline" className="mt-6 w-full">
          <Link to="/admin/orders">Back to Orders</Link>
        </Button>
      </div>
    </main>
  );
}
