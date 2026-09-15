import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import { useVerifyOtp } from "../hooks/useResetPassword";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "../schemas/password.schema";
import { toast } from "sonner";

interface LocationState {
  email?: string;
}

export default function OtpVerificationForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const email = state?.email ?? "";

  const { isVerifying, error, verify, clearError, resetToken } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  useEffect(() => {
    if (!resetToken) {
      return;
    }

    navigate("/new-password", {
      replace: true,
      state: {
        email,
        resetToken,
      },
    });
  }, [email, navigate, resetToken]);

  const onSubmit = async (values: VerifyOtpFormValues): Promise<void> => {
    clearError();

    const otp = Number(values.otp);

    const payload = {
      email: values.email.trim().toLowerCase(),
      otp,
    };

    const response = await verify(payload);
    if (!response) {
      return;
    }

    toast.success("OTP sent successfully.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>

        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          {...register("otp")}
          onChange={(event) => {
            const value = event.target.value.replace(/\D/g, "").slice(0, 6);

            setValue("otp", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
        />

        {errors.otp && (
          <p className="text-sm text-destructive">{errors.otp.message}</p>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}
