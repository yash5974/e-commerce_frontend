// src/features/analytics/components/TopProductsAnalyticsFilters.tsx

import { RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/ui/button";

import type { TopProductsAnalyticsFiltering } from "../types/analytics.type";

interface TopProductsAnalyticsFiltersProps {
  filters: TopProductsAnalyticsFiltering;
  onApply: (filters: TopProductsAnalyticsFiltering) => void;
  onReset: () => void;
}

const LIMIT_OPTIONS = [5, 10, 20, 30, 50];

export const TopProductsAnalyticsFilters = ({
  filters,
  onApply,
  onReset,
}: TopProductsAnalyticsFiltersProps) => {
  const [from, setFrom] = useState(filters.from ?? "");
  const [to, setTo] = useState(filters.to ?? "");
  const [limit, setLimit] = useState(filters.limit ?? 10);

  const [error, setError] = useState("");

  useEffect(() => {
    setFrom(filters.from ?? "");
    setTo(filters.to ?? "");
    setLimit(filters.limit ?? 10);
  }, [filters]);

  const handleApply = () => {
    if (from && to && from > to) {
      setError("From date must be before or equal to the To date.");
      return;
    }

    setError("");

    onApply({
      from: from || undefined,
      to: to || undefined,
      limit,
    });
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    setLimit(10);
    setError("");

    onReset();
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="top-products-from" className="text-sm font-medium">
            From
          </label>

          <input
            id="top-products-from"
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="top-products-to" className="text-sm font-medium">
            To
          </label>

          <input
            id="top-products-to"
            type="date"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="top-products-limit" className="text-sm font-medium">
            Number of Products
          </label>

          <select
            id="top-products-limit"
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                Top {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={handleApply}>
          <Search className="mr-2 size-4" />
          Apply
        </Button>

        <Button type="button" variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 size-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};
