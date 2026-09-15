import { z } from "zod";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format.")
  .optional();

export const salesAnalyticsSchema = z
  .object({
    from: z.string().optional(),
    to: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) {
        return true;
      }

      return new Date(data.from) <= new Date(data.to);
    },
    {
      message: "From date must be before or equal to the To date.",
      path: ["to"],
    },
  );

export const revenueAnalyticsSchema = z
  .object({
    from: z.string().optional(),
    to: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) {
        return true;
      }

      return new Date(data.from) <= new Date(data.to);
    },
    {
      message: "From date must be before or equal to the To date.",
      path: ["to"],
    },
  );

export const topProductsAnalyticsSchema = z
  .object({
    from: dateSchema,
    to: dateSchema,
    limit: z.coerce
      .number()
      .int("Limit must be a whole number.")
      .min(1, "Limit must be at least 1.")
      .max(50, "Limit cannot exceed 50.")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) {
        return true;
      }

      return data.from <= data.to;
    },
    {
      message: "From date must be before or equal to the To date.",
      path: ["to"],
    },
  );

export type SalesAnalyticsFormValues = z.infer<typeof salesAnalyticsSchema>;

export type RevenueAnalyticsFormValues = z.infer<typeof revenueAnalyticsSchema>;

export type TopProductsAnalyticsFormValues = z.infer<
  typeof topProductsAnalyticsSchema
>;
