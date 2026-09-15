import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  createOrderService,
  getMyOrdersService,
  getOrderDetailsService,
  orderService,
} from "../services/order.service";

import axios from "axios";
import type {
  AdminOrder,
  CreateOrderRequest,
  Order,
  UpdateOrderStatusRequest,
} from "../types/order.type";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isCreating: boolean;
  isLoadingOrders: boolean;
  isLoadingDetails: boolean;
  isUpdatingStatus: boolean;
  ordersRequestStatus: "idle" | "pending" | "fulfilled" | "rejected";
  updatedOrder: AdminOrder | null;
  error: string | null;
  createError: string | null;
  ordersError: string | null;
  detailsError: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  isCreating: false,
  isLoadingOrders: false,
  isLoadingDetails: false,
  isUpdatingStatus: false,
  ordersRequestStatus: "idle",
  updatedOrder: null,
  error: null,
  createError: null,
  ordersError: null,
  detailsError: null,
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

/**
 * CREATE ORDER
 */
export const createOrder = createAsyncThunk<
  Order,
  CreateOrderRequest,
  { rejectValue: string }
>("orders/createOrder", async (payload, { rejectWithValue }) => {
  try {
    return await createOrderService(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * GET MY ORDERS
 */
export const fetchMyOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    return await getMyOrdersService();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/**
 * GET ORDER DETAILS
 */
export const fetchOrderDetails = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    return await getOrderDetailsService(orderId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateOrderStatus = createAsyncThunk<
  AdminOrder,
  {
    orderId: string;
    status: UpdateOrderStatusRequest["status"];
  },
  {
    rejectValue: string;
  }
>(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await orderService.updateOrderStatus(orderId, {
        status,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ??
          error.response?.data?.message ??
          "Failed to update order status.";

        return rejectWithValue(message);
      }

      return rejectWithValue("Failed to update order status.");
    }
  },
);

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearCreateOrderError(state) {
      state.createError = null;
    },

    clearOrdersError(state) {
      state.ordersError = null;
    },

    clearOrderDetailsError(state) {
      state.detailsError = null;
    },

    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },

    clearOrderMutationError: (state) => {
      state.error = null;
    },

    clearUpdatedOrder: (state) => {
      state.updatedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================================================
      // CREATE ORDER
      // =========================================================

      .addCase(createOrder.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })

      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isCreating = false;

        state.orders.unshift(action.payload);

        state.selectedOrder = action.payload;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.isCreating = false;

        state.createError = action.payload ?? "Unable to create order.";
      })

      // =========================================================
      // GET MY ORDERS
      // =========================================================

      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.ordersRequestStatus = "pending";
        state.ordersError = null;
      })
      .addCase(
        fetchMyOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoadingOrders = false;
          state.ordersRequestStatus = "fulfilled";
          state.orders = action.payload;
        },
      )
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;
        state.ordersRequestStatus = "rejected";
        state.ordersError = action.payload ?? "Unable to load orders.";
      })

      // =========================================================
      // GET ORDER DETAILS
      // =========================================================

      .addCase(fetchOrderDetails.pending, (state) => {
        state.isLoadingDetails = true;
        state.detailsError = null;
        state.selectedOrder = null;
      })

      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.isLoadingDetails = false;
          state.selectedOrder = action.payload;
        },
      )

      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;

        state.detailsError = action.payload ?? "Unable to load order.";
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.isUpdatingStatus = true;
        state.error = null;
      })

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<AdminOrder>) => {
          state.isUpdatingStatus = false;
          state.updatedOrder = action.payload;
          state.error = null;
        },
      )

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        state.error = action.payload ?? "Failed to update order status.";
      });
  },
});

export const {
  clearCreateOrderError,
  clearOrdersError,
  clearOrderDetailsError,
  clearSelectedOrder,
  clearOrderMutationError,
  clearUpdatedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
