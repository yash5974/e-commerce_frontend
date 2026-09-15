import type {
  PaymentProvider,
  PaymentStatus as PaymentStatusEnum,
} from "@/features/payments/types/payment.type";
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
  paymentId?: {
    _id: string;
    provider: PaymentProvider;
    status: PaymentStatusEnum;
  };
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

export interface AdminOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  _id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentId?: string;
  items: AdminOrderItem[];
  createdAt: string;
}

export interface AdminOrderFiltersInt {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

export interface AdminOrdersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminOrdersResponse {
  success: boolean;
  message: string;
  data: AdminOrder[];
  meta: AdminOrdersMeta;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  data: AdminOrder;
}
