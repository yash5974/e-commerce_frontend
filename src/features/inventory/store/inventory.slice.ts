import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { inventoryService } from "../services/inventory.service";

import type {
  InventoryLogType,
  UpdateInventoryResponse,
} from "../types/inventory.type";

interface InventoryState {
  isUpdating: boolean;
  updatedInventory: UpdateInventoryResponse["data"] | null;
  error: string | null;
}

const initialState: InventoryState = {
  isUpdating: false,
  updatedInventory: null,
  error: null,
};

export const updateInventory = createAsyncThunk<
  UpdateInventoryResponse["data"],
  {
    productId: string;
    quantity: number;
    type: InventoryLogType;
  },
  {
    rejectValue: string;
  }
>(
  "inventory/updateInventory",
  async ({ productId, quantity, type }, { rejectWithValue }) => {
    try {
      const response = await inventoryService.updateInventory(productId, {
        quantity,
        type,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ??
          error.response?.data?.message ??
          "Failed to update inventory.";

        return rejectWithValue(message);
      }

      return rejectWithValue("Failed to update inventory.");
    }
  },
);

const inventorySlice = createSlice({
  name: "inventory",

  initialState,

  reducers: {
    clearInventoryError: (state) => {
      state.error = null;
    },

    clearUpdatedInventory: (state) => {
      state.updatedInventory = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateInventory.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })

      .addCase(
        updateInventory.fulfilled,
        (state, action: PayloadAction<UpdateInventoryResponse["data"]>) => {
          state.isUpdating = false;
          state.updatedInventory = action.payload;
          state.error = null;
        },
      )

      .addCase(updateInventory.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload ?? "Failed to update inventory.";
      });
  },
});

export const { clearInventoryError, clearUpdatedInventory } =
  inventorySlice.actions;

export default inventorySlice.reducer;
