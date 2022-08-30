import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postServices from "./postServices";
import { IPost } from "../../../types";
import absoluteUrl from "next-absolute-url";

export interface IPostState {
  posts: IPost[];
  searchedPosts: IPost[];
  post: IPost;
  publicPosts: IPost[];
  privatePosts: IPost[];
  isLoading: boolean;
  isSuccess: boolean;
  isAdded: boolean;
  isError: boolean;
  messageSuccess: any;
  messageError: any;
}

const initialState: IPostState = {
  posts: [],
  searchedPosts: [],
  post: {} as IPost,
  publicPosts: [],
  privatePosts: [],
  isLoading: false,
  isSuccess: false,
  isAdded: false,
  isError: false,
  messageError: "",
  messageSuccess: "",
};

//Get posts
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      return await postServices.getPosts();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Search posts
export const searchPosts = createAsyncThunk(
  "post/searchPosts",
  async (searchValue: string, thunkAPI) => {
    try {
      return await postServices.searchPosts(searchValue);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get public posts
export const getPublicPosts = createAsyncThunk(
  "post/getPublicPosts",
  async (_, thunkAPI) => {
    try {
      return await postServices.getPublicPosts();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get private posts
export const getPrivatePosts = createAsyncThunk(
  "post/getPrivatePosts",
  async (_, thunkAPI) => {
    try {
      return await postServices.getPrivatePosts();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create new post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData: IPost, thunkAPI) => {
    try {
      return await postServices.createPost(postData);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get posts
export const getPost = createAsyncThunk(
  "post/getPost",
  async (id: any, thunkAPI) => {
    try {
      return await postServices.getPost(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Like video
export const likeVideo = createAsyncThunk(
  "post/likeVideo",
  async (videoId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(getPost(videoId));
      return await postServices.likeVideo(videoId);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Unlike video
export const unlikeVideo = createAsyncThunk(
  "post/unlikeVideo",
  async (videoId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(getPost(videoId));
      return await postServices.unlikeVideo(videoId);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = [];
      state.searchedPosts = [];
      state.publicPosts = [];
      state.privatePosts = [];
      state.post = {} as IPost;
      state.isLoading = false;
      state.isSuccess = false;
      state.isAdded = false;
      state.isError = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder //Get posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Search posts
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedPosts = action.payload.data;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Get post
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload.data;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Get public posts
      .addCase(getPublicPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPosts = action.payload.data;
      })
      .addCase(getPublicPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Get private posts
      .addCase(getPrivatePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrivatePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.privatePosts = action.payload.data;
      })
      .addCase(getPrivatePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Create new post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdded = true;
        state.posts.push(action.payload.data);
        state.messageSuccess = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Like video
      .addCase(likeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post.likes?.push(action.payload.user);
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Unlike video
      .addCase(unlikeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlikeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post.likes?.splice(
          state.post.likes?.findIndex((item) => item === action.payload.user),
          1
        );
      })
      .addCase(unlikeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = postSlice.actions;

//Reduder
export default postSlice.reducer;
