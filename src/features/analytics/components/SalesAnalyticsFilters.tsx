import { useEffect, useState } from "react";

import { Button } from "@/ui/button";

import type { SalesAnalyticsFiltering } from "../types/analytics.type";

interface SalesAnalyticsFiltersProps {
  filters: SalesAnalyticsFiltering;
  onApply: (filters: SalesAnalyticsFiltering) => void;
}

export const SalesAnalyticsFilters = ({
  filters,
  onApply,
}: SalesAnalyticsFiltersProps) => {
  const [from, setFrom] = useState(filters.from ?? "");
  const [to, setTo] = useState(filters.to ?? "");

  useEffect(() => {
    setFrom(filters.from ?? "");
    setTo(filters.to ?? "");
  }, [filters]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          <label htmlFor="analytics-from" className="text-sm font-medium">
            From
          </label>

          <input
            id="analytics-from"
            type="date"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="analytics-to" className="text-sm font-medium">
            To
          </label>

          <input
            id="analytics-to"
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
    </form>
  );
};
