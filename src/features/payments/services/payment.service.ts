import {
  getPaymentApi,
  paymentApi,
  refundPaymentApi,
} from "../api/payment.api";
import type {
  CreatePaymentIntentRequest,
  Payment,
  PaymentIntent,
  PaymentProvider,
  Refund,
  RefundPaymentRequest,
  RetryPaymentRequest,
} from "../types/payment.type";
import { retryPaymentApi } from "./../api/payment.api";

const CREATE_IDEMPOTENCY_PREFIX = "payment:create:";
const RETRY_IDEMPOTENCY_PREFIX = "payment:retry:";
const REFUND_IDEMPOTENCY_PREFIX = "payment:refund:";

const getStorageKey = (
  prefix: string,
  orderId: string,
  provider: PaymentProvider,
): string => {
  return `${prefix}${orderId}:${provider}`;
};

const getOrCreateIdempotencyKey = (storageKey: string): string => {
  const existing = sessionStorage.getItem(storageKey);
  if (existing) {
    return existing;
  }
  const key = crypto.randomUUID();
  sessionStorage.setItem(storageKey, key);
  return key;
};

export async function createPaymentIntentService(
  payload: CreatePaymentIntentRequest,
): Promise<PaymentIntent> {
  const normalizedOrderId = payload.orderId.trim();

  if (!normalizedOrderId) {
    throw new Error("Order ID is required");
  }

  const storageKey = getStorageKey(
    CREATE_IDEMPOTENCY_PREFIX,
    normalizedOrderId,
    payload.provider,
  );

  const idempotencyKey = getOrCreateIdempotencyKey(storageKey);

  const response = await paymentApi.createPaymentIntent(
    payload,
    idempotencyKey,
  );

  if (!response.success || !response.data) {
    throw new Error(response.message || "Failed to create payment intent");
  }

  sessionStorage.removeItem(storageKey);

  return response.data;
}

export const paymentService = {
  async getPayment(paymentId: string): Promise<Payment> {
    const normalizedPaymentId = paymentId.trim();

    if (!normalizedPaymentId) {
      throw new Error("Payment ID is required");
    }

    const response = await getPaymentApi(normalizedPaymentId);

    return response.data.payment;
  },
};

export const retryPaymentService = {
  async retryPayment(paymentId: string, provider: PaymentProvider) {
    const normalizedPaymentId = paymentId.trim();

    if (!normalizedPaymentId) {
      throw new Error("Payment ID is required");
    }

    const storageKey = getStorageKey(
      RETRY_IDEMPOTENCY_PREFIX,
      normalizedPaymentId,
      provider,
    );

    const idempotencyKey = getOrCreateIdempotencyKey(storageKey);

    const payload: RetryPaymentRequest = {
      provider,
    };

    const response = await retryPaymentApi(
      normalizedPaymentId,
      payload,
      idempotencyKey,
    );

    sessionStorage.removeItem(storageKey);

    return response.data.payment;
  },
};

const getRefundRequestFingerprint = (
  paymentId: string,
  payload: RefundPaymentRequest,
): string => {
  const normalizedAmount =
    payload.amount === undefined ? "full" : payload.amount.toFixed(2);

  const normalizedReason = payload.reason.trim();

  return JSON.stringify({
    paymentId: paymentId.trim(),
    amount: normalizedAmount,
    reason: normalizedReason,
  });
};

const getRefundStorageKey = (
  paymentId: string,
  payload: RefundPaymentRequest,
): string => {
  const fingerprint = getRefundRequestFingerprint(paymentId, payload);

  return `${REFUND_IDEMPOTENCY_PREFIX}${btoa(encodeURIComponent(fingerprint))}`;
};

export async function refundPaymentService(
  paymentId: string,
  payload: RefundPaymentRequest,
): Promise<Refund> {
  const normalizedPaymentId = paymentId.trim();

  if (!normalizedPaymentId) {
    throw new Error("Payment ID is required");
  }

  const normalizedReason = payload.reason.trim();

  if (!normalizedReason) {
    throw new Error("Refund reason is required");
  }

  const normalizedPayload: RefundPaymentRequest = {
    ...(payload.amount !== undefined
      ? {
          amount: Number(payload.amount.toFixed(2)),
        }
      : {}),

    reason: normalizedReason,
  };

  const storageKey = getRefundStorageKey(
    normalizedPaymentId,
    normalizedPayload,
  );

  const idempotencyKey = getOrCreateIdempotencyKey(storageKey);

  try {
    const response = await refundPaymentApi(
      normalizedPaymentId,
      normalizedPayload,
      idempotencyKey,
    );

    if (!response.success || !response.data) {
      throw new Error(response.message ?? "Unable to process refund");
    }

    sessionStorage.removeItem(storageKey);

    return response.data;
  } catch (error) {
    throw error;
  }
}
