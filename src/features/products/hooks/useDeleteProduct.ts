import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";

import { clearDeleteError, deleteProduct } from "../store/product.slice";

export const useDeleteProduct = () => {
  const dispatch = useAppDispatch();

  const { isDeleting, deleteError } = useAppSelector((state) => state.product);

  const submit = useCallback(
    async (id: string) => {
      try {
        return await dispatch(deleteProduct(id)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch(clearDeleteError());
  }, [dispatch]);

  return {
    submit,
    isDeleting,
    error: deleteError,
    clearError,
  };
};
