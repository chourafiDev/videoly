import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "./userServices";
import { IUser, IUserUpdate } from "../../../types";

export interface IUserState {
  users: IUser[];
  user: IUser;
  currentUser: IUser | null;
  isLoading: boolean;
  isSuccess: boolean;
  isUpdated: boolean;
  isError: boolean;
  messageSuccess: any;
  messageError: any;
}

const initialState: IUserState = {
  users: [],
  user: {} as IUser,
  currentUser: {} as IUser,
  isLoading: false,
  isSuccess: false,
  isUpdated: false,
  isError: false,
  messageError: "",
  messageSuccess: "",
};

//Get users
export const getUsers = createAsyncThunk(
  "post/getUsers",
  async (_, thunkAPI) => {
    try {
      return await userServices.getUsers();
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

//Get user
export const getUser = createAsyncThunk(
  "post/getUser",
  async (userName: string, thunkAPI) => {
    try {
      return await userServices.getUser(userName);
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

//Current user
export const currentUser = createAsyncThunk(
  "user/currentUser",
  async (_, thunkAPI) => {
    try {
      return await userServices.currentUser();
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Register
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: IUserUpdate, thunkAPI) => {
    try {
      return await userServices.updateProfile(userData);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.user = {} as IUser;
      state.currentUser = {} as IUser;
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.isError = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder //Get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      }) //Current user
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isAuthenticated = true;
        state.currentUser = action.payload.data;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.isAuthenticated = false;
        state.messageError = action.payload;
        state.currentUser = null;
      }) //Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.messageSuccess = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messageError = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = userSlice.actions;

//Reduder
export default userSlice.reducer;
