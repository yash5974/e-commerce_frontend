import { useCallback, useState } from "react";
import { forgotPassword } from "../services/password.service";
import { AxiosError } from "axios";

interface UseForgotPasswordReturn {
  isSubmitting: boolean;
  error: string | null;
  successMessage: string | null;
  submitForgotPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitForgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await forgotPassword({
          email,
        });

        setSuccessMessage(response.message);

        return true;
      } catch (error: unknown) {
        const message =
          error instanceof AxiosError
            ? error.message
            : "Unable to process your request.";

        setError(message);

        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  return {
    isSubmitting,
    error,
    successMessage,
    submitForgotPassword,
    clearError,
    clearSuccess,
  };
};
