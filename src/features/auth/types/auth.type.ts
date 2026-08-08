// import type { Role } from "@/types/auth";

// /**
//  * =========================
//  * Request DTOs
//  * =========================
//  */

// export interface RegisterRequest {
//   name: string;
//   email: string;
//   password: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface RefreshTokenRequest {
//   refreshToken: string;
// }

// export interface LogoutRequest {
//   refreshToken: string;
// }

// /**
//  * =========================
//  * User
//  * =========================
//  */

// export interface CurrentUser {
//   _id: string;
//   name: string;
//   email: string;
//   role: Role;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// /**
//  * =========================
//  * Tokens
//  * =========================
//  */

// export interface AuthTokens {
//   accessToken: string;
//   refreshToken: string;
// }

// /**
//  * =========================
//  * API Responses
//  * =========================
//  */

// export interface RegisterResponse {
//   success: boolean;
//   data: CurrentUser;
// }

// export interface LoginResponse {
//   success: boolean;
//   data: AuthTokens;
// }

// export interface RefreshTokenResponse {
//   success: boolean;
//   data: AuthTokens;
// }

// export interface CurrentUserResponse {
//   success: boolean;
//   message: string;
//   data: CurrentUser;
// }

// export interface LogoutResponse {
//   success: boolean;
// }

// /**
//  * =========================
//  * Redux State
//  * =========================
//  */

// export interface AuthState {
//   user: CurrentUser | null;

//   accessToken: string | null;

//   isAuthenticated: boolean;

//   isLoading: boolean;

//   error: string | null;
// }

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export interface RegisterResponse {
  success: boolean;
  data: User;
}

/**
 * Generic API Error
 * Extend this later if your backend returns
 * validation errors or error codes.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
}

/**
 * React Hook Form values.
 *
 * We keep this separate from RegisterRequest
 * because forms usually contain fields that
 * are never sent to the server.
 */
export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type IUserRole = "USER" | "ADMIN" | null;

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: IUserRole;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
}
