export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// export interface ResetPasswordRequest {
//   token: string;
// }

// export interface ResetPasswordResponse {
//   success: boolean;
//   message: string;
// }

export interface VerifyOtpRequest {
  email: string;
  otp: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  result?: {
    resetToken: string;
    userId: string;
  };
}

export interface NewPasswordRequest {
  userId: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NewPasswordResponse {
  success: boolean;
  message: string;
}
