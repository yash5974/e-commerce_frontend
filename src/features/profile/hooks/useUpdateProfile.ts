import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import type { ApiErrorResponse } from "@/features/auth";

import { updateProfile } from "../services/profile.service";
import type { CurrentUser, UpdateProfileRequest } from "../types/profile.type";

interface UseUpdateProfileReturn {
  isUpdating: boolean;
  updateProfileData: (
    payload: UpdateProfileRequest,
  ) => Promise<CurrentUser | null>;
}

export const useUpdateProfile = (): UseUpdateProfileReturn => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfileData = useCallback(
    async (payload: UpdateProfileRequest): Promise<CurrentUser | null> => {
      setIsUpdating(true);

      try {
        const response = await updateProfile(payload);

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
    isUpdating,
    updateProfileData,
  };
};
