import { apiClient } from "@/api/client";
import API_ENDPOINTS from "@/api/endpoints";

import type {
  RevenueAnalyticsFiltering,
  RevenueAnalyticsResponse,
  SalesAnalyticsFiltering,
  SalesAnalyticsResponse,
  TopProductsAnalyticsFiltering,
  TopProductsAnalyticsResponse,
} from "../types/analytics.type";

export const analyticsApi = {
  getSalesAnalytics(
    filters?: SalesAnalyticsFiltering,
  ): Promise<SalesAnalyticsResponse> {
    return apiClient.get<SalesAnalyticsResponse>(
      API_ENDPOINTS.ADMIN.ANALYTICS.SALES,
      {
        params: {
          from: filters?.from,
          to: filters?.to,
        },
      },
    );
  },

  getRevenueAnalytics(
    filters?: RevenueAnalyticsFiltering,
  ): Promise<RevenueAnalyticsResponse> {
    return apiClient.get<RevenueAnalyticsResponse>(
      API_ENDPOINTS.ADMIN.ANALYTICS.REVENUE,
      {
        params: {
          from: filters?.from,
          to: filters?.to,
        },
      },
    );
  },

  getTopProductsAnalytics(
    filters?: TopProductsAnalyticsFiltering,
  ): Promise<TopProductsAnalyticsResponse> {
    return apiClient.get<TopProductsAnalyticsResponse>(
      API_ENDPOINTS.ADMIN.ANALYTICS.TOP_PRODUCTS,
      {
        params: {
          from: filters?.from,
          to: filters?.to,
          limit: filters?.limit,
        },
      },
    );
  },
};
