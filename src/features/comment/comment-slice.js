import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";

const initialState = {
  comments: [],
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComment",
  async (postId) => {
    try {
      const { data } = await axios.get("/comments", axiosConfig);
      if (data.success) {
        return data.comments;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (comment) => {
    try {
      const { data } = await axios.post("comments", comment, axiosConfig);
      if (data.success) {
        return data.comment;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId) => {
    try {
      const { data } = await axios.delete(
        "/post/comment/" + commentId,
        axiosConfig
      );
      if (data.success) {
        return data.comment;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, body }) => {
    try {
      const { data } = await axios.patch(
        "/post/comment/" + commentId,
        { body },
        axiosConfig
      );
      if (data.success) {
        return data.comment;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },

    [addComment.fulfilled]: (state, action) => {
      state.comments = state.comments.concat(action.payload);
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload._id
      );
    },
    [updateComment.fulfilled]: (state, action) => {
      state.comments = state.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
  },
});

export default commentSlice.reducer;
