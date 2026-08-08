export const ORDER_STATUSES = ["PENDING", "PAID", "FAILED", "SHIPPED"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentId?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface CreateOrderItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItemRequest[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreateOrderResponse = ApiResponse<Order>;
export type GetOrdersResponse = ApiResponse<Order[]>;
export type GetOrderDetailsResponse = ApiResponse<Order>;
