import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";
import { IUser, IUserUpdate } from "../../../types";

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  messageSuccess: any;
  messageError: any;
}

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  messageError: "",
  messageSuccess: "",
};

//Register
export const register = createAsyncThunk(
  "auth/register",
  async (userData: IUser, thunkAPI) => {
    try {
      return await authServices.register(userData);
    } catch (error: any) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.messageError = "";
      state.messageSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder //Register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.messageSuccess = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.messageError = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

//Reduder
export default authSlice.reducer;
