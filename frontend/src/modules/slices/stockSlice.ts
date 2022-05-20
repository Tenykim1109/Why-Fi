import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  component: "",
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setComponent: (state, action: PayloadAction<string>) => {
      state.component = action.payload;
    },
  },
});

export const { setComponent } = stockSlice.actions;
export default stockSlice.reducer;
