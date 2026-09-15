import { useState } from "react";

import { Button } from "@/ui/button";

import RefundPaymentDialog from "../components/RefundPaymentDialog";
import type { Payment } from "../types/payment.type";

interface AdminPaymentDetailsProps {
  payment: Payment;
}

const formatAmount = (amountMinor: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountMinor / 100);
};

export default function AdminPaymentDetails({
  payment,
}: AdminPaymentDetailsProps) {
  const [refundOpen, setRefundOpen] = useState(false);

  const refundableAmount = payment.amount - payment.refundedAmount;

  const canRefund = payment.status === "SUCCESS" && refundableAmount > 0;

  return (
    <div className="space-y-6">
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

          <div className="flex justify-between">
            <span className="text-muted-foreground">Provider</span>

            <span className="capitalize">{payment.provider}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Amount</span>

            <span>{formatAmount(payment.amount)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Refunded</span>

            <span>{formatAmount(payment.refundedAmount)}</span>
          </div>

          <div className="flex justify-between border-t pt-3">
            <span className="font-medium">Remaining Refundable</span>

            <span className="font-semibold">
              {formatAmount(refundableAmount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>

            <span className="font-semibold">{payment.status}</span>
          </div>
        </div>
      </div>

      {canRefund && (
        <Button type="button" onClick={() => setRefundOpen(true)}>
          Refund Payment
        </Button>
      )}

      <RefundPaymentDialog
        payment={payment}
        open={refundOpen}
        onOpenChange={setRefundOpen}
      />
    </div>
  );
}
