import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/ui/button";

import { useCart } from "../hooks/useCart";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  quantity?: number;
}

export default function AddToCartButton({
  productId,
  stock,
  quantity = 1,
}: AddToCartButtonProps) {
  const { isAdding, addingProductId, addItem } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isThisProductAdding = isAdding && addingProductId === productId;

  const isOutOfStock = stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero.");
      return;
    }

    if (quantity > stock) {
      toast.error("Requested quantity exceeds available stock.");
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addItem(productId, quantity);

      toast.success("Product added to cart successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to add product to cart.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      className="w-full"
      disabled={isOutOfStock || isSubmitting || isThisProductAdding}
      onClick={handleAddToCart}
    >
      <ShoppingCart />

      {isThisProductAdding
        ? "Adding..."
        : isOutOfStock
          ? "Out of Stock"
          : "Add to Cart"}
    </Button>
  );
}
