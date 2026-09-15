export const PaymentProvider = {
  STRIPE: "stripe",
  RAZORPAY: "razorpay",
} as const;

export const PaymentStatus = {
  CREATED: "CREATED",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const RefundStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus];

export interface Payment {
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  providerClientSecret?: string;
  status: PaymentStatus;
  amount: number;
  refundedAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentIntent {
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  providerClientSecret?: string;
  status: PaymentStatus;
  amount: number;
  createdAt: string;
}

export interface CreatePaymentIntentRequest {
  orderId: string;
  provider: PaymentProvider;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  message: string;
  data: PaymentIntent;
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface GetPaymentResponse {
  success: boolean;
  data: {
    payment: Payment;
  };
}

export interface PaymentStatusResponse {
  paymentId: string;
  orderId: string;
  status: PaymentStatus;
}

export interface RetryPaymentRequest {
  provider: PaymentProvider;
}

export interface RetryPaymentResponse {
  success: boolean;
  message?: string;
  data: {
    payment: Payment;
  };
}

export interface RefundPaymentRequest {
  amount?: number;
  reason: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;
  providerRefundId?: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RefundPaymentResponse {
  success: boolean;
  message?: string;
  data: Refund;
}

export interface BasePaymentIntent {
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
}

export interface StripePaymentIntent extends BasePaymentIntent {
  provider: "stripe";
  clientSecret: string;
}

export interface RazorpayPaymentIntent extends BasePaymentIntent {
  provider: "razorpay";
  razorpayOrderId: string;
  razorpayKeyId: string;
}

export interface PaymentSummaryProps {
  intent: PaymentIntent | Payment;
}

export type PaymentIntentProvider = StripePaymentIntent | RazorpayPaymentIntent;
