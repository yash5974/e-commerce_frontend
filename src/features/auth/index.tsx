/**
 * Pages
 */
export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";

/**
 * Components
 */
export { default as AuthCard } from "./components/AuthCard";
export { default as LoginForm } from "./components/LoginForm";
export { default as PasswordInput } from "./components/PasswordInput";
export { default as RegisterForm } from "./components/RegisterForm";

/**
 * Hooks
 */
export { useLogin } from "./hooks/useLogin";
export { useLogout } from "./hooks/useLogout";
export { useRegister } from "./hooks/useRegister";

/**
 * Schemas
 */
export { loginSchema } from "./schemas/login.schema";
export { registerSchema } from "./schemas/register.schema";

export type { LoginSchema } from "./schemas/login.schema";
export type { RegisterSchema } from "./schemas/register.schema";

/**
 * Types
 */
export type {
  ApiErrorResponse,
  LoginFormValues,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterFormValues,
  RegisterRequest,
  RegisterResponse,
  User,
} from "./types/auth.type";
