// src/features/analytics/index.ts

export { AdminRevenueAnalyticsPage } from "./pages/AdminRevenueAnalyticsPage";
export { AdminSalesAnalyticsPage } from "./pages/AdminSalesAnalyticsPage";
export { AdminTopProductsAnalyticsPage } from "./pages/AdminTopProductsAnalyticsPage";

export { useRevenueAnalytics } from "./hooks/useRevenueAnalytics";
export { useSalesAnalytics } from "./hooks/useSalesAnalytics";
export { useTopProductsAnalytics } from "./hooks/useTopProductsAnalytics";

export { SalesAnalyticsCards } from "./components/SalesAnalyticsCards";
export { SalesAnalyticsChart } from "./components/SalesAnalyticsChart";
export { SalesAnalyticsFilters } from "./components/SalesAnalyticsFilters";
export { SalesAnalyticsSkeleton } from "./components/SalesAnalyticsSkeleton";

export { RevenueAnalyticsCards } from "./components/RevenueAnalyticsCards";
export { RevenueAnalyticsChart } from "./components/RevenueAnalyticsChart";
export { RevenueAnalyticsFilters } from "./components/RevenueAnalyticsFilters";
export { RevenueAnalyticsSkeleton } from "./components/RevenueAnalyticsSkeleton";

export { TopProductsAnalyticsFilters } from "./components/TopProductsAnalyticsFilters";
export { TopProductsAnalyticsSkeleton } from "./components/TopProductsAnalyticsSkeleton";
export { TopProductsAnalyticsTable } from "./components/TopProductsAnalyticsTable";

export type {
  RevenueAnalytics,
  RevenueAnalyticsFiltering,
  RevenueAnalyticsResponse,
  RevenueDailyData,
  SalesAnalytics,
  SalesAnalyticsFiltering,
  SalesAnalyticsResponse,
  TopProductAnalytics,
  TopProductsAnalyticsFiltering,
  TopProductsAnalyticsResponse,
} from "./types/analytics.type";
