import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { productService } from "../services/product.service";

import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "../types/product.type";

interface ProductState {
  currentProduct: Product | null;

  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  createError: string | null;
  updateError: string | null;
  deleteError: string | null;
}

const initialState: ProductState = {
  currentProduct: null,

  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  createError: null,
  updateError: null,
  deleteError: null,
};

export const createProduct = createAsyncThunk<
  Product,
  CreateProductPayload,
  { rejectValue: string }
>("product/createProduct", async (payload, { rejectWithValue }) => {
  try {
    return await productService.create(payload);
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  {
    id: string;
    payload: UpdateProductPayload;
  },
  { rejectValue: string }
>("product/updateProduct", async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await productService.update(id, payload);
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

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

      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.isCreating = false;
        state.currentProduct = action.payload;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload ?? "Failed to create product.";
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentProduct = action.payload;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload ?? "Failed to update product.";
      })

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
