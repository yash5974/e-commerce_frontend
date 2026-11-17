export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export interface GetCurrentUserResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
}
