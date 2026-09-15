import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "../services/analytics.service";
import type { SalesAnalyticsFiltering } from "../types/analytics.type";

export const useSalesAnalytics = (filters: SalesAnalyticsFiltering) => {
  return useQuery({
    queryKey: ["admin-sales-analytics", filters],

    queryFn: () => analyticsService.getSalesAnalytics(filters),

    staleTime: 30_000,

    placeholderData: (previousData) => previousData,
  });
};
