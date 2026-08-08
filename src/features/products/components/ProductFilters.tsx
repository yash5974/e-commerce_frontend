import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import type { ProductFilters, ProductSort } from "../types/product.type";

interface ProductFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
}

export default function ProductFilters({
  filters,
  onChange,
  onReset,
}: ProductFiltersProps) {
  const update = (values: Partial<ProductFilters>) => {
    onChange({
      ...filters,
      ...values,
      page: 1,
    });
  };

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          value={filters.search ?? ""}
          placeholder="Search products..."
          onChange={(event) =>
            update({
              search: event.target.value,
            })
          }
        />

        <Input
          value={filters.brand ?? ""}
          placeholder="Brand"
          onChange={(event) =>
            update({
              brand: event.target.value,
            })
          }
        />

        <Input
          type="number"
          min={0}
          value={filters.minPrice ?? ""}
          placeholder="Min price"
          onChange={(event) =>
            update({
              minPrice:
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
            })
          }
        />

        <Input
          type="number"
          min={0}
          value={filters.maxPrice ?? ""}
          placeholder="Max price"
          onChange={(event) =>
            update({
              maxPrice:
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
            })
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.sort ?? "newest"}
          onChange={(event) =>
            update({
              sort: event.target.value as ProductSort,
            })
          }
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name</option>
          <option value="discount">Discount</option>
        </select>

        <select
          value={
            filters.inStock === undefined
              ? "all"
              : filters.inStock
                ? "true"
                : "false"
          }
          onChange={(event) => {
            const value = event.target.value;

            update({
              inStock: value === "all" ? undefined : value === "true",
            });
          }}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="all">All Products</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
