export const PaymentProvider = {
  STRIPE: "stripe",
  RAZORPAY: "razorpay",
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];

export const PaymentStatus = {
  CREATED: "CREATED",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const RefundStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus];

/**
 * Stored and returned by backend in major INR units.
 *
 * Example:
 * 2399 = ₹2,399.00
 */
export interface Payment {
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;

  /**
   * Present after a provider payment is created/captured.
   * Razorpay initially uses providerOrderId instead.
   */
  providerPaymentId?: string;

  /**
   * Razorpay Order ID.
   * Required for Razorpay checkout.
   */
  providerOrderId?: string;

  /**
   * Stripe client secret.
   */
  providerClientSecret?: string;

  status: PaymentStatus;

  /**
   * Always RUPEES in the application/database.
   */
  amount: number;

  refundedAmount: number;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentIntent {
  paymentId: string;
  orderId: string;
  provider: PaymentProvider;

  /**
   * Stripe PaymentIntent ID.
   */
  providerPaymentId?: string;

  /**
   * Razorpay Order ID.
   */
  providerOrderId?: string;

  /**
   * Stripe client secret.
   */
  providerClientSecret?: string;

  status: PaymentStatus;

  /**
   * RUPEES, not paise.
   */
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
  message?: string;
  data: {
    payment: Payment;
  };
}

export interface PaymentStatusResponse {
  success?: boolean;
  orderId: string;
  paymentId: string;
  status: PaymentStatus;
  message?: string;
  data: {
    paymentId: string;
    orderId: string;
    status: PaymentStatus;
  };
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

  /**
   * INR major units.
   */
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
  providerClientSecret: string;
}

export interface RazorpayPaymentIntent extends BasePaymentIntent {
  provider: "razorpay";
  providerOrderId: string;
}

export interface PaymentSummaryProps {
  intent: PaymentIntent | Payment;
}

export type PaymentIntentProvider = StripePaymentIntent | RazorpayPaymentIntent;
