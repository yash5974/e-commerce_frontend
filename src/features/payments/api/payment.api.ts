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

const normalizeId = (value: string, fieldName: string): string => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(`${fieldName} is required`);
  }

  return normalizedValue;
};

const normalizeIdempotencyKey = (value: string): string => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error("Idempotency key is required");
  }

  return normalizedValue;
};

export const paymentApi = {
  createPaymentIntent(
    payload: CreatePaymentIntentRequest,
    idempotencyKey: string,
  ): Promise<CreatePaymentIntentResponse> {
    const normalizedOrderId = normalizeId(payload.orderId, "Order ID");
    const normalizedIdempotencyKey = normalizeIdempotencyKey(idempotencyKey);

    const normalizedPayload: CreatePaymentIntentRequest = {
      ...payload,
      orderId: normalizedOrderId,
    };

    return apiClient.post<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >(API_ENDPOINTS.PAYMENTS.INTENT, normalizedPayload, {
      headers: {
        "Idempotency-Key": normalizedIdempotencyKey,
      },
    });
  },
};

/**
 * GET /payments/:paymentId
 */
export const getPaymentApi = async (
  paymentId: string,
): Promise<GetPaymentResponse> => {
  const normalizedPaymentId = normalizeId(paymentId, "Payment ID");

  return apiClient.get<GetPaymentResponse>(
    API_ENDPOINTS.PAYMENTS.GET(normalizedPaymentId),
  );
};

/**
 * GET /payments/:paymentId/status
 */
export const getPaymentStatusApi = (
  paymentId: string,
): Promise<ApiResponse<PaymentStatusResponse>> => {
  const normalizedPaymentId = normalizeId(paymentId, "Payment ID");

  return apiClient.get<ApiResponse<PaymentStatusResponse>>(
    API_ENDPOINTS.PAYMENTS.STATUS(normalizedPaymentId),
  );
};

/**
 * POST /payments/:paymentId/retry
 *
 * Creates a NEW payment attempt for a failed payment.
 *
 * Backend expects:
 * - failed payment ID in URL
 * - provider in body
 * - Idempotency-Key header
 */
export const retryPaymentApi = (
  paymentId: string,
  payload: RetryPaymentRequest,
  idempotencyKey: string,
): Promise<RetryPaymentResponse> => {
  const normalizedPaymentId = normalizeId(paymentId, "Payment ID");
  const normalizedIdempotencyKey = normalizeIdempotencyKey(idempotencyKey);

  return apiClient.post<RetryPaymentResponse, RetryPaymentRequest>(
    API_ENDPOINTS.PAYMENTS.RETRY(normalizedPaymentId),
    payload,
    {
      headers: {
        "Idempotency-Key": normalizedIdempotencyKey,
      },
    },
  );
};

/**
 * POST /payments/:paymentId/refund
 *
 * Backend expects:
 * - successful payment ID in URL
 * - optional amount in RUPEES
 * - reason
 * - Idempotency-Key header
 *
 * Do NOT convert refund amount to paise here.
 * The backend converts rupees to gateway minor units.
 */
export const refundPaymentApi = (
  paymentId: string,
  payload: RefundPaymentRequest,
  idempotencyKey: string,
): Promise<RefundPaymentResponse> => {
  const normalizedPaymentId = normalizeId(paymentId, "Payment ID");
  const normalizedIdempotencyKey = normalizeIdempotencyKey(idempotencyKey);

  const normalizedPayload: RefundPaymentRequest = {
    ...(payload.amount !== undefined
      ? {
          amount: Number(payload.amount.toFixed(2)),
        }
      : {}),
    reason: payload.reason.trim(),
  };

  if (!normalizedPayload.reason) {
    throw new Error("Refund reason is required");
  }

  return apiClient.post<RefundPaymentResponse, RefundPaymentRequest>(
    API_ENDPOINTS.PAYMENTS.REFUND(normalizedPaymentId),
    normalizedPayload,
    {
      headers: {
        "Idempotency-Key": normalizedIdempotencyKey,
      },
    },
  );
};
