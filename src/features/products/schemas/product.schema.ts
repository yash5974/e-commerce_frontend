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

// const baseProductSchema = z
//   .object({
//     name: z
//       .string()
//       .trim()
//       .min(2, "Product name must contain at least 2 characters")
//       .max(150, "Product name cannot exceed 150 characters"),

//     description: z
//       .string()
//       .trim()
//       .min(10, "Description must contain at least 10 characters")
//       .max(5000, "Description cannot exceed 5000 characters"),

//     categoryId: z.string().trim().min(1, "Category is required"),

//     brand: z
//       .string()
//       .trim()
//       .min(2, "Brand must contain at least 2 characters")
//       .max(100, "Brand cannot exceed 100 characters"),

//     price: z
//       .number({
//         error: "Price is required",
//       })
//       .finite("Price must be a valid number")
//       .positive("Price must be greater than 0"),

//     discountPrice: z
//       .number({
//         error: "Discount price is required",
//       })
//       .finite("Discount price must be a valid number")
//       .min(0, "Discount price cannot be negative"),

//     stock: z
//       .number({
//         error: "Stock is required",
//       })
//       .int("Stock must be a whole number")
//       .min(0, "Stock cannot be negative"),

//     mainImage: z.string().trim().url("Main image must be a valid URL"),

//     galleryImages: z
//       .array(z.string().trim().url("Gallery image must be a valid URL"))
//       .max(10, "Maximum 10 gallery images are allowed"),

//     tags: z
//       .array(
//         z
//           .string()
//           .trim()
//           .min(1, "Tag cannot be empty")
//           .max(50, "Tag cannot exceed 50 characters"),
//       )
//       .max(20, "Maximum 20 tags are allowed"),

//     isActive: z.boolean(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.discountPrice > data.price) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["discountPrice"],
//         message: "Discount price cannot be greater than price",
//       });
//     }
//   });

// export const createProductSchema = baseProductSchema.omit({
//   isActive: true,
// });

// export const updateProductSchema = baseProductSchema.partial();

const productShape = {
  name: z
    .string()
    .trim()
    .min(2, "Product name must contain at least 2 characters")
    .max(150, "Product name cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(5000, "Description cannot exceed 5000 characters"),

  categoryId: z.string().trim().min(1, "Category is required"),

  brand: z
    .string()
    .trim()
    .min(2, "Brand must contain at least 2 characters")
    .max(100, "Brand cannot exceed 100 characters"),

  price: z
    .number({
      error: "Price is required",
    })
    .finite("Price must be a valid number")
    .positive("Price must be greater than 0"),

  discountPrice: z
    .number({
      error: "Discount price is required",
    })
    .finite("Discount price must be a valid number")
    .min(0, "Discount price cannot be negative"),

  stock: z
    .number({
      error: "Stock is required",
    })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  mainImage: z.string().trim().url("Main image must be a valid URL"),

  galleryImages: z
    .array(z.string().trim().url("Gallery image must be a valid URL"))
    .max(10, "Maximum 10 gallery images are allowed"),

  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tag cannot be empty")
        .max(50, "Tag cannot exceed 50 characters"),
    )
    .max(20, "Maximum 20 tags are allowed"),

  isActive: z.boolean(),
};

const validateProductPrices = (
  data: z.infer<z.ZodObject<typeof productShape>>,
  ctx: z.RefinementCtx,
) => {
  if (data.discountPrice > data.price) {
    ctx.addIssue({
      code: "custom",
      path: ["discountPrice"],
      message: "Discount price cannot be greater than price",
    });
  }
};

export const baseProductSchema = z
  .object(productShape)
  .superRefine(validateProductPrices);

export const createProductSchema = z
  .object(productShape)
  .omit({
    isActive: true,
  })
  .superRefine(validateProductPrices);

export const updateProductSchema = z
  .object(productShape)
  .partial()
  .superRefine((data, ctx) => {
    // Only validate the price relationship when both values are provided
    if (
      data.price !== undefined &&
      data.discountPrice !== undefined &&
      data.discountPrice > data.price
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price cannot be greater than price",
      });
    }
  });

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

export type ProductFiltersInput = z.input<typeof productFiltersSchema>;
export type ProductFiltersOutput = z.output<typeof productFiltersSchema>;
