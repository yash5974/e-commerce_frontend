import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";

import {
  clearCategoryError,
  fetchCategories,
  selectCategories,
  selectCategoryError,
  selectCategoryStatus,
} from "../store/category.slice";

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoryStatus);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const refresh = async () => {
    return dispatch(fetchCategories({ force: true })).unwrap();
  };

  const clearError = () => {
    dispatch(clearCategoryError());
  };

  return {
    categories,
    isLoading: status === "loading" && categories.length === 0,
    isRefreshing: status === "loading" && categories.length > 0,
    isSuccess: status === "succeeded",
    error,
    refresh,
    clearError,
  };
};
