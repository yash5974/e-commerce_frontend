import type { Product } from "../types/product.type";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
}

const SKELETON_COUNT = 12;

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <h2 className="text-lg font-semibold">No products found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
