import {
  forgotPasswordApi,
  newPasswordApi,
  verifyOtpApi,
} from "../api/auth.api";

import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  NewPasswordRequest,
  NewPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/password.type";

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  return forgotPasswordApi(payload);
};

export const verifyOtp = async (
  payload: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  return verifyOtpApi(payload);
};

export const newPassword = async (
  payload: NewPasswordRequest,
): Promise<NewPasswordResponse> => {
  return newPasswordApi(payload);
};
