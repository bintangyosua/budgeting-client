import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: WalletState[];
};

export type WalletState = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

const initialState = {
  value: [] as WalletState[],
} as initialState;

export const fetchWallets = createAsyncThunk("/wallets", () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/wallets`)
    .then((res) => res.data);
});

export const wallet = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    getWallets: (state) => {},
    setWallets: (state, action: PayloadAction<WalletState[]>) => {
      state.value = action.payload;
    },
  },
});

export const { getWallets, setWallets } = wallet.actions;
export default wallet.reducer;
