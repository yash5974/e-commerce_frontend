import type { PaymentIntent } from "../types/payment.type";

interface PaymentSummaryProps {
  intent: PaymentIntent;
}

export default function PaymentSummary({ intent }: PaymentSummaryProps) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">Payment Summary</h2>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Provider</span>

          <span className="font-medium capitalize">{intent.provider}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Payment ID</span>

          <span className="max-w-48 truncate text-sm font-medium">
            {intent.paymentId}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Amount</span>

            <span className="text-xl font-bold">
              ₹{intent.amount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
