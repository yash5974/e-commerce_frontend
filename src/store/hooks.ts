import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store";

/**
 * Typed Redux Dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed Redux Selector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
