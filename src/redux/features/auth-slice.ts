import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppSelector } from "../store";
import { TransactionState } from "./transactions-slice";

type initialState = {
  value: AuthState;
};

export type AuthState = {
  id: number;
  name: string;
  email: string;
  cash?: number;
  bank?: number;
  eWallet?: number;
  savings?: number;
};

const initialState = {
  value: {
    id: 0,
    name: "",
    email: "",
    cash: 0,
    bank: 0,
    eWallet: 0,
    savings: 0,
  } as AuthState,
} as initialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
