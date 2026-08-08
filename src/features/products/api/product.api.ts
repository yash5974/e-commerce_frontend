import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  ProductDetailsResponse,
  ProductFilters,
  ProductListResponse,
} from "../types/product.type";

export const getProductsApi = (
  filters: ProductFilters,
): Promise<ProductListResponse> => {
  const params: Record<string, string | number | boolean> = {};

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.categoryId) {
    params.categoryId = filters.categoryId;
  }

  if (filters.brand?.trim()) {
    params.brand = filters.brand.trim();
  }

  if (filters.minPrice !== undefined) {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice !== undefined) {
    params.maxPrice = filters.maxPrice;
  }

  if (filters.minRating !== undefined) {
    params.minRating = filters.minRating;
  }

  if (filters.inStock !== undefined) {
    params.inStock = filters.inStock;
  }

  if (filters.tags?.length) {
    params.tags = filters.tags.join(",");
  }

  if (filters.sort) {
    params.sort = filters.sort;
  }

  params.page = filters.page ?? 1;
  params.limit = filters.limit ?? 12;

  return apiClient.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS.LIST, {
    params,
  });
};

export const getProductDetailsApi = (
  id: string,
): Promise<ProductDetailsResponse> => {
  return apiClient.get<ProductDetailsResponse>(
    API_ENDPOINTS.PRODUCTS.DETAILS(id),
  );
};
