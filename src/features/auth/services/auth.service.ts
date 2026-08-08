import { loginApi, logoutApi, registerApi } from "../api/auth.api";

import type {
  LoginFormValues,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterFormValues,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.type";

/**
 * Register
 */
export const registerUser = async (
  values: RegisterFormValues,
): Promise<RegisterResponse> => {
  const payload: RegisterRequest = {
    name: values.name.trim(),
    email: values.email,
    password: values.password,
  };

  return registerApi(payload);
};

/**
 * Login
 */
export const loginUser = async (
  values: LoginFormValues,
): Promise<LoginResponse> => {
  const payload: LoginRequest = {
    email: values.email,
    password: values.password,
  };

  return loginApi(payload);
};

export const logoutUser = async (
  refreshToken: string,
): Promise<LogoutResponse> => {
  const payload: LogoutRequest = {
    refreshToken,
  };

  return logoutApi(payload);
};
