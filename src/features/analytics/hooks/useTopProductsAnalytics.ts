import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "../services/analytics.service";
import type { TopProductsAnalyticsFiltering } from "../types/analytics.type";

export const useTopProductsAnalytics = (
  filters: TopProductsAnalyticsFiltering,
) => {
  return useQuery({
    queryKey: ["admin-top-products-analytics", filters],

    queryFn: () => analyticsService.getTopProductsAnalytics(filters),

    staleTime: 30_000,

    placeholderData: (previousData) => previousData,
  });
};
