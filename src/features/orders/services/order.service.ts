import {
  createOrderApi,
  getMyOrdersApi,
  getOrderDetailsApi,
} from "../api/order.api";

import type { CreateOrderRequest, Order } from "../types/order.type";

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
