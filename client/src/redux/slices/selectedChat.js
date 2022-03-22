import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
};

const selectedChatSlice = createSlice({
  name: "selectedChat",
  initialState,
  reducers: {
    setChatId: (state, { payload }) => {
      state.chatId = payload;
    },
  },
});

export const { setChatId } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
