import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: TransactionState[];
};

export type TransactionState = {
  date: Date;
  amount: number;
  category_id: number;
  description: string;
  wallet_id: number;
  user_id: number;
};

const initialState = {
  value: [] as TransactionState[],
} as initialState;

export const transaction = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getTransactions: (state) => {
      return {
        value: state.value,
      };
    },
    setTransactions: (state, action: PayloadAction<TransactionState[]>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { getTransactions, setTransactions } = transaction.actions;
export default transaction.reducer;
