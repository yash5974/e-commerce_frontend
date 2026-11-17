import authReducer from "@/features/auth/store/auth.slice";
import cartReducer from "@/features/cart/store/cart.slice";
import categoryReducer from "@/features/categories/store/category.slice";
import inventoryReducer from "@/features/inventory/store/inventory.slice";
import orderReducer from "@/features/orders/store/order.slice";
import paymentReducer from "@/features/payments/store/payment.slice";
import productReducer from "@/features/products/store/product.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    payments: paymentReducer,
    product: productReducer,
    inventory: inventoryReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
