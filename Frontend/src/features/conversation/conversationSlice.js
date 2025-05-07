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
  },
});

export const {
  setUsers,
  setSelectedConversationUser,
  setMessage,
  setEnterCount,
  setStartConversationUser,
} = conversationSlice.actions;
export default conversationSlice.reducer;
