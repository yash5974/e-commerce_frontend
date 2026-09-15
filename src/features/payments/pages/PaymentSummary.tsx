import type { PaymentSummaryProps } from "../types/payment.type";

const formatAmount = (amountMinor: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountMinor / 100);
};

export default function PaymentSummary({ intent }: PaymentSummaryProps) {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">Payment Summary</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Order ID</span>

          <span className="font-mono">{intent.orderId}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Payment Method</span>

          <span className="font-medium capitalize">{intent.provider}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Amount</span>

          <span className="text-lg font-semibold">
            {formatAmount(intent.amount)}
          </span>
        </div>
      </div>
    </div>
  );
}
