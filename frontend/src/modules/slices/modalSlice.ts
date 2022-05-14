import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  qna: false,
  savings: false,
  deposit: false,
  remittance: false,
  atm: false,
  stock: false,
  component: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.component = action.payload;
    },
    close: (state) => {
      state.isOpen = false;
    },
    openQnA: (state) => {
      state.qna = true;
    },
    closeQnA: (state) => {
      state.qna = false;
    },
    openATM: (state) => {
      state.atm = true;
    },
    closeATM: (state) => {
      state.atm = false;
    },
    openSavings: (state) => {
      state.savings = true;
    },
    closeSavings: (state) => {
      state.savings = false;
    },
    openDeposit: (state) => {
      state.deposit = true;
    },
    closeDeposit: (state) => {
      state.deposit = false;
    },
    openRemittance: (state) => {
      state.remittance = true;
    },
    closeRemittance: (state) => {
      state.remittance = false;
    },
    openStock: (state) => {
      state.stock = true;
    },
    closeStock: (state) => {
      state.stock = false;
    },
    setComponent: (state, action: PayloadAction<string>) => {
      state.component = action.payload;
    },
  },
});

export const {
  open,
  close,
  openQnA,
  closeQnA,
  openATM,
  closeATM,
  openSavings,
  closeSavings,
  openDeposit,
  closeDeposit,
  openRemittance,
  closeRemittance,
  openStock,
  closeStock,
  setComponent,
} = modalSlice.actions;
export default modalSlice.reducer;
