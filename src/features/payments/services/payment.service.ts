import {
  getPaymentApi,
  paymentApi,
  refundPaymentApi,
  retryPaymentApi,
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

const CREATE_IDEMPOTENCY_PREFIX = "payment:create:";
const RETRY_IDEMPOTENCY_PREFIX = "payment:retry:";
const REFUND_IDEMPOTENCY_PREFIX = "payment:refund:";

const getStorageKey = (
  prefix: string,
  id: string,
  provider?: PaymentProvider,
): string => {
  return provider ? `${prefix}${id}:${provider}` : `${prefix}${id}`;
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

const normalizePayment = (
  payment: Payment & {
    id?: string;
  },
): Payment => {
  return {
    ...payment,

    paymentId: payment.paymentId?.trim() || payment.id?.trim() || "",

    providerPaymentId: payment.providerPaymentId?.trim() || undefined,

    providerOrderId: payment.providerOrderId?.trim() || undefined,

    providerClientSecret: payment.providerClientSecret?.trim() || undefined,
  };
};

const normalizePaymentIntent = (
  payment: PaymentIntent & {
    id?: string;
  },
): PaymentIntent => {
  return {
    ...payment,

    paymentId: payment.paymentId?.trim() || payment.id?.trim() || "",

    providerPaymentId: payment.providerPaymentId?.trim() || undefined,

    providerOrderId: payment.providerOrderId?.trim() || undefined,

    providerClientSecret: payment.providerClientSecret?.trim() || undefined,
  };
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

  try {
    const response = await paymentApi.createPaymentIntent(
      {
        orderId: normalizedOrderId,
        provider: payload.provider,
      },
      idempotencyKey,
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to create payment intent");
    }

    const paymentIntent = normalizePaymentIntent(response.data);

    if (!paymentIntent.paymentId) {
      throw new Error("Payment initialization returned an invalid payment ID.");
    }

    if (
      paymentIntent.provider === "stripe" &&
      !paymentIntent.providerClientSecret
    ) {
      throw new Error(
        "Stripe payment initialization returned no client secret.",
      );
    }

    if (
      paymentIntent.provider === "razorpay" &&
      !paymentIntent.providerOrderId
    ) {
      throw new Error("Razorpay payment initialization returned no order ID.");
    }

    sessionStorage.removeItem(storageKey);

    return paymentIntent;
  } catch (error) {
    /**
     * Keep the idempotency key on failure.
     *
     * A repeated request will therefore safely reuse the same
     * backend idempotency key.
     */
    throw error;
  }
}

export const paymentService = {
  async getPayment(paymentId: string): Promise<Payment> {
    const normalizedPaymentId = paymentId.trim();

    if (!normalizedPaymentId) {
      throw new Error("Payment ID is required");
    }

    const response = await getPaymentApi(normalizedPaymentId);

    if (!response.success || !response.data?.payment) {
      throw new Error(
        response.message || "Unable to retrieve payment details.",
      );
    }

    const payment = normalizePayment(response.data.payment);

    if (!payment.paymentId) {
      throw new Error("Payment response returned an invalid payment ID.");
    }

    return payment;
  },
};

export const retryPaymentService = {
  async retryPayment(
    paymentId: string,
    provider: PaymentProvider,
  ): Promise<Payment> {
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

    try {
      const response = await retryPaymentApi(
        normalizedPaymentId,
        payload,
        idempotencyKey,
      );

      if (!response.success || !response.data?.payment) {
        throw new Error(
          response.message || "Unable to initialize payment retry.",
        );
      }

      const payment = normalizePayment(response.data.payment);

      if (!payment.paymentId) {
        throw new Error("Payment retry returned an invalid payment ID.");
      }

      if (payment.provider === "stripe" && !payment.providerClientSecret) {
        throw new Error("Stripe retry returned no client secret.");
      }

      if (payment.provider === "razorpay" && !payment.providerOrderId) {
        throw new Error("Razorpay retry returned no order ID.");
      }

      sessionStorage.removeItem(storageKey);

      return payment;
    } catch (error) {
      /**
       * Keep idempotency key on failure.
       */
      throw error;
    }
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
      throw new Error(response.message || "Unable to process refund.");
    }

    sessionStorage.removeItem(storageKey);

    return response.data;
  } catch (error) {
    /**
     * Keep the idempotency key when the request fails.
     */
    throw error;
  }
}
