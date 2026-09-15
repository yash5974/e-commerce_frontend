import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearInventoryError, updateInventory } from "../store/inventory.slice";

import type { AppDispatch, RootState } from "@/app/store";
import type { InventoryLogType } from "../types/inventory.type";

export const useUpdateInventory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const { isUpdating, updatedInventory, error } = useSelector(
    (state: RootState) => state.inventory,
  );

  const submit = useCallback(
    async (productId: string, quantity: number, type: InventoryLogType) => {
      const result = await dispatch(
        updateInventory({
          productId,
          quantity,
          type,
        }),
      ).unwrap();

      /**
       * Product stock may be displayed by:
       *
       * - product details
       * - admin product list
       * - product queries
       *
       * Invalidate those queries after a successful
       * inventory update.
       */
      await queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      return result;
    },
    [dispatch, queryClient],
  );

  const clearError = useCallback(() => {
    dispatch(clearInventoryError());
  }, [dispatch]);

  return {
    submit,
    isUpdating,
    updatedInventory,
    error,
    clearError,
  };
};
