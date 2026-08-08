import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";
import type { GetCurrentUserResponse } from "../types/profile.type";

/**
 * Get Current User
 */
export const getCurrentUserApi = (): Promise<GetCurrentUserResponse> => {
  return apiClient.get<GetCurrentUserResponse>(API_ENDPOINTS.AUTH.ME);
};
