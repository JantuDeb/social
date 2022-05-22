import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../config/axios-config";
import { follow, unFollow } from "../followers/followers-slice";

const initialState = {
  user: {},
  isLoggedIn: false,
  loginError: "",
  loginStatus: "idle",
  signUpStatus: "idle",
  signUperror: "",
  updateProfileStatus: "idle",
  updateProfileError: "",
  userProfileData: {},
};

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", user, axiosConfig);
      if (data.success) {
        localStorage.setItem("token", data.token);
        return data.user;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  try {
    const { data } = await axios.get("/logout", axiosConfig);
    if (data.success) {
      return {};
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/signup", user, axiosConfig);
      if (data.success) {
        localStorage.setItem("token", data.token);
        return data.user;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  console.log("getUser");
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

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  try {
    const { data } = await axios.get("/user/profile", axiosConfig);
    if (data.success) {
      return data.user;
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
      state.loginError = "";
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.payload.message;
    },
    [login.pending]: (state, action) => {
      state.loginStatus = "loading";
      state.loginError = "";
    },
    [logout.fulfilled]: (state, action) => {
      state.loginStatus = "idle";
      state.isLoggedIn = false;
      state.user = action.payload;
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
      state.isLoggedIn = true;
      state.signUpStatus = "succeeded";
      state.signUperror = "";
    },
    [signup.pending]: (state, action) => {
      state.signUpStatus = "loading";
      state.signUperror = "";
    },
    [signup.rejected]: (state, action) => {
      state.signUpStatus = "failed";
      state.signUperror = action.payload.message;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userProfileData = action.payload;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    [follow.fulfilled]: (state, action) => {
      if (state.user._id === state.userProfileData._id) {
        state.user.followings.push(action.payload._id);
      } else if (state.userProfileData._id === action.payload._id)
        state.userProfileData.followers.push(action.payload._id);
    },
    [unFollow.fulfilled]: (state, action) => {
      if (state.user._id === state.userProfileData._id) {
        state.user = {
          ...state.user,
          followings: state.user.followings.filter(
            (id) => id !== action.payload._id
          ),
        };
      } else if (state.userProfileData._id === action.payload._id) {
        state.userProfileData = {
          ...state.userProfileData,
          followers: state.userProfileData.followers.filter(
            (id) => id !== action.payload._id
          ),
        };
      }
    },
  },
});

export const selectUser = (state) => state.auth.user;
export default authState.reducer;
