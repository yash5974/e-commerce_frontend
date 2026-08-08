export const PAYMENT_PROVIDERS = ["stripe", "razorpay"] as const;

export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export interface CreatePaymentIntentRequest {
  orderId: string;
}

export interface PaymentIntent {
  paymentId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: number;
  clientSecret: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreatePaymentIntentResponse = ApiResponse<PaymentIntent>;
