import { useState } from "react";
import { Link } from "react-router-dom";

import ProductDeleteDialog from "../components/ProductDeleteDialog";
import ProductTable from "../components/ProductTable";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product.type";

const AdminProductsPage = () => {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } = useProducts({
    page: 1,
    limit: 20,
    sort: "newest",
  });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>

          <p className="text-sm text-muted-foreground">
            Manage products in your catalog.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Add product
        </Link>
      </div>

      {isError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load products."}

          <button
            type="button"
            onClick={() => refetch()}
            className="ml-4 underline"
          >
            Retry
          </button>
        </div>
      ) : (
        <ProductTable
          products={data?.data ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          onDelete={(product) => setProductToDelete(product)}
        />
      )}

      <ProductDeleteDialog
        product={productToDelete}
        open={productToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
      />
    </main>
  );
};

export default AdminProductsPage;
