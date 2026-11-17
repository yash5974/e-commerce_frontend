import { useMutation } from "@tanstack/react-query";
import { refundPaymentService } from "../services/payment.service";
import type { Refund, RefundPaymentRequest } from "../types/payment.type";

interface UseRefundPaymentOptions {
  onSuccess?: (refund: Refund) => void;
  onError?: (error: Error) => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to process the refund. Please try again.";
};

export function useRefundPayment(options?: UseRefundPaymentOptions) {
  const mutation = useMutation({
    mutationFn: ({
      paymentId,
      payload,
    }: {
      paymentId: string;
      payload: RefundPaymentRequest;
    }) => refundPaymentService(paymentId, payload),

    onSuccess: (refund) => {
      options?.onSuccess?.(refund);
    },

    onError: (error) => {
      options?.onError?.(new Error(getErrorMessage(error)));
    },
  });

  return {
    refund: mutation.data ?? null,

    isRefunding: mutation.isPending,

    isSuccess: mutation.isSuccess,

    isError: mutation.isError,

    error: mutation.error ? getErrorMessage(mutation.error) : null,

    refundPayment: mutation.mutateAsync,

    reset: mutation.reset,
  };
}
