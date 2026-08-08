import axios from "axios";

interface ApiError {
  message?: string;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    return (
      error.response?.data?.message ?? error.message ?? "Something went wrong."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}
