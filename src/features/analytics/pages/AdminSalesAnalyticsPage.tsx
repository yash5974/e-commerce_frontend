import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";

import { SalesAnalyticsCards } from "../components/SalesAnalyticsCards";
import { SalesAnalyticsChart } from "../components/SalesAnalyticsChart";
import { SalesAnalyticsFilters } from "../components/SalesAnalyticsFilters";
import { SalesAnalyticsSkeleton } from "../components/SalesAnalyticsSkeleton";
import { useSalesAnalytics } from "../hooks/useSalesAnalytics";
import type { SalesAnalyticsFiltering } from "../types/analytics.type";

export const AdminSalesAnalyticsPage = () => {
  const [filters, setFilters] = useState<SalesAnalyticsFiltering>({});

  const { data, isLoading, isFetching, isError, error, refetch } =
    useSalesAnalytics(filters);

  const analytics = data?.data;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Sales Analytics</h1>

          <p className="text-sm text-muted-foreground">
            Monitor sales and order performance.
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

      <SalesAnalyticsFilters filters={filters} onApply={setFilters} />

      {isLoading ? (
        <SalesAnalyticsSkeleton />
      ) : isError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p>
            {error instanceof Error
              ? error.message
              : "Unable to load sales analytics."}
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
          <SalesAnalyticsCards analytics={analytics} />

          <SalesAnalyticsChart analytics={analytics} />
        </>
      ) : (
        <div className="rounded-md border p-6 text-sm text-muted-foreground">
          No analytics data available.
        </div>
      )}
    </main>
  );
};
