import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type { ApiResponse } from "@/features/orders/types/order.type";
import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  GetPaymentResponse,
  PaymentStatusResponse,
  RefundPaymentRequest,
  RefundPaymentResponse,
  RetryPaymentRequest,
  RetryPaymentResponse,
} from "../types/payment.type";

export const paymentApi = {
  createPaymentIntent(
    payload: CreatePaymentIntentRequest,
    idempotencyKey: string,
  ): Promise<CreatePaymentIntentResponse> {
    return apiClient.post<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >(API_ENDPOINTS.PAYMENTS.INTENT, payload, {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    });
  },
};

export const getPaymentApi = async (
  paymentId: string,
): Promise<GetPaymentResponse> => {
  const response = await apiClient.get<GetPaymentResponse>(
    API_ENDPOINTS.PAYMENTS.GET(paymentId),
  );
  return response;
  // return getPaymentResponseSchema.parse(response);
};

export const getPaymentStatusApi = (
  paymentId: string,
): Promise<ApiResponse<PaymentStatusResponse>> => {
  return apiClient.get<ApiResponse<PaymentStatusResponse>>(
    API_ENDPOINTS.PAYMENTS.STATUS(paymentId),
  );
};

export const retryPaymentApi = (
  paymentId: string,
  payload: RetryPaymentRequest,
  idempotencyKey: string,
): Promise<RetryPaymentResponse> => {
  const normalizedPaymentId = paymentId.trim();

  if (!normalizedPaymentId) {
    throw new Error("Payment ID is required");
  }

  return apiClient.post<RetryPaymentResponse, RetryPaymentRequest>(
    API_ENDPOINTS.PAYMENTS.RETRY(normalizedPaymentId),
    payload,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );
};

export const refundPaymentApi = (
  paymentId: string,
  payload: RefundPaymentRequest,
  idempotencyKey: string,
): Promise<RefundPaymentResponse> => {
  const normalizedPaymentId = paymentId.trim();

  if (!normalizedPaymentId) {
    throw new Error("Payment ID is required");
  }

  if (!idempotencyKey.trim()) {
    throw new Error("Idempotency key is required");
  }

  return apiClient.post<RefundPaymentResponse, RefundPaymentRequest>(
    API_ENDPOINTS.PAYMENTS.REFUND(normalizedPaymentId),
    payload,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    },
  );
};
