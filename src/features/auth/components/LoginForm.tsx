import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const response = await login(values);

    if (!response) return;

    reset();

    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <PasswordInput
        id="password"
        label="Password"
        autoComplete="current-password"
        error={errors.password}
        {...register("password")}
      />

      <div className="flex items-center justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
