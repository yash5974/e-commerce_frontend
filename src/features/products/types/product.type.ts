export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  discountPrice: number;
  stock: number;
  mainImage: string;
  rating: number;
  reviewCount: number;
}

export type ProductSort =
  "newest" | "price_asc" | "price_desc" | "rating" | "name" | "discount";

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  tags?: string[];
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

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

export interface Product {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  discountPrice: number;
  stock: number;
  mainImage: string;
  rating: number;
  reviewCount: number;
}

export interface ProductDetails extends Product {
  description: string;
  categoryId: string;
  galleryImages: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  tags?: string[];
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

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
  data: ProductDetails;
}
