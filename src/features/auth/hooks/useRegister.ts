import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { registerUser } from "../services/auth.service";
import type {
  ApiErrorResponse,
  RegisterFormValues,
  RegisterResponse,
} from "../types/auth.type";

interface UseRegisterReturn {
  isLoading: boolean;
  register: (values: RegisterFormValues) => Promise<RegisterResponse | null>;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(
    async (values: RegisterFormValues): Promise<RegisterResponse | null> => {
      setIsLoading(true);

      try {
        const response = await registerUser(values);

        toast.success("Registration completed successfully.");

        return response;
      } catch (error) {
        let message = "Something went wrong. Please try again.";

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          message = error.response?.data?.message ?? message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    register,
  };
};
