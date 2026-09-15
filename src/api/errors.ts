import axios from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  const responseData = error.response?.data;

  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (typeof responseData?.error?.message === "string") {
    return responseData.error.message;
  }

  if (typeof error.message === "string" && error.message) {
    return error.message;
  }

  return fallback;
};
