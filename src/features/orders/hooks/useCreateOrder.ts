import { useCallback } from "react";

import { clearCreateOrderError, createOrder } from "../store/order.slice";

import type { CreateOrderRequest } from "../types/order.type";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const useCreateOrder = () => {
  const dispatch = useAppDispatch();

  const isCreating = useAppSelector((state) => state.orders.isCreating);

  const error = useAppSelector((state) => state.orders.createError);

  const submitOrder = useCallback(
    async (payload: CreateOrderRequest) => {
      return dispatch(createOrder(payload)).unwrap();
    },
    [dispatch],
  );

  const dismissError = useCallback(() => {
    dispatch(clearCreateOrderError());
  }, [dispatch]);

  return {
    isCreating,
    error,
    submitOrder,
    dismissError,
  };
};
