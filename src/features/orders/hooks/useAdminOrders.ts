import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/order.service";
import type { AdminOrderFiltersInt } from "../types/order.type";

export const useAdminOrders = (filters: AdminOrderFiltersInt) => {
  return useQuery({
    queryKey: ["admin-orders", filters],
    queryFn: () => orderService.getAdminOrders(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  });
};
