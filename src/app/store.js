import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/post-slice";
import authReducer from "../features/auth/auth-slice";
import bookmarkReducer from "../features/bookmarks/bookmark-slice";
import followReducer from "../features/followers/followers-slice";
import commentReducer from "../features/comment/comment-slice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    bookmark:bookmarkReducer,
    follow:followReducer,
    comment:commentReducer
  },
});
