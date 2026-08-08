import axios from "axios";
import { useCallback } from "react";
import { toast } from "sonner";

import tokenStorage from "@/api/storage";

import { logoutUser } from "../services/auth.service";

import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { setLoading, setLogout } from "../store/auth.slice";
import type { ApiErrorResponse, LogoutResponse } from "../types/auth.type";

interface UseLogoutReturn {
  isLoading: boolean;
  logout: () => Promise<LogoutResponse | null>;
}

export const useLogout = (): UseLogoutReturn => {
  const dispatch = useDispatch();

  const { isLoading } = useAppSelector((state) => state.auth);

  const logout = useCallback(async (): Promise<LogoutResponse | null> => {
    dispatch(setLoading(true));

    try {
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        throw new Error("Refresh token not found.");
      }

      const response = await logoutUser(refreshToken);

      tokenStorage.clear();

      dispatch(setLogout());

      toast.success("Logged out successfully.");

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
      dispatch(setLoading(false));
    }
  }, []);

  return {
    isLoading,
    logout,
  };
};
