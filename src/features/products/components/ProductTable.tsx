import { Link } from "react-router-dom";

import { Button } from "@/ui/button";

import type { Product } from "../types/product.type";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  onDelete: (product: Product) => void;
}

const ProductTable = ({
  products,
  isLoading,
  isFetching,
  onDelete,
}: ProductTableProps) => {
  if (isLoading) {
    return <div className="rounded-lg border p-6">Loading products...</div>;
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
      {isFetching && (
        <div className="border-b px-4 py-2 text-xs text-muted-foreground">
          Updating...
        </div>
      )}

      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Product</th>

            <th className="px-4 py-3 text-left text-sm font-medium">Brand</th>

            <th className="px-4 py-3 text-left text-sm font-medium">Price</th>

            <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>

            <th className="px-4 py-3 text-right text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />

                  <div>
                    <p className="font-medium">{product.name}</p>

                    <p className="text-xs text-muted-foreground">
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
                    <Link to={`/admin/products/${product._id}/edit`}>Edit</Link>
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
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
