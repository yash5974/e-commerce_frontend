import authReducer from "@/features/auth/store/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/store/cart.slice";
import orderReducer from "@/features/orders/store/order.slice";
import paymentReducer from "@/features/payments/store/payment.slice";
import productReducer from "@/features/products/store/product.slice";
import inventoryReducer from "@/features/inventory/store/inventory.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    payments: paymentReducer,
    product: productReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
