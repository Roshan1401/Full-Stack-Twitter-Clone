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
      const { post, isBookmarked } = action.payload;

      if (isBookmarked) {
        const existingBookmark = state.bookmarks.findIndex(
          (b) => b.post._id === post._id,
        );
        if (existingBookmark === -1) {
          state.bookmarks.unshift({
            post: post,
            _id: `bookmark_${post._id}`,
            bookmarkedBy: post.author._id,
          });
        }
      } else {
        const existingBookmark = state.bookmarks.findIndex(
          (b) => b.post._id === post._id,
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
