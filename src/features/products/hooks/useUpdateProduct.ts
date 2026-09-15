import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store";

import { clearProductErrors, updateProduct } from "../store/product.slice";

import type { UpdateProductPayload } from "../types/product.type";

export const useUpdateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isUpdating = useSelector(
    (state: RootState) => state.product.isUpdating,
  );

  const error = useSelector((state: RootState) => state.product.updateError);

  const submit = useCallback(
    async (id: string, payload: UpdateProductPayload) => {
      return dispatch(
        updateProduct({
          id,
          payload,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch(clearProductErrors());
  }, [dispatch]);

  return {
    submit,
    isUpdating,
    error,
    clearError,
  };
};
