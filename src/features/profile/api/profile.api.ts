import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";
import type {
  GetCurrentUserResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/profile.type";

/**
 * Get Current User
 */
export const getCurrentUserApi = (): Promise<GetCurrentUserResponse> => {
  return apiClient.get<GetCurrentUserResponse>(API_ENDPOINTS.AUTH.ME);
};

/**
 * Update Current User Profile
 */
export const updateProfileApi = (
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  return apiClient.patch<UpdateProfileResponse, UpdateProfileRequest>(
    API_ENDPOINTS.AUTH.UPDATE_PROFILE,
    payload,
  );
};
