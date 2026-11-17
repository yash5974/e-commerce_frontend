import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  CurrentUser,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/profile.type";

interface GetCurrentUserResponse {
  success: boolean;
  data: CurrentUser;
}

export const getCurrentUser = (): Promise<GetCurrentUserResponse> => {
  return apiClient.get<GetCurrentUserResponse>(API_ENDPOINTS.AUTH.ME);
};

export const updateProfile = (
  payload: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  return apiClient.patch<UpdateProfileResponse, UpdateProfileRequest>(
    API_ENDPOINTS.AUTH.UPDATE_PROFILE,
    payload,
  );
};
