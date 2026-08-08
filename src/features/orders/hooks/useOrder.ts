import { useCallback } from "react";

import {
  clearOrderDetailsError,
  fetchOrderDetails,
} from "../store/order.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const useOrder = (orderId: string) => {
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.orders.selectedOrder);

  const isLoading = useAppSelector((state) => state.orders.isLoadingDetails);

  const error = useAppSelector((state) => state.orders.detailsError);

  const loadOrder = useCallback(async () => {
    if (!orderId) {
      return;
    }

    return dispatch(fetchOrderDetails(orderId)).unwrap();
  }, [dispatch, orderId]);

  const dismissError = useCallback(() => {
    dispatch(clearOrderDetailsError());
  }, [dispatch]);

  return {
    order,
    isLoading,
    error,
    fetchOrder: loadOrder,
    dismissError,
  };
};
