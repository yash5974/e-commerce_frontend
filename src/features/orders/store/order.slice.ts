import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  createOrderService,
  getMyOrdersService,
  getOrderDetailsService,
} from "../services/order.service";

import type { CreateOrderRequest, Order } from "../types/order.type";

interface OrderState {
  orders: Order[];

  selectedOrder: Order | null;

  isCreating: boolean;
  isLoadingOrders: boolean;
  isLoadingDetails: boolean;

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
        state.ordersError = null;
      })

      .addCase(
        fetchMyOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoadingOrders = false;
          state.orders = action.payload;
        },
      )

      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoadingOrders = false;

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
      });
  },
});

export const {
  clearCreateOrderError,
  clearOrdersError,
  clearOrderDetailsError,
  clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
