import { z } from "zod";

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid ID");

const tagSchema = z
  .string()
  .trim()
  .min(1, "Tag cannot be empty")
  .max(50, "Tag cannot exceed 50 characters");

const productFields = {
  name: z.string().trim().min(1, "Product name is required").max(150),
  description: z.string().trim().min(1, "Description is required").max(5000),
  categoryId: objectIdSchema,
  brand: z.string().trim().min(1, "Brand is required").max(100),
  price: z.number().finite().nonnegative("Price cannot be negative"),
  discountPrice: z
    .number()
    .finite()
    .nonnegative("Discount price cannot be negative"),
  stock: z
    .number()
    .finite()
    .int()
    .nonnegative("Stock must be a non-negative integer"),
  tags: z.array(tagSchema).max(20, "Maximum 20 tags are allowed"),
};

function validatePrices(
  data: { price?: number; discountPrice?: number },
  ctx: z.RefinementCtx,
) {
  // Validate the relationship only when both values are supplied.
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
}

export const createProductSchema = z
  .object({
    ...productFields,
    mainImage: z.instanceof(File, {
      message: "Main image is required",
    }),
    galleryImages: z.array(z.instanceof(File)).max(10),
  })
  .superRefine(validatePrices);

export const updateProductSchema = z
  .object({
    name: productFields.name.optional(),
    description: productFields.description.optional(),
    categoryId: productFields.categoryId.optional(),
    brand: productFields.brand.optional(),
    price: productFields.price.optional(),
    discountPrice: productFields.discountPrice.optional(),
    stock: productFields.stock.optional(),
    mainImage: z.instanceof(File).optional(),
    galleryImages: z.array(z.instanceof(File)).max(10).optional(),
    tags: productFields.tags.optional(),
    isActive: z.boolean().optional(),
  })
  .superRefine(validatePrices);

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

export const productFiltersSchema = z
  .object({
    search: z.string().trim().max(100).optional(),
    categoryId: objectIdSchema.optional(),
    brand: z.string().trim().max(100).optional(),
    minPrice: z.number().finite().nonnegative().optional(),
    maxPrice: z.number().finite().nonnegative().optional(),
    minRating: z.number().finite().min(0).max(5).optional(),
    inStock: z.boolean().optional(),
    tags: z.array(tagSchema).max(20).optional(),
    sort: z
      .enum(["newest", "price_asc", "price_desc", "rating", "name", "discount"])
      .default("newest"),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(12),
  })
  .refine(
    ({ minPrice, maxPrice }) =>
      minPrice === undefined || maxPrice === undefined || minPrice <= maxPrice,
    {
      message: "Minimum price cannot exceed maximum price",
      path: ["minPrice"],
    },
  );

export type ProductFiltersInput = z.input<typeof productFiltersSchema>;
export type ProductFiltersOutput = z.output<typeof productFiltersSchema>;

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  brand: string;
  price: number;
  discountPrice: number;
  stock: number;
  mainImage: string;
  galleryImages: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  // The current backend schema does not enable updatedAt.
}

export type ProductDetails = Product;

export type ProductSort = ProductFiltersOutput["sort"];
export type ProductFilters = ProductFiltersInput;

export interface ProductPaginationMeta {
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  data: Product[];
  meta: ProductPaginationMeta;
}

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const productFormSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required").max(150),
    description: z.string().trim().min(1, "Description is required").max(5000),
    categoryId: z.string().trim().min(1, "Category is required"),
    brand: z.string().trim().min(1, "Brand is required").max(100),
    price: z.number().finite().nonnegative("Price cannot be negative"),
    discountPrice: z
      .number()
      .finite()
      .nonnegative("Discount price cannot be negative"),
    stock: z
      .number()
      .finite()
      .int()
      .nonnegative("Stock must be a non-negative integer"),
    mainImage: z.instanceof(File).optional(),
    galleryImages: z.array(z.instanceof(File)).max(10),
    tags: z
      .array(z.string().trim().min(1, "Tag cannot be empty").max(50))
      .max(20),
  })
  .superRefine((data, ctx) => {
    if (data.discountPrice > data.price) {
      ctx.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price cannot be greater than price",
      });
    }
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type DeleteProductResponse = ApiResponse<null>;
