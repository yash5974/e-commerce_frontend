import { useCallback } from "react";

import { clearOrdersError, fetchMyOrders } from "../store/order.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const useOrders = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  const isLoading = useAppSelector((state) => state.orders.isLoadingOrders);

  const error = useAppSelector((state) => state.orders.ordersError);

  const loadOrders = useCallback(async () => {
    return dispatch(fetchMyOrders()).unwrap();
  }, [dispatch]);

  const dismissError = useCallback(() => {
    dispatch(clearOrdersError());
  }, [dispatch]);

  return {
    orders,
    isLoading,
    error,
    fetchOrders: loadOrders,
    dismissError,
  };
};
