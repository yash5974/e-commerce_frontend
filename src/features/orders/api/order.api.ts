import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  AdminOrderFiltersInt,
  AdminOrdersResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderDetailsResponse,
  GetOrdersResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
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

export const orderApi = {
  getAdminOrders(filters?: AdminOrderFiltersInt): Promise<AdminOrdersResponse> {
    return apiClient.get<AdminOrdersResponse>(API_ENDPOINTS.ADMIN.ORDERS.LIST, {
      params: {
        page: filters?.page,
        limit: filters?.limit,
        status: filters?.status,
      },
    });
  },
  updateOrderStatus(
    orderId: string,
    body: UpdateOrderStatusRequest,
  ): Promise<UpdateOrderStatusResponse> {
    return apiClient.patch<UpdateOrderStatusResponse, UpdateOrderStatusRequest>(
      API_ENDPOINTS.ADMIN.ORDERS.UPDATE_STATUS(orderId),
      body,
    );
  },
};
