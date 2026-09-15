import { useCallback, useState } from "react";
import { toast } from "sonner";
import { verifyOtp } from "../services/password.service";
import { useNavigate } from "react-router-dom";

interface VerifyOtpInput {
  email: string;
  otp: number;
}

interface UseVerifyOtpResult {
  isVerifying: boolean;
  error: string | null;
  resetToken: string | null;
  verify: (payload: VerifyOtpInput) => Promise<boolean>;
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
      "Unable to verify OTP. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to verify OTP. Please try again.";
};

export const useVerifyOtp = (): UseVerifyOtpResult => {
  const navigate = useNavigate();

  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const verify = useCallback(
    async (payload: VerifyOtpInput): Promise<boolean> => {
      setIsVerifying(true);
      setError(null);

      try {
        const response = await verifyOtp(payload);

        if (!response.success) {
          const message = response.message || "OTP verification failed.";

          setError(message);
          toast.error(message);

          return false;
        }
        console.log("response: ", response);

        setResetToken(response.result?.resetToken ?? null);
        toast.success(response.message || "OTP verified successfully.");
        console.log("response: ", response);
        navigate("/new-password", {
          state: {
            userId: response.result?.userId,
          },
        });

        return true;
      } catch (error: unknown) {
        const message = getErrorMessage(error);

        setError(message);
        toast.error(message);

        return false;
      } finally {
        setIsVerifying(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isVerifying,
    error,
    resetToken,
    verify,
    clearError,
  };
};
