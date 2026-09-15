export interface SalesAnalytics {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  paidOrders: number;
  pendingOrders: number;
  failedOrders: number;
  shippedOrders: number;
}

export interface SalesAnalyticsResponse {
  success: boolean;
  message: string;
  data: SalesAnalytics;
}

export interface SalesAnalyticsFiltering {
  from?: string;
  to?: string;
}

export interface RevenueDailyData {
  date: string;
  revenue: number;
  orders: number;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  totalPaidOrders: number;
  averageRevenuePerOrder: number;
  highestOrderValue: number;
  lowestOrderValue: number;
  dailyRevenue: RevenueDailyData[];
}

export interface RevenueAnalyticsResponse {
  success: boolean;
  message: string;
  data: RevenueAnalytics;
}

export interface SalesAnalyticsFilters {
  from?: string;
  to?: string;
}

export interface RevenueAnalyticsFiltering {
  from?: string;
  to?: string;
}

export interface TopProductAnalytics {
  productId: string;
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
  totalOrders: number;
}

export interface TopProductsAnalyticsResponse {
  success: boolean;
  message: string;
  data: TopProductAnalytics[];
}

export interface TopProductsAnalyticsFiltering {
  from?: string;
  to?: string;
  limit?: number;
}
