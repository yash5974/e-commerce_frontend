import AddToCartButton from "@/features/cart/components/AddToCartButton";
import type { ProductDetails } from "../types/product.type";

interface ProductDetailsInfoProps {
  product: ProductDetails;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const getDiscountPercentage = (
  price: number,
  discountPrice: number,
): number | null => {
  if (discountPrice <= 0 || discountPrice >= price) {
    return null;
  }

  return Math.round(((price - discountPrice) / price) * 100);
};

export default function ProductDetailsInfo({
  product,
}: ProductDetailsInfoProps) {
  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice < product.price;

  const effectivePrice = hasDiscount ? product.discountPrice : product.price;

  const discountPercentage = getDiscountPercentage(
    product.price,
    product.discountPrice,
  );

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {product.brand}
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-medium">★ {product.rating.toFixed(1)}</span>

          <span className="text-sm text-muted-foreground">
            {product.reviewCount} reviews
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">
          {formatPrice(effectivePrice)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>

            {discountPercentage !== null && (
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                {discountPercentage}% OFF
              </span>
            )}
          </>
        )}
      </div>

      <div className="border-y py-4">
        <p
          className={
            isOutOfStock
              ? "font-medium text-destructive"
              : "font-medium text-green-600"
          }
        >
          {isOutOfStock ? "Out of stock" : `${product.stock} available`}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Description</h2>

        <p className="mt-2 whitespace-pre-line leading-7 text-muted-foreground">
          {product.description}
        </p>
      </div>

      {product.tags.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Tags</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <AddToCartButton productId={product._id} stock={product.stock} />
    </div>
  );
}
