import { z } from "zod";

export const productFiltersSchema = z
  .object({
    search: z.string().trim().max(100).optional(),

    categoryId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, "Invalid category ID")
      .optional(),

    brand: z.string().trim().max(100).optional(),

    minPrice: z.number().min(0, "Minimum price cannot be negative").optional(),

    maxPrice: z.number().min(0, "Maximum price cannot be negative").optional(),

    minRating: z.number().min(0).max(5).optional(),

    inStock: z.boolean().optional(),

    tags: z.array(z.string().trim().min(1)).max(20).optional(),

    sort: z
      .enum(["newest", "price_asc", "price_desc", "rating", "name", "discount"])
      .default("newest"),

    page: z.number().int().min(1).default(1),

    limit: z.number().int().min(1).max(100).default(12),
  })
  .refine(
    (value) =>
      value.minPrice === undefined ||
      value.maxPrice === undefined ||
      value.minPrice <= value.maxPrice,
    {
      message: "Minimum price cannot exceed maximum price",
      path: ["minPrice"],
    },
  );

export type ProductFiltersInput = z.input<typeof productFiltersSchema>;
export type ProductFiltersOutput = z.output<typeof productFiltersSchema>;
