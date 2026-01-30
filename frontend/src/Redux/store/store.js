import { configureStore } from "@reduxjs/toolkit";
import reducer from "../auth/authSlice";

const store = configureStore({
  reducer: {
    auth: reducer,
  },
});

export default store;
