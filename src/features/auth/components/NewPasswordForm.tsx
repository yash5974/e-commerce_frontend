import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

import { useNewPassword } from "../hooks/useNewPassword";
import {
  newPasswordSchema,
  type NewPasswordFormValues,
} from "../schemas/password.schema";
import PasswordInput from "./PasswordInput";

interface NewPasswordFormProps {
  userId: string;
}

export default function NewPasswordForm({ userId }: NewPasswordFormProps) {
  const navigate = useNavigate();

  const { isUpdating, error, updatePassword, clearError } = useNewPassword();

  const { register, handleSubmit } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: NewPasswordFormValues): Promise<void> => {
    clearError();

    const success = await updatePassword({
      userId,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });

    if (!success) {
      return;
    }

    navigate("/login", {
      replace: true,
      state: {
        message:
          "Password reset successfully. Please log in with your new password.",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <PasswordInput
        id="newPassword"
        label="New Password"
        placeholder="Enter your new password"
        autoComplete="new-password"
        // error={errors.newPassword?.message}
        {...register("newPassword")}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        // error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isUpdating}>
        {isUpdating ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
}
