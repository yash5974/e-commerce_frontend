import { createPaymentIntentApi } from "../api/payment.api";

import type {
  CreatePaymentIntentRequest,
  PaymentIntent,
} from "../types/payment.type";

export const createPaymentIntentService = async (
  payload: CreatePaymentIntentRequest,
): Promise<PaymentIntent> => {
  const response = await createPaymentIntentApi(payload);

  return response.data;
};
