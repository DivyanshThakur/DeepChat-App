import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const selectedChatSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      state.notifications.push(payload);
    },
    readAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { setChatId, resetChatId } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
