import authReducer from "@/features/auth/store/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/store/cart.slice";
import orderReducer from "@/features/orders/store/order.slice";
import paymentReducer from "@/features/payments/store/payment.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    payments: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
