import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";

const initialState = {
  feeds: [],
  posts: [],
  userPosts: [],
  feedFetchError: "",
  feedFetchStatus: "idle",
  postCreateStatus: "idle",
  postCreateError: "",
  likeStatus: "idle",
  disLikeStatus: "idle",
};

export const fetchFeed = createAsyncThunk("post/fetchFeed", async () => {
  try {
    const { data } = await axios.get("/posts/feed", axiosConfig);
    if (data.success) {
      return data.posts;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    try {
      const { data } = await axios.get("/posts", axiosConfig);
      if (data.success) {
        return data.posts;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchUserPosts = createAsyncThunk(
  "post/fetchUserPosts",
  async (userId) => {
    try {
      const { data } = await axios.get("/posts/" + userId, axiosConfig);
      if (data.success) {
        return data.posts;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const createPost = createAsyncThunk("post/createPost", async (post) => {
  try {
    const { data } = await axios.post("/posts", post, axiosConfig);
    if (data.success) {
      return data.post;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    try {
      const { data } = await axios.delete("/post/" + postId, axiosConfig);
      if (data.success) {
        return data.post;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const likePost = createAsyncThunk("post/likePost", async (postId) => {
  try {
    const { data } = await axios.post("/user/likes", { postId }, axiosConfig);
    if (data.success) {
      return data.like.post;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const disLikePost = createAsyncThunk(
  "post/disLikePost",
  async (postId) => {
    try {
      const { data } = await axios.delete("/user/like/" + postId, axiosConfig);
      if (data.success) {
        return data.like;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFeed.fulfilled]: (state, action) => {
      state.feeds = action.payload;
      state.feedFetchStatus = "succeeded";
    },
    [fetchFeed.rejected]: (state, action) => {
      state.feedFetchStatus = "failed";
      state.feedFetchError = action.payload;
    },
    [fetchFeed.pending]: (state, action) => {
      state.feedFetchStatus = "loading";
    },

    [createPost.fulfilled]: (state, action) => {
      state.feeds.unshift(action.payload);
      state.postCreateStatus = "succeeded";
    },
    [createPost.pending]: (state, action) => {
      state.postCreateStatus = "loading";
    },
    [createPost.rejected]: (state, action) => {
      state.postCreateStatus = "failed";
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },

    [fetchUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
    },
    [fetchUserPosts.rejected]: (state, action) => {
      state.userPosts = [];
    },

    [deletePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.feeds = state.feeds.filter(
        (post) => post._id !== action.payload._id
      );
    },

    [likePost.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [disLikePost.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [likePost.rejected]: (state) => {
      state.likeStatus = "failed";
    },
    [disLikePost.rejected]: (state) => {
      state.likeStatus = "failed";
    },
    [likePost.fulfilled]: (state, action) => {
      state.feeds = state.feeds.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.likeStatus = "succeeded";
    },
    [disLikePost.fulfilled]: (state, action) => {
      state.feeds = state.feeds.map((post) => {
        if (post._id === action.payload.post) {
          return {
            ...post,
            likes: post.likes.filter((like) => like !== action.payload.user),
          };
        }
        return post;
      });
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post) {
          return {
            ...post,
            likes: post.likes.filter((like) => like !== action.payload.user),
          };
        }
        return post;
      });
      state.disLikeStatus = "succeeded";
    },
  },
});

export const selectPost = (state) => state.post.posts;
export const selectFeed = (state) => state.post.feeds;
export default postSlice.reducer;
