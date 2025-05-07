import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("Auth")
  ? JSON.parse(localStorage.getItem("Auth"))
  : null;

const initialState = {
  user: userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
