import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearProductErrors, createProduct } from "../store/product.slice";

import type { AppDispatch, RootState } from "@/app/store";
import type { CreateProductPayload } from "../types/product.type";

export const useCreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isCreating = useSelector(
    (state: RootState) => state.product.isCreating,
  );

  const error = useSelector((state: RootState) => state.product.createError);

  const submit = useCallback(
    async (payload: CreateProductPayload) => {
      return dispatch(createProduct(payload)).unwrap();
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch(clearProductErrors());
  }, [dispatch]);

  return {
    submit,
    isCreating,
    error,
    clearError,
  };
};
