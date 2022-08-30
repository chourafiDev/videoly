import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentServices from "./commentServices";
import { IComment } from "../../../types";

export interface ICommentState {
  comments: IComment[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  messageSuccess: any;
  messageError: any;
}

const initialState: ICommentState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  messageError: "",
  messageSuccess: "",
};

//Get comments
export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId: string | string[] | undefined, thunkAPI) => {
    try {
      return await commentServices.getComments(postId);
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

//Add new comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async (commentData: IComment, thunkAPI) => {
    try {
      return await commentServices.addComment(commentData);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.comments = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder //Get comments
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.data;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Create new post
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload.data);
        state.messageSuccess = action.payload.message;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = commentSlice.actions;

//Reduder
export default commentSlice.reducer;
