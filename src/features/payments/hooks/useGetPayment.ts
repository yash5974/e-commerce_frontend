import { useQuery } from "@tanstack/react-query";

import { paymentService } from "../services/payment.service";

export const paymentQueryKeys = {
  all: ["payments"] as const,
  detail: (paymentId: string) =>
    [...paymentQueryKeys.all, "detail", paymentId] as const,
  status: (paymentId: string) => ["payments", "status", paymentId] as const,
};

export const useGetPayment = (paymentId?: string) => {
  const normalizedPaymentId = paymentId?.trim() ?? "";

  const query = useQuery({
    queryKey: paymentQueryKeys.detail(normalizedPaymentId),
    queryFn: () => paymentService.getPayment(normalizedPaymentId),
    enabled: normalizedPaymentId.length > 0,
    staleTime: 30_000,
    retry: 2,
  });

  return {
    payment: query.data ?? null,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,

    error:
      query.error instanceof Error
        ? query.error.message
        : query.error
          ? "Unable to retrieve payment details"
          : null,

    refetch: query.refetch,
  };
};
