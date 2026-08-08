import { getProductDetailsApi, getProductsApi } from "../api/product.api";
import { productFiltersSchema } from "../schemas/product.schema";
import type {
  ProductDetailsResponse,
  ProductFilters,
  ProductListResponse,
} from "../types/product.type";

export const getProducts = async (
  filters: ProductFilters,
): Promise<ProductListResponse> => {
  const validatedFilters = productFiltersSchema.parse({
    ...filters,
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
    sort: filters.sort ?? "newest",
  });

  return getProductsApi(validatedFilters);
};

export const getProductDetails = async (
  id: string,
): Promise<ProductDetailsResponse> => {
  if (!id.trim()) {
    throw new Error("Product ID is required.");
  }

  return getProductDetailsApi(id);
};
