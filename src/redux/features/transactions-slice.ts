import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: TransactionState[];
};

type TransactionState = {
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
      axios.get(`${process.env.API_URL}/transactions`).then((res) => {
        return {
          value: res.data,
        };
      });
    },
  },
});

export const { getTransactions } = transaction.actions;
export default transaction.reducer;
