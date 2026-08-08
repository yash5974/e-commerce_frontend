import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearPaymentIntentError,
  createPaymentIntent,
} from "../store/payment.slice";

export const useCreatePaymentIntent = () => {
  const dispatch = useAppDispatch();

  const intent = useAppSelector((state) => state.payments.intent);

  const isCreatingIntent = useAppSelector(
    (state) => state.payments.isCreatingIntent,
  );

  const error = useAppSelector((state) => state.payments.intentError);

  const createIntent = useCallback(
    async (orderId: string) => {
      return dispatch(
        createPaymentIntent({
          orderId,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const dismissError = useCallback(() => {
    dispatch(clearPaymentIntentError());
  }, [dispatch]);

  return {
    intent,
    isCreatingIntent,
    error,
    createIntent,
    dismissError,
  };
};
