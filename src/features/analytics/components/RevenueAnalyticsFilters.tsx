import { useEffect, useState } from "react";

import { Button } from "@/ui/button";

import type { RevenueAnalyticsFiltering } from "../types/analytics.type";

interface RevenueAnalyticsFiltersProps {
  filters: RevenueAnalyticsFiltering;
  onApply: (filters: RevenueAnalyticsFiltering) => void;
}

export const RevenueAnalyticsFilters = ({
  filters,
  onApply,
}: RevenueAnalyticsFiltersProps) => {
  const [from, setFrom] = useState(filters.from ?? "");
  const [to, setTo] = useState(filters.to ?? "");

  useEffect(() => {
    setFrom(filters.from ?? "");
    setTo(filters.to ?? "");
  }, [filters]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (from && to && from > to) {
      return;
    }

    onApply({
      from: from || undefined,
      to: to || undefined,
    });
  };

  const handleReset = () => {
    setFrom("");
    setTo("");

    onApply({});
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <label htmlFor="revenue-from" className="text-sm font-medium">
            From
          </label>

          <input
            id="revenue-from"
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="revenue-to" className="text-sm font-medium">
            To
          </label>

          <input
            id="revenue-to"
            type="date"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Apply</Button>

          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {from && to && from > to && (
        <p className="mt-2 text-sm text-destructive">
          From date must be before or equal to the To date.
        </p>
      )}
    </form>
  );
};
