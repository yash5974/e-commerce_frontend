import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  AddToCartRequest,
  AddToCartResponse,
  ClearCartResponse,
  GetCartResponse,
  RemoveCartItemResponse,
  UpdateCartItemRequest,
  UpdateCartItemResponse,
} from "../types/cart.type";

export const getCartApi = (): Promise<GetCartResponse> => {
  return apiClient.get<GetCartResponse>(API_ENDPOINTS.CART.GET);
};

export const addToCartApi = (
  payload: AddToCartRequest,
): Promise<AddToCartResponse> => {
  return apiClient.post<AddToCartResponse, AddToCartRequest>(
    API_ENDPOINTS.CART.ADD,
    payload,
  );
};

export const updateCartItemApi = (
  productId: string,
  payload: UpdateCartItemRequest,
): Promise<UpdateCartItemResponse> => {
  return apiClient.patch<UpdateCartItemResponse, UpdateCartItemRequest>(
    API_ENDPOINTS.CART.UPDATE(productId),
    payload,
  );
};

export const removeCartItemApi = (
  productId: string,
): Promise<RemoveCartItemResponse> => {
  return apiClient.delete<RemoveCartItemResponse>(
    API_ENDPOINTS.CART.REMOVE(productId),
  );
};

export const clearCartApi = (): Promise<ClearCartResponse> => {
  return apiClient.delete<ClearCartResponse>(API_ENDPOINTS.CART.CLEAR);
};
