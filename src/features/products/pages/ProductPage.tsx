import { useMemo, useState } from "react";

import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import ProductPagination from "../components/ProductPagination";
import { useProducts } from "../hooks/useProducts";
import type { ProductFilters as ProductFiltersType } from "../types/product.type";

const DEFAULT_FILTERS: ProductFiltersType = {
  page: 1,
  limit: 12,
  sort: "newest",
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFiltersType>(DEFAULT_FILTERS);

  const normalizedFilters = useMemo(
    () => ({
      ...filters,
      page: filters.page ?? 1,
      limit: filters.limit ?? 12,
      sort: filters.sort ?? "newest",
    }),
    [filters],
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useProducts(normalizedFilters);

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border border-destructive/30 p-8 text-center">
          <h1 className="text-lg font-semibold">Unable to load products</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md border px-4 py-2 text-sm"
          >
            Retry
          </button>

          {error instanceof Error && (
            <p className="mt-2 text-xs text-muted-foreground">
              {error.message}
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="mt-2 text-muted-foreground">
          Browse our latest products.
        </p>
      </div>

      <ProductFilters
        filters={normalizedFilters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {data?.meta.totalProducts ?? 0} products
          </p>

          {isFetching && !isLoading && (
            <span className="text-sm text-muted-foreground">Updating...</span>
          )}
        </div>

        <ProductGrid products={data?.data} isLoading={isLoading} />

        <ProductPagination
          meta={data?.meta}
          isFetching={isFetching}
          onPageChange={(page) =>
            setFilters((current) => ({
              ...current,
              page,
            }))
          }
        />
      </div>
    </main>
  );
}
