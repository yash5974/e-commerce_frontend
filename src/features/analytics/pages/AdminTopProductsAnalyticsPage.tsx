// src/features/analytics/pages/AdminTopProductsAnalyticsPage.tsx

import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";

import { TopProductsAnalyticsFilters } from "../components/TopProductsAnalyticsFilters";
import { TopProductsAnalyticsSkeleton } from "../components/TopProductsAnalyticsSkeleton";
import { TopProductsAnalyticsTable } from "../components/TopProductsAnalyticsTable";
import { useTopProductsAnalytics } from "../hooks/useTopProductsAnalytics";
import type { TopProductsAnalyticsFiltering } from "../types/analytics.type";

const DEFAULT_FILTERS: TopProductsAnalyticsFiltering = {
  limit: 10,
};

export const AdminTopProductsAnalyticsPage = () => {
  const [filters, setFilters] =
    useState<TopProductsAnalyticsFiltering>(DEFAULT_FILTERS);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useTopProductsAnalytics(filters);

  const handleApply = (nextFilters: TopProductsAnalyticsFiltering) => {
    setFilters(nextFilters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Top Products Analytics</h1>

          <p className="text-sm text-muted-foreground">
            Analyze your best-selling products by quantity and revenue.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <TopProductsAnalyticsFilters
        filters={filters}
        onApply={handleApply}
        onReset={handleReset}
      />

      {isLoading ? (
        <TopProductsAnalyticsSkeleton />
      ) : isError ? (
        <div className="rounded-lg border border-destructive/30 p-6">
          <div className="space-y-2">
            <h2 className="font-medium text-destructive">
              Failed to load top products analytics
            </h2>

            <p className="text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong while fetching analytics."}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <TopProductsAnalyticsTable products={data?.data ?? []} />
      )}
    </div>
  );
};

export default AdminTopProductsAnalyticsPage;
