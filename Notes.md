// import { AnyAction, configureStore } from "@reduxjs/toolkit";

// import { createWrapper, HYDRATE } from "next-redux-wrapper";

// export const store = configureStore({
// reducer: {
// auth: authReducer,
// post: postsReducer,
// // comments: commentsReducer,
// // users: usersReducer,
// },
// });

import {
Action,
AnyAction,
combineReducers,
configureStore,
ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "../redux/features/auth/authSlice";
import postsReducer from "../redux/features/post/postSilce";

const combinedReducer = combineReducers({
auth: authReducer,
post: postsReducer,
});

const reducer: any = (
state: ReturnType<typeof combinedReducer>,
action: AnyAction
) => {
if (action.type === HYDRATE) {
const nextState = {
...state, // use previous state
...action.payload, // apply delta from hydration
};
return nextState;
} else {
return combinedReducer(state, action);
}
};

export const makeStore = () =>
configureStore({
reducer,
});

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>

> ;

export const wrapper = createWrapper(makeStore, { debug: true });

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// if (state.post?.likes?.includes(action.payload.user)) {
// state.post.likes.splice(
// state.post.likes.findIndex((item) => item === action.payload.user),
// 1
// );
// } else {
// state.post.likes.push(action.payload.user);
// }
