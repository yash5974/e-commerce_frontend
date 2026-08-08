import { getCurrentUserApi } from "../api/profile.api";
import type { GetCurrentUserResponse } from "../types/profile.type";

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  return getCurrentUserApi();
};
