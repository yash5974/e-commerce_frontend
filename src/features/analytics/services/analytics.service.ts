import { analyticsApi } from "../api/analytics.api";

import type {
  RevenueAnalyticsFiltering,
  RevenueAnalyticsResponse,
  SalesAnalyticsFiltering,
  SalesAnalyticsResponse,
  TopProductsAnalyticsFiltering,
  TopProductsAnalyticsResponse,
} from "../types/analytics.type";

export const analyticsService = {
  getSalesAnalytics(
    filters?: SalesAnalyticsFiltering,
  ): Promise<SalesAnalyticsResponse> {
    return analyticsApi.getSalesAnalytics(filters);
  },

  getRevenueAnalytics(
    filters?: RevenueAnalyticsFiltering,
  ): Promise<RevenueAnalyticsResponse> {
    return analyticsApi.getRevenueAnalytics(filters);
  },

  getTopProductsAnalytics(
    filters?: TopProductsAnalyticsFiltering,
  ): Promise<TopProductsAnalyticsResponse> {
    return analyticsApi.getTopProductsAnalytics(filters);
  },
};
