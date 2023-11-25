import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { useSession } from "next-auth/react";

const userTransactionsSlice = createSlice({
  name: "user_transactions",
  initialState: {
    value: [],
  },
  reducers: {
    getUserTransactions: (state, email) => {
      axios
        .get(`${process.env.API_URL}/users/${email}/transactions`)
        .then((res) => {
          state.value = res.data;
        });
    },
  },
});

export const { getUserTransactions } = userTransactionsSlice.actions;

export const store = configureStore({
  reducer: userTransactionsSlice.reducer,
});
