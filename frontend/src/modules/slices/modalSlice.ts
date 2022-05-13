import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  component: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    setComponent: (state, action: PayloadAction<string>) => {
      state.component = action.payload;
    },
  },
});

export const { open, close, setComponent } = modalSlice.actions;
export default modalSlice.reducer;
