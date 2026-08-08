import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { createPaymentIntentService } from "../services/payment.service";

import type {
  CreatePaymentIntentRequest,
  PaymentIntent,
} from "../types/payment.type";

interface PaymentState {
  intent: PaymentIntent | null;

  isCreatingIntent: boolean;

  intentError: string | null;
}

const initialState: PaymentState = {
  intent: null,

  isCreatingIntent: false,

  intentError: null,
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to initialize payment.";
};

export const createPaymentIntent = createAsyncThunk<
  PaymentIntent,
  CreatePaymentIntentRequest,
  { rejectValue: string }
>("payments/createPaymentIntent", async (payload, { rejectWithValue }) => {
  try {
    return await createPaymentIntentService(payload);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const paymentSlice = createSlice({
  name: "payments",

  initialState,

  reducers: {
    clearPaymentIntent(state) {
      state.intent = null;
      state.intentError = null;
    },

    clearPaymentIntentError(state) {
      state.intentError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.isCreatingIntent = true;
        state.intentError = null;
      })

      .addCase(
        createPaymentIntent.fulfilled,
        (state, action: PayloadAction<PaymentIntent>) => {
          state.isCreatingIntent = false;
          state.intent = action.payload;
        },
      )

      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isCreatingIntent = false;

        state.intentError = action.payload ?? "Unable to initialize payment.";
      });
  },
});

export const { clearPaymentIntent, clearPaymentIntentError } =
  paymentSlice.actions;

export default paymentSlice.reducer;
