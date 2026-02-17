import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state, action) => {
      // console.log("Logout inside");

      state.status = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
