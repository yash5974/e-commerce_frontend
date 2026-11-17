export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface CategoryListResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export type CategoryStatus = "idle" | "loading" | "succeeded" | "failed";
