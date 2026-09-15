import {
  getProductDetailsApi,
  getProductsApi,
  productApi,
} from "../api/product.api";
import { productFiltersSchema } from "../schemas/product.schema";
import type {
  CreateProductPayload,
  Product,
  ProductDetailsResponse,
  ProductFilters,
  ProductListResponse,
  UpdateProductPayload,
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
  async create(payload: CreateProductPayload): Promise<Product> {
    const response = await productApi.create(payload);

    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await productApi.getById(id);
    return response.data;
  },

  async update(id: string, payload: UpdateProductPayload): Promise<Product> {
    const response = await productApi.update(id, payload);

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await productApi.delete(id);
  },
};
