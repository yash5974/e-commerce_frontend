import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .transform((value) => value.trim().toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password cannot exceed 128 characters."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
