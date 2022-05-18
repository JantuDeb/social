import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";

const initialState = {
  followers: [],
  followings: [],
  peoples: [],
};

export const fetchFollowings = createAsyncThunk(
  "follow/fetchFollowings",
  async () => {
    try {
      const { data } = await axios.get("/user/followings", axiosConfig);
      if (data.success) {
        return data.followings;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchFollowers = createAsyncThunk(
  "follow/fetchFollowers",
  async () => {
    try {
      const { data } = await axios.get("/user/followers", axiosConfig);
      if (data.success) {
        return data.followers;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchPeoples = createAsyncThunk(
  "follow/fetchPeoples",
  async () => {
    try {
      const { data } = await axios.get("/users", axiosConfig);
      if (data.success) {
        return data.users;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const follow = createAsyncThunk("user/Follow", async (followeeId) => {
  try {
    const { data } = await axios.put(
      "/user/follow",
      { followeeId },
      axiosConfig
    );
    if (data.success) {
      return data.followee;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});
export const unFollow = createAsyncThunk(
  "user/unFollow",
  async (followeeId) => {
    try {
      const { data } = await axios.patch(
        "/user/un_follow",
        { followeeId },
        axiosConfig
      );
      if (data.success) {
        return data.followee;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFollowers.fulfilled]: (state, action) => {
      state.followers = action.payload;
    },
    [fetchFollowings.fulfilled]: (state, action) => {
      state.followings = action.payload;
    },
    [follow.fulfilled]: (state, action) => {
      const isInFollowings = state.followings.some(
        (user) => user._id === action.payload._id
      );
      if (isInFollowings) {
        state.followings = state.followings.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      } else {
        state.followings = state.followings.concat(action.payload);
      }
      state.followers = state.followers.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.peoples = state.peoples.filter(
        (user) => user._id !== action.payload._id
      );
    },

    [unFollow.fulfilled]: (state, action) => {
      state.followings = state.followings.filter(
        (user) => user._id !== action.payload._id
      );

      state.followers = state.followers.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    [fetchPeoples.fulfilled]: (state, action) => {
      state.peoples = action.payload;
    },
  },
});

export default followSlice.reducer;
