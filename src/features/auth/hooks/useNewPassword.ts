import { useCallback, useState } from "react";
import { toast } from "sonner";
import type {
  NewPasswordRequest,
  NewPasswordResponse,
} from "../types/password.type";
import { newPassword } from "../services/password.service";

interface UseNewPasswordResult {
  isUpdating: boolean;
  error: string | null;
  response: NewPasswordResponse | null;
  updatePassword: (payload: NewPasswordRequest) => Promise<boolean>;
  clearError: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    return (
      axiosError.response?.data?.message ??
      "Unable to reset your password. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to reset your password. Please try again.";
};

export const useNewPassword = (): UseNewPasswordResult => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<NewPasswordResponse | null>(null);

  const updatePassword = useCallback(
    async (payload: NewPasswordRequest): Promise<boolean> => {
      setIsUpdating(true);
      setError(null);
      setResponse(null);

      try {
        const result = await newPassword(payload);

        if (!result.success) {
          const message = result.message || "Unable to reset your password.";

          setError(message);
          toast.error(message);

          return false;
        }

        setResponse(result);

        toast.success(
          result.message || "Password has been reset successfully.",
        );

        return true;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        setError(message);
        toast.error(message);

        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isUpdating,
    error,
    response,
    updatePassword,
    clearError,
  };
};
