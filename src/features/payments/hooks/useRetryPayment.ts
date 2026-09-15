import { useCallback, useState } from "react";

import { retryPaymentService } from "../services/payment.service";
import type { Payment, PaymentProvider } from "../types/payment.type";

export function useRetryPayment() {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const retryPayment = useCallback(
    async (
      paymentId: string,
      provider: PaymentProvider,
    ): Promise<Payment | null> => {
      setIsRetrying(true);
      setError(null);

      try {
        const retryPayment = await retryPaymentService.retryPayment(
          paymentId,
          provider,
        );

        setPayment(retryPayment);

        return retryPayment;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unable to retry payment";

        setError(message);

        return null;
      } finally {
        setIsRetrying(false);
      }
    },
    [],
  );

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    payment,
    isRetrying,
    error,
    retryPayment,
    dismissError,
  };
}
