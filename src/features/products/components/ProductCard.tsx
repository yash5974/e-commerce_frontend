import { Link } from "react-router-dom";

import type { Product } from "../types/product.type";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice < product.price;

  const effectivePrice = hasDiscount ? product.discountPrice : product.price;

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product._id}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.mainImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.stock === 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
              Out of stock
            </span>
          )}

          {hasDiscount && product.stock > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Sale
            </span>
          )}
        </div>

        <div className="space-y-2 p-4">
          <p className="text-sm text-muted-foreground">{product.brand}</p>

          <h2 className="line-clamp-2 min-h-10 font-medium">{product.name}</h2>

          <div className="flex items-center gap-2">
            <span className="font-semibold">{formatPrice(effectivePrice)}</span>

            {hasDiscount && (
              <span className="text-sm teProductCard.tsxxt-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span aria-label={`Rating ${product.rating} out of 5`}>
              ★ {product.rating.toFixed(1)}
            </span>

            <span className="text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
