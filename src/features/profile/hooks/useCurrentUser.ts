import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import type { ApiErrorResponse } from "@/features/auth";

import { getCurrentUser, updateProfile } from "../services/profile.service";

import type { CurrentUser, UpdateProfileRequest } from "../types/profile.type";

interface UseCurrentUserReturn {
  isLoading: boolean;
  isUpdating: boolean;
  user: CurrentUser | null;
  fetchCurrentUser: () => Promise<CurrentUser | null>;
  updateCurrentUser: (
    payload: UpdateProfileRequest,
  ) => Promise<CurrentUser | null>;
}

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const fetchCurrentUser =
    useCallback(async (): Promise<CurrentUser | null> => {
      setIsLoading(true);

      try {
        const response = await getCurrentUser();

        setUser(response.data);

        return response.data;
      } catch (error: unknown) {
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

  const updateCurrentUser = useCallback(
    async (payload: UpdateProfileRequest): Promise<CurrentUser | null> => {
      setIsUpdating(true);

      try {
        const response = await updateProfile(payload);

        setUser(response.data);

        toast.success(response.message);

        return response.data;
      } catch (error: unknown) {
        let message = "Unable to update your profile. Please try again.";

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          message = error.response?.data?.message ?? message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);

        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [],
  );

  return {
    isLoading,
    isUpdating,
    user,
    fetchCurrentUser,
    updateCurrentUser,
  };
};
