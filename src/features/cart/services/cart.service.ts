import {
  addToCartApi,
  clearCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
} from "../api/cart.api";
import {
  addToCartSchema,
  productIdSchema,
  updateCartItemSchema,
} from "../schemas/cart.schema";

import type {
  AddToCartInput,
  UpdateCartItemInput,
} from "../schemas/cart.schema";
import type {
  AddToCartResponse,
  ClearCartResponse,
  GetCartResponse,
  RemoveCartItemResponse,
  UpdateCartItemResponse,
} from "../types/cart.type";

export const getCart = (): Promise<GetCartResponse> => {
  return getCartApi();
};

export const addToCart = async (
  input: AddToCartInput,
): Promise<AddToCartResponse> => {
  const payload = addToCartSchema.parse(input);

  return addToCartApi(payload);
};

export const updateCartItem = async (
  productId: string,
  input: UpdateCartItemInput,
): Promise<UpdateCartItemResponse> => {
  const validProductId = addToCartSchema.shape.productId.parse(productId);

  const payload = updateCartItemSchema.parse(input);

  return updateCartItemApi(validProductId, payload);
};

export const removeCartItem = async (
  productId: string,
): Promise<RemoveCartItemResponse> => {
  const validProductId = productIdSchema.parse(productId);

  return removeCartItemApi(validProductId);
};

export const clearCart = (): Promise<ClearCartResponse> => {
  return clearCartApi();
};
