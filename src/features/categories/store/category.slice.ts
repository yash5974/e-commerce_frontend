import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategoriesApi } from "../api/category.api";

import type { Category, CategoryStatus } from "../types/category.type";

import type { RootState } from "@/app/store";

interface CategoryState {
  categories: Category[];
  status: CategoryStatus;
  error: string | null;
  lastFetchedAt: number | null;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
  lastFetchedAt: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  { force?: boolean } | undefined,
  { state: RootState; rejectValue: string }
>(
  "category/fetchCategories",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await getCategoriesApi(signal);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Unable to fetch categories.");
    }
  },
  {
    condition: (arg, { getState }) => {
      const { status } = getState().category;

      if (arg?.force) {
        return status !== "loading";
      }

      return status === "idle";
    },
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryError(state) {
      state.error = null;
    },

    resetCategories(state) {
      state.categories = [];
      state.status = "idle";
      state.error = null;
      state.lastFetchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        // A condition rejection means the request was intentionally skipped.
        if (action.meta.condition) {
          return;
        }

        state.status = "failed";
        state.error = action.payload ?? "Unable to fetch categories.";
      });
  },
});

export const { clearCategoryError, resetCategories } = categorySlice.actions;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoryStatus = (state: RootState) => state.category.status;
export const selectCategoryError = (state: RootState) => state.category.error;

export default categorySlice.reducer;
