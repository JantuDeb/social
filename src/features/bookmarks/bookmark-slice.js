import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";
import { disLikePost, likePost } from "../post/post-slice";

const initialState = {
  bookmarks: [],
  bookmarkFetchError: "idle",
  bookmarkFetchStatus: "loading",
};

export const fetchBookmarks = createAsyncThunk(
  "user/fetchBookmark",
  async () => {
    try {
      const { data } = await axios.get("/user/bookmarks", axiosConfig);
      if (data.success) {
        return data.bookmarks;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addToBookmarks = createAsyncThunk(
  "user/addToBookmarks",
  async (postId) => {
    try {
      const { data } = await axios.post(
        "user/bookmarks",
        { postId },
        axiosConfig
      );
      if (data.success) {
        return data.bookmark;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const removeBookmarks = createAsyncThunk(
  "user/removeBookmarks",
  async (postId) => {
    try {
      const { data } = await axios.delete(
        "user/bookmark/" + postId,
        axiosConfig
      );
      if (data.success) {
        return data.bookmark;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBookmarks.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
      state.bookmarkFetchStatus = "succeeded";
      state.bookmarkFetchError = "";
    },
    [fetchBookmarks.rejected]: (state, action) => {
      state.bookmarkFetchStatus = "failed";
      state.bookmarkFetchError = action.payload;
    },
    [fetchBookmarks.pending]: (state, action) => {
      state.bookmarkFetchStatus = "loading";
      state.bookmarkFetchError = "";
    },
    [addToBookmarks.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.bookmarks.push(action.payload);
    },
    [removeBookmarks.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark._id !== action.payload._id
      );
    },
    [likePost.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.post._id === action.payload._id) {
          return {
            ...bookmark,
            post: action.payload,
          };
        }
        return bookmark;
      });
    },
    [disLikePost.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.post._id === action.payload.post) {
          return {
            ...bookmark,
            post: {
              ...bookmark.post,
              likes: bookmark.post.likes.filter(
                (like) => like !== action.payload.user
              ),
            },
          };
        }
        return bookmark;
      });
    },
  },
});

export default bookmarkSlice.reducer;
