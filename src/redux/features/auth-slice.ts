import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: AuthState;
};

export type AuthState = {
  id: number;
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
    logIn: (state, action: PayloadAction<number>) => {
      return {
        value: {
          id: action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
