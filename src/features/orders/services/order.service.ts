import {
  createOrderApi,
  getMyOrdersApi,
  getOrderDetailsApi,
  orderApi,
} from "../api/order.api";

import type {
  AdminOrderFiltersInt,
  AdminOrdersResponse,
  CreateOrderRequest,
  Order,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from "../types/order.type";

export const createOrderService = async (
  payload: CreateOrderRequest,
): Promise<Order> => {
  const response = await createOrderApi(payload);

  return response.data;
};

export const getMyOrdersService = async (): Promise<Order[]> => {
  const response = await getMyOrdersApi();

  return response.data;
};

export const getOrderDetailsService = async (
  orderId: string,
): Promise<Order> => {
  const response = await getOrderDetailsApi(orderId);

  return response.data;
};

export const orderService = {
  getAdminOrders(filters?: AdminOrderFiltersInt): Promise<AdminOrdersResponse> {
    return orderApi.getAdminOrders(filters);
  },
  updateOrderStatus(
    orderId: string,
    body: UpdateOrderStatusRequest,
  ): Promise<UpdateOrderStatusResponse> {
    return orderApi.updateOrderStatus(orderId, body);
  },
};
