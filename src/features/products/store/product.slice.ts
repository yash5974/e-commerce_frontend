import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { productService } from "../services/product.service";

import type { Product } from "../types/product.type";

interface ProductState {
  currentProduct: Product | null;

  isDeleting: boolean;

  createError: string | null;
  updateError: string | null;
  deleteError: string | null;
}

const initialState: ProductState = {
  currentProduct: null,

  isDeleting: false,

  createError: null,
  updateError: null,
  deleteError: null,
};

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("product/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await productService.delete(id);

    return id;
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

function getApiErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    return (
      axiosError.response?.data?.message ??
      "Something went wrong. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },

    clearProductErrors(state) {
      state.createError = null;
      state.updateError = null;
    },

    clearDeleteError(state) {
      state.deleteError = null;
    },

    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleting = false;

        if (state.currentProduct?._id === action.payload) {
          state.currentProduct = null;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload ?? "Failed to delete product.";
      });
  },
});

export const {
  clearCurrentProduct,
  clearProductErrors,
  setCurrentProduct,
  clearDeleteError,
} = productSlice.actions;

export default productSlice.reducer;
