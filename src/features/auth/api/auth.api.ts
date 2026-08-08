import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.type";

/**
 * Register
 */
export const registerApi = (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  return apiClient.post<RegisterResponse, RegisterRequest>(
    API_ENDPOINTS.AUTH.REGISTER,
    payload,
  );
};

/**
 * Login
 */
export const loginApi = (payload: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse, LoginRequest>(
    API_ENDPOINTS.AUTH.LOGIN,
    payload,
  );
};

export const logoutApi = (payload: LogoutRequest): Promise<LogoutResponse> => {
  return apiClient.post<LogoutResponse, LogoutRequest>(
    API_ENDPOINTS.AUTH.LOGOUT,
    payload,
  );
};
