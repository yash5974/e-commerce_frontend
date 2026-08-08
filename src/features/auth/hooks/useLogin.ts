import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import tokenStorage from "@/api/storage";

import type { AppDispatch } from "@/app/store";
import type { RouteState } from "@/route/types";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { setUser } from "../store/auth.slice";
import type {
  ApiErrorResponse,
  IUserRole,
  LoginFormValues,
  LoginResponse,
} from "../types/auth.type";

interface UseLoginReturn {
  isLoading: boolean;
  login: (values: LoginFormValues) => Promise<LoginResponse | null>;
}

export interface JwtPayload {
  exp: number;
  iat: number;
  role: IUserRole;
  userId: string;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const routeState = location.state as RouteState | null;
  const from = routeState?.from;

  const redirectTo = from ? `${from.pathname}${from.search}${from.hash}` : "/";

  const login = useCallback(
    async (values: LoginFormValues): Promise<LoginResponse | null> => {
      setIsLoading(true);

      try {
        const response = await loginUser(values);
        const user = response.data.user;

        const { accessToken, refreshToken } = response.data;

        tokenStorage.setAccessToken(accessToken);
        tokenStorage.setRefreshToken(refreshToken);

        const decoded = await jwtDecode<JwtPayload>(response.data.accessToken);

        const userInfo = {
          ...user,
          role: decoded.role,
        };

        dispatch(setUser({ user: userInfo }));

        toast.success(response.message);

        navigate(redirectTo, {
          replace: true,
        });

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
    [dispatch, navigate, redirectTo],
  );

  return {
    isLoading,
    login,
  };
};
