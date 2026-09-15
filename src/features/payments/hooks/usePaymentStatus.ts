import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { getPaymentStatusApi } from "../api/payment.api";
import { PaymentStatus } from "../types/payment.type";
import { paymentQueryKeys } from "./useGetPayment";

const PAYMENT_STATUS_POLL_INTERVAL = 2000;
const PAYMENT_STATUS_MAX_DURATION = 60_000;

export function usePaymentStatus(paymentId?: string, enabled = true) {
  const normalizedPaymentId = paymentId?.trim() ?? "";
  const pollingStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    pollingStartedAtRef.current = normalizedPaymentId ? Date.now() : null;
  }, [normalizedPaymentId]);

  const query = useQuery({
    queryKey: paymentQueryKeys.status(normalizedPaymentId),
    queryFn: () => getPaymentStatusApi(normalizedPaymentId),
    enabled: enabled && normalizedPaymentId.length > 0,
    staleTime: 0,
    retry: 2,
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      if (status === PaymentStatus.SUCCESS) {
        return false;
      }
      if (status === PaymentStatus.FAILED) {
        return false;
      }
      const startedAt = pollingStartedAtRef.current;
      if (!startedAt) {
        return false;
      }
      const elapsed = Date.now() - startedAt;
      if (elapsed >= PAYMENT_STATUS_MAX_DURATION) {
        return false;
      }
      return PAYMENT_STATUS_POLL_INTERVAL;
    },
    refetchIntervalInBackground: false,
  });

  return {
    ...query,
    status: query.data?.data.status,
    orderId: query.data?.data.orderId,
    paymentId: query.data?.data.paymentId,
    isPolling:
      query.isFetching && query.data?.data.status === PaymentStatus.CREATED,
  };
}
