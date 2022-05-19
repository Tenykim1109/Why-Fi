import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userId: "", // 아이디
  userNick: "", // 이름
  characterType: "",
  bookNumber: "",
  bookPwd: "",
  balance: 0,
  hasBookPwd: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserNick: (state, action: PayloadAction<string>) => {
      state.userNick = action.payload;
    },
    setCharacterType: (state, action: PayloadAction<string>) => {
      state.characterType = action.payload;
    },
    setBookNumber: (state, action: PayloadAction<string>) => {
      state.bookNumber = action.payload;
    },
    setBookPwd: (state, action: PayloadAction<string>) => {
      state.bookPwd = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    havePwd: (state) => {
      state.hasBookPwd = true;
    },
    notHavePwd: (state) => {
      state.hasBookPwd = false;
    },
  },
});

export const {
  setUserId,
  setUserNick,
  setCharacterType,
  setBookNumber,
  setBookPwd,
  setBalance,
  havePwd,
  notHavePwd,
} = userSlice.actions;
export default userSlice.reducer;
