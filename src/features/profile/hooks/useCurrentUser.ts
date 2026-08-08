import type { ApiErrorResponse } from "@/features/auth";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "../services/profile.service";
import type { CurrentUser } from "../types/profile.type";

interface UseCurrentUserReturn {
  isLoading: boolean;
  user: CurrentUser | null;
  fetchCurrentUser: () => Promise<CurrentUser | null>;
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const fetchCurrentUser =
    useCallback(async (): Promise<CurrentUser | null> => {
      setIsLoading(true);

      try {
        const response = await getCurrentUser();

        setUser(response.data);

        return response.data;
      } catch (error) {
        let message = "Something went wrong. Please try again.";

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          message = error.response?.data?.message ?? message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);

        setUser(null);

        return null;
      } finally {
        setIsLoading(false);
      }
    }, []);

  return {
    isLoading,
    user,
    fetchCurrentUser,
  };
};
