import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
  clearCart,
} from "../services/cart.service";

import type {
  AddToCartRequest,
  Cart,
  UpdateCartItemRequest,
} from "../types/cart.type";

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
  isClearing: boolean;
  error: string | null;
  addingProductId: string | null;
  updatingProductId: string | null;
  removingProductId: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,
  isClearing: false,
  error: null,
  addingProductId: null,
  updatingProductId: null,
  removingProductId: null,
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unable to process cart request.";
};

/**
 * GET /cart
 */
export const getCartThunk = createAsyncThunk<
  Cart,
  void,
  {
    rejectValue: string;
  }
>(
  "cart/getCart",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },

  {
    condition: (_, { getState }) => {
      const state = getState() as {
        cart: CartState;
      };

      return !state.cart.isLoading;
    },
  },
);

/**
 * POST /cart
 */
export const addToCartThunk = createAsyncThunk<
  Cart,
  AddToCartRequest,
  {
    rejectValue: string;
  }
>(
  "cart/addToCart",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await addToCart(payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },

  {
    condition: (payload, { getState }) => {
      const state = getState() as {
        cart: CartState;
      };

      if (state.cart.isAdding) {
        return false;
      }

      return Boolean(payload.productId);
    },
  },
);

/**
 * PATCH /cart/:productId
 */
export const updateCartItemThunk = createAsyncThunk<
  Cart,
  {
    productId: string;
    quantity: number;
  },
  {
    rejectValue: string;
  }
>(
  "cart/updateCartItem",

  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(productId, {
        quantity,
      } satisfies UpdateCartItemRequest);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },

  {
    condition: ({ productId, quantity }, { getState }) => {
      const state = getState() as {
        cart: CartState;
      };

      if (!productId) {
        return false;
      }

      if (state.cart.isUpdating) {
        return false;
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return false;
      }

      return true;
    },
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError(state) {
      state.error = null;
    },

    resetCart(state) {
      state.cart = null;
      state.isLoading = false;
      state.isAdding = false;
      state.isUpdating = false;
      state.isRemoving = false;
      state.isClearing = false;
      state.error = null;
      state.addingProductId = null;
      state.updatingProductId = null;
      state.removingProductId = null;
    },

    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unable to fetch cart.";
      })
      .addCase(addToCartThunk.pending, (state, action) => {
        state.isAdding = true;
        state.error = null;
        state.addingProductId = action.meta.arg.productId;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.isAdding = false;
        state.addingProductId = null;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.isAdding = false;
        state.addingProductId = null;
        state.error = action.payload ?? "Unable to add product to cart.";
      })
      .addCase(updateCartItemThunk.pending, (state, action) => {
        state.isUpdating = true;
        state.error = null;
        state.updatingProductId = action.meta.arg.productId;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updatingProductId = null;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.isUpdating = false;
        state.updatingProductId = null;
        state.error = action.payload ?? "Unable to update cart item.";
      })
      .addCase(removeCartItemThunk.pending, (state, action) => {
        state.isRemoving = true;
        state.error = null;
        state.removingProductId = action.meta.arg;
      })
      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        state.isRemoving = false;
        state.removingProductId = null;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeCartItemThunk.rejected, (state, action) => {
        state.isRemoving = false;
        state.removingProductId = null;
        state.error = action.payload ?? "Unable to remove cart item.";
      })
      .addCase(clearCartThunk.pending, (state) => {
        state.isClearing = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.isClearing = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.isClearing = false;
        state.error = action.payload ?? "Unable to clear cart.";
      });
  },
});

export const removeCartItemThunk = createAsyncThunk<
  Cart,
  string,
  {
    rejectValue: string;
  }
>(
  "cart/removeCartItem",

  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(productId);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },

  {
    condition: (productId, { getState }) => {
      const state = getState() as {
        cart: CartState;
      };

      if (!productId) {
        return false;
      }

      if (state.cart.isRemoving) {
        return false;
      }

      return true;
    },
  },
);

export const clearCartThunk = createAsyncThunk<
  Cart,
  void,
  { rejectValue: string }
>(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { cart: CartState };
      /** * Prevent duplicate DELETE /cart requests. */ if (
        state.cart.isClearing
      ) {
        return false;
      }
      return true;
    },
  },
);

export const { clearCartError, resetCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
