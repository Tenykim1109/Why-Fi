import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userNick: "",
  characterType: "",
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
  },
});

export const { setUserId, setUserNick, setCharacterType } = userSlice.actions;
export default userSlice.reducer;
