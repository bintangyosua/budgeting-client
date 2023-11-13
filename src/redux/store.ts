import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import transactionReducer from "./features/transactions-slice";
import categoryReducer from "./features/categories-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer,
    transactionReducer,
    categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
