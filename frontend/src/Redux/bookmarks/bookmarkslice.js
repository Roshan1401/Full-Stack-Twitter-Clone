import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    updateBookmark: (state, action) => {
      const { bookmarkId, isBookmarked, post } = action.payload;

      if (isBookmarked) {
        const existingBookmark = state.bookmarks.findIndex(
          (b) => b._id === bookmarkId,
        );
        if (existingBookmark === -1) {
          state.bookmarks.unshift({ post: post, _id: bookmarkId });
        }
      } else {
        const existingBookmark = state.bookmarks.findIndex(
          (b) => b._id === bookmarkId,
        );
        if (existingBookmark !== -1) {
          state.bookmarks.splice(existingBookmark, 1);
        }
      }
    },
  },
});

export const { setBookmarks, updateBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
