import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: AuthState;
};

export type AuthState = {
  id: number;
  name: string;
  email: string;
};

const initialState = {
  value: {
    id: 0,
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
    getUserId: (state) => {
      return state;
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
