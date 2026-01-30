import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
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
      ((state.status = false), (state.userInfo = null));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
