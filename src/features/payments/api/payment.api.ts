import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
} from "../types/payment.type";

export const createPaymentIntentApi = (
  payload: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResponse> => {
  return apiClient.post<
    CreatePaymentIntentResponse,
    CreatePaymentIntentRequest
  >(API_ENDPOINTS.PAYMENTS.INTENT, payload);
};
