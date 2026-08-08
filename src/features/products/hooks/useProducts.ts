import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";
import type { ProductFilters } from "../types/product.type";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  list: (filters: ProductFilters) =>
    [...PRODUCT_QUERY_KEYS.all, "list", filters] as const,
};

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list(filters),
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
