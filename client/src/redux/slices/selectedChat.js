import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
};

const selectedChatSlice = createSlice({
  name: "selectedChat",
  initialState,
  reducers: {
    setChatId: (state, { payload }) => {
      state.chatId = payload;
    },
    resetChatId: (state) => {
      state.chatId = "";
    },
  },
});

export const { setChatId, resetChatId } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
