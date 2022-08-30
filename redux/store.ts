import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";
import authReducer from "../redux/features/auth/authSlice";
import postsReducer from "../redux/features/post/postSilce";
import usersReducer from "../redux/features/user/userSlice";
import commentReducer from "../redux/features/comment/commentSlice";

const store = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      post: postsReducer,
      user: usersReducer,
      comment: commentReducer,
    },
    devTools: true,
  });

export type Store = ReturnType<typeof store>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<Store>(store);
