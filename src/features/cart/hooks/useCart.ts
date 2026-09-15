import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  addToCartThunk,
  clearCartError,
  clearCartThunk,
  getCartThunk,
  removeCartItemThunk,
  updateCartItemThunk,
} from "../store/cart.slice";

import {
  selectAddingProductId,
  selectCart,
  selectCartError,
  selectCartIsLoading,
  selectCartItemCount,
  selectCartItems,
  selectCartSubtotal,
  selectIsAddingToCart,
  selectIsClearingCart,
  selectIsRemovingCartItem,
  selectIsUpdatingCartItem,
  selectRemovingProductId,
  selectUpdatingProductId,
} from "../store/cart.selectors";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);

  const items = useAppSelector(selectCartItems);

  const itemCount = useAppSelector(selectCartItemCount);

  const subtotal = useAppSelector(selectCartSubtotal);

  const isLoading = useAppSelector(selectCartIsLoading);

  const isAdding = useAppSelector(selectIsAddingToCart);

  const addingProductId = useAppSelector(selectAddingProductId);

  const isUpdating = useAppSelector(selectIsUpdatingCartItem);

  const updatingProductId = useAppSelector(selectUpdatingProductId);

  const isRemoving = useAppSelector(selectIsRemovingCartItem);

  const removingProductId = useAppSelector(selectRemovingProductId);

  const isClearing = useAppSelector(selectIsClearingCart);

  const error = useAppSelector(selectCartError);

  const fetchCart = useCallback(async () => {
    return dispatch(getCartThunk()).unwrap();
  }, [dispatch]);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      return dispatch(
        addToCartThunk({
          productId,
          quantity,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const updateItem = useCallback(
    async (productId: string, quantity: number) => {
      return dispatch(
        updateCartItemThunk({
          productId,
          quantity,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      return dispatch(removeCartItemThunk(productId)).unwrap();
    },
    [dispatch],
  );

  const clearCartItems = useCallback(async () => {
    return dispatch(clearCartThunk()).unwrap();
  }, [dispatch]);

  const dismissError = useCallback(() => {
    dispatch(clearCartError());
  }, [dispatch]);

  return {
    cart,
    items,

    itemCount,
    subtotal,

    isLoading,

    isAdding,
    addingProductId,

    isUpdating,
    updatingProductId,

    isClearing,

    isRemoving,
    removingProductId,

    error,

    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart: clearCartItems,

    dismissError,
  };
};
