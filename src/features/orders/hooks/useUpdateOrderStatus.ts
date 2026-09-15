import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearOrderMutationError,
  updateOrderStatus,
} from "../store/order.slice";

import type { AppDispatch, RootState } from "@/app/store";
import type { OrderStatus } from "../types/order.type";

export const useUpdateOrderStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const { isUpdatingStatus, updatedOrder, error } = useSelector(
    (state: RootState) => state.orders,
  );

  const submit = useCallback(
    async (orderId: string, status: OrderStatus) => {
      const result = await dispatch(
        updateOrderStatus({
          orderId,
          status,
        }),
      ).unwrap();

      /**
       * Refresh every admin order query:
       *
       * ["admin-orders", { page, limit, status }]
       */
      await queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });

      return result;
    },
    [dispatch, queryClient],
  );

  const clearError = useCallback(() => {
    dispatch(clearOrderMutationError());
  }, [dispatch]);

  return {
    submit,
    isUpdating: isUpdatingStatus,
    updatedOrder,
    error,
    clearError,
  };
};
