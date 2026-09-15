import { useEffect, useState } from "react";

import { productService } from "../services/product.service";
import type { Product } from "../types/product.type";

export const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setError("Product ID is required.");
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await productService.getById(productId);

        if (!cancelled) {
          setProduct(result);
        }
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load product.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return {
    product,
    isLoading,
    error,
  };
};
