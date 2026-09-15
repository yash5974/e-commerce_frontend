import type { PaymentSummaryProps } from "../types/payment.type";

export default function PaymentSummary({ intent }: PaymentSummaryProps) {
  return (
    <div className="rounded-xl border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>

          <p className="mt-1 font-medium">{intent.orderId}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Amount</p>

          <p className="mt-1 text-xl font-bold">
            ₹{intent.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <p className="text-sm text-muted-foreground">Payment provider</p>

        <p className="mt-1 font-medium capitalize">{intent.provider}</p>
      </div>
    </div>
  );
}
