import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/password.schema";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const {
    isSubmitting,
    error,
    successMessage,
    submitForgotPassword,
    clearError,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues): Promise<void> => {
    clearError();

    const success = await submitForgotPassword(values.email);

    if (!success) {
      return;
    }

    toast.success("OTP sent successfully.");

    navigate("/reset-password", {
      state: {
        email: values.email,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-6"
    >
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className="w-full"
          disabled={isSubmitting}
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Back to Login */}
      <div className="flex items-center justify-end">
        <Link to="/login" className="text-sm text-primary hover:underline">
          Sign In
        </Link>
      </div>

      {/* Submit */}
      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending OTP..." : "Forgot Password"}
      </Button>

      {/* Register */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Create one
        </Link>
      </p>

      {error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {error}
        </p>
      )}

      {successMessage && (
        <p role="status" className="text-center text-sm text-green-500">
          {successMessage}
        </p>
      )}
    </form>
  );
}
