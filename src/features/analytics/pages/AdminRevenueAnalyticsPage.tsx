import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";

import { RevenueAnalyticsCards } from "../components/RevenueAnalyticsCards";
import { RevenueAnalyticsChart } from "../components/RevenueAnalyticsChart";
import { RevenueAnalyticsFilters } from "../components/RevenueAnalyticsFilters";
import { RevenueAnalyticsSkeleton } from "../components/RevenueAnalyticsSkeleton";
import { useRevenueAnalytics } from "../hooks/useRevenueAnalytics";
import type { RevenueAnalyticsFiltering } from "../types/analytics.type";

export const AdminRevenueAnalyticsPage = () => {
  const [filters, setFilters] = useState<RevenueAnalyticsFiltering>({});

  const { data, isLoading, isFetching, isError, error, refetch } =
    useRevenueAnalytics(filters);

  const analytics = data?.data;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Revenue Analytics</h1>

          <p className="text-sm text-muted-foreground">
            Monitor revenue and paid order performance.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={isFetching ? "mr-2 size-4 animate-spin" : "mr-2 size-4"}
          />
          Refresh
        </Button>
      </div>

      <RevenueAnalyticsFilters filters={filters} onApply={setFilters} />

      {isLoading ? (
        <RevenueAnalyticsSkeleton />
      ) : isError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p>
            {error instanceof Error
              ? error.message
              : "Unable to load revenue analytics."}
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </div>
      ) : analytics ? (
        <>
          <RevenueAnalyticsCards analytics={analytics} />

          <RevenueAnalyticsChart analytics={analytics} />
        </>
      ) : (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No revenue analytics data available.
        </div>
      )}
    </main>
  );
};
