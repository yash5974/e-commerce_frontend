import type { AdminOrderFiltersInt, OrderStatus } from "../types/order.type";

interface AdminOrderFiltersProps {
  filters: AdminOrderFiltersInt;
  onChange: (filters: AdminOrderFiltersInt) => void;
  onReset: () => void;
}

const statuses: Array<{
  value: "" | OrderStatus;
  label: string;
}> = [
  { value: "", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "SHIPPED", label: "Shipped" },
];

const AdminOrderFilters = ({
  filters,
  onChange,
  onReset,
}: AdminOrderFiltersProps) => {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border p-4">
      <div className="space-y-2">
        <label htmlFor="order-status" className="text-sm font-medium">
          Status
        </label>

        <select
          id="order-status"
          value={filters.status ?? ""}
          onChange={(event) => {
            const value = event.target.value as "" | OrderStatus;

            onChange({
              ...filters,
              page: 1,
              status: value || undefined,
            });
          }}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="h-9 rounded-md border px-3 text-sm"
      >
        Reset
      </button>
    </div>
  );
};

export default AdminOrderFilters;
