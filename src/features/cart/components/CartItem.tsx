import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import type { CartItem as CartItemType } from "../types/cart.type";
import CartQuantityControl from "./CartQuantityControl";
import { Button } from "@/ui/button";

interface CartItemProps {
  item: CartItemType;
}

// const getUnitPrice = (price: number, discountPrice: number): number => {
//   return discountPrice > 0 ? discountPrice : price;
// };

const toSafeNumber = (
  value: number | null | undefined,
  fallback = 0,
): number => {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};

const getUnitPrice = (
  price: number | null | undefined,
  discountPrice: number | null | undefined,
): number => {
  const safePrice = toSafeNumber(price);
  const safeDiscountPrice = toSafeNumber(discountPrice);

  return safeDiscountPrice > 0 ? safeDiscountPrice : safePrice;
};

export default function CartItem({ item }: CartItemProps) {
  const product = item.productId;

  const {
    isUpdating,
    updatingProductId,
    updateItem,
    isRemoving,
    removingProductId,
    removeItem,
  } = useCart();

  const price = toSafeNumber(product?.price);
  const discountPrice = toSafeNumber(product?.discountPrice);
  const stock = toSafeNumber(product?.stock);
  const quantity = toSafeNumber(item?.quantity, 1);

  const unitPrice = getUnitPrice(price, discountPrice);
  const totalPrice = unitPrice * quantity;

  const image = product.mainImage ?? product.galleryImages?.[0];

  const isUpdatingThisItem = isUpdating && updatingProductId === product._id;
  const isRemovingThisItem = isRemoving && removingProductId === product._id;

  const maxQuantity = Math.max(product.stock, 0);

  const handleQuantityChange = async (quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    if (quantity > product.stock) {
      return;
    }

    try {
      await updateItem(product._id, quantity);
    } catch {
      // Global cart error is already handled
      // by Redux state.
    }
  };

  const handleRemove = async () => {
    if (isRemovingThisItem || isUpdatingThisItem) {
      return;
    }

    try {
      await removeItem(product._id);
    } catch {
      // Global cart error is already handled by Redux state.
    }
  };

  return (
    <article className="flex gap-4 rounded-xl border p-4">
      <Link to={`/products/${product._id}`} className="shrink-0">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="size-24 rounded-lg object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={`/products/${product._id}`}
          className="font-medium hover:underline"
        >
          {product.name}
        </Link>

        <p className="mt-1 text-sm text-muted-foreground">
          {stock > 0 ? `${stock} available` : "Out of stock"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CartQuantityControl
            quantity={quantity}
            stock={maxQuantity}
            disabled={isUpdatingThisItem}
            onChange={handleQuantityChange}
          />

          {discountPrice > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                ₹{discountPrice.toLocaleString("en-IN")}
              </span>

              <span className="text-sm text-muted-foreground line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            <span className="font-semibold">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-semibold">₹{totalPrice.toLocaleString("en-IN")}</p>

        {isUpdatingThisItem && (
          <p className="mt-1 text-xs text-muted-foreground">Updating...</p>
        )}

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isRemovingThisItem || isUpdatingThisItem}
          onClick={() => {
            void handleRemove();
          }}
          aria-label={`Remove ${product.name} from cart`}
        >
          {isRemovingThisItem ? (
            <span className="text-xs">...</span>
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </div>
    </article>
  );
}
