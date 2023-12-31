import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type initialState = {
  value: CategoryState[];
};

export type CategoryState = {
  id: number;
  name: string;
  category_type_id: number;
  created_at: Date;
  updated_at: Date;
};

const initialState = {
  value: [] as CategoryState[],
} as initialState;

export const fetchCategories = createAsyncThunk("/categories", () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    .then((res) => res.data);
});

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state) => {
      return {
        value: state.value,
      };
    },

    setCategories: (state, action: PayloadAction<CategoryState[]>) => {
      state.value = action.payload;
    },
  },
});

export const { getCategories, setCategories } = category.actions;
export default category.reducer;
