import { useMemo, useState } from "react";

import AdminOrderFilters from "../components/AdminOrderFilters";
import AdminOrderPagination from "../components/AdminOrderPagination";
import AdminOrderTable from "../components/AdminOrderTable";
import { useAdminOrders } from "../hooks/useAdminOrders";
import type { AdminOrderFiltersInt } from "../types/order.type";

const DEFAULT_FILTERS: AdminOrderFiltersInt = {
  page: 1,
  limit: 10,
};

export const AdminOrdersPage = () => {
  const [filters, setFilters] = useState<AdminOrderFiltersInt>(DEFAULT_FILTERS);

  const normalizedFilters = useMemo(
    () => ({
      page: filters.page ?? 1,
      limit: filters.limit ?? 10,
      status: filters.status,
    }),
    [filters],
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useAdminOrders(normalizedFilters);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-7xl p-6">
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
          <h1 className="font-semibold text-destructive">
            Unable to load orders
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading orders."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md border px-4 py-2 text-sm"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>

        <p className="text-sm text-muted-foreground">Manage customer orders.</p>
      </div>

      <AdminOrderFilters
        filters={normalizedFilters}
        onChange={setFilters}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data?.meta.total ?? 0} total orders
        </p>

        {isFetching && !isLoading && (
          <span className="text-sm text-muted-foreground">Updating...</span>
        )}
      </div>

      <AdminOrderTable
        orders={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <AdminOrderPagination
        meta={data?.meta}
        isFetching={isFetching}
        onPageChange={(page) => {
          setFilters((current) => ({
            ...current,
            page,
          }));
        }}
      />
    </main>
  );
};

export default AdminOrdersPage;
