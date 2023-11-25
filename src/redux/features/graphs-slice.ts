import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  value: GraphState[];
};

export type GraphState = {
  month: number;
  sum_category_1: number;
  sum_category_2: number;
};

const initialState = {
  value: [] as GraphState[],
} as initialState;

export const graph = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLineArea: (state, action: PayloadAction<GraphState[]>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { setLineArea } = graph.actions;
export default graph.reducer;
