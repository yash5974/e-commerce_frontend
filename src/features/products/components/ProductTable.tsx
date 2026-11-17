import { Link } from "react-router-dom";

import { Button } from "@/ui/button";

import Loader from "@/ui/loader";
import type { Product } from "../types/product.type";
import Pagination from "./Pagination";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  onDelete: (product: Product) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductTable = ({
  products,
  isLoading,
  isFetching,
  onDelete,
  page,
  totalPages,
  onPageChange,
}: ProductTableProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-lg border">
        <Loader size="lg" text="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <p className="font-medium">No products found.</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first product to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Product
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium">Brand</th>

              <th className="px-4 py-3 text-left text-sm font-medium">Price</th>

              <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>

              <th className="px-4 py-3 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex min-h-40 items-center justify-center">
                    <Loader variant="table" text="Updating..." />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {products.map((product) => (
                  <tr key={product._id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="h-10 w-10 shrink-0 rounded-md object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate font-medium">{product.name}</p>

                          <p className="truncate text-xs text-muted-foreground">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm">{product.brand}</td>

                    <td className="px-4 py-3 text-sm">₹{product.price}</td>

                    <td className="px-4 py-3 text-sm">{product.stock}</td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Link to={`/admin/products/${product._id}/edit`}>
                            Edit
                          </Link>
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(product)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        isFetching={isFetching}
      />
    </div>
  );
};

export default ProductTable;
