import { Link, useParams } from "react-router-dom";

import ProductDetailsInfo from "../components/ProductDetailsInfo";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import ProductImageGallery from "../components/ProductImageGallery";
import { useProductDetails } from "../hooks/useProductDetails";

export default function ProductDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, isLoading, isError, error, refetch } = useProductDetails(id);

  if (!id) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-xl font-semibold">Invalid product</h1>

          <Link
            to="/products"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <ProductDetailsSkeleton />
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border border-destructive/30 p-8 text-center">
          <h1 className="text-xl font-semibold">Unable to load product</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The product may no longer be available.
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Try Again
            </button>

            <Link
              to="/products"
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              Back to Products
            </Link>
          </div>

          {error instanceof Error && (
            <p className="mt-3 text-xs text-muted-foreground">
              {error.message}
            </p>
          )}
        </div>
      </main>
    );
  }

  const product = data.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Link
        to="/products"
        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        ← Back to Products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductImageGallery
          name={product.name}
          mainImage={product.mainImage}
          galleryImages={product.galleryImages}
        />

        <ProductDetailsInfo product={product} />
      </div>
    </main>
  );
}
