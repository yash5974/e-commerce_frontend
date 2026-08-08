import type { RootState } from "@/app/store";

export const selectCart = (state: RootState) => state.cart.cart;

export const selectCartItems = (state: RootState) =>
  state.cart.cart?.items ?? [];

export const selectCartItemCount = (state: RootState): number => {
  const items = state.cart.cart?.items ?? [];

  return items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartSubtotal = (state: RootState): number => {
  const items = state.cart.cart?.items ?? [];

  return items.reduce((total, item) => {
    const product = item.productId;

    const unitPrice =
      product.discountPrice > 0 ? product.discountPrice : product.price;

    return total + unitPrice * item.quantity;
  }, 0);
};

export const selectCartIsLoading = (state: RootState): boolean =>
  state.cart.isLoading;

export const selectIsAddingToCart = (state: RootState): boolean =>
  state.cart.isAdding;

export const selectAddingProductId = (state: RootState): string | null =>
  state.cart.addingProductId;

export const selectIsUpdatingCartItem = (state: RootState): boolean =>
  state.cart.isUpdating;

export const selectUpdatingProductId = (state: RootState): string | null =>
  state.cart.updatingProductId;

export const selectCartError = (state: RootState): string | null =>
  state.cart.error;

export const selectIsRemovingCartItem = (state: RootState): boolean =>
  state.cart.isRemoving;

export const selectRemovingProductId = (state: RootState): string | null =>
  state.cart.removingProductId;

export const selectIsClearingCart = (state: RootState): boolean =>
  state.cart.isClearing;
