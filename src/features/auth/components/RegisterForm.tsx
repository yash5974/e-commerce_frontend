import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";

import { Button } from "@/ui/button";
import { CardContent, CardFooter } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useRegister } from "../hooks/useRegister";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { register: registerUser, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    const response = await registerUser(values);

    if (!response) return;

    reset();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <CardContent className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>

          <Input
            id="name"
            placeholder="John Doe"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

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
          autoComplete="new-password"
          error={errors.password}
          {...register("password")}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register("confirmPassword")}
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-5">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}
