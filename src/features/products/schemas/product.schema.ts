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

export type DeleteProductResponse = ApiResponse<null>;
