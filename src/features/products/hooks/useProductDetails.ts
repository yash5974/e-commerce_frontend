import { useQuery } from "@tanstack/react-query";

import { getProductDetails } from "../services/product.service";

export const PRODUCT_DETAILS_QUERY_KEY = (id: string) =>
  ["products", "details", id] as const;

export const useProductDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: PRODUCT_DETAILS_QUERY_KEY(id ?? ""),
    queryFn: () => getProductDetails(id!),
    enabled: Boolean(id),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
