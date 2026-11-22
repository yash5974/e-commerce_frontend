import {
  getProductDetailsApi,
  getProductsApi,
  productApi,
} from "../api/product.api";
import { productFiltersSchema } from "../schemas/product.schema";
import type {
  Product,
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

export const productService = {
  async getById(id: string): Promise<Product> {
    const response = await productApi.getById(id);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await productApi.delete(id);
  },
};
