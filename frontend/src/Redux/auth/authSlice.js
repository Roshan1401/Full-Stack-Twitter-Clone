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
    logout: (state) => {
      // console.log("Logout inside");

      state.status = false;
      state.userInfo = null;
    },

    setUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
