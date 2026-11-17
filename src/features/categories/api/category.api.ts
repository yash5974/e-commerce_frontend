import api from "@/api/axios";
import API_ENDPOINTS from "@/api/endpoints";

import type { CategoryListResponse } from "../types/category.type";

export const getCategoriesApi = async (
  signal?: AbortSignal,
): Promise<CategoryListResponse> => {
  const response = await api.get<CategoryListResponse>(
    API_ENDPOINTS.ADMIN.CATEGORIES.LIST,
    { signal },
  );

  if (!response.data.success || !Array.isArray(response.data.data)) {
    throw new Error("Invalid categories response.");
  }

  return response.data;
};
