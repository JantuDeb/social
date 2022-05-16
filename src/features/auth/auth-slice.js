import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";

const initialState = {
  user: {},
  isLoggedIn: false,
  loginError: "",
  loginStatus: "idle",
  signUpStatus: "idle",
  updateProfileStatus: "idle",
  updateProfileError: "",
  userProfileData: {},
};

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const { data } = await axios.post("/login", user, axiosConfig);
    if (data.success) {
      return data.user;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const signup = createAsyncThunk("auth/signup", async (user) => {
  try {
    const { data } = await axios.post("/signup", user, axiosConfig);
    if (data.success) {
      return data.user;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});
export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  try {
    const { data } = await axios.get("/user/" + userId, axiosConfig);
    if (data.success) {
      return data.user;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user) => {
    try {
      const { data } = await axios.post(
        "/user/update_user_details",
        user,
        axiosConfig
      );
      if (data.success) {
        return data.user;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.payload;
    },
    [login.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.updateProfileStatus = "succeeded";
    },
    [updateProfile.pending]: (state, action) => {
      state.updateProfileStatus = "loading";
    },
    [updateProfile.rejected]: (state, action) => {
      state.updateProfileStatus = "failed";
    },

    [signup.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.signUpStatus = "succeeded"
    },
    [signup.pending]: (state, action) => {
      state.signUpStatus = "loading";
    },
    [signup.rejected]: (state, action) => {
      state.signUpStatus = "failed"
    },
    [getUser.fulfilled]: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export default authState.reducer;
