import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "../services/analytics.service";
import type { RevenueAnalyticsFiltering } from "../types/analytics.type";

export const useRevenueAnalytics = (filters: RevenueAnalyticsFiltering) => {
  return useQuery({
    queryKey: ["admin-revenue-analytics", filters],

    queryFn: () => analyticsService.getRevenueAnalytics(filters),

    staleTime: 30_000,

    placeholderData: (previousData) => previousData,
  });
};
