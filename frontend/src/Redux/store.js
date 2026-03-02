import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./posts/postSlice";
import profileReducer from "./profile/profileSlice";
import bookmarkReducer from "./bookmarks/bookmarkslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
    bookmarks: bookmarkReducer,
  },
});

export default store;
