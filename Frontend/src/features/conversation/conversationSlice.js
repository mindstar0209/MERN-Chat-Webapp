import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    selectedConversation: {
      user: null,
      enterCount: 0,
    },
    startConversationUser: null,
    messages: [],
    unreadCounts: {},
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelectedConversationUser(state, action) {
      state.selectedConversation.user = action.payload;
    },
    setEnterCount(state, action) {
      state.selectedConversation.enterCount = action.payload;
    },
    setStartConversationUser(state, action) {
      state.startConversationUser = action.payload;
    },
    setMessage(state, action) {
      state.messages = action.payload;
    },
    setUnreadCount(state, action) {
      const { userId, count } = action.payload;
      state.unreadCounts[userId] = count;
    },
    incrementUnreadCount(state, action) {
      const userId = action.payload;
      state.unreadCounts[userId] = (state.unreadCounts[userId] || 0) + 1;
    },

    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const {
  setUsers,
  setSelectedConversationUser,
  setMessage,
  setEnterCount,
  setStartConversationUser,
  setUnreadCount,
  incrementUnreadCount,
  clearMessages,
} = conversationSlice.actions;
export default conversationSlice.reducer;
