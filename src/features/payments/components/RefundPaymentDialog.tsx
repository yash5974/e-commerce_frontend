import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, RotateCcw } from "lucide-react";

import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

import { useRefundPayment } from "../hooks/useRefundPayment";

import {
  refundPaymentSchema,
  type RefundPaymentFormValues,
} from "../schemas/payment.schema";

import type { Payment } from "../types/payment.type";

interface RefundPaymentDialogProps {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export default function RefundPaymentDialog({
  payment,
  open,
  onOpenChange,
  onSuccess,
}: RefundPaymentDialogProps) {
  const form = useForm<RefundPaymentFormValues>({
    resolver: zodResolver(refundPaymentSchema),

    defaultValues: {
      amount: undefined,
      reason: "",
    },
  });

  const { isRefunding, error, refundPayment, reset } = useRefundPayment();

  const refundableAmount = Math.max(payment.amount - payment.refundedAmount, 0);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isRefunding) {
      return;
    }

    if (!nextOpen) {
      form.reset();
      reset();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = async (values: RefundPaymentFormValues) => {
    try {
      await refundPayment({
        paymentId: payment.paymentId,

        payload: {
          ...(values.amount !== undefined
            ? {
                amount: Number(values.amount.toFixed(2)),
              }
            : {}),

          reason: values.reason.trim(),
        },
      });

      form.reset();

      onOpenChange(false);

      onSuccess?.();
    } catch {
      // Mutation error is already exposed through `error`.
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="size-5" />
            Refund Payment
          </DialogTitle>

          <DialogDescription>
            Refund all or part of this successful payment. The refund is
            processed through the original payment provider.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">Payment ID</span>

            <span className="max-w-[60%] truncate font-mono text-sm">
              {payment.paymentId}
            </span>
          </div>

          <div className="mt-3 flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">Provider</span>

            <span className="font-medium capitalize">{payment.provider}</span>
          </div>

          <div className="mt-3 flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Payment Amount
            </span>

            <span className="font-semibold">
              {formatAmount(payment.amount)}
            </span>
          </div>

          <div className="mt-3 flex justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Already Refunded
            </span>

            <span>{formatAmount(payment.refundedAmount)}</span>
          </div>

          <div className="mt-3 flex justify-between gap-4 border-t pt-3">
            <span className="text-sm font-medium">Remaining Refundable</span>

            <span className="font-semibold">
              {formatAmount(refundableAmount)}
            </span>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="refund-amount">Refund Amount</Label>

            <Input
              id="refund-amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              max={refundableAmount}
              step="0.01"
              placeholder="Leave empty for full refund"
              disabled={isRefunding}
              {...form.register("amount", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />

            <p className="text-xs text-muted-foreground">
              Leave empty to refund the remaining refundable amount.
            </p>

            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund-reason">Refund Reason</Label>

            <Textarea
              id="refund-reason"
              placeholder="Enter the reason for this refund"
              rows={4}
              maxLength={500}
              disabled={isRefunding}
              {...form.register("reason")}
            />

            {form.formState.errors.reason && (
              <p className="text-sm text-destructive">
                {form.formState.errors.reason.message}
              </p>
            )}
          </div>

          {error && (
            <div
              className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
              role="alert"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

              <div className="min-w-0">
                <p className="font-medium text-destructive">Refund failed</p>

                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isRefunding}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isRefunding ||
                payment.status !== "SUCCESS" ||
                refundableAmount <= 0
              }
            >
              {isRefunding && <Loader2 className="mr-2 size-4 animate-spin" />}

              {isRefunding ? "Processing Refund..." : "Process Refund"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
