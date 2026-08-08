import { Minus, Plus } from "lucide-react";

import { Button } from "@/ui/button";

interface CartQuantityControlProps {
  quantity: number;
  stock: number;
  disabled?: boolean;
  onChange: (quantity: number) => void;
}

export default function CartQuantityControl({
  quantity,
  stock,
  disabled = false,
  onChange,
}: CartQuantityControlProps) {
  const canDecrease = quantity > 1;
  const canIncrease = quantity < stock;

  const handleDecrease = () => {
    if (!canDecrease || disabled) {
      return;
    }

    onChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (!canIncrease || disabled) {
      return;
    }

    onChange(quantity + 1);
  };

  return (
    <div className="flex items-center rounded-lg border">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-r-none"
        disabled={!canDecrease || disabled}
        onClick={handleDecrease}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>

      <span
        className="flex min-w-10 items-center justify-center px-2 text-sm font-medium"
        aria-live="polite"
      >
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 rounded-l-none"
        disabled={!canIncrease || disabled}
        onClick={handleIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
