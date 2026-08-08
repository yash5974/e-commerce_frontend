import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderDetailsResponse,
  GetOrdersResponse,
} from "../types/order.type";

export const createOrderApi = (
  payload: CreateOrderRequest,
): Promise<CreateOrderResponse> => {
  return apiClient.post<CreateOrderResponse, CreateOrderRequest>(
    API_ENDPOINTS.ORDERS.CREATE,
    payload,
  );
};

export const getMyOrdersApi = (): Promise<GetOrdersResponse> => {
  return apiClient.get<GetOrdersResponse>(API_ENDPOINTS.ORDERS.LIST);
};

export const getOrderDetailsApi = (
  orderId: string,
): Promise<GetOrderDetailsResponse> => {
  return apiClient.get<GetOrderDetailsResponse>(
    API_ENDPOINTS.ORDERS.DETAILS(orderId),
  );
};
