import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters.")
      .max(80, "Name must contain at most 80 characters."),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(254, "Email address is too long."),
  })
  .strict();

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
