import { useCallback, useState } from "react";

import { createPaymentIntentService } from "../services/payment.service";
import type { PaymentIntent, PaymentProvider } from "../types/payment.type";

interface UseCreatePaymentIntentReturn {
  intent: PaymentIntent | null;
  isCreatingIntent: boolean;
  error: string | null;

  createIntent: (
    orderId: string,
    provider: PaymentProvider,
  ) => Promise<PaymentIntent | null>;

  dismissError: () => void;
  reset: () => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to initialize payment. Please try again.";
}

export function useCreatePaymentIntent(): UseCreatePaymentIntentReturn {
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIntent = useCallback(
    async (
      orderId: string,
      provider: PaymentProvider,
    ): Promise<PaymentIntent | null> => {
      setIsCreatingIntent(true);
      setError(null);

      try {
        const result = await createPaymentIntentService({
          orderId,
          provider,
        });

        setIntent(result);

        return result;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        setError(message);
        setIntent(null);

        return null;
      } finally {
        setIsCreatingIntent(false);
      }
    },
    [],
  );

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIntent(null);
    setError(null);
    setIsCreatingIntent(false);
  }, []);

  return {
    intent,
    isCreatingIntent,
    error,
    createIntent,
    dismissError,
    reset,
  };
}
