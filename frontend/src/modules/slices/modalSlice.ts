import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  qna: false,
  savings: false,
  deposit: false,
  remittance: false,
  atm: false,
  stock: false,
  menu: false,
  quiz: false,
  tutorial: true,
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
    openMenu: (state) => {
      state.menu = true;
    },
    closeMenu: (state) => {
      state.menu = false;
    },
    openQuiz: (state) => {
      state.quiz = true;
    },
    closeQuiz: (state) => {
      state.quiz = false;
    },
    openTutorial: (state) => {
      state.tutorial = true;
    },
    closeTutorial: (state) => {
      state.tutorial = false;
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
  openMenu,
  closeMenu,
  openQuiz,
  closeQuiz,
  openTutorial,
  closeTutorial,
  setComponent,
} = modalSlice.actions;
export default modalSlice.reducer;
