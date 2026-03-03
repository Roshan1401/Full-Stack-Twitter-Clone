import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePostLikes: (state, action) => {
      const { postId, likes, isLiked } = action.payload;

      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.likes = likes;
        post.isLiked = isLiked;
      }
    },
    updatePostBookmark: (state, action) => {
      const { postId, isBookmarked } = action.payload;

      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.isBookmarked = isBookmarked;
      }
    },
  },
});

export const { setPosts, addPost, updatePostLikes, updatePostBookmark } = postSlice.actions;

export default postSlice.reducer;
