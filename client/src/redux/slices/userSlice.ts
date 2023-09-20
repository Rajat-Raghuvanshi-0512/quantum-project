import { createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../actions/userActions';

interface userState {
  loading: boolean;
  error: string | null;
  user: unknown;
  isAuthenticated: boolean | undefined;
}

// Define the initial state using that type
const initialState: userState = {
  loading: true,
  error: null,
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { clearErrors } = userSlice.actions;
export const userReducer = userSlice.reducer;
